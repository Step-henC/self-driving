const canvas = document.getElementById("myCanvas")
canvas.width = 200;


const ctx = canvas.getContext("2d")
const road = new Road(canvas.width/2, canvas.width*0.9, 3) //make width 90% of width to see margins
const car = new Car(road.getLaneCenter(1), 100, 30, 50)

animate()
function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight; //resize canvas to "clear" and simulate

    //this allows road to move instead of car moving
    ctx.save()//along with restore at bottom
    ctx.translate(0,-car.y+canvas.height*.7) //keep car at 70% height of canvas to see ahead
    //draw road first so car is on top of it
    road.draw(ctx)
    //car movement instead of an elongated line as we trigger event listeners

    car.draw(ctx);

    ctx.restore()
    requestAnimationFrame(animate)
}