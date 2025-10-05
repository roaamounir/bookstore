import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "../../api/axios";

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Box>
      {users.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
        >
          No users found.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflowX: "auto" }}>
          <Table sx={{ minWidth: 650, background: "#fff" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#008f8c" }}>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff", textAlign: "center" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell sx={{ color: "#008f8c" }}>{user.name}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>{user.role}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
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
