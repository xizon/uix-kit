/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */
/**
 * module.THREE_MOUSE_INTERACTION2
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
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


export const THREE_MOUSE_INTERACTION2 = ( ( module, $, window, document ) => {
	if ( window.THREE_MOUSE_INTERACTION2 === null ) return false;
	
	
	
    module.THREE_MOUSE_INTERACTION2               = module.THREE_MOUSE_INTERACTION2 || {};
    module.THREE_MOUSE_INTERACTION2.version       = '0.0.5';
    module.THREE_MOUSE_INTERACTION2.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-mouseinteraction2-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		

	
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            const $window          = $( window );
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;

            const rendererCanvasID          = '3D-mouseinteraction2-three-canvas';



			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				scene,
				light,
				renderer,
				displacementSprite,
				theta         = 0,
				clickEnable   = false;


			// controls
			const scroller = new CameraScroller({direction: "y"});


			// mouse
			const mouseVector = new THREE.Vector2();
            
			let	raycaster,
				intersects,
				INTERSECTED,
				nucleus,
				atoms = [];



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

				//Mouse interactions
				raycaster.setFromCamera( mouseVector, camera );
				intersects = raycaster.intersectObjects( atoms );
				//intersects = raycaster.intersectObjects( scene.children );




				if ( intersects.length > 0 && intersects[0].object.name.indexOf( 'nucleus' ) >= 0 ) {

                    
                    const _obj = intersects[0].object;
                    
					const targetAtomPos = _obj.position;
                    
					console.log(targetAtomPos); 
                    

					// targetAtomPos.tween.pause();
					const destinationPos = targetAtomPos.clone();

					// jump to new position
					// y movement via scroller object
					// x and z movement via TWEEN
					scroller.targetPosition = _obj.position.y/10000;
					const targetPos = { x: _obj.position.x, y:_obj.position.y, z:_obj.position.z+1100};

					TweenMax.to( targetPos, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z});
					TweenMax.to( camera.position, 2,{ x:destinationPos.x, y:destinationPos.y, z:destinationPos.z+1000,
						onUpdate:function(){
							camera.up.set(0,1,0);
							camera.updateProjectionMatrix();
						},
                        onComplete: function() {
                            
                            // get object new coordinates
                            const screenData = nestedObjectToScreenXYZAndWH( _obj, camera, renderer.domElement.width, renderer.domElement.height );
                            console.log( `Current object coordinates: {x: ${screenData.position.x}, y: ${screenData.position.y}, z: ${screenData.position.z} }` ); 
                            
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

				const geometry = new THREE.Geometry();

				const applyVertexColors = function(g, c) {
					g.faces.forEach(function(f) {
						const n = (f instanceof THREE.Face3) ? 3 : 4;
						for (let j = 0; j < n; j++) {
							f.vertexColors[j] = c;
						}
					});
				};

				for ( let i = 0; i < numObjects; i ++ ) {

					let geom; 
                    const color = new THREE.Color();



					const position = new THREE.Vector3();
					position.x = -9000 + (i % 10) * 2000;
					position.y = -9000 + Math.floor((i % 100) / 10) * 2000;
					position.z = -1000 + Math.floor(i / 100) * 2000;

					const rotation = new THREE.Euler();
					rotation.x = 0;
					rotation.y = 0;
					rotation.z = 0;

					const scale = new THREE.Vector3();
					scale.x = 1200;
					scale.y = 600;
					scale.z = 200;

					geom = new THREE.BoxGeometry( 1, 1, 1 );
					color.setRGB( 0, 0, Math.random() + 0.1 );



					// give the geom's vertices a random color, to be displayed
					applyVertexColors( geom, color );


					// Immediately use the texture for material creation
					const defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

					displacementSprite = new THREE.Mesh( geom, defaultMaterial );
					scene.add( displacementSprite );

					const object = new THREE.Mesh( geom );
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
					this.domElem.addEventListener('touchstart', this.onDocumentTouchStart, browser.supportsPassive ? { passive: true } : false);
					this.domElem.addEventListener('touchmove', this.onDocumentTouchMove, browser.supportsPassive ? { passive: true } : false);
					this.domElem.addEventListener('wheel', this.onDocumentMousewheel, browser.supportsPassive ? { passive: true } : false);
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

    module.components.documentReady.push( module.THREE_MOUSE_INTERACTION2.documentReady );
	

	return class THREE_MOUSE_INTERACTION2 {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );






