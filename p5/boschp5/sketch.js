let t = 0; // time variable
const canvasHeight = 600;
const canvasWidth = 1000;

var times = data.map(d => d.timestamp);

var minTime = Math.min.apply(null, times),
  maxTime = Math.max.apply(null, times);

data.forEach(d => {
  d.timestamp = ((d.timestamp - minTime) / (maxTime - minTime)) * 1000;
  console.log(d.timestamp);
});

console.log(data[0].timestamp);

data = data.sort((d1, d2) => {
  if (d1.timestamp < d2.timestamp) {
    return -1;
  }
  if (d1.timestamp > d2.timestamp) {
    return 1;
  }
  return 0;
});

// mapping location
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

var sensors = {};

// aggregate sensors
data.forEach(d => {
  if (!sensors[d.location[0]]) {
    sensors[d.location[0]] = {};
    sensors[d.location[0]].products = 1;
    sensors[d.location[0]].location = d.location;
    sensors[d.location[0]].timestamps = [];
  } else {
    sensors[d.location[0]].products += 1;
  }

  sensors[d.location[0]].timestamps.push(d.timestamp);
});

sensors = Object.values(sensors);

var sensorsGroupedByProductNumber = {};

sensors.forEach(s => {
  if (!sensorsGroupedByProductNumber[s.products]) {
    sensorsGroupedByProductNumber[s.products] = [];
  }
  sensorsGroupedByProductNumber[s.products].push(s);
});

console.log(sensorsGroupedByProductNumber);

Object.values(sensorsGroupedByProductNumber).sort((s1, s2) => {
  if (s1.timestamp < s2.timestamp) {
    return -1;
  }
  if (s1.timestamp > s2.timestamp) {
    return 1;
  }
  return 0;
});

console.log(
  (data[data.length - 1].timestamp - data[0].timestamp) / 1000 / 3600
);

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  // noStroke();
  fill(40, 200, 40);
}

function draw() {
  smooth();
  //background(10, 10); // translucent background (creates trails)
  line(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
  line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);

  strokeWeight(2);
  const productNumbers = Object.keys(sensorsGroupedByProductNumber);
  for (let i = 0; i < productNumbers.length; ++i) {
    if (+productNumbers[i] === 2000) {
      fill(255, 0, 0);
    }

    let sameSensors = sensorsGroupedByProductNumber[productNumbers[i]];
    sameSensors.forEach((sensor, index) => {
      if (index !== sameSensors.length - 1) {
        line(
          sensor.location[0],
          sensor.location[2],
          sameSensors[index + 1].location[0],
          sameSensors[index + 1].location[2]
        );
      }
      circle(sensor.location[0], sensor.location[2], 10);

      text(sensor.timestamps[0], sensor.location[0] + 5, sensor.location[2]);
    });
    fill(40, 200, 40);
  }

  t = t + 0.01; // update time
}
