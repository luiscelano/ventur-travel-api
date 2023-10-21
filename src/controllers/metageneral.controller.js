import { MetaGeneral } from 'db/models'
import { MetaDetalle } from 'db/models'
import { Usuario } from 'db/models'
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
      const detalle = Array.from(metaDetalleResponse[0].toJSON().detalle || []).map((detalle) => {
        const meta_alcanzar = meta.meta_alcanzar / metaDetalleResponse[0].toJSON().detalle.length || 0
        return { ...detalle, meta_alcanzar }
      })
      Object.assign(meta, { detalle })
    }

    return res.status(200).json({ meta })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const getMetas = async (req, res) => {
  try {
    const metas = await MetaGeneral.findAll()

    return res.status(200).json({ metas })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error al obtener las metas',
      error: error.message
    })
  }
}

export const createMeta = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(405).json({
        message: 'No tienes permiso de realizar esta acción'
      })
    }

    // Obtener metaAlcanzar y anio del cuerpo de la solicitud
    const { metaAlcanzar, anio, ...otherData } = req.body

    // Validar que metaAlcanzar sea mayor que 0
    if (metaAlcanzar <= 0) {
      return res.status(400).json({
        message: 'Datos erróneos. "metaAlcanzar" debe ser mayor que 0.'
      })
    }

    // Validar que anio esté en el rango deseado
    if (anio <= 2022 || anio >= 2100) {
      return res.status(400).json({
        message: 'Datos erróneos. "anio" debe estar entre 2022 y 2099.'
      })
    }

    // Contar vendedores con id_tipo_usuario 3
    const vendedoresCount = await Usuario.count({
      where: { id_tipo_usuario: 3 }
    })

    // Calcular metaIndividual
    const metaVendedor = metaAlcanzar / vendedoresCount

    // Crear la meta general
    const metaGeneral = await MetaGeneral.create({
      metaAlcanzar,
      metaIndividual: metaVendedor,
      anio,
      ...otherData
    })

    // Crear registros en la tabla meta_detalle para cada vendedor
    const vendedores = await Usuario.findAll({
      where: { id_tipo_usuario: 3 }
    })

    for (const vendedor of vendedores) {
      await MetaDetalle.create({
        id_meta_general: metaGeneral.idMetaGeneral,
        id_usuario: vendedor.idUsuario,
        metaAlcanzar: metaVendedor
      })
    }

    return res.status(200).json({ metaGeneral })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error.message
    })
  }
}
