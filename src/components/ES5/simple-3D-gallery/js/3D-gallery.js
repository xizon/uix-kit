/* 
 *************************************
 * <!-- 3D Gallery with three.js -->
 *************************************
 */
/**
 * APP._3D_GALLERY
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_GALLERY               = APP._3D_GALLERY || {};
	APP._3D_GALLERY.version       = '0.0.1';
    APP._3D_GALLERY.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-gallery-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-gallery-three-canvas';
		
	
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			theta        = 0;
		
		
		var offsetWidth  = 1400,
			offsetHeight = 933,
			allImages    = [],
			imgTotal,
			imagesLoaded = false;


		init();
		render();

		
		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, 1000);
			

			
			//controls
			controls = new THREE.OrbitControls( camera );
			controls.autoRotate = false;
			controls.autoRotateSpeed = 0.5;
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = false;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			
			controls.target.set( 30, 167, 81 );
			controls.update();			

			

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
			// Create a texture loader so we can load our image file
			var imgs = [
				templateUrl + '/assets/images/demo/test-img-big-1.jpg',
				templateUrl + '/assets/images/demo/test-img-big-2.jpg',
				templateUrl + '/assets/images/demo/test-img-big-3.jpg',
				templateUrl + '/assets/images/demo/test-img-big-4.jpg',
				templateUrl + '/assets/images/demo/test-img-big-5.jpg',
				templateUrl + '/assets/images/demo/test-img-big-1.jpg',
				templateUrl + '/assets/images/demo/test-img-big-2.jpg',
				templateUrl + '/assets/images/demo/test-img-big-3.jpg',
				templateUrl + '/assets/images/demo/test-img-big-4.jpg',
				templateUrl + '/assets/images/demo/test-img-big-5.jpg'	
			];
			
			//A loader for loading all images from array.
			var loader = new THREE.TextureLoader();
			loader.crossOrigin = 'anonymous';
			
			//Preload
			imgTotal = imgs.length;
			
			var gap               = 100,
				circumference         = (offsetWidth + gap) * imgTotal,
				galleryRadius       = circumference / ( Math.PI * 2 ), // C = 2πr = Math.PI * 2 * radius
				eachItemAngleToRad  = ( Math.PI * 2 ) / imgTotal; // 360° = 2π = Math.PI * 2
			
			if ( camera.position.length() > galleryRadius ) {
				camera.position.set( 0, 0, 0 );
			}	
			

			//Load images
			imgs.forEach( function( element, index ) {
				loadImage( loader, element, index, offsetWidth, offsetHeight, imgTotal, eachItemAngleToRad, galleryRadius, $( '#3D-gallery-three-canvas__loader' ) );
			});


			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}
		

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			
			//To set a background color.
			renderer.setClearColor( 0x000000 );	
			
			//check all images loaded
			if ( !imagesLoaded && allImages.length === imgTotal ) {
				allImages.forEach( function (element ) {
					scene.add( element );
				});
				imagesLoaded = true;
				
			}
			
			//update camera and controls
			controls.update();
			
			renderer.render( scene, camera );
			
			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

			
		/*
		 * Load Image
		 *
		 * @param  {Object} imgLoader       - A loader for loading all images from array.
		 * @param  {String} src             - URL of image.
		 * @param  {Number} index           - Index of image.
		 * @param  {Number} w               - The width of an image, in pixels. 
		 * @param  {Number} h               - The height of an image, in pixels. 
		 * @param  {Number} total           - Total number of preload images.
		 * @param  {Number} itemRadAngle    - An equal radian angle of a sphere for each element.
		 * @param  {Number} radius          - Radius length of the sphere (circumference).
		 * @param  {Object} loading         - Progress bar display control.
		 * @return {Void}
		 */
        function loadImage( imgLoader, src, index, w, h, total, itemRadAngle, radius, loading ) {
			
			var material = new THREE.MeshLambertMaterial({
				map: imgLoader.load( src )
			});
			var geometry = new THREE.PlaneGeometry( w, h );
			var displacementSprite = new THREE.Mesh( geometry, material );

			//LinearFilter, which takes the four closest texels and bilinearly interpolates among them. 
			displacementSprite.minFilter = THREE.LinearFilter;
			displacementSprite.overdraw = true;
			
			//Calculate the position of the image 
			//X axis: Math.sin( rad ) * radius
			//Z axis: Math.cos( rad ) * radius
			displacementSprite.rotation.y = -index * itemRadAngle;
			displacementSprite.position.set( radius * Math.sin(index * itemRadAngle), 0, -radius * Math.cos(index * itemRadAngle) );

			allImages.push( displacementSprite );

			//loading
			loading.css( 'width', Math.round(100 * allImages.length / total ) + '%' );
			
		}


		
    };

    APP.components.documentReady.push( APP._3D_GALLERY.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







