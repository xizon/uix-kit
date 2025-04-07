/* 
 *************************************
 * <!-- 3D Gallery with three.js -->
 *************************************
 */
import {
    UixModuleInstance,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

import { OrbitControls } from '@uixkit/plugins/THREE/esm/controls/OrbitControls';

export const THREE_GALLERY = ( ( module, $, window, document ) => {
	if ( window.THREE_GALLERY === null ) return false;
	
	
	
    module.THREE_GALLERY               = module.THREE_GALLERY || {};
    module.THREE_GALLERY.version       = '0.0.8';
    module.THREE_GALLERY.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-gallery-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
            
			const rendererCanvasID          = '3D-gallery-three-canvas';


			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				controls,
				scene,
				light,
				renderer,
				displacementSprite,
				theta        = 0;


			let offsetWidth  = 1400,
				offsetHeight = 933,
				allImages    = [],
				imgTotal,
				imagesLoaded = false;


			// we will keep track of the scroll
			let scrollValue = 0;
			let lastScrollValue = 0;



			function init() {
				//camera
				camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 1, 10000 );
				camera.position.set(0, 0, 1000);



				//Scene
				scene = new THREE.Scene();


				//HemisphereLight
				scene.add( new THREE.AmbientLight( 0x555555 ) );

				light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 500, 2000 );
                light.decay = 0; // !!!Important
				scene.add( light );



				//WebGL Renderer	
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );




				//controls
				controls = new OrbitControls( camera, renderer.domElement);
				controls.autoRotate = false;
				controls.autoRotateSpeed = 0.5;
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.enableZoom = false;
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;
				controls.minDistance = 100;
				controls.maxDistance = 500;
				controls.maxPolarAngle = Math.PI / 2;

				controls.target.set( 30, 167, 81 );
				controls.update();			


                
				// Immediately use the texture for material creation
				// Create a texture loader so we can load our image file
				const imgs = [
                    'https://placehold.co/500x550/blue/white',
                    'https://placehold.co/700x800/orange/white',
                    'https://placehold.co/650x550/green/white',
                    'https://placehold.co/400x300/red/white',
                    'https://placehold.co/500x550/blue/white',
                    'https://placehold.co/500x550/orange/white',
                    'https://placehold.co/500x550/green/white',
                    'https://placehold.co/500x550/gray/white',
                    'https://placehold.co/500x550/blue/white',
                    'https://placehold.co/500x550/orange/white',
                    'https://placehold.co/500x550/green/white'
				];


				//A loader for loading all images from array.
				const loader = new THREE.TextureLoader();
				loader.crossOrigin = 'anonymous';

				//Preload
				imgTotal = imgs.length;

				const gap               = 100,
					  circumference         = (offsetWidth + gap) * imgTotal,  //get circumference from all images width
					  galleryRadius       = circumference / ( Math.PI * 2 ), // C = 2πr = Math.PI * 2 * radius
					  eachItemAngleToRad  = ( Math.PI * 2 ) / imgTotal; // 360° = 2π = Math.PI * 2

				if ( camera.position.length() > galleryRadius ) {
					camera.position.set( 0, 0, 0 );
				}	


				//Load images
				imgs.forEach( function( element, index ) {
					loadImage( loader, element, index, offsetWidth, offsetHeight, imgTotal, eachItemAngleToRad, galleryRadius, $( '#3D-gallery-three-canvas__loader' ) );
				});


				// Add function to the window that should be resized
				const debounceFuncWindow = UixDebounce(windowUpdate, 50);
				window.removeEventListener('resize', debounceFuncWindow);
				window.addEventListener('resize', debounceFuncWindow);
				
				
				// Add function to the element that should be used as the scrollable area.
				const throttleFunc = UixThrottle(scrollUpdate, 5);
				window.removeEventListener('scroll', throttleFunc);
				window.removeEventListener('touchmove', throttleFunc);
				window.addEventListener('scroll', throttleFunc);
				window.addEventListener('touchmove', throttleFunc);
				throttleFunc();
				

			}


			function render() {
				requestAnimationFrame( render );

				theta += 0.1;


				//To set a background color.
				renderer.setClearColor( 0x000000 );	

				// listen to scroll to update
				let delta = scrollValue - lastScrollValue;
				// threshold
				if (delta > 60) {
					delta = 60;
				} else if(delta < -60) {
					delta = -60;
				}

				camera.position.x = camera.position.x + delta;



				//check all images loaded
				if ( typeof allImages != typeof undefined ) {
					if ( !imagesLoaded && allImages.length === imgTotal ) {
						allImages.forEach( function (element ) {
							scene.add( element );
						});
						imagesLoaded = true;

					}		
				}


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


			function windowUpdate() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}


		
			function scrollUpdate() {
				lastScrollValue = scrollValue;
				scrollValue = window.pageYOffset;

				console.log( 'lastScrollValue: ' + lastScrollValue + ', scrollValue: ' + scrollValue );
			}



			/*
			 * Load Image
			 *
			 * @param  {Element} imgLoader       - A loader for loading all images from array.
			 * @param  {String} src             - URL of image.
			 * @param  {Number} index           - Index of image.
			 * @param  {Number} w               - The width of an image, in pixels. 
			 * @param  {Number} h               - The height of an image, in pixels. 
			 * @param  {Number} total           - Total number of preload images.
			 * @param  {Number} itemRadAngle    - An equal radian angle of a sphere for each element.
			 * @param  {Number} radius          - Radius length of the sphere (circumference).
			 * @param  {Element|String} loading         - Progress bar display control.
			 * @return {Void}
			 */
			function loadImage( imgLoader, src, index, w, h, total, itemRadAngle, radius, loading ) {

				// load a resource
				imgLoader.load(
					// resource URL
					src,

					// onLoad callback
					function ( texture ) {
						// in this example we create the material when the texture is loaded
						const material = new THREE.MeshBasicMaterial( {
							map: texture
						 } );

						const geometry = new THREE.PlaneGeometry( w, h );
						const mesh = new THREE.Mesh( geometry, material );

						//LinearFilter, which takes the four closest texels and bilinearly interpolates among them. 
						mesh.minFilter = THREE.LinearFilter;
						mesh.overdraw = true;

						//Calculate the position of the image 
						//X axis: a = sinA * c = Math.sin( rad ) * radius
						//Z axis: b = cosA * c = Math.cos( rad ) * radius
						mesh.rotation.y = -index * itemRadAngle;
						mesh.position.set( radius * Math.sin(index * itemRadAngle), 0, -radius * Math.cos(index * itemRadAngle) );

						allImages.push( mesh );

						//loading
						TweenMax.to( loading, 0.5, {
							width    : Math.round(100 * allImages.length / total ) + '%',
							onComplete : function() {

								if ( $( this.target ).width() >= windowWidth - 50 ) {

									TweenMax.to( this.target, 0.5, {
										alpha: 0
									});	
								}

							}
						});

					},

					// onProgress callback currently not supported
					undefined,

					// onError callback
					function ( err ) {
						console.error( 'An error happened.' );
					}
				);

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

    module.components.documentReady.push( module.THREE_GALLERY.documentReady );
	

	return class THREE_GALLERY {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


	
