import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useAtom } from "jotai";
import List from "../List/List";
import { listsAtom } from "../../atoms";
import styles from "./Board.module.css";

interface BoardProps {
  addCard: (listId: string, title: string, description: string) => void;
  removeCard: (cardId: string) => void;
  addList: (title: string) => void;
  removeList: (listId: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<BoardProps> = ({
  addCard,
  removeCard,
  addList,
  removeList,
  onDragEnd,
}) => {
  const [lists] = useAtom(listsAtom);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle.trim());
      setNewListTitle("");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.boardContainer}>
        <div className={styles.boardHeader}>
          <h2>Team Board</h2>
          <div className={styles.boardActions}>
            <button>Board</button>
            <button>Invite</button>
          </div>
        </div>
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
          <div className={styles.addListForm}>
            <input
              type="text"
              placeholder="New list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={handleAddList}>Add List</button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
