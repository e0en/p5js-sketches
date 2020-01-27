// most of code is taken from
// https://glitch.com/edit/#!/p5-example-noise-lines?path=sketch.js

function setup() {
  sizeX = windowWidth
  sizeY = windowHeight
  createCanvas(sizeX, sizeY)
}

function draw() {
  background(0)

  const nPoint = 500
  const stdev = 0.2
  const maxTime = 20.0
  const baseValue = 100.0

  const nLine = 10
  for (let i = 0; i < nLine; i++) {
    const startY = (i + 1) / (nLine + 1) * height
    push()
    translate(0, startY)
    geometricBrownianMotion(nPoint, stdev, maxTime, baseValue)
    pop()
  }
}

function windowResized() {
  sizeX = windowWidth
  sizeY = windowHeight
  resizeCanvas(windowWidth, windowHeight)
}

function geometricBrownianMotion(nPoint, stdev, maxTime, baseValue) {
  noFill()
  stroke(255)
  strokeWeight(2)

  let brownian = brownianMotion(nPoint)
  brownian = brownian.map(x => x * Math.sqrt(maxTime) * stdev)
  beginShape()
  for (let i = 0; i < nPoint; i++) {
    const t = i / (nPoint - 1)
    const x = lerp(0, width, t)
    const y = Math.exp(brownian[i])
    vertex(x, -y * baseValue + baseValue)
  }
  endShape()
}

function brownianMotion(nPoint) {
  let result = new Array(nPoint)
  result[0] = 0.0
  for (let i = 1; i < nPoint; i++) {
    result[i] = result[i - 1] + randomGaussian(0, 1) / Math.sqrt(nPoint)
  }
  return result
}
