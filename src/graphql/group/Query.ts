import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import group from './sql/group.sql'
import myGroups from './sql/myGroups.sql'
import recommandationGroups from './sql/recommandationGroups.sql'

export const Query: QueryResolvers<ApolloContext> = {
  myGroups: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(myGroups, [userId])

    return rows.map((row) => graphqlRelationMapping(row, 'group'))
  },

  recommendationGroups: async () => {
    const { rows } = await poolQuery(recommandationGroups)

    return rows.map((row) => graphqlRelationMapping(row, 'group'))
  },

  group: async (_, { id }) => {
    const { rows } = await poolQuery(group, [id, new Date(Date.now() - 3 * 86_400_000)])

    return graphqlRelationMapping(rows[0], 'group')
  },
}
