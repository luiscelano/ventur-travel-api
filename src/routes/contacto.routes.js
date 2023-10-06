import express from 'express'
import * as ContactoControllers from 'controllers/contacto.controller'

const Router = express.Router()
Router.get('/', ContactoControllers.getContactos)
Router.post('/', ContactoControllers.createContacto)

export default Router
