import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <div className={styles.home}>
      <div className={`${styles.overlay} ${animate ? styles.active : ""}`}>
        <h1 className={styles.title}>Welcome to BookStore</h1>
        <p className={styles.subtitle}>
          Your one-stop shop for amazing books and stories!
        </p>
        <button onClick={handleShopNow} className={styles.button}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
