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
      Cliente.hasMany(models.Cartera, { foreignKey: { name: 'id_cliente', allowNull: false } })
      Cliente.belongsTo(models.TipoCliente, {
        foreignKey: { name: 'id_tipo_cliente', allowNull: false },
        as: 'tipoCliente'
      })
    }
  }
  Cliente.init(
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_cliente'
      },
      dpi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'correo_electronico'
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
