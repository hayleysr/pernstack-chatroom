CREATE DATABASE pernchat;
CREATE TABLE chatlog(
    msg_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    description VARCHAR(255)
);
