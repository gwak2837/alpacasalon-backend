import { Comment } from '../generated/graphql'

export function commentORM(rows: Record<string, any>[]) {
  if (rows.length === 0) return null

  const comments = []

  for (const row of rows) {
    let existingComment = comments.find((comment) => comment.id === row.id)

    if (existingComment) {
      existingComment.subcomments.push({
        id: row.subcomments__id,
        creationTime: row.subcomments__creation_time,
        modificationTime: row.subcomments__modification_time,
        contents: row.subcomments__contents,
        isLiked: row.subcomments__is_liked,
        isModified:
          row.subcomments__creation_time &&
          row.subcomments__modification_time &&
          row.subcomments__creation_time !== row.subcomments__modification_time,
        likedCount: row.subcomments__liked_count,
        user: {
          id: row.subcomments__user__id,
          nickname: row.subcomments__user__nickname,
          imageUrl: row.subcomments__user__image_url,
        },
      })
    } else {
      const newComment = {
        id: row.id,
        creationTime: row.creation_time,
        modificationTime: row.modification_time,
        contents: row.contents,
        likedCount: row.liked_count,
        isLiked: Boolean(row.is_liked),
        isModified:
          row.creation_time && row.modification_time && row.creation_time !== row.modification_time,
        user: {
          id: row.user__id,
          nickname: row.user__nickname,
          imageUrl: row.user__image_url,
        },
        subcomments: [] as any[],
      }

      if (row.subcomments__id) {
        newComment.subcomments.push({
          id: row.subcomments__id,
          creationTime: row.subcomments__creation_time,
          modificationTime: row.subcomments__modification_time,
          contents: row.subcomments__contents,
          isLiked: row.subcomments__is_liked,
          isModified:
            row.subcomments__creation_time &&
            row.subcomments__modification_time &&
            row.subcomments__creation_time !== row.subcomments__modification_time,
          likedCount: row.subcomments__liked_count,
          user: {
            id: row.subcomments__user__id,
            nickname: row.subcomments__user__nickname,
            imageUrl: row.subcomments__user__image_url,
          },
        })
      }

      comments.push(newComment)
    }
  }

  return comments as Comment[]
}
