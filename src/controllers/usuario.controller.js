import { Usuario, MetaDetalle, MetaGeneral, TipoUsuario } from 'db/models'
import { Usuario as UsuarioSchema } from 'schemas'
import SimpleSchema from 'simpl-schema'
import parseQuery from 'utils/parseQuery'

export const getUsuarios = async (req, res) => {
  try {
    const queryOptions = {}
    if (!req.user.isAdmin)
      return res.status(401).json({
        message: 'No tienes permiso de realizar esta acción'
      })
    if (req.query) Object.assign(queryOptions, { where: parseQuery(req.query) })
    const usuarioResponse = await Usuario.findAll({
      include: {
        model: TipoUsuario,
        as: 'permiso'
      },
      ...queryOptions
    })
    const cleanedOutput = Array.from(usuarioResponse || []).map((usuario) => {
      return UsuarioSchema.clean(usuario.toJSON())
    })
    return res.status(200).json({ usuarios: cleanedOutput })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.update(req.body, {
      where: {
        id_usuario: req.params.idUsuario
      }
    })
    if (!usuario)
      return res.status(400).json({
        message: 'error al actualizar usuario o usuario no encontrado'
      })

    return res.status(200).json({ usuario })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const asignarMeta = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(401).json({
        message: 'No tienes permiso de realizar esta acción'
      })
    const metaDetalle = await MetaDetalle.findOne({
      where: {
        id_meta_general: req.params.idMeta,
        id_usuario: req.params.idUsuario
      }
    })
    if (metaDetalle)
      return res.status(400).json({
        message: 'El usuario ya tiene esta meta asignada'
      })

    const metaGeneral = await MetaGeneral.findByPk(req.params.idMeta)
    if (!metaGeneral)
      return res.status(404).json({
        message: 'La meta general enviada no existe'
      })

    const body = {
      id_meta_general: req.params.idMeta,
      id_usuario: req.params.idUsuario,
      metaAlcanzar: metaGeneral.toJSON().metaAlcanzar
    }

    const meta = await MetaDetalle.create(body)
    if (!meta)
      return res.status(400).json({
        message: 'error al asignar meta'
      })
    return res.status(200).json({ meta })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const getPermisos = async (req, res) => {
  try {
    const permisos = await TipoUsuario.findAll()

    return res.status(200).json({ permisos })
  } catch (error) {
    return res.status(500).json({
      message: error.toString()
    })
  }
}


