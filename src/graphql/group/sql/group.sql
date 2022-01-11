SELECT "group".id,
  name,
  description,
  "group".image_url,
  COUNT(user_x_group.user_id) AS member_count,
  user_is_joined.group_id AS is_joined,
  "user".id AS leader__id,
  "user".nickname AS leader__nickname
FROM "group"
  LEFT JOIN user_x_group ON user_x_group.group_id = "group".id
  LEFT JOIN user_x_group AS user_is_joined ON user_is_joined.group_id = "group".id
  AND user_is_joined.user_id = $2
  LEFT JOIN "user" ON "user".id = "group".leader_id
WHERE "group".id = $1
GROUP BY "group".id,
  user_is_joined.group_id,
  "user".id