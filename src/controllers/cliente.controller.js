import { Cliente, TipoCliente } from 'db/models'

export const getClientes = async (__, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: TipoCliente,
          as: 'tipoCliente'
        }
      ]
    })

    return res.status(200).json({ clientes })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body)
    if (!cliente)
      return res.status(400).json({
        message: 'Error al crear cliente'
      })

    return res.status(200).json({ cliente })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
