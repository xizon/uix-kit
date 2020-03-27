/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */

/**
 * module.THREE_PARTICLE
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


export const THREE_PARTICLE = ( ( module, $, window, document ) => {
	if ( window.THREE_PARTICLE === null ) return false;
	
    module.THREE_PARTICLE               = module.THREE_PARTICLE || {};
    module.THREE_PARTICLE.version       = '0.0.6';
    module.THREE_PARTICLE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-particle-effect-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {



            const $window          = $( window );
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;

            const rendererCanvasID = '3D-particle-effect-canvas';

			let renderer, 
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



            //background
            const backgroundBg = 0xCE3A3E;
            const backgroundPlane = 0xDE510E;
            
            
            // Light from scene ready
            let sceneForLightPlane, sceneForSpotLight, sceneForAmbientLight;        
            
            // camera data
            let fieldOfView, aspectRatio, nearPlane, farPlane;
            let dist, vFOV, visibleHeight, visibleWidth;
            let xLimit, yLimit;   
            const maxTargetZ = 200;
            
            
			//particle rotation
			let particleRotation;

			const centerVector = new THREE.Vector3(0, 0, 0);
			let previousTime = 0;



			function init() {

				//==================================
                //==================================
				//camera
                fieldOfView = 60;
                aspectRatio = windowWidth / windowHeight;
                nearPlane = 1; // the camera won't "see" any object placed in front of this plane
                farPlane = 10000; // the camera wont't see any object placed further than this plane 
				camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, nearPlane, farPlane );
				camera.position.set(0, 65, -500);
				camera.lookAt( centerVector );
                
                
                // convert the field of view to radians
                const ang = (fieldOfView / 2) * Math.PI / 180;
                // calculate the max y position seen by the camera related to the maxTargetZ position, I start by calculating the y limit because fielOfView is a vertical field of view. I then calculate the x Limit
                yLimit = (camera.position.z + maxTargetZ) * Math.tan(ang); // this is a formula I found, don't ask me why it works, it just does :) 
                // Calculate the max x position seen by the camera related to the y Limit position
                xLimit = yLimit * camera.aspect;
                
                
                // Fit plane to screen
                dist = 1000;
                vFOV = THREE.Math.degToRad( camera.fov );              // convert vertical fov to radians
                visibleHeight   = 2 * Math.tan( vFOV / 2 ) * dist;     // visible height
                visibleWidth    = visibleHeight * camera.aspect;       // visible width   
                
                //console.log( 'visibleWidth:' + visibleWidth + ', visibleHeight: ' + visibleHeight + ', xLimit: ' + xLimit + ', yLimit: ' + yLimit );
                
                
                
				
				//==================================
                //==================================
				//Scene
				scene = new THREE.Scene();
                scene.fog = new THREE.Fog(backgroundBg, 0.0025, 650); // Used to cover the light plane
  
        
        
				//==================================
                //==================================
				//Light from scene ready
                
                // Light plane  
                sceneForLightPlane = new THREE.Mesh(new THREE.CircleGeometry(1000, 32), new THREE.MeshPhongMaterial({emissive: backgroundPlane, side: THREE.DoubleSide, }));
                sceneForLightPlane.receiveShadow = true;
                sceneForLightPlane.position.set(0, -101, 5);
                sceneForLightPlane.rotation.x = getRadian( -95 );
                scene.add(sceneForLightPlane);
                

                // Spot Light
                const spotLightColor = 0xffffff,
                      spotLightIntensity = 2,
                      spotLightDistance = 1200,
                      spotLightAngle = getRadian( 50 ),
                      spotLightPenumbra = 1,
                      spotLightDecay = 1;
                
                sceneForSpotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity, spotLightDistance, spotLightAngle, spotLightPenumbra, spotLightDecay);
                sceneForSpotLight.position.set(5, 320, 5); // Setting the y-axis bond angle is critical
                
                
                sceneForSpotLight.castShadow = true;
                sceneForSpotLight.shadow.mapSize.width = 1024;
                sceneForSpotLight.shadow.mapSize.height = 1024;
                sceneForSpotLight.shadow.camera.near = 0.5;
                sceneForSpotLight.shadow.camera.far = 31;
                scene.add(sceneForSpotLight);
                
                //console.log( sceneForSpotLight );
                
                /*
                const spotLightHelper = new THREE.SpotLightHelper( sceneForSpotLight );
                scene.add( spotLightHelper );   
                */
     
                

                // Ambient Light
                sceneForAmbientLight = new THREE.AmbientLight(0xffffff, 0.08);
                scene.add(sceneForAmbientLight); 


                
                
                
				//==================================
                //==================================
				//WebGL Renderer		
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                


				// instantiate a loader
				const loader = new THREE.TextureLoader();

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
						const geometry = new THREE.Geometry();
						const material = new THREE.PointsMaterial({
							size: 3,
							color: 0xffffff,
							sizeAttenuation: false,
                            fog : false //Excluding objects from fog
						});

                 
						for (let y = 0, y2 = imagedata.height; y < y2; y += 2) {

							for (let x = 0, x2 = imagedata.width; x < x2; x += 2) {

								if ( imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128 ) {


									// The array of vertices holds the position of every vertex in the model.
									const vertex = new THREE.Vector3();


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
                        particles.scale.setScalar( 0.7 );
                        particles.position.y = 50;
                        particles.position.z = 70;
                        particles.rotation.y = getRadian( 180 );

                        // set castShadow to object
                        particles.castShadow = true;
                        



					},

					// onProgress callback currently not supported
					undefined,

					// onError callback
					function ( err ) {
						console.error( 'An error happened.' );
					}
				);



				// add particle rotation
				particleRotation = new THREE.Object3D();
				scene.add( particleRotation );
                


				const geometryPR = new THREE.TetrahedronGeometry(2, 0),
					materialPR = new THREE.MeshPhongMaterial({
					color: 0xffffff,
                    emissive: 0xffffff,
                    shininess: 80,
					flatShading: true,
				});
              
				for (let i = 0; i < 750; i++) {
					const mesh = new THREE.Mesh( geometryPR, materialPR );
					mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
					mesh.position.multiplyScalar(90 + (Math.random() * 700));
					mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
					particleRotation.add(mesh);
                    
                    // set castShadow to object
                    mesh.castShadow = true;  
                    
				}
             

				//----
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, browser.supportsPassive ? { passive: true } : false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, browser.supportsPassive ? { passive: true } : false );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );



				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );	
			}





			function render() {
				requestAnimationFrame( render );

				const delta      = clock.getDelta(),
					  thickness = 40;

                //---
                // 
				// To set a background color.
				renderer.setClearColor( backgroundBg );	
                

                //---
                // 
				//Need to add judgment to avoid Cannot read property 'geometry' of undefined
				if ( typeof particles != typeof undefined ) {

                    let particle;
                    
					for (let i = 0, j = particles.geometry.vertices.length; i < j; i++) {
						particle = particles.geometry.vertices[i];
						particle.x += (particle.destination.x - particle.x) * particle.speed;
						particle.y += (particle.destination.y - particle.y) * particle.speed;
						particle.z += (particle.destination.z - particle.z) * particle.speed;
					}


					if ( delta - previousTime > thickness ) {
						const index     = Math.floor(Math.random()*particles.geometry.vertices.length);
						const particle1 = particles.geometry.vertices[index];
						const particle2 = particles.geometry.vertices[particles.geometry.vertices.length-index];

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
                if ( camera.position.y < -60 ) camera.position.y = -60;
				camera.lookAt( centerVector );


				//particle rotation
				particleRotation.rotation.x += 0.0000;
				particleRotation.rotation.y -= 0.0040;

                
                
                //---
                // 
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

                
                
                //---
                // 
                //render the scene to display our scene through the camera's eye.
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
			 * @param  {!Element} image         - Overridden with a record type holding data, width and height.
			 * @return {Object}                 - The image data via JSON.
			 */
			function getImageData( image ) {

				const canvas = document.createElement( 'canvas' );
				canvas.width = image.width;
				canvas.height = image.height;

				const ctx = canvas.getContext( '2d' );
				ctx.drawImage(image, 0, 0);

				return ctx.getImageData(0, 0, image.width, image.height);
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

    module.components.documentReady.push( module.THREE_PARTICLE.documentReady );

	return class THREE_PARTICLE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


