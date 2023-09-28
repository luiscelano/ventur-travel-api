import express from 'express'
import * as AuthControllers from 'controllers/auth.controller'

const Router = express.Router()

Router.get('/users', AuthControllers.getUsers)
Router.post('/login', AuthControllers.userLogin)
Router.delete('/logout', AuthControllers.userLogout)
Router.post('/getAccessToken', AuthControllers.getAccessToken)

export default Router
