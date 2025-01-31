const canvas = document.getElementById("myCanvas")
canvas.width = 200;


const ctx = canvas.getContext("2d")
const car = new Car(100, 100, 30, 50)
car.draw(ctx)

animate()
function animate(){
    car.update();
    canvas.height = window.innerHeight; //resize canvas to "clear" and simulate
    //car movement instead of an elongated line as we trigger event listeners

    car.draw(ctx);

    requestAnimationFrame(animate)
}