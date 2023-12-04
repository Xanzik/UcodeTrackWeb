import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../../store/actions/posts.js";
import { getUsers } from "../../store/actions/user.js";
import {
  getComments,
  createComment,
  deleteComment,
} from "../../store/actions/comments.js";
import {
  getCategories,
  getCategoriesForPost,
} from "../../store/actions/category.js";

import Header from "../Header.js";
import MenuBar from "../MenuBar.js";
import Pagination from "../Pagination.js";
import CommentReplies from "../CommentComponents/CommentReplies.js";
import ConfirmationDialog from "../ModalComponents/ConfirmationDialog.js";
import PostLikes from "../LikesComponents/PostLikes.js";
import CommentLikes from "../LikesComponents/CommentLikes.js";

import PostPageCSS from "../../styles/PostPage.module.css";

const defaultAvatar = "/basic_avatar.jpg";
const URL = `http://localhost:5000`;

const selectUsers = (state) => (state.users ? state.users.users : []);
const selectUserById = (users, userId) =>
  users.find((user) => user.id === userId);

const PostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteCommentConfirmation, setShowDeleteCommentConfirmation] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 7;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(postId));
    dispatch(getUsers());
    dispatch(getComments(postId));
    dispatch(getCategories());
    dispatch(getCategoriesForPost(postId));
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts.post);
  const allCategories = useSelector((state) => state.categories.categories);
  const postCategories = useSelector((state) => state.posts.categories);
  const comments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector(selectUsers);

  const [editedContent, setEditedContent] = useState([]);
  const [editedCategories, setEditedCategories] = useState([]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent([]);
    setEditedCategories([]);
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rootComments = comments.filter(
    (comment) => comment.ParentCommentID === null
  );

  const handleCommentSubmit = async () => {
    if (!commentText) {
      return;
    }
    if (replyToCommentId) {
      await dispatch(createComment(postId, commentText, replyToCommentId))
        .then(() => {
          dispatch(getComments(postId));
          setCommentText("");
          setReplyToCommentId(null);
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    } else {
      await dispatch(createComment(postId, commentText))
        .then(() => {
          dispatch(getComments(postId));
          setCommentText("");
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    }
  };

  const handleReplyToComment = (commentId) => {
    setReplyToCommentId(commentId);
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
    setShowDeleteCommentConfirmation(false);
  };

  const handleEditPost = () => {
    setIsEditing(true);
    setEditedContent(post[0].Content);
    setEditedCategories(postCategories);
  };

  const handleSaveEdit = async () => {
    if (!editedContent) {
      return;
    }
    await dispatch(updatePost(postId, editedContent, editedCategories));
    await dispatch(getPost(postId));
    await dispatch(getCategoriesForPost(postId));
    setIsEditing(false);
  };

  const handleCategorySelect = (category) => {
    const isCategorySelected = editedCategories.some(
      (c) => c.title === category.title
    );

    if (isCategorySelected) {
      const updatedCategories = editedCategories.filter(
        (c) => c.title !== category.title
      );
      setEditedCategories(updatedCategories);
    } else {
      setEditedCategories([...editedCategories, category]);
    }
  };

  const filteredCategories = allCategories.filter((category) =>
    category.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectedCategoryRemove = (category) => {
    const updatedCategories = editedCategories.filter(
      (c) => c.title !== category.title
    );
    setEditedCategories(updatedCategories);
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    setShowDeleteConfirmation(false);
    navigate("/");
  };

  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MenuBar />
      <Header />
      <div className={PostPageCSS["post-page"]}>
        {selectUserById(users, post[0].author_id) ? (
          <div className={PostPageCSS["user-info"]}>
            <p>{selectUserById(users, post[0].author_id).login}</p>
            <p className={PostPageCSS["rating"]}>
              {selectUserById(users, post[0].author_id).rating}
            </p>
            <p>{new Date(post[0].updatedAt).toLocaleString()}</p>
            <img
              src={
                selectUserById(users, post[0].author_id).profile_picture
                  ? `${URL}/static/${
                      selectUserById(users, post[0].author_id).profile_picture
                    }`
                  : defaultAvatar
              }
              alt="User Avatar"
              onClick={() => handleAvatarClick(post[0].author_id)}
            />
          </div>
        ) : (
          <p>Author: Unknown</p>
        )}
        <h2 className={PostPageCSS["post-title"]}>{post[0].Title}</h2>
        <div className={PostPageCSS["post-content"]}>
          {isEditing ? (
            <textarea
              className={PostPageCSS["edit-textarea"]}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <div>
              <div className={PostPageCSS["postContainer"]}>
                <p className={PostPageCSS["content"]}>{post[0].Content}</p>
                {post[0].screenshot && (
                  <a
                    href={`${URL}/static/${post[0].screenshot}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${URL}/static/${post[0].screenshot}`}
                      alt="Post Screenshot"
                      className={PostPageCSS["postImage"]}
                    />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {isEditing && (
          <div className={PostPageCSS["edit-categories-container"]}>
            <label className={PostPageCSS["edit-categories-label"]}>
              Categories:
              <div>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className={PostPageCSS["scifi-input"]}
                />
                {searchText && (
                  <div className={PostPageCSS["categories-container"]}>
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className={`${PostPageCSS["category"]} ${
                          postCategories.some((c) => c.title === category.title)
                            ? PostPageCSS["selected"]
                            : ""
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category.title}
                      </div>
                    ))}
                  </div>
                )}
                <div className={PostPageCSS["selected-categories"]}>
                  <p>Selected Categories:</p>
                  {editedCategories.map((category, index) => (
                    <span
                      key={index}
                      className={PostPageCSS["selected-category"]}
                      onClick={() => handleSelectedCategoryRemove(category)}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          </div>
        )}

        <div className={PostPageCSS["selected-categories"]}>
          {postCategories.map((category, index) => (
            <span key={index} className={PostPageCSS["selected-category"]}>
              {category.title}
            </span>
          ))}
        </div>

        <PostLikes postId={postId} />
        <br></br>

        {currentUser.id === post[0].author_id && (
          <div className={PostPageCSS["edit-button-container"]}>
            {isEditing ? (
              <>
                <button
                  className={PostPageCSS["cancel-edit-button"]}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className={PostPageCSS["save-edit-button"]}
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className={PostPageCSS["edit-button"]}
                  onClick={handleEditPost}
                >
                  Edit Post
                </button>
                <button
                  className={PostPageCSS["delete-button"]}
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete Post
                </button>
              </>
            )}
          </div>
        )}

        {showDeleteConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to delete this post?"
            onConfirm={handleDeletePost}
            onCancel={() => setShowDeleteConfirmation(false)}
          />
        )}

        <div className={PostPageCSS["comments-section"]}>
          <h3 className={PostPageCSS["comments-heading"]}>Comments</h3>
          {currentComments.length > 0 ? (
            <ul className={PostPageCSS["comment-list"]}>
              {currentComments.map((comment) =>
                comment.ParentCommentID ? null : (
                  <li key={comment.id} className={PostPageCSS["comment"]}>
                    <p>{comment.Content}</p>
                    <CommentLikes commentId={comment.id} />
                    {selectUserById(users, comment.AuthorID) ? (
                      <div className={PostPageCSS["user-info"]}>
                        <p>{selectUserById(users, comment.AuthorID).login}</p>
                        <p className={PostPageCSS["rating"]}>
                          {selectUserById(users, comment.AuthorID).rating}
                        </p>
                        <p>{new Date(comment.updatedAt).toLocaleString()}</p>
                        <img
                          src={
                            selectUserById(users, comment.AuthorID)
                              .profile_picture
                              ? `${URL}/static/${
                                  selectUserById(users, comment.AuthorID)
                                    .profile_picture
                                }`
                              : defaultAvatar
                          }
                          alt="User Avatar"
                          onClick={() => handleAvatarClick(comment.AuthorID)}
                        />
                      </div>
                    ) : (
                      <p>Author: Unknown</p>
                    )}
                    <button
                      className={PostPageCSS["reply-button"]}
                      onClick={() => {
                        setReplyToCommentId(comment.id);
                        handleReplyToComment(comment.id);
                      }}
                    >
                      Reply
                    </button>
                    {currentUser && currentUser.id === comment.AuthorID && (
                      <button
                        className={PostPageCSS["delete-button"]}
                        onClick={() => setShowDeleteCommentConfirmation(true)}
                      >
                        Delete
                      </button>
                    )}
                    {showDeleteCommentConfirmation && (
                      <ConfirmationDialog
                        message="Are you sure you want to delete your comment?"
                        onConfirm={() => handleDeleteComment(comment.id)}
                        onCancel={() => setShowDeleteCommentConfirmation(false)}
                      />
                    )}
                    <div className={PostPageCSS["reply-container"]}>
                      <CommentReplies
                        parent_id={comment.id}
                        onDelete={handleDeleteComment}
                        replies={comments.filter(
                          (reply) => reply.ParentCommentID === comment.id
                        )}
                        onAvatar={handleAvatarClick}
                      />
                    </div>
                  </li>
                )
              )}
            </ul>
          ) : null}
        </div>
        <Pagination
          perPage={commentsPerPage}
          total={rootComments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className={PostPageCSS["comment-form"]}>
          <div className={PostPageCSS["reply-info"]}>
            {replyToCommentId && (
              <>
                <p>
                  Replying to comment ID:{" "}
                  {currentComments
                    .find((comment) => comment.id === replyToCommentId)
                    ?.Content.slice(0, 10)}
                  <button
                    className={PostPageCSS["reset-reply-button"]}
                    onClick={() => setReplyToCommentId(null)}
                  >
                    ✖
                  </button>
                </p>
              </>
            )}
          </div>
          <textarea
            className={PostPageCSS["comment-textarea"]}
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className={PostPageCSS["submit-button"]}
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
