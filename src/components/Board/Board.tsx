import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import List from "../List/List";
import styles from "./Board.module.css";

interface Card {
  id: string;
  content: string;
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

interface BoardProps {
  lists: List[];
  addCard: (listId: string, content: string) => void;
  removeCard: (cardId: string) => void;
  addList: (title: string) => void;
  removeList: (listId: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<BoardProps> = ({
  lists,
  addCard,
  removeCard,
  addList,
  removeList,
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className={styles.board}>
      {lists.map((list) => (
        <Droppable key={list.id} droppableId={list.id} type="CARD">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.listWrapper}
            >
              <List
                list={list}
                addCard={addCard}
                removeCard={removeCard}
                removeList={removeList}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
      <button
        className={styles.addListButton}
        onClick={() => addList("New List")}
      >
        Add List
      </button>
    </div>
  </DragDropContext>
);

export default Board;
