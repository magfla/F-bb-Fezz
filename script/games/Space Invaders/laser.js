function Laser(shipPos,angle){ // Trenger parametere for å bestemme hvor skuddet kommer fra og retningen det skal
	this.pos = createVector(shipPos.x,shipPos.y); // createVector();
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(8); // Øker farta 

	this.update = function(){
		this.pos.add(this.vel);
	}

	this.hits = function(asteroid){
		var d = dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y); //Beregner avstand! Handy!
		if( d < asteroid.r){ // er d mindre enn radiusen??
			console.log("En kollisjon!!")
			return true;
		}
		else {
			return false;
		}
	}

	this.render = function(){
		push();
		stroke(255);
		strokeWeight(3);
		point(this.pos.x,this.pos.y);
		pop()
	}

	this.offscreen = function(){
		if(this.pos.x > width || this.pos.x < 0){ 
			return true;
		}
		if(this.pos.y > height || this.pos.y < 0){
			return true;
		}
		return false // OM INGEN AV DE ANDRE STEMMER 
	}
}