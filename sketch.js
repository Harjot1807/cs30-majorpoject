// Major Project
// Harjot Singh
// Started - March 21, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mMenuBg; 
let state = "mainMenu";

function preload(){
  mMenuBg = loadImage("chicken.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  displayMainMenu();
}

//functions that displays the main menu at the start of the game
function displayMainMenu() {
  if (state === "mainMenu"){
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
