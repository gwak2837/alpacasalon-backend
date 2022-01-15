SELECT id,
  title,
  description,
  image_url,
  when_where,
  when_what,
  user_x_joined_zoom.user_id AS is_joined
FROM zoom
  LEFT JOIN user_x_joined_zoom ON user_x_joined_zoom.zoom_id = zoom.id
  AND user_x_joined_zoom.user_id = $2
WHERE id = $1