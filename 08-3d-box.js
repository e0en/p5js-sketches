let clickX = null
let clickY = null
let clickAngleX = 0
let clickAngleY = 0
let angleX = 0
let angleY = 0

function setup() {
  sizeX = windowWidth
  sizeY = windowHeight
  createCanvas(sizeX, sizeY, WEBGL)

  gridSize = 32
}

function draw() {
  const phase = getPhase(frameCount)
  background(0)

  if (clickX !== null) {
    angleX = clickAngleX - (mouseY - clickY) * 0.01
    angleY = clickAngleY + (mouseX - clickX) * 0.01
  }
  rotateX(angleX)
  rotateY(angleY)
  box(200)
}

function windowResized() {
  sizeX = windowWidth
  sizeY = windowHeight
  resizeCanvas(windowWidth, windowHeight)
}

function touchStarted() {
  clickX = mouseX
  clickY = mouseY
  clickAngleX = angleX
  clickAngleY = angleY
}

function touchEnded() {
  clickX = null
  clickY = null
}


function mousePressed() {
  touchStarted()
}

function mouseReleased() {
  touchEnded()
}

function getPhase(cnt) {
  fps = 60
  t = cnt % fps
  return (t / fps) * TAU
}

