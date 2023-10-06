import express from 'express'
import * as CarteraControllers from 'controllers/cartera.controller'
import validateAccessToken from 'middlewares/validateAccessToken.middleware'

const Router = express.Router()
Router.use(validateAccessToken)
Router.get('/', CarteraControllers.getCarteras)
Router.post('/', CarteraControllers.createCartera)

export default Router
