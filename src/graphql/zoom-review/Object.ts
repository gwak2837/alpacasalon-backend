import { ZoomReviewResolvers } from '../generated/graphql'

export const ZoomReview: ZoomReviewResolvers = {
  writer: ({ writer }) => {
    return writer?.id ? writer : null
  },
}
