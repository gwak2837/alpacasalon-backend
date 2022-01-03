SELECT post.id,
  post.creation_time,
  post.modification_time,
  title,
  post.contents,
  post.image_urls,
  COUNT("comment".id) AS comment_count,
  "group".id AS group__id,
  "group".name AS group__name
FROM post
  LEFT JOIN "group" ON "group".id = post.group_id
  LEFT JOIN "comment" ON "comment".post_id = post.id
WHERE user_id = $1
GROUP BY post.id,
  "user".id,
  "group".id
ORDER BY id DESC