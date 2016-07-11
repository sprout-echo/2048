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

