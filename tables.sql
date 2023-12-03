CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    fullname TEXT,
    password TEXT,
    role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
  
CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY,
    description TEXT,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    post_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE VIEW post_statistics AS SELECT
    post.id AS post_id,
    post.title,
    post.description,
    post.posted_at,
    user.username,
    COUNT(comment.id) AS comment_count
    FROM
        post
    JOIN user ON post.user_id = user.id
    LEFT JOIN comment ON post.id = comment.post_id
    GROUP BY
        post.id;
    
CREATE VIEW user_posts AS SELECT
    post.id AS post_id,
    post.title,
    post.description,
    post.posted_at,
    user.username
    FROM
        post
    JOIN user ON post.user_id = user.id;

CREATE VIEW most_active_users AS SELECT
    user.id AS user_id,
    user.username,
    user.fullname,
    COUNT(post.id) AS post_count
    FROM
        user
    LEFT JOIN post ON user.id = post.user_id
    GROUP BY
        user.id
    ORDER BY
        post_count DESC;

INSERT INTO user (username, fullname, password, role) VALUES ('admin', 'Admin', 'admin', 'admin')
INSERT INTO user (username, fullname, password, role) VALUES ('john_doe', 'John Doe', 'securepassword', 'user');
INSERT INTO user (username, fullname, password, role) VALUES ('bob1', 'Bob Robert', 'pw123', 'user');
INSERT INTO post (title, description, user_id) VALUES ('Introduction to SQL', 'Exploring the basics of SQL', 2);
INSERT INTO post (title, description, user_id) VALUES ('Hi Everyone', 'Class Grove is awesome', 2);
INSERT INTO comment (description, user_id, post_id) VALUES ('Great article!', 2, 1);
INSERT INTO comment (description, user_id, post_id) VALUES ('Hello!', 3, 2);

UPDATE user SET fullname = 'Jane Doe' WHERE username = 'john_doe';
UPDATE post SET description = 'Understanding SQL queries' WHERE id = 1;

DELETE FROM user WHERE username = 'john_doe';
DELETE FROM post WHERE id = 1;
DELETE FROM comment WHERE id = 1;

