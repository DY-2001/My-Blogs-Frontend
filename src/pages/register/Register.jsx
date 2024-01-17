import { useState } from "react";
import styles from "./../login/login.module.css";
import { Navigate } from "react-router-dom";

const Register = (props) => {
  const { loginPage, setLoginPage } = props;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Registration Successful");
      setLoginPage(!loginPage);
    } else {
      alert("registration failed");
    }
  };
  return (
    <div className={styles.loginCard}>
      <div className={styles.upperLoginCard}>
        <p className={styles.loginGreet}>Hello!</p>
        <p className={styles.loginWelcom}>Sign Up to Get Started</p>
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
        <button className={styles.loginButton} onClick={handleRegister}>
          Register
        </button>
        <p style={{ paddingLeft: "10px" }}>
          <span
            className={styles.createLogin}
            onClick={() => setLoginPage(!loginPage)}
          >
            Already have account? Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
