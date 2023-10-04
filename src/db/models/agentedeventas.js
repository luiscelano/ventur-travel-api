'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AgenteDeVentas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AgenteDeVentas.init(
    {
      dpi: DataTypes.STRING,
      edad: DataTypes.INTEGER,
      fechaNac: DataTypes.DATE,
      sucursal: DataTypes.INTEGER,
      fechaIngreso: DataTypes.DATE,
      nombre: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'AgenteDeVentas',
      freezeTableName: true,
      underscored: true,
      tableName: 'agente_de_ventas'
    }
  )
  return AgenteDeVentas
}
