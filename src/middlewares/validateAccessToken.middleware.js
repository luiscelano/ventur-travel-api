import jwt from 'jsonwebtoken'
import userTypes from 'utils/userTypes'

const validateAccessToken = async (req, res, next) => {
  let token = req.headers['authorization']
  if (!token)
    return res.status(403).json({
      message: 'Forbidden'
    })
  token = token.replace('Bearer ', '')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    console.log(err)
    if (err)
      return res.status(401).json({
        message: 'No estás autorizado para realizar esta petición'
      })
    req.user = payload.user
    const isAdmin =
      payload.user.permiso.descripcion === userTypes.administrador ||
      payload.user.permiso.descripcion === userTypes.jefe
    Object.assign(req.user, { isAdmin })
    next()
  })
}

export default validateAccessToken
