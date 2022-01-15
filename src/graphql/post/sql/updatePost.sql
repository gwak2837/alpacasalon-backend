UPDATE post
SET modification_time = CURRENT_TIMESTAMP,
  title = CASE
    WHEN $1 IS NULL THEN title
    ELSE $1
  END,
  contents = CASE
    WHEN $2 IS NULL THEN contents
    ELSE $2
  END,
  image_urls = CASE
    WHEN $3 IS NULL THEN image_urls
    ELSE $3
  END
WHERE id = $4
  AND user_id = $5
  AND (
    title <> $1
    OR contents <> $2
    OR image_urls <> $3
  )
RETURNING id,
  title,
  contents,
  image_urls