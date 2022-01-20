SELECT user_id
FROM user_x_group
WHERE user_id = $1
  AND group_id = $2;