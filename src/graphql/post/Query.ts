import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { buildSelect } from '../../utils/sql'
import { graphqlRelationMapping } from '../common/ORM'
import { QueryResolvers } from '../generated/graphql'
import { postORM } from './ORM'
import isJoinedGroup from './sql/isJoinedGroup.sql'
import myPosts from './sql/myPosts.sql'
import post from './sql/post.sql'
import posts from './sql/posts.sql'
import postsByGroup from './sql/postsByGroup.sql'
import searchPosts from './sql/searchPosts.sql'

export const Query: QueryResolvers<ApolloContext> = {
  post: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(post, [id])

    return graphqlRelationMapping(rows[0], 'post')
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
    if (userId) {
      const [{ rowCount }, { rows }] = await Promise.all([
        poolQuery(isJoinedGroup, [userId, groupId]),
        poolQuery(postsByGroup, [groupId]),
      ])

      return {
        isJoined: rowCount === 1,
        posts: rows.map((row) => postORM(row)),
      }
    } else {
      const { rows } = await poolQuery(postsByGroup, [groupId])

      return {
        isJoined: false,
        posts: rows.map((row) => postORM(row)),
      }
    }
  },

  myPosts: async (_, __, { userId }) => {
    const { rows } = await poolQuery(myPosts, [userId])

    return rows.map((row) => postORM(row))
  },
}
