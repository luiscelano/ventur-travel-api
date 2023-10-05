'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MetaGeneral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MetaGeneral.hasMany(models.MetaDetalle, { foreignKey: { name: 'metageneral_id', allowNull: false } });
    }
  }
  MetaGeneral.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'MetaGeneral',
    freezeTableName: true,
    underscored: true,
    tableName: 'meta_general'
  });
  return MetaGeneral;
};