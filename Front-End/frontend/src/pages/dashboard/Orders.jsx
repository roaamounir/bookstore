import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      if (!token) {
        console.error(" No token found in localStorage");
        return;
      }

      const res = await axios.get("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      {orders.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
        >
          No orders found.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflowX: "auto" }}>
          <Table sx={{ minWidth: 650, background: "#fff" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#008f8c" }}>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Total
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Books
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell sx={{ color: "#008f8c" }}>{order._id}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>
                    {order.user?.username || order.user?.name}
                  </TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>{order.status}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>
                    <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                      {order.books?.map((b) => (
                        <li key={b.book?._id}>
                          {b.book?.title} × {b.quantity}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
