uniform float uTime;
uniform sampler2D uTexture;
uniform float uSpeed;
uniform float uDistortion;
varying vec2 vUv;

void main() {
    // The base of the clouds move on the roll
    vec2 uv = vUv;
    uv.x += uTime * uSpeed;

    // Add a perturbation effect
    uv.y += sin(uv.x * 10.0 + uTime) * uDistortion;

    // Sample texture color
    vec4 color = texture2D(uTexture, uv);

    // Outputs the final color
    gl_FragColor = color;
}