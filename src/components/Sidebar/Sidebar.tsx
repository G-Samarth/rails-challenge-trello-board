import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => (
  <aside className={styles.sidebar}>
    <ul>
      <li>Workspaces</li>
      <li>Recent</li>
      <li>Starred</li>
      <li>Create</li>
    </ul>
  </aside>
);

export default Sidebar;
