'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.renameTable('AgenteDeVentas', 'agente_de_ventas'),
      await queryInterface.renameTable('CarteraDetalles', 'cartera_detalle'),
      await queryInterface.renameTable('Carteras', 'cartera'),
      await queryInterface.renameTable('Cliente', 'cliente'),
      await queryInterface.renameTable('Meta', 'meta'),
      await queryInterface.renameTable('Pais', 'pais'),
      await queryInterface.renameTable('PaquetesDeViaje', 'paquetes_de_viaje'),
      await queryInterface.renameTable('Permisos', 'permisos'),
      await queryInterface.renameTable('Statuses', 'status'),
      await queryInterface.renameTable('TipoClientes', 'tipo_cliente'),
      await queryInterface.renameTable('Usuarios', 'usuario')
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.dropTable('agente_de_ventas'),
      await queryInterface.dropTable('cartera_detalle'),
      await queryInterface.dropTable('cartera'),
      await queryInterface.dropTable('cliente'),
      await queryInterface.dropTable('meta'),
      await queryInterface.dropTable('pais'),
      await queryInterface.dropTable('paquetes_de_viaje'),
      await queryInterface.dropTable('permisos'),
      await queryInterface.dropTable('status'),
      await queryInterface.dropTable('tipo_cliente'),
      await queryInterface.dropTable('usuario')
    ])
  }
}
