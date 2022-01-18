SELECT COUNT(user_x_liked_zoom_review.user_id) AS counts
FROM user_x_liked_zoom_review
WHERE user_x_liked_zoom_review.zoom_review_id = $1