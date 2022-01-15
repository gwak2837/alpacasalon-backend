SELECT post.id,
  post.creation_time,
  post.modification_time,
  title,
  post.contents,
  post.image_urls,
  COUNT("comment".id) AS comment_count,
  "user".id AS user__id,
  "user".nickname AS user__nickname,
  "user".image_url AS user__image_url,
  "group".id AS group__id,
  "group".name AS group__name
FROM post
  LEFT JOIN "user" ON "user".id = post.user_id
  LEFT JOIN "group" ON "group".id = post.group_id
  LEFT JOIN "comment" ON "comment".post_id = post.id
WHERE post.id = $1
GROUP BY post.id,
  "user".id,
  "group".id