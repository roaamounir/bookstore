import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFav } from "../Redux/slices/favSlice";
import { deleteBook } from "../Redux/slices/bookSlice";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Shop.module.css";
import { FaHeart, FaTrash } from "react-icons/fa";

export default function Favourites() {
  const { favItems } = useSelector((state) => state.favs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    if (window.confirm("Remove this book from favourites?")) {
      dispatch(removeFromFav(id));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.title}>My Favourites</h1>

      {favItems.length === 0 ? (
        <p>No favourite books yet.</p>
      ) : (
        <div className={styles.cardsContainer}>
          {favItems.map((book) => (
            <div key={book._id} className={styles.card}>
              <img
                src={book.bookCoverImage}
                alt={book.title}
                onClick={() => navigate(`/books/${book._id}`)}
              />
              <div className={styles.cardContent}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p className={styles.price}>${book.price}</p>
              </div>
              <div className={styles.cardActions}>
                <FaHeart
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleRemove(book._id)}
                />
                <FaTrash
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleDelete(book._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
