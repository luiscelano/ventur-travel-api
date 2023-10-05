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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cantidadTuristas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cantidad_turistas"
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_inicio"
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_fin"
      },
      cantidadPaquetes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cantidad_paquetes"
      },
      precioPaquete: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: "precio_paquete"
      }
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
