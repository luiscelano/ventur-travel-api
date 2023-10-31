import { Cliente, Usuario, Paquete, Pais, sequelize, Sequelize } from 'db/models'
import parseQuery from 'utils/parseQuery'

const buildCarteraSummaryQuery = (queryParams) => {
  const query = parseQuery(queryParams)
  if (!query.group) {
    throw Error('"group" es un campo requerido')
  }
  const queryOptions = {
    attributes: [
      [sequelize.fn('COALESCE', sequelize.fn('COUNT', sequelize.col('Cartera.id_cartera')), 0), 'numeroVentas'],
      [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('Cartera.total_pagar')), 0), 'totalVendido'],
      [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('Cartera.cantidad_turistas')), 0), 'totalTuristas'],
      [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('Cartera.cantidad_paquetes')), 0), 'totalPaquetes']
    ],
    where: {}
  }

  if (query.mes)
    Object.assign(queryOptions.where, {
      [Sequelize.Op.and]: [sequelize.where(sequelize.fn('MONTH', sequelize.col('Cartera.created_at')), query.mes)]
    })
  if (query.anio)
    Object.assign(queryOptions.where, {
      [Sequelize.Op.and]: [sequelize.where(sequelize.fn('YEAR', sequelize.col('Cartera.created_at')), query.anio)]
    })

  if (query.idCliente)
    Object.assign(queryOptions.where, {
      id_cliente: query.idCliente
    })
  if (query.idVendedor)
    Object.assign(queryOptions.where, {
      id_usuario: query.idVendedor
    })

  if (query.group === 'mes') {
    Object.assign(queryOptions, {
      attributes: [
        ...queryOptions.attributes,
        [sequelize.fn('MONTH', sequelize.col('Cartera.created_at')), 'mes'],
        [sequelize.fn('YEAR', sequelize.col('Cartera.created_at')), 'anio']
      ],
      group: [
        sequelize.fn('MONTH', sequelize.col('Cartera.created_at')),
        sequelize.fn('YEAR', sequelize.col('Cartera.created_at'))
      ]
    })
  } else if (query.group === 'anio') {
    Object.assign(queryOptions, {
      attributes: [...queryOptions.attributes, [sequelize.fn('YEAR', sequelize.col('Cartera.created_at')), 'anio']],
      group: [sequelize.fn('YEAR', sequelize.col('Cartera.created_at'))]
    })
  } else {
    throw Error('"group" debe de ser mes o anio')
  }
  return queryOptions
}

export default buildCarteraSummaryQuery
