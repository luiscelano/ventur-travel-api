'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pais.init(
    {
      descripcion: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Pais',
      freezeTableName: true,
      underscored: true,
      tableName: 'pais'
    }
  )
  return Pais
}
