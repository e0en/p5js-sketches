var zoomScale = 1.0

function setup() {
  sizeX = windowWidth;
  sizeY = windowHeight;
  createCanvas(sizeX, sizeY);

  gridSize = 32;
}

function draw() {
  var phase = getPhase(frameCount)
  background(0)
  zoomScale *= 1.02
  drawAxis(zoomScale)
}

function drawAxis(scale) {
  centerX = 0.5 * width
  centerY = 0.5 * height

  screenSize = max(width, height)

  gridStep = 5
  gridSize = 0.1 * screenSize * scale
  if (scale <= 0) {
    return
  }

  while (gridSize > 0.5 * screenSize) {
    gridSize /= gridStep
  }

  console.log(scale, gridSize)

  thickness = 4
  strokeColor = min(255 * Math.sqrt(gridSize / screenSize), 255)

  while (gridSize > 0.01 * screenSize) {
    // draw sub grids
    strokeWeight(thickness)
    stroke(strokeColor)
    for (var xi = centerX + gridSize; xi < width; xi += gridSize) {
      line(xi, 0.0, xi, height)
    }
    for (var xi = centerX - gridSize; xi > 0; xi -= gridSize) {
      line(xi, 0.0, xi, height)
    }
    for (var yi = centerY + gridSize; yi < height; yi += gridSize) {
      line(0.0, yi, width, yi)
    }
    for (var yi = centerY - gridSize; yi > 0; yi -= gridSize) {
      line(0.0, yi, width, yi)
    }
    gridSize /= gridStep
    strokeColor = min(255 * Math.sqrt(gridSize / screenSize), 255)
    if (thickness > 1.0) {
      thickness *= 0.5
    }
  }

  // draw the main gridlines
  strokeWeight(1)
  stroke(255)
  line(0.0, centerY, width, centerY)
  line(centerX, 0.0, centerX, height)
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
