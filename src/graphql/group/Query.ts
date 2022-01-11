import { AuthenticationError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { graphqlRelationMapping } from '../common/ORM'
import { Group, QueryResolvers, User } from '../generated/graphql'
import { groupORM } from './ORM'
import group from './sql/group.sql'
import myGroups from './sql/myGroups.sql'
import newMembers from './sql/newMembers.sql'
import recommandationGroups from './sql/recommandationGroups.sql'

export const Query: QueryResolvers<ApolloContext> = {
  myGroups: async (_, __, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(myGroups, [userId, new Date(Date.now() - 1 * 86_400_000)])
    console.log('👀 - rows', rows)

    return rows.map((row) => graphqlRelationMapping(row, 'group'))
  },

  recommendationGroups: async () => {
    const { rows } = await poolQuery(recommandationGroups)

    return rows.map((row) => graphqlRelationMapping(row, 'group'))
  },

  group: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const [{ rows }, { rows: rows2 }] = await Promise.all([
      poolQuery(group, [id, userId]),
      poolQuery(newMembers, [id, new Date(Date.now() - 7 * 86_400_000)]),
    ])

    const groupObj: Group = {
      id: rows[0].id,
      creationTime: rows[0].creation_time,
      modificationTime: rows[0].modification_time,
      name: rows[0].name,
      description: rows[0].description,
      imageUrl: rows[0].image_url,
      memberCount: rows[0].member_count,

      newPostCount: rows[0].new_post_count,
      isJoined: rows[0].is_joined,
      leader: {
        id: rows[0].leader__id,
        nickname: rows[0].leader__nickname,
      } as User,
      newMembers: [],
    }

    for (const row of rows2) {
      if (row.id) {
        groupObj.newMembers?.push({
          id: row.id,
          nickname: row.nickname,
          imageUrl: row.image_url,
        } as User)
      }
    }

    return groupObj
  },
}
