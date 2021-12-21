import { PostResolvers } from '../generated/graphql'

export const Post: PostResolvers = {
  isLiked: ({ isLiked }) => {
    return !!isLiked
  },
  user: ({ user }) => {
    return user?.id ? user : null
  },
}
