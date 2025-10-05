import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <p>Your one-stop shop for amazing books and stories!</p>
      </div>

      <div className={styles.links}>
        <Link to="/shop">Shop</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className={styles.social}>
        <button aria-label="Facebook">
          <FaFacebookF />
        </button>
        <button aria-label="Twitter">
          <FaTwitter />
        </button>
        <button aria-label="Instagram">
          <FaInstagram />
        </button>
      </div>

      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} BookStore. All Rights Reserved.
      </p>
    </footer>
  );
}
