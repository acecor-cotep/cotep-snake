import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: number = 0;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {

  }
}