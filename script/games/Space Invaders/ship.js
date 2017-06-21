function Ship(x,y) {
	this.health = 10;
	this.pos = createVector(width/2,height/2);
	this.r = 20;
	this.heading = 0; // Retningen vi peker mot, i radians. PI/2 
	this.vel = createVector(0,0); // our velocity
	this.acc = createVector(0,0); // Our speed, or rate of change
	this.rotation = 0;
	this.isBoosting = false; // Booster ikke som default
	this.isAlive=true; // We are alive at first... when lives <=0 we are not alive anymore

	this.boosting = function(b){
		this.isBoosting=b; // Endrer statusen på isBoosting
		// sprut 'flammer' ut av baken
	}

	this.update = function(){ // Oppdaterer posisjonen
		if(this.isBoosting){// Booster vi? 
			this.boost();
		}
		if(this.health<=0){ // If lives reach 0, we are dead and the game is over
			this.isAlive=false;
		}
		this.pos.add(this.vel);
		this.vel.mult(0.95); // Gjør det litt smoothere
	}

	this.boost = function(){	// Endrer vel med en gitt force! Flytter deg 
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.99);
		this.vel.add(force);
	}
	this.levelup = function(){
		//levelUpSound.play();
		this.pos = createVector(width/2,height/2);
		pointFactor++;
		currentLevel++;
	}
	this.restart = function(){
		if(this.health>0){
			this.pos = createVector(width/2,height/2);	
		}
		
		//deathSound.playMode("sustain"); // eller restart. Et fett slik det er nå 
		//deathSound.play() // SPILL KUN EN GANG 
	}

	this.displayHealth = function(){
		// Check if we still have lives left. 
		if(this.isAlive){
			textSize(32);
			fill(200,100,0);
			var health = "Lives: " + this.health;
			text(health,10,50);
		}
		else{
			gameOver();
		}
		
	}

	

	this.edges = function(){ // Håndterer kantene! 
		if(this.pos.x > width + this.r){ 
			this.pos.x = -this.r; // Setter oss på andre siden
		}
		else if(this.pos.x < -this.r ){
			this.pos.x = width + this.r;
		}
		else if(this.pos.y > height + this.r){
			this.pos.y = -this.r;
		}
		else if (this.pos.y < -this.r){
			this.pos.y = height + this.r;

		}
	}
	this.hits = function(asteroid){
		// Check the distance between the ship and a given asteroid 
		var d=dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
		if(d<this.r+asteroid.r){
			return true
		}
		else{
			return false;
		}
	}

	this.hitsHealth=function (life) {
		var d = dist(this.pos.x,this.pos.y,life.pos.x,life.pos.y);
		if(d<5){ // if the distance is less than 5 pixels, add health
			this.health++;
			lifeArray.pop(); // Clears the lifeArray, destroying the displayed life
		}
	}

	this.render = function(){
		push(); // MÅ PUSHE OG POPPE PGA TRANSLATE()
		
		fill('rgba(255,100,50,0.9)');
		stroke(150); // Streken/kantene
		translate(this.pos.x,this.pos.y);	// Setter posisjonen til dette objektets koordinater
		rotate(this.heading + PI/2);
		triangle(-this.r,this.r,this.r,this.r,0,-this.r);
		pop();
	}

	this.setRotation = function(a){ // Vi setter rotasjonen med denne funksjonen
		this.rotation = a;
	}

	this.turn = function(){
		this.heading+=this.rotation;

	}
}