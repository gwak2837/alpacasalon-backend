SELECT user_id
FROM user_x_group
WHERE user_id = $1
  AND group_id = (
    SELECT group_id
    FROM post
    WHERE post.id = $2
  );