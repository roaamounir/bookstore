"use client";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
} from "@mui/material";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/payment/create-checkout-session",
        {
          items: cartItems,
          customerEmail: "test@example.com",
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #124139ff 0%, #478379ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 20,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "90%",
          maxWidth: 900,
          borderRadius: 3,
          p: 4,
          backgroundColor: "#e9e5e5ff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#2e2e2e",
            mb: 4,
          }}
        >
          Your Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {cartItems.map((item) => (
                <Grid item xs={12} md={6} key={item._id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: 3,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        height: 180,
                        borderRadius: "8px 8px 0 0",
                        objectFit: "cover",
                      }}
                      image={item.bookCoverImage || "/placeholder.jpg"}
                      alt={item.title}
                    />

                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price} × {item.quantity}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Subtotal: ${item.price * item.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Total: ${total.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  background:
                    "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)",
                  },
                }}
              >
                Proceed to Payment
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
