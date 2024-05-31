import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.leftSection}>
      <div className={styles.logo}>
        <span>Trello-like</span>
      </div>
      <nav className={styles.nav}>
        <button>Workspaces</button>
        <button>Recent</button>
        <button>Starred</button>
        <button>Create</button>
      </nav>
    </div>
    <div className={styles.rightSection}>
      <input type="text" placeholder="Search" className={styles.searchInput} />
    </div>
  </header>
);

export default Header;
