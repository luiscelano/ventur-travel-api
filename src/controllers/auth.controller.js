import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { users } from './users.controller'
import generateAccessToken from 'utils/generateAccessToken'
import generateRefreshToken from 'utils/generateRefreshToken'
import { Usuario, TipoUsuario } from 'db/models'

export const refreshTokens = [] // will be stored in Redis DB

export const userLogin = async (req, res) => {
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
      delete user.contrasenia

      const accessToken = generateAccessToken({ user })
      const refreshToken = generateRefreshToken({ user })
      refreshTokens.push(refreshToken)
      return res.status(200).json({
        accessToken,
        refreshToken
      })
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta!' })
    }
  } catch {
    res.status(401).send()
  }
}

export const userSignUp = async (req, res) => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  console.log('salt', salt)
  console.log('hashedPassword', hashedPassword)
  const user = { username: req.body.username, password: hashedPassword }
  users.push(user)

  const accessToken = generateAccessToken({ username: user.username })
  const refreshToken = generateRefreshToken({ username: user.username })
  refreshTokens.push(refreshToken)
  return res.status(200).json({
    message: 'User created!',
    accessToken,
    refreshToken
  })
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
  if (refreshToken == null) return res.sendStatus(403)
  if (!refreshTokens.includes(refreshToken)) return res.status(403).send('Forbidden')

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ username: user.username })
    res.json({ accessToken: accessToken })
  })
}
