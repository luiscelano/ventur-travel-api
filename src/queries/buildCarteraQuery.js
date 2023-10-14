import { Cliente, Usuario, Paquete, Pais, sequelize, Sequelize } from 'db/models'
import parseQuery from 'utils/parseQuery'

const buildCarteraQuery = (queryParams, isAdmin) => {
  const queryOptions = {
    include: [
      {
        model: Cliente,
        as: 'cliente'
      },
      {
        model: Usuario,
        as: 'vendedor'
      },
      {
        model: Pais,
        as: 'pais'
      },
      {
        model: Paquete,
        as: 'paquete'
      }
    ],
    where: {}
  }
  if (queryParams) {
    const query = parseQuery(queryParams)
    if (query.mes && query.anio)
      Object.assign(queryOptions.where, {
        [Sequelize.Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('Cartera.created_at')), query.mes),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('Cartera.created_at')), query.anio)
        ]
      })
    if (isAdmin && query.idVendedor)
      Object.assign(queryOptions.where, {
        id_usuario: query.idVendedor
      })
    if (query.idCliente) {
      Object.assign(queryOptions.where, {
        id_cliente: query.idCliente
      })
    }
  }
  return queryOptions
}

export default buildCarteraQuery
