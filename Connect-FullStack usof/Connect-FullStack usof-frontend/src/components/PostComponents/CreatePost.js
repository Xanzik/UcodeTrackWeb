// CreatePost.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../store/actions/category.js";

import Header from "../Header.js";
import MenuBar from "../MenuBar.js";
import CreatePostCSS from "../../styles/CreatePost.module.css";

import PostService from "../../services/PostService.js";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    title: "",
    content: "",
    categories: [],
  });
  const [screenshot, setScreenshot] = useState(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const allCategories = useSelector((state) => state.categories.categories);

  const handleTitleChange = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectedCategoryRemove = (category) => {
    const updatedCategories = post.categories.filter(
      (c) => c.title !== category.title
    );
    setPost({ ...post, categories: updatedCategories });
  };

  const handleCategorySelect = (category) => {
    const isCategorySelected = post.categories.some(
      (c) => c.title === category.title
    );

    if (isCategorySelected) {
      const updatedCategories = post.categories.filter(
        (c) => c.title !== category.title
      );
      setPost({ ...post, categories: updatedCategories });
    } else {
      setPost({ ...post, categories: [...post.categories, category] });
    }
  };

  const filteredCategories = allCategories.filter((category) =>
    category.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formScreenshot = new FormData();
      formScreenshot.append("screenshot", screenshot);
      const post_id = await PostService.createPost(
        post.title,
        post.content,
        post.categories.map((category) => category.title)
      );
      await PostService.updatePostScreenshot(post_id.data, formScreenshot);

      setPost({
        title: "",
        content: "",
        categories: [],
      });
      setScreenshot(null);

      console.log("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Header />
      <MenuBar />
      <div className={CreatePostCSS["scifi-container"]}>
        <h1>Create a New Post</h1>
        <form className={CreatePostCSS["scifi-form"]} onSubmit={handleSubmit}>
          <label className={CreatePostCSS["scifi-label"]}>
            Title:
            <input
              type="text"
              value={post.title}
              onChange={handleTitleChange}
              className={CreatePostCSS["scifi-input"]}
            />
          </label>
          <label className={CreatePostCSS["scifi-label"]}>
            Content:
            <textarea
              value={post.content}
              onChange={handleContentChange}
              className={CreatePostCSS["scifi-input"]}
            />
          </label>
          <label className={CreatePostCSS["scifi-label"]}>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
            />
          </label>
          <label className={CreatePostCSS["scifi-label"]}>
            Categories:
            <div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchText}
                onChange={handleSearchChange}
                className={CreatePostCSS["scifi-input"]}
              />
              {searchText && (
                <div className={CreatePostCSS["categories-container"]}>
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`${CreatePostCSS["category"]} ${
                        post.categories.some((c) => c.title === category.title)
                          ? CreatePostCSS["selected"]
                          : ""
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </label>
          <div className={CreatePostCSS["selected-categories"]}>
            <p>Selected Categories:</p>
            {post.categories.map((category) => (
              <span
                key={category.id}
                className={CreatePostCSS["selected-category"]}
                onClick={() => handleSelectedCategoryRemove(category)}
              >
                {category.title}
              </span>
            ))}
          </div>
          <button type="submit" className={CreatePostCSS["scifi-button"]}>
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
