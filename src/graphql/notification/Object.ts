import { NotificationResolvers } from '../generated/graphql'

export const NotificationType = {
  NEW_COMMENT: 0,
  LIKING_COMMENT: 1,
  NEW_SUBCOMMENT: 2,
}

export const Notification: NotificationResolvers = {
  sender: ({ sender }) => {
    return sender?.id ? sender : null
  },
}
