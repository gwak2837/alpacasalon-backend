SELECT "group".id,
  name,
  description,
  "group".image_url,
  COUNT(user_x_group.user_id) AS member_count,
  user_is_joined.group_id AS is_joined,
  leader.id AS leader__id,
  leader.nickname AS leader__nickname,
  "user".id AS new_members__id,
  "user".nickname AS new_members__nickname,
  "user".image_url AS new_members__image_url
FROM "group"
  LEFT JOIN user_x_group ON user_x_group.group_id = "group".id
  LEFT JOIN user_x_group AS user_is_joined ON user_is_joined.group_id = "group".id
  AND user_is_joined.user_id = $3
  LEFT JOIN "user" AS leader ON leader.id = "group".leader_id
  LEFT JOIN "user" ON "user".id = user_x_group.user_id
  AND user_x_group.creation_time > $2
WHERE "group".id = $1
GROUP BY "group".id,
  user_x_group.creation_time,
  user_is_joined.group_id,
  leader.id,
  "user".id
ORDER BY user_x_group.creation_time DESC