import { ReviewResolvers } from '../generated/graphql'

export const Review: ReviewResolvers = {
  writer: ({ writer }) => {
    return writer?.id ? writer : null
  },
}
