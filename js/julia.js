var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// set canvas to window resolution
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

// axis
const REAL_SET = { start: -2, end: 2 };
const IMAGINARY_SET = { start: -2, end: 2 };

// start

// generate 24 random colors
const colors = new Array(16)
  .fill(0)
  .map((_, i) =>
    i === 0 ? "#000" : `#${(((1 << 24) * Math.random()) | 0).toString(16)}`
  );

function draw() {
  // iterate through each pixel
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      // generate the complex number
      complex = {
        // mx + b
        r: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
        i:
          IMAGINARY_SET.start +
          (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start),
      };

      const [m, isJuliaSet] = julia(complex);
      ctx.fillStyle = colors[isJuliaSet 
        ? 0 
        : (m % colors.length) - 1 + 1];
      ctx.fillRect(i, j, 1, 1);
    }
  }
}
const MAX_ITERATION = 6;
function julia(z) {
  // starting at z=0
  let c = { r: 0.285, i: 0 },
    n = 0,
    p,
    d;
  do {
    // do Z^2
    p = {
      r: Math.pow(z.r, 2) - Math.pow(z.i, 2),
      i: 2 * z.r * z.i,
    };
    // add c
    z = {
      r: p.r + c.r,
      i: p.i + c.i,
    };
    // |z|
    d = Math.sqrt(Math.pow(z.r, 2) + Math.pow(z.i, 2));
    n += 1;
  } while (d <= 2 && n < MAX_ITERATION);
  return [n, d <= 2];
}

draw();
