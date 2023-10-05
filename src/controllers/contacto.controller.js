import { Contacto } from 'db/models'

export const getContactos = async (__, res) => {
  try {
    const contactos = await Contacto.findAll()

    return res.status(200).json({ contactos })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const createContacto = async (req, res) => {
  try {
    const contacto = await Contacto.create(req.body)

    if (!contacto)
      return res.status(400).json({
        message: 'error al crear contacto'
      })

    return res.status(200).json({ contacto })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
