'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.bulkInsert('status_paquete', [
        {
          descripcion: 'activo',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          descripcion: 'inactivo',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status_paquete', null, {})
  }
}
