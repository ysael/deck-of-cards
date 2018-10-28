import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import produce from "immer"

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


const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const shuffleDeck = d => shuffle([...d]);
const randomCardIndex = d => Math.floor(Math.random() * d.length);
@Injectable({
  providedIn: 'root'
})

export class DeckOfCardsService {
  deck: Deck;

  private deckSource = new BehaviorSubject<Deck>(createDeck(initialSuits, InitialValues));
  decks = this.deckSource.asObservable();
  selectedCardIndex: number;

  constructor() {
    this.selectedCardIndex = null;
    this.decks.subscribe(d => this.deck = d);
  }

  getDeck() {
    return this.decks;
  }

  suffle() {
    this.deckSource.next(shuffleDeck(this.deck));
  }

  selectACard() {
    this.deckSource.next(
      produce(this.deck, draftDeck => {
        draftDeck.forEach(d => d.isSeleCted = false);
        draftDeck[randomCardIndex(this.deck)].isSeleCted = true
      })
    );
  }
}
