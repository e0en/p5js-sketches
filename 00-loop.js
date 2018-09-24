function setup() {
  size = 400;
  createCanvas(size, size);
}

function draw() {
  fps = 30;
  t = frameCount % fps;
  phase = t / fps * TAU;
  background(0);

  pointSize = size / 10;
  orbitSize = size / 2;

  centerX = size / 2;
  centerY = size / 2;

  drawOrbit(centerX, centerY, phase);
}

function drawOrbit(x, y, phase) {
  phase_x = sin(phase);
  phase_y = cos(phase);

  noFill();
  stroke(127);
  ellipse(x, y, orbitSize);

  stroke(255);
  fill(255);
  ellipse(x + orbitSize / 2 * phase_x,
          y + orbitSize / 2 * phase_y,
          pointSize);
}
