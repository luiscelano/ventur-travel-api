import express from 'express'
import * as AuthControllers from 'controllers/auth.controller'

const Router = express.Router()

Router.post('/login', AuthControllers.userLogin)
Router.post('/signup', AuthControllers.userSignUp)
Router.delete('/logout', AuthControllers.userLogout)
Router.post('/getAccessToken', AuthControllers.getAccessToken)

export default Router
