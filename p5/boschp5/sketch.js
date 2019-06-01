let t = 0; // time variable
const canvasHeight = 600;
const canvasWidth = 1000;

data = data.sort((d1, d2) => {
  return d1.timestamp < d2.timestamp;
  /*if (d1.timestamp < d2.timestamp) {
    return -1;
  }
  if (d1.timestamp > d2.timestamp) {
    return 1;
  }
  return 0;*/
});

var zCoords = data.map(d => d.location[2]);
var xCoords = data.map(d => d.location[0]);

var minZ = Math.min.apply(null, zCoords),
  maxZ = Math.max.apply(null, zCoords);

var minX = Math.min.apply(null, xCoords),
  maxX = Math.max.apply(null, xCoords);

data.forEach(d => {
  d.location[0] = ((d.location[0] - minX) / (maxX - minX)) * canvasWidth;
  d.location[2] = ((d.location[2] - minZ) / (maxZ - minZ)) * canvasHeight;
});

var muszerek = {};

data.forEach(d => {
  !muszerek[d.location[0]]
    ? (muszerek[d.location[0]] = 1)
    : (muszerek[d.location[0]] += 1);
});

console.log(Object.values(muszerek));

console.log(
  (data[data.length - 1].timestamp - data[0].timestamp) / 1000 / 3600
);

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //noStroke();
  fill(40, 200, 40);
}

function draw() {
  //background(10, 10); // translucent background (creates trails)
  line(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
  line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);

  data.forEach(d => circle(d.location[0], d.location[2], 10));

  // make a x and y grid of ellipses
  /*for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }*/

  t = t + 0.01; // update time
}
