-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL, 
    email VARCHAR,
    avatar VARCHAR
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    post VARCHAR(255) NOT NULL, 
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES github_users(id)
);