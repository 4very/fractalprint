import "./style.css";

import * as PIXI from "pixi.js";
import { shader, old_shader } from "./shaders";

const WIDTH = 900;
const HEIGHT = 900;

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

const filter = new PIXI.Filter(undefined, shader, {
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
