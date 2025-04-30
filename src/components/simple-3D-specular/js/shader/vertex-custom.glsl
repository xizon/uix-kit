precision highp float;
    
    in vec3 position;
    in vec3 normal;
    in vec2 uv;
    in vec3 tangent;
    
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 modelMatrix;
    uniform vec3 cameraPosition;
    uniform mat3 normalMatrix;
    
    out vec2 vUv;
    out vec3 vNormal;
    out vec3 vPosition;
    out vec4 vMPosition;
    out mat3 nMat;
    out vec3 vViewPosition;
    
    void main() {
    vUv = uv;
    vNormal = normal;
    
    vMPosition = modelMatrix * vec4( position, 1.0 );
    nMat = mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz );
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vViewPosition = -mvPosition.xyz;
    
    vPosition = position;
    gl_Position = projectionMatrix * mvPosition;
}