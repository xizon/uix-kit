/* 
 *************************************
 * <!-- 3D Background 2 -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {


		
		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-background-three-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			clock = new THREE.Clock();

		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;

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

			
			// Immediately use the texture for material creation
			var defaultMaterial    = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
			
			displacementSprite = new THREE.Mesh( generateGeometry( 'sphere', 200 ), defaultMaterial );
			scene.add( displacementSprite );


			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            var objVector = new THREE.Vector3(0,0.2,0.1),
				delta     = clock.getDelta();
			
			displacementSprite.rotation.x += delta * objVector.x;
			displacementSprite.rotation.y += delta * objVector.y;
			displacementSprite.rotation.z += delta * objVector.z;

			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			controls.update();
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		

		
		/*
		 * Batch generation of geometry
		 *
		 * @param  {string} objectType     - String of geometry type identifier.
		 * @param  {number} numObjects       - The total number of generated objects.
		 * @return {void}                  - The constructor.
		 */
		function generateGeometry( objectType, numObjects ) {

			var geometry = new THREE.Geometry();

			var applyVertexColors = function( g, c ) {

				g.faces.forEach( function( f ) {

					var n = ( f instanceof THREE.Face3 ) ? 3 : 4;

					for ( var j = 0; j < n; j ++ ) {

						f.vertexColors[ j ] = c;

					}

				} );

			};

			for ( var i = 0; i < numObjects; i ++ ) {

				var position = new THREE.Vector3();

				position.x = Math.random() * 10000 - 5000;
				position.y = Math.random() * 6000 - 3000;
				position.z = Math.random() * 8000 - 4000;

				var rotation = new THREE.Euler();

				rotation.x = Math.random() * 2 * Math.PI;
				rotation.y = Math.random() * 2 * Math.PI;
				rotation.z = Math.random() * 2 * Math.PI;

				var scale = new THREE.Vector3();

				var geom, color = new THREE.Color();

				scale.x = Math.random() * 200 + 100;

				if ( objectType == "cube" ) {

					geom = new THREE.BoxGeometry( 1, 1, 1 );
					scale.y = Math.random() * 200 + 100;
					scale.z = Math.random() * 200 + 100;
					color.setRGB( 0, 0, Math.random() + 0.1 );

				} else if ( objectType == "sphere" ) {

					geom = new THREE.IcosahedronGeometry( 1, 1 );
					scale.y = scale.z = scale.x;
					color.setRGB( Math.random() + 0.1, 0, 0 );

				} else if ( objectType == "poly" ) {


					geom = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
					scale.y = Math.random() * 30;
					scale.z = Math.random() * 30;
					color.setRGB( Math.random() + 0.1, 0, 0 );

				}


				// give the geom's vertices a random color, to be displayed
				applyVertexColors( geom, color );

				var object = new THREE.Mesh( geom );
				object.position.copy( position );
				object.rotation.copy( rotation );
				object.scale.copy( scale );
				object.updateMatrix();

				geometry.merge( object.geometry, object.matrix );

			}

			return geometry;
			

		}

		
    };

    App.threeDimensionalBackground2 = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );








