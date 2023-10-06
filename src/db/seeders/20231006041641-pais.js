'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('pais', [
      {
        descripcion: 'Guatemala',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descripcion: 'El Salvador',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pais', null, {})
  }
}
