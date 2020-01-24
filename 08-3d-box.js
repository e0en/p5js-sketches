let clickX = null
let clickY = null
let clickAngleX = 0
let clickAngleY = 0
let angleX = 0
let angleY = 0
let boxAngle = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]


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
    angleX = (mouseY - clickY) * 0.01
    angleY = -(mouseX - clickX) * 0.01
    const xMat = rotateMatrixX(angleX)
    const yMat = rotateMatrixY(angleY)
    const mat = multiplyMatrices(xMat, yMat)
    applyMatrix(...mat)
  }
  applyMatrix(...boxAngle)
  box(200)
  resetMatrix()
}

function windowResized() {
  sizeX = windowWidth
  sizeY = windowHeight
  resizeCanvas(windowWidth, windowHeight)
}

function touchStarted() {
  clickX = mouseX
  clickY = mouseY
}

function touchEnded() {
  clickX = null
  clickY = null
  const xMat = rotateMatrixX(angleX)
  const yMat = rotateMatrixY(angleY)
  const rotMat = multiplyMatrices(xMat, yMat)
  boxAngle = multiplyMatrices(rotMat, boxAngle)
  angleX = 0.0
  angleY = 0.0
}

function mousePressed() {
  touchStarted()
}

function mouseReleased() {
  touchEnded()
}

function rotateMatrixX(angle) {
  return [
    1, 0, 0, 0,
    0, cos(angle), -sin(angle), 0,
    0, sin(angle), cos(angle), 0,
    0, 0, 0, 1
  ]
}

function rotateMatrixY(angle) {
  return [
    cos(angle), 0, sin(angle), 0,
    0, 1, 0, 0,
    -sin(angle), 0, cos(angle), 0,
    0, 0, 0, 1
  ]
}

function multiplyMatrices(a, b) {
  let result = new Array(16)
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var x = 0.0
      for (var k = 0; k < 4; k++) {
        x += a[i + k * 4] * b[k + j * 4]
      }
      result[i + j * 4] = x
    }
  }
  return result
}

function getPhase(cnt) {
  fps = 60
  t = cnt % fps
  return (t / fps) * TAU
}

