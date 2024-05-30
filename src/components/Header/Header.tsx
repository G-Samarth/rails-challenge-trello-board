import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1>Trello Board</h1>
    <div className={styles.headerActions}>
      <button>Invite</button>
      <button>Create</button>
    </div>
  </header>
);

export default Header;
