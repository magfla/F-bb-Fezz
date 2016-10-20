
var RANDOM_BACKGROUND_COLORS = false;


$(document).ready(function(){
	var text = "<p> Velkommmmmenenenenenenen </p>";
	app.setup();
	
});

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}




var app = {};

app.setup = function(){
	if(RANDOM_BACKGROUND_COLORS){
		setInterval(function(){
			$("*").css({background:getRandomColor()});
		},1000);
	}

	$("#main-navigation a").on("click",function(e){
		app.navItemClicked(window.location.hash);

	});
}

app.updateCurrentPageTitle = function(arg){
	$("#display-area h1").html(arg);
}

app.updateCurrentPageContent = function(arg){
	$("#display-area p").html(arg);
}


app.navItemClicked = function(hash){
	app.updateCurrentPageTitle(hash);
	app.updateCurrentPageContent("Sadly there is not so much information about " + hash +" at the monent. Maybe you would like to help fix that?");
}