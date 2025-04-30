  uniform vec3 sunColor;
    uniform vec3 sunDirection;
    uniform vec3 waterColor;
    uniform float distortionScale;
    uniform float time;
    uniform vec2 resolution;
    uniform samplerCube envMap;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 reflectDir = reflect(viewDir, normal);
    vec3 reflectColor = textureCube(envMap, reflectDir).rgb;
    vec3 refractDir = refract(viewDir, normal, 1.0 / 1.33);
    vec3 refractColor = textureCube(envMap, refractDir).rgb;
    float fresnel = 0.04 + (1.0 - 0.04) * pow(1.0 - dot(normal, viewDir), 5.0);
    vec3 color = mix(refractColor, reflectColor, fresnel);
    color = mix(color, waterColor, 0.1);
    vec2 distortedUv = vUv + sin(time + vUv.yx * 10.0) * 0.01;
    color += sin(distortedUv.x * 10.0 + time) * 0.05;
    float diffuse = max(dot(normal, sunDirection), 0.0);
    vec3 lighting = sunColor * diffuse;
    gl_FragColor = vec4(color + lighting, 0.5);
}