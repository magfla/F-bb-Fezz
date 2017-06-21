var ship;
var asteroids = []; 
var antallAsteroider = 5;
var laserBeams = [];
var maxStars=15;
var stars= []; // array for 'stars'
var bgMusic;
var deathSound;
var levelUpSound;
var pointFactor=0;
var score;
var basePoint=10;
var currentLevel;
var chanceForLife = 0.001; // PROBABILITY FOR GENERATING A HEALTH BOOST
var timeUntilLife=0;
var lifeArray=[];
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
	score=0;
	currentLevel=0;
	createStars(15);
	//bgMusic.loop(); // Spiller av bakgrunnsmusikken, deaktivert pga. XMLHTTPrequest feil

	// TO-DO
	// Nylevel : antallAsteroider === 0; så endre antallAsteroider +=1;
	// Farge ene delen av skipet så vi ser hvilken retning vi peker
	// Lyd 1) når vi skyter og 2) når vi treffer noe og 3) når de kolliderer med hverandre
	// NY LYD NÅR VI KRÆSJER OG MISTER ET LIV

}

function draw(){
	background(12);
	timeUntilLife+=chanceForLife;

	if(timeUntilLife>=1){
		lifeArray[0] = new Life();
		timeUntilLife=0; // reset the timer 
		console.log("Created a lifeArray at " + lifeArray[0].pos.x + " y: " + lifeArray[0].pos.y + " Arraylength : " + lifeArray.length);
	}
	if(lifeArray[0]){
		lifeArray[0].render();	
	}
	


	if(ship.isAlive){ // We only draw stuff if the ship still has lives left

		if(asteroids.length===0){ // HAR VI ØDELAGT ALLE? NY LEVEL!
			antallAsteroider++;
			createAsteroids(antallAsteroider);
			ship.levelup();	// Endrer bare posisjon til start
		}

		// STARS	
		for(var i = 0;i<stars.length;i++){
			stars[i].edges();
			stars[i].update();
			stars[i].render();
		}

		for(var i =0;i < asteroids.length;i++){
			if(ship.hits(asteroids[i])){
				ship.health--; // reduce lives by 1 
				ship.restart();
				createAsteroids(antallAsteroider); // Spawn new asteroids 
			}
			asteroids[i].render(); // Tegner alle asteroidene 
			asteroids[i].update();
			asteroids[i].edges();
		}
		// LASERBEAMS
		for(var i = laserBeams.length-1;i >=0;i--){ // VI GÅR BAKLENGS
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
						score+=basePoint*pointFactor;	
					}
					asteroids.splice(j,1);
					laserBeams.splice(i,1);
					break; // MÅ HA BREAK, ellers sjekker den ting som slettes kontinuerlig :)
				}
			}
		}

		ship.displayHealth();
		ship.render();
		ship.turn(); // Må alltid kjøres, selvom den skal stå stille
		ship.update();
		ship.edges();

		if(lifeArray[0]){
			ship.hitsHealth(lifeArray[0]);	
		}
		
	} // End of massive if statement

	if(!ship.isAlive){ // Display gameover text
		gameOver();
	}
	
	displayScore(); // Displays the current score
	displayLevel();
}

function displayLevel(){
	textSize(40);
	text("Level: " + currentLevel,width/2,50);
}
function displayScore(){
	textSize(40);
	text("Score " + score ,width/4,50);
}

function gameOver(){
		textSize(50);
		text("GAME OVER",width/2.5,height/2);
		textSize(25);
		text("Press 'R' to restart",width/2.25,height/1.5);
	}