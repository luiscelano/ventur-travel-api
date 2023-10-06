'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tipo_usuario', [
      {
        descripcion: 'vendedor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descripcion: 'jefe',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descripcion: 'administrador',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tipo_usuario', null, {})
  }
}
