class Food{
    constructor(){
        this.image = loadImage("milk.png");
        this.foodStock = 0;
        this.lastFed = null;
    }
    readfoodStock(){
        database.ref("Food").on("value",function(data){
            foodS=data.val();
        })
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
        var X = 80;
        var Y = 100;
        imageMode(CENTER)
        image(this.image,720,220,70,70);
        if (this.foodStock !== 0){
            for (var i = 0; i<this.foodStock;i++){
                if(i%10 === 0){
                    X = 80;
                    Y = Y+50
                }
                image(this.image, X, Y, 50, 50);
                X = X+30
            }
        }
    }
}

