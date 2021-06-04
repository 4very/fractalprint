import React from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import shader from "../shaders/test.glsl?raw"

const shaders = Shaders.create({
  helloGL: {
    // This is our first fragment shader in GLSL language (OpenGL Shading Language)
    // (GLSL code gets compiled and run on the GPU)
    frag: GLSL`${shader}`,
  },
});

function App() {
  return (
    <Surface width={300} height={300}>
      <Node shader={shaders.helloGL} />
    </Surface>
  );
}

export default App;
