import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from '../game.service';
import { SnakeService } from '../snake.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {


  constructor(public gameService: GameService, public snakeService: SnakeService, public foodService: FoodService) {}


  ngOnInit(): void {
    
  }  


  // Méthode pour lancer le jeu
  RunSnake(): void {
    // Initialisation du jeu
    this.gameService.initGame();
    // Changement des états des boutons pour indiquer que le jeu est en cours
    this.gameService.button_others = true;
    this.gameService.button_play = false; 
    // Lancement de l'intervalle pour déplacer le serpent et vérifier les collisions à chaque 100 millisecondes
    this.gameService.myInterval = setInterval(() => {     
      this.snakeService.moveSnake();
      this.gameService.checkCollisions();
    }, 100);
  }
  // Méthode pour mettre en pause ou reprendre le jeu
  PauseandResumeSnake(): void{
    if(this.gameService.button_toggle == true){
      // Pause du jeu
      clearInterval(this.gameService.myInterval);
      this.gameService.button_toggle = false;
      this.gameService.myButton = 'Resume';
      this.gameService.music.pause();
      
    }
    else{
      // Reprise du jeu
      this.gameService.myInterval = setInterval(() => {     
        this.snakeService.moveSnake();
        this.gameService.checkCollisions();
      }, 100);
      this.gameService.button_toggle = true;
      this.gameService.myButton = 'Pause';
      this.gameService.music.play();
    }
    
  }
  // Méthode pour arrêter le jeu
  StopSnake(): void{
    // Réinitialisation des éléments du jeu
    this.snakeService.snake = [];
    this.foodService.food = null
    clearInterval(this.gameService.myInterval);
    this.gameService.button_toggle = true;
    this.gameService.button_play = true; 
    this.gameService.button_others = false;
    this.gameService.myButton = 'Pause';
    this.gameService.score = 0;
    this.gameService.music.pause();
    this.gameService.music.currentTime = 0;
  }
  // Méthode pour redémarrer le jeu
  RestartSnake(): void{
    this.snakeService.initSnake();
    this.foodService.placeFood();
    this.gameService.myButton = 'Pause';
    this.gameService.score = 0;
  }
  // Écouteur d'événements clavier pour contrôler le serpent
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    switch(event.key) {
      case 'ArrowUp':
        this.snakeService.setDirection('up');
        break;
      case 'ArrowDown':
        this.snakeService.setDirection('down');
        break;
      case 'ArrowLeft':
        this.snakeService.setDirection('left');
        break;
      case 'ArrowRight':
        this.snakeService.setDirection('right');
        break;
    }
  }


}
