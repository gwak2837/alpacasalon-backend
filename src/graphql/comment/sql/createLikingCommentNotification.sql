INSERT INTO notification ("type", contents, link, receiver_id, sender_id)
VALUES (1, $1, $2, $3, $4)
RETURNING id