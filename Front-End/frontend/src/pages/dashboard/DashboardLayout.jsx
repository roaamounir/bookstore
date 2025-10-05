import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { useSelector } from "react-redux";
import Header from "../../components/Dashboard/Header";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerWidth = 240;

export default function DashboardLayout() {
  const { role } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#008f8c" : "#fff",
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
      background: "linear-gradient(180deg, #073132ff, #015958)",
            borderRight: "1px solid rgba(0,0,0,0.1)",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700,color:"#fff" }}>
            Dashboard
          </Typography>
        </Toolbar>
        <List sx={{ mt: 2 }}>
          {(role === "admin" || role === "owner") && (
            <>
              <NavLink to="/dashboard" style={linkStyle}>
                <ListItemButton sx={{ "&:hover": { backgroundColor: "#e0f2f1" } }}>
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: "#008f8c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Overview" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/dashboard/books" style={linkStyle}>
                <ListItemButton sx={{ "&:hover": { backgroundColor: "#e0f2f1" } }}>
                  <ListItemIcon>
                    <MenuBookIcon sx={{ color: "#008f8c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Books" />
                </ListItemButton>
              </NavLink>
            </>
          )}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/users" style={linkStyle}>
                <ListItemButton sx={{ "&:hover": { backgroundColor: "#e0f2f1" } }}>
                  <ListItemIcon>
                    <PeopleIcon sx={{ color: "#008f8c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/dashboard/orders" style={linkStyle}>
                <ListItemButton sx={{ "&:hover": { backgroundColor: "#e0f2f1" } }}>
                  <ListItemIcon>
                    <ShoppingCartIcon sx={{ color: "#008f8c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </NavLink>
            </>
          )}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <Header onSearch={setSearchTerm} />

        <Box sx={{ p: 3, mt: 2 }}>
          <Outlet context={{ searchTerm }} />
        </Box>
      </Box>
    </Box>
  );
}
