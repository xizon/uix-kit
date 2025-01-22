varying vec2 v_uv;

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform sampler2D u_textureDips;

// uniform float time;
// uniform float _rot;
uniform float u_progress;
uniform float effectFactor;

// vec2 rotate(vec2 v, float a) {
//  float s = sin(a);
//  float c = cos(a);
//  mat2 m = mat2(c, -s, s, c);
//  return m * v;
// }

void main() {

    vec2 uv = v_uv;

    // uv -= 0.5;
    // vec2 rotUV = rotate(uv, _rot);
    // uv += 0.5;

    vec4 myDisp = texture2D(u_textureDips, uv);

    vec2 distortedPosition = vec2(uv.x + u_progress * (myDisp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - u_progress) * (myDisp.r*effectFactor), uv.y);

    vec4 _u_texture1 = texture2D(u_texture1, distortedPosition);
    vec4 _u_texture2 = texture2D(u_texture2, distortedPosition2);

    vec4 finalTexture = mix(_u_texture1, _u_texture2, u_progress);

    gl_FragColor = finalTexture;
}