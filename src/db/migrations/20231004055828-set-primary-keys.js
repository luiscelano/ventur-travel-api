'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.renameColumn('agente_de_ventas', 'id', 'id_agente_ventas'),
      await queryInterface.renameColumn('cartera', 'id', 'id_cartera'),
      await queryInterface.renameColumn('cartera_detalle', 'id', 'id_cartera_detalle'),
      await queryInterface.renameColumn('cliente', 'id', 'id_cliente'),
      await queryInterface.renameColumn('meta', 'id', 'id_meta'),
      await queryInterface.renameColumn('pais', 'id', 'id_pais'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'id', 'id_paquete'),
      await queryInterface.renameColumn('permisos', 'id', 'id_permiso'),
      await queryInterface.renameColumn('status', 'id', 'id_status'),
      await queryInterface.renameColumn('tipo_cliente', 'id', 'id_tipo_cliente'),
      await queryInterface.renameColumn('usuario', 'id', 'id_usuario')
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
