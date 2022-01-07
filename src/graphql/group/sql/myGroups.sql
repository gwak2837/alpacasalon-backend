SELECT "group".id,
  name,
  description,
  image_url,
  COUNT(DISTINCT group_member.user_id) AS member_count,
  COUNT(DISTINCT post.id) AS new_post_count
FROM "group"
  JOIN user_x_group ON user_x_group.group_id = "group".id
  AND user_x_group.user_id = $1
  LEFT JOIN user_x_group AS group_member ON group_member.group_id = "group".id
  LEFT JOIN post ON post.group_id = "group".id
  AND post.creation_time > $2
GROUP BY "group".id
ORDER BY "group".id DESC