import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Shop from "./pages/Shop";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

import BooksDashboard from "./pages/dashboard/Products";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrdersDashboard from "./pages/dashboard/Orders";
import UsersDashboard from "./pages/dashboard/Users";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddEditBook />} />
          <Route path="/edit-book/:id" element={<AddEditBook />} />
          <Route path="/favs" element={<Favourites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="books" element={<BooksDashboard />} />
          <Route path="orders" element={<OrdersDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
