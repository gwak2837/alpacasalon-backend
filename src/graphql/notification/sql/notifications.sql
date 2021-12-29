SELECT notification.id,
  notification.creation_time,
  "type",
  contents,
  is_read,
  "user".id AS sender__id,
  "user".nickname AS sender__nickname
FROM notification
  LEFT JOIN "user" ON "user".id = notification.sender_id
WHERE receiver_id = $1