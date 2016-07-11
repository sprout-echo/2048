function showNumberWithAnimation( i, j, randNumber){
	var numberCeil = $('#number-ceil-'+i+'-'+j);
	numberCeil.css('background-color',getNumberBackgroundColor(randNumber));
	numberCeil.css('color',getNumberColor(randNumber));
	numberCeil.text(getNumberText(randNumber));

	numberCeil.animate({
		width : ceilSideLength,
		height : ceilSideLength,
		top : getPosTop(i,j),
		left : getPosLeft(i,j)
	},50);
}

function showMoveAnimation( fromx,fromy,tox,toy){
	var numberCeil = $('#number-ceil-'+fromx+'-'+fromy);
	numberCeil.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$('#score').text(score);
}
