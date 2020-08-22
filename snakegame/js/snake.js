// Définition de la zone jeu
var canvas = document.getElementById('gameblock');
var ctx = canvas.getContext('2d');

// DÉCLARATION DES DIFFÉRENTES VARIABLES :

// Initialisation du serpent et de son emplacement
var width = 20;
var height = 20;
var x = Math.round(Math.random() * canvas.width / width) * width - width;
var y = Math.round(Math.random() * canvas.height / height) * height - height;
// Initialisation des variables de mouvement
var moveX = 0;
var moveY = 0;
// Initialisation du score
var score = 0;
var scoreM = 0;
// Initialisation du bonbon et de son emplacement
var bonbonX = Math.round(Math.random() * canvas.width / width) * width - width;
var bonbonY = Math.round(Math.random() * canvas.height / height) * height - height;
// Variable pour la touche appuyée (Pour qu'il n'y est pas de demi-tour)
var touche;
// Initialisation de la queue du serpent
var tail = [];
var tailLength = 5;
// Initialisation du timer
var intervalID;
// Variable pour afficher et changer le score
var afficheScore = document.getElementById("score");

// Mise en route du timer qui effectue la fonction snake toutes les 100ms
window.onload = function() {
    intervalID = setInterval(snake,100); 
    document.addEventListener("keydown",keyboard);
}

// Fonction principal qui gère les actions du serpent
function snake() {
    // efface la zone du canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    // Affichage du score
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Meilleur score: ' + scoreM, 5, 20);
    // Déplacements du serpent
    x += moveX * width;
    y += moveY * height;
    // Ajout de la queue du serpent 
    tail.push({x:x,y:y});
    // Évite une queue infinie
    while(tail.length > tailLength){
        tail.shift();
    }
    ctx.fillStyle = "green";
    // Dessine le serpent et réduit la taille des carrés pour obtenir des carrés avec des espaces
    for(var i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x,tail[i].y, width - 2, height - 2);
    }
    
    // Gestion de la collision avec le mur 
    if (x < 0 || x > canvas.width - width || y < 0 || y > canvas.height - height){
        // Gestion du son
        document.getElementById('dead').play();
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // efface la zone du canvas
        // Nouvelle position du serpent
        x = Math.round(Math.random() * canvas.width / width) * width - width;
        y = Math.round(Math.random() * canvas.height / height) * height - height;
        moveX = 0;
        moveY = 0;
        // Nouvelle position du bonbon
        bonbonX = Math.round(Math.random() * canvas.width / width) * width - width;
        bonbonY = Math.round(Math.random() * canvas.height / height) * height - height;
        // Valeurs initiales remises en place
        afficheScore.textContent = score;
        tailLength = 5;
        touche = 0;

        //  Gestion du meilleur score
        if (score > scoreM) {
            scoreM = score;
            score = 0; 
            afficheScore.textContent = score;
        } else if (score < scoreM) {
            score = 0;
            afficheScore.textContent = score;
        }
        
    }

    // Gestion du conflit avec le bonbon (Augmente le score et la taille et fait appraître un nouveau bonbon)
    if (x == bonbonX && y == bonbonY) {
        // Gestion du son
        document.getElementById('bonbon').play();
        newBonbon();
        score++;
        afficheScore.textContent = score;
        tailLength++;
    }

    // Effet rajouté : Couleur du score et du fond du canvas variant en fonction du nombre de points
    if (score >= 10 && score < 50) {
        afficheScore.style.color = "yellow";
        canvas.style.backgroundColor = "yellow";
    } else if (score >= 50 && score < 100) {
        afficheScore.style.color = "orange";
        canvas.style.backgroundColor = "orange";
    } else if (score >= 100) {
        afficheScore.style.color = "orangered";
        canvas.style.backgroundColor = "orangered";
    } else {
        afficheScore.style.color = "white";
        canvas.style.backgroundColor = "black";
    }

    // Dessine un bonbon rond
    ctx.beginPath();
    ctx.fillStyle="red"
    ctx.arc(bonbonX + 10, bonbonY + 10, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    
};

// Fonction qui fait apparaître un nouveau bonbon aléatoirement sur la carte
function newBonbon(){
    bonbonX = Math.round(Math.random() * canvas.width / width) * width - width;
    bonbonY = Math.round(Math.random() * canvas.height / height) * height - height;
}

//Fonction qui gère le déplacement du serpent grâce aux touches fléchées 
function keyboard(key){
    switch(key.keyCode) {
    // gauche
    case 37:
    if (touche == 39) {
        break;
    }
    moveX =- 1;
    moveY = 0;
    touche = key.keyCode;
    break;
    // haut
    case 38:
    if (touche == 40) {
        break;
    }
    moveX = 0;
    moveY = -1;
    touche = key.keyCode;
    break;
    // droite
    case 39:
    if (touche == 37) {
        break;
    }
    moveX = 1;
    moveY = 0;
    touche = key.keyCode;
    break;
    // bas
    case 40:
    if (touche == 38) {
        break;
    }
    moveX = 0;
    moveY = 1;
    touche = key.keyCode;
    break;
    // espace pour mettre en pause
    case 32:
    moveX = 0;
    moveY = 0;
    break;
    }
}