

function Life(){
	this.pos = createVector(random(width),random(height));
	this.timeRemaining = 5; // 5 seconds from creation

	this.render=function(){
		fill('rgba(20,200,50,0.9)');
		ellipse(this.pos.x,this.pos.y,10,10);
	}
}