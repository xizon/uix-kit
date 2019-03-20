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
	APP._3D_BACKGROUND_THREE.version       = '0.0.3';
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
		
		var skyMaterial,
			sunSphere,
			vertex       = document.getElementById( 'vertexshader' ).textContent,
			fragment     = document.getElementById( 'fragmentshader' ).textContent;
	

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
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 60, windowWidth / windowHeight, 100, 2000000 );
			camera.position.set( 0, 100, 2000 );



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

			/**
			 * @author zz85 / https://github.com/zz85
			 *
			 * Based on "A Practical Analytic Model for Daylight"
			 * aka The Preetham Model, the de facto standard analytic skydome model
			 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
			 *
			 * First implemented by Simon Wallner
			 * http://www.simonwallner.at/projects/atmospheric-scattering
			 *
			 * Improved by Martin Upitis
			 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
			 *
			 * Three.js integration by zz85 http://twitter.com/blurspline
			*/
			// Add Sky
			skyMaterial = new THREE.ShaderMaterial({
				uniforms: {
					"luminance": { value: 1 },
					"turbidity": { value: 2 },
					"rayleigh": { value: 1 },
					"mieCoefficient": { value: 0.005 },
					"mieDirectionalG": { value: 0.8 },
					"sunPosition": { value: new THREE.Vector3() }
				},
				fragmentShader: fragment,
				vertexShader: vertex,
				side: THREE.BackSide
			});
			
			skyMaterial.uniforms.turbidity.value = 30;
			skyMaterial.uniforms.rayleigh.value = 2;
			skyMaterial.uniforms.luminance.value = 1.1;
			skyMaterial.uniforms.mieCoefficient.value = 0.005;
			skyMaterial.uniforms.mieDirectionalG.value = 0.811;
			
			
			var skyGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
			shaderSprite = new THREE.Mesh( skyGeometry, skyMaterial );
			shaderSprite.scale.setScalar( 450000 );
			shaderSprite.renderDepth = 100000;
			scene.add( shaderSprite );

			
			// Add Sun
			sunSphere = new THREE.Mesh(
				new THREE.SphereBufferGeometry( 20000, 16, 8 ),
				new THREE.MeshBasicMaterial( { color: 0xffffff } )
			);
			sunSphere.position.y = - 700000;
			sunSphere.visible = false;
			scene.add( sunSphere );
			
			
			skyMaterial.uniforms.sunPosition.value.copy( sunSphere.position );
			

			var theta = Math.PI * ( 0.49 - 0.5 );
			var phi = 2 * Math.PI * ( 0.25 - 0.5 );
			var distance = 400000;

			sunSphere.position.x = distance * Math.cos( phi );
			sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
			sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

			skyMaterial.uniforms.sunPosition.value = sunSphere.position;
			
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

    APP.components.documentReady.push( APP._3D_BACKGROUND_THREE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




