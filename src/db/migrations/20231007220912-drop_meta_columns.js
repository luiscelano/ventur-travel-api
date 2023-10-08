'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('meta_general', 'meta_acumulada'),
      await queryInterface.removeColumn('meta_detalle', 'meta_acumulada')
    ])
  },

  async down(queryInterface, Sequelize) {}
}
