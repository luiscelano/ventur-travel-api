'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      metaMes: {
        type: Sequelize.INTEGER
      },
      metaAnio: {
        type: Sequelize.INTEGER
      },
      metaAlcanzar: {
        type: Sequelize.FLOAT
      },
      metaAcumulada: {
        type: Sequelize.FLOAT
      },
      metaPorcentajeCumplido: {
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Metas')
  }
}
