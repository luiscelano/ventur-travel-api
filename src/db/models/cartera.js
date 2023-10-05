'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cartera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cartera.belongsTo(models.Cliente, { foreignKey: { name: 'id_cliente', allowNull: false } })
      Cartera.belongsTo(models.Usuario, { foreignKey: { name: 'id_usuario', allowNull: false } })
      Cartera.belongsTo(models.Paquete, { foreignKey: { name: 'id_paquete', allowNull: false } })
      Cartera.belongsTo(models.Pais, { foreignKey: { name: 'id_pais', allowNull: false } })
    }
  }
  Cartera.init(
    {
      idCartera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_cartera'
      },
      totalPagar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'total_pagar'
      },
      cantidadTuristas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cantidad_turistas'
      },
      cantidadPaquetes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cantidad_paquetes'
      }
    },
    {
      sequelize,
      modelName: 'Cartera',
      freezeTableName: true,
      underscored: true,
      tableName: 'cartera'
    }
  )
  return Cartera
}
