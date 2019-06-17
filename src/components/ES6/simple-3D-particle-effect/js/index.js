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
    module.THREE_PARTICLE.version       = '0.0.3';
    module.THREE_PARTICLE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-particle-effect-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		
		var MainStage = function() {


			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight,
				rendererCanvasID          = '3D-particle-effect-canvas';

			var renderer, 
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




			//particle rotation
			var particleRotation;

			var centerVector = new THREE.Vector3(0, 0, 0);
			var previousTime = 0;



			function init() {

				//@https://github.com/mrdoob/three.js/blob/dev/src/extras/ImageUtils.js#L21
				THREE.ImageUtils.crossOrigin = '';

				//WebGL Renderer		
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );


				renderer.setSize(windowWidth, windowHeight);




				//Scene
				scene = new THREE.Scene();

				//camera
				camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, 0.1, 10000);
				camera.position.set(-100, 0, 600);
				camera.lookAt( centerVector );
				scene.add( camera );


				// instantiate a loader
				var loader = new THREE.TextureLoader();

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
						var geometry = new THREE.Geometry();
						var material = new THREE.PointsMaterial({
							size: 3,
							color: 0xffffff,
							sizeAttenuation: false
						});



						for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {

							for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {

								if ( imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128 ) {


									// The array of vertices holds the position of every vertex in the model.
									var vertex = new THREE.Vector3();


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
				var geometryPR = new THREE.TetrahedronGeometry(2, 0),
					materialPR = new THREE.MeshPhongMaterial({
					color: 0xffffff,
					flatShading: THREE.FlatShading
				});

				for (var i = 0; i < 1000; i++) {
					var mesh = new THREE.Mesh( geometryPR, materialPR );
					mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
					mesh.position.multiplyScalar(90 + (Math.random() * 700));
					mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
					particleRotation.add(mesh);
				}

				var ambientLight = new THREE.AmbientLight(0x999999 );
				scene.add(ambientLight);

				var lights = [];
				lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
				lights[0].position.set( 1, 0, 0 );
				lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
				lights[1].position.set( 0.75, 1, 0.5 );
				lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
				lights[2].position.set( -0.75, -1, 0.5 );
				scene.add( lights[0] );
				scene.add( lights[1] );
				scene.add( lights[2] );




				//----
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );



				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );	
			}





			function render() {
				requestAnimationFrame( render );

				var delta      = clock.getDelta(),
					thickness = 40;


				//Need to add judgment to avoid Cannot read property 'geometry' of undefined
				if ( typeof particles != typeof undefined ) {

					for (var i = 0, j = particles.geometry.vertices.length; i < j; i++) {
						var particle = particles.geometry.vertices[i];
						particle.x += (particle.destination.x - particle.x) * particle.speed;
						particle.y += (particle.destination.y - particle.y) * particle.speed;
						particle.z += (particle.destination.z - particle.z) * particle.speed;
					}


					if ( delta - previousTime > thickness ) {
						var index     = Math.floor(Math.random()*particles.geometry.vertices.length);
						var particle1 = particles.geometry.vertices[index];
						var particle2 = particles.geometry.vertices[particles.geometry.vertices.length-index];

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
				camera.lookAt( centerVector );


				//particle rotation
				particleRotation.rotation.x += 0.0000;
				particleRotation.rotation.y -= 0.0040;


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
			 * @param  {Object} image         - Overridden with a record type holding data, width and height.
			 * @return {JSON}                 - The image data.
			 */
			function getImageData( image ) {

				var canvas = document.createElement( 'canvas' );
				canvas.width = image.width;
				canvas.height = image.height;

				var ctx = canvas.getContext( '2d' );
				ctx.drawImage(image, 0, 0);

				return ctx.getImageData(0, 0, image.width, image.height);
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

    module.components.documentReady.push( module.THREE_PARTICLE.documentReady );

	return class THREE_PARTICLE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


