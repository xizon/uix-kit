/* 
 *************************************
 * <!-- 3D Background 3 with three.js -->
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



export const THREE_BACKGROUND_THREE3 = ( ( module, $, window, document ) => {
	if ( window.THREE_BACKGROUND_THREE3 === null ) return false;
	
	
	
    module.THREE_BACKGROUND_THREE3               = module.THREE_BACKGROUND_THREE3 || {};
    module.THREE_BACKGROUND_THREE3.version       = '0.0.2';
    module.THREE_BACKGROUND_THREE3.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas3' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
            
			const	rendererCanvasID = '3D-background-three-canvas3';


			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				scene,
				renderer,
				displacementSprite,
				theta        = 0;

			const mouseVector  = new THREE.Vector2(),
				  sphereTarget = new THREE.Euler(),
				  xrad         = THREE.Math.degToRad(30),
				  yrad         = THREE.Math.degToRad(10);


			function init() {
				//camera
				camera = new THREE.PerspectiveCamera( 50, windowWidth / windowHeight, .01, 1000 );
				camera.position.set( 0, 0, 1.8 );



				//Scene
				scene = new THREE.Scene();


				//WebGL Renderer	
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );


				// Immediately use the texture for material creation
				const sphereGeo = new THREE.SphereBufferGeometry( 2, 12, 12 );
				const sphereMat = new THREE.MeshBasicMaterial({
					color: 0x494949,
					wireframe: true
				});
				displacementSprite = new THREE.Mesh( sphereGeo, sphereMat );
				displacementSprite.position.y = -0.2;
				scene.add( displacementSprite );


				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );


			}

			function render() {
				requestAnimationFrame( render );

				theta += 0.1;

				//To set a background color.
				renderer.setClearColor( 0x000000 );	



				lerp( displacementSprite.rotation, 'x', sphereTarget.x );
				lerp( displacementSprite.rotation, 'y', sphereTarget.y );


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
				// NDC -1 to 1
				const rect = renderer.domElement.getBoundingClientRect();
				mouseVector.x = ( event.clientX - rect.left ) / rect.width * 2 - 1;
				mouseVector.y = ( event.clientY - rect.top ) / rect.height * -2 + 1;

				sphereTarget.y = mouseVector.x * xrad;
				sphereTarget.x = - mouseVector.y * yrad;
			}

			//Calculate the interpolation of two vectors
			function lerp( object, prop, destination ) {
				if (object && object[prop] !== destination) {
					object[prop] += (destination - object[prop]) * 0.1;

					if (Math.abs(destination - object[prop]) < 0.001) {
						object[prop] = destination;
					}
				}
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

    module.components.documentReady.push( module.THREE_BACKGROUND_THREE3.documentReady );
	

	return class THREE_BACKGROUND_THREE3 {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


	

