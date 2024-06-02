import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import styles from "./List.module.css";
import { List as ListType } from "../../types";

interface ListProps {
  list: ListType;
  addCard: (listId: string, content: string) => void;
  removeCard: (cardId: string) => void;
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
    <button
      className={styles.addCardButton}
      onClick={() => addCard(list.id, `New Card ${new Date().getTime()}`)}
    >
      Add Card
    </button>
  </div>
);

export default List;
