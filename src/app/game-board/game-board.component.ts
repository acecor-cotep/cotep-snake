// game-board.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from '../game.service';
import { SnakeService } from '../snake.service';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  // Déclaration de tableaux pour les lignes et les colonnes du plateau de jeu
  rows: number[] = [];
  cols: number[] = [];
  
  constructor(public gameService: GameService, private snakeService: SnakeService, private foodService: FoodService) {}

  ngOnInit(): void {
    // Initialisation du tableau de lignes avec la hauteur du plateau de jeu
    this.rows = Array(this.snakeService.boardHeight).fill(0).map((x, i) => i);
    // Initialisation du tableau de colonnes avec la largeur du plateau de jeu
    this.cols = Array(this.snakeService.boardWidth).fill(0).map((x, i) => i); 
  }
  // Méthode pour vérifier si une position est occupée par le serpent
  isSnake(x: number, y: number): boolean {
    return this.snakeService.snake.some(segment => segment.x === x && segment.y === y);
  }
  // Méthode pour vérifier si une position est occupée par la nourriture
  isFood(x: number, y: number): boolean {
    return this.foodService.food && this.foodService.food.x === x && this.foodService.food.y === y;
  }
}
