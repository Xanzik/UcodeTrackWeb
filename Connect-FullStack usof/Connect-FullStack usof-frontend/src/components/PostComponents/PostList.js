import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../store/actions/posts.js";
import { getUsers } from "../../store/actions/user.js";
import { getCategories } from "../../store/actions/category.js";
import PostListCSS from "../../styles/PostList.module.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");

  const posts = useSelector((state) => state.posts.posts);
  const allCategories = useSelector((state) => state.categories.categories);
  const users = useSelector((state) => state.users.users);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (filter, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(filter, value);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleClearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setStatus("");
    setSortBy("");
    setSearchText("");
    setSelectedCategories([]);
    navigate(`${location.pathname}`);
  };

  const handleCategorySelect = (category) => {
    const isCategorySelected = selectedCategories.some(
      (c) => c.title === category.title
    );

    if (isCategorySelected) {
      const updatedCategories = selectedCategories.filter(
        (c) => c !== category
      );
      setSelectedCategories(updatedCategories);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectedCategoryRemove = (category) => {
    const updatedCategories = selectedCategories.filter(
      (c) => c.title !== category.title
    );
    setSelectedCategories(updatedCategories);
  };

  const filteredCategories = allCategories.filter((category) =>
    category.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
    setStatus(searchParams.get("status") || "");
    setSortBy(searchParams.get("sortBy") || "");
    dispatch(
      getPosts({
        category: selectedCategories.map((category) => category.title),
        dateFrom: searchParams.get("dateFrom"),
        dateTo: searchParams.get("dateTo"),
        status: searchParams.get("status"),
        sortBy: searchParams.get("sortBy"),
      })
    );

    dispatch(getCategories());
  }, [dispatch, location.search, selectedCategories]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={PostListCSS["posts-list-container"]}>
      <div className={PostListCSS["filters-container"]}>
        <div className={PostListCSS["filter-group"]}>
          <label className={PostListCSS["filter-label"]}>Category:</label>
          <input
            type="text"
            className={PostListCSS["filter-input"]}
            placeholder="Search categories..."
            value={searchText}
            onChange={handleSearchChange}
          />
          {searchText && (
            <div className={PostListCSS["categories-container"]}>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${PostListCSS["category"]} ${
                    selectedCategories.includes(category)
                      ? PostListCSS["selected"]
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

        <div className={PostListCSS["filter-group"]}>
          <label className={PostListCSS["filter-label"]}>Date From:</label>
          <input
            type="date"
            className={PostListCSS["filter-input"]}
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            onBlur={() => handleFilterChange("dateFrom", dateFrom)}
          />
        </div>

        <div className={PostListCSS["filter-group"]}>
          <label className={PostListCSS["filter-label"]}>Date To:</label>
          <input
            type="date"
            className={PostListCSS["filter-input"]}
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            onBlur={() => handleFilterChange("dateTo", dateTo)}
          />
        </div>

        <div className={PostListCSS["filter-group"]}>
          <label className={PostListCSS["filter-label"]}>Status:</label>
          <select
            className={PostListCSS["filter-select"]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => handleFilterChange("status", status)}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        <div className={PostListCSS["filter-group"]}>
          <label className={PostListCSS["filter-label"]}>Sort By:</label>
          <select
            className={PostListCSS["filter-select"]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            onBlur={() => handleFilterChange("sortBy", sortBy)}
          >
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </div>
      <div className={PostListCSS["selected-categories"]}>
        {selectedCategories.map((category) => (
          <span
            key={category.id}
            className={PostListCSS["selected-category"]}
            onClick={() => handleSelectedCategoryRemove(category)}
          >
            {category.title}
          </span>
        ))}
      </div>
      <button
        className={PostListCSS["clear-button"]}
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>

      <ul className={PostListCSS["posts-list"]}>
        {posts.map((post) => (
          <li key={post.id} className={PostListCSS["post-item"]}>
            <Link to={`/post/${post.id}`} className={PostListCSS["post-link"]}>
              <h3 className={PostListCSS["post-title"]}>{post.Title}</h3>
              <p className={PostListCSS["post-content"]}>{post.Content}</p>
              <p className={PostListCSS["post-status"]}>
                Status: {post.Status}
              </p>
              <p className={PostListCSS["post-status"]}>
                Updated At: {post.updatedAt}
              </p>
              <p className={PostListCSS["post-author"]}>
                Author:{" "}
                {users.find((user) => user.id === post.author_id)?.login ||
                  "Loading..."}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
