INSERT INTO post (title, contents, image_urls, user_id, group_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING id