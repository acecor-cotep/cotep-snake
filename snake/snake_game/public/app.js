/*global Snake, Game*/
/*eslint no-undef: "error"*/

let game_state = null;

// reprend le jeu si il a ete mis en pause
function resumeGame() {
	if (game_state.pause == 1 && game_state.refresh_id != null) {
		game_state.pause = 0;
		game_state.refresh_id = setInterval(() => {
			if (game_state.game.update() == 0)
				game_state = restartGame();
		}, 75);
	}
	return (game_state);
}

// commence le deplacement du serpent
function startGame(game) {
	let refresh_id = null;
	game.init();
	game.pause = 0;
	refresh_id = setInterval(() => {
		if (game.update() == 0) {
			game_state = {
				game : game,
				refresh_id: refresh_id,
				pause: 0
			};
			game_state = restartGame();
		}
	}, 75);
	return (refresh_id);
}

// arete le deplacement du serpent et le nettoie ainsi que la boulette
function stopGame() {
	if (document.getElementById("snakegame") && game_state.game) {
		game_state = pauseGame();
		game_state.refresh_id = null;
		game_state.game.snake.clear(game_state.game.context, game_state.game.scale);
		game_state.game.clear_food();
	}
}

// met le jeu e pause
function pauseGame() {
	if (game_state.refresh_id != null && game_state.pause == 0) {
		game_state.pause = 1;
		clearInterval(game_state.refresh_id);
	}
	return game_state
}

// nettoie, recrer et recommence le jeu
function restartGame() {
	if (document.getElementById("snakegame") && game_state.game) {
		clearInterval(game_state.refresh_id);
		game_state.pause = 0;
		game_state.game.snake.destroy(game_state.game.context, game_state.game.scale);
		game_state.game.clear_food();
		game_state.game.snake = new Snake("green", 4, 4);
		game_state.refresh_id = startGame(game_state.game);
	}
	return game_state
}

// creation des objets
function createObject() {
	let snake = new Snake("green", 4, 4);
	let game = new Game(snake);
	return (game);
}

// chargement des elements html et initialisation des evenements
document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('load', function () {
		let game = createObject();
		let refresh_id = startGame(game);
		game_state = {
			game : game,
			refresh_id: refresh_id,
			pause: 0
		};

		document.addEventListener('keydown', (event) => {
			if (game_state.pause === 0 && game_state.game.snake.change_direction(event.keyCode) === 0) {
				game_state = restartGame();
			}
		});
		document.getElementById('btn-pause').addEventListener("click", () => {
			game_state = pauseGame();
		});

		document.getElementById('btn-resume').addEventListener("click", () => {
			game_state = resumeGame();
		});

		document.getElementById('btn-stop').addEventListener("click", () => {
			stopGame();
		});

		document.getElementById('btn-restart').addEventListener("click", () => {
			game_state = restartGame();
		});
	});
});
