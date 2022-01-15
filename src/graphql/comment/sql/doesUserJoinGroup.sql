SELECT user_x_group.user_id
FROM post
  JOIN "group" ON "group".id = post.group_id
  JOIN user_x_group ON user_x_group.group_id = "group".id
WHERE post.id = $1 -- user_id가 여러개 나옴