import { PostResolvers } from '../generated/graphql'

export const Post: PostResolvers = {
  isLiked: ({ isLiked }) => {
    return !!isLiked
  },

  group: ({ group }) => {
    return group?.id ? group : null
  },

  user: ({ user }) => {
    return user?.id ? user : null
  },
}
