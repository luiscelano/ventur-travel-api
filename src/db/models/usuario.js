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
      Usuario.belongsTo(models.StatusVendedor, { foreignKey: { name: 'statususuario_id', allowNull: false } });
      Usuario.belongsTo(models.TipoUsuario, { foreignKey: { name: 'tipousuario_id', allowNull: false } });
      Usuario.hasMany(models.Cartera, { foreignKey: { name: 'usuario_id', allowNull: false } });
      Usuario.hasMany(models.MetaDetalle, { foreignKey: { name: 'metausuario_id', allowNull: false } });

    }
  }
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "id_usuario"
      },
      password: {
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
        field: "fecha_nac"
      },
      fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_ingreso"
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
