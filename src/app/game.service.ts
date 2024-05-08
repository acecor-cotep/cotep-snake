import { Injectable } from '@angular/core';
import { SnakeService } from './snake.service';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  score: number = 0;// Score du joueur
  gameOver2: boolean = false;// Indique si le jeu est terminé
  myInterval: any; // Variable du déplacement du serpent en fonction du temps
  button_play : boolean = true;// État du bouton "Jouer"
  button_others: boolean = false;// État des autres boutons
  button_toggle: boolean = true;// État du bouton "Pause/Reprendre"
  myButton: string = 'Pause';// Texte affiché sur le bouton "Pause/Reprendre"
  music: HTMLAudioElement = new Audio('./assets/snake_theme.mp3');// Son de fond du jeu
  crunch: HTMLAudioElement = new Audio('./assets/crunch.mp3');// Son de collision avec la nourriture

  constructor(private snakeService: SnakeService, private foodService: FoodService) {}
  // Méthode pour initialiser le jeu
  initGame(): void {
    // Réinitialise le score et l'état du jeu
    this.score = 0;
    this.gameOver2 = false;
    // Initialise le serpent
    this.snakeService.initSnake();
    // Joue la musique de fond avec un volume réduit
    this.music.play();
    this.music.volume = 0.2;
    // Place la nourriture initiale
    this.foodService.placeFood();
  }

  checkCollisions(): void {
    // Obtient la position de la tête du serpent et de la nourriture
    const snakeHead = this.snakeService.snake[0]; 
    const foodPosition = this.foodService.food; 


    // Vérifie la collision avec la nourriture
    if (snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y) {
      // Collision avec la nourriture
      
      this.eatFood(); // Appel de la méthode pour augmenter le score
      this.foodService.placeFood(); // Replace la nourriture 
      this.snakeService.growSnake(); // Fait grandir le serpent
      this.crunch.play();// Joue le son de collision avec la nourriture

    }



    // Vérifie la collision avec le corps du serpent (excepté la tête)
    for (let i = 1; i < this.snakeService.snake.length; i++) {
      const segment = this.snakeService.snake[i];
      if (snakeHead.x === segment.x && snakeHead.y === segment.y) {
        // Collision avec le corps du serpent (perdu)
        this.gameOver();
      }
    }
  }

  // Méthode pour augmenter le score lorsque le serpent mange de la nourriture
  eatFood(): void {
    this.score++;
  }
  // Méthode pour arrêter la musique de fond et réinitialiser le jeu
  stopMusic(): void {
    // Réinitialise le jeu et arrête la musique
    this.snakeService.snake = [];
    this.foodService.food = null
    clearInterval(this.myInterval);
    this.button_toggle = true;
    this.button_play = true; 
    this.button_others = false;
    this.myButton = 'Pause';
    this.score = 0;
    this.music.pause();
    this.music.currentTime = 0;
  }
  

  // Méthode pour gérer la fin du jeu
  gameOver(): void {
    // Affiche un message de fin de jeu et propose de rejouer
    this.gameOver2 = true;
    this.music.pause();
    this.music.currentTime = 0;
  
    if (confirm("Game Over! Voulez-vous rejouer ?")) {
      this.initGame(); // Réinitialise le jeu si le joueur souhaite rejouer
    } else {
      // Réinitialise le plateau de jeu si le joueur choisit de ne pas rejouer
      this.button_toggle = true;
      this.button_play = true; 
      this.button_others = false;
      this.myButton = 'Pause';
      this.snakeService.snake = [];
      this.foodService.food = null;
      clearInterval(this.myInterval);
      this.score = 0;
    }
  }
}
