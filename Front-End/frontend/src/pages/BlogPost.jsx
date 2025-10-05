import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/BlogPost.module.css";

const blogPosts = [
  {
    id: 3,
    title: "Top Books to Read in 2025",
    summary: "A list of the most recommended books this year.",
    content:
      "In this article, we explore top books to read in 2025, including fiction, non-fiction, and personal development books to enhance your reading journey.",
    image:
      "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Upcoming Book Releases",
    summary: "Stay updated with the newest book releases this year.",
    content:
      "This article highlights the most anticipated books being released soon, including novels, non-fiction, and children's books.",
    image:
      "https://images.unsplash.com/photo-1623771702313-39dc4f71d275?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "John Doe",
    summary: "★★★★★",
    content:
      "Amazing bookstore! Found all my favorite books and the staff are super friendly.",
    image:
      "https://images.unsplash.com/photo-1524311583145-d5593bd3502a?q=80&w=1171&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Jane Smith",
    summary: "★★★★☆",
    content:
      "Great collection of books. Could use more variety in non-fiction section.",
    image:
      "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1172&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Michael Brown",
    summary: "★★★★☆",
    content:
      "Friendly staff and a peaceful environment. Perfect place for book lovers.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1170&auto=format&fit=crop",
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post)
    return (
      <main className={styles.postPage}>
        <Link to="/blog" className={styles.backBtn}>
          ← Back to Blog
        </Link>
        <p>Post not found</p>
      </main>
    );

  return (
    <main className={styles.postPage}>
      <Link to="/blog" className={styles.backBtn}>
        ← Back to Blog
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <img src={post.image} alt={post.title} className={styles.image} />
      <p>{post.summary}</p>
      <p className={styles.content}>{post.content}</p>
    </main>
  );
};

export default BlogPost;
