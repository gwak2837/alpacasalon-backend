import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { MutationResolvers, ZoomReview } from '../generated/graphql'
import checkZoom from './sql/checkZoom.sql'
import createZoomReview from './sql/createZoomReview.sql'

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
}
