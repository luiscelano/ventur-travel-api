import { MetaDetalle, Usuario, Cartera, sequelize, Sequelize } from 'db/models'

const buildMetaDetalleQuery = (queryParams) => {
  const queryOptions = {
    attributes: [],
    include: {
      model: MetaDetalle,
      as: 'detalle',
      attributes: [
        'id_usuario',
        [
          sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('detalle.usuario.ventas.total_pagar')), 0),
          'meta_acumulada'
        ]
      ],
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['nombre', 'apellido'],
        include: {
          model: Cartera,
          as: 'ventas',
          attributes: [],
          where: {
            [Sequelize.Op.and]: [
              sequelize.where(
                sequelize.fn('MONTH', sequelize.col('detalle.usuario.ventas.created_at')),
                queryParams.mes
              ),
              sequelize.where(
                sequelize.fn('YEAR', sequelize.col('detalle.usuario.ventas.created_at')),
                queryParams.anio
              )
            ]
          },
          required: false
        }
      }
    },
    group: [
      'detalle.id_usuario',
      'detalle.usuario.nombre',
      'detalle.usuario.apellido',
      'detalle.usuario.id_usuario',
      'detalle.id_meta_detalle',
      'MetaGeneral.id_meta_general'
    ]
  }
  return queryOptions
}

export default buildMetaDetalleQuery
