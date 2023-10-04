import express from 'express'
import * as ClienteControllers from 'controllers/cliente.controller'

const Router = express.Router()
Router.get('/', ClienteControllers.getClientes)
Router.post('/', ClienteControllers.createCliente)

export default Router
