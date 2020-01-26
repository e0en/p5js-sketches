// most of code is taken from
// https://glitch.com/edit/#!/p5-example-noise-lines?path=sketch.js

function setup() {
  sizeX = windowWidth
  sizeY = windowHeight
  createCanvas(sizeX, sizeY)
}

function draw() {
  background(0)

  const frequency = 1.0
  const amplitude = 0.5
  const ts = millis() / 1000.0

  const nLine = 10
  for (let i = 0; i < nLine; i++) {
    const startY = (i + 1) / (nLine + 1) * height
    drawNoiseLine(startY, frequency, amplitude * height, ts * 0.5)
  }
}

function windowResized() {
  sizeX = windowWidth
  sizeY = windowHeight
  resizeCanvas(windowWidth, windowHeight)
}

function drawNoiseLine(startY, frequency, amplitude, ts) {
  noFill()
  stroke(255)
  strokeWeight(5)

  const steps = 100
  beginShape()
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    const x = lerp(0, width, t)
    const dy = 2 * (noise(t * frequency + ts, startY / height * frequency, ts) - 0.5)
    const y = startY + amplitude * dy
    vertex(x, y)
  }
  endShape()
}
