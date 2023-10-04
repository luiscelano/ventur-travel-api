'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CarteraDetalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carteraCantidadTuristas: {
        type: Sequelize.INTEGER
      },
      carteraFechaInicio: {
        type: Sequelize.DATE
      },
      carteraFechaFin: {
        type: Sequelize.DATE
      },
      carteraCantidadPaquetes: {
        type: Sequelize.INTEGER
      },
      carteraPrecioXPaquete: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CarteraDetalles');
  }
};