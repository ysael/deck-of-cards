// Move to deck of card service

interface Card {
  value: string;
  suit: string;
}

type Deck = Card[];

type Suits = string[];
type Values = string[];

const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const initialSuits: Suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const InitialValues: Values = ['Ace', [...numbers].toString(), 'Jack', 'Queen', 'King'];

const makeACard = (value: string, suit: string): Card => ({ value, suit });
const makeASuit = (values: Values, suit: string) => values.map(value => makeACard(value, suit));
const deckReducer = (values: Values) => (d, suit) => [...d, ...makeASuit(values, suit)];
export const createDeck = (suits: Suits, values: Values): Deck => suits.reduce(deckReducer(values), []);

const shuffle = (a: any[]): any[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const shuffleDeck = d => shuffle(d);
export const pickACard = d => d[Math.floor(Math.random() * d.length)];

const deck = createDeck(initialSuits, InitialValues);
console.log(deck);
console.log(shuffle(deck));

console.log(pickACard(deck));
