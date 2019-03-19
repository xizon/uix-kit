/* 
 *************************************
 * <!-- 3D Background 3 with three.js -->
 *************************************
 */
/**
 * APP._3D_BACKGROUND_THREE3
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_BACKGROUND_THREE3               = APP._3D_BACKGROUND_THREE3 || {};
	APP._3D_BACKGROUND_THREE3.version       = '0.0.1';
    APP._3D_BACKGROUND_THREE3.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas3' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-background-three-canvas3';
		
	
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			scene,
			renderer,
			displacementSprite,
			theta        = 0;
		
		var mouseVector  = new THREE.Vector2(),
			sphereTarget = new THREE.Euler(),
			xrad         = THREE.Math.degToRad(30),
			yrad         = THREE.Math.degToRad(10);
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 50, windowWidth / windowHeight, .01, 1000 );
			camera.position.set( 0, 0, 1.8 );


			
			//Scene
			scene = new THREE.Scene();

		
			//WebGL Renderer	
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// Immediately use the texture for material creation
			var sphereGeo = new THREE.SphereBufferGeometry( 2, 12, 12 );
			var sphereMat = new THREE.MeshBasicMaterial({
				color: 0x494949,
				wireframe: true
			});
			displacementSprite = new THREE.Mesh( sphereGeo, sphereMat );
			displacementSprite.position.y = -0.2;
			scene.add( displacementSprite );
			

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			//To set a background color.
			renderer.setClearColor( 0x000000 );	
			
			

			lerp( displacementSprite.rotation, 'x', sphereTarget.x );
			lerp( displacementSprite.rotation, 'y', sphereTarget.y );


			renderer.render( scene, camera );
			
			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseMove( event ) {
			// NDC -1 to 1
			var rect = renderer.domElement.getBoundingClientRect();
			mouseVector.x = ( event.clientX - rect.left ) / rect.width * 2 - 1;
			mouseVector.y = ( event.clientY - rect.top ) / rect.height * -2 + 1;

			sphereTarget.y = mouseVector.x * xrad;
			sphereTarget.x = - mouseVector.y * yrad;
		}
		
		//Calculate the interpolation of two vectors
		function lerp( object, prop, destination ) {
			if (object && object[prop] !== destination) {
				object[prop] += (destination - object[prop]) * 0.1;

				if (Math.abs(destination - object[prop]) < 0.001) {
					object[prop] = destination;
				}
			}
		}
		
	
		
		
    };

    APP.components.documentReady.push( APP._3D_BACKGROUND_THREE3.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







