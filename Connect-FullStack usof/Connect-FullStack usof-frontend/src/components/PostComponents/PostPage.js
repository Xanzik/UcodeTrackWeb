import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../store/actions/posts.js";
import { useParams } from "react-router-dom";

import "../../styles/PostPage.css";

import Header from "../Header.js";
import MenuBar from "../MenuBar.js";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  const post = useSelector((state) => state.posts.post);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MenuBar />
      <Header />
      <div className="post-page">
        <h2>{post[0].Title}</h2>
        <p>{post[0].Content}</p>
      </div>
    </div>
  );
};

export default PostPage;
