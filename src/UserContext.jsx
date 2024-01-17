import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [userInfo, setUserInfo] = useState(storedUserInfo);
  const [myBlogs, setMyBlogs] = useState(false);
  const [mostLiked, setMostLiked] = useState(false);
  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, myBlogs, setMyBlogs, mostLiked, setMostLiked }}
    >
      {children}
    </UserContext.Provider>
  );
}
