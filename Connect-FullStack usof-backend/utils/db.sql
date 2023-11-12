CREATE DATABASE usof_database;

USE usof_database;

CREATE TABLE USERS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    rating INT DEFAULT 0,
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE Posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    Title VARCHAR(255) NOT NULL,
    PublishDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('active', 'inactive') DEFAULT 'active',
    Content TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Users (UserID)
);

CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE PostCategories (
    PostID INT,
    CategoryID INT,
    FOREIGN KEY (PostID) REFERENCES Posts (id),
    FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    PublishDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Content TEXT,
    PostID INT,
    FOREIGN KEY (PostID) REFERENCES Posts (id),
    FOREIGN KEY (AuthorID) REFERENCES Users (id)
);

CREATE TABLE Likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    PublishDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    EntityID INT,
    EntityType ENUM('post', 'comment') DEFAULT 'post',
    Type ENUM('like', 'dislike') DEFAULT 'like',
    FOREIGN KEY (AuthorID) REFERENCES Users (id)
);
