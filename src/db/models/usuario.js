'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.StatusVendedor, { foreignKey: { name: 'id_status_vendedor', allowNull: false } })
      Usuario.belongsTo(models.TipoUsuario, {
        foreignKey: { name: 'id_tipo_usuario', allowNull: false },
        as: 'permiso'
      })
      Usuario.hasMany(models.Cartera, { foreignKey: { name: 'id_usuario', allowNull: false }, as: 'ventas' })
      Usuario.hasMany(models.MetaDetalle, { foreignKey: { name: 'id_usuario', allowNull: false } })
    }
  }
  Usuario.init(
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_usuario'
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      contrasenia: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dpi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_nac'
      },
      fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha_ingreso'
      }
    },
    {
      sequelize,
      modelName: 'Usuario',
      freezeTableName: true,
      underscored: true,
      tableName: 'usuario'
    }
  )
  return Usuario
}
