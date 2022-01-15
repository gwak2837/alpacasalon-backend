DELETE FROM notification
WHERE creation_time > $1
  AND "type" = 1
  AND contents = $2
  AND is_read = FALSE
  AND receiver_id = $3
  AND sender_id = $4