'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('agente_de_ventas', 'id_status', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
      .then(() =>
        queryInterface.addConstraint('agente_de_ventas', {
          fields: ['id_status'],
          name: 'fk_status_agente',
          type: 'foreign key',
          references: {
            table: 'status',
            field: 'id_status'
          },
          onDelete: 'SET NULL'
        })
      )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('agente_de_ventas', 'id_status')
  }
}
