export interface Card {
  id: string;
  content: string;
  position: number;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}
