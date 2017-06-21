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
	else if(keyCode==32){ 
		laserBeams.push(new Laser(ship.pos,ship.heading)); // Gir posisjon og retning som argument
	}

	if((keyCode==82) && (!ship.isAlive)){ // if 'R' is pressed, restart the game
		setup();
	} 
}