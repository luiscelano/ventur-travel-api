import express from 'express'
import * as PaqueteControllers from 'controllers/paquete.controller'

const Router = express.Router()
Router.get('/', PaqueteControllers.getPaquetes)
Router.post('/', PaqueteControllers.createPaquete)

export default Router
