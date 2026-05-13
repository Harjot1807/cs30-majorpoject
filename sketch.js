// Major Project
// Harjot Singh
// Started - March 21, 2026
//
// Extra for Experts:
// setting images as background

let mMenuBg; 
let controlBg;
let state = "mainMenu";

//preloads images
function preload(){
  mMenuBg = loadImage("chicken.jpg");
  controlBg = loadImage("control.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  displayMainMenu();
  displayControl();
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
}