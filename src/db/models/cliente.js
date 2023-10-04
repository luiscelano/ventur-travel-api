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
    }
  }
  Cliente.init(
    {
      dpi: DataTypes.STRING,
      nombre: DataTypes.STRING,
      telefono: DataTypes.INTEGER,
      direccion: DataTypes.STRING,
      correoElectronico: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Clientes',
      freezeTableName: true,
      underscored: true,
      tableName: 'cliente'
    }
  )
  return Cliente
}
