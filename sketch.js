//Create variables here
var dog, happyDog,foodS,foodStock,database, fedTime, lastFed, feed, addFood, foodObj;
function preload(){
  //load images here
  dogImg= loadImage("dogImg.png");
  dogImg1= loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 400);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food();

  dog = createSprite(775,500/2,40,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  feed = createButton("feed drago");
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("add Food");
  addFood.position(800, 90);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background("white");
  foodObj.display()
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val()
  }
  )
  fill(0);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed + " PM", 550,70);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",550,70);
   }else{
     text("Last Feed : "+ lastFed + " AM", 550,70);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
};

