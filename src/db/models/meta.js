'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meta.init(
    {
      metaMes: DataTypes.INTEGER,
      metaAnio: DataTypes.INTEGER,
      metaAlcanzar: DataTypes.FLOAT,
      metaAcumulada: DataTypes.FLOAT,
      metaPorcentajeCumplido: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Metas',
      freezeTableName: true,
      underscored: true,
      tableName: 'metas'
    }
  )
  return Meta
}
