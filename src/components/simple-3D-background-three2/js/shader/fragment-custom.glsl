uniform float time;

uniform sampler2D texture;

varying vec2 vUv;

void main( void ) {

    vec2 position = - 1.0 + 2.0 * vUv;

    float a = atan( position.y, position.x );
    float r = sqrt( dot( position, position ) );

    vec2 uv;
    uv.x = cos( a ) / r;
    uv.y = sin( a ) / r;
    uv /= 10.0;
    uv += time * 0.05;

    vec3 color = texture2D( texture, uv ).rgb;

    gl_FragColor = vec4( color * r * 1.5, 1.0 );

}