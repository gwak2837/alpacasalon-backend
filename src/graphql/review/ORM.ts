import { Review } from '../generated/graphql'

export function zoomReviewORM(row: Record<string, any>) {
  return {
    id: row.id,
    creationTime: row.creation_time,
    modificationTime: row.modification_time,
    contents: row.contents,
    writer: {
      id: row.user__id,
      nickname: row.user__nickname,
    },
  } as unknown as Review
}
