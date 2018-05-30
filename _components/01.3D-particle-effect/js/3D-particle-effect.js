/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-particle-effect-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-particle-effect-canvas',
			rendererCanvasWidth       = 800,
			rendererCanvasHeight      = 400;
		
		// Draw Image To Canvas
		//-------------------------------------	
		//drawImageToCanvas( rendererCanvasID, $( '#' + rendererCanvasID ).data( 'img-src' ) );

		
		// Effect Render
		//-------------------------------------	
		var renderer, scene, camera, controls;


		// Create a camera, which defines where we're looking at.		
		renderer = new THREE.WebGLRenderer( { 
								canvas   : document.getElementById( rendererCanvasID ), //canvas
								alpha    : true, 
								antialias: true 
							} );
		renderer.setSize( windowWidth, windowHeight );
	
		
		scene = new THREE.Scene();
		
		//camera
		camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 0.01, 100 );
		camera.position.set( -1.5, 0.5, 0.5 );
		camera.lookAt( new THREE.Vector3(0,0,0) );
		
		//controls
		controls = new THREE.OrbitControls( camera );
		controls.rotateSpeed = 0.5;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.enableZoom = true;
		controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		controls.dampingFactor = 0.25;
		controls.screenSpacePanning = false;
	    controls.minDistance = 1.5;
		controls.maxDistance = 5;
		controls.maxPolarAngle = Math.PI / 2;
		

	
		// Immediately use the texture for material creation
		var createGeometryTexture = function( geometry, size ) {
			var data = new Float32Array(size * size * 3);
			var verticesLength = geometry.vertices.length;
			for (var i = 0; i < size * size; i++) {
				if (verticesLength > i) {
					data[i * 3] = geometry.vertices[i].x;
					data[i * 3 + 1] = geometry.vertices[i].y;
					data[i * 3 + 2] = geometry.vertices[i].z;
				} else {
					data[i * 3] = data[i * 3 + 1] = data[i * 3 + 2] = 0.0;
				}
			}
			var dataTexture = new THREE.DataTexture( data, size, size, THREE.RGBFormat, THREE.FloatType );
			dataTexture.needsUpdate = true;
			return dataTexture;
		};

		var size            = 84,
			horizontalPlane = {
			vertices: []
		};
		
		for (var i = 0; i < size * size; i++) {
			horizontalPlane.vertices.push({
				x: (((i % size) / size) - 0.5) * 1.2,
				y: 0.0,
				z: (((i / size) / size) - 0.5) * 1.2
			});
		}

		var particleTextureTarget = createGeometryTexture(new THREE.SphereGeometry(0.5, size - 1, size - 1), size),
			texturePlane          = createGeometryTexture(horizontalPlane, size),
			textureSphere         = createGeometryTexture(new THREE.SphereGeometry(0.5, size - 1, size - 1), size),
			textureBox            = createGeometryTexture(new THREE.BoxGeometry(0.7, 0.7, 0.7, 26, 26, 26), size);

		
		// Add textures to array for iteration
		var geometryTextures = [];
		geometryTextures.push( texturePlane, textureSphere, textureBox );

		// Change particleTextureTarget.image on click
		var geometryTextureIndex = 0;
		$( 'body' ).on( 'click', function() {
			geometryTextureIndex++;
			if (geometryTextureIndex > geometryTextures.length - 1) {
				geometryTextureIndex = 0;
			}
			particleTextureTarget.image = geometryTextures[geometryTextureIndex].image;
			particleTextureTarget.needsUpdate = true;
		});
		

		// Create the particles
		var particleOptions = {
			textureSize            : size,
			explodeRate            : 0.1,
			targetTexture          : particleTextureTarget,
			velocityFunctionString : 'outVelocity = direction * (dist/50.0);',
			colorFunctionString    : 'color = vec4(0.0, 0.0, 0.0, 1.0);'
		};
		var particles = new Particles( renderer, scene, particleOptions );

		

		animate();
		function animate() {

			requestAnimationFrame( animate );

			// required if controls.enableDamping or controls.autoRotate are set to true
			controls.update();
			
			// Update the particles for each frame
			particles.pointCloud.rotation.y += 0.005;
			particles.update();

			renderer.render( scene, camera );

		}
		
		
		
	

		/*
		 * Returns a random number between two other numbers
		 *
		 * @param  {string} src                 - The URL of the image.
		 * @param  {number} width               - The width of the image.
		 * @param  {number} height              - The height of the image.
		 * @param  {function} callback          - Callback function when the image is loaded.
		 * @return {object}                     - The image element.
		 */
		function loadImage( src, width, height, callback ) {
			var image = new Image( width, height ); 
			image.src = src ;
			image.onload = function() {
				callback.call();
			};

			return image;
		}
		
	
		/*
		 * Draw Image To Canvas
		 *
		 * @param  {object} canvasID         - The ID of a canvas.
		 * @param  {string} img              - Image URL.
		 * @return {void}                    - The constructor.
		 */
		function drawImageToCanvas( canvasID, img ) {
			
			var image = loadImage( img, rendererCanvasWidth, rendererCanvasHeight, function() {

					var c      = document.getElementById( canvasID ),
						ctx    = c.getContext( '2d' );
					
					c.width = rendererCanvasWidth;
					c.height = rendererCanvasHeight;

					ctx.drawImage( image, 0, 0 );

		
				}
			);
			
		
		}


		
		
		
    };

    App.threeDimensionalParticleEffect = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );



