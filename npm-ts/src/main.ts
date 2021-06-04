import "./style.css";

import * as PIXI from "pixi.js";
import { mandelbrot2d, example_shader, julia } from "./shaders";
const shader = julia;


const WIDTH = 1000;
const HEIGHT = 1000;

let app = new PIXI.Application({ width: WIDTH, height: HEIGHT });

document.body.appendChild(app.view);

const container = new PIXI.Container();
container.filterArea = new PIXI.Rectangle(
  0,
  0,
  app.screen.width,
  app.screen.height
);
app.stage.addChild(container);


const fixed_shader = shader.replace("uniform vec2 u_resolution;","uniform vec4 inputSize;").replaceAll("u_resolution","inputSize");
console.log(fixed_shader)

const filter = new PIXI.Filter(undefined, fixed_shader, {
  mouse: new PIXI.Point(),
});
container.filters = [filter];

let juliaI = 0.4;
app.ticker.add(() => {
  juliaI += 0.0005;
  if (juliaI >= 0.55) juliaI = 0.4;
  filter.uniforms.mouse.copyFrom(app.renderer.plugins.interaction.mouse.global);
  filter.uniforms.juliaI = juliaI;
});

app.start();
