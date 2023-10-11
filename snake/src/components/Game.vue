<template>
    <div class="game-grid" @keydown="handleKeyDown" tabindex="0">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ snake: cell === 'snake', food: cell === 'food', head: cell === 'head'}"
        ></div>
      </div>
    </div>
  
    <p class="score">Score actuel : {{ score }}</p>
    <p class="score">Meilleur score : {{ topScore[0] }}</p>

    <div>
    <h2>Top 10 des meilleurs scores :</h2>
    <ol>
      <li v-for="(score, index) in this.topScore" :key="index">
        {{ score }}
      </li>
    </ol>
  </div>
  

  </template>
  
  <script>
  export default {
    name: 'CotepSnake',
    data() {
      return {
        gridSize: 11,
        grid: [],
        snake: [],
        food: [],
        direction: '',
        vitesseSnake: null,
        augmentSpeed: 500,
        collisionDetected: false,
        topScore : [12,11,10,9,8,7,6,5,4,3,2]
      };
    },

    computed: {
      mid() {
        return Math.floor(this.gridSize / 2);
      },

      score() {
        return this.snake.length;
      },
    },

    created() {
      this.initGame();
    },

    methods: {
      handleKeyDown(event) {
        if (!this.collisionDetected) {
          switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
              this.direction = event.key;
              break;
            default:
              return;
          }
        }
      },

      initGame() {
        this.grid = [];
        this.snake = [];
        this.food = [];
        this.direction = '';
        this.augmentSpeed = 500;
        this.collisionDetected = false;
  
        for (let row = 0; row < this.gridSize; row++) {
          let rowArray = [];
          for (let col = 0; col < this.gridSize; col++) {
            rowArray.push(0);
          }
          this.grid.push(rowArray);
        }
  
        this.snake.push({ row: this.mid, col: this.mid });
  
        this.updateGrid();
        this.placeRandomFood();
        this.addScoreToArray();
  
        this.autoMoveSnake();
      },

      moveSnake() {
        if (this.collisionDetected) return;
  
        const head = this.snake[0];
        let newHead = {};
  
        switch (this.direction) {
          case 'ArrowUp':
            newHead = { row: head.row - 1, col: head.col };
            break;
          case 'ArrowDown':
            newHead = { row: head.row + 1, col: head.col };
            break;
          case 'ArrowLeft':
            newHead = { row: head.row, col: head.col - 1 };
            break;
          case 'ArrowRight':
            newHead = { row: head.row, col: head.col + 1 };
            break;
          default:
            return;
        }
  
        if (
          newHead.row < 0 ||
          newHead.row >= this.gridSize ||
          newHead.col < 0 ||
          newHead.col >= this.gridSize
        ) {
          this.collisionDetected = true;
          alert('COLISION');
          this.stopAutoMove();
          this.addScoreToArray();
          this.resetGame();
          return;
        }
  
        if (this.grid[newHead.row][newHead.col] === 'snake') {
          this.collisionDetected = true;
          alert("Le serpent s'est mordu la queue ! ");
          this.stopAutoMove();
          this.addScoreToArray();
          this.resetGame();
          return;
        }
  
        if (!this.collisionDetected) {
          this.snake.unshift(newHead);
  
          if (
            this.snake[0].row === this.food[0].row &&
            this.snake[0].col === this.food[0].col
          ) {
            this.food.pop();
            this.placeRandomFood();
  
            this.augmentSpeed *= 0.95;
            this.stopAutoMove();
            this.autoMoveSnake();
          } else {
            this.snake.pop();
          }
  
          this.updateGrid();
        }
      },

      stopAutoMove() {
        clearInterval(this.vitesseSnake);
        this.vitesseSnake = null;
      },

      autoMoveSnake() {
        if (!this.vitesseSnake) {
          this.vitesseSnake = setInterval(() => {
            this.moveSnake();
          }, this.augmentSpeed);
        }
      },

      updateGrid() {
        for (let row = 0; row < this.gridSize; row++) {
          for (let col = 0; col < this.gridSize; col++) {
            if (this.grid[row][col] !== 'food') {
              this.grid[row][col] = '';
            }
          }
        }
  
        this.snake.forEach((element,index) => {
            if(index === 0) {
                this.grid[element.row][element.col] = 'head';
            }
            else {
                this.grid[element.row][element.col] = 'snake';
            }
            
        });
      },

      addScoreToArray() {
        this.topScore.push(this.score);
        this.topScore.sort((a,b) => b-a);
        this.topScore = this.topScore.slice(0,10);
      },

      placeRandomFood() {
        let foodRow, foodCol;
        do {
          foodRow = Math.floor(Math.random() * this.gridSize);
          foodCol = Math.floor(Math.random() * this.gridSize);
        } while (this.grid[foodRow][foodCol] === 'snake');
  
        this.food.push({ row: foodRow, col: foodCol });
        this.grid[foodRow][foodCol] = 'food';
      },

      isSnakeHead(row,col) {
        return row === this.snake[0].row && col === this.snake[0].col;
      },

      resetGame() {
        this.initGame();
      },
    },
  };
  </script>
  
  <style scoped>
  .game-grid {
    display: grid;
    grid-template-columns: 1fr;
    background-color: #222;
    border: 2px solid #333;
  }
  
  .row {
    display: flex;
    justify-content: center;
  }
  
  .cell {
    width: 60px;
    height: 60px;
    background-color: #444;
  }
  
  .snake {
    background-color: #00ff0d;
  }

  .head {
    background-color: #006905;
  }
  
  .food {
    background-color: #ff0000;
  }
  
  .score {
    font-size: 24px;
    color: #000;
    text-align: center;
    margin: 10px 0;
  }

  #top-scores {
  width: 300px;
  margin: 0 auto;
  }

  ol {
    list-style: decimal inside;
    padding: 0;
  }

  ol li {
    font-size: 18px;
    margin-bottom: 10px;
  }
  </style>
  