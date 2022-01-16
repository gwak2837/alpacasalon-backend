SELECT zoom_review.id,
  zoom_review.creation_time,
  zoom_review.modification_time,
  zoom_review.contents,
  "user".id AS writer__id,
  "user".nickname AS writer__nickname,
  "user".image_url AS writer__image_url
FROM zoom_review
  LEFT JOIN "user" ON zoom_review.user_id = "user".id
ORDER BY zoom_review.id DESC
FETCH FIRST $1 ROWS ONLY