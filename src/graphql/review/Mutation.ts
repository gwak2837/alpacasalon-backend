import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { MutationResolvers, Review } from '../generated/graphql'
import { graphqlRelationMapping } from '../common/ORM'
import createZoomReview from './sql/createZoomReview.sql'
import checkZoom from './sql/checkZoom.sql'
import checkZoomReview from './sql/checkZoomReview.sql'
import createOrDeleteZoomReviewLike from './sql/createOrDeleteZoomReviewLike.sql'
import countZoomReviewLike from './sql/countZoomReviewLike.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  createZoomReview: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    if (!input.zoomId) {
      throw new UserInputError('')
    }

    const { rowCount } = await poolQuery(checkZoom, [input.zoomId])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    const { rows } = await poolQuery(createZoomReview, [input.contents, input.zoomId, userId])

    return graphqlRelationMapping(rows[0], 'review')
  },

  toggleLikingZoomReview: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount } = await poolQuery(checkZoomReview, [id])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    const likeResult = await poolQuery(createOrDeleteZoomReviewLike, [
      'd4dbb193-389c-4c0d-b6b6-8adb9d279c5a',
      id,
    ])

    const countResult = await poolQuery(countZoomReviewLike, [id])

    return {
      id,
      isLiked: likeResult.rows[0].result,
      likedCount: countResult.rows[0].counts,
    } as Review
  },
}
