var ship;
var asteroids = []; 
var antallAsteroider = 5;
var laserBeams = [];
var bgMusic;
var deathSound;
var levelUpSound;
/*
function preload(){ // INGEN AV DISSE BLIR BRUKT NÅ DA...
	bgMusic = loadSound('music/castlevania_theme.mp3');
	deathSound = loadSound('music/death.mp3');
	levelUpSound = loadSound('music/levelup.mp3');
}*/

function setup(){
	// Do setup here
	createCanvas(windowWidth,windowHeight); // Tegner canvas
	frameRate(100); // FPS
	ship = new Ship(); // Lager player 1
	//bgMusic.loop(); // Spiller av bakgrunnsmusikken, deaktivert pga. XMLHTTPrequest feil

	// TO-DO
	// Nylevel : antallAsteroider === 0; så endre antallAsteroider +=1;
	// Farge ene delen av skipet så vi ser hvilken retning vi peker
	// Lyd 1) når vi skyter og 2) når vi treffer noe og 3) når de kolliderer med hverandre
	// LIV SYSTEM - 3 - 5 
	// NY LYD NÅR VI KRÆSJER OG MISTER ET LIV

}

function draw(){
	background(12);

	if(asteroids.length===0){ // HAR VI ØDELAGT ALLE? NY LEVEL!
		antallAsteroider++;
		createAsteroids(antallAsteroider);
		ship.levelup();	// Endrer bare posisjon til start
	}	

	for(var i =0;i < asteroids.length;i++){
		if(ship.hits(asteroids[i])){
			console.log("DU DØDE!!!");
			ship.restart();
		}
		asteroids[i].render(); // Tegner alle
		asteroids[i].update();
		asteroids[i].edges();
	}

	for(var i =laserBeams.length-1;i >=0;i--){ // VI GÅR BAKLENGS
		laserBeams[i].render(); // Tegner alle
		laserBeams[i].update();
		
		if(laserBeams[i].offscreen()){
			laserBeams.splice(i,1);
			break;
		}

		for(var j=asteroids.length-1;j>=0;j--){ // VI GÅR BAKLENGS
			if(laserBeams[i].hits(asteroids[j])){ // Kjør OM VI TREFFER EN ASTEROIDE, hits() = true/false
				if(asteroids[j].r > 10){
					var newAsteroids = asteroids[j].breakUp();
					asteroids = asteroids.concat(newAsteroids); // Å PUSHE LEGGER INN ET TODIMENSJONALT ARRAY	
				}
				asteroids.splice(j,1);
				laserBeams.splice(i,1);
				break; // MÅ HA BREAK, ellers sjekker den ting som slettes kontinuerlig :)
			}
		}
				

	}

	ship.render();
	ship.turn(); // Må alltid kjøres, selvom den skal stå stille
	ship.update();
	ship.edges();
	
}