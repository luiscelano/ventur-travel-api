'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paquete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paquete.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    cantidadNoches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cantidad_noches"
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_inicio"
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_fin"
    },
    cantidadChd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cantidad_chd"
    },
    cantidadAdl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cantidad_adl"
    }
  }, {
    sequelize,
    modelName: 'Paquete',
    freezeTableName: true,
    underscored: true,
    tableName: 'paquete'
  });
  return Paquete;
};