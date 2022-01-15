SELECT id,
  name,
  description,
  image_url,
  COUNT(user_x_group.user_id) AS member_count
FROM "group"
  LEFT JOIN user_x_group ON user_x_group.group_id = "group".id
GROUP BY "group".id
ORDER BY member_count DESC,
  id DESC
FETCH FIRST 10 ROWS ONLY