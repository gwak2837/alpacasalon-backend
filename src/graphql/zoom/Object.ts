import { ZoomResolvers } from '../generated/graphql'

export const Zoom: ZoomResolvers = {
  isJoined: ({ isJoined }) => {
    return !!isJoined
  },
}
