import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import styles from "./List.module.css";

interface Card {
  id: string;
  content: string;
}

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: Card[];
  };
  addCard: (listId: string, content: string) => void;
  removeCard: (listId: string, cardId: string) => void;
  removeList: (listId: string) => void;
}

const List: React.FC<ListProps> = ({
  list,
  addCard,
  removeCard,
  removeList,
}) => (
  <div className={styles.list}>
    <div className={styles.listHeader}>
      <h3>{list.title}</h3>
      <button onClick={() => removeList(list.id)}>Delete List</button>
    </div>
    {list.cards.map((card, index) => (
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className={styles.cardWrapper}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card card={card} removeCard={() => removeCard(list.id, card.id)} />
          </div>
        )}
      </Draggable>
    ))}
    <button
      className={styles.addCardButton}
      onClick={() => addCard(list.id, `New Card ${new Date().getTime()}`)}
    >
      Add Card
    </button>
  </div>
);

export default List;
