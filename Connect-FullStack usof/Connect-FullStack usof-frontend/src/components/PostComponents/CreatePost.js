import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
    if (!post.title.trim() || !post.content.trim()) {
      setError("Title and Content must be filled out");
      return;
    }
    try {
      const formScreenshot = new FormData();
      formScreenshot.append("screenshot", screenshot);
      const post_id = await PostService.createPost(
        post.title,
        post.content,
        post.categories
      );
      if (screenshot) {
        await PostService.updatePostScreenshot(post_id.data, formScreenshot);
      }

      setPost({
        title: "",
        content: "",
        categories: [],
      });
      setScreenshot(null);
      navigate(`/post/${post_id.data}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Header />
      <MenuBar />
      <div className={CreatePostCSS["scifi-container"]}>
        <h1>Create a Question</h1>
        <form className={CreatePostCSS["scifi-form"]} onSubmit={handleSubmit}>
          <label className={CreatePostCSS["scifi-label"]}>Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={handleTitleChange}
            className={CreatePostCSS["scifi-input"]}
            maxLength={255}
          />
          <label className={CreatePostCSS["scifi-label"]}>Content:</label>
          <textarea
            value={post.content}
            onChange={handleContentChange}
            className={CreatePostCSS["scifi-input"]}
          />
          <label className={CreatePostCSS["scifi-label"]}>Image:</label>
          <div className={CreatePostCSS["file-input-container"]}>
            <span className={CreatePostCSS["file-input-placeholder"]}>
              {screenshot
                ? screenshot.name
                : "Take a screenshot to make the decision easier"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
            />
          </div>
          <label className={CreatePostCSS["scifi-label"]}>Categories:</label>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchText}
            onChange={handleSearchChange}
            className={CreatePostCSS["scifi-input"]}
          />
          <br></br>
          <div>
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
          <br></br>
          <button type="submit" className={CreatePostCSS["scifi-button"]}>
            Create Post
          </button>
          {error && <p style={{ color: "red" }}>ERROR:{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
