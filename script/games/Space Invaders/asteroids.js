function createAsteroids(antall){
	for(var i = 0;i<antall;i++){
		asteroids[i] = new Asteroid();
	}
}

function Asteroid(pos,r){
	if(pos){
		this.pos = pos.copy(); // Used when creating 'children'
	}
	else{
		this.pos=createVector(random(width),random(height)); // Create random position for this asteroid 
	}

	if(r){
		// the new asteroid has half the radius of the 'parent'
		this.r = r*0.5;
	}
	else{
		this.r = random(10,50);
	}
	
	this.vel = p5.Vector.random2D();
	this.total = floor(random(5,15))
	this.offset = [];
	this.shade=random(random(30,200,random(30,200))); // Gråtonen



	for(var i = 0;i < this.total;i++){
		this.offset[i]=random(-this.r*0.5,this.r*0.15); // ENDRE VERDIENE FOR Å ENDRE TILFELDIGHETEN I KANTENE
	}

	this.update = function(){
		this.pos.add(this.vel);
	}

	this.breakUp = function(){
		var newArray = [];
		newArray[0] = new Asteroid(this.pos,this.r); // nytt "barn" 
		newArray[1] = new Asteroid(this.pos,this.r);
		//newArray[2] = new Asteroid(this.pos,this.r);
		//newArray[3] = new Asteroid(this.pos,this.r);
		//console.log(newArray);
		return newArray;
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

	this.render = function(){
		push(); // PGA TRANSLATE() MÅ VI push() & pop()
		stroke(150);
		noFill();
		fill(this.shade);
		translate(this.pos.x,this.pos.y);
		//ellipse(0,0,this.r*2);
		beginShape();
		for (var i =0;i<this.total;i++){ // DETTE GJØR KANTENE KULE! POLARE KOORDINATER
			var angle = map(i,0,this.total,0,TWO_PI);
			var r =this.r + this.offset[i]; 
			var x=r*cos(angle);
			var y=r*sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE)
		pop(); 
	}
}