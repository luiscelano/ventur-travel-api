'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      await queryInterface.renameColumn('agente_de_ventas', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('agente_de_ventas', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('cartera', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('cartera', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('cartera_detalle', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('cartera_detalle', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('cliente', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('cliente', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('meta', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('meta', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('pais', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('pais', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('permisos', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('permisos', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('status', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('status', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('tipo_cliente', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('tipo_cliente', 'updatedAt', 'updated_at'),
      await queryInterface.renameColumn('usuario', 'createdAt', 'created_at'),
      await queryInterface.renameColumn('usuario', 'updatedAt', 'updated_at')
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
