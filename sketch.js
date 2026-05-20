// Major Project
// Harjot Singh
// Started - March 21, 2026
//
// Extra for Experts:
// setting images as background

let mMenuBg; 
let controlBg;
let state = "mainMenu";
let chicken;
let chickenFront;
let chickenBack;
let chickenLeft;
let chickenRight;
let currentDirection = "front";
let movementSound;

//preloads images
function preload(){
  mMenuBg = loadImage("chicken.jpg");
  controlBg = loadImage("control.webp");
  chickenFront = loadImage("chickenF.png");
  chickenBack = loadImage("chickenB.png");
  chickenLeft = loadImage("chickenL.png");
  chickenRight = loadImage("chickenR.png");
  movementSound = loadSound("movement.mp3");
}

class Car{
  constructor(x, y, speed, width, height){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
  }

  display(){
    this.x += this.speed;

    if (this.speed > 0 && this.x > width + this.width) {
      this.x = -this.width;
    }
    if (this.speed < 0 && this.x < 0 - this.width){
      this.x = this.width;
    }
  }
}

class Player {

  constructor(){
    this.gridSize = 40;
    this.x = width/2;
    this.y = height - this.gridSize *2;
    this.size = this.gridSize * 0.8;
    this.direction = currentDirection;
  }

  display(){
    fill('yellow');
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
    imageMode(CENTER);
    image(this.imageChoose(), this.x, this.y, this.size, this.size);
  }

  move(xDirection, yDirection){
    this.x += xDirection * this.gridSize;
    this.y += yDirection * this.gridSize;
    movementSound.play();
  }

  imageChoose(){

    if (currentDirection === "front"){
      return chickenFront;
    }

    else if(currentDirection === "back"){
      return chickenBack;
    }

    else if(currentDirection === "left"){
      return chickenLeft;
    }

    else if(currentDirection === "right"){
      return chickenRight;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  chicken = new Player();
  let carArray = [];
  carArray.push();
}

function draw() {
  if (state === "mainMenu"){
    displayMainMenu();
  }

  else if (state === "control"){
    displayControl();
  }

  else if (state === "play"){
    displayPlay();
  }
}

//functions that displays the main menu at the start of the game
function displayMainMenu() {

  //only works if the state is mainmenu
  if (state === "mainMenu"){

    //loads the image as bg and makes the two boxes
    background(mMenuBg);
    fill('white');
    rect(width/4, height/4, width/2, height/6);
    rect(width/4, height/2, width/2, height/6);
    fill('black');
    textAlign(CENTER, CENTER);
    textSize((width+height)/20);
    text("Play", width/2, height*8/24);
    text("Controls", width/2, height*14/24);
  }
}

function displayControl(){

  if (state === "control"){
    background(controlBg);
    rectMode(CORNER);
    fill('white');
    rect(width/4, height/4, width/2, height/2);
    fill('black');
    textAlign(CENTER);
    textSize((width+height)/32);
    text("W = Walk UP\nS = Walk DOWN\nA = Walk LEFT\nD = Walk RIGHT\nEsc = Go BACK", width/2, height/2);

  }
}

function displayPlay(){

  if(state === "play"){
    background('lightgreen');
    chicken.display();
  }

}

//when mouse is pressed
function mousePressed(){

  //happens when the state is mainemnu
  if (state === "mainMenu") {

    //if you press the play box
    if (mouseX >= width/4 && mouseX <= width*3/4) {
      if (mouseY >= height/4 && mouseY <= height*5/12){
        state = "play";
      }

      //if you press the control box
      else if (mouseY >= height/2 && mouseY <= height*2/3){
        state = "control";
      }
    }
  }



  if (state === "play"){
    
  }
}

function keyPressed(){
  if (keyCode === ESCAPE && state === "control"){
    state = "mainMenu";
  }

  else if(state === "play" && key === "w"){
    currentDirection = "front";
    chicken.move(0,-1);
  }

  else if(state === "play" && key === "s"){
    currentDirection = "back";
    chicken.move(0,1);
  }

  else if(state === "play" && key === "a"){
    currentDirection = "left";
    chicken.move(-1,0);
  }

  else if(state === "play" && key === "d"){
    currentDirection = "right";
    chicken.move(1,0);
  }
}