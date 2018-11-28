import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import produce from 'immer'
interface Card {
    value: string
    suit: string
}

export type Deck = Card[]
export type Game = {
    deck: Deck
    selectedCards: Deck
}

type Suits = string[]
type Values = string[]

const numbers = [
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
]
const initialSuits: Suits = ['clubs', 'diamonds', 'hearts', 'spades']
const InitialValues = ['ace', ...numbers, 'jack', 'queen', 'king']

const makeACard = (value: string, suit: string): Card => ({ value, suit })
const makeASuit = (values: Values, suit: string) =>
    values.map(value => makeACard(value, suit))
const deckReducer = (values: Values) => (d, suit) => [
    ...d,
    ...makeASuit(values, suit),
]
const createDeck = (suits: Suits, values: Values): Deck =>
    suits.reduce(deckReducer(values), [])

const shuffleDeck = d =>
    d
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1])

const randomCardIndex = d => Math.floor(Math.random() * d.length)
@Injectable({
    providedIn: 'root',
})
export class DeckOfCardsService {
    game: Game

    private gameSource = new BehaviorSubject<Game>({
        deck: createDeck(initialSuits, InitialValues),
        selectedCards: [],
    })
    gameObservable = this.gameSource.asObservable()
    selectedCardIndex: number

    constructor() {
        this.selectedCardIndex = null
        this.gameObservable.subscribe(g => (this.game = g))
    }

    getGame() {
        return this.gameObservable
    }

    suffle() {
        this.gameSource.next({
            deck: shuffleDeck(this.game.deck),
            selectedCards: this.game.selectedCards,
        })
    }

    selectACard() {
        this.gameSource.next(
            produce(this.game, draftGame => {
                const selectedCard = draftGame.deck.splice(
                    randomCardIndex(this.game.deck),
                    1
                )[0]
                draftGame.selectedCards.push(selectedCard)
            })
        )
    }
}
