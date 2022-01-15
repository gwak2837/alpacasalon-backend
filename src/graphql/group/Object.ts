import { GroupResolvers } from '../generated/graphql'

export const Group: GroupResolvers = {
  isJoined: ({ isJoined }) => {
    return !!isJoined
  },

  newMembers: ({ newMembers }) => {
    return newMembers && newMembers.length > 0 ? newMembers : null
  },

  leader: ({ leader }) => {
    return leader?.id ? leader : null
  },
}
