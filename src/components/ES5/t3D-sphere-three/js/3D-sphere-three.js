/* 
 *************************************
 * <!-- 3D Sphere Rotation -->
 *************************************
 */

/**
 * APP._3D_SPHERE_THREE
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_SPHERE_THREE               = APP._3D_SPHERE_THREE || {};
	APP._3D_SPHERE_THREE.version       = '0.0.1';
    APP._3D_SPHERE_THREE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-sphere-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-sphere-three-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite;

		
		init();
		render();

		function init() {
			// camera
			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
			camera.position.set( 0, -46, 18 );

			// controls
			controls = new THREE.OrbitControls( camera );
			controls.minDistance = 10;
			controls.maxDistance = 50;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0x555555 ) );

			light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 500, 2000 );
			scene.add( light );
			
			

			//WebGL Renderer		
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// axes
			//scene.add( new THREE.AxisHelper( 20 ) );

			// geometry
			var geometry = new THREE.SphereGeometry( 3, 32, 32 );

			// material, we create the material when the texture is loaded
			var texture = new THREE.TextureLoader().load( templateUrl + '/assets/images/demo/test-img-big-1.jpg' ),
				material = new THREE.MeshBasicMaterial( { map: texture } );

			// parent
			displacementSprite = new THREE.Object3D();
			scene.add( displacementSprite );

			// pivots
			var pivot1 = new THREE.Object3D(),
				pivot2 = new THREE.Object3D(),
				pivot3 = new THREE.Object3D();
			
			pivot1.rotation.z = 0;
			pivot2.rotation.z = 2 * Math.PI / 3;
			pivot3.rotation.z = 4 * Math.PI / 3;
			displacementSprite.add( pivot1 );
			displacementSprite.add( pivot2 );
			displacementSprite.add( pivot3 );

			// mesh
			var mesh1 = new THREE.Mesh( geometry, material ),
				mesh2 = new THREE.Mesh( geometry, material ),
				mesh3 = new THREE.Mesh( geometry, material );
			
			mesh1.position.y = 5;
			mesh2.position.y = 15;
			mesh3.position.y = 25;
			pivot1.add( mesh1 );
			pivot2.add( mesh2 );
			pivot3.add( mesh3 );
			
			
			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
			displacementSprite.rotation.z += 0.01;
			controls.update();
			
			renderer.render( scene, camera );
			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}


		
    };
	
    APP.components.documentReady.push( APP._3D_SPHERE_THREE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







