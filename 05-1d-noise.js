function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
}

function draw() {
  phase = getPhase(frameCount);
  background(0);

  gridSize = 16;
  gridCount = floor(sizeX / gridSize);
  orbitSize = gridSize / 2.0;
  distUnit = 1.0 / (gridCount * gridSize);

  centerX = gridSize / 2.0;
  for (x = 0; x < gridCount; x++) {
    push();
    translate(centerX, 0.5 * sizeY);
    drawOrbit(centerX * distUnit, phase);
    pop();
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

function drawOrbit(x, phase) {
  localPhase = phase + x * TAU / 2;
  noisePhaseX = cos(localPhase);
  noisePhaseY = sin(localPhase);

  localField = noise(noisePhaseX, noisePhaseY);

  push();

  translate(0, (localField - 0.5) * sizeY - 0.5 * orbitSize);
  fill(255);
  noStroke();
  ellipse(0, 0, orbitSize);

  pop();
}
