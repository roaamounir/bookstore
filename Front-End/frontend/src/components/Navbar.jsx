import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/authSlice";
import styles from "../styles/Nav.module.css";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth);
  const { favItems = [] } = useSelector((state) => state.favs || {});
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Title */}
      <div className={styles.title} onClick={() => navigate("/home")}>
        BookStore
      </div>

      {/* Icons */}
      <div className={styles.icons}>
        <div className={styles.searchContainer}>
          <FaSearch
            className={styles.icon}
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          )}
        </div>

        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => navigate("/favs")}
        >
          <FaHeart className={styles.icon} />
          {favItems.length > 0 && (
            <span className={styles.badge}>{favItems.length}</span>
          )}
        </div>

        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className={styles.icon} />
          {cartItems.length > 0 && (
            <span className={`${styles.badge} ${styles.blueBadge}`}>
              {cartItems.length}
            </span>
          )}
        </div>

        {(role === "admin" || role === "owner") && (
          <FaTachometerAlt
            className={styles.icon}
            onClick={() => navigate("/dashboard")}
          />
        )}

        {token && (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/Blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
