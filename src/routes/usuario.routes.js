import express from 'express'
import * as UsuarioControllers from 'controllers/usuario.controller'
import validateAccessToken from 'middlewares/validateAccessToken.middleware'

const Router = express.Router()

Router.use(validateAccessToken)
Router.get('/', UsuarioControllers.getUsuarios)
Router.patch('/', UsuarioControllers.updateUsuario)
Router.post('/:idUsuario/asignarMeta/:idMeta', UsuarioControllers.asignarMeta)

export default Router
