import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./blogs.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Pagination from "../pagination/Pagination";
const Blogs = () => {
  const Navigate = useNavigate();
  const { setUserInfo, userInfo, myBlogs, setMyBlogs } =
    useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  useEffect(() => {
    Aos.init();
  }, []);
console.log(userInfo, "userInfo")
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        response.json().then((posts) => {
          setBlogs(posts);
        });
      } else {
        Navigate("/");
      }
    }
    fetchData();
  }, []);

  if (blogs?.length === 0) return;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <Navbar />
      <div className={styles.blogContainer}>
        {currentPosts &&
          currentPosts.map((blog) => {
            if (myBlogs && blog.author.username !== userInfo.username) {
              return null;
            } else {
              return (
                <div className={styles.blogParticular} data-aos="fade-up-right">
                  <div className={styles.blogLeft}>
                    <img
                      src={"http://localhost:4000/" + blog.cover}
                      alt="img"
                      className={styles.blogImg}
                    ></img>
                  </div>
                  <div className={styles.blogRight}>
                    <div className={styles.blogTitle}>{blog.title}</div>
                    <div className={styles.blogMinor}>
                      <div className={styles.blogAuthor}>
                        {blog.author.username}
                      </div>
                      <div className={styles.blogDate}>
                        {blog.createdAt.split("T")[0]}
                      </div>
                    </div>
                    <div className={styles.blogSummary}>
                      {blog.summary.slice(0, 300)}...
                    </div>
                    <div>
                      <span
                        className={styles.blogDetail}
                        onClick={() => Navigate(`/post/${blog._id}`)}
                      >
                        See more
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div>
        <Pagination
          totalPosts={blogs.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Blogs;
