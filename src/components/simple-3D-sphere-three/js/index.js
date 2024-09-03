/* 
 *************************************
 * <!-- 3D Sphere Rotation -->
 *************************************
 */

/**
 * module.THREE_SPHERE_THREE
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/plugins/THREE
 */

import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';

import OrbitControls from '@uixkit/plugins/THREE/esm/controls/OrbitControls';

export const THREE_SPHERE_THREE = ( ( module, $, window, document ) => {
	if ( window.THREE_SPHERE_THREE === null ) return false;
	
	
	
    module.THREE_SPHERE_THREE               = module.THREE_SPHERE_THREE || {};
    module.THREE_SPHERE_THREE.version       = '0.0.2';
    module.THREE_SPHERE_THREE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-sphere-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {


            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
            
            
			const rendererCanvasID = '3D-sphere-three-canvas';




			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				controls,
				scene,
				light,
				renderer,
				displacementSprite;

			function init() {
				// camera
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
				camera.position.set( 0, -46, 18 );

				// controls
				controls = new THREE.OrbitControls( camera );
				controls.minDistance = 10;
				controls.maxDistance = 50;

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


				// axes
				//scene.add( new THREE.AxisHelper( 20 ) );

				// geometry
				const geometry = new THREE.SphereGeometry( 3, 32, 32 );

				// material, we create the material when the texture is loaded
				const loader = new THREE.TextureLoader();
				loader.crossOrigin = 'anonymous';

				const texture = loader.load( 'https://placehold.co/1650/1650/FF6600/jpg' ),
					  material = new THREE.MeshBasicMaterial( { map: texture } );

				// parent
				displacementSprite = new THREE.Object3D();
				scene.add( displacementSprite );

				// pivots
				const pivot1 = new THREE.Object3D(),
					  pivot2 = new THREE.Object3D(),
					  pivot3 = new THREE.Object3D();

				pivot1.rotation.z = 0;
				pivot2.rotation.z = 2 * Math.PI / 3;
				pivot3.rotation.z = 4 * Math.PI / 3;
				displacementSprite.add( pivot1 );
				displacementSprite.add( pivot2 );
				displacementSprite.add( pivot3 );

				// mesh
				const mesh1 = new THREE.Mesh( geometry, material ),
					  mesh2 = new THREE.Mesh( geometry, material ),
					  mesh3 = new THREE.Mesh( geometry, material );

				mesh1.position.y = 5;
				mesh2.position.y = 15;
				mesh3.position.y = 25;
				pivot1.add( mesh1 );
				pivot2.add( mesh2 );
				pivot3.add( mesh3 );


				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}

			function render() {
				requestAnimationFrame( render );

				displacementSprite.rotation.z += 0.01;


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
	
    module.components.documentReady.push( module.THREE_SPHERE_THREE.documentReady );
	

	return class THREE_SPHERE_THREE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );







