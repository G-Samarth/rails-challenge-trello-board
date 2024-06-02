export interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}
