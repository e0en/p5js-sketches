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

  gridStep = 5
  gridSize = 0.1 * height * scale
  if (scale <= 0) {
    return
  }

  strokeColor = 127

  while (gridSize > 0.5 * height) {
    gridSize /= gridStep
  }
  console.log(scale, gridSize)

  while (gridSize > 0.01 * height) {
    // draw sub grids
    stroke(strokeColor)
    for (var xi = centerX; xi < width; xi += gridSize) {
      line(xi, 0.0, xi, height)
    }
    for (var xi = centerX; xi > 0; xi -= gridSize) {
      line(xi, 0.0, xi, height)
    }
    for (var yi = centerY; yi < height; yi += gridSize) {
      line(0.0, yi, width, yi)
    }
    for (var yi = centerY; yi > 0; yi -= gridSize) {
      line(0.0, yi, width, yi)
    }
    gridSize /= gridStep
    strokeColor *= 0.8
  }

  // draw the main gridlines
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
