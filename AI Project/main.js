
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLineCenter(1), 100, 30, 50,'AI',0.8);
const traffic = [new Car(road.getLineCenter(1),-100,30,50,'DUMMY',0.6)]

animate();

function animate() {


  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++){
    traffic[i].update(road.borders,[]); //doesn't collide with itself or player car 
    traffic[i].draw(ctx,'red');
  }
  car.update(road.borders,traffic);
  car.draw(ctx,'blue');
  requestAnimationFrame(animate);
}
