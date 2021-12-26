import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { graphqlRelationMapping } from '../common/ORM'
import { MutationResolvers } from '../generated/graphql'
import createGroup from './sql/createGroup.sql'
import updateGroup from './sql/updateGroup.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  createGroup: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(createGroup, [
      userId,
      input.name,
      input.description,
      input.imageUrl.href,
    ])

    return graphqlRelationMapping(rows[0], 'group')
  },

  // updateGroup: async (_, { input }, { userId }) => {
  //   if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

  //   const { rowCount, rows } = await poolQuery(updateGroup, [
  //     input.title,
  //     input.contents,
  //     input.imageUrls?.map((imageUrl) => imageUrl.href),
  //     input.id,
  //     userId,
  //   ])
  //   if (rowCount === 0)
  //     throw new UserInputError(
  //       `id:${input.id} 의 게시글이 존재하지 않거나, 해당 게시글의 작성자가 아닙니다.`
  //     )

  //   return graphqlRelationMapping(rows[0], 'post')
  // },
}
