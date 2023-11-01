import { Sequelize } from 'sequelize'
import { readdirSync } from 'fs'
import { join } from 'path'
import { postgres } from '../config/mainConfig.js'

import DB from './db/database.js'

let options = {
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName: true
}

const dbConnect = () => {
  console.log(`-- inside dbConnect..`)
  return new Promise((resolve, reject) => {
    const sequelize = new Sequelize(postgres.database, postgres.username, postgres.password, {
      host: postgres.host,
      schema: postgres.schema,
      dialect: postgres.dialect,
      port: postgres.port
    })

    const modelDefiners = []
    readdirSync(join(__dirname, './schemas')).forEach((file) => {
      modelDefiners.push(require(join(__dirname, `./schemas/${file}`)))
    })

    for (const definer of modelDefiners) {
      definer(sequelize, options)
    }

    Object.keys(sequelize.models).forEach((modelName) => {
      if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models)
      }
    })

    sequelize
      .authenticate()
      .then(() => {
        console.log('connected to db.')
        let db = new DB(sequelize)
        resolve(sequelize)
      })
      .catch((err) => {
        console.log('db connection error:', err)
        reject()
      })
  })
}

export default dbConnect
