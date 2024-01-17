import React, { useState, useContext } from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
const Navbar = () => {
  const Navigate = useNavigate();
  const { setUserInfo, userInfo, setMyBlogs, myBlogs, mostLiked, setMostLiked } =
    useContext(UserContext);
  const [ lastest, setLatest ] = useState(false);
  const handleCreateBlog = () => {
    Navigate("/create");
  };

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    localStorage.removeItem("userInfo");

    setUserInfo(null);
    Navigate("/");
  }
  return (
    <div className={styles.navContainer}>
      <div className={styles.navTitle}>
        <span style={{ fontWeight: "700" }}>Blog</span>Style
      </div>
      <div className={styles.navBlogTitles}>
        <div className={styles.navBlogTitle} onClick={handleCreateBlog}>
          CREATE BLOG
        </div>
        <div
          className={`${styles.navBlogTitle} ${myBlogs ? styles.selected : ""}`}
          onClick={() => setMyBlogs(!myBlogs)}
        >
          MY BLOGS
        </div>
        <div
          className={`${styles.navBlogTitle} ${lastest ? styles.selected : ""}`}
          onClick={() => setLatest(!lastest)}
        >
          LATEST
        </div>
        <div className={styles.navBlogTitle} >MOST LIKED</div>
      </div>
      <div className={styles.navLogout} onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default Navbar;
