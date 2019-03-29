/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */
/**
 * APP._3D_MOUSE_INTERACTION2
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_MOUSE_INTERACTION2               = APP._3D_MOUSE_INTERACTION2 || {};
	APP._3D_MOUSE_INTERACTION2.version       = '0.0.1';
    APP._3D_MOUSE_INTERACTION2.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-mouseinteraction2-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-mouseinteraction2-three-canvas';
		
	
		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			scene,
			light,
			renderer,
			displacementSprite,
			theta         = 0,
			clickEnable   = false;
		

		// controls
		var scroller = new CameraScroller({direction: "y"});

		
		// mouse
		var mouseVector = new THREE.Vector2(), 
			raycaster,
			intersects,
			INTERSECTED,
			nucleus,
			atoms = [];
		
		
		
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 70, windowWidth / windowHeight, 1, 50000 );
			camera.position.set( 0, 0, 20000 );

			
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
			
			
			scroller.init( renderer.domElement );

			// Immediately use the texture for material creation
			generateGeometry( 500 );
			

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
			// When the mouse moves, call the given function
			raycaster = new THREE.Raycaster();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.getElementById( rendererCanvasID ).addEventListener( 'click', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		
			
			
		}

		function render() {
			requestAnimationFrame( render );
		
			

			//To set a background color.
			renderer.setClearColor( 0x000000 );	
			
			//update controls
			camera.position.y = scroller.getScrollPosY()*10000;
			
			//Mouse interactions
			raycaster.setFromCamera( mouseVector, camera );
			intersects = raycaster.intersectObjects( atoms );
			//intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {

			
				if ( INTERSECTED != intersects[ 0 ].object ) {

					// restore previous intersection object (if it exists) to its original color
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xff0000 );

				}

			} else {

				// restore previous intersection object (if it exists) to its original color
				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

				//by setting current intersection object to "nothing"
				INTERSECTED = null;

			}
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
		

		function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			clickEnable = true;
	
			//Mouse interactions
			raycaster.setFromCamera( mouseVector, camera );
			intersects = raycaster.intersectObjects( atoms );
			//intersects = raycaster.intersectObjects( scene.children );
			
			
			
			
			if ( intersects.length > 0 && intersects[0].object.name.indexOf( 'nucleus' ) >= 0 ) {
	
				var targetAtomPos = intersects[0].object.position;

				// targetAtomPos.tween.pause();
				var destinationPos = targetAtomPos.clone();
		
				// jump to new position
				// y movement via scroller object
				// x and z movement via TWEEN
				scroller.targetPosition = intersects[0].object.position.y/10000;
				var targetPos = { x: intersects[0].object.position.x, y:intersects[0].object.position.y, z:intersects[0].object.position.z+1100};
			
				TweenMax.to( targetPos, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z});
				TweenMax.to( camera.position, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z+1000,
					onUpdate:function(){
						camera.up.set(0,1,0);
						camera.updateProjectionMatrix();
					}
				});

			} else {
				
				
				//restore scroller position
				scroller.targetPosition = 0;
				
				//restore camera position
				TweenMax.to( camera.position, 2,{ x:0, y:0, z:20000,
					onComplete:function(){
						TweenMax.resumeAll();
					}
				});	

			}	
			

			
		}
		
		
		function onDocumentMouseUp( event ) {
			event.preventDefault();
			mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			
			theta = 0;
			clickEnable = false;
			
		}
			
		
	
		
		/*
		 * Batch generation of geometry
		 *
		 * @param  {Number} numObjects       - The total number of generated objects.
		 * @return {Void}
		 */
		function generateGeometry( numObjects ) {

			var geometry = new THREE.Geometry();

			var applyVertexColors = function(g, c) {
				g.faces.forEach(function(f) {
					var n = (f instanceof THREE.Face3) ? 3 : 4;
					for (var j = 0; j < n; j++) {
						f.vertexColors[j] = c;
					}
				});
			};
			
			for ( var i = 0; i < numObjects; i ++ ) {

				var geom, 
					color = new THREE.Color();
				
				
				
				var position = new THREE.Vector3();
				position.x = -9000 + (i % 10) * 2000;
				position.y = -9000 + Math.floor((i % 100) / 10) * 2000;
				position.z = -1000 + Math.floor(i / 100) * 2000;

				var rotation = new THREE.Euler();
				rotation.x = 0;
				rotation.y = 0;
				rotation.z = 0;

				var scale = new THREE.Vector3();
				scale.x = 1200;
				scale.y = 600;
				scale.z = 200;

				geom = new THREE.BoxGeometry( 1, 1, 1 );
				color.setRGB( 0, 0, Math.random() + 0.1 );



				// give the geom's vertices a random color, to be displayed
				applyVertexColors( geom, color );

				
				// Immediately use the texture for material creation
				var defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

				displacementSprite = new THREE.Mesh( geom, defaultMaterial );
				scene.add( displacementSprite );

				var object = new THREE.Mesh( geom );
				displacementSprite.name = 'nucleus-' + i;
				displacementSprite.position.copy( position );
				displacementSprite.rotation.copy( rotation );
				displacementSprite.scale.copy( scale );
				displacementSprite.updateMatrix();
				
				scene.add( displacementSprite );
				atoms.push( displacementSprite );


			}

		}
		
		

		/*
		 * CameraSroller
		 * Scrolls the camera vertically (up/down) by mouse, scrollwhell and touch
		 * including a velocity based animation
		 */
		function CameraScroller(options) {
			this.targetPosition = 0;
			this.targetPositionOnMouseDown = 0;
			this.mouseY = 0;
			this.mouseYOnMouseDown = 0;
			this.scrollPosY = 0;
			this.domElem = undefined;
			this.init = function(domEl) {
				this.domElem = domEl;
				this.domElem.addEventListener('mousedown', this.onDocumentMouseDown, false);
				this.domElem.addEventListener('touchstart', this.onDocumentTouchStart, false);
				this.domElem.addEventListener('touchmove', this.onDocumentTouchMove, false);
				this.domElem.addEventListener('DOMMouseScroll', this.onDocumentMousewheel, false);
				this.domElem.addEventListener('mousewheel', this.onDocumentMousewheel, false);
			};
			this.onDocumentMouseDown = function(event) {
				event.preventDefault();
				this.domElem.addEventListener('mousemove', this.onDocumentMouseMove, false);
				this.domElem.addEventListener('mouseup', this.onDocumentMouseUp, false);
				this.domElem.addEventListener('mouseout', this.onDocumentMouseOut, false);
				this.mouseYOnMouseDown = event.clientY;
				this.targetPositionOnMouseDown = this.targetPosition;
			}.bind(this);
			this.onDocumentMouseMove = function(event) {
				this.mouseY = event.clientY;
				this.targetPosition = this.targetPositionOnMouseDown + (this.mouseY - this.mouseYOnMouseDown) * 0.02;
			}.bind(this);
			this.onDocumentMouseUp = function(event) {
				this.domElem.removeEventListener('mousemove', this.onDocumentMouseMove, false);
				this.domElem.removeEventListener('mouseup', this.onDocumentMouseUp, false);
				this.domElem.removeEventListener('mouseout', this.onDocumentMouseOut, false);
			}.bind(this);
			this.onDocumentMouseOut = function(event) {
				this.domElem.removeEventListener('mousemove', this.onDocumentMouseMove, false);
				this.domElem.removeEventListener('mouseup', this.onDocumentMouseUp, false);
				this.domElem.removeEventListener('mouseout', this.onDocumentMouseOut, false);
			}.bind(this);
			this.onDocumentTouchStart = function(event) {
				if (event.touches.length == 1) {
					event.preventDefault();
					this.mouseYOnMouseDown = event.touches[0].pageY;
					this.targetPositionOnMouseDown = this.targetPosition;
				}
			}.bind(this);
			this.onDocumentTouchMove = function(event) {
				if (event.touches.length == 1) {
					event.preventDefault();
					this.mouseY = event.touches[0].pageY;
					this.targetPosition = this.targetPositionOnMouseDown + (this.mouseY - this.mouseYOnMouseDown) * 0.02;
				}
			}.bind(this);
			this.onDocumentMousewheel = function(event) {
				this.targetPosition = this.targetPosition + event.wheelDeltaY * 0.005;
			}.bind(this);
			this.getScrollPosY = function() {
				this.scrollPosY = this.scrollPosY + (this.targetPosition - this.scrollPosY) * 0.05; // 0.05=long scroll delay, 0.15=short delay
				return this.scrollPosY
			}.bind(this);

		}

		
		
    };

    APP.components.documentReady.push( APP._3D_MOUSE_INTERACTION2.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







