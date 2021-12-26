SELECT id,
  name,
  description,
  image_url,
  COUNT(group_member.user_id) AS member_count
FROM "group"
  JOIN user_x_group ON user_x_group.group_id = "group".id
  AND user_x_group.user_id = $1
  LEFT JOIN user_x_group AS group_member ON group_member.group_id = "group".id
GROUP BY "group".id
ORDER BY "group".id DESC