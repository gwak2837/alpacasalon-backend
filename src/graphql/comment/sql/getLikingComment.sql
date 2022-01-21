SELECT contents,
  user_id,
  post_id
FROM "comment"
WHERE id = $1