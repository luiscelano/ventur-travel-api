import { Cartera, Paquete } from 'db/models'
import buildCarteraQuery from 'queries/buildCarteraQuery'
import buildCarteraSummaryQuery from 'queries/buildCarteraSummaryQuery'

export const getCarteras = async (req, res) => {
  try {
    const queryOptions = buildCarteraQuery(req.query, req.user.isAdmin)
    if (!req.user.isAdmin)
      Object.assign(queryOptions.where, {
        id_usuario: req.user.idUsuario
      })

    const carteraResponse = await Cartera.findAll(queryOptions)
    const carteras = Array.from(carteraResponse || []).map((cartera) => cartera.toJSON())
    const total = carteras.reduce((previous, current) => previous + current.totalPagar, 0)

    return res.status(200).json({ total, carteras })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const getCarteraSummary = async (req, res) => {
  try {
    const queryOptions = buildCarteraSummaryQuery(req.query)
    if (!req.user.isAdmin)
      Object.assign(queryOptions.where, {
        id_usuario: req.user.idUsuario
      })

    const carteraResponse = await Cartera.findAll(queryOptions)
    const carteras = Array.from(carteraResponse || []).map((cartera) => cartera.toJSON())

    return res.status(200).json({ carteras })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.toString() })
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
