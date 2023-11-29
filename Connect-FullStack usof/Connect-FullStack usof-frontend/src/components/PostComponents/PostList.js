import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../store/actions/posts.js";
import { getUsers } from "../../store/actions/user.js";
import { useSelector } from "react-redux";
import "../../styles/PostList.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCategory(searchParams.get("category") || "");
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
    setStatus(searchParams.get("status") || "");
    setSortBy(searchParams.get("sortBy") || "");
    dispatch(
      getPosts({
        category: searchParams.get("category"),
        dateFrom: searchParams.get("dateFrom"),
        dateTo: searchParams.get("dateTo"),
        status: searchParams.get("status"),
        sortBy: searchParams.get("sortBy"),
      })
    );
  }, [dispatch, location.search]);

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);

  const handleFilterChange = (filter, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(filter, value);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleClearFilters = () => {
    setCategory("");
    setDateFrom("");
    setDateTo("");
    setStatus("");
    setSortBy("");

    navigate(`${location.pathname}`);
  };

  return (
    <div className="posts-list-container">
      <div className="filters-container">
        <div className="filter-group">
          <label>Category:</label>
          <input
            type="text"
            className="filter-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={() => handleFilterChange("category", category)}
          />
        </div>

        <div className="filter-group">
          <label>Date From:</label>
          <input
            type="date"
            className="filter-input"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            onBlur={() => handleFilterChange("dateFrom", dateFrom)}
          />
        </div>

        <div className="filter-group">
          <label>Date To:</label>
          <input
            type="date"
            className="filter-input"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            onBlur={() => handleFilterChange("dateTo", dateTo)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            className="filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => handleFilterChange("status", status)}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            onBlur={() => handleFilterChange("sortBy", sortBy)}
          >
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </div>
      <button className="clear-button" onClick={handleClearFilters}>
        Clear Filters
      </button>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`} className="post-link">
              <h3 className="post-title">{post.Title}</h3>
              <p className="post-content">{post.Content}</p>
              <p className="post-status">Status: {post.Status}</p>
              <p className="post-status">Updated At: {post.updatedAt}</p>
              <p className="post-author">
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
