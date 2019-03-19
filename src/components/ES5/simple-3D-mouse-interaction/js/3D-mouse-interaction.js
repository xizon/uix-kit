/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */
/**
 * APP._3D_MOUSE_INTERACTION
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_MOUSE_INTERACTION               = APP._3D_MOUSE_INTERACTION || {};
	APP._3D_MOUSE_INTERACTION.version       = '0.0.1';
    APP._3D_MOUSE_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-mouseinteraction-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-mouseinteraction-three-canvas';
		
	

		
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
			clickEnable   = false;
		
		
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
			camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, 1300);
			

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.autoRotate = false;
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
			generateGeometry( 'poly', 15 );


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
			
            theta += 0.1;
			
			
			//To set a background color.
			renderer.setClearColor( 0x000000 );	
			
			
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
				
				console.log( intersects[0].object.name );
				
				//---Change object size
//				if ( typeof intersects[ 0 ] != typeof undefined ) {
//					var obj = intersects[ 0 ].object;
//
//
//					TweenMax.to( obj.scale, 1, {
//						x: '+=' + ( 200 - obj.scale.x ) * 0.05,
//						y: '+=' + ( 200 - obj.scale.y ) * 0.05,
//						z: '+=' + ( 200 - obj.scale.z ) * 0.05
//					});	
//
//
//					obj.updateMatrix();	
//	
//				}
				


				//---Change object position
				var targetAtomPos = intersects[0].object.position;

				console.log(targetAtomPos);
				// targetAtomPos.tween.pause();
				var destinationPos = targetAtomPos.clone();
				TweenMax.to(controls.target, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z});
				TweenMax.to(camera.position, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z+100,
					onUpdate:function(){
						camera.up.set(0,1,0);
						camera.updateProjectionMatrix();
					}
				});

			} else {
				
				 //Change object position
				 TweenMax.to(controls.target, 2,{ x:0, y:0, z:0,
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
		 * @param  {String} objectType     - String of geometry type identifier.
		 * @param  {Number} numObjects       - The total number of generated objects.
		 * @return {Void}
		 */
		function generateGeometry( objectType, numObjects ) {

			
			//set color
			var applyVertexColors = function( g, c ) {
				g.faces.forEach( function( f ) {
					var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
					for ( var j = 0; j < n; j ++ ) {
						f.vertexColors[ j ] = c;
					}
				} );
			};

			for ( var i = 0; i < numObjects; i ++ ) {

				
				var geometry;
				if ( objectType == "cube" ) {
					geometry = new THREE.BoxGeometry( 1, 1, 1 );
				} else if ( objectType == "sphere" ) {
					geometry = new THREE.IcosahedronGeometry( 1, 1 );

				} else if ( objectType == "poly" ) {
					geometry = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
				}

				
				var position = new THREE.Vector3();

				position.x = Math.random() * 500;
				position.y = Math.random() * 400;
				position.z = Math.random() * 300;

				var rotation = new THREE.Euler();

				rotation.x = Math.random() * 2 * Math.PI;
				rotation.y = Math.random() * 2 * Math.PI;
				rotation.z = Math.random() * 2 * Math.PI;

				
				var scale = new THREE.Vector3();

				
				// give the geom's vertices a random color, to be displayed
				var color = new THREE.Color();
				
				color.setRGB( Math.random(), Math.random(), Math.random() );
				applyVertexColors( geometry, color );

				
				// Immediately use the texture for material creation
				var defaultMaterial     = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

				displacementSprite  = new THREE.Mesh( geometry, defaultMaterial );
				displacementSprite.name = 'nucleus-' + i;
				displacementSprite.position.x = Math.random() * 800 - 400;
				displacementSprite.position.y = Math.random() * 800 - 400;
				displacementSprite.position.z = Math.random() * 800 - 400;
				displacementSprite.rotation.x = Math.random() * 2 * Math.PI;
				displacementSprite.rotation.y = Math.random() * 2 * Math.PI;
				displacementSprite.rotation.z = Math.random() * 2 * Math.PI;
				displacementSprite.scale.x = Math.random() + 5;
				displacementSprite.scale.y = Math.random() + 5;
				displacementSprite.scale.z = Math.random() + 5;
				
				
				scene.add( displacementSprite );
				atoms.push( displacementSprite );


			}


		}
		
    };

    APP.components.documentReady.push( APP._3D_MOUSE_INTERACTION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







