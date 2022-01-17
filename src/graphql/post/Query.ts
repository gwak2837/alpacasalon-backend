import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { buildSelect } from '../../utils/sql'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import { postORM } from './ORM'
import doesUserJoinGroup from './sql/doesUserJoinGroup.sql'
import myPosts from './sql/myPosts.sql'
import post from './sql/post.sql'
import posts from './sql/posts.sql'
import postsByGroup from './sql/postsByGroup.sql'
import searchPosts from './sql/searchPosts.sql'

export const Query: QueryResolvers<ApolloContext> = {
  post: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rowCount, rows } = await poolQuery(post, [id])
    if (rowCount === 0) throw new UserInputError(`id:${id} 의 글을 찾을 수 없습니다.`)

    const groupId = rows[0].group__id

    if (groupId) {
      const { rowCount: rowCount2 } = await poolQuery(doesUserJoinGroup, [groupId, userId])
      if (rowCount2 === 0) throw new ForbiddenError('해당 그룹에 속해 있지 않습니다.')
    }

    return graphqlRelationMapping(rows[0])
  },

  posts: async (_, { pagination }) => {
    let sql = posts
    const values = [pagination.limit]

    // Pagination
    if (pagination.lastId) {
      sql = buildSelect(sql, 'WHERE', 'post.id < $1')
      values.push(pagination.lastId)
    }

    const { rows } = await poolQuery(sql, values)

    return rows.map((row) => postORM(row))
  },

  searchPosts: async (_, { keywords }) => {
    const { rows } = await poolQuery(searchPosts, [keywords])

    return rows.map((row) => postORM(row))
  },

  postsByGroup: async (_, { groupId }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(postsByGroup, [groupId])

    return rows.map((row) => postORM(row))
  },

  myPosts: async (_, __, { userId }) => {
    const { rows } = await poolQuery(myPosts, [userId])

    return rows.map((row) => postORM(row))
  },
}
