import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { MutationResolvers } from '../generated/graphql'
import readNotifications from './sql/readNotifications.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  readNotifications: async (_, { ids }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(readNotifications, [ids])
    console.log('👀 - rows', rows)

    return rows[0]
  },
}
