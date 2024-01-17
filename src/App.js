import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Login from "./pages/login/Login";
import Blogs from "./pages/blogs/Blogs";
import Create from "./pages/create/Create";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

// mongodb+srv://dushyantist:Z9i1WxjJMtb9J8Sh@cluster0.fp93jzi.mongodb.net/?retryWrites=true&w=majority

//Z9i1WxjJMtb9J8Sh
