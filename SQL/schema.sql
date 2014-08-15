-- CREATE DATABASE chat;

-- USE chat;
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  /* Describe your table here.*/
  message VARCHAR(100),
  roomname VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_users INT(10),
  ID INT(10) NOT NULL auto_increment, PRIMARY KEY (ID)
  );

DROP TABLE IF EXISTS users;


CREATE TABLE users (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS friends;


CREATE TABLE friends (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_friend` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




