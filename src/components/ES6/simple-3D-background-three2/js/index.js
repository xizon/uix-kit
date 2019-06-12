/* 
 *************************************
 * <!-- 3D Background 2 with three.js -->
 *************************************
 */
/**
 * module.THREE_BACKGROUND_THREE2
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



export const THREE_BACKGROUND_THREE2 = ( ( module, $, window, document ) => {
	
	
    module.THREE_BACKGROUND_THREE2               = module.THREE_BACKGROUND_THREE2 || {};
	module.THREE_BACKGROUND_THREE2.version       = '0.0.2';
    module.THREE_BACKGROUND_THREE2.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas2' ).length == 0 || ! Modernizr.webgl ) return false;
		
		

		var MainStage = function() {

			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight,
				rendererCanvasID          = '3D-background-three-canvas2';
			
			
			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			var camera,
				scene,
				renderer,
				material,
				displacementSprite,
				clock = new THREE.Clock();


			var mouseVector  = new THREE.Vector2(),
				vertex       = document.getElementById( 'vertexshader' ).textContent,
				fragment     = document.getElementById( 'fragmentshader' ).textContent;

			var mouseX = 0;
			var mouseY = 0;



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
				material = new THREE.ShaderMaterial({
					uniforms: {
						"time": { value: 1.0 },
						"texture": { value: new THREE.TextureLoader().load( $( '#' + rendererCanvasID ).data( 'filter-texture' ) ) }
					},
					fragmentShader: fragment,
					vertexShader: vertex
				});			



				//if use texture
				material.uniforms.texture.value.wrapS = THREE.RepeatWrapping;
				material.uniforms.texture.value.wrapT = THREE.RepeatWrapping;


				var geometry = new THREE.SphereGeometry(5, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
				displacementSprite = new THREE.Mesh( geometry, material );
				scene.add( displacementSprite );


				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );


			}

			function render() {
				requestAnimationFrame( render );

				var delta = clock.getDelta();

				//To set a background color.
				renderer.setClearColor( 0x000000 );	


				material.uniforms.time.value += delta * 5;


				//displacementSprite.rotation.y += delta * 0.5 * 1;
				//displacementSprite.rotation.x += delta * 0.5 * -1;



				renderer.render( scene, camera );


			}


			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseMove( event ) {

				var rect = renderer.domElement.getBoundingClientRect();
				displacementSprite.position.z = ( event.clientX - rect.left ) / rect.width * 4 - 1;

			}



			function avgArr(arr) {
				var total = arr.reduce(function(sum, b) {
					return sum + b
				});
				return (total / arr.length);
			}
			function maxArr(arr) {
				return arr.reduce(function(a, b) {
					return Math.max(a, b);
				})
			}
			function degToRad(degrees) {
				return degrees * Math.PI / 180;
			}
			function round(n, digits) {
				return Number(n.toFixed(digits));
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

    module.components.documentReady.push( module.THREE_BACKGROUND_THREE2.documentReady );
	

	return class THREE_BACKGROUND_THREE2 {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


