// create 'Stars'

function createStars(numberOfStars){
	for (var i = 0;i<numberOfStars;i++){
		stars[i] = new Star();
	}
}

function Star(){
	// Constructor for a star
	this.pos=createVector(random(width),random(height)); // create a random position
	

	this.vel = createVector(random(0),random(0,5));

	this.render=function(){
		// Render all stars
		stroke(random(200,255)); // relatively light 
		line(this.pos.x,this.pos.y,this.pos.x+10,this.pos.y+100);
	}

	this.update=function() {
		this.pos.add(this.vel);
	}

	this.edges = function(){ // Håndterer kantene! 
		if(this.pos.x > width){ 
			this.pos.x = -this.pos.x; // Setter oss på andre siden
		}
		else if(this.pos.x < -this.pos.x ){
			this.pos.x = width;
		}
		else if(this.pos.y > height){
			this.pos.y = -this.pos.y;
		}
		else if (this.pos.y < -this.pos.y){
			this.pos.y = height + this.pos.y;
		}
	}
}



