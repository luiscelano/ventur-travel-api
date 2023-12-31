'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.bulkInsert('tipo_cliente', [
        {
          descripcion: 'agencia',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          descripcion: 'cliente_final',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tipo_cliente', null, {})
  }
}
