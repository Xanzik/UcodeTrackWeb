import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikePost,
  deleteLike,
  createDislikePost,
  deleteDislike,
  fetchLikesForPost,
  fetchDislikesForPost,
} from "../../store/actions/like.js";

import { getUsers } from "../../store/actions/user.js";

import PostPageCSS from "../../styles/PostPage.module.css";

const likeIMG = "/like.svg";

const PostLikes = ({ postId }) => {
  const dispatch = useDispatch();
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const likesData = await dispatch(fetchLikesForPost(postId));
        const dislikeData = await dispatch(fetchDislikesForPost(postId));
        const userLike = likesData.find(
          (like) => like.AuthorID === currentUser.id
        );
        const userDisLike = dislikeData.find(
          (like) => like.AuthorID === currentUser.id
        );
        setIsLiked(!!userLike);
        setIsDisliked(!!userDisLike);
      } catch (error) {
        console.error("Error fetching likes for Post:", error);
      }
    };

    fetchLikeStatus();
  }, [dispatch, postId, currentUser]);

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await dispatch(createLikePost(postId));
      } else {
        await dispatch(deleteLike(postId));
      }
      const likesData = await dispatch(fetchLikesForPost(postId));
      const userLike = likesData.find(
        (like) => like.AuthorID === currentUser.id
      );
      await dispatch(getUsers());
      setIsLiked(!!userLike);
    } catch (error) {
      console.error("Error handling like for Post:", error);
    }
  };

  const handleDislikeClick = async () => {
    if (isDisliked) {
      await dispatch(deleteDislike(postId));
    } else {
      await dispatch(createDislikePost(postId));
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

export default PostLikes;
