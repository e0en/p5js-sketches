function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
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

function drawOrbit(x, y, phase) {
  noisePhaseX = cos(phase + x);
  noisePhaseY = sin(phase + y);

  localField = noise(8 * noisePhaseX, 8 * noisePhaseY);
  localField = sigmoid(10 * (localField - 0.5));

  fill(localField * 255);
  noStroke();
  ellipse(0, 0, localField * 2 * orbitSize);
}

function sigmoid(x) {
  return 1.0 / (1.0 + exp(-x));
}
