import express from 'express'
import UsersRoutes from './users.routes'
import AuthRoutes from './auth.routes'
import ClienteRoutes from './cliente.routes'
const Router = express.Router()

Router.use('/auth', AuthRoutes)
Router.use('/users', UsersRoutes)
Router.use('/clientes', ClienteRoutes)

export default Router
