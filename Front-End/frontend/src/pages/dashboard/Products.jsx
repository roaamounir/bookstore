import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../Redux/slices/bookSlice";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BooksDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, user } = useSelector((state) => state.auth);
  const { books, loading, error } = useSelector((state) => state.books);
  const { searchTerm } = useOutletContext();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const canEditDelete = (book) => {
    if (role === "admin") return true;
    if (
      role === "owner" &&
      book.createdBy &&
      String(book.createdBy._id || book.createdBy) === String(user?._id)
    )
      return true;
    return false;
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    dispatch(deleteBook(id));
  };

  const handleEdit = (book) => navigate(`/edit-book/${book._id}`);
  const handleAdd = () => navigate("/add-book");

  const filteredBooks = books
    .filter(
      (b) =>
        role === "admin" ||
        (b.createdBy &&
          String(b.createdBy._id || b.createdBy) === String(user?._id))
    )
    .filter((b) =>
      b.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {(role === "admin" || role === "owner") && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#fff",
              background: "#219aaaff",
            }}
          >
            Add New Book
          </Button>
        )}
      </Box>

      {loading && <Typography>Loading books...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {filteredBooks.length === 0 ? (
        <Typography
          sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
        >
          No books found.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflowX: "auto" }}>
          <Table sx={{ minWidth: 650, background: "#fff7f7c9" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#008f8c" }}>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Author
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
                  Category
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, textAlign: "center", color: "#fff" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book._id} hover>
                  <TableCell sx={{ color: "#008f8c", fontSize: "16px" }}>
                    {book.title}
                  </TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>{book.author}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>${book.price}</TableCell>
                  <TableCell sx={{ color: "#008f8c" }}>
                    {book.category}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {canEditDelete(book) && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ color: "#008f8c", borderColor: "#008f8c" }}
                          onClick={() => handleEdit(book)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    )}
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
