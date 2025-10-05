"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PaymentSuccess.module.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const token = authData?.token;

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const createOrder = async () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        if (cartItems.length === 0) {
          console.warn("No items found in cart");
          return;
        }

        const paymentId = new URLSearchParams(window.location.search).get(
          "payment_intent"
        );

        const totalPrice = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        const books = cartItems.map((item) => ({
          bookId: item._id,
          quantity: item.quantity,
          price: item.price,
        }));

        const res = await axios.post(
          "http://localhost:5000/orders",
          { books, totalPrice, paymentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Order created successfully:", res.data);
        localStorage.removeItem("cartItems");
      } catch (err) {
        console.error("Error creating order:", err.response?.data || err.message);
      }
    };

    createOrder();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Payment Successful! </h1>
        <p>Your order has been placed successfully.</p>
        <button
          className={styles.shopBtn}
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
