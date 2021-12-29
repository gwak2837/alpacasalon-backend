import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { pool, poolQuery } from '../../database/postgres'
import { Comment, MutationResolvers } from '../generated/graphql'
import { getFirstLine } from '../post/ORM'
import checkCommentInPost from './sql/checkCommentInPost.sql'
import createComment from './sql/createComment.sql'
import createLikingCommentNotification from './sql/createLikingCommentNotification.sql'
import createNewCommentNotification from './sql/createNewCommentNotification.sql'
import createNewSubcommentNotification from './sql/createNewSubcommentNotification.sql'
import deleteComment from './sql/deleteComment.sql'
import deleteLikingCommentNotification from './sql/deleteLikingCommentNotification.sql'
import getLikingComment from './sql/getLikingComment.sql'
import getUserIdOfParentComment from './sql/getUserIdOfParentComment.sql'
import getUserIdOfPost from './sql/getUserIdOfPost.sql'
import toggleLikingComment from './sql/toggleLikingComment.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  toggleLikingComment: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(toggleLikingComment, [userId, id])
    const isLiked = rows[0].result

    pool
      .query(getLikingComment, [id])
      .then(({ rows }) => {
        if (isLiked) {
          return poolQuery(createLikingCommentNotification, [
            getFirstLine(rows[0].contents),
            rows[0].user_id,
            userId,
          ])
        } else {
          return poolQuery(deleteLikingCommentNotification, [
            new Date(Date.now() - 600_000),
            getFirstLine(rows[0].contents),
            rows[0].user_id,
            userId,
          ])
        }
      })
      .catch((err) => console.error(err))

    return { id, isLiked, likedCount: rows[0].liked_count } as Comment
  },

  createComment: async (_, { postId, contents, commentId }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    if (commentId) {
      const { rowCount } = await poolQuery(checkCommentInPost, [postId, commentId])
      if (rowCount === 0)
        throw new UserInputError(
          `postId: ${postId}, commentId: ${commentId} 에 해당하는 댓글에 대댓글을 작성할 수 없습니다.`
        )
    }

    const { rows } = await poolQuery(createComment, [contents, postId, userId, commentId])

    if (commentId) {
      pool
        .query(getUserIdOfParentComment, [commentId])
        .then(({ rows }) => {
          return poolQuery(createNewSubcommentNotification, [
            getFirstLine(contents),
            rows[0].user_id,
            userId,
          ])
        })
        .catch((err) => console.error(err))
    } else {
      pool
        .query(getUserIdOfPost, [postId])
        .then(({ rows }) => {
          return poolQuery(createNewCommentNotification, [
            getFirstLine(contents),
            rows[0].user_id,
            userId,
          ])
        })
        .catch((err) => console.error(err))
    }

    return { id: rows[0].id } as Comment
  },

  deleteComment: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const results = await poolQuery(deleteComment, [id, userId])

    return { id: results.rows[0].deleted_comment_id } as Comment
  },
}
