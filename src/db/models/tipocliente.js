'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TipoCliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoCliente.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TipoCliente',
      freezeTableName: true,
      underscored: true,
      tableName: 'tipo_cliente'
    }
  )
  return TipoCliente
}
