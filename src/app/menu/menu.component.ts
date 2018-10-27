import { DeckOfCardsService } from './../deck-of-cards-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  constructor(private deckOfCardsService: DeckOfCardsService) {}

  ngOnInit() {}

  shuffle() {
    this.deckOfCardsService.suffle();
  }

  selectACard() {
    this.deckOfCardsService.selectACard();
  }
}
