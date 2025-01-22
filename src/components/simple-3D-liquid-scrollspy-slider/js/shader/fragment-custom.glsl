uniform float u_time;
uniform float u_progress;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform sampler2D u_textureDips;
varying vec2 v_uv;

// Water ripple (adding u_progress-based intensity control)
float ripple(vec2 uv, vec2 center, float time, float progress) {
    float dist = distance(uv, center);
    float strength = sin(10.0 * dist - time * 5.0) * 0.1; // strength 0.1
    // Dynamically adjust ripple strength based on progress
    return strength * (1.0 - abs(progress - 0.5) * 2.0);
}

void main() {
    vec2 uv = v_uv;

    float wave = ripple(uv, vec2(0.5, 0.5), u_time, u_progress);

    vec4 disp = texture2D(u_textureDips, uv);

    // Make sure the UV coordinates are within the range of [0, 1].
    vec2 texCoord1 = uv + wave * (1.0 - u_progress);
    vec2 texCoord2 = uv - wave * u_progress;

    // Sample the texture
    vec4 tex1 = texture2D(u_texture1, texCoord1);
    vec4 tex2 = texture2D(u_texture2, texCoord2);

    vec4 finalColor = mix(tex1, tex2, u_progress);

    gl_FragColor = finalColor;
}