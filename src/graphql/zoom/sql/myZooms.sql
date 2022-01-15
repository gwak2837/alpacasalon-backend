SELECT id,
  title,
  image_url
FROM zoom
  JOIN user_x_joined_zoom ON user_x_joined_zoom.zoom_id = zoom.id
WHERE user_id = $1