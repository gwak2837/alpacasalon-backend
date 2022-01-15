import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { QueryResolvers } from '../generated/graphql'
import { commentORM } from './ORM'
import commentsByPost from './sql/commentsByPost.sql'
import doesUserJoinGroup from './sql/doesUserJoinGroup.sql'

export const Query: QueryResolvers<ApolloContext> = {
  commentsByPost: async (_, { postId }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    // const doesUserJoinGroupResult = await poolQuery(doesUserJoinGroup, [postId, userId])
    // if (doesUserJoinGroupResult.rows[0].user_id == userId)
    //   throw new ForbiddenError('그룹에 가입해주세요.')

    const { rows } = await poolQuery(commentsByPost, [postId, userId])

    return commentORM(rows)
  },
}
