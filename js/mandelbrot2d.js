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

// generate 24 random colors
const colors = [`rbg(255,0,0)`, `rbg(0,255,0)`, `rbg(0,0,0)`];

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

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function hsv_to_hex(h, s, v, i = false) {
  color = HSVtoRGB(h, s, v);
  return (
    "#" +
    componentToHex(Math.floor(color.r)) +
    componentToHex(Math.floor(color.g)) +
    componentToHex(Math.floor(color.b))
  );
}

function rgb_to_hex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const l = [];
const MAX_ITERATION = 80;

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

      const [m, isMandelbrotSet] = mandelbrot(complex);

      ctx.fillStyle = `hsl(${Math.floor(360 * (m / MAX_ITERATION))}, 100%, ${
        isMandelbrotSet ? 0 : 50
      }%)`;
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

function mandelbrot(c, n = 0, z = { r: 0, i: 0 }) {
  // starting at z=0
  do {
    p = im_square(z);
    z = im_add(p, c);
    d = im_origin(z);
    n += 1;
  } while (d <= 2 && n < MAX_ITERATION);

  return [n, d <= 2];
}

draw();
