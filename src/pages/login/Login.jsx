import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Register from "../register/Register";
import { UserContext } from "../../UserContext";
const Login = () => {
  const navigate = useNavigate();
  const [loginPage, setLoginPage] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUserInfo(userInfo);
        navigate("/blogs");
      });
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <div className={styles.loginFullPage}>
      <div className={styles.loginLeftPage}>
        <p className={styles.loginUpperTag}>Publish your passions</p>
        <p className={styles.loginLowerTag}>
          Create a unique and beautiful blog easily
        </p>
      </div>
      <div className={styles.loginRightPage}>
        {loginPage ? (
          <div className={styles.loginCard}>
            <div className={styles.upperLoginCard}>
              <p className={styles.loginGreet}>Hello Again!</p>
              <p className={styles.loginWelcom}>Welcome Back</p>
            </div>
            <div className={styles.middleLoginCard}>
              <input
                type="text"
                className={styles.loginInput}
                placeholder="User Name"
                value={username}
                onChange={(ev) => setUserName(ev.target.value)}
              />
              <input
                type="password"
                className={styles.loginInput}
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div className={styles.lowerLoginCard}>
              <button className={styles.loginButton} onClick={handleLogin}>
                Login
              </button>
              <p style={{ paddingLeft: "10px" }}>
                <span
                  className={styles.createLogin}
                  onClick={() => setLoginPage(!loginPage)}
                >
                  Don't have account? Create
                </span>
              </p>
            </div>
          </div>
        ) : (
          <Register loginPage={loginPage} setLoginPage={setLoginPage} />
        )}
      </div>
    </div>
  );
};

export default Login;
