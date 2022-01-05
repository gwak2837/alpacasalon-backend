import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { buildSelect } from '../../utils/sql'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import zoom from './sql/zoom.sql'
import zooms from './sql/zooms.sql'

export const Query: QueryResolvers<ApolloContext> = {
  zoom: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount, rows } = await poolQuery(zoom, [id, userId])

    if (rowCount === 0) throw new UserInputError(`id:${id} 의 Zoom을 찾을 수 없습니다.`)

    return graphqlRelationMapping(rows[0], 'zoom')
  },

  zooms: async (_, { pagination }) => {
    let sql = zooms
    const values = [pagination.limit]

    // Pagination
    if (pagination.lastId) {
      sql = buildSelect(sql, 'WHERE', 'zoom.id < $1')
      values.push(pagination.lastId)
    }

    const { rows } = await poolQuery(sql, values)

    return rows.map((row) => graphqlRelationMapping(row, 'zoom'))
  },
}
