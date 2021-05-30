var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

const REAL_SET = { start: -2, end: 1 }
const IMAGINARY_SET = { start: -1, end: 1 }

const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)

function draw() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            complex = {
                x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
                y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
            }

            const [m, isMandelbrotSet] = mandelbrot(complex)
            ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % colors.length - 1) + 1]
            ctx.fillRect(i, j, 1, 1)
        }
    }
}
