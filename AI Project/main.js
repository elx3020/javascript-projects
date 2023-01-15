
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const N = 200;
const cars = createCarts(N);
let bestCar = cars[0]; 
if(localStorage.getItem('bestBrain')){
  for(let i=0;i<cars.length;i++){
    cars[i].brain =JSON.parse(localStorage.getItem('bestBrain'));
    if(i!=0){
      NeuralNetwork.mutate(cars[i].brain,0.15);
    }
  }
}
// const car = new Car(road.getLineCenter(1), 100, 30, 50,'AI',0.8);
const traffic = [
  new Car(road.getLineCenter(1),-100,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(0),-300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-500,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-500,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-700,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(0),-700,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-900,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-900,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-1100,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(0),-1300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-1300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-1500,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-1500,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-1700,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-1700,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-2000,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(0),-2200,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-2400,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-2600,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-2600,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-2900,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(1),-3300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(0),-3300,30,50,'DUMMY',0.6),
  new Car(road.getLineCenter(2),-3500,30,50,'DUMMY',0.6),





]

animate();

function save(){
  localStorage.setItem('bestBrain',JSON.stringify(bestCar.brain));
}


function discard(){
  localStorage.removeItem('bestBrain');
}

function createCarts(N){
  let cars = []
  for(let i =0; i< N;i++){
    cars.push(new Car(road.getLineCenter(1), 100, 30, 50,'AI',1));
  }
  return cars;
}


function animate() {


  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -bestCar.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++){
    traffic[i].update(road.borders,[]); //doesn't collide with itself or player car 
    traffic[i].draw(ctx,'red');
  } 

  ctx.globalAlpha=0.2;
  cars.forEach(car => {
    car.update(road.borders,traffic);
    car.draw(ctx,'blue');
  })
  bestCar = cars.find(car => car.y == Math.min(...cars.map(car => car.y)) );
  ctx.globalAlpha=1
  bestCar.draw(ctx,'blue',true);
  

  requestAnimationFrame(animate);
}
