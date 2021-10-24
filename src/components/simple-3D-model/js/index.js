/* 
 *************************************
 * <!-- 3D Model -->
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
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

import GLTFLoader from '@uixkit/plugins/THREE/esm/loaders/GLTFLoader';


export const THREE_MODEL = ( ( module, $, window, document ) => {
	if ( window.THREE_MODEL === null ) return false;
	
	
	
    module.THREE_MODEL               = module.THREE_MODEL || {};
    module.THREE_MODEL.version       = '0.0.5';
    module.THREE_MODEL.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-model-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;

            const rendererCanvasID          = '3D-model-canvas';




			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				scene,
				lights = [],
				renderer,
				displacementSprite,
				theta        = 0;


			
			let mixerGLTF;
			const radius = 600;
			let prevTime = Date.now();
			
			

			function init() {
				
				
				//=================
				//camera
				camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
				camera.position.set( 0, 0, 100 );
				camera.target = new THREE.Vector3( 0, 150, 0 );

	

				//=================
				//Scene
				scene = new THREE.Scene();

				//=================
				//Lights
				lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
				lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
				lights[ 2 ] = new THREE.DirectionalLight( 0xffffff );

				lights[ 0 ].position.set( 0, 200, 0 );
				lights[ 1 ].position.set( 100, 200, 100 );
				lights[ 2 ].position.set( 120, 200, 0 );
				lights[ 2 ].intensity = 0.6;

				scene.add( lights[ 0 ] );
				scene.add( lights[ 1 ] );
				scene.add( lights[ 2 ] );
				



				//=================
				//WebGL Renderer	
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );


				
				//=================
                displacementSprite = new THREE.Object3D();
				const manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				const textureURL = ( typeof $( '#' + rendererCanvasID ).data( 'texture-src' ) != typeof undefined ) ? $( '#' + rendererCanvasID ).data( 'texture-src' ) : templateUrl + '/assets/models/gltf/project.jpg';
				const objURL = ( typeof $( '#' + rendererCanvasID ).data( 'model-src' ) != typeof undefined ) ? $( '#' + rendererCanvasID ).data( 'model-src' ) : templateUrl + '/assets/models/gltf/project.glb';
				
				const textureLoader = new THREE.TextureLoader( manager ),
					texture       = textureLoader.load( textureURL ),
					onProgress    = function ( xhr ) {
						if ( xhr.lengthComputable ) {
							const percentComplete = xhr.loaded / xhr.total * 100;
							console.log( Math.round(percentComplete, 2) + '% downloaded' );
						}
					},
					onError       = function ( xhr ) { };


				const loader        = new THREE.GLTFLoader( manager );
                loader.crossOrigin = 'anonymous';
				loader.load( objURL, function ( object ) {

					
					const gltfMesh = object.scene.children[ 0 ];
					object.scene.children[ 0 ].traverse( function( child ) {            
					   if ( ( child instanceof THREE.Mesh ) ) { 
						   console.log( child );


						    child.material.emissive = new THREE.Color( 0xff6600 );  // -> color
						    child.material.normalMap = texture; // -> map
						    child.material.shadowSide = THREE.DoubleSide; // -> side
						    child.material.wireframe = false; // -> wireframe
						    child.material.emissiveIntensity = 0.5;  // -> shininess
						   
						   //Excluding objects from fog
						    child.material.fog = false; // -> fog
						   
	
							// set castShadow to object
							child.castShadow = true;

						}
					});
					
					
					
					/*
					If you can not use `object.scene.children[ 0 ]`, use the following code:
					

					const gltfMesh = object.scene;
					object.scene.traverse( function( child ) {            
					   if ( ( child instanceof THREE.Mesh ) ) { 


							child.material = new THREE.MeshPhongMaterial( {
												color: 0xdddddd,
												shininess: 80,
												wireframe: true,
												map: mainSceneImgTexture,
												side: THREE.DoubleSide,
												fog : false //Excluding objects from fog
											} );

							// set castShadow to object
							child.castShadow = true;

						}
					});

					
					*/
					
					displacementSprite.add( gltfMesh );
				
					displacementSprite.scale.set( 1.2, 1.2, 1.2 );
					displacementSprite.position.y = 100;
					scene.add( displacementSprite );
					
					
					

                    // set the original position
                    displacementSprite.origPos	= {
                        x: displacementSprite.position.x,
                        y: displacementSprite.position.y,
                        z: displacementSprite.position.z,
                        rx: displacementSprite.rotation.x,
                        ry: displacementSprite.rotation.y,
                        rz: displacementSprite.rotation.z
                    };

					

					// set animation
					mixerGLTF = new THREE.AnimationMixer( displacementSprite );
					console.log(mixerGLTF);
					object.animations.forEach((el) => {

						const thisAction = mixerGLTF.clipAction( el );
						thisAction.setDuration( 1 );

						
						if(thisAction.time === 0) {
							thisAction.time = thisAction.getClip().duration;
						}

						//console.log( 'thisAction.time: ' + thisAction.time );
						console.log( thisAction );

						thisAction.paused = false;
						//thisAction.timeScale = -1; //Reverse Keyframe animation
						thisAction.play();


					});
					
					
					

				}, onProgress, onError );



				//=================
				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}

			function render() {
				requestAnimationFrame( render );

				theta += 0.1;

				camera.position.x = radius * Math.sin( getRadian( theta ) );
				camera.position.z = radius * Math.cos( getRadian( theta ) );

				camera.lookAt( camera.target );
				
				
				if ( mixerGLTF ) {

					const time = Date.now();
					mixerGLTF.update( ( time - prevTime ) * 0.001 );
					prevTime = time;
					
					//
					//const delta  clock.getDelta();
					//mixerGLTF.update( delta );
					

				}
				
				

				//To set a background color.
				//renderer.setClearColor( 0x000000 );	


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

    module.components.documentReady.push( module.THREE_MODEL.documentReady );
	

	return class THREE_MODEL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


