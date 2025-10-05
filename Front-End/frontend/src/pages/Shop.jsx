import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/slices/bookSlice";
import { addToFav, removeFromFav } from "../Redux/slices/favSlice";
import { toggleCartItem } from "../Redux/slices/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Shop.module.css";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { books, loading, error } = useSelector((state) => state.books);
  const cartItems = useSelector((state) => state.cart)?.cartItems || [];
  const favItems = useSelector((state) => state.favs)?.favItems || [];

  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  let filteredBooks = [...books];
  if (filterCategory)
    filteredBooks = filteredBooks.filter((b) => b.category === filterCategory);
  if (searchQuery)
    filteredBooks = filteredBooks.filter((b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  if (sortOption === "price-asc")
    filteredBooks.sort((a, b) => a.price - b.price);
  else if (sortOption === "price-desc")
    filteredBooks.sort((a, b) => b.price - a.price);
  else if (sortOption === "title")
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.title}>Book Store</h1>

      <div className={styles.controls}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="title">Title (A → Z)</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Romance">Romance</option>
          <option value="History">History</option>
        </select>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.cardsContainer}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className={styles.card}>
              <img src={book.bookCoverImage} alt={book.title} />
              <div className={styles.cardContent}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p className={styles.price}>${book.price}</p>
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.detailsBtn}
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  Details
                </button>

                <FaShoppingCart
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "20px",
                    color: cartItems.find((b) => b._id === book._id)
                      ? "green"
                      : "blue",
                  }}
                  onClick={() => dispatch(toggleCartItem(book))}
                />

                <FaHeart
                  style={{
                    color: favItems.find((b) => b._id === book._id)
                      ? "red"
                      : "gray",
                    cursor: "pointer",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                  onClick={() =>
                    favItems.find((b) => b._id === book._id)
                      ? dispatch(removeFromFav(book._id))
                      : dispatch(addToFav(book))
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
