import React from "react";

import Header from "./Header";
import MenuBar from "./MenuBar";
import PostsList from "./PostComponents/PostList.js";

import "../styles/Page.css";

const Page = () => {
  return (
    <div style={{ display: "flex" }}>
      <MenuBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PostsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
