import express from 'express'
import UsuarioRoutes from './usuario.routes'
import AuthRoutes from './auth.routes'
import ClienteRoutes from './cliente.routes'
import ContactoRoutes from './contacto.routes'
import PaqueteRoutes from './paquete.routes'
import CarteraRoutes from './cartera.routes'
import MetaRoutes from './metageneral.routes'

const Router = express.Router()

Router.use('/auth', AuthRoutes)
Router.use('/usuarios', UsuarioRoutes)
Router.use('/clientes', ClienteRoutes)
Router.use('/contactos', ContactoRoutes)
Router.use('/paquetes', PaqueteRoutes)
Router.use('/carteras', CarteraRoutes)
Router.use('/metas', MetaRoutes)

export default Router
