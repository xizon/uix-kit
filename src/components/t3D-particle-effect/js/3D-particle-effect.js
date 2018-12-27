/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */

/**
 * APP._3D_PARTICLE
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_PARTICLE               = APP._3D_PARTICLE || {};
	APP._3D_PARTICLE.version       = '0.0.2';
    APP._3D_PARTICLE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-particle-effect-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-particle-effect-canvas';
		
		var renderer, 
			texture, 
			scene, 
			camera,
			particles,
			imagedata,
			clock        = new THREE.Clock(),
			mouseX       = 0, 
			mouseY       = 0,
			isMouseDown  = true,
			lastMousePos = {x: 0, y: 0},
			windowHalfX  = windowWidth / 2,
			windowHalfY  = windowHeight / 2;


		var centerVector = new THREE.Vector3(0, 0, 0);
		var previousTime = 0;


		
		init();
		render();
		

		function init() {
			
			//@https://github.com/mrdoob/three.js/blob/dev/src/extras/ImageUtils.js#L21
			THREE.ImageUtils.crossOrigin = '';
			
			//WebGL Renderer		
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );

			
			renderer.setSize(windowWidth, windowHeight);

			
			
			//Scene
			scene = new THREE.Scene();

			//camera
			camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, 0.1, 10000);
			camera.position.set(-100, 0, 600);
			camera.lookAt( centerVector );
			scene.add( camera );

			
			// instantiate a loader
			var loader = new THREE.TextureLoader();

			// load a resource
			loader.load(
				// resource URL
				$( '#' + rendererCanvasID ).data( 'img-src' ),

				// onLoad callback
				function ( texture ) {
					// in this example we create the material when the texture is loaded
					// Get data from an image
					imagedata = getImageData( texture.image );

					// Immediately use the texture for material creation
					var geometry = new THREE.Geometry();
					var material = new THREE.PointsMaterial({
						size: 2,
						color: 0x333333,
						sizeAttenuation: false
					});
					
					
					
					for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
				
						for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
							
							if ( imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128 ) {

						
								// The array of vertices holds the position of every vertex in the model.
								var vertex = new THREE.Vector3();
								
								
								vertex.x = Math.random() * 1000 - 500;
								vertex.y = Math.random() * 1000 - 500;
								vertex.z = -Math.random() * 500;

								vertex.destination = {
									x: x - imagedata.width / 2,
									y: -y + imagedata.height / 2,
									z: 0
								};

								vertex.speed = Math.random() / 200 + 0.015;

								geometry.vertices.push( vertex );
								

							}
						}
					}
					particles = new THREE.Points( geometry, material );

					scene.add( particles );

					
					
					
				},

				// onProgress callback currently not supported
				undefined,

				// onError callback
				function ( err ) {
					console.error( 'An error happened.' );
				}
			);


			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'touchstart', onDocumentTouchStart, false );
			document.addEventListener( 'touchmove', onDocumentTouchMove, false );
			
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
			
			
			
			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );	
		}
		
		
		
		
		
		function render() {
			requestAnimationFrame( render );
			
            var delta      = clock.getDelta(),
				thickness = 40;
			
			
			//Need to add judgment to avoid Cannot read property 'geometry' of undefined
			if ( typeof particles != typeof undefined ) {
				
				for (var i = 0, j = particles.geometry.vertices.length; i < j; i++) {
					var particle = particles.geometry.vertices[i];
					particle.x += (particle.destination.x - particle.x) * particle.speed;
					particle.y += (particle.destination.y - particle.y) * particle.speed;
					particle.z += (particle.destination.z - particle.z) * particle.speed;
				}

				
				if ( delta - previousTime > thickness ) {
					var index     = Math.floor(Math.random()*particles.geometry.vertices.length);
					var particle1 = particles.geometry.vertices[index];
					var particle2 = particles.geometry.vertices[particles.geometry.vertices.length-index];
					
					TweenMax.to( particle, Math.random()*2+1, {
									x:    particle2.x, 
									y:    particle2.y, 
									ease: Power2.easeInOut
								});
					
					
					
					TweenMax.to( particle2, Math.random()*2+1, {
									x:    particle1.x, 
									y:    particle1.y, 
									ease: Power2.easeInOut
								});
					
					previousTime = delta;
				}

				
				particles.geometry.verticesNeedUpdate = true;	
			}
			
			
			if( ! isMouseDown ) {
				camera.position.x += (0-camera.position.x)*0.06;
				camera.position.y += (0-camera.position.y)*0.06;
			}
			

			camera.position.x += ( mouseX - camera.position.x ) * 0.09;
			camera.position.y += ( - mouseY - camera.position.y ) * 0.09;
			camera.lookAt( centerVector );
			

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

			if( isMouseDown ) {
				camera.position.x += (event.clientX-lastMousePos.x)/100;
				camera.position.y -= (event.clientY-lastMousePos.y)/100;
				camera.lookAt( centerVector );
				lastMousePos = {x: event.clientX, y: event.clientY};
			}
			
			
		}

		
		function onDocumentTouchStart( event ) {

			if ( event.touches.length == 1 ) {

				event.preventDefault();

				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
			}
		}

		function onDocumentTouchMove( event ) {

			if ( event.touches.length == 1 ) {

				event.preventDefault();

				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;

			}
		}
		

		function onDocumentMouseUp() {
			isMouseDown = false;
		}
		
		function onDocumentMouseDown( event ) {
			isMouseDown = true;
			lastMousePos = {x: event.clientX, y: event.clientY};
			
			
		}
	

		
		/*
		 * Get Image Data when Draw Image To Canvas
		 *
		 * @param  {Object} image         - Overridden with a record type holding data, width and height.
		 * @return {JSON}                 - The image data.
		 */
		function getImageData( image ) {

			var canvas = document.createElement( 'canvas' );
			canvas.width = image.width;
			canvas.height = image.height;

			var ctx = canvas.getContext( '2d' );
			ctx.drawImage(image, 0, 0);

			return ctx.getImageData(0, 0, image.width, image.height);
		}


		
		
    };

    APP.components.documentReady.push( APP._3D_PARTICLE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



