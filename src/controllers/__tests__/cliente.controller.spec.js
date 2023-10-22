import { assert, expect } from 'chai'
import request from 'supertest'
import { app } from 'index'

describe('cliente.controller', () => {
  it('test', () => {
    expect(true).to.equal(true)
  })
  it('getClientes() should return two clients', async () => {
    const response = await request(app).get('/clientes')
    assert.equal(response.statusCode, 200)
    assert.equal(response.body.clientes.length, 0)
  })
  it('createCliente() should create a new client', async () => {
    const input = {
      dpi: '123456778',
      nombre: 'John Doe',
      telefono: 12345678,
      direccion: 'av simeon canias zona 2',
      correo: 'john@example.com',
      id_tipo_cliente: 2
    }
    const response = await request(app).post('/clientes').send(input)
    assert.equal(response.statusCode, 200)
    assert.equal(response.body.cliente.idCliente, 1)
  })
})
