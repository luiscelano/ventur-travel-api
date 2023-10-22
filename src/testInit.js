const db = require('./db/models')

;(async () => {
  await db.sequelize.sync({ force: true })
  console.log('sync database completed...')
})()
