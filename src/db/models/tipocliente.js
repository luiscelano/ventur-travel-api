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
      TipoCliente.hasMany(models.Cliente, {
        foreignKey: {
          name: 'tipo_cliente',
          allowNull: true
        },
        as: 'clientes'
      })
    }
  }
  TipoCliente.init(
    {
      idTipoCliente: {
        key: 'id_tipo_cliente',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      descripcion: DataTypes.STRING
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
