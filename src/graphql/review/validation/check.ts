import { UserInputError } from 'apollo-server-errors'
import { poolQuery } from '../../../database/postgres'
import checkZoom from './sql/checkZoom.sql'

export const validateZoomId = async (zoomId: number) => {
  if (!zoomId) {
    throw new UserInputError('')
  }

  const { rowCount } = await poolQuery(checkZoom, [zoomId])
  if (rowCount === 0) throw new UserInputError('해당 정보가 잘못 되었습니다.')
  return 1
}
