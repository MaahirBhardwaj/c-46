class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  async start(){
      if(gameState===0){
         player=new Player();
         var playerCountRef=await database.ref('playerCount').once("value");
         if(playerCountRef.exists()){
           playerCount=playerCountRef.val();
           player.getCount();
         }
         form=new Form();
         form.display();
      }
      player1=createSprite(600,displayHeight-250);
      player1.addImage(player1image);
      player1.scale=1.0;
      player2=createSprite(1000,displayHeight-250);
      player2.addImage(player2image);
      player2.scale=1.5;
      players=[player1,player2];
      
    }
  play(){
  form.hide();
  Player.getPlayerInfo();
  if(allplayers!==undefined){
    background("red");
    image(bg,0,0,displayWidth,displayHeight);
    var index=0;
    var x=175;
    var y
    for(var i in allplayers){
      index=index+1;
     x=x+500;
     y=displayHeight-allplayers[i].distance;
      
    players[index-1].x=x;
    players[index-1].y=y;
      if(index===player.index){
      players[index-1].shapeColor="red"
      camera.position.x=displayWidth/2;
      camera.position.y=players[index-1].y
      }
      
      
    }
    
    
  }
  if(keyIsDown(RIGHT_ARROW) && player.index!==null){
   player.distance=player.distance+10 
    player.update();
   }
   //if(keyDown(LEFT_ARROW)){
   //player2.x=player2.x-10;
   //} 

  drawSprites()
}
  
}