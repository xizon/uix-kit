/* 
 *************************************
 * <!-- 3D Liquid Scrollspy Slider -->
 *************************************
 */

/**
 * module.THREE_LIQUID_SCROLLSPY_SLIDER
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


export const THREE_LIQUID_SCROLLSPY_SLIDER = ( ( module, $, window, document ) => {
	if ( window.THREE_LIQUID_SCROLLSPY_SLIDER === null ) return false;
	
	
    module.THREE_LIQUID_SCROLLSPY_SLIDER               = module.THREE_LIQUID_SCROLLSPY_SLIDER || {};
    module.THREE_LIQUID_SCROLLSPY_SLIDER.version       = '0.0.7';
    module.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady = function( $ ) {

	
        
		//Prevent this module from loading in other pages
		if ( $( '.uix-3d-slider--liquid-scrollspy' ).length == 0 || ! Modernizr.webgl ) return false;
		
		var sceneSubjects = []; // Import objects and animations dynamically
		var MainStage = function() {

			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight;


			var animSpeed                 = 1000,
				$sliderWrapper            = $( '.uix-3d-slider--liquid-scrollspy' ),



				//Basic webGL renderers 
				renderLoaderID            = 'uix-3d-slider--liquid-scrollspy__loader',
				rendererOuterID           = 'uix-3d-slider--liquid-scrollspy__canvas-container',
				rendererCanvasID          = 'uix-3d-slider--liquid-scrollspy__canvas',
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

            
			var offsetWidth   = 1920, //Set the display width of the objects
				offsetHeight  = 1080, //Set the display height of the objects
                imgAspect     = offsetHeight / offsetWidth;
            
            
			var vertex       = document.getElementById( 'vertexshader' ).textContent,
				fragment     = document.getElementById( 'fragmentshader' ).textContent,
                dispImage;

            

            var loader = new THREE.TextureLoader();
            loader.crossOrigin = 'anonymous'; 
            
            
            var textures;
			var sources = [];
			var isAnimating = false;
            
            
            //scroll spy
            var scrollspyEnable,
                scrollspyConfigAutoAnim,
                scrollspyConfigItems, 
                scrollspyConfigCountTotal, 
                scrollspyConfigCountCur, 
                scrollspyConfigControlsPagination, 
                scrollspyConfigControlsArrows, 
                scrollspyConfigLoop;

			
			// constants
			var activeSlider = 0;
			
			function wrapperInit() {
				
				$sliderWrapper.each( function()  {

					var $this                    = $( this ),
						$items                   = $this.find( '.uix-3d-slider--liquid-scrollspy__item' ),
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
                            dataCountCur             = $this.data( 'count-now' ),
                            dataScrollspy            = $this.data( 'scrollspy' );


                        if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-3d-slider--liquid-scrollspy__pagination';
                        if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-3d-slider--liquid-scrollspy__arrows';
                        if ( typeof dataLoop === typeof undefined ) dataLoop = false;
                        if ( typeof dataFilterTexture === typeof undefined || !dataFilterTexture || dataFilterTexture == '' ) dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                        if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
                        if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
                        if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
                        if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
                        if ( typeof dataLoop === typeof undefined ) dataLoop = false;
                        if ( typeof dataScrollspy === typeof undefined ) dataScrollspy = false;

                        
                        //Load displacement image
                        dispImage = dataFilterTexture;
                        


                        //Autoplay times
                        var playTimes;
                        //A function called "timer" once every second (like a digital watch).
                        $this[0].animatedSlides;

                        
                        
                        //scroll spy config
                        scrollspyEnable = dataScrollspy;
                        scrollspyConfigAutoAnim = $this[0].animatedSlides;
                        scrollspyConfigItems = $items;
                        scrollspyConfigCountTotal = dataCountTotal;
                        scrollspyConfigCountCur = dataCountCur;
                        scrollspyConfigControlsPagination = dataControlsPagination;
                        scrollspyConfigControlsArrows = dataControlsArrows;
                        scrollspyConfigLoop = dataLoop;
    
                        

                        //If arrows does not exist on the page, it will be added by default, 
                        //and the drag and drop function will be activated.
                        if ( $( dataControlsArrows ).length == 0 ) {
                            $( 'body' ).prepend( '<div style="display:none;" class="uix-3d-slider--liquid-scrollspy__arrows '+dataControlsArrows.replace('#','').replace('.','')+'"><a href="#" class="uix-3d-slider--liquid-scrollspy__arrows--prev"></a><a href="#" class="uix-3d-slider--liquid-scrollspy__arrows--next"></a></div>' );
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
                        $this.css( 'height', windowWidth * imgAspect + 'px' );


                        //Load slides to canvas
                        //-------------------------------------	
                        if ( $( '#' + rendererCanvasID ).length == 0 ) {
                            $this.prepend( '<div id="'+rendererOuterID+'" class="uix-3d-slider--liquid-scrollspy__canvas-container"><canvas id="'+rendererCanvasID+'"></canvas></div>' );

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
                        $( dataControlsPagination ).find( 'ul > li' ).off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();


                            //Prevent buttons' events from firing multiple times
                            var $btn = $( this );
                            if ( $btn.attr( 'aria-disabled' ) == 'true' ) return false;
                            $( dataControlsPagination ).find( 'ul > li' ).attr( 'aria-disabled', 'true' );
                            setTimeout( function() {
                                $( dataControlsPagination ).find( 'ul > li' ).attr( 'aria-disabled', 'false' );
                            }, animSpeed );

                            
                            
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
                        var _prev = $( dataControlsArrows ).find( '.uix-3d-slider--liquid-scrollspy__arrows--prev' ),
                            _next = $( dataControlsArrows ).find( '.uix-3d-slider--liquid-scrollspy__arrows--next' );

                        $( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

                        $( dataControlsArrows ).find( 'a' ).removeClass( 'is-disabled' );
                        if ( !dataLoop ) {
                            _prev.addClass( 'is-disabled' );
                        }


                        _prev.off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();
                            
                            
                            //Prevent buttons' events from firing multiple times
                            if ( _prev.attr( 'aria-disabled' ) == 'true' ) return false;
                            _prev.attr( 'aria-disabled', 'true' );
                            setTimeout( function() {
                                _prev.attr( 'aria-disabled', 'false' );
                            }, animSpeed );   

                            var slideCurId  = $items.filter( '.is-active' ).index(),
                                slideNextId = parseFloat( $items.filter( '.is-active' ).index() ) - 1;

                            //Transition Between Slides
                            sliderUpdates( slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop );	




                            //Pause the auto play event
                            clearInterval( $this[0].animatedSlides );

                        });

                        _next.off( 'click' ).on( 'click', function( e ) {
                            e.preventDefault();
                            
                            //Prevent buttons' events from firing multiple times
                            if ( _next.attr( 'aria-disabled' ) == 'true' ) return false;
                            _next.attr( 'aria-disabled', 'true' );
                            setTimeout( function() {
                                _next.attr( 'aria-disabled', 'false' );
                            }, animSpeed ); 


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


            
            
            
            function loadImages() {
                var promises = [];

                for (var i = 0; i < sources.length; i++) {
                    
                    if ( sources[i].type == 'img' ) {
	
                        ///////////
                        // IMAGE //
                        ///////////   
                        
                        promises.push( 
                            
                            new Promise(function(resolve, reject) {
                            
                                var img = document.createElement("img");
                                img.crossOrigin = "anonymous";
                                img.src = sources[i].url;

                                img.onload = function(image) {

                                    //loading
                                    TweenMax.to( "#" + renderLoaderID, 0.5, {
                                        width    : Math.round(100 * ( i / sources.length ) ) + '%'
                                    });


                                    return resolve( image.path[0].currentSrc );
                                };  

                            }).then( makeThreeTexture )
                        );
     
                        

                    } else {

                        
	
                        ///////////
                        // VIDEO //
                        ///////////    
                        
                        promises.push( 
                            new Promise( function(resolve, reject) {

                                //loading
                                TweenMax.to( "#" + renderLoaderID, 0.5, {
                                    width    : Math.round(100 * ( i / sources.length ) ) + '%'
                                });    

                                $( '#' + sources[i].id ).one( 'loadedmetadata', resolve );

                                return resolve( sources[i].url);
                                

                            }).then( makeThreeTexture )
                        );
                            
     

                    }                   
                    
                }
                


                return Promise.all(promises);
            }

            
            

            function makeThreeTexture( url ) {
                
                var texture;
                
                if ( /[\/.](gif|jpg|jpeg|png)$/i.test( url ) ) {
                    
                    ///////////
                    // IMAGE //
                    ///////////   
                    
                   texture = loader.load( url );
                    
                } else {
                    
                    ///////////
                    // VIDEO //
                    ///////////   
                    
                    var video = document.createElement( 'video' );
                    video.src = url;
                    
                    texture = new THREE.VideoTexture( video );
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.format = THREE.RGBFormat;

                    // pause the video
                    texture.image.autoplay = true;
                    texture.image.loop = true;
                    texture.image.currentTime = 0;
                    texture.image.muted = true;
                    texture.image.play();
  
                }

                return texture;
            }


            
            function texturesInit() {
                
            
                //Must be placed behind the loadImages()
                loadImages().then( function( images ) {
                    
                    //remove loading
                    TweenMax.to($( "#" + renderLoaderID), 0.5, {
                        alpha: 0
                    });

                    init( images );
                    render();
                });

                
                
            }


            
			function init( allTextures ) {

				
                textures = allTextures;

				//Core 3D stage begin
				//-------------------------------------		
				//camera
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1,  10000 ); // FlyCamera // FlyControls
                camera.position.z = 1000; //Object 1 unit, equal to 1 pixel
                camera.lookAt = new THREE.Vector3( 0, 0, 0 );
                
                
                
                
                // Fit plane to screen
                var dist        = 1000,
                    vFOV        = THREE.Math.degToRad( camera.fov ),   // convert vertical fov to radians
                    objHeight   = 2 * Math.tan( vFOV / 2 ) * dist,     // visible height
                    objWidth    = objHeight * camera.aspect;           // visible width   
                
            

                
                
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
				renderer.setSize( windowWidth, windowHeight );




                // Immediately use the texture for material creation
                // Create a texture loader so we can load our image file
                var texture1     = textures[0],
                    texture2     = textures[1],
                    intensity    = 1,
                    disp         = loader.load( dispImage );


                disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

                texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
                texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

                texture1.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture2.anisotropy = renderer.capabilities.getMaxAnisotropy();



                var geometry = new THREE.PlaneBufferGeometry(
                    objWidth,
                    objHeight,
                    1
                );
                
                $( '#' + rendererCanvasID ).css( 'height', windowWidth * imgAspect + 'px' );

                geometry.center();


                material = new THREE.ShaderMaterial({
                    uniforms: {
                        effectFactor: { type: "f", value: intensity },
                        dispFactor: { type: "f", value: 0.0 },
                        texture: { type: "t", value: texture1 },
                        texture2: { type: "t", value: texture2 },
                        disp: { type: "t", value: disp }
                    },

                    vertexShader: vertex,
                    fragmentShader: fragment,
                    transparent: true,
                    opacity: 1.0
                });


                displacementSprite = new THREE.Mesh( geometry, material );
                displacementSprite.position.set( 0, 0, 0 );

                scene.add( displacementSprite );



		
//				TweenMax.to( material.uniforms.dispFactor, 1.5, {
//					value: 1,
//					ease: Expo.easeOut
//				});	
//                
                
                
				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );
                
                
                // Scrolling interaction with 3D scenes
                window.addEventListener( 'wheel', onMouseWheel, false );


			}





			function render() {
				requestAnimationFrame( render );

				theta += 0.1;


				//To set a background color.
				//renderer.setClearColor( 0x000000 );	
                
                

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


            function onMouseWheel( e ) {
                
                var  scrollPos;

                //Gets a value that indicates the amount that the mouse wheel has changed.
                var dir, delta, mobileDeltaY = null;

                var touches = e.touches;
                if ( touches && touches.length ) {
                    mobileDeltaY = startY - touches[0].pageY;
                    scrollPos = touches[0].pageY;
                } else {
                    delta = Math.max(-1, Math.min(1, (-e.deltaY)));
                    scrollPos = e.deltaY;
                }


                if ( mobileDeltaY != null ) {

                    if ( mobileDeltaY >= 50 ) {
                        //--- swipe up
                        dir = 'up';
                    }
                    if ( mobileDeltaY <= -50 ) {
                        //--- swipe down
                        dir = 'down';

                    }	
                } else {
                    if( delta < 0 ) { 
                        //scroll down
                        dir = 'down';

                    } else {
                        //scroll up
                        dir = 'up';
                    }	
                }
                
                
                
                //-----
              
                if ( scrollspyEnable ) {
                    
                    var slideCurId = scrollspyConfigItems.filter( '.is-active' ).index(), 
                        slideNextId;

                    if ( dir == 'down' ) {


                        slideNextId = parseFloat( scrollspyConfigItems.filter( '.is-active' ).index() ) + 1;

                        //Transition Between Slides
                        sliderUpdates( slideCurId, slideNextId, 'next', scrollspyConfigCountTotal, scrollspyConfigCountCur, scrollspyConfigControlsPagination, scrollspyConfigControlsArrows, scrollspyConfigLoop );	

                        //Pause the auto play event
                        clearInterval( scrollspyConfigAutoAnim );


                    }
                    if ( dir == 'up' ) {


                        slideNextId = parseFloat( scrollspyConfigItems.filter( '.is-active' ).index() ) - 1;

                        //Transition Between Slides
                        sliderUpdates( slideCurId, slideNextId, 'prev', scrollspyConfigCountTotal, scrollspyConfigCountCur, scrollspyConfigControlsPagination, scrollspyConfigControlsArrows, scrollspyConfigLoop );	


                        //Pause the auto play event
                        clearInterval( scrollspyConfigAutoAnim );  


                    }      
                    
                }

           
               
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

                var items = slider.find( '.uix-3d-slider--liquid-scrollspy__item' ),
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


				var $items                   = $sliderWrapper.find( '.uix-3d-slider--liquid-scrollspy__item' ),
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
					var $current = $sliderWrapper.find( '.uix-3d-slider--liquid-scrollspy__item' ).eq( slideCurId );
					var	$next    = $sliderWrapper.find( '.uix-3d-slider--liquid-scrollspy__item' ).eq( slideNextId );



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
						if ( slideNextId == total - 1 ) $( arrowsID ).find( '.uix-3d-slider--liquid-scrollspy__arrows--next' ).addClass( 'is-disabled' );
						if ( slideNextId == 0 ) $( arrowsID ).find( '.uix-3d-slider--liquid-scrollspy__arrows--prev' ).addClass( 'is-disabled' );
					}




					//Display counter
					//-------------------------------------
					$( countTotalID ).text( total );
					$( countCurID ).text( parseFloat( slideCurId ) + 1 );		





					//Fire the next object
					//-------------------------------------
					activeSlider = slideNextId;
                    
                    
                    //Update Texture
                    material.uniforms.texture.value = textures[Math.floor(slideCurId)];
                    material.uniforms.texture2.value = textures[Math.floor(slideNextId)];  
                    
                    
                    //console.log( 'material.uniforms.texture: ' + material.uniforms.texture.value.image.currentSrc );
                    //console.log( 'material.uniforms.texture2: ' + material.uniforms.texture2.value.image.currentSrc );
                    
                    TweenMax.to( material.uniforms.dispFactor, 1.5, {
                        value: 1,
                        ease: Expo.easeOut,
                        onComplete: function() {

                            //Update Texture
                            var tx1ID, tx2ID;
                            
                            if ( dir == 'prev' ) {
                                
                                
                                material.uniforms.texture.value = textures[Math.floor(slideCurId)];
                                material.uniforms.texture2.value = textures[Math.floor(slideNextId-1)];  
                                
                                
                                if ( loop ) {

                                    tx1ID = slideNextId;
                                    tx2ID = slideNextId - 1;
                                    if ( slideNextId == 0 ) tx2ID = total - 1;

                                } else {


                                }
                                
                            }
                            if ( dir == 'next' ) {
                                
                                material.uniforms.texture.value = textures[Math.floor(slideCurId)];
                                material.uniforms.texture2.value = textures[Math.floor(slideNextId)];  

                                
                                if ( loop ) {

                                    tx1ID = slideNextId;
                                    tx2ID = slideNextId + 1;
                                    if ( slideNextId == total - 1 ) tx2ID = 0;

                                } else {


                                }
  
                            }


                            material.uniforms.texture.value = textures[Math.floor(tx1ID)];
                            material.uniforms.texture2.value = textures[Math.floor(tx2ID)];  

                            
                            //console.log( 'New material.uniforms.texture: ' + material.uniforms.texture.value.image.currentSrc );
                            //console.log( 'New material.uniforms.texture2: ' + material.uniforms.texture2.value.image.currentSrc ); 
                            //console.log( '--------------------' );

                            
                            TweenMax.set( this.target, {
                                value: 0
                            });	
                            
                            
                            //Reset the trigger
                            //-------------------------------------
                            isAnimating = false;			
 
                            
                        }
                    });	

                    

					//Fire the current object
					//-------------------------------------
				


                    
	
					
					
				}// end isAnimating
				
				

			}

			

			// 
			//-------------------------------------	
			return {
                wrapperInit         : wrapperInit,
                texturesInit        : texturesInit,
				getRendererCanvasID : function () { return rendererCanvasID; },
				getScene            : function () { return scene; },
				getCamera           : function () { return camera; } 
			};
    


		}();

		MainStage.wrapperInit(); //step 1
        MainStage.texturesInit(); // step 2
		
			
		
		

		
    };
	
    
    
    
	
    module.components.documentReady.push( module.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady );
	

	return class THREE_LIQUID_SCROLLSPY_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );






