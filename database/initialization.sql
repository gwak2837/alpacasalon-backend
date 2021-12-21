-- public 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public AUTHORIZATION alpacasalon;

COMMENT ON SCHEMA public IS 'standard public schema';

GRANT ALL ON SCHEMA public TO alpacasalon;

-- deleted 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS deleted CASCADE;

CREATE SCHEMA deleted AUTHORIZATION alpacasalon;

COMMENT ON SCHEMA deleted IS 'deleted records history';

GRANT ALL ON SCHEMA deleted TO alpacasalon;

-- validation_time 이전 JWT 토큰은 유효하지 않음
-- gender: 0=미확인, 1=남성, 2=여성
CREATE TABLE "user" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(50) UNIQUE,
  phone_number varchar(20) UNIQUE,
  nickname varchar(20) UNIQUE,
  bio varchar(100),
  birthyear char(4),
  birthday char(4),
  gender int,
  image_url text,
  --
  kakao_oauth text UNIQUE,
  validation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(100) NOT NULL,
  contents text NOT NULL,
  image_urls text [],
  --
  user_id uuid NOT NULL REFERENCES "user" ON DELETE
  SET NULL,
    group_id bigint NOT NULL REFERENCES "group" ON DELETE
  SET NULL
);

CREATE TABLE group (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name varchar(20) NOT NULL,
  description varchar(100) NOT NULL,
  image_url text
);

CREATE TABLE user_x_group (
  user_id uuid REFERENCES "user" ON DELETE CASCADE,
  group_id bigint REFERENCES group ON DELETE CASCADE,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (user_id, group_id)
);

CREATE TABLE notification (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "type" int NOT NULL,
  contents text NOT NULL,
  --
  receiver_id uuid NOT NULL REFERENCES "user" ON DELETE CASCADE,
  sender_id uuid REFERENCES "user" ON DELETE
  SET NULL
);

CREATE TABLE "comment" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text,
  image_urls text [],
  --
  comment_id bigint REFERENCES "comment" ON DELETE
  SET NULL,
    post_id bigint REFERENCES post ON DELETE
  SET NULL,
    user_id uuid REFERENCES "user" ON DELETE
  SET NULL
);

CREATE TABLE user_x_liked_comment (
  user_id uuid REFERENCES "user" ON DELETE CASCADE,
  comment_id bigint REFERENCES "comment" ON DELETE CASCADE,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE poll (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_time timestamptz,
  contents text NOT NULL,
  "status" int NOT NULL DEFAULT 0
);

CREATE TABLE poll_selection (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text NOT NULL,
  "count" int,
  --
  poll_id bigint REFERENCES poll ON DELETE CASCADE,
);

CREATE TABLE poll_selection_x_user (
  poll_selection_id bigint REFERENCES poll_selection ON DELETE CASCADE,
  user_id bigint REFERENCES "user" ON DELETE CASCADE,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (poll_selection_id, user_id)
);

CREATE TABLE poll_comment (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text,
  image_urls text [],
  --
  poll_comment_id bigint REFERENCES poll_comment ON DELETE
  SET NULL,
    poll_id bigint REFERENCES poll ON DELETE
  SET NULL,
    user_id uuid REFERENCES "user" ON DELETE
  SET NULL
);

CREATE TABLE user_x_liked_poll_comment (
  user_id uuid REFERENCES "user" ON DELETE CASCADE,
  poll_comment_id bigint REFERENCES poll_comment ON DELETE CASCADE,
  creation_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (user_id, poll_comment_id)
);

CREATE TABLE deleted.user (
  id uuid PRIMARY KEY,
  creation_time timestamptz NOT NULL,
  modification_time timestamptz NOT NULL,
  deletion_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(50) UNIQUE,
  phone_number varchar(20) UNIQUE,
  nickname varchar(20) UNIQUE,
  bio varchar(100),
  birthyear char(4),
  birthday char(4),
  gender int,
  image_url text,
  --
  kakao_oauth text
);

CREATE TABLE deleted.post (
  id bigint PRIMARY KEY,
  creation_time timestamptz NOT NULL,
  modification_time timestamptz NOT NULL,
  deletion_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(100) NOT NULL,
  contents text [] NOT NULL,
  image_urls text [],
  --
  user_id uuid NOT NULL,
  group_id bigint NOT NULL
);

CREATE TABLE deleted.group (
  id bigint PRIMARY KEY,
  creation_time timestamptz NOT NULL,
  modification_time timestamptz NOT NULL,
  deletion_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name varchar(20) NOT NULL,
  description varchar(100) NOT NULL,
  image_url text
);

CREATE TABLE deleted.comment (
  id bigint PRIMARY KEY,
  creation_time timestamptz NOT NULL,
  modification_time timestamptz NOT NULL,
  deletion_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text NOT NULL,
  image_urls text [],
  --
  comment_id bigint,
  post_id bigint,
  user_id uuid
);

CREATE TABLE deleted.poll_comment (
  id bigint PRIMARY KEY,
  creation_time timestamptz NOT NULL,
  modification_time timestamptz NOT NULL,
  deletion_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text NOT NULL,
  image_urls text [],
  --
  poll_comment_id bigint,
  poll_id bigint,
  user_id uuid
);

CREATE FUNCTION delete_user () RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN
INSERT INTO deleted.user(
    id,
    creation_time,
    modification_time,
    email,
    phone_number,
    gender,
    birthyear,
    birthday,
    google_oauth,
    naver_oauth,
    kakao_oauth
  )
VALUES((OLD).*);

RETURN OLD;

END $$;

CREATE TRIGGER delete_user BEFORE DELETE ON "user" FOR EACH ROW EXECUTE FUNCTION delete_user();

CREATE FUNCTION delete_comment (
  comment_id bigint,
  user_id uuid,
  out deleted_comment_id bigint
) LANGUAGE plpgsql AS $$ BEGIN
INSERT INTO deleted.comment (
    id,
    creation_time,
    modification_time,
    contents,
    image_urls,
    comment_id,
    post_id,
    user_id
  )
SELECT *
FROM "comment"
WHERE id = delete_comment.comment_id
  AND "comment".user_id = delete_comment.user_id;

UPDATE "comment"
SET modification_time = CURRENT_TIMESTAMP,
  contents = NULL,
  image_urls = NULL
WHERE id = delete_comment.comment_id
  AND "comment".user_id = delete_comment.user_id
RETURNING id INTO deleted_comment_id;

DELETE FROM user_x_liked_comment
WHERE user_x_liked_comment.comment_id = delete_comment.comment_id;

END $$;

CREATE FUNCTION toggle_liking_comment (
  user_id uuid,
  comment_id bigint,
  out result boolean,
  out liked_count int
) LANGUAGE plpgsql AS $$ BEGIN PERFORM
FROM user_x_liked_comment
WHERE user_x_liked_comment.user_id = toggle_liking_comment.user_id
  AND user_x_liked_comment.comment_id = toggle_liking_comment.comment_id;

IF FOUND THEN
DELETE FROM user_x_liked_comment
WHERE user_x_liked_comment.user_id = toggle_liking_comment.user_id
  AND user_x_liked_comment.comment_id = toggle_liking_comment.comment_id;

SELECT COUNT(user_x_liked_comment.user_id) INTO liked_count
FROM user_x_liked_comment
WHERE user_x_liked_comment.comment_id = toggle_liking_comment.comment_id;

result = FALSE;

RETURN;

ELSE
INSERT INTO user_x_liked_comment (user_id, comment_id)
VALUES (
    toggle_liking_comment.user_id,
    toggle_liking_comment.comment_id
  );

SELECT COUNT(user_x_liked_comment.user_id) INTO liked_count
FROM user_x_liked_comment
WHERE user_x_liked_comment.comment_id = toggle_liking_comment.comment_id;

result = TRUE;

RETURN;

END IF;

END $$;

CREATE FUNCTION search_post (keywords text []) RETURNS TABLE (id bigint) LANGUAGE plpgsql STABLE AS $$ BEGIN RETURN QUERY
SELECT post.id
FROM post
WHERE title LIKE ANY (keywords)
  OR contents LIKE ANY (keywords);

END $$;