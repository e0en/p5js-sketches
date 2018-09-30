function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);
  noiseSeed(0);

  sinh_map = new Array(1000);
  cosh_map = new Array(1000);

  for (i = 0; i < 1000; i++) {
    sinh_map[i] = sinh(TAU / i - PI);
  }

  for (i = 0; i < 1000; i++) {
    cosh_map[i] = cosh(TAU / i);
  }
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

  toroidalCoordinate(xPhase, yPhase, 1.0, noisePhases);

  fieldSize = 2;
  localField = noise(fieldSize * noisePhases[0], fieldSize * noisePhases[1], fieldSize * noisePhases[2]);
  localField = sigmoid(10 * (localField - 0.5));

  fill(localField * 255);
  ellipse(0, 0, localField * 2 * orbitSize);
}

function sigmoid(x) {
  return 1.0 / (1.0 + exp(-x));
}

// check https://en.wikipedia.org/wiki/Toroidal_coordinates
function toroidalCoordinate(phase1, phase2, tau, result) {
  if (phase1 > TAU) {
    while (phase1 > TAU) {
      phase1 -= TAU;
    }
  }

  if (phase2 > TAU) {
    while (phase2 > TAU) {
      phase2 -= TAU;
    }
  }

  tau_idx = int(tau / TAU * 1000) % 1000;
  denom = cosh_map[tau_idx] - cos(phase1 - PI);
  common_coeff = sinh_map[tau_idx] / denom;
  result[0] = common_coeff * cos(phase2);
  result[1] = common_coeff * sin(phase2);
  result[2] = sin(phase1 - PI) / denom;
}

function sinh(x) {
  return (exp(x) - exp(-x)) / 2.0;
}

function cosh(x) {
  return (exp(x) + exp(-x)) / 2.0;
}

