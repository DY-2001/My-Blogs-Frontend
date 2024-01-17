import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../Editor";
import { UserContext } from "../../UserContext";

export default function Create() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  console.log(userInfo, "this is user info")
  
  if(Object.keys(userInfo).length === 0) return <Navigate to={"/"} />;
  if (redirect) {
    return <Navigate to={"/blogs"} />;
  }
  
  return (
    <form onSubmit={createNewPost}>
      <div style={{ margin: "40px 200px 0px 200px" }}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "5px" }}>Create post</button>
      </div>
    </form>
  );
}
