import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadUserFromStorage } from "../Redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.storeName}>BookStore</h1>

      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Don’t have an account?{" "}
        <Link to="/Register" className={styles.link}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
