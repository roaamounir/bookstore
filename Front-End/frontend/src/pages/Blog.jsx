import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "John Doe",
    summary: "★★★★★",
    content:
      "Amazing bookstore! Found all my favorite books and the staff are super friendly.",
    image:
      "https://images.unsplash.com/photo-1524311583145-d5593bd3502a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reviews",
  },
  {
    id: 2,
    title: "Jane Smith",
    summary: "★★★★☆",
    content:
      "Great collection of books. Could use more variety in non-fiction section.",
    image:
      "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reviews",
  },
  {
    id: 6,
    title: "Michael Brown",
    summary: "★★★★☆",
    content:
      "Friendly staff and a peaceful environment. Perfect place for book lovers.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Reviews",
  },
  // Tips / Articles
  {
    id: 3,
    title: "Top Books to Read in 2025",
    summary: "A list of the most recommended books this year.",
    content:
      "In this article, we explore top books to read in 2025, including fiction, non-fiction, and personal development books to enhance your reading journey.",
    image:
      "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tips",
  },
  {
    id: 4,
    title: "Upcoming Book Releases",
    summary: "Stay updated with the newest book releases this year.",
    content:
      "This article highlights the most anticipated books being released soon, including novels, non-fiction, and children's books.",
    image:
      "https://images.unsplash.com/photo-1623771702313-39dc4f71d275?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "News",
  },
];

const categories = ["All", "Reviews", "Tips", "News"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const articlePosts = filteredPosts.filter(
    (post) => post.category !== "Reviews"
  );

  const reviewPosts = filteredPosts.filter(
    (post) => post.category === "Reviews"
  );

  return (
    <main className={styles.blogPage}>
      <h1 className={styles.title}>Our Blog</h1>
      <p className={styles.intro}>
        Welcome to our BookStore Blog! Here you will find reviews, reading tips,
        and updates about the latest books.
      </p>

      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {articlePosts.length > 0 && (
        <div className={styles.featuredCard}>
          <img
            src={articlePosts[0].image}
            alt={articlePosts[0].title}
            className={styles.featuredImage}
          />
          <div className={styles.featuredContent}>
            <h2>{articlePosts[0].title}</h2>
            <p>{articlePosts[0].summary}</p>
            <Link
              to={`/blog/${articlePosts[0].id}`}
              className={styles.readMore}
            >
              Read More
            </Link>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {articlePosts.slice(1).map((post) => (
          <div key={post.id} className={styles.card}>
            <img src={post.image} alt={post.title} className={styles.image} />
            <div className={styles.content}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <p>{post.content}</p>
              <Link to={`/blog/${post.id}`} className={styles.readMore}>
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {reviewPosts.length > 0 && (
        <>
          <h2 style={{ marginTop: "50px", color: "#fff" }}>Customer Reviews</h2>
          <div className={styles.grid}>
            {reviewPosts.map((post) => (
              <div key={post.id} className={styles.reviewCard}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.reviewImage}
                />
                <div className={styles.reviewContent}>
                  <h2>{post.title}</h2>
                  <p>{post.summary}</p>
                  <p>{post.contentP}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Blog;
