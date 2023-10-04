'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AgenteDeVentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dpi: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      fechaNac: {
        type: Sequelize.DATE
      },
      sucursal: {
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        type: Sequelize.DATE
      },
      nombre: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('AgenteDeVentas');
  }
};