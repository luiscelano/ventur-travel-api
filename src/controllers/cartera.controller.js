import { Cartera, Cliente, Usuario, Paquete, Pais } from 'db/models'

export const getCarteras = async (req, res) => {
  try {
    const queryOptions = {
      include: [
        {
          model: Cliente,
          as: 'cliente'
        },
        {
          model: Usuario,
          as: 'vendedor'
        },
        {
          model: Pais,
          as: 'pais'
        }
      ]
    }

    if (!req.user.isAdmin)
      Object.assign(queryOptions, {
        where: {
          id_usuario: req.user.idUsuario
        }
      })

    const carteras = await Cartera.findAll(queryOptions)

    return res.status(200).json({ carteras })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const createCartera = async (req, res) => {
  const response = { ...req.body }
  const paqueteResponse = await Paquete.findByPk(response.id_paquete)

  if (!paqueteResponse) return res.status(404).json({ message: 'No pudimos encontrar el paquete' })

  const paquete = paqueteResponse.toJSON()
  const totalPagar = response.cantidadPaquetes * paquete.precio

  Object.assign(response, {
    id_usuario: req.user.idUsuario,
    totalPagar
  })
  try {
    const cartera = await Cartera.create(response)
    if (!cartera)
      return res.status(400).json({
        message: 'error al crear cartera'
      })

    return res.status(200).json({ cartera })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
