'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class StatusVendedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatusVendedor.hasMany(models.Usuario, { foreignKey: { name: 'id_status_vendedor', allowNull: false } })
    }
  }
  StatusVendedor.init(
    {
      idStatusVendedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_status_vendedor'
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'StatusVendedor',
      freezeTableName: true,
      underscored: true,
      tableName: 'status_vendedor'
    }
  )
  return StatusVendedor
}
