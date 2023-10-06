import express from 'express'
import UsersRoutes from './users.routes'
import AuthRoutes from './auth.routes'
import ClienteRoutes from './cliente.routes'
import ContactoRoutes from './contacto.routes'
import PaqueteRoutes from './paquete.routes'
import CarteraRoutes from './cartera.routes'

const Router = express.Router()

Router.use('/auth', AuthRoutes)
Router.use('/users', UsersRoutes)
Router.use('/clientes', ClienteRoutes)
Router.use('/contactos', ContactoRoutes)
Router.use('/paquetes', PaqueteRoutes)
Router.use('/carteras', CarteraRoutes)

export default Router
