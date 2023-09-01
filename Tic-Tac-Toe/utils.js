//The whole thing starts after the page is loaded
$(window).ready(function() {
  console.log("loaded");
  //============================================================
  //A. DRAWING FUNCTIONS: DO NOT CHANGE ANYTHING in THIS SECTION!!
  //============================================================
  var canvas  = document.getElementById('main');
  var canvastop = canvas.offsetTop
  var canvasleft = canvas.offsetLeft;
  var context = canvas.getContext("2d");
  var draw = {
    fill: "#000000",
    stroke: "#000000",
    clear: "#ffffff",
    size: 5,
    width: 300,
    height: 300
  }

  function path( moves ) {
    context.beginPath();
    context.strokeStyle = draw.stroke;
    context.fillStyle = draw.fill;
    context.lineCap = draw.cap;
    context.lineJoin = draw.join;
    context.lineWidth = draw.size;
    moves()
    context.fill();
    context.stroke();
    context.closePath();
  }

  //Function for drawing a dot now has only the unique part
  function dot(x,y) {
    path(function (){
      context.arc(x,y,10,0,Math.PI*2,true);
    });
  }

  function rectangle(x,y){
    path(function (){
      context.rect(x-10, y-10, 20, 20);
    })
  }

  //Function for drawing a dot now has only the unique part
  function line(fromx,fromy, tox,toy) {
    path(function(){
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
    });
  }

  function clear() {
    context.fillStyle = draw.clear;
    context.rect(0, 0, draw.width, draw.height);
    context.fill();
  }

  function drawGrid(){
     clear();
     line(100,0,100,300);
     line(200,0,200,300);
     line(0,100,300,100);
     line(0,200,300,200);
  }
  //============================================================
  //END OF DRAWING FUNCTIONS: DO NOT CHANGE ANYTHING above!!
  //============================================================


  //=========================================
  //B. The global game variable: DO NOT CHANGE!!
  //=========================================
  var g;
  var message = $('#message');//document.getElementById('message')


  //===================================
  //C. Onclick event handler: implement!!
  //===================================
  canvas.onclick = function(event){

    //1. if the game is over, do not do anything.
    if (!g.isGameOver()|| !g.haswon('c'), !g.haswon('r')){

      //1. Get normalized coordinates from the event
      var newx = event.clientX - canvasleft;
      var newy = event.clientY - canvastop;

      //2. Get the row and col from coordinates
      square = coordinates2RowCol(newx,newy);
      row = square.row;
      col = square.col;

      //4. Play making sure to give the right callbacks
      g.play(row,col,onLegalMove, onIllegalMove);
      
      //5. Evaluate the board;
      g.evaluateBoard(onSomebodyWon, onGameOver);    
    }
    
  }

  //===================================
  //D. Callback functions: implement!!
  //===================================
  var onLegalMove = function (move, row, col){
    console.log([move,row,col]);
    //1. Get the coordinates of of the square given by row and col
    //   using the rowCol2Coordinates
     coord = rowCol2Coordinates(row,col);

   //2. Handle the move ('r' or 'c') by drawing the right shape
    if (move == 'r'){
      rectangle(coord.x,coord.y);
      displayMessage("it's c's turn");
    }
    else if (move == 'c'){
      dot(coord.x,coord.y);
      displayMessage("it's r's turn");
    }
    //3. Make sure that after each play, the message of the turn
    //   for the other player is displayed as "it's c's turn" or
    //   "it's r's turn" using the displayMessage function.
      //g.switchPlayer();
      //displayMessage("it's "+g.player+"'s turn");
  }
    
  var onIllegalMove = function(){
      //1. display the message 'illegal move'
      displayMessage('illegal move');
  };

  var onSomebodyWon = function (who){
      //1. display the message 'c wins !!' or 'r wins !!'
      displayMessage(who + ' wins!!');
  }

  var onGameOver = function(){  
      //1. display the message 'Game Over!!'
      displayMessage('Game Over!!');
  }  

  //===================================
  //E. Messsaging function: implement!!
  //===================================
  function displayMessage(text) {
      //1. Change the innertext of the message div
      //   you alread have the "message variable global"
      //   TIP: please look into jquery documentation for changing the 
      //        text of an element
      message.text(text);
  }

  //===================================
  //F. Initialization function: implement!!
  //==================================
  function init(){
    //1. Create a new game object based on the constructor function
    g = new Game();

    //2. draw the grid using the drawGid function
    drawGrid();

    //2.display the "it's c's turn" or "it's r's turn" based
    //  on the who is the current player in the game object
    displayMessage("it's "+g.player+"'s turn");
  };

  //===========================================
  //G. Initialization function: DO NOT CHANGE!!
  //===========================================
  init();
  
});