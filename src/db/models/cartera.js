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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fechaVenta:{
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_venta"
      },
      totalPagar:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: "total_pagar"
      }
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
