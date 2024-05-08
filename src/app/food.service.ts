import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  food: any; // Définir le modèle de votre nourriture
  boardWidth: number = 20; // Largeur du plateau de jeu
  boardHeight: number = 20; // Hauteur du plateau de jeu

  constructor() {}

  placeFood(): void {
    // Génère une position aléatoire pour la nourriture
    const foodX = Math.floor(Math.random() * this.boardWidth);
    const foodY = Math.floor(Math.random() * this.boardHeight);

    // Assigne la position générée à l'objet représentant la nourriture
    this.food = { x: foodX, y: foodY };
  }

}
