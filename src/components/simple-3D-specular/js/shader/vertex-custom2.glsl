    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;
    pos.y += sin(time + pos.x * 10.0) * 0.05;
    vViewPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}