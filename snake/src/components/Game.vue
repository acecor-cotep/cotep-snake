<template>
    <div class="game-grid" @keydown="handleKeyDown" tabindex="0">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ snake: cell === 'snake', food: cell === 'food' }"
        ></div>
      </div>
    </div>

    <button @click="click">CLIQUE</button>
  </template>
  
<script>
  export default {
    name: 'CotepSnake',
    data() {
        return {
            gridSize: 9,
            grid : [],
            snake: [],
            food: [],
        };
    },
    computed: {
        mid() {
            return Math.floor(this.gridSize / 2)
        }
    },
    created(){
        this.initGame();
    },
    methods: {
        
        handleKeyDown(event){
            this.moveSnake(event)
        },

        initGame() {
            for(let row = 0; row < this.gridSize; row++) {
                let rowArray = [];
                for(let col = 0; col < this.gridSize; col++) {
                    rowArray.push(0);
                }
                this.grid.push(rowArray)
            }

            this.snake.push({row: this.mid, col: this.mid})

            this.updadeGrid();
            this.placeRandomFood();
        },

        moveSnake(event) {
            const head = this.snake[0];
            let newHead = {}
            
            switch (event.key) {
                case 'ArrowUp':
                    newHead = {row: head.row-1, col: head.col};
                    break;
                case 'ArrowDown':
                    newHead = {row: head.row+1, col: head.col};
                    break;
                case 'ArrowLeft':
                    newHead = {row: head.row, col: head.col-1};
                    break;
                case 'ArrowRight':
                    newHead = {row: head.row, col: head.col+1};
                    break;
                default: 
                    return;
            }

            this.snake.unshift(newHead);

            if(this.snake[0].row === this.food[0].row && this.snake[0].col === this.food[0].col) {
        
                this.food.pop();
                this.placeRandomFood();
            }
            else {
                this.snake.pop();
            }
           
           
            this.updadeGrid();
        },

        updadeGrid() {
            for(let row = 0; row < this.gridSize; row++){
                for(let col = 0; col < this.gridSize; col++){
                    if(this.grid[row][col] !== 'food') {
                        this.grid[row][col] = ''
                    }
                }
            }

            this.grid[this.snake[0].row][this.snake[0].col] = 'snake'

            this.snake.forEach( element => {
                this.grid[element.row][element.col] = 'snake';
            })
            
            
            
        },

        placeRandomFood() {
            const foodRow = Math.floor(Math.random() * this.gridSize);
            const foodCol = Math.floor(Math.random() * this.gridSize);

            this.food.push({row: foodRow, col: foodCol})

            if(this.grid[foodRow][foodCol] === '') {
                this.grid[foodRow][foodCol] = 'food';
                
            }
            else {
                this.placeRandomFood();
            }
        }
    }
  }
</script>
  
<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: 1fr; /* Définissez le nombre de colonnes et la largeur des cellules */
  background-color: #222; /* Couleur de fond de la grille */
  border: 2px solid #333; /* Bordure de la grille */
}

.row {
  display: flex;
  justify-content: center;
}

.cell {
  width: 60px; /* Largeur de chaque cellule */
  height: 60px; /* Hauteur de chaque cellule */
  background-color: #444; /* Couleur de fond des cellules vides */
  border: 1px solid green;
}

.snake {
  background-color: #00ff0d; /* Couleur de fond des cellules du serpent */
}

.food {
  background-color: #ff0000; /* Couleur de fond des cellules de nourriture */
}
</style>
  