SELECT id,
  title,
  description,
  image_url,
  when_where
FROM zoom
ORDER BY id DESC
FETCH FIRST $1 ROWS ONLY