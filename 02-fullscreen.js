function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
}

function draw() {
  phase = getPhase();
  background(0);

  gridSize = 50;
  gridCountX = floor(sizeX / gridSize);
  gridCountY = floor(sizeY / gridSize);
  pointSize = gridSize / 10;
  orbitSize = gridSize / 4;

  for (x = 0; x < gridCountX; x++) {
    centerX = gridSize * x + gridSize / 2;
    for (y = 0; y < gridCountY; y++) {
      centerY = gridSize * y + gridSize / 2;
      push();
      translate(centerX, centerY);
      drawOrbit(phase);
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

function drawOrbit(phase) {
  phaseX = sin(phase);
  phaseY = cos(phase);

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
