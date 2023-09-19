/* 
 *************************************
 * <!-- 3D Background 1 with three.js -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

import ShaderRuntime from '@uixkit/plugins/THREE/esm/extensions/ShaderRuntime.custom';

export const THREE_BACKGROUND_THREE = ( ( module, $, window, document ) => {
	if ( window.THREE_BACKGROUND_THREE === null ) return false;
	
	
	
    module.THREE_BACKGROUND_THREE               = module.THREE_BACKGROUND_THREE || {};
    module.THREE_BACKGROUND_THREE.version       = '0.0.6';
    module.THREE_BACKGROUND_THREE.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		


        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {
			
            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;


            const rendererCanvasID = '3D-background-three-canvas';

			

			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				scene,
				light,
				renderer,
				displacementSprite,
				shaderSprite,
				clock = new THREE.Clock();


			// controls

			let spriteAnim = false;

			let mouseX       = 0,
				mouseY       = 0,
				windowHalfX  = windowWidth / 2,
				windowHalfY  = windowHeight / 2;

			let targetX = 0.0, 
				targetY = 0.0,
				angle   = 0.0,
				height  = 0.0,
				target  = new THREE.Vector3();


			// Load multiple ShaderFrog shaders
			const runtime = new ShaderRuntime();

			runtime.load([
				$( '#' + rendererCanvasID ).data( 'shader-url' )
			], function( shaders ) {

				// Get the Three.js material you can assign to your objects
				const material = runtime.get( shaders[0].name );
				shaderSprite.material = material;

			});


			

			function init() {
				//camera
				camera = new THREE.PerspectiveCamera( 60, windowWidth / windowHeight, 100, 2000000 );
				camera.position.set( 0, 100, 2000 );

				runtime.registerCamera( camera );


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


				//Add shader background
				const geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2);
				shaderSprite = new THREE.Mesh( geometry );
				shaderSprite.scale.setScalar( 10000 );
				shaderSprite.renderDepth = 0;
				scene.add( shaderSprite );


				// Immediately use the texture for material creation
				const defaultMaterial    = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

				displacementSprite = generateGeometry( 'sphere', 200, defaultMaterial);
				scene.add( displacementSprite );



				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );


			}

			function render() {
				requestAnimationFrame( render );

				const objVector = new THREE.Vector3(0,0.2,0.1),
					  delta     = clock.getDelta();

				if ( ! spriteAnim ) {
					displacementSprite.rotation.x += delta * objVector.x;
					displacementSprite.rotation.y += delta * objVector.y;
					displacementSprite.rotation.z += delta * objVector.z;
				}



				//To set a background color.
				renderer.setClearColor( 0x000000 );	


				//update shaders
				runtime.updateShaders( clock.getElapsedTime() );



				// update camera
				targetX = mouseX * .002;
				targetY = mouseY * .002;

				angle  += 0.01 * ( targetX - angle );
				height += 0.01 * ( targetY - height );

				const x = -Math.sin( angle * 1.5 ) * 35;
				const z =  Math.cos( angle * 1.5 ) * 35;
				const y = 130 * height + 0;

				camera.position.set( x, y, z );
				camera.lookAt( target );	


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
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;	

			}

			function onDocumentMouseDown( event ) {
				event.preventDefault();
				spriteAnim = true;
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;	


			}

			function onDocumentMouseUp( event ) {
				event.preventDefault();
				spriteAnim = false;
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}



			/*
			 * Batch generation of geometry
			 *
			 * @param  {String} objectType     - String of geometry type identifier.
			 * @param  {Number} numObjects       - The total number of generated objects.
             * @param  {THREE.Material} customMaterial  - The Material.
			 * @return {Void}
			 */
			function generateGeometry( objectType, numObjects, customMaterial ) {

                const group = new THREE.Group();

				const applyVertexColors = function(g, c) {

                    /*

                    for threejs-r134+:
                    
                    const faces = [];

                    // This gets the array of all positions [x, y, z, x, y, z, x, y z,...]
                    const positions = g.attributes.position.array; 

                    // This gets # of vertices
                    const vertexCount = g.attributes.position.count;

               
                    // Each loop counts up by 3
                    for (let i3 = 0; i3 < vertexCount; i3 +=3) {
                        const singleVertex = new THREE.Vector3();
                        singleVertex.set(
                            positions[i3 + 0],
                            positions[i3 + 1],
                            positions[i3 + 2]
                        );
                        faces.push(singleVertex);
                    }
                    */
                    
					g.faces.forEach(function(f) {
						const n = (f instanceof THREE.Face3) ? 3 : 4;
						for (let j = 0; j < n; j++) {
							f.vertexColors[j] = c;
						}
					});
				};

				for ( let i = 0; i < numObjects; i ++ ) {

					const position = new THREE.Vector3();
					position.x = Math.random() * 10000 - 5000;
					position.y = Math.random() * 6000 - 3000;
					position.z = Math.random() * 8000 - 4000;

					const rotation = new THREE.Euler();
					rotation.x = Math.random() * 2 * Math.PI;
					rotation.y = Math.random() * 2 * Math.PI;
					rotation.z = Math.random() * 2 * Math.PI;

					const scale = new THREE.Vector3();
					scale.x = Math.random() * 200 + 100;


					let geom;
					const color = new THREE.Color();


					if ( objectType == "cube" ) {

						geom = new THREE.BoxGeometry( 1, 1, 1 );
						scale.y = Math.random() * 200 + 100;
						scale.z = Math.random() * 200 + 100;
						color.setRGB( 0, 0, Math.random() + 0.1 );

					} else if ( objectType == "sphere" ) {

						geom = new THREE.IcosahedronGeometry( 1, 1 );
						scale.y = scale.z = scale.x;
						color.setRGB( 0.35, getRandomFloat( 0.12, 0.3 ), 0.2 );

					} else if ( objectType == "poly" ) {


						geom = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
						scale.y = Math.random() * 30;
						scale.z = Math.random() * 30;
						color.setRGB( Math.random() + 0.1, 0, 0 );

					}


					// give the geom's vertices a random color, to be displayed
					applyVertexColors( geom, color );

					const object = new THREE.Mesh( geom, customMaterial );
					object.position.copy( position );
					object.rotation.copy( rotation );
					object.scale.copy( scale );
					object.updateMatrix(); // Updates the local transform.

                    group.add( object );

				}

				return group;


			}


			//Generate random number between two numbers
			function getRandomFloat(min, max) {
				return Math.random() * (max - min) + min;
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

    module.components.documentReady.push( module.THREE_BACKGROUND_THREE.documentReady );
	

	return class THREE_BACKGROUND_THREE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




