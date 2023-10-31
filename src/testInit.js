const db = require('./db/models').default

;(async () => {
  await db.sequelize.sync({ force: true })
  console.log('sync database completed...')
})()
