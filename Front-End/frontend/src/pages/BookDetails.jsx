import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/BookDetails.module.css";

export default function BookDetails() {
  const { id } = useParams();
  const { books } = useSelector((state) => state.books);

  const book = books.find((b) => b._id === id);

  if (!book) return <h2 className={styles.notFound}>Book not found</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={book.bookCoverImage || "https://via.placeholder.com/300x400"}
          alt={book.title}
          className={styles.cover}
        />
        <div className={styles.info}>
          <h1>{book.title}</h1>
          <p className={styles.author}>by {book.author}</p>
          <p className={styles.description}>{book.description}</p>
          <p className={styles.price}>${book.price}</p>
          <Link to="/shop" className={styles.backBtn}>
             Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}
