SELECT id,
  zoom.creation_time,
  zoom.modification_time,
  zoom.title,
  zoom.description,
  zoom.image_url,
  zoom.when,
  zoom.when_where,
  zoom.when_what
FROM zoom
  LEFT JOIN user_x_joined_zoom AS joined_zoom ON zoom.id = joined_zoom.zoom_id
GROUP BY zoom.id
ORDER BY COUNT(joined_zoom.user_id) DESC
FETCH FIRST 10 ROWS ONLY