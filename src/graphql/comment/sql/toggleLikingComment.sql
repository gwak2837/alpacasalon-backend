SELECT result,
  liked_count
FROM toggle_liking_comment($1, $2);