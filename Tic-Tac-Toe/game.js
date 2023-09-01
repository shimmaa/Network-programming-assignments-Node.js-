 
//======================================
//A. The Game class
//======================================  
var Game = function() {
  //the board representation: DO NOT CHANGE!!
  this.board =[['e','e','e'],
               ['e','e','e'],
               ['e','e','e']];
  
  //the first player is 'c': DO NOT CHANGE!!
  this.player = 'c';
  //implement!!
  //this function take the row and the col of the move and
  //it knows the current player from the state of the object
  //upon a legal move it calls the legalCallback(move,row,col) 
  //function and upon an illegal move, it calls the illegalCallback]
  //function, it also switches the current player 
  this.play = function(row,col,legalCallback,illegalCallback){
      if(row >= 0 && row < 3 && col >= 0 && col < 3)
      {
          if (this.board[row][col] == 'e') {
              legalCallback(this.player, row, col);
              this.board[row][col] = this.player;
              this.switchPlayer();
          } else {
              illegalCallback();
          }
      }else{
          illegalCallback();
      }
  }

  //implement!!
  //given a certain m ('c' or 'r') it returns true if there are three 
  //contiguous m's in the board (in horiz./vert./diagonally), false otherwise
  this.haswon = function(m){
      var rk,ck,cs,rs,ds,ids,go,bln;
      go=false;
      cs=[0,0,0];
      rs=[0,0,0];
      ds=0;
      ids=0;
      bln=this.board.length;
      for (rk in this.board){       
          for (ck in this.board[rk]){
              if (this.board[rk][ck]==m){
                  cs[rk]+=1;
                  rs[ck]+=1;
                  if (rk==ck){
                      ds+=1;
                  }
                  if (rk==bln-1-ck){
                      ids+=1;
                  }
                  if(rs[ck]==bln){
                      go=true;
                  }
              }
          }
          if(cs[rk]==bln || ds==bln || ids==bln){
              go=true;
          }
      }
      if(ds==bln || ids==bln){
          go=true;
      }
      return go;
  }

  //implement!!
  //returns true if there are moves to be played, false otherwsie
  this.isGameOver = function() {
      var gv, c,rk,ck;
      gv=false;
      c=0;
      for (rk in this.board){       
          for (ck in this.board[rk]){
              if (this.board[rk][ck]=='e'){
                c++;
              }
          }
      }
      if(c==0)
        gv=true;
      //if(jQuery.inArray('e',this.board) == -1)
        //  gv=true;
      return gv;
  }

  //implement!!
  //calls onSombodyWon('c') respectively 'r'if any of them won.
  //calls onGameOver if the game is over
  this.evaluateBoard = function (onSomebodyWon, onGameOver){
      if(this.isGameOver())
          onGameOver();
      if(this.haswon('r'))
          onSomebodyWon('r');
      else if(this.haswon('c'))
          onSomebodyWon('c');
  }

  //implement!!
  //toggles the current player from 'c' to 'r'
  this.switchPlayer = function(){
    switch(this.player) {
      case 'c':
        this.player = 'r';
        break;
      case 'r':
        this.player = 'c';
        break;
    }
  }

  //debugging function: DO NOT CHANGE!!
  this.toString = function(){
    return JSON.stringify(this.board);
  }
}
//--------------------------
//end of Game constructor
//--------------------------


//===============================================
//B. Coordinates <-> row,col functions
//===============================================

// implement!!
//  return an object of the form:
//   {row: 0 , col: 2};
function coordinates2RowCol(x,y){
  var b = {};
  if(x >= 0 && x <= 100){
      b.col = 0;
  }else if(x > 100 && x <= 200){
      b.col = 1;
  }else if(x > 200 && x <= 300){
      b.col = 2;
  }
  if(y >= 0 && y <= 100){
      b.row= 0;
  }else if(y > 100 && y <= 200){
      b.row = 1;
  }else if(y > 200 && y <= 300){
      b.row = 2;
  }
  return b;
}

// implement!!
function rowCol2Coordinates(row,col){
  var cr = {};
  cr.x = col*100+50;
  cr.y = row*100+50;
  return cr;
}




