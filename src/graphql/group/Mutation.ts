import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { Group, MutationResolvers } from '../generated/graphql'
import createGroup from './sql/createGroup.sql'
import joinGroup from './sql/joinGroup.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  createGroup: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(createGroup, [
      userId,
      input.name,
      input.description,
      input.imageUrl.href,
    ])

    return { id: rows[0].group_id } as Group
  },

  joinGroup: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(joinGroup, [userId, id])

    return rows[0].result
  },
}
