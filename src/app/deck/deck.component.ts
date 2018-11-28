import { DeckOfCardsService, Deck } from './../deck-of-cards-service'
import { Component, OnInit } from '@angular/core'
import { CardsSymbols } from './cards-symbols'

const setColSize = innerWidth => (window.innerWidth <= 1000 ? 4 : 6)
@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.sass'],
})
export class DeckComponent implements OnInit {
    deck: Deck
    selectedCards: Deck
    cards = CardsSymbols
    breakpoint: number
    constructor(private deckOfCardsService: DeckOfCardsService) {}

    ngOnInit() {
        this.breakpoint = setColSize(window.innerWidth)
        this.deckOfCardsService.getGame().subscribe(g => {
            this.deck = g.deck
            this.selectedCards = g.selectedCards
        })
    }

    onResize(event) {
        this.breakpoint = setColSize(event.target.innerWidth)
    }
}
