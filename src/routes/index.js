import express from 'express'
import PostsRoutes from './posts.routes'
import UsersRoutes from './users.routes'
import AuthRoutes from './auth.routes'

const Router = express.Router()

Router.use('/auth', AuthRoutes)
Router.use('/users', UsersRoutes)
Router.use('/v2/posts', PostsRoutes)

export default Router
