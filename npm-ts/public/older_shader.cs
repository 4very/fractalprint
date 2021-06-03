  precision highp float;
    varying vec2 vTextureCoord;
    uniform vec2 mouse;
    uniform vec4 inputSize;
    uniform vec4 outputFrame;
    uniform float time;
    uniform float juliaI;
    // Complex number ADD operation
    vec2 cadd(vec2 a, vec2 b) {
       return vec2(a.x+b.x, a.y+b.y);
    }
    
    // Complex number SUB operation
    vec2 csub(vec2 a, vec2 b) {
       return vec2(a.x-b.x, a.y-b.y);
    }
    
    // Complex number MULT operation
    vec2 cmult(vec2 a, vec2 b) {
       return vec2(
          a.x*b.x - a.y*b.y,
          a.x*b.y + a.y*b.x);
    }
    
    // Complex number MODULUS operation
    float cmodulus(vec2 v) {
       return sqrt( v.x*v.x + v.y*v.y);
    }
    
    float _mod(float a, float b) {
      return a - (b * floor(a/b));
    }
    // Generate a julia fractal
    const int iter = 120;
    int c_julia(float x, float y) {
       vec2 cz = vec2(x, y);
       vec2 cc = vec2(0.32, juliaI);
       // vec2 cc = vec2(0.32, 0.505);
       // vec2 cc = vec2(0.35, 0.5);
       
    
       int n = 0;
       for (int n = 0; n < iter; n++) {
          cz = cmult(cz, cz);
          cz = cadd(cz, cc);
          if (cmodulus(cz) > 4.0) return n;
       }
       return 0;
    }
    void main() {
      float g = 6.0;
      float check = 0.5 * g;
      vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
      float x = (screenPos.x / 900.0) - 0.5;
      float y = (screenPos.y / 900.0) - 0.5;
      x *= 3.05;
      y *= 3.05;
      int result = c_julia(x, y);
      if (result > 30) {
         float fresult = float(result);
         gl_FragColor = vec4(fresult/90.0, 0.75/log(fresult), fresult/50.0, 0.5);
      } else {
         gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
      }
      
      /*
      if (_mod(screenPos.x,  g) <= check || _mod(screenPos.y, g) <= check) {
        gl_FragColor = vec4(0, 0, 0, 0);
      } else {
        gl_FragColor = vec4(screenPos.x / 900.0, 0.4, 0.2, 0.5);
      }
      */
    }