'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PaquetesDeViaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaquetesDeViaje.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      cantidadAdl: DataTypes.INTEGER,
      cantidadChd: DataTypes.INTEGER,
      precio: DataTypes.FLOAT,
      cantidadNoches: DataTypes.INTEGER,
      fechaInicio: DataTypes.DATE,
      fechaFin: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'PaquetesDeViajes',
      freezeTableName: true,
      underscored: true,
      tableName: 'paquetes_de_viaje'
    }
  )
  return PaquetesDeViaje
}
