/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';

import OrbitControls from '@uixkit/plugins/THREE/controls/OrbitControls';

export const THREE_MOUSE_INTERACTION = ( ( module, $, window, document ) => {
	if ( window.THREE_MOUSE_INTERACTION === null ) return false;
	
	
	
    module.THREE_MOUSE_INTERACTION               = module.THREE_MOUSE_INTERACTION || {};
    module.THREE_MOUSE_INTERACTION.version       = '0.0.4';
    module.THREE_MOUSE_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-mouseinteraction-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
        
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            const $window          = $( window );
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;

            const rendererCanvasID = '3D-mouseinteraction-three-canvas';




			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				controls,
				scene,
				light,
				renderer,
				displacementSprite,
				radius       = 100,
				theta        = 0,
				clickEnable   = false;


			const mouseVector = new THREE.Vector2();
            
			let	raycaster,
				intersects,
				INTERSECTED,
				nucleus,
				atoms = [];


			function init() {
				
				//=================
				//camera
				camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 1, 10000 );
				camera.position.set(0, 0, 1300);

				
				

				//=================
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



				//=================
				//Scene
				scene = new THREE.Scene();

				
				//=================
				//HemisphereLight
				scene.add( new THREE.AmbientLight( 0x555555 ) );

				light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 500, 2000 );
				scene.add( light );



				//=================
				//WebGL Renderer	
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );


				//=================
				// Immediately use the texture for material creation
				generateGeometry( 'poly', 15 );


				
				//=================
				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


				
				//=================
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


						
				//++++++++++++++++++++++++++++++++++++++
				//++++++++++++++++++++++++++++++++++++++
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

				//update camera and controls
				controls.update();

                //push objects
                /*
                @Usage: 

                    function CustomObj( scene ) {

                        const elements = new THREE...;
                        scene.add( elements );

                        this.update = function( time ) {
                            elements.rotation.y = time*0.003;
                        }
                    }       

                    sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
                */
                for( let i = 0; i < sceneSubjects.length; i++ ) {
                    sceneSubjects[i].update( clock.getElapsedTime()*1 );  
                }

                //render the scene to display our scene through the camera's eye.
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

				
				
				//++++++++++++++++++++++++++++++++++++++
				//++++++++++++++++++++++++++++++++++++++
				//Mouse interactions
				raycaster.setFromCamera( mouseVector, camera );
				intersects = raycaster.intersectObjects( atoms );
				//intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 && intersects[0].object.name.indexOf( 'nucleus' ) >= 0 ) {

                    
                    const _obj = intersects[0].object;
                    
					console.log( _obj.name );

					//---Change object size
	//				if ( typeof intersects[ 0 ] != typeof undefined ) {
	//					const obj = intersects[ 0 ].object;
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
					const targetAtomPos = _obj.position;
					console.log(targetAtomPos);
                    
					// targetAtomPos.tween.pause();
					const destinationPos = targetAtomPos.clone();
					TweenMax.to(controls.target, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z});
					TweenMax.to(camera.position, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z+100,
						onUpdate:function(){
							camera.up.set(0,1,0);
							camera.updateProjectionMatrix();
						},
                        onComplete: function() {
                            // get object new coordinates
                            const screenData = nestedObjectToScreenXYZAndWH( _obj , camera, renderer.domElement.width, renderer.domElement.height );
                            console.log( `Current object coordinates: {x: ${screenData.position.x}, y: ${screenData.position.y}, z: ${screenData.position.z} }` );  

                            
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
				const applyVertexColors = function( g, c ) {
					g.faces.forEach( function( f ) {
						const n = ( f instanceof THREE.Face3 ) ? 3 : 4;
						for ( let j = 0; j < n; j ++ ) {
							f.vertexColors[ j ] = c;
						}
					} );
				};

				for ( let i = 0; i < numObjects; i ++ ) {


					let geometry;
					if ( objectType == "cube" ) {
						geometry = new THREE.BoxGeometry( 1, 1, 1 );
					} else if ( objectType == "sphere" ) {
						geometry = new THREE.IcosahedronGeometry( 1, 1 );

					} else if ( objectType == "poly" ) {
						geometry = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
					}


					const position = new THREE.Vector3();

					position.x = Math.random() * 500;
					position.y = Math.random() * 400;
					position.z = Math.random() * 300;

					const rotation = new THREE.Euler();

					rotation.x = Math.random() * 2 * Math.PI;
					rotation.y = Math.random() * 2 * Math.PI;
					rotation.z = Math.random() * 2 * Math.PI;


					const scale = new THREE.Vector3();


					// give the geom's vertices a random color, to be displayed
					const color = new THREE.Color();

					color.setRGB( Math.random(), Math.random(), Math.random() );
					applyVertexColors( geometry, color );


					// Immediately use the texture for material creation
					const defaultMaterial     = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

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
            
            
            
            
          
            /*
             * Get Object Coordinate, Width and Height From Screen
             * Note: No data may be acquired without delay !!
             *
			 * @param  {THREE.Mesh} obj                           - Mesh object.
             * @param  {THREE.PerspectiveCamera} camera           - Mesh object.
			 * @param  {Number} rendererWidth                     - Width of renderer.
             * @param  {Number} rendererHeight                    - Height of renderer.
             * @param  {String} type                              - Build type.
             * @return {JSON}
             */
			/* @usage: 
			   const screenPos = nestedObjectToScreenXYZAndWH( displacementSprite , camera, renderer.domElement.width, renderer.domElement.height );
			  */
			function nestedObjectToScreenXYZAndWH( obj, camera, rendererWidth, rendererHeight ) {
                
                const vector = new THREE.Vector3();
                vector.setFromMatrixPosition( obj.matrixWorld );
                const widthHalf = rendererWidth/2;
                const heightHalf = rendererHeight/2;
                const aspect = rendererHeight/rendererWidth;
                vector.project( camera );
                vector.x = ( vector.x * widthHalf ) + widthHalf;
                vector.y = - ( vector.y * heightHalf ) + heightHalf;

                //compute bounding box after
                const boxInfo =  new THREE.Box3().setFromObject( obj ).getSize( new THREE.Vector3() );

                
                //Change it to fit the width and height of the stage based on the current value
                const ratioFixedNum = 7;
                
                //correction
                return {
                    position: vector,
                    width: ( boxInfo.x * ratioFixedNum * aspect ).toFixed( 2 ),
                    height: ( boxInfo.y * ratioFixedNum * aspect ).toFixed( 2 )
                };  
			}
			
			
            
           
            
            /*
             * Generate random number between two numbers
             *
             * @return {Number}
             */
			function getRandomFloat(min, max) {
				return Math.random() * (max - min) + min;
			}

            
            /*
             * Returns the degree from radian.
             *
             * @return {Number} rad - Value of radian.
             * @return {Number}
             * @usage: 
             
               angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
             */
            
            function getDegree( rad ) {
                return rad / Math.PI * 180;
            }

            
            /*
             * Returns the radian degree .
             *
             * @return {Number} deg - Value of degree.
             * @return {Number}
             * @usage: 
                
                rad = Math.PI / 180 * 30 ;
             */
            function getRadian( deg ) {
                return deg * Math.PI / 180;
            }

            
            /*
             * Convert three.js scene rotation to polar coordinates
             *
             * @return {Number} deg - Value of degree.
             * @return {Number}
             * @usage: 
             
                x = r * cos（θ）
                y = r * sin（θ）  
             */
            function getPolarCoord(x, y, z) {
                const nx = Math.cos(x) * Math.cos(y) * z,
                      nz = Math.cos(x) * Math.sin(y) * z,
                      ny = Math.sin(x) * z;
                return new THREE.Vector3(nx, ny, nz);
            }

            


			// 
			//-------------------------------------	
			return {
				init                : init,
				render              : render,
				getRendererCanvasID : function () { return rendererCanvasID; },
				getScene            : function () { return scene; },
				getCamera           : function () { return camera; } 
			};



		}();

		MainStage.init();
		MainStage.render();
		
		

    };

    module.components.documentReady.push( module.THREE_MOUSE_INTERACTION.documentReady );

	return class THREE_MOUSE_INTERACTION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );






