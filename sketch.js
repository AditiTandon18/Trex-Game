var trex, trexrun, trexcollide, ground, groundimage, invisibleground, cloudimage, ob1, ob2, ob3, ob4, ob5, ob6,
cloudsGroup, obstaclesGroup, gamestate, PLAY, END, count,gameover,restart,gameoverimage,restartimage
var PLAY = 1 
var END = 0
var gameState = PLAY
var score = 0

function preload() {
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  trexcollide = loadImage("trex_collided.png")
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  


}

function setup() {
  count = 0
  createCanvas(600, 200);
  trex = createSprite(50, 170, 10, 10)
  trex.addAnimation("t1", trexrun)
  trex.addAnimation("t2", trexcollide)
  trex.scale = 0.5
  ground = createSprite(200, 180, 400, 20)
  ground.addImage(groundimage)
  invisibleground = createSprite(200, 190, 400, 10)
  invisibleground.visible = false
  cloudsGroup = createGroup()
  obstaclesGroup = createGroup()
  gameover = createSprite(300,120,50,20)
  gameover.addImage(gameoverimage)
gameover.scale = 0.5
  restart = createSprite(300,150,30,20)
  restart.addImage(restartimage)
  restart.scale = 0.5
  gameover.visible = false
    restart.visible = false
  ground.velocityX = -(6 + 3 * count/100)
}

function draw() {
  //set background to white
  background("pink");
  //console.log(World.frameRate)
  if (gameState === PLAY) {
    //move the ground
    ground.velocityX = -10
    count = count + Math.round(World.frameRate / 60);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
   
    
    if (keyDown("space") && trex.y>= 159) {
      trex.velocityY = -12;
     // playSound("jump.mp3")
      console.log(trex.y)
      
    }
   // if (count % 100 == 0 && count > 0) {
     // playSound("checkPoint.mp3")


  //}
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    //spawn the clouds
    spawnClouds();

    //spawn obstacles
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
      //playSound("die.mp3")


    }
    // console.log(ground.velocityX)
  }
  else if(gameState === END) {
    ground.velocityX = 0
    trex.changeAnimation("t2",trexcollide)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.velocityY = 0
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    gameover.visible = true
    restart.visible = true
    if (mousePressedOver(restart)){
      reset();
    
      
    }
  }
  
  
  
  //scoring
  text("Score: "+ count, 250, 100);
 
  //stop trex from falling down
  trex.collide(invisibleground);
  drawSprites();
}
function reset(){
  count = 0
  gameState = PLAY
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("t1", trexrun)
  gameover.visible = false
  restart.visible = false
  
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    //assign lifetime to the variable
    cloud.lifetime = 210;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 175, 5, 10)
    obstacle.scale = 0.5
    var x = Math.round(random(1, 6))
    switch (x) {
      case 1:
        obstacle.addImage(ob1)
        break
      case 2:
        obstacle.addImage(ob2)
        break
      case 3:
        obstacle.addImage(ob3)
        break
      case 4:
        obstacle.addImage(ob4)
        break
      case 5:
        obstacle.addImage(ob5)
        break
      case 6:
        obstacle.addImage(ob6)
    }
    obstacle.velocityX = -(10 + 3 * count/100)
    obstacle.lifetime = 70
    obstaclesGroup.add(obstacle);


  }
}