documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
ceilSideLength = 0.18*documentWidth;  //每个小方块的边长
ceilSpace = 0.04*documentWidth;

function getPosTop(i,j){
	return ceilSpace+i*(ceilSideLength+ceilSpace);
}
function getPosLeft(i,j){
	return ceilSpace+j*(ceilSideLength+ceilSpace);
}
function getNumberBackgroundColor(number){
	switch(number){
		case 2: return '#eee4da';  break;
		case 4: return '#ede0c8';  break;
		case 8: return '#f2b179';  break;
		case 16: return '#f59563'; break;
		case 32: return '#f67e5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72';break;
		case 256: return '#edcc61';break;
    	case 512: return '#9c0';   break;
		case 1024: return '#33b5e5';break;
		case 2048: return '#09c';  break;
		case 4096: return '#a6c';  break;
		case 8192: return '#93c';  break;
	}
	return '#000';
}
function getNumberColor(number){
	if(number <=4)
		return "#776e65";
	
	return '#fff';
}

function getNumberText(number){
	switch(number){
		case 2:return "小白"; break;
		case 4:return "实习生"; break;
		case 8:return "程序员"; break;
		case 16:return "工程师"; break;	
		case 32:return "主管"; break;	
		case 64:return "经理"; break;
		case 128:return "总监"; break;
		case 256:return "总经理"; break;	
		case 512:return "副总裁"; break;	
		case 1024:return "CEO"; break;	
		case 2048:return "总裁"; break	;
		case 4096:return "董事长"; break;
		case 8192:return "乔布斯"; break;
	}
	return '#000';
}

function nospace(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
				return false;
		}
	return true;   //没有空间
}

function nomove(board){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board) )
		return false;
	return true;
}

function canMoveLeft( board ){
	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++){
			if(board[i][j]!=0)    //它的左边没有数字或者左边数字与自己相等，可以左移
				if(board[i][j-1]==0 || board[i][j-1] == board[i][j])
					return true;
		}
		return false;
}

function canMoveUp( board ){
	
	for(var j=0; j<4; j++)
		for(var i=1; i<4; i++){
			if(board[i][j]!=0)
				if(board[i-1][j]==0 || board[i-1][j] == board[i][j])
				return true;
		}
	return false;
}

function canMoveRight(board){
	for(var i=0; i<4; i++)
		for(var j=2; j>=0; j--){
			if(board[i][j]!=0)
				if(board[i][j+1]==0 || board[i][j+1] == board[i][j])
					return true;
		}
	return false;
}

function canMoveDown(board){
	for(var j=0; j<4; j++)
		for(var i=2; i>=0; i--){
				if(board[i][j]!=0)
					if(board[i+1][j]==0 || board[i+1][j] == board[i][j])
						return true;
		}
	return false;
}

function noBlockHorizontal( row,col1,col2,board){
	for(var i = col1+1; i<col2; i++){
		if(board[row][i]!=0)  //存在一个不等于0的，就说明有障碍物
			return false;
	}
	return true;
}

function noBlockVertical( col,row1,row2,board){
	for(var i=row1+1; i<row2;i++){
		if(board[i][col]!=0)
			return false;
	}
	return true;
}

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


var board = new Array();//一位数组
var score = 0;

var hasConflicted = new Array(); //记录每个小格子是否已经发生过一次碰撞

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	if(documentWidth > 500){
		gridContainerWidth = 500;
		ceilSpace = 20;
		ceilSideLength = 100;
	}

	$('#grid-container').css('width',gridContainerWidth - 2*ceilSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*ceilSpace);
	$('#grid-container').css('padding',ceilSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-ceil').css('width',ceilSideLength);
	$('.grid-ceil').css('height',ceilSideLength);
	$('.grid-ceil').css('border-radius',0.02*ceilSideLength);
}

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++){
			var gridCeil = $("#grid-ceil-"+i+"-"+j);
			gridCeil.css("top",getPosTop(i,j));
			gridCeil.css("left",getPosLeft(i,j));
		}
	for(var i=0;i<4;i++){
		board[i] = new Array();   //将每个board[i]再次声明为一个数组，构成二维数组
        hasConflicted[i] = new Array(); 

		for(var j=0; j<4; j++){
			board[i][j]=0;  //初始化
		    hasConflicted[i][j] = false; //初始化
		}
	}
	updateBoardView();  //board中数据改变，通知前端number-ceil发生改变

	score = 0;
}
function updateBoardView(){
	$('.number-ceil').remove();
	for(var i=0; i<4; i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-ceil" id="number-ceil-'+i+'-'+j+'"></div>');
			var theNumberCeil = $('#number-ceil-'+i+'-'+j);//用于处理当前i,j坐标下的
			if(board[i][j]==0){
				theNumberCeil.css('width','0px');
				theNumberCeil.css('height','0px');
				//将number-ceil 放在grid-ceil中间
				theNumberCeil.css('top',getPosTop(i,j) + ceilSideLength/2);
				theNumberCeil.css('left',getPosLeft(i,j) + ceilSideLength/2);
			}else{
				theNumberCeil.css('width',ceilSideLength);
				theNumberCeil.css('height',ceilSideLength);
				theNumberCeil.css('top',getPosTop(i,j));
				theNumberCeil.css('left',getPosLeft(i,j));
				theNumberCeil.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCeil.css('color',getNumberColor(board[i][j]));
				theNumberCeil.text(getNumberText(board[i][j]) );
			}

			hasConflicted[i][j] = false;  
		}
	$('.number-ceil').css('line-height',ceilSideLength+'px');
	$('.number-ceil').css('font-size',0.3*ceilSideLength+'px');
}

function generateOneNumber(){
	//判断棋盘是否有空间，能否传入数字
	if(nospace(board))
		return false;
	//随即一个位置
	var randx = parseInt( Math.floor( Math.random()*4));
	var randy = parseInt( Math.floor( Math.random()*4));
	//判断这个位置上是否有数字
	var times = 0;
	while(times<50){  //计算机执行50次来猜中没有数字的位置，如果50次还是没找到，就人工生成一个随机数
		if(board[randx][randy] == 0)
			break;
		randx = parseInt( Math.floor(Math.random()*4));
		randy = parseInt( Math.floor(Math.random()*4));

		times++;
	}
	if(times == 50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
		}
	}


	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机位置显示随机数
	board[randx][randy] = randNumber;
	showNumberWithAnimation( randx, randy, randNumber);

	return true;
}

$(document).keydown(function(event){
	//event.preventDefault();
	switch(event.keyCode){
		case 37: event.preventDefault();
				if( moveLeft() ){ 
					   setTimeout('generateOneNumber()',210);
					   setTimeout('isgameover()',300);
					}; break;//left 
		case 38: event.preventDefault();
				if( moveUp() ){ 
					  setTimeout('generateOneNumber()',210);
					   setTimeout('isgameover()',300);
					};break;//up
		case 39: event.preventDefault();
				if( moveRight() ){ 
					  setTimeout('generateOneNumber()',210);
					  setTimeout('isgameover()',300);
					};break;//right
		case 40: event.preventDefault();
				if( moveDown() ){ 
					  setTimeout('generateOneNumber()',210);
					  setTimeout('isgameover()',300);
					};break;//down
		default: break;
	}
});

//实现触控逻辑（注意屏幕中的y轴是向下的）
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	//记录向量
	var deltax = endx - startx;
	var deltay = endy - starty;
	//小于某个阈值，说明用户并没有要执行一次滑动
	if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
        return true;
	//x方向滑动
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//move right
			if( moveRight() ){ 
				  setTimeout('generateOneNumber()',210);
				  setTimeout('isgameover()',300);
				}
		}else{
			//move left
			if( moveLeft() ){ 
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}

	}else{//y
		if(deltay > 0){
			if( moveDown() ){ 
				  setTimeout('generateOneNumber()',210);
				  setTimeout('isgameover()',300);
				}
		}else{
			if( moveUp() ){ 
				  setTimeout('generateOneNumber()',210);
				   setTimeout('isgameover()',300);
				}
		}

	}
});



function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameover');
}

function moveLeft(){
	//判断后面的12个格子
	if( !canMoveLeft(board) ) return false;

	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					//[i,k]位置没有数字，且中途没有障碍物
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
						
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					//[i,k]位置的数字与[i,j]位置相同，产生叠加，且中途没有障碍物
					}else if(board[i][k] ==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] +=board[i][j];
						board[i][j] = 0;
						//score
						score +=board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}


	setTimeout('updateBoardView()',200);  //因为机器执行for循环太快，执行完一次循环，立马执行updateBoardView（）所以会看不到动画效果
	return true;

}

function moveUp(){
	if( !canMoveUp(board) ) return false;
		for( var j = 0 ; j < 4 ; j ++ )
	        for( var i = 1 ; i < 4 ; i ++ ){
	            if( board[i][j] != 0 ){
	                for( var k = 0 ; k < i ; k ++ ){

	                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
	                        showMoveAnimation( i , j , k , j );
	                        board[k][j] = board[i][j];
	                        board[i][j] = 0;
	                        continue;
	                    }
	                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
	                        showMoveAnimation( i , j , k , j );
	                        board[k][j] *= 2;
	                        board[i][j] = 0;

	                        score +=board[k][j];
							updateScore(score);

							hasConflicted[k][j] = true;
	                        continue;
	                    }
	                }
	            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
	//判断后面的12个格子
	if( !canMoveRight(board) ) return false;

	for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k]){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score +=board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
	if( !canMoveDown(board) ) return false;
		for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        score +=board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
