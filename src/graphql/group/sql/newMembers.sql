SELECT "user".id,
  "user".nickname,
  "user".image_url
FROM user_x_group
  JOIN "user" ON "user".id = user_x_group.user_id
  AND user_x_group.creation_time > $2
WHERE user_x_group.group_id = $1
ORDER BY user_x_group.creation_time DESC