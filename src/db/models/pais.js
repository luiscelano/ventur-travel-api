'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Pais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pais.hasMany(models.Cartera, { foreignKey: { name: 'id_pais', allowNull: false } })
    }
  }
  Pais.init(
    {
      idPais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        key: 'id_pais'
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Pais',
      freezeTableName: true,
      underscored: true,
      tableName: 'pais'
    }
  )
  return Pais
}
