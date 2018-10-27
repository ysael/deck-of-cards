import { DeckOfCardsService, Deck } from './../deck-of-cards-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.sass']
})
export class DeckComponent implements OnInit {
  deck: Deck;
  constructor(private deckOfCardsService: DeckOfCardsService) {}

  ngOnInit() {
    this.deck = this.deckOfCardsService.deck;
  }
}
