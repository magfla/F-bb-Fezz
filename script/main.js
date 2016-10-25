// Satt denne til false siden jeg la til den knappen, sett til true for å kjøre hele tiden og
// fortsatt ha mulighet til å bruke knappen. Ok eller har jeg glemt noget?
var RANDOM_BACKGROUND_COLORS = false;


$(document).ready(function(){
	var text = "<p> Velkommmmmenenenenenenen </p>";
	app.setup();
	// Får ikke satt inn select.val() på riktig måte. FIXED: med toString() :D:D
	$("#bgChanger").on("click",function(){
		var whichElement = $("select").val();
		//console.log(whichElement);
		var change = $(whichElement.toString()).css({background:getRandomColor()
		});
})
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
			$("body").css({background:getRandomColor()});
		},4000);
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

	$.get("pages/"+hash.substr(1)+".html",function(data){
		app.updateCurrentPageContent(data);
	});


	//app.updateCurrentPageContent("Sadly there is not so much information about " + hash +" here at the monent. Maybe you would like to help fix that?");
}

