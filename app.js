let map = new Array(25)
let snakeX = []
let snakeY = []
let direction = 'Right'
let score = 0
let bite = new Audio()
let death = new Audio()

bite.src = 'audio/bites.mp3'
death.src = 'audio/death.mp3'

// Initialize the map
for (let i = 0; i < map.length; i++) {
  map[i] = new Array(40)
}

// Generate a first random apple
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

let apple = [getRandomInt(map[0].length), getRandomInt(map.length)]

// Initialize the variable and update the TopScore
const initGame = () => {
  score = 0
  popApple()
  document.getElementById('fail').innerHTML = ''
  snakeX.push(10, 10, 10, 10)
  snakeY.push(13, 12, 11, 10)
  moveSnake()
}

// Generate a new Apple
const popApple = () => {
  apple[0] = getRandomInt(map.length)
  apple[1] = getRandomInt(map[0].length)
}

// Fill the map before printing the snake and the apple
const clearArray = () => {
  for (let i = 0; i < map.length; i++) {
    map[i] = map[i].fill('x')
  }
}

// Manage the direction of the snake when changing through the keyboard
const getDirection = (event) => {
  const key = event.keyCode
  if (key === 37 && direction !== 'Right') {
    // moveLeft()
    direction = 'Left'
  } else if (key === 38 && direction !== 'Up') {
    // moveDown()
    direction = 'Down'
  } else if (key === 39 && direction !== 'Left') {
    // moveRight()
    direction = 'Right'
  } else if (key === 40 && direction !== 'Down') {
    // moveUp()
    direction = 'Up'
  }
}

// The following functions update the snake array : remove the coordonates of the tail and add the coordonates of the head according to the direction.
const moveRight = () => {
  snakeX.pop()
  snakeY.pop()
  snakeY.unshift(snakeY[0] + 1)
  snakeX.unshift(snakeX[0])
}

const moveLeft = () => {
  snakeX.pop()
  snakeY.pop()
  snakeY.unshift(snakeY[0] - 1)
  snakeX.unshift(snakeX[0])
}

const moveUp = () => {
  snakeX.pop()
  snakeY.pop()
  snakeY.unshift(snakeY[0])
  snakeX.unshift(snakeX[0] + 1)
}

const moveDown = () => {
  snakeX.pop()
  snakeY.pop()
  snakeY.unshift(snakeY[0])
  snakeX.unshift(snakeX[0] - 1)
}

// Calls the move functions according to the last direction sent to the snake.
// Then, it calls the function that prints the snake
const moveSnake = () => {
  if (direction === 'Right') {
    moveRight()
  } else if (direction === 'Left') {
    moveLeft()
  } else if (direction === 'Up') {
    moveUp()
  } else if (direction === 'Down') {
    moveDown()
  }
  displaySnake()
}

// Check if there is any collision with the snake itself
const checkCollisionSnake = () => {
  const headX = snakeX[0]
  const headY = snakeY[0]
  for (let i = 1; i < snakeX.length; i++) {
    if (headX === snakeX[i] && headY === snakeY[i]) {
      return true
    }
  }
  return false
}

// Checks a match in the coordonates to see if there is a collision with the apple
const eatApple = () => {
  if (snakeX[0] === apple[0] && snakeY[0] === apple[1]) {
    bite.play()
    return true
  }
  return false
}

// Update the score and add coordonates to the snake array to make it grow
const growSnake = () => {
  score++
  snakeY.unshift(snakeY[0])
  snakeX.unshift(snakeX[0])
}

// if there is no collision between the walls or the snake itself, it prints the snake on the map
// If there is a collision with the apple : the snake get bigger 
const checkCollision = () => {
  for (let i = 0; i < snakeX.length; i++) {
    if (snakeX[i] >= map.length || snakeX[i] < 0) {
      return true
    } else if (snakeY[i] >= map[i].length || snakeY[i] < 0) {
      return true
    } else if (i === 0 && checkCollisionSnake()) {
      return true
    } else if (i === 0 && eatApple()) {
      growSnake()
      popApple()
    }
    map[snakeX[i]][snakeY[i]] = '0'
  }
  return false
}

// Display the apple on the map
const putApple = () => {
  map[apple[0]][apple[1]] = '0'
}

// Charge the map : if there is a collision, refresh the page and reboot the game.
// If there is no collision, the data of the map and the score are updated to be displayed on the HTML page.
const displaySnake = () => {
  let result = ''
  clearArray()
  putApple()
  if (checkCollision()) {
    death.play()
    document.getElementById('fail').innerHTML = 'Failure!'
    setTimeout(() => {
      location = location
    }, 1500)
  }
  for (let i = 0; i < map.length; i++) {
    result += map[i].join('') + '<br >'
  }
  document.getElementById('map').innerHTML = result
  document.getElementById('score').innerHTML = score
}

// launch the game and repeat the call to move the snake every 500 miliseconds.
initGame()
document.addEventListener('keydown', getDirection)
// console.log(snakeX[0], snakeY[0])
const game = setInterval(moveSnake, 500)
