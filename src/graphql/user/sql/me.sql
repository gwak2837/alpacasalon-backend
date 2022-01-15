SELECT "user".id,
  nickname,
  COUNT(notification.id) AS unread_notification_count
FROM "user"
  LEFT JOIN notification ON notification.receiver_id = "user".id
  AND is_read = FALSE
WHERE "user".id = $1
GROUP BY "user".id