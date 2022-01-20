import { AuthenticationError } from 'apollo-server-express'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { unregisterKakaoUser } from '../../express/oauth'
import { graphqlRelationMapping } from '../common/ORM'
import { MutationResolvers } from '../generated/graphql'
import getUserKakaoId from './sql/getUserKakaoId.sql'
import logout from './sql/logout.sql'
import unregister from './sql/unregister.sql'
import updateUser from './sql/updateUser.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  logout: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    await poolQuery(logout, [userId])

    return true
  },

  unregister: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const user = await poolQuery(getUserKakaoId, [userId])
    unregisterKakaoUser(user.rows[0].kakao_oauth)

    const { rows } = await poolQuery(unregister, [userId])

    return graphqlRelationMapping(rows[0])
  },

  updateUser: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인되어 있지 않습니다. 로그인 후 시도해주세요.')

    const { rows } = await poolQuery(updateUser, [
      input.nickname,
      input.imageUrl?.href,
      input.email,
      input.phoneNumber,
      input.gender,
      input.ageRange,
      input.birthday,
      input.bio,
      userId,
    ])

    return graphqlRelationMapping(rows[0])
  },
}
