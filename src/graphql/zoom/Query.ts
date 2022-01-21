import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { buildSelect } from '../../utils/sql'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import myZooms from './sql/myZooms.sql'
import zoom from './sql/zoom.sql'
import zoomRecommend from './sql/zoomRecommend.sql'
import zooms from './sql/zooms.sql'
import zoomTitleById from './sql/zoomTitleById.sql'

export const Query: QueryResolvers<ApolloContext> = {
  zoom: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount, rows } = await poolQuery(zoom, [id, userId])

    if (rowCount === 0) throw new UserInputError(`id:${id} 의 Zoom을 찾을 수 없습니다.`)

    return graphqlRelationMapping(rows[0])
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

    return rows.map((row) => graphqlRelationMapping(row))
  },

  myZooms: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(myZooms, [userId])

    return rows.map((row) => graphqlRelationMapping(row))
  },

  zoomTitleById: async (_, { id }) => {
    const { rows } = await poolQuery(zoomTitleById, [id])

    return graphqlRelationMapping(rows[0])
  },

  zoomRecommend: async () => {
    const { rows } = await poolQuery(zoomRecommend)

    return rows.map((row) => graphqlRelationMapping(row))
  },
}
