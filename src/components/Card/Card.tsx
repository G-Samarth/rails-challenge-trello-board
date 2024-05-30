import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  card: {
    id: string;
    content: string;
  };
  removeCard: () => void;
}

const Card: React.FC<CardProps> = ({ card, removeCard }) => (
  <div className={styles.card}>
    <p>{card.content}</p>
    <button onClick={removeCard}>Remove</button>
  </div>
);

export default Card;
