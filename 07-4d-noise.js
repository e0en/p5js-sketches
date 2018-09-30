function setup() {
  simplex = new SimplexNoise();

  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);

  gridSize = 32;
}

function draw() {
  var phase = getPhase(frameCount);
  background(0);

  var gridCountX = floor(sizeX / gridSize);
  var gridCountY = floor(sizeY / gridSize);
  var gridCount = min(gridCountX, gridCountY);
  var distUnit = 1.0 / (gridCount * gridSize);

  orbitSize = gridSize / 2.0;

  centerX = gridSize / 2.0;
  for (var i = 0; i < gridCountX; i++) {
    centerY = gridSize / 2.0;
    for (var j = 0; j < gridCountY; j++) {
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
  fieldSize = 2;
  phaseSize = 0.5;

  localField = simplex.noise4D(
    fieldSize * x,
    fieldSize * y,
    phaseSize * sin(phase),
    phaseSize * cos(phase));

  fill(localField * 255);
  ellipse(0, 0, localField * 2 * orbitSize);
}

function sigmoid(x) {
  return 1.0 / (1.0 + exp(-x));
}
