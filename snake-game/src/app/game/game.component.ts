import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  // tableau qui stocke les points du serpent
  snake: any[];

  // Nourriture
  foods: any[];

  score: number;
  gameOver: boolean;
  isPaused: boolean;

  // Direction initiale du serpent
  direction: string = 'right'; 

  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D

  constructor() {
    this.snake = [];
    this.foods = [];
    this.score = 0;
    this.gameOver = false;
    this.isPaused = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // Accéder au contexte 2D du canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // Initialiser le serpent
    this.snake.push({ x: 0, y: 0 });
    this.snake.push({ x: 10, y: 0 });

    // Génerer la nourriture initiale
    this.generateFood();

    // Boucle de jeu
    setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.moveSnake();
        this.checkCollisions();
        this.drawGame();
      }
    }, 100);
  }

  /*ngOnInit(): void {

  // Vérifier si this.canvas.nativeElement est défini avant d'accéder à getContext('2d')
  if (this.canvas?.nativeElement) {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // Initialiser le serpent
    this.snake.push({ x: 0, y: 0 });
    this.snake.push({ x: 10, y: 0 });

    // Générer la nourriture initiale
    this.generateFood();

    // Début du jeu
    setInterval(() => {
      if (!this.isPaused && !this.gameOver) {
        this.moveSnake();
        this.checkCollisions();
      }
    }, 100);
  } else {
    console.error('Le canvas HTML n\'a pas été trouvé.');
  }
}*/


  
  drawSnake() {

    // Dessiner le serpent
    this.ctx.fillStyle = 'green';
    this.snake.forEach(segment => {
      this.ctx.fillRect(segment.x, segment.y, 10, 10);
    });

  }

  drawFood() {

    // Dessin de la nourriture
    this.ctx.fillStyle = 'red';
    this.foods.forEach(food => {
      this.ctx.fillRect(food.x, food.y, 10, 10);
    });

  }

  drawGame() {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.drawSnake();
    this.drawFood();

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    // Changer de direction en fonction de la touche préssée
    if (event.key === 'ArrowUp' && this.direction !== 'down') {
      this.direction = 'up';
    } else if (event.key === 'ArrowDown' && this.direction !== 'up') {
      this.direction = 'down';
    } else if (event.key === 'ArrowLeft' && this.direction !== 'right') {
      this.direction = 'left';
    } else if (event.key === 'ArrowRight' && this.direction !== 'left') {
      this.direction = 'right';
    }

  }

  moveSnake() {

    // Position de la tête du serpent
    let snakeX = this.snake[0].x;
    let snakeY = this.snake[0].y;

    // Déplacements du serpent
    switch (this.direction) {
      case 'up':
        snakeY -= 10;
        break;
      case 'down':
        snakeY += 10;
        break;
      case 'left':
        snakeX -= 10;
        break;
      case 'right':
        snakeX +=10;
        break;
    }

    // Novelle tête du serpent
    this.snake.unshift({ x: snakeX, y: snakeY});

    // Verifier si le serpent mange food
    this.eatFood();

  }


  generateFood() {

    // Generer la nourriture à une position aléatoire
    const foodX = Math.floor(Math.random() * 40) * 10;
    const foodY = Math.floor(Math.random() * 40) * 10;
    this.foods.push({ x: foodX, y: foodY});

  }

  eatFood() {
    
    // Vérifier si le serpent mange
    this.foods.forEach((food, index) => {
      if (this.snake[0].x === food.x && this.snake[0].y === food.y) {
        // Supprimer 1 food du tableau foods
        this.foods.splice(index, 1); 

        // Augmenter le score de 10
        this.score += 10; 

        // Augmenter la taille du serpent en y ajoutant un segment
        this.snake.push({ x: this.snake[this.snake.length - 1].x, y: this.snake[this.snake.length -1].y});

        // Générer de la nourriture à nouveau
        this.generateFood();
      }
    });

  }

  checkCollisions() {
    
    // Vérifier si le serpent se heurte au mur ou se mord

    // Si le serpent se heurte au mur, gameOver passe de faux à vrai
    if (this.snake[0].x < 0 || this.snake[0].x >= 400 || this.snake[0].y < 0 || this.snake[0].y >= 400) {
      this.gameOver = true;
    }

    // Si le sepent se mord, gameOver passe de faux à vrai
    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[0].x === this.snake[i].x && this.snake[0].y === this.snake[i].y) {
        this.gameOver = true;
        break;
      }
    }

    // Afficher un message de fin de jeu
    if (this.gameOver) {
      alert('Game Over! Votre score: ' + this.score);
      this.isPaused = true;
    }

  }

  togglePause() {
    // Mettre le jeu en pause s'il est en cours ou le remettre en cours s'il est sur pause
    this.isPaused = !this.isPaused;
  }

  restart() {
    // Recommencer le jeu
    this.snake = [];
    this.snake.push({ x: 0, y: 0 });
    this.snake.push({ x: 10, y: 0 });
    this.foods = [];
    this.score = 0;
    this.gameOver = false;
    this.direction = 'right';
    this.generateFood();
    
  }
}
