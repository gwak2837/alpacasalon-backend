INSERT INTO zoom_review (contents, zoom_id, user_id)
VALUES ($1, $2, $3)
RETURNING id