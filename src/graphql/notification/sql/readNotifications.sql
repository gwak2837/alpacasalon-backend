UPDATE notification
SET is_read = TRUE
WHERE id = ANY($1)