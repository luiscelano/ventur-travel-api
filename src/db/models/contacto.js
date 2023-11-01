'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Contacto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contacto.hasMany(models.Paquete, { foreignKey: { name: 'id_contacto', allowNull: false } })
    }
  }
  Contacto.init(
    {
      idContacto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_contacto'
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Contacto',
      freezeTableName: true,
      underscored: true,
      tableName: 'contacto'
    }
  )
  return Contacto
}
