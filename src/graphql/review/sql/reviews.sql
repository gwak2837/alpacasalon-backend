SELECT zoom_review.id,
  creation_time,
  modification_time,
  contents,
  "user".id AS user__id,
  "user".nickname AS user__nickname
FROM zoom_review
  LEFT JOIN "user" ON "user".id = zoom_review.user_id
ORDER BY id DESC FETCH FRIST $1 ROWS ONLY