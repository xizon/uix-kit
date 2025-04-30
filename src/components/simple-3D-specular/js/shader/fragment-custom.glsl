precision highp float;
    
    in vec2 vUv;
    in vec3 vNormal;
    in vec4 vMPosition;
    in vec3 vPosition;
    in mat3 nMat;
    in vec3 vViewPosition;
    
    uniform samplerCube envMap;
    uniform sampler2D normalMap;
    uniform sampler2D roughnessMap;
    uniform vec3 cameraPosition;
    uniform float time;
    uniform mat3 normalMatrix;
    
    uniform float repeat;
    uniform float innerScatter;
    uniform float outerScatter;
    uniform float normalScale;
    uniform float reflectivity;
    uniform float roughness;
    uniform float darkness;
    uniform float smoothness;
    
    out vec4 color;
    
    #define PI 3.14159265358979323846264
    
    void main() {
    
    vec3 n = normalize( vNormal.xyz );
    vec3 blend_weights = abs( n );
    blend_weights = ( blend_weights - 0.2 ) * 7.;  
    blend_weights = max( blend_weights, 0. );
    blend_weights /= ( blend_weights.x + blend_weights.y + blend_weights.z );
    
    vec3 tanX = vec3(  vNormal.x, -vNormal.z,  vNormal.y );
    vec3 tanY = vec3(  vNormal.z,  vNormal.y, -vNormal.x );
    vec3 tanZ = vec3( -vNormal.y,  vNormal.x,  vNormal.z );
    vec3 blended_tangent = tanX * blend_weights.xxx +  
                          tanY * blend_weights.yyy +  
                          tanZ * blend_weights.zzz; 
    
    vec2 uv = vUv * vec2(repeat,1.) + vec2(0. *time * repeat,time);
    float bias = smoothness;
    
    vec3 normalTex = texture(normalMap, uv, bias).rgb *2.0 - 1.0;//blendedNormal * 2.0 - 1.0;
    normalTex.xy *= normalScale;
    normalTex.y *= -1.;
    normalTex = normalize( normalTex );
    mat3 tsb = mat3( normalize( blended_tangent ) , normalize( cross( vNormal, blended_tangent ) ), normalize( vNormal ) );
    vec3 finalNormal = tsb * normalTex;
    
    float r = 1. - texture(roughnessMap, uv, bias).r;
    r = mix(1., r, roughness);
    
    vec3 fn = normalize(nMat * finalNormal);
    vec3 t = normalize(vMPosition.xyz - cameraPosition);
    vec3 refl = normalize(reflect(t, fn));
    vec3 refr = normalize(refract(t, fn, .9));
    
    vec3 e = normalize( vViewPosition );
    float rim = 1. - pow(abs(dot(e, normalMatrix * finalNormal)), 1.);
    
    vec4 c1 = texture(envMap, refl, r * outerScatter);
    vec4 c2 = texture(envMap, refr, r * innerScatter);
    color = mix(mix(c2, c1, rim), c1, reflectivity);
    color = mix(color, c1 * vec4(vec3(rim), 1.), darkness);
}