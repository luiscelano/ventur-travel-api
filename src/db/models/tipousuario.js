'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TipoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoUsuario.hasMany(models.Usuario, { foreignKey: { name: 'id_tipo_usuario', allowNull: false } })
      TipoUsuario.hasMany(models.Autorizacion, { foreignKey: 'id_tipo_usuario', allowNull: false })
    }
  }
  TipoUsuario.init(
    {
      idTipoUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_tipo_usuario'
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TipoUsuario',
      freezeTableName: true,
      underscored: true,
      tableName: 'tipo_usuario'
    }
  )
  return TipoUsuario
}
