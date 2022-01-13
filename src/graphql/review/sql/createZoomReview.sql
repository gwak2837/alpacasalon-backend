INSERT INTO review (contents, user_id, zoom_id)
VALUES ($1, $2, $3)
RETURNING id