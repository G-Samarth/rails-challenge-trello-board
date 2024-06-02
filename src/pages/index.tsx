import { useEffect } from "react";
import { useAtom } from "jotai";
import { trpc } from "../utils/trpc";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import BoardNoSSR from "../components/Board/BoardNoSSR";
import { listsAtom } from "../atoms";
import styles from "../styles/Home.module.css";
import { DropResult } from "react-beautiful-dnd";

const Home = () => {
  const { data: listsData, refetch } = trpc.useQuery(["getLists"]);
  const addList = trpc.useMutation(["addList"], {
    onSuccess: () => refetch(),
  });
  const deleteList = trpc.useMutation(["deleteList"], {
    onSuccess: () => refetch(),
  });
  const addCard = trpc.useMutation(["addCard"], {
    onSuccess: () => refetch(),
  });
  const deleteCard = trpc.useMutation(["deleteCard"], {
    onSuccess: () => refetch(),
  });
  const updateCardPosition = trpc.useMutation(["updateCardPosition"], {
    onSuccess: () => refetch(),
  });

  const [lists, setLists] = useAtom(listsAtom);

  useEffect(() => {
    if (listsData) {
      setLists(listsData);
    }
  }, [listsData, setLists]);

  const handleAddList = async (title: string) => {
    try {
      await addList.mutateAsync({ title });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error adding list:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      await deleteList.mutateAsync(listId);
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error deleting list:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const handleAddCard = async (listId: string, content: string) => {
    try {
      await addCard.mutateAsync({ listId, content });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error adding card:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await deleteCard.mutateAsync(cardId);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error deleting card:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!lists) return;

    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceListIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destinationListIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    if (sourceListIndex === -1 || destinationListIndex === -1) return;

    const sourceList = lists[sourceListIndex];
    const destinationList = lists[destinationListIndex];

    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, movedCard);

    // Update the positions of the cards in the source and destination lists
    sourceList.cards.forEach((card, index) => {
      card.position = index;
    });
    destinationList.cards.forEach((card, index) => {
      card.position = index;
    });

    const updatedLists = [...lists];
    updatedLists[sourceListIndex] = sourceList;
    updatedLists[destinationListIndex] = destinationList;

    setLists(updatedLists);

    try {
      await updateCardPosition.mutateAsync({
        cardId: draggableId,
        newListId: destination.droppableId,
        newPosition: destination.index,
      });
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error updating card position:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <BoardNoSSR
          addCard={handleAddCard}
          removeCard={handleDeleteCard}
          addList={handleAddList}
          removeList={handleDeleteList}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};

export default Home;
