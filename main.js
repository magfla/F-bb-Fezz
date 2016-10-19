

$(document).ready(function(){
	var text = "<p> Velkommmmmenenenenenenen </p>";

	setInterval(function(){
		$("*").css({background:getRandomColor()});
	},1000);
});

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}