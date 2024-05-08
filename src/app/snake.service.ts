import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  snake: any[] = []; // Tableau représentant le serpent
  boardWidth: number = 20; // Largeur du plateau de jeu
  boardHeight: number = 20; // Hauteur du plateau de jeu
  initialLength: number = 3; // Longueur initiale du serpent
  direction: string = 'right'; // Direction initiale du serpent ('right', 'left', 'up', 'down')
  constructor() {}

  // Méthode pour initialiser le serpent
  initSnake(): void{
    this.snake = []; // Réinitialisation du serpent
    const initialX = 5; // Position X initiale
    const initialY = 5; // Position Y initiale
    this.initialLength = 3; // Longueur initiale du serpent
    this.direction = 'right';// Direction initiale du serpent
    // Création du serpent avec la longueur initiale et positionnement de chaque segment
    for (let i = 0; i < this.initialLength; i++) {
      this.snake.push({ x: initialX - i, y: initialY }); // Ajoute chaque segment à la queue du serpent
    }    
  }  

  // Méthode pour déplacer le serpent
  moveSnake(): void {
    // Récupère la tête du serpent
    const head = this.snake[0];

    // Calcule les nouvelles coordonnées de la tête en fonction de la direction actuelle
    let newHeadX = head.x;
    let newHeadY = head.y;

    // Mise à jour des coordonnées en fonction de la direction
    switch (this.direction) {
      case 'up':
        newHeadY--;
        break;
      case 'down':
        newHeadY++;
        break;
      case 'left':
        newHeadX--;
        break;
      case 'right':
        newHeadX++;
        break;
    }

    // Gestion des bords du plateau de jeu (rebouclage)
    if (newHeadX < 0) {
      newHeadX = this.boardWidth - 1;
    } else if (newHeadX >= this.boardWidth) {
      newHeadX = 0;
    } else if (newHeadY < 0) {
      newHeadY = this.boardHeight - 1;
    } else if (newHeadY >= this.boardHeight) {
      newHeadY = 0;
    }

    // Ajoute la nouvelle tête à la première position du serpent
    this.snake.unshift({ x: newHeadX, y: newHeadY });

    // Supprime la queue du serpent pour simuler le mouvement
    this.snake.pop();
  }
  // Méthode pour définir les directions autorisées du serpent
  setDirection(newDirection: string) {
    const allowedDirections: {[key: string]: string[] } = {
      'up': ['left', 'right'],
      'down': ['left', 'right'],
      'left': ['up', 'down'],
      'right': ['up', 'down']
    };
  
    // Empêche le serpent de faire demi-tour
    if (allowedDirections[this.direction].includes(newDirection)) {
      this.direction = newDirection;
    }
  }
  

  // Méthode pour faire grandir le serpent
  growSnake(): void {
    // Obtient la position du dernier segment du serpent
    const lastSegment = this.snake[this.snake.length - 1];  
    // Calcule la position du nouveau segment en fonction de la direction actuelle
    let newX = lastSegment.x;
    let newY = lastSegment.y;
    switch (this.direction) {
      case 'up':
        newY++;
        break;
      case 'down':
        newY--;
        break;
      case 'left':
        newX++;
        break;
      case 'right':
        newX--;
        break;
    }    
    // Vérifie si le nouveau segment sort du plateau de jeu et ajuste si nécessaire
    if (newX < 0) {
      newX = this.boardWidth - 1;
    } else if (newX >= this.boardWidth) {
      newX = 0;
    } else if (newY < 0) {
      newY = this.boardHeight - 1;
    } else if (newY >= this.boardHeight) {
      newY = 0;
    }   
    // Ajoute le nouveau segment au serpent
    this.snake.push({ x: newX, y: newY });
  }
}
