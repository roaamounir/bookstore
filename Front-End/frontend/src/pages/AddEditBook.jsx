import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook, fetchBooks } from "../Redux/slices/bookSlice";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/AddEditBook.module.css";

export default function AddEditBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { books } = useSelector((state) => state.books);
  const { user, role } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    bookCoverImage: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (id && books.length > 0) {
      const bookToEdit = books.find(
        (b) =>
          b._id === id &&
          (role === "admin" || String(b.createdBy._id || b.createdBy) === String(user?._id))
      );

      if (bookToEdit) setFormData({ ...bookToEdit });
      else {
        alert("You do not have permission to edit this book.");
        navigate("/dashboard/books");
      }
    }
  }, [id, books, role, user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newBook = { ...formData };

    if (role === "owner" && !id) {
      newBook.createdBy = user._id;
    }

    if (id) {
      const bookToEdit = books.find((b) => b._id === id);
      if (
        role === "admin" ||
        (role === "owner" && String(bookToEdit.createdBy._id || bookToEdit.createdBy) === String(user?._id))
      ) {
        dispatch(updateBook({ _id: id, ...newBook }));
      } else {
        alert("You do not have permission to edit this book.");
        return;
      }
    } else {
      dispatch(addBook(newBook));
    }

    navigate("/dashboard/books");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{id ? "Edit Book" : "Add New Book"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
          </select>
          <input
            className={styles.input}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="bookCoverImage"
            placeholder="Cover Image URL"
            value={formData.bookCoverImage}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            {id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
