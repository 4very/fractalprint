precision highp float;

uniform vec2 size;

vec2 xrange = vec2(-1, 1);
vec2 yrange = vec2(-1, 1);

const int MAX_ITERATIONS = 512;

float mandelbrot(in vec2 c) {

    float c2 = dot(c, c);
   // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm
    if(256.0 * c2 * c2 - 96.0 * c2 + 32.0 * c.x - 3.0 < 0.0)
        return 0.0;
   // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm
    if(16.0 * (c2 + 2.0 * c.x + 1.0) - 1.0 < 0.0)
        return 0.0;

    const float B = 256.0;
    float l = 0.0;
    vec2 z = vec2(0.0);
    for(int i = 0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if(dot(z, z) > (B * B))
            break;
        l += 1.0;
    }

    if(l > float(MAX_ITERATIONS) - 1.0)
        return 0.0;
    float sl = l - log2(log2(dot(z, z))) + 4.0;

    return sl;
}

void main() {
    vec3 col = vec3(0.0);

    vec2 cord = vec2(xrange.x + (gl_FragCoord.x / size.x) * (xrange.y - xrange.x), yrange.x + (gl_FragCoord.y / size.y) * (yrange.y - yrange.x));
    float l = mandelbrot(cord);

    col += 0.5 + 0.5 * cos(3.0 + l * 0.15 + vec3(0.0, 0.6, 1.0));

    gl_FragColor = vec4(col, 1.0);
}