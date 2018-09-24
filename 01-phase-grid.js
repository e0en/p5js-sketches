function setup() {
  size = 400;
  createCanvas(size, size);
}

function draw() {
  phase = getPhase();
  background(0);

  gridCount = 5;
  gridSize = size / gridCount;
  pointSize = gridSize / 10;
  orbitSize = gridSize / 2;

  for (x = 0; x < gridCount; x++) {
    centerX = gridSize * x + gridSize / 2;
    for (y = 0; y < gridCount; y++) {
      centerY = gridSize * y + gridSize / 2;
      drawOrbit(centerX, centerY, phase);
    }
  }
}

function getPhase() {
  fps = 30;
  t = frameCount % fps;
  phase = t / fps * TAU;
  return phase;
}

function drawOrbit(x, y, phase) {
  phase_x = sin(phase);
  phase_y = cos(phase);

  noFill();
  stroke(127);
  ellipse(x, y, orbitSize);

  stroke(255);
  ellipse(x + orbitSize / 2 * phase_x,
          y + orbitSize / 2 * phase_y,
          pointSize);
}
