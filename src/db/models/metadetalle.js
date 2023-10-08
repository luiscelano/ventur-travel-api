'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MetaDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MetaDetalle.belongsTo(models.MetaGeneral, { foreignKey: { name: 'id_meta_general', allowNull: false } })
      MetaDetalle.belongsTo(models.Usuario, { foreignKey: { name: 'id_usuario', allowNull: false }, as: 'usuario' })
    }
  }
  MetaDetalle.init(
    {
      idMetaDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_meta_detalle'
      },
      metaAlcanzar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'meta_alcanzar'
      }
    },
    {
      sequelize,
      modelName: 'MetaDetalle',
      freezeTableName: true,
      underscored: true,
      tableName: 'meta_detalle'
    }
  )
  return MetaDetalle
}
