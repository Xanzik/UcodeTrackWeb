// CreatePost.js
import React, { useState } from "react";
import Header from "../Header.js";
import MenuBar from "../MenuBar.js";
import "../../styles/CreatePost.css";

import PostService from "../../services/PostService.js";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categories: [],
  });

  const handleTitleChange = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleCategoriesChange = (e) => {
    const categories = e.target.value
      .split(",")
      .map((category) => category.trim());
    setPost({ ...post, categories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await PostService.createPost(post.title, post.content, post.categories);

      setPost({
        title: "",
        content: "",
        categories: [],
      });

      console.log("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Header />
      <MenuBar />
      <div className="scifi-container">
        <h1>Create a New Post</h1>
        <form className="scifi-form" onSubmit={handleSubmit}>
          <label className="scifi-label">
            Title:
            <input
              type="text"
              value={post.title}
              onChange={handleTitleChange}
              className="scifi-input"
            />
          </label>
          <label className="scifi-label">
            Content:
            <textarea
              value={post.content}
              onChange={handleContentChange}
              className="scifi-input"
            />
          </label>
          <label className="scifi-label">
            Categories (comma-separated):
            <input
              type="text"
              value={post.categories.join(",")}
              onChange={handleCategoriesChange}
              className="scifi-input"
            />
          </label>
          <button type="submit" className="scifi-button">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
