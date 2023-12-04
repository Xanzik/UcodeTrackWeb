import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeComment,
  deleteLikeComment,
  createDislikeComment,
  deleteDislikeComment,
  fetchLikesForComment,
  fetchDislikesForComment,
} from "../../store/actions/like.js";

import { getUsers } from "../../store/actions/user.js";

import PostPageCSS from "../../styles/PostPage.module.css";

const likeIMG = "/like.svg";

const CommentLikes = ({ commentId }) => {
  const dispatch = useDispatch();
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const likesData = await dispatch(fetchLikesForComment(commentId));
        const dislikeData = await dispatch(fetchDislikesForComment(commentId));
        const userLike = likesData.find(
          (like) => like.AuthorID === currentUser.id
        );
        const userDisLike = dislikeData.find(
          (like) => like.AuthorID === currentUser.id
        );
        setIsLiked(!!userLike);
        setIsDisliked(!!userDisLike);
      } catch (error) {
        console.error("Error fetching likes for comment:", error);
      }
    };

    fetchLikeStatus();
  }, [dispatch, commentId, currentUser]);

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await dispatch(createLikeComment(commentId));
      } else {
        await dispatch(deleteLikeComment(commentId));
      }
      const likesData = await dispatch(fetchLikesForComment(commentId));
      const userLike = likesData.find(
        (like) => like.AuthorID === currentUser.id
      );
      setIsLiked(!!userLike);
      await dispatch(getUsers());
    } catch (error) {
      console.error("Error handling like for comment:", error);
    }
  };

  const handleDislikeClick = async () => {
    if (isDisliked) {
      await dispatch(deleteDislikeComment(commentId));
    } else {
      await dispatch(createDislikeComment(commentId));
    }
    await dispatch(getUsers());
    setIsDisliked(!isDisliked);
  };

  return (
    <div>
      <div className={PostPageCSS["like-dislike-container"]}>
        <img
          className={`${PostPageCSS["like-icon"]} ${
            isLiked ? PostPageCSS["liked"] : ""
          }`}
          src={likeIMG}
          alt="like"
          onClick={handleLikeClick}
        />
        <img
          className={`${PostPageCSS["dislike-icon"]} ${
            isDisliked ? PostPageCSS["disliked"] : ""
          }`}
          src={likeIMG}
          alt="dislike"
          onClick={handleDislikeClick}
        />
      </div>
    </div>
  );
};

export default CommentLikes;
