import { MetaDetalle, Usuario, Cartera, sequelize, Sequelize } from 'db/models'

const buildMetaQuery = (queryParams) => {
  const queryOptions = {
    attributes: [
      'id_meta_general',
      'meta_alcanzar',
      'mes',
      'anio',
      [
        sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('detalle.usuario.ventas.total_pagar')), 0),
        'meta_acumulada'
      ]
    ],
    include: {
      model: MetaDetalle,
      as: 'detalle',
      attributes: [],
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: [],
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
          }
        }
      }
    },
    group: ['MetaGeneral.id_meta_general', 'MetaGeneral.meta_alcanzar', 'MetaGeneral.mes', 'MetaGeneral.anio']
  }
  return queryOptions
}
export default buildMetaQuery
