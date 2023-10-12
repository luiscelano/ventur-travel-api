import express from 'express'
import * as AuthControllers from 'controllers/auth.controller'
import validateAccessToken from 'middlewares/validateAccessToken.middleware'

const Router = express.Router()

Router.post('/login', AuthControllers.userLogin)
Router.post('/signup', AuthControllers.userSignUp)
Router.delete('/logout', AuthControllers.userLogout)
Router.post('/getAccessToken', AuthControllers.getAccessToken)
Router.post('/access', validateAccessToken, AuthControllers.createAccess)
Router.get('/access', validateAccessToken, AuthControllers.getAccessList)

export default Router
