'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      // tabla cartera
      await queryInterface
        .addColumn('cartera', 'id_cliente', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cartera', {
            fields: ['id_cliente'],
            name: 'fk_cartera_cliente',
            type: 'foreign key',
            references: {
              table: 'cliente',
              field: 'id_cliente'
            },
            onDelete: 'SET NULL'
          })
        ),
      await queryInterface
        .addColumn('cartera', 'id_vendedor', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cartera', {
            fields: ['id_vendedor'],
            name: 'fk_cartera_vendedor',
            type: 'foreign key',
            references: {
              table: 'agente_de_ventas',
              field: 'id_agente_ventas'
            },
            onDelete: 'SET NULL'
          })
        ),
      // tabla cartera_detalle
      await queryInterface
        .addColumn('cartera_detalle', 'id_cartera', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cartera_detalle', {
            fields: ['id_cartera'],
            name: 'fk_cartera_detalle',
            type: 'foreign key',
            references: {
              table: 'cartera',
              field: 'id_cartera'
            },
            onDelete: 'SET NULL'
          })
        ),
      await queryInterface
        .addColumn('cartera_detalle', 'id_paquete', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cartera_detalle', {
            fields: ['id_paquete'],
            name: 'fk_cartera_paquete',
            type: 'foreign key',
            references: {
              table: 'paquetes_de_viaje',
              field: 'id_paquete'
            },
            onDelete: 'SET NULL'
          })
        ),
      await queryInterface
        .addColumn('cartera_detalle', 'id_pais', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cartera_detalle', {
            fields: ['id_pais'],
            name: 'fk_cartera_pais',
            type: 'foreign key',
            references: {
              table: 'pais',
              field: 'id_pais'
            },
            onDelete: 'SET NULL'
          })
        ),
      // tabla cliente
      await queryInterface
        .addColumn('cliente', 'tipo_cliente', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('cliente', {
            fields: ['tipo_cliente'],
            name: 'fk_tipo_cliente',
            type: 'foreign key',
            references: {
              table: 'tipo_cliente',
              field: 'id_tipo_cliente'
            },
            onDelete: 'SET NULL'
          })
        ),
      // tabla meta
      await queryInterface
        .addColumn('meta', 'id_agente', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('meta', {
            fields: ['id_agente'],
            name: 'fk_agente_meta',
            type: 'foreign key',
            references: {
              table: 'agente_de_ventas',
              field: 'id_agente_ventas'
            },
            onDelete: 'SET NULL'
          })
        ),
      // tabla paquetes_de_viaje
      await queryInterface
        .addColumn('paquetes_de_viaje', 'id_status', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('paquetes_de_viaje', {
            fields: ['id_status'],
            name: 'fk_status_paquete',
            type: 'foreign key',
            references: {
              table: 'status',
              field: 'id_status'
            },
            onDelete: 'SET NULL'
          })
        ),
      // tabla usuario
      await queryInterface
        .addColumn('usuario', 'id_permiso', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('usuario', {
            fields: ['id_permiso'],
            name: 'fk_usuario_permiso',
            type: 'foreign key',
            references: {
              table: 'permisos',
              field: 'id_permiso'
            },
            onDelete: 'SET NULL'
          })
        ),
      await queryInterface
        .addColumn('usuario', 'id_agente_ventas', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
        .then(() =>
          queryInterface.addConstraint('usuario', {
            fields: ['id_agente_ventas'],
            name: 'fk_usuario_agente',
            type: 'foreign key',
            references: {
              table: 'agente_de_ventas',
              field: 'id_agente_ventas'
            },
            onDelete: 'SET NULL'
          })
        )
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
