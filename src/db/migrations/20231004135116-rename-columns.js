'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.renameColumn('agente_de_ventas', 'fechaNac', 'fecha_nac'),
      await queryInterface.renameColumn('agente_de_ventas', 'fechaIngreso', 'fecha_ingreso'),
      await queryInterface.renameColumn('cartera', 'carteraFechaVenta', 'cartera_fecha_venta'),
      await queryInterface.renameColumn('cartera_detalle', 'carteraCantidadTuristas', 'cartera_cantidad_turistas'),
      await queryInterface.renameColumn('cartera_detalle', 'carteraFechaInicio', 'cartera_fecha_inicio'),
      await queryInterface.renameColumn('cartera_detalle', 'carteraFechaFin', 'cartera_fecha_fin'),
      await queryInterface.renameColumn('cartera_detalle', 'carteraCantidadPaquetes', 'cartera_cantidad_paquetes'),
      await queryInterface.renameColumn('cartera_detalle', 'carteraPrecioXPaquete', 'cartera_precio_x_paquete'),
      await queryInterface.renameColumn('cliente', 'correoElectronico', 'correo_electronico'),
      await queryInterface.renameColumn('meta', 'metaMes', 'meta_mes'),
      await queryInterface.renameColumn('meta', 'metaAnio', 'meta_anio'),
      await queryInterface.renameColumn('meta', 'metaAlcanzar', 'meta_alcanzar'),
      await queryInterface.renameColumn('meta', 'metaAcumulada', 'meta_acumulada'),
      await queryInterface.renameColumn('meta', 'metaPorcentajeCumplido', 'meta_porcentaje_cumplido'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'cantidadAdl', 'cantidad_adl'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'cantidadChd', 'cantidad_chd'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'cantidadNoches', 'cantidad_noches'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'fechaInicio', 'fecha_inicio'),
      await queryInterface.renameColumn('paquetes_de_viaje', 'fechaFin', 'fecha_fin')
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
