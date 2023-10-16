import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import generateAccessToken from 'utils/generateAccessToken'
import generateRefreshToken from 'utils/generateRefreshToken'
import { Usuario, TipoUsuario, Autorizacion } from 'db/models'
import { LoginInput, Usuario as UsuarioSchema, CreateAccessInput, UserSignUpInput } from 'schemas'
import { getSchemaErrors } from 'utils/getSchemaErrors'
import generateRandomCode from 'utils/generateRandomCode'
import { appEvents } from 'index'

export const refreshTokens = [] // will be stored in Redis DB

export const userLogin = async (req, res) => {
  const inputSchema = LoginInput.newContext()
  const cleanedInput = inputSchema.clean(req.body)
  inputSchema.validate(cleanedInput)
  if (!inputSchema.isValid()) {
    const error = getSchemaErrors(inputSchema)
    return res.status(422).json({ error })
  }
  const response = await Usuario.findOne({
    where: {
      correo: req.body.correo
    },
    include: [
      {
        model: TipoUsuario,
        as: 'permiso'
      }
    ]
  })

  if (!response) return res.status(404).send({ message: 'Correo no encontrado' })

  const user = response.toJSON()
  try {
    if (await bcrypt.compare(req.body.contrasenia, user.contrasenia)) {
      const cleanedOutput = UsuarioSchema.clean(user)
      const accessToken = generateAccessToken({ user: cleanedOutput })
      const refreshToken = generateRefreshToken({ user: cleanedOutput })
      refreshTokens.push(refreshToken)
      return res.status(200).json({
        usuario: cleanedOutput,
        accessToken,
        refreshToken
      })
    } else {
      return res.status(405).json({ message: 'Contraseña incorrecta!' })
    }
  } catch {
    res.status(405).send()
  }
}

export const userSignUp = async (req, res) => {
  try {
    const inputSchema = UserSignUpInput.newContext()
    const cleanedInput = inputSchema.clean(req.body)
    inputSchema.validate(cleanedInput)
    if (!inputSchema.isValid()) {
      const errors = getSchemaErrors(inputSchema)

      return res.status(422).json({ errors })
    }
    const authorizationResponse = await Autorizacion.findOne({
      where: { authorization_code: req.body.authorizationCode, correo: req.body.correo, aceptado: false }
    })
    if (!authorizationResponse)
      return res.status(404).json({
        message: 'Código de autorización inválido o ya ha sido utilizado'
      })
    const autorizacion = authorizationResponse.toJSON()
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.contrasenia, salt)
    console.log('salt', salt)
    console.log('hashedPassword', hashedPassword)

    Object.assign(cleanedInput, { contrasenia: hashedPassword, id_tipo_usuario: autorizacion.id_tipo_usuario })

    const userResponse = await Usuario.create(cleanedInput)
    if (!userResponse) return res.status(400).json({ message: 'Error al crear usuario' })
    const user = userResponse.toJSON()
    const cleanedOutput = UsuarioSchema.clean(user)

    const accessToken = generateAccessToken({ user: cleanedOutput })
    const refreshToken = generateRefreshToken({ user: cleanedOutput })
    refreshTokens.push(refreshToken)
    appEvents.emit('userCreated', { user: cleanedOutput, payload: { autorizacion: authorizationResponse } })

    return res.status(200).json({
      usuario: cleanedOutput,
      accessToken,
      refreshToken
    })
  } catch (error) {
    console.error('User signup error:', error)
    return res.status(500).json({ error })
  }
}

export const userLogout = (req, res) => {
  if (!req.body.token.length) return res.status(403).send()
  const index = refreshTokens.findIndex((refreshToken) => refreshToken === req.body.token)
  if (index === -1) return res.status(403).send()
  refreshTokens.splice(index, 1)
  return res.send('Signed Out!')
}

export const getAccessToken = async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null)
    return res.status(403).json({
      message: 'Error de solicitud, vuelve a iniciar sesión'
    })
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({
      message: 'Error de solicitud, vuelve a iniciar sesión'
    })

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err)
      return res.status(403).json({
        message: 'Error de solicitud, vuelve a iniciar sesión'
      })
    const accessToken = generateAccessToken({ user: payload.user })
    res.json({ accessToken: accessToken })
  })
}

export const createAccess = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(405).json({
        message: 'No tienes permiso para realizar esta acción'
      })
    const inputSchema = CreateAccessInput.newContext()
    const cleanedInput = CreateAccessInput.clean(req.body)
    inputSchema.validate(cleanedInput)
    if (!inputSchema.isValid()) {
      const errors = getSchemaErrors(inputSchema)

      return res.status(422).json({ errors })
    }
    const authorizationCode = generateRandomCode()
    Object.assign(cleanedInput, { authorizationCode })
    const access = await Autorizacion.create(cleanedInput)
    if (!access) return res.status(400).json({ message: 'Error al crear acceso' })

    appEvents.emit('accessCreated', {
      user: req.user,
      payload: { correo: req.body.correo, authorizationCode }
    })
    return res.status(200).json({ acceso: access })
  } catch (error) {
    console.error('create access error:', error)
    return res.status(500).json({ error })
  }
}

export const getAccessList = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(405).json({
        message: 'No tienes permiso para realizar esta acción'
      })
    const accesos = await Autorizacion.findAll({
      include: {
        model: TipoUsuario,
        as: 'permiso'
      }
    })

    return res.status(200).json({ accesos })
  } catch (error) {
    console.error('getAccessList error:', error)
    return res.status(500).json({
      message: error.toString()
    })
  }
}
