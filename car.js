class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sensor = new Sensor(this)
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed =3;
        this.friction=0.05;
        this.angle=0; //car can exceed maxSpeed at left, right movements, need this to save physics
        this.controls = new Controls()
    }

    #move(){
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;

        }

        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2
        }
        if(this.speed>0){
            this.speed-=this.friction
        }
        if(this.speed < 0) {  
            this.speed += this.friction;
        }
        //if speed is not exactly zero, friction will continue to move car by slight val

        if (Math.abs(this.speed) < this.friction){
            this.speed=0;

        }

        if (this.speed !=0) { //speed polarity is direction
            const flip = this.speed>0?1:-1; // if flipping direction (going backwards) then flip controlsfy
            if (this.controls.left) {
                this.angle += 0.03*flip; //this way left is always left
            }
            if (this.controls.right){
                this.angle -=0.03*flip; //as oppose to left turning right, when going backwards
            }
        }

        

        //car will rotate, but not move in direction of angle
        //but rather a linear up and down, regardless of car position
        //using the unit circle, radius of 1, sin is between -1 and 1
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y); //translate based on where we want ctx centered at
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width/2, //x is gonna be center
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.restore(); //must restore otherwise translate and rotate infinitely

        this.sensor.draw(ctx)
    }

    update(roadBorders){
        this.#move()
        this.sensor.update(roadBorders)
    }
}