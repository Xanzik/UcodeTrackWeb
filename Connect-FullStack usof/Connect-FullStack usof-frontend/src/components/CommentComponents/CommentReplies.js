import React, { useState } from "react";
import { useSelector } from "react-redux";

import CommentLikes from "../LikesComponents/CommentLikes.js";

import PostPageCSS from "../../styles/PostPage.module.css";

const selectUsers = (state) => (state.users ? state.users.users : []);
const selectUserById = (users, userId) =>
  users.find((user) => user.id === userId);

const defaultAvatar = "/basic_avatar.jpg";
const URL = `http://localhost:5000`;

const CommentReplies = ({ parent_id, onDelete, replies, onAvatar }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector(selectUsers);
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className={PostPageCSS["reply-container"]}>
      {replies && replies.length > 0 && (
        <>
          <button onClick={handleToggleReplies}>
            {showReplies ? "Hide replies" : "Show replies"}
          </button>
          <br></br>
          <br></br>
          {showReplies && (
            <ul className={PostPageCSS["reply-list"]}>
              {replies
                .filter((reply) => reply.ParentCommentID === parent_id)
                .map((reply) => (
                  <li key={reply.id} className={PostPageCSS["reply"]}>
                    <p>{reply.Content}</p>
                    <CommentLikes commentId={reply.id} />
                    {selectUserById(users, reply.AuthorID) ? (
                      <div className={PostPageCSS["user-info"]}>
                        <p>{selectUserById(users, reply.AuthorID).login}</p>
                        <p className={PostPageCSS["rating"]}>
                          {selectUserById(users, reply.AuthorID).rating}
                        </p>
                        <p>{new Date(reply.updatedAt).toLocaleString()}</p>
                        <img
                          src={
                            selectUserById(users, reply.AuthorID)
                              .profile_picture
                              ? `${URL}/static/${
                                  selectUserById(users, reply.AuthorID)
                                    .profile_picture
                                }`
                              : defaultAvatar
                          }
                          onClick={() => onAvatar(reply.AuthorID)}
                          alt="User Avatar"
                        />
                      </div>
                    ) : (
                      <p>Author: Unknown</p>
                    )}
                    {currentUser && currentUser.id === reply.AuthorID && (
                      <button
                        className={PostPageCSS["delete-button"]}
                        onClick={() => onDelete(reply.id)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default CommentReplies;
