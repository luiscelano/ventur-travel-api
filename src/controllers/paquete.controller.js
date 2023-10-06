import { Paquete, Contacto, StatusPaquete } from 'db/models'

export const getPaquetes = async (__, res) => {
  try {
    const paquetes = await Paquete.findAll({
      include: [
        {
          model: Contacto,
          as: 'contacto'
        },
        {
          model: StatusPaquete,
          as: 'status'
        }
      ]
    })

    return res.status(200).json({ paquetes })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const createPaquete = async (req, res) => {
  try {
    const paquete = await Paquete.create(req.body)
    if (!paquete)
      return res.status(400).json({
        message: 'No se pudo crear el paquete'
      })

    return res.status(200).json({ paquete })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
