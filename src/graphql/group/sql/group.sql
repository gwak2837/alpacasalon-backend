SELECT "group".id,
  name,
  description,
  "group".image_url,
  COUNT(user_x_group.user_id) AS member_count,
  "user".id AS new_member__id,
  "user".nickname AS new_member__nickname
FROM "group"
  LEFT JOIN user_x_group ON user_x_group.group_id = "group".id
  AND user_x_group.creation_time > $2
  LEFT JOIN "user" ON "user".id = user_x_group.user_id
WHERE "group".id = $1
GROUP BY "group".id,
  user_x_group.creation_time,
  "user".id
ORDER BY user_x_group.creation_time DESC
FETCH FIRST 1 ROWS ONLY