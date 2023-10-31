import express from 'express'
import http from 'http'
import events from 'events'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: __dirname.replace('src', `.env.${process.env.NODE_ENV || 'development'}`) })
import posts from '__fixtures__/posts.json'
import routes from 'routes'
import db from 'db/models'
import initSchema from 'schemas'
import initEvents from 'initEvents'
import sls from 'serverless-http'

export const app = express()

export const appEvents = new events.EventEmitter()
;(async () => {
  initSchema()
  initEvents(appEvents)
  const HOST = 'localhost'
  const PORT = process.env.PORT || 3000

  const server = http.createServer(app)

  app.use(cors())
  app.use(express.json())
  app.use(routes)
  //   initAPI(app)
  app.get('/healthcheck', (__, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    appEvents.emit('test', data)
    res.status(200).send(data)
  })

  app.get('/posts', (req, res) => {
    // console.log('posts request data:', req)
    res.status(200).json({ posts })
  })

  db.sequelize.sync({ force: false }).then(() =>
    server.listen(PORT, () => {
      console.log(`Server running on http://${HOST}:${PORT}`)
    })
  )
})()

export const handler = sls(app)
