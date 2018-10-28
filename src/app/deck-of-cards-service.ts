import { Injectable } from '@angular/core';

// Move to deck of card service

interface Card {
  value: string;
  suit: string;
  isSeleCted: boolean;
}

export type Deck = Card[];

type Suits = string[];
type Values = string[];

const numbers = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const initialSuits: Suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const InitialValues = ['ace', ...numbers, 'jack', 'queen', 'king'];

const makeACard = (value: string, suit: string): Card => ({ value, suit, isSeleCted: false });
const makeASuit = (values: Values, suit: string) => values.map(value => makeACard(value, suit));
const deckReducer = (values: Values) => (d, suit) => [...d, ...makeASuit(values, suit)];
const createDeck = (suits: Suits, values: Values): Deck => suits.reduce(deckReducer(values), []);

// This is mutating the array, with more time I would have created a non mutating version
// of this service leveraging observables...for now moving to the visual part of the app ;)
const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const shuffleDeck = d => shuffle(d);
const randomCardIndex = d => Math.floor(Math.random() * d.length);

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  deck: Deck;
  selectedCardIndex: number;

  constructor() {
    this.creacteDeck();
    this.selectedCardIndex = null;
  }

  creacteDeck() {
    this.deck = createDeck(initialSuits, InitialValues);
  }

  suffle() {
    this.resetSelectedCard();
    this.deck = shuffleDeck(this.deck);
  }

  private resetSelectedCard() {
    // If a card is selected, unselect it;
    if (this.deck[this.selectedCardIndex]) {
      this.deck[this.selectedCardIndex].isSeleCted = false;
    }
  }
  selectACard() {
    this.resetSelectedCard();
    this.selectedCardIndex = randomCardIndex(this.deck);
    this.deck[this.selectedCardIndex].isSeleCted = true;
  }
}
