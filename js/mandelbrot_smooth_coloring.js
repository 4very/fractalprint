var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// set canvas to window resolution
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

// axis
const REAL_SET = { start: -2, end: 1 };
const IMAGINARY_SET = { start: -1, end: 1 };

const MAX_ITERATION = 80;
const B = 256;

function im_mult(c1, c2) {
  cp = {
    r: c1.r * c2.r - c1.i * c2.i,
    i: c1.r * c2.i + c1.i * c2.r,
  };
  return cp;
}

function im_square(c) {
  return im_mult(c, c);
}

function im_add(c1, c2) {
  cp = {
    r: c1.r + c2.r,
    i: c1.i + c2.i,
  };
  return cp;
}

function im_sub(c1, c2) {
  cp = {
    r: c1.r - c2.r,
    i: c1.i - c2.i,
  };
  return cp;
}

function im_dis(c1, c2) {
  d = Math.pow(c2.r - c1.r, 2) + Math.pow(c2.i - c1.i, 2);
  return Math.sqrt(d);
}

function im_origin(c) {
  return im_dis({ r: 0, i: 0 }, c);
}

function dot(c1, c2) {
  return c1.r * c2.r + c1.i * c2.i;
}

function self_dot(c) {
  return dot(c, c);
}

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

      const m = mandelbrot(complex);

      ctx.fillStyle = `hsl(${360 * (m / MAX_ITERATION)}, 100%, ${
        m == 0 ? 0 : 50
      }%)`;
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

function mandelbrot(c, n = 0, z = { r: 0, i: 0 }) {
  c2 = self_dot(c);
  // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm
  if (256 * c2 * c2 - 96 * c2 + 32 * c.r - 3 < 0) return 0;
  // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm
  if (16 * (c2 + 2 * c.r + 1) - 1 < 0) return 0;

  for (let i = 0; i < MAX_ITERATION; i++) {
    z = im_add(im_square(z), c);
    if (self_dot(z) > B * B) break;
    n += 1;
  }

  if (n > MAX_ITERATION - 1) return 0;

  sm = n - Math.log2(Math.log2(dot(z, z))) + 4;
  return [sm];
}

draw();
