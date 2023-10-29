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
    PostID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    Title VARCHAR(255) NOT NULL,
    PublishDate DATETIME NOT NULL,
    Status ENUM('active', 'inactive') DEFAULT 'active',
    Content TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Users (UserID)
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE PostCategories (
    PostCategoryID INT PRIMARY KEY AUTO_INCREMENT,
    PostID INT,
    CategoryID INT,
    FOREIGN KEY (PostID) REFERENCES Posts (PostID),
    FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID)
);

CREATE TABLE Comments (
    CommentID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    PublishDate DATETIME NOT NULL,
    Content TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Users (id)
);

CREATE TABLE Likes (
    LikeID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    PublishDate DATETIME NOT NULL,
    EntityID INT,
    EntityType ENUM('post', 'comment') DEFAULT 'post',
    Type ENUM('like', 'dislike') DEFAULT 'like',
    FOREIGN KEY (AuthorID) REFERENCES Users (id)
);
