import { MetaGeneral } from 'db/models'
import buildMetaQuery from 'queries/buildMetaQuery'
import buildMetaDetalleQuery from 'queries/buildMetaDetalleQuery'
import parseQuery from 'utils/parseQuery'

export const getMeta = async (req, res) => {
  try {
    const queryByUser = {
      id_usuario: req.user.idUsuario
    }

    const queryParams = parseQuery(req.query)
    const metaQuery = buildMetaQuery(queryParams)
    if (req.query) Object.assign(metaQuery, { where: queryParams })

    if (!req.user.isAdmin) Object.assign(metaQuery.include, { where: queryByUser })
    const metaResponse = await MetaGeneral.findAll(metaQuery)
    if (!metaResponse || !metaResponse.length)
      return res.status(200).json({
        message: req.user.isAdmin
          ? 'No hay una meta creada para esta fecha'
          : 'No tienes meta asignada para esta fecha',
        meta: null
      })

    const meta = metaResponse[0]?.toJSON() || {}

    if (req.user.isAdmin) {
      const metaDetalleQuery = buildMetaDetalleQuery(queryParams)
      if (req.query) Object.assign(metaDetalleQuery, { where: queryParams })
      const metaDetalleResponse = await MetaGeneral.findAll(metaDetalleQuery)
      const detalle = metaDetalleResponse[0].toJSON()
      Object.assign(meta, { ...detalle })
    }

    return res.status(200).json({ meta })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const createMeta = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(405).json({
        message: 'No tienes permiso de realizar esta acción'
      })
    const body = {
      ...req.body
    }
    const meta = await MetaGeneral.create(body)
    if (!meta)
      return res.status(400).json({
        message: 'Error al crear la meta'
      })

    return res.status(200).json({ meta })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}
