'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.belongsTo(models.TipoCliente, {
        foreignKey: {
          name: 'tipo_cliente',
          allowNull: true
        },
        as: 'tipoCliente'
      })
    }
  }
  Cliente.init(
    {
      idCliente: {
        type: DataTypes.INTEGER,
        key: 'id_cliente',
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      dpi: DataTypes.STRING,
      nombre: DataTypes.STRING,
      telefono: DataTypes.INTEGER,
      direccion: DataTypes.STRING,
      correoElectronico: {
        type: DataTypes.STRING,
        key: 'correo_electronico'
      }
    },
    {
      sequelize,
      modelName: 'Cliente',
      freezeTableName: true,
      underscored: true,
      tableName: 'cliente'
    }
  )
  return Cliente
}
