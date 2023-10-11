'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('autorizacion', 'aceptado', {
      type: DataTypes.BOOLEAN,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('autorizacion', 'aceptado')
  }
}
