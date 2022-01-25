/* eslint-disable promise/always-return */
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

    const { rows } = await poolQuery(getLikingComment, [id])
    const commentAuthor = rows[0].user_id
    const postId = rows[0].post_id

    if (commentAuthor === userId) throw new UserInputError('댓글 자추는 지양해주세요~')

    const { rows: rows2 } = await poolQuery(toggleLikingComment, [userId, id])
    const isLiked = rows2[0].result

    if (commentAuthor) {
      if (isLiked) {
        pool
          .query(createLikingCommentNotification, [
            getFirstLine(rows[0].contents),
            `/post/${postId}?commentId=${id}`,
            commentAuthor,
            userId,
          ])
          .catch((err) => console.error(err))
      } else {
        pool
          .query(deleteLikingCommentNotification, [
            new Date(Date.now() - 600_000),
            getFirstLine(rows[0].contents),
            commentAuthor,
            userId,
          ])
          .catch((err) => console.error(err))
      }
    }

    return { id, isLiked, likedCount: rows2[0].liked_count } as Comment
  },

  createComment: async (_, { postId, contents, parentCommentId }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    if (parentCommentId) {
      const { rowCount } = await poolQuery(checkCommentInPost, [postId, parentCommentId])
      if (rowCount === 0)
        throw new UserInputError(
          `postId: ${postId}, parentCommentId: ${parentCommentId} 에 해당하는 댓글에 대댓글을 작성할 수 없습니다.`
        )
    }

    const { rows } = await poolQuery(createComment, [contents, postId, userId, parentCommentId])
    const commentId = rows[0].id

    if (parentCommentId) {
      pool
        .query(getUserIdOfParentComment, [parentCommentId])
        .then(({ rows }) => {
          const parentCommentAuthorId = rows[0].user_id
          if (parentCommentAuthorId && userId !== parentCommentAuthorId) {
            poolQuery(createNewSubcommentNotification, [
              getFirstLine(contents),
              `/post/${postId}?commentId=${commentId}`,
              parentCommentAuthorId,
              userId,
            ])
          }
        })
        .catch((err) => console.error(err))
    } else {
      pool
        .query(getUserIdOfPost, [postId])
        .then(({ rows }) => {
          const postAuthorId = rows[0].user_id
          if (postAuthorId && userId !== postAuthorId) {
            poolQuery(createNewCommentNotification, [
              getFirstLine(contents),
              `/post/${postId}?commentId=${commentId}`,
              postAuthorId,
              userId,
            ])
          }
        })
        .catch((err) => console.error(err))
    }

    return { id: rows[0].id } as Comment
  },

  deleteComment: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const results = await poolQuery(deleteComment, [id, userId])
    // 해당 댓글과 연관된 알림 지우기

    return { id: results.rows[0].deleted_comment_id } as Comment
  },
}
