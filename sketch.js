var dog,happydog,foodS,foodStock,database;

function preload()
{
	dog1= loadImage("Dog.png");
 happydog = loadImage("happydog.png");
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('food');
  foodStock.on("value",readStock);


  dog= createSprite(300,250,1,1);
   dog.addImage(dog1);
   dog.scale=0.25;

  
}


function draw() {  

  background(46,139,87);
 
  stroke(2);
  fill("white");
  textSize(20);
  text("press up arrow to change img" , 30,30);

  text("remaining food:" + foodS, 300,460);




drawSprites();

  if(keyWentDown(UP_ARROW))
  {
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(happydog);
  }

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{

  if(x<=0)
    {
      x=0;
    }
    else
    {
      x=x-1;
    }
  database.ref('/').update({
    Food:x
  })
}
