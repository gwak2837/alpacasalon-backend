import { AuthenticationError, UserInputError } from 'apollo-server-errors'

import type { ApolloContext } from '../../apollo/server'
import { poolQuery } from '../../database/postgres'
import { from, pfId, send } from '../../utils/solapi'
import { graphqlRelationMapping } from '../common/ORM'
import { MutationResolvers, Zoom } from '../generated/graphql'
import createZoom from './sql/createZoom.sql'
// import deleteZoom from './sql/deleteZoom.sql'
import joinZoom from './sql/joinZoom.sql'

// import updateZoom from './sql/updateZoom.sql'

export const Mutation: MutationResolvers<ApolloContext> = {
  createZoom: async (_, { input }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(createZoom, [
      input.title,
      input.description,
      input.imageUrl.href,
      userId,
    ])

    return graphqlRelationMapping(rows[0])
  },

  // updateZoom: async (_, { input }, { userId }) => {
  //   if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

  //   const { rowCount, rows } = await poolQuery(updateZoom, [
  //     input.title,
  //     input.contents,
  //     input.imageUrl.href,
  //     input.id,
  //     userId,
  //   ])

  //   if (rowCount === 0)
  //     throw new UserInputError(
  //       `id:${input.id} 의 게시글이 존재하지 않거나, 해당 게시글의 작성자가 아닙니다.`
  //     )

  //   return graphqlRelationMapping(rows[0], 'zoom')
  // },

  // deleteZoom: async (_, { id }, { userId }) => {
  //   if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

  //   const { rowCount, rows } = await poolQuery(deleteZoom, [id, userId])

  //   if (rowCount === 0) throw new UserInputError(`id:${id} 의 게시글이 존재하지 않습니다.`)

  //   return graphqlRelationMapping(rows[0], 'zoom')
  // },

  joinZoom: async (_, { id }, { userId }) => {
    if (!userId) throw new AuthenticationError('로그인 후 시도해주세요.')

    const { rows } = await poolQuery(joinZoom, [userId, id])

    const isJoined = rows[0].result
    const receiverPhoneNumber = `0${rows[0].phone_number.replace(/\D/g, '').slice(2)}`
    const zoomTitle = rows[0].title.replace(/\n/g, '')

    if (isJoined) {
      send({
        message: {
          to: receiverPhoneNumber,
          from,
          text: `${rows[0].nickname}님, "${zoomTitle}" 줌 대화 신청이 완료되었습니다.`,
          kakaoOptions: { pfId },
        },
      })
        .then((result) => console.log(result))
        .catch((err) => console.error(err))
    }

    return { id, isJoined } as Zoom
  },
}
