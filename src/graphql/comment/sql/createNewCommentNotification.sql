INSERT INTO notification ("type", contents, link, receiver_id, sender_id)
VALUES (0, $1, $2, $3, $4)
RETURNING id