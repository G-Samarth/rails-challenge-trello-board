import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import styles from "./List.module.css";
import { List as ListType } from "../../types";

interface ListProps {
  list: ListType;
  addCard: (listId: string, title: string, description: string) => void;
  removeCard: (cardId: string) => void;
  removeList: (listId: string) => void;
}

const List: React.FC<ListProps> = ({
  list,
  addCard,
  removeCard,
  removeList,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCard = () => {
    if (title && description) {
      addCard(list.id, title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
        <h3>{list.title}</h3>
        <button onClick={() => removeList(list.id)}>Delete List</button>
      </div>
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.cards}
          >
            {list.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.cardWrapper}
                  >
                    <Card card={card} removeCard={() => removeCard(card.id)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={styles.addCardForm}>
        <input
          type="text"
          placeholder="Card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Card description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

export default List;
