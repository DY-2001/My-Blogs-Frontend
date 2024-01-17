import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const Navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      } else if (response.status === 400) {
        Navigate("/");
      }
    };
    fetchData();
  }, [liked]);

  if (!postInfo) return "";

  const handleBackButton = () => {
    Navigate("/blogs");
  };
  const handleLiked = async () => {
    setLiked(!liked);
    try {
      const response = await fetch(`http://localhost:4000/post/${id}/like`, {
        method: "POST",
        body: JSON.stringify({ userInfo }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        response.json().then((postInfo) => {
          // setPostInfo(postInfo);
        });
      }
    } catch (error) {
      console.error("Failed to like/unlike post", error);
    }
  };


  return (
    <div style={{ margin: "30px" }} className="post-page">
      <button
        style={{
          width: "50px",
          height: "30px",
          background: "#543916CC",
          color: "white",
        }}
        onClick={handleBackButton}
      >
        back
      </button>
      <div
        style={{
          display: "flex",
          width: "50px",
          height: "50px",
          marginTop: "20px",
        }}
        onClick={() => {
          handleLiked();
        }}
      >
        {postInfo.likes?.includes(userInfo.id) ? (
          <img src="/images/blackHeart.png" />
        ) : (
          <img src="/images/heart.png" />
        )}
      </div>
      <h1>{postInfo.title}</h1>

      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", height: "400px" }}
        className="image"
      >
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
