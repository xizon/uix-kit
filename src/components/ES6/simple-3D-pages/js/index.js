/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */

/**
 * module.THREE_PAGES
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
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


export const THREE_PAGES = ( ( module, $, window, document ) => {
	
	
	
	module.THREE_PAGES               = module.THREE_PAGES || {};
	module.THREE_PAGES.version       = '0.0.1';
	module.THREE_PAGES.documentReady = function( $ ) {


		//Prevent this module from loading in other pages
		if ( $( '#3D-renderer' ).length == 0 || ! Modernizr.webgl ) return false;

		var MainStage = function() {

			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight,
				viewRenderer              = '3D-renderer';


			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			var camera,
				controls,
				scene,
				light,
				renderer,
				clock = new THREE.Clock();



			function init() {
				//camera
				camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
				camera.position.set(0, 0, -1000);

				//controls
				controls = new THREE.OrbitControls( camera );
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.enableZoom = true;
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;
				controls.minDistance = 1000;
				controls.maxDistance = 1500;
				controls.maxPolarAngle = Math.PI / 2;

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
				var target  = $( '#html3D-view' ).clone(),
					pages   = target.find( '.html3D-view-content' );

				pages.each( function() {
					var el = new THREE.CSS3DObject( $.parseHTML( $( this )[0].outerHTML )[0] );

					el.position.x = $( this ).data( 'position-x' ) || 0;
					el.position.y = $( this ).data( 'position-y' ) || 0;
					el.position.z = $( this ).data( 'position-z' ) || 0;
					el.rotation.x = $( this ).data( 'rotation-x' ) || 0;
					el.rotation.y = $( this ).data( 'rotation-y' ) || 3.14159265358979;
					el.rotation.z = $( this ).data( 'rotation-z' ) || 0;

					scene.add( el );
				});




				//CSS3D Renderer
				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( windowWidth, windowHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = 0;
				document.getElementById( viewRenderer ).appendChild( renderer.domElement );

				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}

			function render() {
				requestAnimationFrame( render );

				var delta = clock.getDelta();

				//update camera and controls
				controls.update();

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
				init      : init,
				render    : render,
				getScene  : function () { return scene; },
				getCamera : function () { return camera; } 
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

