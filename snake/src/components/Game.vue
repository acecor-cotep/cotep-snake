<template>
    <div class="game-grid">
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
            snake: []
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
        click() {
            this.moveSnake();
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
        },

        moveSnake() {
            const head = this.snake[0] ;
            const newHead = {row: head.row, col: head.col + 1};

            this.snake.unshift(newHead);
            this.snake.pop();
            this.updadeGrid();
        },

        updadeGrid() {
            for(let row = 0; row < this.gridSize; row++){
                for(let col = 0; col < this.gridSize; col++){
                    this.grid[row][col] = ''
                }
            }

            console.log(this.snake);
            this.grid[this.snake[0].row][this.snake[0].col] = 'snake'
        },

        placeRandomFood() {
            const firstFoodRow = Math.floor(Math.random() * this.gridSize);
            const firstFoodCol = Math.floor(Math.random() * this.gridSize);

            if(this.grid[firstFoodRow][firstFoodCol] === 0) {
                this.grid[firstFoodRow][firstFoodCol] = 'food';
            }
            else {
                this.placeRandomFood
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
  