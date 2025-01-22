/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */

/**
 * module.THREE_PAGES
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/plugins/THREE
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';

import { OrbitControls } from '@uixkit/plugins/THREE/esm/controls/OrbitControls';
import { CSS3DObject, CSS3DRenderer } from '@uixkit/plugins/THREE/esm/renderers/CSS3DRenderer';


export const THREE_PAGES = ( ( module, $, window, document ) => {
	if ( window.THREE_PAGES === null ) return false;
	
	
	module.THREE_PAGES               = module.THREE_PAGES || {};
    module.THREE_PAGES.version       = '0.0.5';
	module.THREE_PAGES.documentReady = function( $ ) {


		//Prevent this module from loading in other pages
		if ( $( '#3D-renderer' ).length == 0 || ! Modernizr.webgl ) return false;

        
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {


            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
            
			const viewRenderer = '3D-renderer';


			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				controls,
				scene,
				light,
				renderer,
				clock = new THREE.Clock();



			function init() {
				//camera
				camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
				camera.position.set(0, 0, -1000);

				//Scene
				scene = new THREE.Scene();

				//HemisphereLight
				light = new THREE.HemisphereLight( 0xffbf67, 0x15c6ff );
				scene.add( light );

				//WebGL Renderer
				renderer = new THREE.WebGLRenderer( { 
										alpha    : true, 
										antialias: true 
									} );
				renderer.setClearColor( 0xffffff, 0 );
				renderer.setSize( windowWidth - 50, windowHeight - 50 );
				renderer.domElement.style.zIndex = 5;
				document.getElementById( viewRenderer ).appendChild( renderer.domElement );



				//Add HTML elements to scene
				const target  = $( '#html3D-view' ).clone(),
					  pages   = target.find( '.html3D-view-content' );

				pages.each( function() {
					const el = new CSS3DObject( $.parseHTML( $( this )[0].outerHTML )[0] );

					el.position.x = $( this ).data( 'position-x' ) || 0;
					el.position.y = $( this ).data( 'position-y' ) || 0;
					el.position.z = $( this ).data( 'position-z' ) || 0;
					el.rotation.x = $( this ).data( 'rotation-x' ) || 0;
					el.rotation.y = $( this ).data( 'rotation-y' ) || 3.14159265358979;
					el.rotation.z = $( this ).data( 'rotation-z' ) || 0;

					scene.add( el );
				});




				//CSS3D Renderer
				renderer = new CSS3DRenderer();
				renderer.setSize( windowWidth, windowHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = 0;
				document.getElementById( viewRenderer ).appendChild( renderer.domElement );


                //


				//controls
				controls = new OrbitControls(camera, renderer.domElement);
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.enableZoom = true;
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;
				controls.screenSpacePanning = false;
				controls.minDistance = 1000;
				controls.maxDistance = 1500;
				controls.maxPolarAngle = Math.PI / 2;

                

				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}

			function render() {
				requestAnimationFrame( render );

				const delta = clock.getDelta();

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

	module.components.documentReady.push( module.THREE_PAGES.documentReady );

	return class THREE_PAGES {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

