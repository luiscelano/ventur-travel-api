'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [
      {
        id_status_vendedor: 2,
        id_tipo_usuario: 1,
        correo: 'luiscelano46@gmail.com',
        contrasenia: '$2b$10$ZUlXgtqUPBvud.6/Pq2zQO/rjUC49JeECG1v418agr7.4VDe7//Oe',
        nombre: 'Luis',
        apellido: 'Alvarado',
        dpi: '123456677',
        fecha_nac: new Date('2000-08-23'),
        fecha_ingreso: new Date('2023-10-01'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id_status_vendedor: 2,
        id_tipo_usuario: 3,
        correo: 'luiscelano123@live.com',
        contrasenia: '$2b$10$ZUlXgtqUPBvud.6/Pq2zQO/rjUC49JeECG1v418agr7.4VDe7//Oe',
        nombre: 'Luis',
        apellido: 'Celano',
        dpi: '1234563677',
        fecha_nac: new Date('2000-08-23'),
        fecha_ingreso: new Date('2023-10-01'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {})
  }
}
