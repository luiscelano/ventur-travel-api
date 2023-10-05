'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TipoCliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoCliente.hasMany(models.Cliente, { foreignKey: { name: 'id_tipo_cliente', allowNull: false } })
    }
  }
  TipoCliente.init(
    {
      idTipoCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_tipo_cliente'
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TipoCliente',
      freezeTableName: true,
      underscored: true,
      tableName: 'tipo_cliente'
    }
  )
  return TipoCliente
}
