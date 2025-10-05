import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.storeName}>BookStore</h1>

      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.text}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
