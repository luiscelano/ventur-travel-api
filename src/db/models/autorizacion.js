'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Autorizacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Autorizacion.belongsTo(models.TipoUsuario, {
        foreignKey: { name: 'id_tipo_usuario', allowNull: false },
        as: 'permiso'
      })
    }
  }
  Autorizacion.init(
    {
      idAutorizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_autorizacion'
      },
      authorizationCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        key: 'authorization_code',
        unique: true
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      aceptado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Autorizacion',
      freezeTableName: true,
      underscored: true,
      tableName: 'autorizacion'
    }
  )
  return Autorizacion
}
