'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cartera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cartera.init(
    {
      carteraFechaVenta: DataTypes.DATE,
      cartera_total_pagar: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Cartera',
      freezeTableName: true,
      underscored: true,
      tableName: 'cartera'
    }
  )
  return Cartera
}
