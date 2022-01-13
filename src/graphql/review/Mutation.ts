import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { MutationResolvers } from '../generated/graphql'
import createZoomReview from './sql/createZoomReview.sql'
import checkZoom from './sql/checkZoom.sql'
import { graphqlRelationMapping } from '../common/ORM'

export const Mutation: MutationResolvers<ApolloContext> = {
  createZoomReview: async (_, { input }, { userId }) => {
    // if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')
    if (!input.zoomId) {
      throw new UserInputError('')
    }

    const { rowCount } = await poolQuery(checkZoom, [input.zoomId])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    const { rows } = await poolQuery(createZoomReview, [
      input.contents,
      input.zoomId,
      'ee360834-955c-4011-88b1-a71e78ec7630',
    ])

    const test = graphqlRelationMapping(rows[0], 'review')

    return test
  },
}
