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
    }
  }
  Usuario.init(
    {
      correo: DataTypes.STRING,
      contrasenia: DataTypes.STRING
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
