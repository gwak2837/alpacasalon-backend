import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { MutationResolvers, ZoomReview } from '../generated/graphql'
import checkZoom from './sql/checkZoom.sql'
import checkZoomReview from './sql/checkZoomReview.sql'
import countZoomReviewLike from './sql/countZoomReviewLike.sql'
import createZoomReview from './sql/createZoomReview.sql'
import toggleLikingZoomReview from './sql/toggleLikingZoomReview.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  createZoomReview: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount } = await poolQuery(checkZoom, [input.zoomId])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    const { rows } = await poolQuery(createZoomReview, [input.contents, input.zoomId, userId])

    return {
      id: rows[0].id,
    } as ZoomReview
  },

  toggleLikingZoomReview: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount } = await poolQuery(checkZoomReview, [id])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    const { rows } = await poolQuery(toggleLikingZoomReview, [userId, id])

    return {
      id,
      isLiked: rows[0].result,
      likedCount: rows[0].likes_count,
    } as ZoomReview
  },
}
