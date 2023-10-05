import { Cartera } from 'db/models'

export const getCarteras = async (__, res) => {
  try {
    const carteras = await Cartera.findAll()

    return res.status(200).json({ carteras })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const createCartera = async (req, res) => {
  try {
    const cartera = await Cartera.create()
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
