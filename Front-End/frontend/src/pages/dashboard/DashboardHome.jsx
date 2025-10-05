import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const { role, user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await axios.get("/books");
        let newStats = { books: 0, users: 0, orders: 0 };

        if (role === "admin") {
          const [usersRes, ordersRes] = await Promise.all([
            axios.get("/users"),
            axios.get("/orders"),
          ]);
          newStats = {
            books: booksRes.data.length,
            users: usersRes.data.length,
            orders: ordersRes.data.length,
          };
        } else if (role === "owner") {
          const ownerBooks = booksRes.data.filter(
            (book) =>
              book.createdBy &&
              String(book.createdBy._id || book.createdBy) === String(user?._id)
          );
          newStats.books = ownerBooks.length;
        }

        setStats(newStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [role, user]);

  const keysToShow =
    role === "admin"
      ? ["books", "users", "orders"]
      : role === "owner"
      ? ["books"]
      : [];

  const cardDetails = {
    books: {
      icon: <BookIcon sx={{ fontSize: 50, opacity: 0.3 }} />,
      gradient: "linear-gradient(135deg, #66e6bdff, #c7ffed)",
    },
    users: {
      icon: <PeopleIcon sx={{ fontSize: 50, opacity: 0.3 }} />,
      gradient: "linear-gradient(135deg, #008f8c, rgba(152, 209, 255, 1))",
    },
    orders: {
      icon: <ShoppingCartIcon sx={{ fontSize: 50, opacity: 0.3 }} />,
      gradient: "linear-gradient(135deg, #c4b361ff, #fda829ff)",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Grid container spacing={3}>
      {keysToShow.map((key, index) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                color: "#fff",
                background: cardDetails[key].gradient,
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 5, position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    fontSize: 80,
                    opacity: 0.2,
                  }}
                >
                  {cardDetails[key].icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {stats[key] || 0}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
