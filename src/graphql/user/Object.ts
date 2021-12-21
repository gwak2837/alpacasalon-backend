import { AuthenticationError, ForbiddenError } from 'apollo-server-express'

import type { ApolloContext } from '../../apollo/server'
import { UserResolvers } from '../generated/graphql'

export const Gender = {
  UNKNOWN: 0,
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
}

function authenticateUser(loginedUserId: ApolloContext['userId'], targetUserId: string) {
  if (!loginedUserId) throw new AuthenticationError('로그인 후 시도해주세요.')

  if (loginedUserId !== targetUserId)
    throw new ForbiddenError('다른 사용자의 정보는 조회할 수 없습니다.')
}

export const User: UserResolvers<ApolloContext> = {
  creationTime: async ({ id, creationTime }, __, { userId }) => {
    authenticateUser(userId, id)
    return creationTime
  },

  modificationTime: async ({ id, modificationTime }, __, { userId }) => {
    authenticateUser(userId, id)
    return modificationTime
  },

  email: async ({ id, email }, __, { userId }) => {
    authenticateUser(userId, id)
    return email
  },

  phoneNumber: async ({ id, phoneNumber }, __, { userId }) => {
    authenticateUser(userId, id)
    return phoneNumber
  },

  birthyear: async ({ id, birthyear }, __, { userId }) => {
    authenticateUser(userId, id)
    return birthyear
  },

  birthday: async ({ id, birthday }, __, { userId }) => {
    authenticateUser(userId, id)
    return birthday
  },

  gender: async ({ id, gender }, __, { userId }) => {
    authenticateUser(userId, id)
    return gender
  },
}
