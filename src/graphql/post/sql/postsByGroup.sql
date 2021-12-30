SELECT post.id,
  post.creation_time,
  post.modification_time,
  title,
  post.contents,
  post.image_urls,
  COUNT("comment".id) AS comment_count,
  "user".id AS user__id,
  "user".nickname AS user__nickname
FROM post
  JOIN "user" ON "user".id = post.user_id
  LEFT JOIN "comment" ON "comment".post_id = post.id
WHERE post.group_id = $1
GROUP BY post.id,
  "user".id
ORDER BY id DESC