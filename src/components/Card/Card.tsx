import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  card: {
    id: string;
    title: string;
    description: string;
  };
  removeCard: () => void;
}

const Card: React.FC<CardProps> = ({ card, removeCard }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <h4>{card.title}</h4>
      <button onClick={removeCard}>Remove</button>
    </div>
    <p>{card.description}</p>
  </div>
);

export default Card;
