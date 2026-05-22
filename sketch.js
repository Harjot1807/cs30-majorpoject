// Major Project
// Harjot Singh
// Started - March 21, 2026
//
// Extra for Experts:
// setting images as background

//setting up the variables for the rest of the code
let state = "mainMenu";
let currentDirection = "front";
let carArray = [];

//setting up variables for preloads
let mMenuBg; 
let controlBg;
let chicken;
let chickenFront;
let chickenBack;
let chickenLeft;
let chickenRight;
let movementSound;

//preloads images and sounds
function preload(){
  mMenuBg = loadImage("chicken.jpg");
  controlBg = loadImage("control.webp");
  chickenFront = loadImage("chickenF.png");
  chickenBack = loadImage("chickenB.png");
  chickenLeft = loadImage("chickenL.png");
  chickenRight = loadImage("chickenR.png");
  movementSound = loadSound("movement.mp3");
}

//class for the cars that keep on moving and come back
class Car{

  //gives the car its inital values
  constructor(x, y, speed, w, h){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = w;
    this.h = h;
  }

  //moves the car x value depending on its speed
  update(){
    this.x += this.speed;

    //if the car goes out of the right side
    if (this.speed > 0 && this.x > width + this.w) {
      this.x = -this.w;
    }

    //if the car goes out of the left side
    if (this.speed < 0 && this.x < 0 - this.w){
      this.x = width + this.w;
    }
  }

  //displays the car after it updates
  display(){
    fill('red');
    rect(this.x, this.y, this.w, this.h);
  }
}

//class for the chicken that the player uses
class Player {

  //gives the initial values of the chicken
  constructor(){
    this.gridSize = 40;
    this.x = width/2;
    this.y = height - this.gridSize *2;
    this.size = this.gridSize * 0.8;
    this.direction = currentDirection;
  }

  //displays the chicken after movement
  display(){
    fill('yellow');
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
    imageMode(CENTER);

    //chooses the image using the imagething
    image(this.imageChoose(), this.x, this.y, this.size, this.size);
  }

  //moves the character based on the key pressed
  move(xDirection, yDirection){
    this.x += xDirection * this.gridSize;
    this.y += yDirection * this.gridSize;
    movementSound.play();
  }

  //uses the variable currentdirection of the chicken to choose image to display
  imageChoose(){

    //if last key was w forwards
    if (currentDirection === "front"){
      return chickenFront;
    }

    //if last key was s bacwards
    else if(currentDirection === "back"){
      return chickenBack;
    }

    //if last key was a left
    else if(currentDirection === "left"){
      return chickenLeft;
    }

    //if last key was d right
    else if(currentDirection === "right"){
      return chickenRight;
    }
  }
}

//sets up the pllayer character and the cars
function setup() {
  createCanvas(windowWidth, windowHeight);
  chicken = new Player();
  carArray.push(new Car(100, height - 150, 4, 60, 30));
  carArray.push(new Car(200, height - 300, -3, 80, 35));
}

//choooses between which state to draw
function draw() {

  //if state is mainmenu
  if (state === "mainMenu"){
    displayMainMenu();
  }

  //if state is control
  else if (state === "control"){
    displayControl();
  }

  //if state is play
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

//function that displays the control menu
function displayControl(){

  //only works if the state is control
  if (state === "control"){

    //loads the box, background and the text
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


//functions that actually lets the gameplay
function displayPlay(){

  //only work if the game is in the play state
  if(state === "play"){

    //displays the background and loads the cars
    background('lightgreen');
    for(let i = 0; i<carArray.length; i++){
      carArray[i].update();
      carArray[i].display();
    }

    //displays the chicken
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

}

//when a specific key is pressed
function keyPressed(){

  //if escape is pressed in the control
  if (keyCode === ESCAPE && state === "control"){

    //returns to menu
    state = "mainMenu";
  }


  //if escape is pressed in play
  if (keyCode === ESCAPE && state === "play"){

    //returns to menu
    state = "mainMenu";
  }

  //if in play and w is pressed
  else if(state === "play" && key === "w"){

    //changes direction to front to replace the image and moves the chicken
    currentDirection = "front";
    chicken.move(0,-1);
  }

  //changes direction to front to replace the image and moves the chicken
  else if(state === "play" && key === "s"){
    currentDirection = "back";
    chicken.move(0,1);
  }

  //changes direction to front to replace the image and moves the chicken
  else if(state === "play" && key === "a"){
    currentDirection = "left";
    chicken.move(-1,0);
  }

  //changes direction to front to replace the image and moves the chicken
  else if(state === "play" && key === "d"){
    currentDirection = "right";
    chicken.move(1,0);
  }
}