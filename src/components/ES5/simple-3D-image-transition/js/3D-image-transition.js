/* 
 *************************************
 * <!-- 3D Image Transition with three.js -->
 *************************************
 */
/**
 * APP._3D_IMAGE_TRANSITION
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_IMAGE_TRANSITION               = APP._3D_IMAGE_TRANSITION || {};
	APP._3D_IMAGE_TRANSITION.version       = '0.0.1';
    APP._3D_IMAGE_TRANSITION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-imagetransition-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-imagetransition-three-canvas';
		
	
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			theta        = 0;
		
		
		var vertex       = document.getElementById( 'vertexshader' ).textContent,
			fragment     = document.getElementById( 'fragmentshader' ).textContent,
			filterMaterial,
			offsetWidth  = $( '#' + rendererCanvasID ).parent().width(),
			offsetHeight = $( '#' + rendererCanvasID ).parent().width() * (550/1400);
		

		

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
			renderer.setSize( offsetWidth , offsetHeight );

			
			// Immediately use the texture for material creation
			// Create a texture loader so we can load our image file
			var imgs = [
				templateUrl + '/assets/images/demo/cool-slider-1.jpg',
				templateUrl + '/assets/images/demo/cool-slider-2.jpg'
			];
			
			var loader = new THREE.TextureLoader();
			loader.crossOrigin = '';


			var texture1     = loader.load( imgs[0] ),
				texture2     = loader.load( imgs[1] ),
				intensity    = 1,
				dispImage    = $( '#' + rendererCanvasID ).data( 'filter-texture' ), //Load displacement image
			    disp         = loader.load( dispImage );
		
			disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

			texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
			texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

			texture1.anisotropy = renderer.getMaxAnisotropy();
			texture2.anisotropy = renderer.getMaxAnisotropy();

			
			var geometry = new THREE.PlaneBufferGeometry(
				offsetWidth,
				offsetHeight,
				1
			);
			
			
			
			filterMaterial = new THREE.ShaderMaterial({
				uniforms: {
					effectFactor: { type: "f", value: intensity },
					dispFactor: { type: "f", value: 0.0 },
					texture: { type: "t", value: texture1 },
					texture2: { type: "t", value: texture2 },
					disp: { type: "t", value: disp }
				},

				vertexShader: vertex,
				fragmentShader: fragment,
				transparent: true,
				opacity: 1.0
			});
	
			
			displacementSprite = new THREE.Mesh( geometry, filterMaterial );
			displacementSprite.position.set( 0, 0, 0 );
			scene.add( displacementSprite );


			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
			// When the mouse moves, call the given function
			document.getElementById( rendererCanvasID ).addEventListener( 'mouseenter', onDocumentMouseEnter, false );
			document.getElementById( rendererCanvasID ).addEventListener( 'mouseleave', onDocumentMouseLeave, false );
		
			
			
		}
		

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			
			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			
			//update camera and controls
			controls.update();
			
			renderer.render( scene, camera );
			
			
			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseEnter( event ) {
            TweenMax.to( filterMaterial.uniforms.dispFactor, 1.5, {
                value: 1,
                ease: Expo.easeOut
            });	
		}
		

		function onDocumentMouseLeave( event ) {
            TweenMax.to( filterMaterial.uniforms.dispFactor, 1, {
                value: 0,
                ease: Expo.easeOut
            });	
		}
		
    };

    APP.components.documentReady.push( APP._3D_IMAGE_TRANSITION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







