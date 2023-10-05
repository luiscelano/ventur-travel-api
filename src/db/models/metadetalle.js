'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MetaDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MetaDetalle.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    metaAlcanzar: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: "meta_alcanzar"
    },
    metaAcumulada: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: "meta_acumulada"
    }
  }, {
    sequelize,
    modelName: 'MetaDetalle',
    freezeTableName: true,
    underscored: true,
    tableName: 'meta_detalle'
  });
  return MetaDetalle;
};