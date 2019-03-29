/* 
 *************************************
 * <!-- 3D Background 1 with three.js -->
 *************************************
 */

/**
 * APP._3D_BACKGROUND_THREE
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_BACKGROUND_THREE               = APP._3D_BACKGROUND_THREE || {};
	APP._3D_BACKGROUND_THREE.version       = '0.0.4';
    APP._3D_BACKGROUND_THREE.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-background-three-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			scene,
			light,
			renderer,
			displacementSprite,
			shaderSprite,
			clock = new THREE.Clock();
		

		// controls

		var spriteAnim = false;

		var mouseX       = 0,
			mouseY       = 0,
			windowHalfX  = windowWidth / 2,
			windowHalfY  = windowHeight / 2;

		var targetX = 0.0, 
			targetY = 0.0,
			angle   = 0.0,
			height  = 0.0,
			target  = new THREE.Vector3();
		
		
		// Load multiple ShaderFrog shaders
		var runtime = new ShaderRuntime();

		runtime.load([
			$( '#' + rendererCanvasID ).data( 'shader-url' )
		], function( shaders ) {

			// Get the Three.js material you can assign to your objects
			var material = runtime.get( shaders[0].name );
			shaderSprite.material = material;
			
		});

		
		
		
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 60, windowWidth / windowHeight, 100, 2000000 );
			camera.position.set( 0, 100, 2000 );

			runtime.registerCamera( camera );


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

			
			//Add shader background
			var geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2);
			shaderSprite = new THREE.Mesh( geometry );
			shaderSprite.scale.setScalar( 10000 );
			shaderSprite.renderDepth = 0;
			scene.add( shaderSprite );
			

			// Immediately use the texture for material creation
			var defaultMaterial    = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
			
			displacementSprite = new THREE.Mesh( generateGeometry( 'sphere', 200 ), defaultMaterial );
			scene.add( displacementSprite );
			
			

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            var objVector = new THREE.Vector3(0,0.2,0.1),
				delta     = clock.getDelta();
			
			if ( ! spriteAnim ) {
				displacementSprite.rotation.x += delta * objVector.x;
				displacementSprite.rotation.y += delta * objVector.y;
				displacementSprite.rotation.z += delta * objVector.z;
			}



			//To set a background color.
			renderer.setClearColor( 0x000000 );	
			
			
			//update shaders
			runtime.updateShaders( clock.getElapsedTime() );
			
			

			// update camera
			targetX = mouseX * .002;
			targetY = mouseY * .002;

			angle  += 0.01 * ( targetX - angle );
			height += 0.01 * ( targetY - height );

			var x = -Math.sin( angle * 1.5 ) * 35;
			var z =  Math.cos( angle * 1.5 ) * 35;
			var y = 130 * height + 0;

			camera.position.set( x, y, z );
			camera.lookAt( target );	

			
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		

		
		function onDocumentMouseMove( event ) {
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;	

		}
		
		function onDocumentMouseDown( event ) {
			event.preventDefault();
			spriteAnim = true;
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;	
			
			
		}
		
		function onDocumentMouseUp( event ) {
			event.preventDefault();
			spriteAnim = false;
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
	
		}
			
	
		
		/*
		 * Batch generation of geometry
		 *
		 * @param  {String} objectType     - String of geometry type identifier.
		 * @param  {Number} numObjects       - The total number of generated objects.
		 * @return {Void}
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

				var geom, 
					color = new THREE.Color();

				scale.x = Math.random() * 200 + 100;


				if ( objectType == "cube" ) {

					geom = new THREE.BoxGeometry( 1, 1, 1 );
					scale.y = Math.random() * 200 + 100;
					scale.z = Math.random() * 200 + 100;
					color.setRGB( 0, 0, Math.random() + 0.1 );

				} else if ( objectType == "sphere" ) {

					geom = new THREE.IcosahedronGeometry( 1, 1 );
					scale.y = scale.z = scale.x;
					color.setRGB( 0.35, getRandomFloat( 0.12, 0.3 ), 0.2 );

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
		
		
		//Generate random number between two numbers
		function getRandomFloat(min, max) {
		  return Math.random() * (max - min) + min;
		}
		

		
    };

    APP.components.documentReady.push( APP._3D_BACKGROUND_THREE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




