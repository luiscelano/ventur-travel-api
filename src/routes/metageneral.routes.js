import express from 'express'
import * as MetaControllers from 'controllers/metageneral.controller'
import validateAccessToken from 'middlewares/validateAccessToken.middleware'

const Router = express.Router()
Router.use(validateAccessToken)
Router.get('/', MetaControllers.getMeta)
Router.get('/all', MetaControllers.getMetas)
Router.post('/', MetaControllers.createMeta)

export default Router
