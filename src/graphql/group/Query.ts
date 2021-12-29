import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import myGroups from './sql/myGroups.sql'

export const Query: QueryResolvers<ApolloContext> = {
  myGroups: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(myGroups, [userId])

    return rows.map((row) => graphqlRelationMapping(row, 'group'))
  },
}