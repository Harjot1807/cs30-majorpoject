// Major Project
// Harjot Singh
// Started - March 21, 2026
//
// Extra for Experts:
//favicon
//lerp()
//filter
// setting images as background

//setting up the variables for the rest of the code
let state = "mainMenu";
let currentDirection = "front";
let carArray = [];
let logArray = [];
let trainArray = [];
let fastTrainArray = [];
let cameraY = 0;
let trainSpeed = 30;
let fastTrainSpeed = 90;

//setting up variables for backgrounds
let mMenuBg;
let controlBg;

//setting up variables for the chicken character
let chicken;
let chickenFront;
let chickenBack;
let chickenLeft;
let chickenRight;
let movementSound;

//setting up variables for the obstacles
let logPicture;
let carPictureL;
let carPictureR;
let trainPictureL;
let trainPictureR;

//setting up variables for the game logic
let gridSize = 40;
let rows = [];
let scrollY = 0;

//preloads images and sounds
function preload() {
  mMenuBg = loadImage("chicken.jpg");
  controlBg = loadImage("control.webp");
  chickenFront = loadImage("chickenFbg.png");
  chickenBack = loadImage("chickenBbg.png");
  chickenLeft = loadImage("chickenLbg.png");
  chickenRight = loadImage("chickenRbg.png");
  movementSound = loadSound("movement.mp3");
  trainPictureR = loadImage("train.png");
  trainPictureL = loadImage("trainl.png");
  carPictureL = loadImage("carLbg.png");
  carPictureR = loadImage("carRbg.png");
  logPicture = loadImage("trunk.png");
}

//class for the cars that keep on moving and come back
class Car {

  //gives the car its inital values
  constructor(x, y, speed, w, h) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = w;
    this.h = h;
  }

  //moves the car x value depending on its speed
  update() {
    this.x += this.speed;

    //if the car goes out of the right side
    if (this.speed > 0 && this.x > width + this.w) {
      this.x = -this.w;
    }

    //if the car goes out of the left side
    if (this.speed < 0 && this.x < 0 - this.w) {
      this.x = width + this.w;
    }
  }

  //displays the car after it updates
  display() {
    imageMode(CORNER);
    if (this.speed < 0) {
      image(carPictureR, this.x, this.y + scrollY, this.w, this.h);
    }
    else {
      image(carPictureL, this.x, this.y + scrollY, this.w, this.h);
    }
  }
}

//class for the logs that keep on moving and come back
class Log {

  //gives the log its inital values
  constructor(x, y, speed, w, h) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = w;
    this.h = h;
  }

  //moves the log x value depending on its speed
  update() {
    this.x += this.speed;

    //if the log goes out of the right side
    if (this.speed > 0 && this.x > width + this.w) {
      this.x = -this.w;
    }

    //if the log goes out of the left side
    if (this.speed < 0 && this.x < 0 - this.w) {
      this.x = width + this.w;
    }
  }

  //displays the log after it updates
  display() {
    imageMode(CORNER);
    image(logPicture, this.x, this.y + scrollY, this.w, this.h);
  }

}

//class for the trains that keep on moving and come back
class Train {

  //gives the train its inital value
  constructor(x, y, speed, w, h) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = w;
    this.h = h;
  }

  //moves the train x value depending on its speed
  update() {
    this.x += this.speed;

    //if the train goes out of the right side
    if (this.speed > 0 && this.x > width + this.w) {
      this.x = -this.w;
    }

    //if the train goes out of the left side
    if (this.speed < 0 && this.x < 0 - this.w) {
      this.x = width + this.w;
    }
  }

  //dispplays the train after it updates
  display() {
    imageMode(CORNER);
    if (this.speed > 0) {
      image(trainPictureL, this.x, this.y + scrollY, this.w, this.h);
    }
    else {
      image(trainPictureR, this.x, this.y + scrollY, this.w, this.h);
    }
  }
}

class FastTrain {

  //gives the train its inital value
  constructor(x, y, speed, w, h) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.w = w;
    this.h = h;
    this.offScreen = false;
  }

  //moves the train x value depending on its speed
  update() {
    this.x += this.speed;

    //if the train goes out of the right side
    if (this.speed > 0 && this.x > width + this.w) {
      this.offScreen = true;;
    }

    //if the train goes out of the left side
    if (this.speed < 0 && this.x < 0 - this.w) {
      this.offScreen = true;
    }
  }

  //dispplays the train after it updates
  display() {
    imageMode(CORNER);
    if (this.speed > 0) {
      image(trainPictureL, this.x, this.y + scrollY, this.w, this.h);
    }
    else {
      image(trainPictureR, this.x, this.y + scrollY, this.w, this.h);
    }
  }
}

//class for the chicken that the player uses
class Player {

  //gives the initial values of the chicken
  constructor() {
    this.x = Math.floor(width / (gridSize * 2)) * gridSize + gridSize / 2;
    this.y = height - gridSize * 2 + gridSize / 2;
    this.size = gridSize * 0.8;
    this.direction = currentDirection;
    this.horizontalSpeed = 0;
  }

  //displays the chicken after movement
  display() {
    if (chicken.horizontalSpeed !== 0) {
      chicken.x += chicken.horizontalSpeed;
    }
    fill('yellow');
    rectMode(CENTER);

    let screenY = this.y + scrollY;
    rect(this.x, screenY, this.size, this.size);
    imageMode(CENTER);

    //chooses the image using the imagething
    let img = this.imageChoose();
    if (img) {

      image(img, this.x, screenY, this.size, this.size);
    }
  }

  //moves the character based on the key pressed
  move(xDirection, yDirection) {
    this.x += xDirection * gridSize;
    this.y += yDirection * gridSize;

    //decides if the camera(the display) is going to go up or down
    if (yDirection < 0) {
      cameraY += gridSize;
    }
    else if (yDirection > 0 && cameraY > 0) {
      cameraY -= gridSize;
    }

    //plays the movement sound
    if (movementSound && typeof movementSound.play === 'function') {
      movementSound.play();
    }

  }

  //uses the variable currentdirection of the chicken to choose image to display
  imageChoose() {

    //if last key was w forwards
    if (currentDirection === "front") {
      return chickenFront;
    }

    //if last key was s bacwards
    else if (currentDirection === "back") {
      return chickenBack;
    }

    //if last key was a left
    else if (currentDirection === "left") {
      return chickenLeft;
    }

    //if last key was d right
    else if (currentDirection === "right") {
      return chickenRight;
    }
  }


}


//sets up the player character and the cars
function setup() {
  createCanvas(windowWidth, windowHeight);
  newGame();
}

//choooses between which state to draw
function draw() {

  //if state is mainmenu
  if (state === "mainMenu") {
    displayMainMenu();
  }

  //if state is control
  else if (state === "control") {
    displayControl();
  }

  //if state is play
  else if (state === "play") {
    displayPlay();
    checkCollisions();

  }

  else if (state === "gameOver") {
    displayGameOver();
  }
}

//function that makes the first row grass and gives a type for the row
function generateInitialRow(yPos) {

  //thing that makes it grass for the first one
  let type = "grass";

  //randomly decides if each row should be grass, road, river or track
  //1/4 - grass
  //3/8 - road
  //1/8 - train
  //1/4 - river
  if (yPos < height - gridSize * 3) {
    type = random(["grass", "fastTrack", "road", "road", "river", "grass", "track", "river", "road"]);
  }

  //pushes the row number and type into the golobal row variable
  let newRow = ({ y: yPos, type: type });

  if (type === "fastTrack") {
    newRow.trackState = "waiting"; 
    newRow.timer = Math.floor(random(240, 360)); 
    if (random(1) > 0.5) {
    newRow.speedDirection = 1;
    }
    else {
      newRow.speedDirection = -1;
    }
  }

  rows.push(newRow);

  //if type is a road makes a car row
  if (type === "road") {
    spawnCarRow(yPos);
  }

  //if type is a river makes a log row
  if (type === "river") {
    spawnRiver(yPos);
  }

  //if type is a track makes a river row
  if (type === "track") {
    spawnTrainRow(yPos);
  }
}

//functions that displays the main menu at the start of the game
function displayMainMenu() {

  //only works if the state is mainmenu
  if (state === "mainMenu") {
    rectMode(CORNER);
    imageMode(CORNER);
    //loads the image as bg and makes the two boxes
    background(mMenuBg);

    //box and text for the play and control buttons
    stroke('black');
    fill('white');
    rect(width / 4, height / 4, width / 2, height / 6);
    rect(width / 4, height / 2, width / 2, height / 6);
    fill('black');
    textAlign(CENTER, CENTER);
    textSize((width + height) / 20);
    text("Play", width / 2, height * 8 / 24);
    text("Controls", width / 2, height * 14 / 24);
  }
}

//function that displays the control menu
function displayControl() {

  //only works if the state is control
  if (state === "control") {

    //loads the box, background and the text
    background(controlBg);
    rectMode(CORNER);
    fill('white');
    rect(width / 4, height / 8, width / 2, height*3 / 4);

    //for the text
    fill('black');
    textAlign(CENTER);
    textSize((width + height) / 32);
    text("W = Walk UP\nS = Walk DOWN\nA = Walk LEFT\nD = Walk RIGHT\nEsc = Go BACK", width / 2, height / 2);

  }
}

function manageFastTracks(){
  for (let r of rows){
    if (r.type === "fastTrack"){
      r.timer--;
      let screenY = r.y + scrollY;
      if (r.trackState === "waiting" && r.timer <= 0){
        r.trackState = "warning";
        r.timer = 60;
      }

      else if (r.trackState === "warning"){
        if (frameCount % 20 <10){
          fill(255, 0, 0, 160);
          rect(0, screenY, width, gridSize);
        }

        if (r.timer <= 0){
          r.trackState = "waiting";
          r.timer = Math.floor(random(240, 360));
          let speed = fastTrainSpeed;
          if (r.speedDirection < 0) {
            speed *= -1;
          }

          let trainW = random(450, 600);
          let trainX;
          if (speed > 0) {
            trainX = -trainW;
          } 
          else {
            trainX = width + trainW;
          }

          fastTrainArray.push(new FastTrain(trainX, r.y +5, speed, trainW, gridSize - 10));
        }
      }
    }
  }
}


//functions that actually lets the gameplay
function displayPlay() {

  //only work if the game is in the play state
  if (state === "play") {

    //sets the background
    background('lightgreen');
    deleteAndManageInfiteGrid();

    //sets the rectmode to corner to display properly
    rectMode(CORNER);

    //sorts through all the rows to decide color
    for (let r of rows) {

      let screenY = r.y + scrollY;

      //if the row type is grass, color is green
      if (r.type === "grass") {
        fill("lightgreen");
      }

      //if the row type is road, color is darkgray
      else if (r.type === "road") {
        fill("darkgray");
      }

      //if the row type is blue, color is blue
      else if (r.type === "river") {
        fill("blue");
      }

      //if the row type is track, color is lightgray
      else if (r.type === "track") {
        fill(181, 109, 29);
      }

      //if the row type is fastrack color is dark brown
      else if (r.type === "fastTrack"){
        fill(150, 70, 20)
      }

      //makes the individual visiaal row
      noStroke();
      rect(0, screenY, width, gridSize);
    }

    manageFastTracks();

    //updates and displays the cars
    for (let i = 0; i < carArray.length; i++) {
      carArray[i].update();
      carArray[i].display();
    }

    //updates and displays the logs
    for (let i = 0; i < logArray.length; i++) {
      logArray[i].update();
      logArray[i].display();
    }

    //updates and displays the trains
    for (let i = 0; i < trainArray.length; i++) {
      trainArray[i].update();
      trainArray[i].display();
    }

    for (let i = 0; i < fastTrainArray.length; i++) {
      fastTrainArray[i].update();
      fastTrainArray[i].display();
    }

    //displays the chicken
    chicken.display();
  }

}

//if the game is over (hit log/car/water)
function displayGameOver() {

  //ddisplays the gme over in red
  fill('red');
  textAlign(CENTER, CENTER);
  textSize((width + height) / 15);
  text("GAME OVER", width / 2, height / 2 - 50);

  //displays the press esc in white
  fill('white');
  textSize((width + height) / 40);
  text("Press ESC to return to Main Menu", width / 2, height / 2 + 50);
}

//when mouse is pressed
function mousePressed() {

  //happens when the state is mainemnu
  if (state === "mainMenu") {

    //if you press the play box
    if (mouseX >= width / 4 && mouseX <= width * 3 / 4) {
      if (mouseY >= height / 4 && mouseY <= height * 5 / 12) {
        state = "play";
      }

      //if you press the control box
      else if (mouseY >= height / 2 && mouseY <= height * 2 / 3) {
        state = "control";
      }
    }
  }

}

//when a specific key is pressed
function keyPressed() {

  //if escape is pressed in the control
  if (keyCode === ESCAPE && state === "control") {

    //returns to menu
    state = "mainMenu";
  }


  //if escape is pressed in play
  if (keyCode === ESCAPE && state === "play") {

    //returns to menu
    state = "mainMenu";
  }

  if (keyCode === ESCAPE && state === "gameOver") {
    state = "mainMenu";
    newGame();
  }

  //if in play and w is pressed
  else if (state === "play" && key === "w") {

    //changes direction to front to replace the image and moves the chicken
    currentDirection = "front";
    chicken.move(0, -1);
  }

  //changes direction to front to replace the image and moves the chicken
  else if (state === "play" && key === "s") {
    currentDirection = "back";
    chicken.move(0, 1);
  }

  //changes direction to front to replace the image and moves the chicken
  else if (state === "play" && key === "a") {
    currentDirection = "left";
    chicken.move(-1, 0);
  }

  //changes direction to front to replace the image and moves the chicken
  else if (state === "play" && key === "d") {
    currentDirection = "right";
    chicken.move(1, 0);
  }
}

//spawns a car row 
function spawnCarRow(yPos) {

  //randomizes speed and direction
  let speed = random(2, 5);
  if (random(1) > 0.5) {
    speed *= -1;
  }

  //randomly decides the number and space between the car
  let numCars = Math.floor(random(2, 4));
  let spacing = random(250, 550);

  //randomizes the carwidth and pushes the car into its array
  for (let i = 0; i < numCars; i++) {
    let carWidth = random(60, 90);
    let carX;

    //spawns the cars if they are moving right
    if (speed > 0) {
      carX = -carWidth - (i * spacing);
    }

    //spawns the cars if they are moving left
    else {
      carX = width + carWidth + (i * spacing);
    }

    //pushes the car into its car array with its values;
    carArray.push(new Car(carX, yPos + 5, speed, carWidth, gridSize - 10));
  }
}
//spawns a log row
function spawnRiver(yPos) {

  //randomizes speed and direction
  let speed = random(2, 5);
  if (random(1) > 0.5) {
    speed *= -1;
  }

  //randomly decides if there are 2 or 3 logs
  let numLogs = Math.floor(random(2, 4));
  let spacing = random(280, 490);

  //spawns the random number of logd
  for (let i = 0; i < numLogs; i++) {
    let logWidth = random(90, 130);

    let logX;
    //spawns the logs if they are moving right
    if (speed > 0) {
      logX = -logWidth - (i * spacing);
    }

    //spawns the logs if they are moving left
    else {
      logX = width + logWidth + (i * spacing);
    }

    //adds the logs into the log array with its values
    logArray.push(new Log(logX, yPos + 5, speed, logWidth, gridSize - 10));
  }
}


function spawnTrainRow(yPos) {
  let speed = trainSpeed;
  if (random(1) > 0.5) {
    speed *= -1;
  }
  let trainWidth = random(450, 600);
  let trainX = speed > 0 ? -trainWidth : width + trainWidth;

  trainArray.push(new Train(trainX, yPos + 5, speed, trainWidth, gridSize - 10));
}

function deleteAndManageInfiteGrid() {
  scrollY = lerp(scrollY, cameraY, 0.05);

  for (let i = rows.length - 1; i >= 0; i--) {
    let screenY = rows[i].y + scrollY;
    if (screenY > height + gridSize *2) {
      let targetY = rows[i].y;
      rows.splice(i, 1);
    }
  }
  
  carArray = carArray.filter(car => (car.y + scrollY) < height + gridSize*2);
  logArray = logArray.filter(log => (log.y + scrollY) < height + gridSize*2);
  trainArray = trainArray.filter(train => (train.y + scrollY) < height + gridSize*2);
  fastTrainArray = fastTrainArray.filter(train => (train.y + scrollY) < height + gridSize*2 && !train.offScreen);

  let highestY = height;
  for (let r of rows) {
    if (r.y < highestY) {
      highestY = r.y;
    }
  }

  while (highestY + scrollY > -gridSize * 2) {
    highestY -= gridSize;
    let type = random(["grass", "fastTrack", "road", "river", "road", "track", "road", "river", "grass"]);
    let newRow = { y: highestY, type: type };

    if (type === "fastTrack"){
      newRow.trackState = "waiting"; 
      newRow.timer = Math.floor(random(240, 360)); 
      if (random(1) > 0.5) {
      newRow.speedDirection = 1;
      }
      else {
        newRow.speedDirection = -1;
      }
    } 

    rows.push(newRow);

    if (type === "road") {
      spawnCarRow(highestY);
    }

    if (type === "river") {
      spawnRiver(highestY);
    }

    if (type === "track") {
      spawnTrainRow(highestY);
    }
  }
}

function checkCollisions() {
  let playerX = chicken.x - chicken.size / 2;
  let playerY = chicken.y + scrollY - chicken.size / 2;
  let playerW = chicken.size;
  let playerH = chicken.size;

  for (let i = 0; i < carArray.length; i++) {
    let car = carArray[i];
    let carX = car.x;
    let carY = car.y + scrollY;
    let carW = car.w;
    let carH = car.h;
    let hit = collideRectRect(playerX, playerY, playerW, playerH, carX, carY, carW, carH);
    if (hit) {
      state = "gameOver";
      break;
    }
  }


  for (let j = 0; j < trainArray.length; j++) {
    let train = trainArray[j];
    let trainX = train.x;
    let trainY = train.y + scrollY;
    let trainW = train.w;
    let trainH = train.h;
    let hit = collideRectRect(playerX, playerY, playerW, playerH, trainX, trainY, trainW, trainH);
    if (hit) {
      state = "gameOver";
      break;
    }
  }

  
  for (let j = 0; j < fastTrainArray.length; j++) {
    let fTrain = fastTrainArray[j];
    let fTrainX = fTrain.x;
    let fTrainY = fTrain.y + scrollY;
    let fTrainW = fTrain.w;
    let fTrainH = fTrain.h;
    let hit = collideRectRect(playerX, playerY, playerW, playerH, fTrainX, fTrainY, fTrainW, fTrainH);
    if (hit) {
      state = "gameOver";
      break;
    }
  }

  chicken.horizontalSpeed = 0;

  let isOnLog = false;

  for (let k = 0; k < logArray.length; k++) {
    let log = logArray[k];
    let logX = log.x;
    let logY = log.y + scrollY;
    let logW = log.w;
    let logH = log.h;
    let onLog = collideRectRect(playerX+10, playerY, playerW-20, playerH, logX, logY, logW, logH);

    if (onLog) {
      chicken.horizontalSpeed = log.speed;
      isOnLog = true;
      if (chicken.x > width || chicken.x < 0){
        state = "gameOver";
      }
      break;
    }

    
  }
  if (!isOnLog) {
    for (let r of rows) {
      if (r.type === "river") {
        if (chicken.y >= r.y && chicken.y < r.y + gridSize) {
          state = "gameOver";
          break;
        }
      }
    }
  }
}

function newGame() {
  carArray = [];
  logArray = [];
  trainArray = [];
  fastTrainArray = [];
  rows = [];
  cameraY = 0;
  scrollY = 0;
  currentDirection = "front";
  chicken = new Player();

  let totalRows = Math.ceil(height / gridSize) + 5;
  for (let i = 0; i < totalRows; i++) {
    let yPos = height - i * gridSize;
    generateInitialRow(yPos);
  }
}

