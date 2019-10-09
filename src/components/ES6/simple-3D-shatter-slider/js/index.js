/* 
 *************************************
 * <!-- 3D Shatter Slider -->
 *************************************
 */

/**
 * module.THREE_SHATTER_SLIDER
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


import '../scss/_style.scss';


export const THREE_SHATTER_SLIDER = ( ( module, $, window, document ) => {
	if ( window.THREE_SHATTER_SLIDER === null ) return false;
	
	
    module.THREE_SHATTER_SLIDER               = module.THREE_SHATTER_SLIDER || {};
    module.THREE_SHATTER_SLIDER.version       = '0.0.5';
    module.THREE_SHATTER_SLIDER.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '.uix-3d-slider--shatter' ).length == 0 || ! Modernizr.webgl ) return false;
		
		var sceneSubjects = []; // Import objects and animations dynamically
		var MainStage = function() {

			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight;


			var animSpeed                 = 1000,
				$sliderWrapper            = $( '.uix-3d-slider--shatter' ),



				//Basic webGL renderers 
				renderLoaderID            = 'uix-3d-slider--shatter__loader',
				rendererOuterID           = 'uix-3d-slider--shatter__canvas-container',
				rendererCanvasID          = 'uix-3d-slider--shatter__canvas',
				renderer;



			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			var camera,
				controls,
				scene,
				light,
				renderer,
				material,
				displacementSprite,
				theta        = 0;


			var offsetWidth   = 475, //Set the display width of the objects in the Stage
				offsetHeight  = 375, //Set the display height of the objects in the Stage
				allSources    = [],
				objTotal,
				objLoaded = false;

			
		
			var sources = [];
			var isAnimating = false;
			
			
			// constants
			var activeSlider = 0;
			
			function wrapperInit() {
				
				$sliderWrapper.each( function()  {

					var $this                    = $( this ),
						$items                   = $this.find( '.uix-3d-slider--shatter__item' ),
						$first                   = $items.first(),
						itemsTotal               = $items.length,
                        activated                = $this.data( 'activated' ); 
				
                    
                    if ( typeof activated === typeof undefined || activated === 0 ) {



                        //Get parameter configuration from the data-* attribute of HTML
                        var	dataControlsPagination   = $this.data( 'controls-pagination' ),
                            dataControlsArrows       = $this.data( 'controls-arrows' ),
                            dataLoop                 = $this.data( 'loop' ),
                            dataFilterTexture        = $this.data( 'filter-texture' ),
                            dataDraggable            = $this.data( 'draggable' ),
                            dataDraggableCursor      = $this.data( 'draggable-cursor' ),
                            dataSpeed                = $this.data( 'speed' ),
                            dataAuto                 = $this.data( 'auto' ),
                            dataTiming               = $this.data( 'timing' ),
                            dataCountTotal           = $this.data( 'count-total' ),
                            dataCountCur             = $this.data( 'count-now' );


                        if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-3d-slider--shatter__pagination';
                        if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-3d-slider--shatter__arrows';
                        if ( typeof dataLoop === typeof undefined ) dataLoop = false;
                        if ( typeof dataFilterTexture === typeof undefined || !dataFilterTexture || dataFilterTexture == '' ) dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                        if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
                        if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
                        if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
                        if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
                        if ( typeof dataLoop === typeof undefined ) dataLoop = false;


                        //Autoplay times
                        var playTimes;
                        //A function called "timer" once every second (like a digital watch).
                        $this[0].animatedSlides;


                        //If arrows does not exist on the page, it will be added by default, 
                        //and the drag and drop function will be activated.
                        if ( $( dataControlsArrows ).length == 0 ) {
                            $( 'body' ).prepend( '<div style="display:none;" class="uix-3d-slider--shatter__arrows '+dataControlsArrows.replace('#','').replace('.','')+'"><a href="#" class="uix-3d-slider--shatter__arrows--prev"></a><a href="#" class="uix-3d-slider--shatter__arrows--next"></a></div>' );
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
                            $this.prepend( '<div id="'+rendererOuterID+'" class="uix-advanced-slider-sp__canvas-container"><canvas id="'+rendererCanvasID+'"></canvas></div>' );

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



                        //Get all images and videos
                        //-------------------------------------		
                        $items.each( function()  {
                            var _item = $( this );

                            if ( _item.find( 'video' ).length > 0 ) {

                                //Returns the dimensions (intrinsic height and width ) of the video
                                var video    = document.getElementById( _item.find( 'video' ).attr( 'id' ) ),
                                    videoURL = _item.find( 'source:first' ).attr( 'src' );

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

                                var imgURL   = _item.find( 'img' ).attr( 'src' );

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
                        var _dot       = '',
                            _dotActive = '';
                        _dot += '<ul>';
                        for ( var i = 0; i < itemsTotal; i++ ) {

                            _dotActive = ( i == 0 ) ? 'class="is-active"' : '';

                            _dot += '<li '+_dotActive+' data-index="'+i+'"><a href="javascript:"></a></li>';
                        }
                        _dot += '</ul>';

                        if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );


                        //Fire the slider transtion with buttons
                        $( dataControlsPagination ).find( 'ul > li' ).on( 'click', function( e ) {
                            e.preventDefault();

                            var slideCurId  = $( dataControlsPagination ).find( 'ul > li.is-active' ).index(),
                                slideNextId = $( this ).index();


                            //Determine the direction
                            var curDir = 'prev';
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
                        var _prev = $( dataControlsArrows ).find( '.uix-3d-slider--shatter__arrows--prev' ),
                            _next = $( dataControlsArrows ).find( '.uix-3d-slider--shatter__arrows--next' );

                        $( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

                        $( dataControlsArrows ).find( 'a' ).removeClass( 'is-disabled' );
                        if ( !dataLoop ) {
                            _prev.addClass( 'is-disabled' );
                        }


                        _prev.on( 'click', function( e ) {
                            e.preventDefault();

                            var slideCurId  = $items.filter( '.is-active' ).index(),
                                slideNextId = parseFloat( $items.filter( '.is-active' ).index() ) - 1;

                            //Transition Between Slides
                            sliderUpdates( slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop );	




                            //Pause the auto play event
                            clearInterval( $this[0].animatedSlides );

                        });

                        _next.on( 'click', function( e ) {
                            e.preventDefault();

                            var slideCurId  = $items.filter( '.is-active' ).index(),
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

                            $this.on({
                                mouseenter: function() {
                                    clearInterval( $this[0].animatedSlides );
                                },
                                mouseleave: function() {
                                    sliderAutoPlay( playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows );
                                }
                            });	

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
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.autoRotate = false;
				controls.autoRotateSpeed = 0.5;
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.enableZoom = false;
				controls.target.set(0, 0, 0 );
				controls.update();			



				//A loader for loading all images from array.
				var loader = new THREE.TextureLoader();
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
						
					
						var texture = new THREE.VideoTexture( document.getElementById( element.id ) );
						texture.minFilter = THREE.LinearFilter;
						texture.magFilter = THREE.LinearFilter;
						texture.format = THREE.RGBFormat;

						// pause the video
						texture.image.autoplay = true;
						texture.image.loop = true;
						texture.image.currentTime = 0;
						texture.image.muted = false;
						texture.image.pause();	

						
						loadSource( texture, index, offsetWidth, offsetHeight, objTotal, $( '#' + renderLoaderID ) );
					}
					
				});
		

				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );


			}





			function render() {
				requestAnimationFrame( render );

				theta += 0.1;


				//To set a background color.
				//renderer.setClearColor( 0x000000 );	



				//Animating Three.js vertices
				allSources.forEach( function ( element, index ) {
					element.geometry.verticesNeedUpdate = true;
				});



				//check all images loaded
				if ( typeof allSources != typeof undefined ) {
					if ( !objLoaded && allSources.length === objTotal ) {
						
						allSources.forEach( function ( element, index ) {
							scene.add( element );


							//if the first object is video and play it
							if ( index == 0 ) {
								var videoObCur =  element.material.map.image;
								if ( videoObCur.localName == 'video' ) {
									videoObCur.autoplay = true;
									videoObCur.currentTime = 0;
									videoObCur.muted = true;
									videoObCur.play();
								}
							}

							
							//initialize all objects
							if ( index > 0 ) {
								var fragment =  element.geometry.vertices;

								for ( var i = 0; i < fragment.length; i++ ) {

									var pos = new THREE.Vector3();
									var final = Math.random();

									pos.x = Math.random();
									pos.y = Math.random() * (50 * i);
									pos.z = Math.random() * -300;

									fragment[i].x = pos.x;
									fragment[i].y = pos.y;
									fragment[i].z = pos.z;

								}	
							}

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

                        var elements = new THREE...;
                        scene.add( elements );

                        this.update = function( time ) {
                            elements.rotation.y = time*0.003;
                        }
                    }       

                    sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
                */
                for( var i = 0; i < sceneSubjects.length; i++ ) {
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
			 * @param  {Object} texture         - Returns a new texture object which can directly be used for material creation.
			 * @param  {Number} index           - Index of image or video.
			 * @param  {Number} w               - The width of an image or video, in pixels. 
			 * @param  {Number} h               - The height of an image or video, in pixels. 
			 * @param  {Number} total           - Total number of preload images or video.
			 * @param  {Object} loading         - Progress bar display control.
			 * @return {Void}
			 */
			function loadSource( texture, index, w, h, total, loading ) {

				var imgW = w,
					imgH = h;

				
				// Immediately use the texture for material creation
				// Create a texture loader so we can load our image file
				material = new THREE.MeshBasicMaterial( {
					map: texture
				 } );


				var geometryExplode = new THREE.BoxGeometry( imgW, imgH, 13 ),


				displacementSprite = new THREE.Mesh( geometryExplode, material );

				displacementSprite.minFilter = THREE.LinearFilter;
				displacementSprite.overdraw = true;
				displacementSprite.position.set(0,0,0);


				geometryExplode.center();

				// Shattering Images
				var explodeModifier = new THREE.ExplodeModifier();
				explodeModifier.modify( geometryExplode );

				// add some additional vars to the
				// fragments to ensure we can do physics
				// and so on
				for ( var i = 0; i < geometryExplode.vertices.length; i++ ) {
					var fragment = geometryExplode.vertices[i];
					fragment.origPos	= {
						x: fragment.x,
						y: fragment.y,
						z: fragment.z
					};

				}


				allSources.push( displacementSprite );


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


			
		 /*
		 * Trigger slider autoplay
		 *
         * @param  {Function} playTimes            - Number of times.
         * @param  {Number} timing                 - Autoplay interval.
         * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
         * @param  {Object} slider                 - Selector of the slider .
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
         * @return {Void}                          - The constructor.
		 */
		function sliderAutoPlay( playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID ) {	

			var items = slider.find( '.uix-3d-slider--shatter__item' ),
				total = items.length;
			
			slider[0].animatedSlides = setInterval( function() {

					playTimes = parseFloat( items.filter( '.is-active' ).index() );
					playTimes++;

					
					if ( !loop ) {
						if ( playTimes < total && playTimes >= 0 ) {
							
							var slideCurId  = items.filter( '.is-active' ).index(),
								slideNextId = playTimes;	

							sliderUpdates( slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
						}
					} else {
						if ( playTimes == total ) playTimes = 0;
						if ( playTimes < 0 ) playTimes = total-1;		

						var slideCurId  = items.filter( '.is-active' ).index(),
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


				var $items                   = $sliderWrapper.find( '.uix-3d-slider--shatter__item' ),
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
					var $current = $sliderWrapper.find( '.uix-3d-slider--shatter__item' ).eq( slideCurId );
					var	$next    = $sliderWrapper.find( '.uix-3d-slider--shatter__item' ).eq( slideNextId );



					console.log( 'Current: ' + slideCurId + ' | Next: ' + slideNextId );


					//Determine the direction and add class to switching direction indicator.
					//-------------------------------------
					var dirIndicatorClass = '';
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
						if ( slideNextId == total - 1 ) $( arrowsID ).find( '.uix-3d-slider--shatter__arrows--next' ).addClass( 'is-disabled' );
						if ( slideNextId == 0 ) $( arrowsID ).find( '.uix-3d-slider--shatter__arrows--prev' ).addClass( 'is-disabled' );
					}




					//Display counter
					//-------------------------------------
					$( countTotalID ).text( total );
					$( countCurID ).text( parseFloat( slideCurId ) + 1 );		



					//Pause all videos
					//-------------------------------------
					// pause all videos
					allSources.forEach( function ( element, index ) {

						var videoOb = element.material.map.image;

						if ( videoOb.localName == 'video' ) {
							videoOb.autoplay = false;
							videoOb.currentTime = 0;
							videoOb.muted = true;
							videoOb.pause();
						}
					});



					//Fire the next object
					//-------------------------------------
					activeSlider = slideNextId;
					
					
					if ( typeof allSources[slideNextId] != typeof undefined ) {

						var fragment = allSources[slideNextId].geometry.vertices;

						for ( var i = 0; i < fragment.length; i++ ) {

							TweenMax.to( fragment[i], 2, {
								x: fragment[i].origPos.x,
								y: fragment[i].origPos.y,
								z: fragment[i].origPos.z,
								ease: "Expo.easeInOut"
							});	
						}		


					}	

					// play the video
					var videoObCur =  allSources[ slideNextId ].material.map.image;

					if ( videoObCur.localName == 'video' ) {
						videoObCur.autoplay = true;
						videoObCur.currentTime = 0;
						videoObCur.muted = false;
						videoObCur.play();
					}


					//Fire the current object
					//-------------------------------------
					if ( typeof allSources[slideCurId] != typeof undefined ) {

						var fragment = allSources[slideCurId].geometry.vertices;

						for ( var i = 0; i < fragment.length; i++ ) {

							var pos = new THREE.Vector3();
							var final = Math.random();

							pos.x = Math.random();
							pos.y = Math.random() * (50 * i);
							pos.z = Math.random() * -300;

							TweenMax.to( fragment[i], 2, {
								x: pos.x,
								y: pos.y,
								z: pos.z,
								ease: "Expo.easeInOut",
								onComplete: function onComplete() {

									//reset the trigger
									isAnimating = false;

								}
							});	
						}		


					}			
					
					
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
	
    module.components.documentReady.push( module.THREE_SHATTER_SLIDER.documentReady );
	

	return class THREE_SHATTER_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );






