SELECT zoom_review.id,
  zoom_review.creation_time,
  title,
  contents,
  "user".id AS writer__id,
  "user".nickname AS writer__nickname,
  "user".image_url AS writer__image_url
FROM zoom_review
  JOIN "user" ON "user".id = zoom_review.user_id
WHERE zoom_review.zoom_id = $1