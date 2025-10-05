import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar";
import Footer from "../components/Footer"; 

import styles from "../styles/Layout.module.css";

export default function PublicLayout() {
  return (
    <div className={styles.layout}>
      <Nav />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
