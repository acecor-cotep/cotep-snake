// Import des éléments nécessaires depuis Angular Core
import { Component, OnInit } from '@angular/core';

// Import du service FoodService depuis son emplacement
import { FoodService } from '../food.service';

// Définition du composant FoodComponent
@Component({
  // Sélecteur pour utiliser le composant
  selector: 'app-food',
  
  // Chemin vers le template HTML du composant
  templateUrl: './food.component.html',
  
  // Chemin vers le fichier CSS du composant
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  // Déclaration d'une propriété publique foodService de type FoodService
  constructor(public foodService: FoodService) {}

  // Méthode ngOnInit() exécutée lors de l'initialisation du composant
  ngOnInit(): void {
    // Cette méthode peut être utilisée pour initialiser des données ou exécuter des actions lors du chargement du composant
    // Dans ce cas, elle est vide
  }
}
