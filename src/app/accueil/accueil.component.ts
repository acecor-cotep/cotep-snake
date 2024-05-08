import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(public gameService: GameService){};
}
