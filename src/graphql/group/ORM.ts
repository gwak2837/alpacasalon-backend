import { Group, User } from '../generated/graphql'

export function groupORM(rows: Record<string, any>[]) {
  if (rows.length === 0) return null

  const firstRow = rows[0]

  const group = {
    id: firstRow.id,
    creationTime: firstRow.creation_time,
    modificationTime: firstRow.modification_time,
    name: firstRow.name,
    description: firstRow.description,
    imageUrl: firstRow.image_url,
    memberCount: firstRow.member_count,

    newPostCount: firstRow.new_post_count,
    isJoined: firstRow.is_joined,
    leader: {
      id: firstRow.leader__id,
      nickname: firstRow.leader__nickname,
    },
    newMembers: [] as User[],
  }

  for (const row of rows) {
    if (row.new_members__id) {
      group.newMembers.push({
        id: row.new_members__id,
        nickname: row.new_members__nickname,
        imageUrl: row.new_members__image_url,
      } as User)
    }
  }

  return group as Group
}
