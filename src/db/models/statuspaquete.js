'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StatusPaquete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatusPaquete.hasMany(models.Paquete, { foreignKey: { name: 'id_status_paquete', allowNull: false } })
    }
  }
  StatusPaquete.init(
    {
      idStatusPaquete: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_status_paquete'
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'StatusPaquete',
      freezeTableName: true,
      underscored: true,
      tableName: 'status_paquete'
    }
  )
  return StatusPaquete
}
