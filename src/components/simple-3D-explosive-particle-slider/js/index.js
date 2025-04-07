/* 
 *************************************
 * <!-- 3D Explosive Particle Slider -->
 *************************************
 */
import {
    UixModuleInstance,
    UixGUID,
} from '@uixkit/core/_global/js';

import { OrbitControls } from '@uixkit/plugins/THREE/esm/controls/OrbitControls';

import '../scss/_style.scss';


// !!!Important
// If you use "MeshBasicMaterial" (not affected by light, the color of the image is white or light, 
// use shader to load the original color)
import fragment from "./shader/fragment-custom.glsl";
import vertex from "./shader/vertex-custom.glsl";

export const THREE_EXP_PARTICLE_SLIDER = ( ( module, $, window, document ) => {
	if ( window.THREE_EXP_PARTICLE_SLIDER === null ) return false;
	
	
    module.THREE_EXP_PARTICLE_SLIDER               = module.THREE_EXP_PARTICLE_SLIDER || {};
    module.THREE_EXP_PARTICLE_SLIDER.version       = '0.1.5';
    module.THREE_EXP_PARTICLE_SLIDER.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '.uix-3d-slider--expParticle' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
        let sceneSubjects = []; // Import objects and animations dynamically
		const MainStage = function() {

            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;

            
			const $sliderWrapper            = $( '.uix-3d-slider--expParticle' ),
                  //Basic webGL renderers 
                  renderLoaderID            = 'uix-3d-slider--expParticle__loader',
                  rendererOuterID           = 'uix-3d-slider--expParticle__canvas-container',
                  rendererCanvasID          = 'uix-3d-slider--expParticle__canvas';
            

            let animSpeed  = 1000;




			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			let camera,
				controls,
				scene,
				light,
				renderer,
				material,
				displacementSprite,
				clock = new THREE.Clock();


			let offsetWidth   = 475, //Set the display width of the objects in the Stage
				offsetHeight  = 375, //Set the display height of the objects in the Stage
				allSources    = [],
				objTotal,
				objLoaded = false;

		
			
			let sources = [];
			let isAnimating = false;
			
			
			// constants
			let activeSlider = 0;
			
			let cube_count,
				meshes = [],
				materials = [],
				xgrid = 25,
				ygrid = 15;
			
			
			function wrapperInit() {
				
				$sliderWrapper.each( function()  {

					const $this                    = $( this );
                    
					const $items                   = $this.find( '.uix-3d-slider--expParticle__item' ),
						  $first                   = $items.first(),
						  itemsTotal                = $items.length,
                          activated                = $this.data( 'activated' ); 
				
                    
                    if ( typeof activated === typeof undefined || activated === 0 ) {


                        //Get parameter configuration from the data-* attribute of HTML
                        let	dataControlsPagination   = $this.data( 'controls-pagination' ),
                            dataControlsArrows       = $this.data( 'controls-arrows' ),
                            dataFilterTexture        = $this.data( 'filter-texture' ),
                            dataDraggable            = $this.data( 'draggable' ),
                            dataDraggableCursor      = $this.data( 'draggable-cursor' ),
                            dataSpeed                = $this.data( 'speed' ),
                            dataCountTotal           = $this.data( 'count-total' ),
                            dataCountCur             = $this.data( 'count-now' );


                        if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-3d-slider--expParticle__pagination';
                        if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-3d-slider--expParticle__arrows';
                        if ( typeof dataFilterTexture === typeof undefined || !dataFilterTexture || dataFilterTexture == '' ) dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                        if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
                        if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
                        if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
                        if ( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';	


                        //Autoplay parameters
                        let dataAuto                   = $this.data( 'auto' ),
                            dataTiming                 = $this.data( 'timing' ),
                            dataLoop                   = $this.data( 'loop' );  

                        if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
                        if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
                        if ( typeof dataLoop === typeof undefined ) dataLoop = false; 


                        
                        //Autoplay times
                        let playTimes;
                        //A function called "timer" once every second (like a digital watch).
                        $this[0].animatedSlides;



                        //If arrows does not exist on the page, it will be added by default, 
                        //and the drag and drop function will be activated.
                        if ( $( dataControlsArrows ).length == 0 ) {
                            $( 'body' ).prepend( '<div style="display:none;" class="uix-3d-slider--expParticle__arrows '+dataControlsArrows.replace('#','').replace('.','')+'"><a href="#" class="uix-3d-slider--expParticle__arrows--prev"></a><a href="#" class="uix-3d-slider--expParticle__arrows--next"></a></div>' );
                        }



                        //Prevent bubbling
                        if ( itemsTotal == 1 ) {
                            $( dataControlsPagination ).hide();
                            $( dataControlsArrows ).hide();
                        }


                        //Initialize the controlers classes
                        //-------------------------------------	
                        $( dataControlsPagination ).find( 'ul > li' ).first().addClass( 'is-active' );




                        //Initialize the wrapper width and height
                        //-------------------------------------	
                        $this.css( 'height', windowHeight + 'px' );


                        //Load slides to canvas
                        //-------------------------------------	
                        if ( $( '#' + rendererCanvasID ).length == 0 ) {
                            $this.prepend( '<div id="'+rendererOuterID+'" class="uix-3d-slider--expParticle__canvas-container"><canvas id="'+rendererCanvasID+'"></canvas></div>' );

                        }


                        //Get the animation speed
                        //-------------------------------------	
                        if ( typeof dataSpeed != typeof undefined && dataSpeed != false ) {
                            animSpeed = dataSpeed;
                        }


                        //Initialize the first item container
                        //-------------------------------------		
                        $items.addClass( 'next' );
                        $first.addClass( 'is-active' );

                        
                        //Add identifiers for the first and last items
                        //-------------------------------------		
                        $items.last().addClass( 'last' );
                        $items.first().addClass( 'first' );


                        //Get all images and videos
                        //-------------------------------------		
                        $items.each( function()  {
                            const _item = $( this );

                            if ( _item.find( 'video' ).length > 0 ) {

                                //Returns the dimensions (intrinsic height and width ) of the video
                                const video    = document.getElementById( _item.find( 'video' ).attr( 'id' ) );
                                let videoURL = _item.find( 'source:first' ).attr( 'src' );
                                
                                if ( typeof videoURL === typeof undefined ) videoURL = _item.attr( 'src' ); 

                                if ( typeof videoURL != typeof undefined ) {
                                    sources.push(
                                        {
                                            "url": videoURL,
                                            "id": _item.find( 'video' ).attr( 'id' ),
                                            "type": 'video'
                                        }
                                    );
                                }




                            } else {

                                let imgURL   = _item.find( 'img' ).attr( 'src' );

                                if ( typeof imgURL != typeof undefined ) {

                                    sources.push(
                                        {
                                            "url": imgURL,
                                            "id": 'img-' + UixGUID.create(),
                                            "type": 'img'
                                        }
                                    );
                                }


                            }	

                        });



                        //Pagination dots 
                        //-------------------------------------	
                        let _dot       = '',
                            _dotActive = '';
                        _dot += '<ul>';
                        for ( let i = 0; i < itemsTotal; i++ ) {

                            _dotActive = ( i == 0 ) ? 'class="is-active"' : '';

                            _dot += '<li '+_dotActive+' data-index="'+i+'"><a href="javascript:"></a></li>';
                        }
                        _dot += '</ul>';

                        if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );


                        //Fire the slider transtion with buttons
                        $( dataControlsPagination ).find( 'ul > li' ).off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();

                            //Prevent buttons' events from firing multiple times
                            const $btn = $( this );
                            if ( $btn.attr( 'aria-disabled' ) == 'true' ) return false;
                            $( dataControlsPagination ).find( 'ul > li' ).attr( 'aria-disabled', 'true' );
                            
                            $( dataControlsPagination ).find( 'ul > li' )
                                .delay(animSpeed)
                                .queue(function(next) { $( dataControlsPagination ).find( 'ul > li' ).attr( 'aria-disabled', 'false' ); next(); });   

                            
                            //
                            const slideCurId  = $( dataControlsPagination ).find( 'ul > li.is-active' ).index(),
                                  slideNextId = $( this ).index();


                            //Determine the direction
                            let curDir = 'prev';
                            if ( $( this ).attr( 'data-index' ) > slideCurId ) {
                                curDir = 'next';
                            }


                            //Transition Between Slides
                            sliderUpdates( slideCurId, slideNextId, curDir, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop );


                            //Pause the auto play event
                            clearInterval( $this[0].animatedSlides );	


                        });

                        //Next/Prev buttons
                        //-------------------------------------		
                        const _prev = $( dataControlsArrows ).find( '.uix-3d-slider--expParticle__arrows--prev' ),
                              _next = $( dataControlsArrows ).find( '.uix-3d-slider--expParticle__arrows--next' );

                        $( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

                        $( dataControlsArrows ).find( 'a' ).removeClass( 'is-disabled' );
                        if ( !dataLoop ) {
                            _prev.addClass( 'is-disabled' );
                        }


                        _prev.off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();
                            
                            //Prevent buttons' events from firing multiple times
                            if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                            $( this ).attr( 'aria-disabled', 'true' );

                            $( this )
                                .delay(animSpeed)
                                .queue(function(next) { $( this ).attr( 'aria-disabled', 'false' ); next(); });                

                            //
                            const slideCurId  = $items.filter( '.is-active' ).index(),
                                  slideNextId = parseFloat( $items.filter( '.is-active' ).index() ) - 1;

                            //Transition Between Slides
                            sliderUpdates( slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop );	


                            //Pause the auto play event
                            clearInterval( $this[0].animatedSlides );

                        });

                        _next.off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();
                            
                            //Prevent buttons' events from firing multiple times
                            if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                            $( this ).attr( 'aria-disabled', 'true' );

                            $( this )
                                .delay(animSpeed)
                                .queue(function(next) { $( this ).attr( 'aria-disabled', 'false' ); next(); });                

                            //
                            const slideCurId  = $items.filter( '.is-active' ).index(),
                                  slideNextId = parseFloat( $items.filter( '.is-active' ).index() ) + 1;

                            //Transition Between Slides
                            sliderUpdates( slideCurId, slideNextId, 'next', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop );	


                            //Pause the auto play event
                            clearInterval( $this[0].animatedSlides );


                        });



                        //Autoplay Slider
                        //-------------------------------------		
                        if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {

                            sliderAutoPlay( playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows );

							const autoplayEnter = function() {
								clearInterval( $this[0].animatedSlides );
							};
		
							const autoplayLeave = function() {
								sliderAutoPlay( playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows );
							};
		
							// Do not use the `off()` method, otherwise it will cause the second mouseenter to be invalid
							$this.on( 'mouseenter', autoplayEnter );
							$this.on( 'mouseleave', autoplayLeave );  

							// To determine if it is a touch screen.
							if (Modernizr.touchevents) {
								$this.on( 'pointerenter', autoplayEnter );
								$this.on( 'pointerleave', autoplayLeave );  
							}


                        }
                        

                        //Prevents front-end javascripts that are activated with AJAX to repeat loading.
                        $this.data( 'activated', 1 );

                    }//endif activated
                        
                        
				});// end each				
			}


			
			function init() {

				

				//Core 3D stage begin
				//-------------------------------------		
				//camera
				camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 10,  2500 ); // FlyCamera // FlyControls
				camera.movementSpeed = 100.0;
				camera.rollSpeed = 0.5;
				camera.position.y = 60;
				camera.position.z = 500;



				//Scene
				scene = new THREE.Scene();


				//HemisphereLight
				scene.add( new THREE.AmbientLight( 0x555555 ) );

				light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 0, 2000 );
                light.decay = 0; // !!!Important
				scene.add( light );



				//WebGL Renderer	
				 // create a render and set the size
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				//controls
				controls = new OrbitControls( camera, renderer.domElement );
				controls.autoRotate = false;
				controls.autoRotateSpeed = 0.5;
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.enableZoom = false;
				controls.target.set(0, 0, 0 );
				controls.update();			



				//A loader for loading all images from array.
				const loader = new THREE.TextureLoader();
				loader.crossOrigin = 'anonymous';


				//Preload
				objTotal = sources.length;
			
				sources.forEach( function( element, index ) {
					
				
					if ( element.type == 'img' ) {
						
						
						loader.load(
							// resource URL
							element.url,

							// onLoad callback
							function ( texture ) {
								
								loadSource( texture, index, offsetWidth, offsetHeight, objTotal, $( '#' + renderLoaderID ) );

							},

							// onProgress callback currently not supported
							undefined,

							// onError callback
							function ( err ) {
								console.error( 'An error happened.' );
							}
						);	
						
						
						
					} else {
						
					
						const texture = new THREE.VideoTexture( document.getElementById( element.id ) );
						texture.minFilter = THREE.LinearFilter;
						texture.magFilter = THREE.LinearFilter;
						texture.format = THREE.RGBAFormat;


						// pause the video
						texture.image.autoplay = true;
						texture.image.loop = true;
						texture.image.currentTime = 0;
						texture.image.muted = true;
						texture.image.play();	

						
						
						loadSource( texture, index, offsetWidth, offsetHeight, objTotal, $( '#' + renderLoaderID ) );
					}
					
				});
		

				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}





			function render() {
				requestAnimationFrame( render );

				const elapsed = clock.getElapsedTime();


				//To set a background color.
				//renderer.setClearColor( 0x000000 );	



				//Display the destination object
				if ( typeof allSources[activeSlider] != typeof undefined ) {

					const objects = allSources[activeSlider].children;
					const speed =  Math.random() * .0002;

					for ( let i = 0; i < objects.length; i++ ) {


						for ( let j = 0; j < objects[i].parent.children.length; j++ ) {
							const obj = objects[i].parent.children[j];

							obj.position.x += (obj.origPos.x - obj.position.x) * speed;
							obj.position.y += (obj.origPos.y - obj.position.y) * speed;
							obj.position.z += (obj.origPos.z - obj.position.z) * speed;

							
						}	

					}	
					

				}	
				
				
				//Hide inactive objects
				allSources.forEach( function ( element, index ) {
					if ( index != activeSlider ) {

						const objects = element.children;
						const speed =  Math.random() * .00005;

						for ( let i = 0; i < objects.length; i++ ) {


							for ( let j = 0; j < objects[i].parent.children.length; j++ ) {
								const obj = objects[i].parent.children[j];
								
								obj.position.x += (obj.targetPos.x - obj.position.x) * speed;
								obj.position.y += (obj.targetPos.y - obj.position.y) * speed;
								obj.position.z += (obj.targetPos.z - obj.position.z) * speed;

							}	

						}		
					}

				});
	

			
				//check all images loaded
				if ( typeof allSources != typeof undefined ) {
					if ( !objLoaded && allSources.length === objTotal ) {
						
						allSources.forEach( function ( element, index ) {
							scene.add( element );
							console.log( element );
						});
						objLoaded = true;


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


			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			

			/*
			 * Load Source
			 *
			 * @param  {Three.MeshBasicMaterial.map} texture         - Returns a new texture object which can directly be used for material creation.
			 * @param  {Number} index           - Index of image or video.
			 * @param  {Number} w               - The width of an image or video, in pixels. 
			 * @param  {Number} h               - The height of an image or video, in pixels. 
			 * @param  {Number} total           - Total number of preload images or video.
			 * @param  {Element|String} loading         - Progress bar display control.
			 * @return {Void}
			 */
			function loadSource( texture, index, w, h, total, loading ) {

				const imgW = w,
					  imgH = h;
				
				
				//
				const group = new THREE.Object3D();
				let i, j, ux, uy, ox, oy,
					geometry,
					xsize, ysize;
				ux = 1 / xgrid;
				uy = 1 / ygrid;
				xsize = imgW / xgrid;
				ysize = imgH / ygrid;
				cube_count = 0;
				for ( i = 0; i < xgrid; i ++ ) {
					for ( j = 0; j < ygrid; j ++ ) {
						ox = i;
						oy = j;
						geometry = new THREE.BoxGeometry( xsize, ysize, xsize );
						changeUVS( geometry, ux, uy, ox, oy );


                        // Create a material
                        const uniforms = {
                            tex: { value: texture }
                        };

                        // !!!Important
                        // If you use "MeshBasicMaterial" (not affected by light, the color of the image is white or light, 
                        // use shader to load the original color)
                        materials[cube_count] = new THREE.ShaderMaterial({
                            uniforms,
                            vertexShader: vertex,
                            fragmentShader: fragment,
                        });
						material = materials[ cube_count ];
                        
						displacementSprite = new THREE.Mesh( geometry, material );
						displacementSprite.position.x = ( i - xgrid / 2 ) * xsize;
						displacementSprite.position.y = ( j - ygrid / 2 ) * ysize;
						displacementSprite.position.z = 0;
						displacementSprite.scale.x = displacementSprite.scale.y = displacementSprite.scale.z = 1;
						displacementSprite.origPos	= {
							x: displacementSprite.position.x,
							y: displacementSprite.position.y,
							z: displacementSprite.position.z
						};

						
						//hide all
						const newPosX = 4000 * Math.random() * ( Math.random() > 0.5 ? 1 : -1 );
						const newPosY = 2000 * Math.random();
						const newPosZ = 3000 * Math.random();
						displacementSprite.position.x = newPosX;
						displacementSprite.position.y = newPosY;
						displacementSprite.position.z = newPosZ;
						
						displacementSprite.targetPos	= {
							x: newPosX,
							y: newPosY,
							z: newPosZ
						};	
						
						//
						group.add( displacementSprite );
						
					
						
						//
						meshes[ cube_count ] = displacementSprite;
						cube_count += 1;
					}			
				}
				

				allSources.push( group );


				//loading
				TweenMax.to( loading, 0.5, {
					width    : Math.round(100 * allSources.length / total ) + '%',
					onComplete : function() {

						if ( $( this.target ).width() >= windowWidth - 50 ) {

							TweenMax.to( this.target, 0.5, {
								alpha: 0
							});	
						}

					}
				});
					

			}


			function changeUVS( geometry, unitx, unity, offsetx, offsety ) {
				const uvs = geometry.attributes.uv.array;
				for ( let i = 0; i < uvs.length; i += 2 ) {

                    // Modify the UV mapping calculation to ensure that each small square is correctly mapped to the corresponding part of the original image
					uvs[ i ] = ( uvs[ i ] + offsetx ) * unitx;
					uvs[ i + 1 ] = ( uvs[ i + 1 ] + offsety ) * unity;

				}
			}	
			
			
             /*
             * Trigger slider autoplay
             *
             * @param  {Function} playTimes            - Number of times.
             * @param  {Number} timing                 - Autoplay interval.
             * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
             * @param  {Element} slider                 - Selector of the slider .
             * @param  {String} countTotalID           - Total number ID or class of counter.
             * @param  {String} countCurID             - Current number ID or class of counter.
             * @param  {String} paginationID           - Navigation ID for paging control of each slide.
             * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
             * @return {Void}                          - The constructor.
             */
            function sliderAutoPlay( playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID ) {	

                const items = slider.find( '.uix-3d-slider--expParticle__item' ),
                      total = items.length;

                slider[0].animatedSlides = setInterval( function() {

                        playTimes = parseFloat( items.filter( '.is-active' ).index() );
                        playTimes++;


                        if ( !loop ) {
                            if ( playTimes < total && playTimes >= 0 ) {

                                const slideCurId  = items.filter( '.is-active' ).index(),
                                      slideNextId = playTimes;	

                                sliderUpdates( slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
                            }
                        } else {
                            if ( playTimes == total ) playTimes = 0;
                            if ( playTimes < 0 ) playTimes = total-1;		

                            const slideCurId  = items.filter( '.is-active' ).index(),
                                  slideNextId = playTimes;	


                            //Prevent problems with styles when switching in positive order
                            if ( playTimes == 0 ) {
                                sliderUpdates( slideCurId, slideNextId, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop );	
                            } else {
                                sliderUpdates( slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
                            }

                        }



                }, timing );	
             }


			
			/*
			 *  Transition Between Slides
			 *
			 * @param  {Number} slideCurId             - Index of current slider.
			 * @param  {Number} slideNextId            - Index of next slider.
			 * @param  {String} dir                    - Switching direction indicator.	 
             * @param  {String} countTotalID           - Total number ID or class of counter.
             * @param  {String} countCurID             - Current number ID or class of counter.
             * @param  {String} paginationID           - Navigation ID for paging control of each slide.
             * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
             * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
			 * @return {Void}
			 */
			function sliderUpdates( slideCurId, slideNextId, dir, countTotalID, countCurID, paginationID, arrowsID, loop ) {


				const $items                   = $sliderWrapper.find( '.uix-3d-slider--expParticle__item' ),
					  total                    = $items.length;
	
			
                
	
				//Prevent bubbling
				if ( total == 1 ) {
					$( paginationID ).hide();
					$( arrowsID ).hide();
					return false;
				}

				if ( ! isAnimating ) {
					isAnimating = true;
					
					
					//Transition Interception
					//-------------------------------------
					if ( loop ) {
						if ( slideCurId > total - 1 ) slideCurId = 0;
						if ( slideCurId < 0 ) slideCurId = total-1;	

						//--
						if ( slideNextId < 0 ) slideNextId = total-1;
						if ( slideNextId > total - 1 ) slideNextId = 0;
					} else {

						if ( slideCurId > total - 1 ) slideCurId = total-1;
						if ( slideCurId < 0 ) slideCurId = 0;	

						//--
						if ( slideNextId < 0 ) slideNextId = 0;
						if ( slideNextId > total - 1 ) slideNextId = total-1;

					}



					//Get previous and next index of item
					//-------------------------------------
					const $current = $sliderWrapper.find( '.uix-3d-slider--expParticle__item' ).eq( slideCurId );
					const	$next    = $sliderWrapper.find( '.uix-3d-slider--expParticle__item' ).eq( slideNextId );



					console.log( 'Current: ' + slideCurId + ' | Next: ' + slideNextId );


					//Determine the direction and add class to switching direction indicator.
					//-------------------------------------
					let dirIndicatorClass = '';
					if ( dir == 'prev' ) dirIndicatorClass = 'prev';
					if ( dir == 'next' ) dirIndicatorClass = 'next';


					//Add transition class to each item
					//-------------------------------------	
					$items.removeClass( 'is-active leave prev next' )
						  .addClass( dirIndicatorClass );

					$current.addClass( 'leave' );
					$next.addClass( 'is-active' );



					//Add transition class to Controls Pagination
					//-------------------------------------
					$( paginationID ).find( 'ul > li' ).removeClass( 'is-active leave prev next' )
											   .addClass( dirIndicatorClass );

					$( paginationID ).find( 'ul > li' ).eq( slideCurId ).addClass( 'leave' );
					$( paginationID ).find( 'ul > li' ).eq( slideNextId ).addClass( 'is-active' );



					//Add transition class to Arrows
					//-------------------------------------		
					if ( ! loop ) {
						$( arrowsID ).find( 'a' ).removeClass( 'is-disabled' );
						if ( slideNextId == total - 1 ) $( arrowsID ).find( '.uix-3d-slider--expParticle__arrows--next' ).addClass( 'is-disabled' );
						if ( slideNextId == 0 ) $( arrowsID ).find( '.uix-3d-slider--expParticle__arrows--prev' ).addClass( 'is-disabled' );
					}




					//Display counter
					//-------------------------------------
					$( countTotalID ).text( total );
					$( countCurID ).text( parseFloat( slideCurId ) + 1 );		





					//Fire the next object
					//-------------------------------------
					activeSlider = slideNextId;
				

					//Fire the current object
					//-------------------------------------
				

					//Reset the trigger
					//-------------------------------------
					isAnimating = false;			
					
					
				}// end isAnimating
				
				

			}

			
			


			// 
			//-------------------------------------	
			return {
				init                : init,
				render              : render,
                wrapperInit         : wrapperInit,
				getRendererCanvasID : function () { return rendererCanvasID; },
				getScene            : function () { return scene; },
				getCamera           : function () { return camera; } 
			};
            

		}();

		MainStage.wrapperInit();
		MainStage.init();
		MainStage.render();
		

		
    };
	
    module.components.documentReady.push( module.THREE_EXP_PARTICLE_SLIDER.documentReady );
	

	return class THREE_EXP_PARTICLE_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );





