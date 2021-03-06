function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
  noiseSeed(0);
}

function draw() {
  phase = getPhase(frameCount);
  background(0);

  gridSize = 32;
  gridCountX = floor(sizeX / gridSize);
  gridCountY = floor(sizeY / gridSize);
  gridCount = min(gridCountX, gridCountY);
  orbitSize = gridSize / 2.0;
  distUnit = 1.0 / (gridCount * gridSize);

  centerX = gridSize / 2.0;
  for (x = 0; x < gridCountX; x++) {
    centerY = gridSize / 2.0;
    for (y = 0; y < gridCountY; y++) {
      push();
      translate(centerX, centerY);
      drawOrbit(centerX * distUnit, centerY * distUnit, phase);
      pop();
      centerY += gridSize;
    }
    centerX += gridSize;
  }
}

function windowResized() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function getPhase(cnt) {
  fps = 60;
  t = cnt % fps;
  return (t / fps) * TAU;
}

noisePhases = new Array(3);
function drawOrbit(x, y, phase) {
  xPhase = 0.1 * TAU * x + phase;
  yPhase = 0.1 * TAU * y + phase;

  sphericalCoordinates(xPhase, yPhase, noisePhases);

  fieldSize = 8;
  localField = noise(fieldSize * noisePhases[0], fieldSize * noisePhases[1], fieldSize * noisePhases[2]);
  localField = sigmoid(10 * (localField - 0.5));

  fill(localField * 255);
  ellipse(0, 0, localField * 2 * orbitSize);
}

function sigmoid(x) {
  return 1.0 / (1.0 + exp(-x));
}

function sphericalCoordinates(phase1, phase2, result) {
  result[0] = sin(phase1) * cos(phase2);
  result[1] = sin(phase1) * sin(phase2);
  result[2] = cos(phase2);
}
