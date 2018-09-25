function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
  noiseSeed(0);
}

function draw() {
  phase = getPhase();
  background(0);

  gridSize = 50;
  gridCountX = floor(sizeX / gridSize);
  gridCountY = floor(sizeY / gridSize);
  pointSize = gridSize / 10;
  orbitSize = gridSize / 3;

  for (x = 0; x < gridCountX; x++) {
    centerX = gridSize * x + gridSize / 2;
    for (y = 0; y < gridCountY; y++) {
      centerY = gridSize * y + gridSize / 2;
      push();
      translate(centerX, centerY);
      drawOrbit(centerX / gridCountX, centerY / gridCountY, phase);
      pop();
    }
  }
}

function windowResized() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function getPhase() {
  fps = 30;
  t = frameCount % fps;
  phase = t / fps * TAU;
  return phase;
}

function drawOrbit(x, y, phase) {
  localPhase = phase + map(noise(x, y), 0, 1, 0, TAU);

  phaseX = sin(localPhase);
  phaseY = cos(localPhase);

  noFill();
  stroke(127);
  line(0, 0, 
       orbitSize * phaseX,
       orbitSize * phaseY,
  );

  stroke(255);
  ellipse(orbitSize * phaseX,
          orbitSize * phaseY,
          pointSize);
}
