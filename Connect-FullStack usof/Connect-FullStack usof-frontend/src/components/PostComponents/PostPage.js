import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../store/actions/posts.js";
import { useParams } from "react-router-dom";

import Header from "../Header.js";
import MenuBar from "../MenuBar.js";

import PostPageCSS from "../../styles/PostPage.module.css";

const likeIMG = "/like.png";
const dislikeIMG = "/dislike.png";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts.post);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {};

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MenuBar />
      <Header />
      <div className={PostPageCSS["post-page"]}>
        <h2>{post[0].Title}</h2>
        <p>{post[0].Content}</p>

        <img className={PostPageCSS["like-icon"]} src={likeIMG} alt="like" />
        <img
          className={PostPageCSS["dislike-icon"]}
          src={dislikeIMG}
          alt="like"
        />

        <div className={PostPageCSS["comments-section"]}>
          <h3>Comments</h3>
          <ul></ul>
        </div>

        <div className={PostPageCSS["comment-form"]}>
          <textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
