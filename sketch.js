var player;
var food;
var debugState=false;
var infoP;

var maxPop=5;
var population;
var mutationRate=0.01;

function setup()
{
    createCanvas(800,600);
    food = new Food(10,200)
    population = new Population(mutationRate,maxPop)
    infoP = createP();
}

function draw()
{
  background(51)
  translate(width/2,height/2);

  population.draw();
  population.update();
  population.generate();


  food.draw();
  food.update();
  drawboundaries();
  displayInfo();
}

function getFood()
{
  return food.pool;
}

function setFood(newFood)
{
    food.pool=newFood;
}

function drawboundaries()
{
  rectMode(CENTER);
  noFill();
  stroke(255)
  rect(0,0,width-20,height-20)
}

function getDebugState()
{
    return debugState;
}

function keyPressed()
{
  if(keyCode===68)
  {
    debugState=!debugState;
  }
}
function displayInfo()
{
  infoP.html("Press 'D' to show debug info");
}
