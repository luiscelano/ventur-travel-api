'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status_vendedor', [
      {
        descripcion: 'inactivo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descripcion: 'activo',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status_vendedor', null, {})
  }
}
