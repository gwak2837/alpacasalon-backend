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

    const { rows } = await poolQuery(doesUserJoinGroup, [userId, postId])

    if (!rows[0].user_id) throw new ForbiddenError('해당 그룹에 속해 있지 않습니다.')

    const { rows: rows2 } = await poolQuery(commentsByPost, [postId, userId])

    return commentORM(rows2)
  },
}
