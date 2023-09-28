import express from 'express'
import * as PostsControllers from 'controllers/posts.controller'
import validateAccessToken from 'middlewares/validateAccessToken.middleware'

const Router = express.Router()
Router.use(validateAccessToken)
Router.get('/', PostsControllers.getPosts)

export default Router
