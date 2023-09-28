import express from 'express'
import * as UserControllers from 'controllers/users.controller'

const Router = express.Router()

Router.get('/', UserControllers.getUsers)
Router.post('/', UserControllers.createUser)

export default Router
