'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CarteraDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarteraDetalle.init(
    {
      carteraCantidadTuristas: DataTypes.INTEGER,
      carteraFechaInicio: DataTypes.DATE,
      carteraFechaFin: DataTypes.DATE,
      carteraCantidadPaquetes: DataTypes.INTEGER,
      carteraPrecioXPaquete: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'CarteraDetalle',
      freezeTableName: true,
      underscored: true,
      tableName: 'cartera_detalle'
    }
  )
  return CarteraDetalle
}
