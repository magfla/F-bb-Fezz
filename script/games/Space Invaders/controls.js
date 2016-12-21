function keyReleased(){ // Nullstiller rotasjonen når vi IKKE trykker 
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed(){ // Kjører hvergang jeg trykker en knapp
	if (keyCode ==RIGHT_ARROW){	// Følger med p5 :D
		ship.setRotation(0.1); // ROTER MED KLOKKA
	}
	else if (keyCode==LEFT_ARROW){
		ship.setRotation(-0.1);// ROTER MOT KLOKKA
	}
	else if(keyCode==UP_ARROW){
		ship.boosting(true);
	}
	else if(keyCode==DOWN_ARROW){
		ship.boosting(false); // SKAL NEDKNAPPEN GJØRE NOE ANNET? RYGGE?
	}
	else if(key==" "){ // "HACK", finn betre løysning
		laserBeams.push(new Laser(ship.pos,ship.heading)); // Gir posisjon og retning som argument
	}
}

/*function Edges(){ // KAN IMPORTERE DETTE TENKER JEG?
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
} */