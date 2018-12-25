/* 
 *************************************
 * <!-- 3D Model -->
 *************************************
 */

/**
 * APP._3D_MODEL
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/_plugins-THREE
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_MODEL               = APP._3D_MODEL || {};
	APP._3D_MODEL.version       = '0.0.1';
    APP._3D_MODEL.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-model-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-model-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			radius       = 100,
			theta        = 0,
			clickEnable   = false,
			newCameraX   = 0,
			newCameraY   = 0,
			newCameraZ   = 0;
		
		var mouse = new THREE.Vector2(), 
			INTERSECTED,
			INTERSECTED_CLICK,
			raycaster;
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);
			

			
			//controls
			controls = new THREE.OrbitControls( camera );
			controls.autoRotate = true;
			controls.autoRotateSpeed = 0.5;
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
			
			controls.target.set( 30, 167, 81 );
			controls.update();			


			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0xcccccc, 0.4 ) );

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
			var manager = new THREE.LoadingManager();
			manager.onProgress = function ( item, loaded, total ) {

				console.log( item, loaded, total );

			};

			var textureLoader = new THREE.TextureLoader( manager ),
				texture       = textureLoader.load( templateUrl + '/assets/models/obj/project.png' ),
				onProgress    = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				},
				onError       = function ( xhr ) { };
			
			
			var loader        = new THREE.OBJLoader( manager );
			loader.load( templateUrl + '/assets/models/obj/project.obj', function ( object ) {

				object.traverse( function ( child ) {

					if ( child instanceof THREE.Mesh ) {

						child.material.map = texture;

					}

				} );

				object.scale.set( 165, 165, 165 );
				object.position.y = 100;
				scene.add( object );

			}, onProgress, onError );

			
			

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
			// When the mouse moves, call the given function
			raycaster = new THREE.Raycaster();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			
		
			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED != intersects[ 0 ].object ) {
					
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xffcc00 );
				}
			} else {
				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				INTERSECTED = null;
			}

			controls.update();
			
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
		
		
		function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			clickEnable = true;
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED_CLICK != intersects[ 0 ].object ) {
					
					INTERSECTED_CLICK = intersects[ 0 ].object;
					
					TweenMax.to( INTERSECTED_CLICK.scale, 1, {
						x: '+=' + ( 200 - INTERSECTED_CLICK.scale.x ) * 0.05,
						y: '+=' + ( 200 - INTERSECTED_CLICK.scale.y ) * 0.05,
						z: '+=' + ( 200 - INTERSECTED_CLICK.scale.z ) * 0.05
					});	
						
					
					INTERSECTED_CLICK.updateMatrix();	
					
				}
			} else {
				INTERSECTED_CLICK = null;
			}
			/*
			// Parse all the faces
			for ( var i in intersects ) {

				intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

			}
			*/		

			
			
			
		}
		function onDocumentMouseUp( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			
			theta = 0;
			clickEnable = false;
			
		}
			
		

		
    };

    APP.components.documentReady.push( APP._3D_MODEL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


