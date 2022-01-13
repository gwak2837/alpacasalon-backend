import { UserInputError } from 'apollo-server-errors'
import { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { QueryResolvers } from '../generated/graphql'
import checkZoom from './sql/checkZoom.sql'

export const Query: QueryResolvers<ApolloContext> = {
  zoomReviews: async (_, { pagination, zoomId }) => {
    if (zoomId) {
      throw new UserInputError('')
    }

    const { rowCount } = await poolQuery(checkZoom, [zoomId])
    if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')

    // pagination
    // if (pagination.lastId) {

    // }

    return 1 as any
  },
}
