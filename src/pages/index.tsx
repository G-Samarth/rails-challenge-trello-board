import { useState } from "react";
import { trpc } from "../utils/trpc";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Board from "../components/Board/Board";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: lists, refetch } = trpc.useQuery(["getLists"]);
  const addList = trpc.useMutation(["addList"]);
  const deleteList = trpc.useMutation(["deleteList"]);
  const addCard = trpc.useMutation(["addCard"]);
  const deleteCard = trpc.useMutation(["deleteCard"]);

  const handleAddList = async (title: string) => {
    await addList.mutateAsync({ title });
    refetch();
  };

  const handleDeleteList = async (listId: string) => {
    await deleteList.mutateAsync(listId);
    refetch();
  };

  const handleAddCard = async (listId: string, content: string) => {
    await addCard.mutateAsync({ listId, content });
    refetch();
  };

  const handleDeleteCard = async (cardId: string) => {
    await deleteCard.mutateAsync(cardId);
    refetch();
  };

  const handleDragEnd = async (result: any) => {
    // const { destination, source } = result;
    // if (!destination) return;
    // const sourceList = lists.find(listId === source.droppableId);
    // const destinationList = lists.find(listId === destination.droppableId);
    // if (!sourceList || !destinationList) return;
    // const [movedCard] = sourceList.cards.splice(source.index, 1);
    // destinationList.cards.splice(destination.index, 0, movedCard);
    // setLists(
    //   lists.map(
    //     listId === sourceList.id
    //       ? sourceList
    //       : listId === destinationList.id
    //       ? destinationList
    //       : list
    //   )
    // );
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <Board
          lists={lists || []}
          addCard={handleAddCard}
          removeCard={handleDeleteCard}
          addList={handleAddList}
          removeList={handleDeleteList}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}
