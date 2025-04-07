uniform sampler2D tex;
varying vec2 vUv;
void main() {
    vec4 color = texture2D(tex, vUv);
    gl_FragColor = color;
}