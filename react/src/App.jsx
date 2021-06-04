import React from "react";
import { Shaders, Node, GLSL, Uniform } from "gl-react";
import { Surface } from "gl-react-dom";
import shader from "../shaders/mandelbrot2d.glsl?raw";

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`${shader}`,
  },
});

const WIDTH = 1000
const HEIGHT = 1000
const size = [WIDTH,HEIGHT]

function App() {


  return (
    <Surface width={WIDTH} height={HEIGHT}>
      <Node shader={shaders.helloGL} uniforms={{size}}/>
    </Surface>
  );
}

export default App;
