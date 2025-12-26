import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawerItems = [
    { text: "Dashboard", action: () => navigate("/dashboard") },
    ...(role !== "user"
      ? [{ text: "Notifications", icon: <NotificationsIcon /> }]
      : []),
    { text: "Profile", icon: <AccountCircle /> },
    { text: "Logout", icon: <ExitToAppIcon />, action: handleLogout },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {drawerItems.map(({ text, icon, action }) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              action?.();
              toggleDrawer();
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={3}
        sx={{
          background: "linear-gradient(90deg, #008f8c, #015958)",
          color: "#fff",
          borderBottom: "2px solid rgba(224, 234, 248, 1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Mobile menu */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", md: "block" },
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Typography>

          {role !== "user" && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                backgroundColor: "#044c4bff",
                px: 2,
                py: 0.5,
                borderRadius: 5,
                width: { sm: "200px", md: "350px" },
                "&:hover": { backgroundColor: "#1c5554ff" },
                transition: "0.3s",
              }}
            >
              <SearchIcon sx={{ mr: 1, color: "#94a3b8" }} />
              <InputBase
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ color: "#fff", fontSize: 14, width: "100%" }}
              />
            </Box>
          )}

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {role !== "user" && (
              <IconButton sx={{ color: "#fff" }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            <IconButton sx={{ color: "#fff" }}>
              <AccountCircle />
            </IconButton>
            <IconButton
              sx={{
                color: "#fff",
                "&:hover": { color: "#61fffcff" },
                transition: "0.3s",
              }}
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}
