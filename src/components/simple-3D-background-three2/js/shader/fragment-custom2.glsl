uniform float uTime;

varying vec2 vUv;

void main( void ) {

    vec2 position = vUv;

    float color = 0.0;
    color += sin( position.x * cos( uTime / 15.0 ) * 80.0 ) + cos( position.y * cos( uTime / 15.0 ) * 10.0 );
    color += sin( position.y * sin( uTime / 10.0 ) * 40.0 ) + cos( position.x * sin( uTime / 25.0 ) * 40.0 );
    color += sin( position.x * sin( uTime / 5.0 ) * 10.0 ) + sin( position.y * sin( uTime / 35.0 ) * 80.0 );
    color *= sin( uTime / 10.0 ) * 0.5;

    gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + uTime / 3.0 ) * 0.75 ), 1.0 );

}