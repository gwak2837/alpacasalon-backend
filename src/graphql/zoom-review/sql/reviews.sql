SELECT zoom_review.id,
  zoom_review.creation_time,
  zoom_review.modification_time,
  zoom_review.contents,
  zoom_review.zoom_id,
  "user".id AS writer__id,
  "user".nickname AS writer__nickname,
  "user".image_url AS writer__image_url,
  EXISTS(
    SELECT user_id
    FROM "user_x_liked_zoom_review" AS liked
    WHERE zoom_review.id = liked.zoom_review_id
      AND user_id = $1
  ) AS is_liked,
  COUNT(DISTINCT is_liked.user_id) AS liked_count
FROM zoom_review
  LEFT JOIN "user" ON zoom_review.user_id = "user".id
  AND zoom_review.zoom_id = $2
  LEFT JOIN "user_x_liked_zoom_review" AS is_liked ON zoom_review.id = is_liked.zoom_review_id
GROUP BY zoom_review.id,
  "user".id
ORDER BY zoom_review.id DESC