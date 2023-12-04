import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../store/actions/posts.js";
import { getUsers } from "../../store/actions/user.js";
import {
  getCategories,
  getCategoriesForPost,
} from "../../store/actions/category.js";
import PostListCSS from "../../styles/PostList.module.css";
import Pagination from "../Pagination.js";

const defaultAvatar = "/basic_avatar.jpg";
const URL = `http://localhost:5000`;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [postCategories, setPostCategories] = useState({});

  const posts = useSelector((state) => state.posts.posts);
  const allCategories = useSelector((state) => state.categories.categories);
  const users = useSelector((state) => state.users.users);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    const fetchDataForPost = async (postId) => {
      try {
        const categories = await dispatch(getCategoriesForPost(postId));
        const updatedCategories = {
          ...postCategories,
          [postId]: categories.data,
        };
        setPostCategories(updatedCategories);
      } catch (error) {
        console.error(error.message);
      }
    };

    currentPost.forEach((post) => {
      if (!postCategories[post.id]) {
        fetchDataForPost(post.id);
      }
    });
  }, [dispatch, currentPost, postCategories]);

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

  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

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
      <br></br>
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
        {currentPost.map((post) => (
          <li key={post.id} className={PostListCSS["post-container"]}>
            <Link to={`/post/${post.id}`} className={PostListCSS["post-link"]}>
              <div className={PostListCSS["post-content-wrapper"]}>
                <div className={PostListCSS["post-details"]}>
                  <h3 className={PostListCSS["post-title"]}>{post.Title}</h3>
                  <p className={PostListCSS["post-content"]}>
                    {post.Content.length > 100
                      ? post.Content.substring(0, 100) + "..."
                      : post.Content}
                  </p>
                  <div className={PostListCSS["post-categories"]}>
                    {postCategories[post.id] &&
                      postCategories[post.id].map((category, index) => (
                        <span
                          key={index}
                          className={PostListCSS["selected-category"]}
                        >
                          {category.title}
                        </span>
                      ))}
                  </div>
                  <div className={PostListCSS["post-info"]}>
                    <p className={PostListCSS["post-date"]}>
                      {new Date(post.updatedAt).toLocaleString()}
                    </p>
                    <p
                      className={`${PostListCSS["post-status"]} ${
                        post.Status === "active"
                          ? PostListCSS["active"]
                          : PostListCSS["inactive"]
                      }`}
                    >
                      {post.Status}
                    </p>
                    <p className={PostListCSS["post-author"]}>
                      {users.find((user) => user.id === post.author_id)
                        ?.login || "Loading..."}
                    </p>
                    <p className={PostListCSS["post-rating"]}>
                      {users.find((user) => user.id === post.author_id)?.rating}
                    </p>
                    <img
                      src={
                        users.find((user) => user.id === post.author_id)
                          ?.profile_picture
                          ? `${URL}/static/${
                              users.find((user) => user.id === post.author_id)
                                .profile_picture
                            }`
                          : defaultAvatar
                      }
                      alt="User Avatar"
                      onClick={() => handleAvatarClick(post.author_id)}
                      className={PostListCSS["post-avatar"]}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        perPage={postsPerPage}
        total={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostsList;
