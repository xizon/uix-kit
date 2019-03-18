
/* 
 *************************************
 * <!-- Advanced Slider (Special Effects) -->
 *************************************
 */

/**
 * APP.ADVANCED_SLIDER_FILTER
 * @global
 * @requires ./examples/assets/js/min/pixi.min.js
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 * @requires ./src/components/ES5/_plugins-GSAP
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.ADVANCED_SLIDER_FILTER               = APP.ADVANCED_SLIDER_FILTER || {};
	APP.ADVANCED_SLIDER_FILTER.version       = '0.1.5';
    APP.ADVANCED_SLIDER_FILTER.pageLoaded    = function() {

		
		// Remove pixi.js banner from the console
		PIXI.utils.skipHello();		
	
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			animSpeed                 = 1000,
			$sliderWrapper            = $( '.uix-advanced-slider-sp' ),
			
			//Save different canvas heights as an array
			canvasHeights             = [],

			
			//Autoplay global variables
			timer                     = null,
			playTimes,
			
			//Basic webGL renderers 
			rendererOuterID           = 'uix-advanced-slider-sp__canvas-container',
			rendererCanvasID          = 'uix-advanced-slider-sp__canvas',
			renderer,
		    
			//PIXI
			renderer__filter,
		    rendererCanvasID__filter  = rendererCanvasID,
		    stage__filter,
			container__items,
			displacementSprite,
			displacementFilter,
			
			//Three.js
			scenesAll                 = [],
			texturesAll               = [],
			webGLRenderer;
		
		
		
		
		sliderInit( false );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				sliderInit( true );
				
			}
		});
		

		

		/*
		 * Initialize slideshow
		 *
		 * @param  {Boolean} resize            - Determine whether the window size changes.
		 * @return {Void}
		 */
        function sliderInit( resize ) {
	
			$sliderWrapper.each( function()  {

				var $this                    = $( this ),
					$items                   = $this.find( '.uix-advanced-slider-sp__item' ),
					$first                   = $items.first(),
					nativeItemW,
					nativeItemH;
				
				
				//Get the animation speed
				//-------------------------------------	
				if ( typeof $this.data( 'speed' ) != typeof undefined && $this.data( 'speed' ) != false ) {
					animSpeed = $this.data( 'speed' );
				}
				
		
			
				//Display all images
				//-------------------------------------	
				if ( !Modernizr.webgl ) {
				    $this.find( 'img' ).css( 'visibility', 'visible' );
				}



				//Initialize the first item container
				//-------------------------------------		
				$items.addClass( 'next' );
				
				$first.addClass( 'active' );
				
				
				TweenMax.set( $items, {
					alpha      : 0,
					onComplete : function() {

						TweenMax.to( $first, animSpeed/1000, {
							alpha : 1,
							delay : animSpeed/1000
						});		
					}
					
				});			

				

				if ( $first.find( 'video' ).length > 0 ) {

					//Returns the dimensions (intrinsic height and width ) of the video
					var video    = document.getElementById( $first.find( 'video' ).attr( 'id' ) ),
						videoURL = $first.find( 'source:first' ).attr( 'src' );
					
					if ( typeof videoURL != typeof undefined ) {
						video.addEventListener( 'loadedmetadata', function( e ) {
							$this.css( 'height', this.videoHeight*($this.width()/this.videoWidth) + 'px' );	

							nativeItemW = this.videoWidth;
							nativeItemH = this.videoHeight;	

							//Initialize all the items to the stage
							addItemsToStage( $this, $sliderWrapper, nativeItemW, nativeItemH );


						}, false);	

						video.src = videoURL;
					}




				} else {

					var imgURL   = $first.find( 'img' ).attr( 'src' );

					if ( typeof imgURL != typeof undefined ) {
						
						var img = new Image();
						
						img.onload = function() {
							$this.css( 'height', $this.width()*(this.height/this.width) + 'px' );		

							nativeItemW = this.width;
							nativeItemH = this.height;	

							//Initialize all the items to the stage
							addItemsToStage( $this, $sliderWrapper, nativeItemW, nativeItemH );
							

							
						};

						img.src = imgURL;
					}


				}	
				
				
				

				//Autoplay Slider
				//-------------------------------------		
				if ( !resize ) {

					var dataAuto                 = $this.data( 'auto' ),
						dataTiming               = $this.data( 'timing' ),
						dataLoop                 = $this.data( 'loop' );

					if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
					if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
					if ( typeof dataLoop === typeof undefined ) dataLoop = false;


					if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {

						sliderAutoPlay( dataTiming, $items, dataLoop );

						$this.on({
							mouseenter: function() {
								clearInterval( timer );
							},
							mouseleave: function() {
								sliderAutoPlay( dataTiming, $items, dataLoop );
							}
						});	

					}


				}

				
				

			});


		}
		
		

        /*
		 * Trigger slider autoplay
		 *
		 * @param  {Number} timing           - Autoplay interval.
		 * @param  {Object} items            - Each item in current slider.
		 * @param  {Boolean} loop            - Determine whether to loop through each item.
		 * @return {Void}
		 */
        function sliderAutoPlay( timing, items, loop ) {	
			
			var total = items.length;
			
			timer = setInterval( function() {

				playTimes = parseFloat( items.filter( '.active' ).index() );
				playTimes++;
				
			
				if ( !loop ) {
					if ( playTimes < total && playTimes >= 0 ) sliderUpdates( playTimes, $sliderWrapper, 'next' );
				} else {
					if ( playTimes == total ) playTimes = 0;
					if ( playTimes < 0 ) playTimes = total-1;		
					
					//Prevent problems with styles when switching in positive order
					if ( playTimes == 0 ) {
						sliderUpdates( playTimes, $sliderWrapper, 'prev' );
					} else {
						sliderUpdates( playTimes, $sliderWrapper, 'next' );
					}
					
				}
				

				
			}, timing );	
		}

		
		
		/*
		 * Initialize all the items to the stage
		 *
		 * @param  {Object} slider           - Current selector of each slider.
		 * @param  {Object} sliderWrapper    - Wrapper of the slider.
		 * @param  {Number} nativeItemW      - Returns the intrinsic width of the image/video.
		 * @param  {Number} nativeItemH      - Returns the intrinsic height of the image/video.
		 * @return {Void}
		 */
        function addItemsToStage( slider, sliderWrapper, nativeItemW, nativeItemH ) {
			
			var $this                    = slider,
				$items                   = $this.find( '.uix-advanced-slider-sp__item' ),
				$first                   = $items.first(),
				itemsTotal               = $items.length,
				dataControlsPagination   = $this.data( 'controls-pagination' ),
				dataControlsArrows       = $this.data( 'controls-arrows' ),
				dataLoop                 = $this.data( 'loop' ),
				dataFilterTexture        = $this.data( 'filter-texture' ),
				dataDraggable            = $this.data( 'draggable' ),
				dataDraggableCursor      = $this.data( 'draggable-cursor' );
	
			
			if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
			if ( typeof dataLoop === typeof undefined ) dataLoop = false;
			if ( typeof dataFilterTexture === typeof undefined || !dataFilterTexture || dataFilterTexture == '' ) dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
			if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';

				
			
			//If arrows does not exist on the page, it will be added by default, 
			//and the drag and drop function will be activated.
			if ( $( dataControlsArrows ).length == 0 ) {
				$( 'body' ).prepend( '<div style="display:none;" class="uix-advanced-slider-sp__arrows '+dataControlsArrows.replace('#','').replace('.','')+'"><a href="#" class="uix-advanced-slider-sp__arrows--prev"></a><a href="#" class="uix-advanced-slider-sp__arrows--next"></a></div>' );
			}
			
			
        
		    //Prevent bubbling
			if ( itemsTotal == 1 ) {
				$( dataControlsPagination ).hide();
				$( dataControlsArrows ).hide();
			}

			if ( Modernizr.webgl ) {
				
				//Load slides to canvas
				//-------------------------------------	
				if ( $( '#' + rendererCanvasID ).length == 0 ) {
					$this.prepend( '<div id="'+rendererOuterID+'" class="uix-advanced-slider-sp__canvas-container"><canvas id="'+rendererCanvasID+'"></canvas></div>' );
					
				}
				
				

				//Save different canvas heights as an array
				//-------------------------------------	
				$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

					var $thisItem = $( this );
					
					

					if ( $thisItem.find( 'video' ).length > 0 ) {


						//Returns the dimensions (intrinsic height and width ) of the video
						var video    = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) ),
							videoURL = $thisItem.find( 'video source:first' ).attr( 'src' );
						
					
						video.addEventListener( 'loadedmetadata', function( e ) {

							var	curW    = this.videoWidth,
								curH    = this.videoHeight,
								newW    = curW,
								newH    = curH;

							newW = $this.width();

							//Scaled/Proportional Content 
							newH = curH*(newW/curW);

							//Save different canvas heights as an array
							if ( canvasHeights.length < itemsTotal ) {
								canvasHeights.push( newH );
							}
					

						}, false);	

						video.src = videoURL;



					} else {

						var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
							imgCur   = new Image();

						imgCur.onload = function() {

							var	curW_img    = this.width,
								curH_img    = this.height,
								newW_img    = curW_img,
								newH_img    = curH_img;	

							newW_img = $this.width();


							//Scaled/Proportional Content 
							newH_img = curH_img*(newW_img/curW_img);	

							
							//Save different canvas heights as an array
							if ( canvasHeights.length < itemsTotal ) {
								canvasHeights.push( newH_img );
							}

							
						};

						imgCur.src = imgURL;


					}	
					
				});
				
				

				//Basic webGL renderers 
				//-------------------------------------
				renderer              = new PIXI.Application( $this.width(), $this.height(), {
														//backgroundColor : 0x000000, 
					                                    antialias       : true,
					                                    transparent     : true,
														autoResize      : true, 
														view            : document.getElementById( rendererCanvasID )
													});

				renderer__filter       = new PIXI.autoDetectRenderer( $this.width(), $this.height(), {
														//backgroundColor : 0x000000, 
														transparent     : true,
														view            : document.getElementById( rendererCanvasID__filter )
													});


				stage__filter          = new PIXI.Container();
				container__items       = new PIXI.Container();
				displacementSprite    = ( dataFilterTexture.indexOf( '.mp4' ) >= 0 ) ? new PIXI.Sprite( PIXI.Texture.fromVideo( dataFilterTexture ) ) : new PIXI.Sprite.fromImage( dataFilterTexture );
				displacementFilter    = new PIXI.filters.DisplacementFilter( displacementSprite );

				

				//----------------------------------------------------------------------------------
				//--------------------------------- Brightness Effect -------------------------------	
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: renderer.stage.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-brightness' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );

						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;

							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	



							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	
								
		
							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						// Render updated scene
						renderer.stage.addChild( curSprite );

						TweenMax.set( curSprite, {
							alpha : 0
						});	



					});



					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );

					


				}// end effect





				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: container__items.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	


							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );


						container__items.addChild( curSprite );


						//Add child container to the main container 
						//-------------------------------------
						stage__filter.addChild( container__items );
						// Enable Interactions
						stage__filter.interactive = true;

						
						//Set the filter to stage and set some default values for the animation
						//-------------------------------------
						
						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

						stage__filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer__filter.width / 2;
						displacementSprite.y = renderer__filter.height / 2; 

						displacementSprite.scale.x = 1;
						displacementSprite.scale.y = 1;

						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage__filter.addChild( displacementSprite );


						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {

							// Render updated scene
							renderer__filter.render( stage__filter );

						});
						
	

					});

			
					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );

	
					

				}// end effect



				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 2 -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: container__items.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid2' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	

							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	
							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );

						TweenMax.set( curSprite, {
							alpha : 0
						});	


						container__items.addChild( curSprite );


						//Add child container to the main container 
						//-------------------------------------
						stage__filter.addChild( container__items );
						// Enable Interactions
						stage__filter.interactive = true;

						
						//Set the filter to stage and set some default values for the animation
						//-------------------------------------
						
						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
						
						stage__filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer__filter.width / 2;
						displacementSprite.y = renderer__filter.height / 2;
					


						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage__filter.addChild( displacementSprite );

						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {
							
          
							// Render updated scene
							renderer__filter.render( stage__filter );

						});


					});

				
					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );


				}// end effect
		
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 3 -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: container__items.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid3' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	

							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );

						TweenMax.set( curSprite, {
							alpha : 0
						});	


						container__items.addChild( curSprite );


						//Add child container to the main container 
						//-------------------------------------
						stage__filter.addChild( container__items );
						// Enable Interactions
						stage__filter.interactive = true;
						
						
						//Set the filter to stage and set some default values for the animation
						//-------------------------------------

						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
						
						stage__filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer__filter.width / 2;
						displacementSprite.y = renderer__filter.height / 2;
					


						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage__filter.addChild( displacementSprite );

						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {
							
                            //Need the displacementSprite.texture.baseTexture.wrapMode is "PIXI.WRAP_MODES.REPEAT"
							displacementSprite.x += 1 * delta;
							displacementSprite.y += 0.3;
							
							// Render updated scene
							renderer__filter.render( stage__filter );

						});


					});

				
					
					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );


				}// end effect
				
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Parallax Effect -------------------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: container__items.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-parallax' ) ) {

					
					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $this.width() + 'px';
								renderer.view.style.height = canvasHeights[index] + 'px';	

							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );
						

						container__items.addChild( curSprite );


						
						//Add child container to the main container 
						//-------------------------------------
						stage__filter.addChild( container__items );
						// Enable Interactions
						stage__filter.interactive = true;

						
						
						
						// Create mask
						//-------------------------------------
						//current mask
						var curSpriteMask = new PIXI.Graphics();
						curSpriteMask.lineStyle( 0 );
						curSpriteMask.beginFill( 0xFFFFFF );
						curSpriteMask.moveTo(0,0);
						curSpriteMask.lineTo( renderer.view.width, 0 );
						curSpriteMask.lineTo( renderer.view.width, renderer.view.height );
						curSpriteMask.lineTo( 0, renderer.view.height );
						curSpriteMask.endFill();
						
						
						curSpriteMask.position.x = 0;
						curSpriteMask.position.y = 0;
						
						
						curSprite.mask = curSpriteMask;
						stage__filter.addChild( curSpriteMask ); //Do not add to the container
						


						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {

							// Render updated scene
							renderer__filter.render( stage__filter );

						});
						
	

					});

					
					
					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );


				}// end effect
				
				
				

				//----------------------------------------------------------------------------------
				//--------------------------------- 3D Rotating Effect -----------------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: texturesAll[ index ]     scenesAll[ index ]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-3d-rotating' ) ) {


					var texture;

					//Drag and Drop
					var targetRotationX             = 0,
						targetRotationXOnMouseDown  = 0,
						targetRotationXOnTouchDown  = 0,
						targetRotationY             = 0,
						targetRotationYOnMouseDown  = 0,
						targetRotationYOnTouchDown  = 0,
						mouseX                      = 0,
						mouseY                      = 0,
						mouseXOnMouseDown           = 0,
						mouseXOnTouchDown           = 0,
						mouseYOnMouseDown           = 0,
						mouseYOnTouchDown           = 0,
						windowHalfX                 = $this.width() / 2,
						windowHalfY                 = $this.height() / 2;


					
					

					//Add Geometries and Lights to the main container 
					//-------------------------------------					
					var init = function() {
						$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

							var $thisItem      = $( this ),
								imgVideoHeight = null;

							// create a scene, that will hold all our elements such as objects, cameras and lights.
							var scene  = new THREE.Scene();
							scene.name = 'scene-' + index;


							// make a list item
							var element = document.createElement( 'div' );
							element.className = 'list-item';
							element.innerHTML = '<div class="scene" style="width:'+$this.width() +'px;height:'+$this.height() +'px;"></div>';

							// Look up the element that represents the area
							// we want to render the scene
							scene.userData.element = element.querySelector( '.scene' );
							document.getElementById( rendererOuterID ).appendChild( element );

							TweenMax.set( $( '#' + rendererOuterID ).find( '.list-item' ), {
									alpha: 0,
									css  : {
										display: 'none'
									}
								});	


							// Create a camera, which defines where we're looking at.
							var aspect      = $this.width() / $this.height(),
								camera      = new THREE.PerspectiveCamera( 55, aspect, 0.1, 1000 );

							camera.position.x = 0;
							camera.position.y = -30;
							camera.position.z = 25;
							camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
							scene.userData.camera = camera;


							// Generate one plane geometries mesh to each scene
							if ( $thisItem.find( 'video' ).length > 0 ) {

								texture = new THREE.VideoTexture( document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) ) );
								texture.minFilter = THREE.LinearFilter;
								texture.magFilter = THREE.LinearFilter;
								texture.format = THREE.RGBFormat;

								// pause the video
								texture.image.autoplay = true;
								texture.image.currentTime = 0;
								texture.image.muted = false;
								texture.image.pause();
								
							

							} else {
								
								texture = new THREE.TextureLoader().load( $thisItem.find( 'img' ).attr( 'src' ) );
								
			
							}
							
							
						
							// texture controller
							texturesAll.push( texture );
							
							
							
							// Immediately use the texture for material creation
							var spriteMat            = new THREE.MeshBasicMaterial( { map: texture } ),
								geometry             = new THREE.BoxGeometry( aspect*15, 15, 2 ),
								displacementSprite   = new THREE.Mesh( geometry, spriteMat );

						
							displacementSprite.position.set( -0.01, -0.01, 0 );
							displacementSprite.rotation.set( 0, 0, 0 );
							scene.add( displacementSprite );


							// Generate Ambient Light
							var ambiLight = new THREE.AmbientLight( 0x404040 );
							scene.add( ambiLight );

							// Generate Directional Light
							var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
							light.position.set( 0, 30, 70 );
							scene.add( light );


							// Display multiple instances of three.js in a single page
							scenesAll.push( scene );



						});


						//Create a render and set the size
						webGLRenderer = new THREE.WebGLRenderer( { 
												canvas   : document.getElementById( rendererCanvasID ), //canvas
												alpha    : true, 
												antialias: true 
											} );

						webGLRenderer.setClearColor( new THREE.Color( 0x000000, 0 ) );
						webGLRenderer.setPixelRatio( window.devicePixelRatio );  
						webGLRenderer.shadowMap.enabled = true;


					};

					//Add render event
					//-------------------------------------	

					//Converts numeric degrees to radians
					var toRad = function( number ) {
						return number * Math.PI / 180;
					};


					var render = function() {


						webGLRenderer.setClearColor( 0x000000 );
						webGLRenderer.setScissorTest( false );
						webGLRenderer.clear();

						webGLRenderer.setClearColor( 0x000000 );
						webGLRenderer.setScissorTest( true );

						scenesAll.forEach( function( scene, i ) {

							// Get the element that is a place holder for where we want to draw the scene
							var element = scene.userData.element,
								camera  = scene.userData.camera,
								rect    = element.getBoundingClientRect();


							//automatic rotation
							scene.children[0].rotation.y = Date.now() * 0.0001;
							var amplitudeVal = 1.0 + Math.sin( Date.now() * 0.0001 * 0.5 );

							
							//drag & drop
	//						scene.children[0].rotation.x = toRad( targetRotationX * 4 );
	//						scene.children[0].rotation.y = toRad( targetRotationY * 4 );	
	//						
							//drag & drop with easing effect
							scene.children[0].rotation.x += ( targetRotationX - scene.children[0].rotation.x ) * 0.05;
							scene.children[0].rotation.y += ( targetRotationY - scene.children[0].rotation.y ) * 0.05;


							// set the viewport
							webGLRenderer.setViewport( 0, 0, rect.width, rect.height );
							webGLRenderer.setScissor( 0, 0, rect.width, rect.height );


							//tell texture object it needs to be updated
							texture.needsUpdate = true;

							camera.aspect = $this.width() / $this.height(); // not changing in this example
							camera.updateProjectionMatrix();

							//drag & drop
							webGLRenderer.render( scene, camera );

						} );

					};



					//Animation Interactions
					//-------------------------------------
					var animate = function() {
						render();
						requestAnimationFrame( animate );
					};


					init();
					animate();


					//Rotation and Drop

					var onDocumentMouseDown = function( e ) {
						e.preventDefault();
						document.addEventListener( 'mousemove', onDocumentMouseMove, false );
						document.addEventListener( 'mouseup', onDocumentMouseUp, false );
						document.addEventListener( 'mouseout', onDocumentMouseOut, false );
						mouseXOnMouseDown = e.clientX - windowHalfX;
						mouseYOnMouseDown = e.clientY - windowHalfY;
						targetRotationXOnMouseDown = targetRotationX;
						targetRotationYOnMouseDown = targetRotationY;
					};

					var onDocumentMouseMove = function( e ) {
						mouseX = e.clientX - windowHalfX;
						mouseY = e.clientY - windowHalfY;
						targetRotationX = targetRotationXOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
						targetRotationY = targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown) * 0.02;
					};

					var onDocumentMouseUp = function( e ) {
						document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
						document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
						document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

					};

					var onDocumentMouseOut = function( e ) {
						document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
						document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
						document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

					};




					var onDocumentTouchStart = function( e ) {
						e.preventDefault();
						e = e.changedTouches[ 0 ];

						document.addEventListener( 'touchmove', onDocumentTouchMove, false );
						document.addEventListener( 'touchend', onDocumentTouchEnd, false );
						mouseXOnTouchDown = e.clientX - windowHalfX;
						mouseYOnTouchDown = e.clientY - windowHalfY;
						targetRotationXOnTouchDown = targetRotationX;
						targetRotationYOnTouchDown = targetRotationY;


					};

					var onDocumentTouchMove = function( e ) {
						e.preventDefault();
						e = e.changedTouches[ 0 ];

						mouseX = e.clientX - windowHalfX;
						mouseY = e.clientY - windowHalfY;
						targetRotationX = targetRotationXOnTouchDown + (mouseX - mouseXOnTouchDown) * 0.02;
						targetRotationY = targetRotationYOnTouchDown + (mouseY - mouseYOnTouchDown) * 0.02;	



					};

					var onDocumentTouchEnd = function( e ) {
						document.removeEventListener( 'touchmove', onDocumentTouchMove, false );
						document.removeEventListener( 'touchend', onDocumentTouchEnd, false );

					};

					if ( Modernizr.touchevents ) {
						document.addEventListener( 'touchstart', onDocumentTouchStart, false );
					} else {
						document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					}




					//Responsive plane geometries
					//-------------------------------------
					window.addEventListener( 'resize', function () {

						var width = document.getElementById( rendererCanvasID ).clientWidth;
						var height = document.getElementById( rendererCanvasID ).clientHeight;

						if ( document.getElementById( rendererCanvasID ).width !== width || document.getElementById( rendererCanvasID ).height !== height ) {

							webGLRenderer.setSize( width, height, false );

						}


					}, false );


					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animSpeed );


				}// end effect



				//Canvas Interactions
				//-------------------------------------
				transitionInteractions( 0, itemsTotal-1, $this, 'in', 'next' );
				
				
				
			}


			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			if ( !Modernizr.webgl ) normalSliderVideoInit( $items, false );	



			//Pagination dots 
			//-------------------------------------	
			var _dot       = '',
				_dotActive = '';
			_dot += '<ul>';
			for ( var i = 0; i < itemsTotal; i++ ) {

				_dotActive = ( i == 0 ) ? 'class="active"' : '';

				_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
			}
			_dot += '</ul>';

			if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );

			$( dataControlsPagination ).find( 'li a' ).on( 'click', function( e ) {
				e.preventDefault();

				if ( !$( this ).hasClass( 'active' ) ) {

					
					//Determine the direction
					var curDir = 'prev';
					if ( $( this ).attr( 'data-index' ) > parseFloat( $items.filter( '.active' ).index() ) ) {
						curDir = 'next';
					}
					
					
					//Canvas Interactions
					transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out', curDir );
						
					
					
					//Update the current and previous/next items
					sliderUpdates( $( this ).attr( 'data-index' ), sliderWrapper, curDir );

					//Pause the auto play event
					clearInterval( timer );	
				}



			});

			//Next/Prev buttons
			//-------------------------------------		
			var _prev = $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ),
				_next = $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' );

			$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

			$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
			if ( !dataLoop ) {
				_prev.addClass( 'disabled' );
			}



			_prev.on( 'click', function( e ) {
				e.preventDefault();

				//Canvas Interactions
				transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out', 'prev' );	

				//Update the current and previous items
				sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, sliderWrapper, 'prev' );

				//Pause the auto play event
				clearInterval( timer );

			});

			_next.on( 'click', function( e ) {
				e.preventDefault();

				//Canvas Interactions
				transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out', 'next' );	

				//Update the current and next items
				sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, sliderWrapper, 'next' );


				//Pause the auto play event
				clearInterval( timer );


			});

			



			//Added touch method to mobile device and desktop
			//-------------------------------------	
			var $dragDropTrigger = $items;
			

			//Make the cursor a move icon when a user hovers over an item
			if ( dataDraggable && dataDraggableCursor != '' && dataDraggableCursor != false ) $dragDropTrigger.css( 'cursor', dataDraggableCursor );


			//Mouse event
			$dragDropTrigger.on( 'mousedown.ADVANCED_SLIDER_FILTER touchstart.ADVANCED_SLIDER_FILTER', function( e ) {
				//Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android

				var touches = e.originalEvent.touches;

				$( this ).addClass( 'dragging' );
	
				if ( touches && touches.length ) {	
					$( this ).data( 'origin_mouse_x', parseInt( touches[0].pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( touches[0].pageY ) );

				} else {

					if ( dataDraggable ) {
						$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
						$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );	
					}


				}

				$dragDropTrigger.on( 'mouseup.ADVANCED_SLIDER_FILTER touchmove.ADVANCED_SLIDER_FILTER', function( e ) {
					

					$( this ).removeClass( 'dragging' );
					var touches        = e.originalEvent.touches,
						origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
						origin_mouse_y = $( this ).data( 'origin_mouse_y' );

					if ( touches && touches.length ) {

						var deltaX = origin_mouse_x - touches[0].pageX,
							deltaY = origin_mouse_y - touches[0].pageY;

						//--- left
						if ( deltaX >= 50) {
							if ( $items.filter( '.active' ).index() < itemsTotal - 1 ) _next.trigger( 'click' );
						}
						
						//--- right
						if ( deltaX <= -50) {
							if ( $items.filter( '.active' ).index() > 0 ) _prev.trigger( 'click' );
						}
						
						//--- up
						if ( deltaY >= 50) {
							

						}
						
						//--- down
						if ( deltaY <= -50) {
							

						}
						

						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$dragDropTrigger.off( 'touchmove.ADVANCED_SLIDER_FILTER' );
						}	


					} else {

						
						if ( dataDraggable ) {
							//right
							if ( e.pageX > origin_mouse_x ) {				
								if ( $items.filter( '.active' ).index() > 0 ) _prev.trigger( 'click' );
							}

							//left
							if ( e.pageX < origin_mouse_x ) {
								if ( $items.filter( '.active' ).index() < itemsTotal - 1 ) _next.trigger( 'click' );
							}

							//down
							if ( e.pageY > origin_mouse_y ) {

							}

							//up
							if ( e.pageY < origin_mouse_y ) {

							}	

							$dragDropTrigger.off( 'mouseup.ADVANCED_SLIDER_FILTER' );

						}	



					}



				} );//end: mouseup.ADVANCED_SLIDER_FILTER touchmove.ADVANCED_SLIDER_FILTER




			} );// end: mousedown.ADVANCED_SLIDER_FILTER touchstart.ADVANCED_SLIDER_FILTER

		

		}
		
		
	
		/*
		 * Transition Between Slides
		 *
		 * @param  {Number} elementIndex     - Index of current slider.
		 * @param  {Object} slider           - Selector of the slider .
		 * @param  {String} dir              - Switching direction indicator.
		 * @return {Void}
		 */
        function sliderUpdates( elementIndex, slider, dir ) {
			
			var $items                   = slider.find( '.uix-advanced-slider-sp__item' ),
				$current                 = $items.eq( elementIndex ),
			    total                    = $items.length,
				dataCountTotal           = slider.data( 'count-total' ),
				dataCountCur             = slider.data( 'count-now' ),
				dataControlsPagination   = slider.data( 'controls-pagination' ),
				dataControlsArrows       = slider.data( 'controls-arrows' ),	
				dataLoop                 = slider.data( 'loop' );
			

			if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
			if ( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';
			if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if ( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
			if ( typeof dataLoop === typeof undefined ) dataLoop = false;			
		
		    //Prevent bubbling
			if ( total == 1 ) {
				$( dataControlsPagination ).hide();
				$( dataControlsArrows ).hide();
				return false;
			}
	
			
			
			
			//Transition Interception
			//-------------------------------------
			if ( dataLoop ) {
				if ( elementIndex == total ) elementIndex = 0;
				if ( elementIndex < 0 ) elementIndex = total-1;	
			} else {
				$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
				if ( elementIndex == total - 1 ) $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' ).addClass( 'disabled' );
				if ( elementIndex == 0 ) $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ).addClass( 'disabled' );
			}



			// To determine if it is a touch screen.
			//-------------------------------------
			if ( Modernizr.touchevents ) {
				if ( elementIndex == total ) elementIndex = total-1;
				if ( elementIndex < 0 ) elementIndex = 0;	
				
				//Prevent bubbling
				if ( !dataLoop ) {
					//first item
					if ( elementIndex == 0 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ).addClass( 'disabled' );
					}

					//last item
					if ( elementIndex == total - 1 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' ).addClass( 'disabled' );
					}	
				}

				
			}
			
			//Determine the direction and add class to switching direction indicator.
			//-------------------------------------
			var dirIndicatorClass = '';
			if ( dir == 'prev' ) dirIndicatorClass = 'prev';
			if ( dir == 'next' ) dirIndicatorClass = 'next';
			

			//Add transition class to Controls Pagination
			//-------------------------------------
			$( dataControlsPagination ).find( 'li a' ).removeClass( 'leave' );
			$( dataControlsPagination ).find( 'li a.active' ).removeClass( 'active' ).addClass( 'leave' );
			$( dataControlsPagination ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'active' ).removeClass( 'leave' );
			
			
			
			//Add transition class to each item
			//-------------------------------------	
			$items.removeClass( 'leave prev next' );
			$items.addClass( dirIndicatorClass );
			slider.find( '.uix-advanced-slider-sp__item.active' ).removeClass( 'active' ).addClass( 'leave ' + dirIndicatorClass );
			$items.eq( elementIndex ).addClass( 'active ' + dirIndicatorClass ).removeClass( 'leave' );

			
			

			//Display counter
			//-------------------------------------
			$( dataCountTotal ).text( total );
			$( dataCountCur ).text( parseFloat( elementIndex ) + 1 );		
			

			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			if ( !Modernizr.webgl ) {
				normalSliderVideoInit( $items, false );
				normalSliderVideoInit( $current, true );	
			}
			
			//Reset the default height of canvas
			//-------------------------------------	
			setTimeout( function() {
				canvasDefaultInit( $current );
			}, animSpeed );
			
			
			//Canvas Interactions
			//-------------------------------------
			
			//-- Brightness Effect
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-brightness' ) ) {

			}



			//-- Liquid Distortion Effect
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid' ) ) {

			}



			//-- Liquid Distortion Effect 2
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid2' ) ) {

			}


			//-- Liquid Distortion Effect 3
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid3' ) ) {

			}



			//-- Parallax Effect 
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-parallax' ) ) {

				if ( dataLoop ) {
					if ( elementIndex == 0 ) dir = 'prev';
				}

			}

			//-- 3D Rotating Effect
			if ( slider.hasClass( 'uix-advanced-slider-sp--eff-3d-rotating' ) ) {

			}


			transitionInteractions( elementIndex, $items.filter( '.leave' ).index(), slider, 'in', dir );
			

			
		}
		

								
							
	
		/*
		 * Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
		 *
		 * @param  {Number} w                - The width that the canvas will be set.
		 * @param  {Number} h                - The height that the canvas will be set.
		 * @return {Void}
		 */
        function fixCanvasTagSize( w, h ) {

			
			TweenMax.to( ['#' + rendererCanvasID, '.uix-advanced-slider-sp__wrapper', '.uix-advanced-slider-sp__inner', '.uix-advanced-slider-sp__canvas-container' ], animSpeed/1000, { 
				width : w,
				height: h
			} );

		}
		

		/*
		 * Initialize the default height of canvas
		 *
		 * @param  {Object} slider           - Current selector of each slider.
		 * @return {Void}
		 */
        function canvasDefaultInit( slider ) {
			

			
			if ( slider.find( 'video' ).length > 0 ) {

				//Returns the dimensions (intrinsic height and width ) of the video
				var video    = document.getElementById( slider.find( 'video' ).attr( 'id' ) ),
					videoURL = slider.find( 'source:first' ).attr( 'src' );

				video.addEventListener( 'loadedmetadata', function( e ) {

					//At the same time change the height of the canvas and slider container
					var h = this.videoHeight*(slider.closest( '.uix-advanced-slider__outline' ).width()/this.videoWidth);
					
					if ( Modernizr.webgl ) {
						renderer.view.style.height = h + 'px';
					}
					
					//---
					$sliderWrapper.css( 'height', h + 'px' );	

				}, false);	

				video.src = videoURL;


			} else {

				var imgURL   = slider.find( 'img' ).attr( 'src' );
				
				if ( typeof imgURL != typeof undefined ) {
					
					var img = new Image();
					
					img.onload = function() {

						if ( Modernizr.webgl ) {
							renderer.view.style.height = slider.find( 'img' ).height() + 'px';		
						}
						//---
						$sliderWrapper.css( 'height', slider.closest( '.uix-advanced-slider__outline' ).width()*(this.height/this.width) + 'px' );		

					};

					img.src = imgURL;
				}


			}	
			


		}
		
		
		
		/*
		 * Canvas Transition Interactions
		 * @http://pixijs.download/dev/docs/index.html
		 *
		 * @param  {Number} elementIndex           - Index of current slider.
		 * @param  {Number} prevElementIndex       - Index of previous slider.
		 * @param  {Object} slider                 - Selector of the slider.
		 * @param  {String} goType                 - The type of entry and exit between two items.  
		                                             Optional values: in, out
		 * @param  {String} dir                    - Switching direction indicator.	 
		 * @return {Void}
		 */
        function transitionInteractions( elementIndex, prevElementIndex, slider, goType, dir ) {
			
			
			if ( Modernizr.webgl ) {
			
				var $myRenderer           = $( '#' + rendererOuterID ),
				    $current              = slider.find( '.uix-advanced-slider-sp__item' ).eq( elementIndex ),
					$allItems             = slider.find( '.uix-advanced-slider-sp__item' ),
					imgSel                = $current.find( 'img' ),
				    curImgURL             = imgSel.attr( 'src' ),
					stageW                = slider.width(),
					stageH                = slider.height(),
					spTotal               = slider.find( '.uix-advanced-slider-sp__item' ).length;
				
				
				elementIndex              = parseFloat( elementIndex );
				prevElementIndex          = parseFloat( prevElementIndex );


				
				//----------------------------------------------------------------------------------
				//--------------------------------- Brightness Effect -------------------------------	
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-brightness' ) ) {
				
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			

					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						TweenMax.to( renderer.stage.children[ elementIndex ], animSpeed/1000, {
							pixi: {
								brightness: 5
							},
							alpha : 1
						});	
						
				
						
					} else {
						
						
						//Current item entry action
						TweenMax.to( $myRenderer, animSpeed/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = renderer.stage.children[ elementIndex ];

								TweenMax.to( this.target, animSpeed/1000, {
									alpha : 1
								});			



								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = renderer.stage.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										if ( Object.prototype.toString.call( videoSource.pause ) == '[object Function]' ) videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									if ( Object.prototype.toString.call( videoSource2.play ) == '[object Function]' ) videoSource2.play();
									videoSource2.muted = false;
								}




								//Reset the height of the canvas when each item is switched
								//Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
								//console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
								fixCanvasTagSize( windowWidth, canvasHeights[ elementIndex ] );


								//display filters
								TweenMax.set( curSp, {
									pixi: {
										brightness: 5
									},
									alpha : 1,
									onComplete    : function() {
										

										
										TweenMax.to( this.target, animSpeed/1000, {
											pixi: {
												brightness: 1
											}
										});	

										TweenMax.to( $current, animSpeed/1000, {
											alpha : 1
										});			
								
										
										
									}
								});		




							}
						});			
					}
					
					

	


				} // end effect


				

				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid' ) ) {
					
				
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			

					
					var curSp    = container__items.children[ elementIndex ],
						prevSp   = container__items.children[ prevElementIndex ];

						
					//Display the current item
					//-------------------------------------
					if ( !slider.hasClass( 'js-init-ok' ) ) {
						for ( var k = 0; k < spTotal; k++ ) {

							var obj = container__items.children[ k ];
							
							TweenMax.set( obj, {
								alpha : 0
							});
						}
						
						//Avoid repeated initialization
						slider.addClass( 'js-init-ok' );	
					}


					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
	
	
					} else {
						
						
						
						//Video sprite initialization
						//Need to ensure that the video tag exists
						setTimeout( function() {
							for ( var k = 0; k < spTotal; k++ ) {

								var obj = container__items.children[ k ];
								
								//pause all videos
								if ( obj._texture.baseTexture.imageType == null ) {
									var videoSource = obj.texture.baseTexture.source;


									// play the video
									videoSource.currentTime = 0;
									videoSource.autoplay = false;
									if ( Object.prototype.toString.call( videoSource.pause ) == '[object Function]' ) videoSource.pause();
									videoSource.muted = true;
								}	
	

							}

							//play current video
							if ( curSp._texture.baseTexture.imageType == null ) {
								var videoSource2 = curSp.texture.baseTexture.source;

								// play the video
								videoSource2.currentTime = 0;
								videoSource2.autoplay = true;
								if ( Object.prototype.toString.call( videoSource2.play ) == '[object Function]' ) videoSource2.play();
								videoSource2.muted = false;
							}	

							
							//Reset the height of the canvas when each item is switched
							//Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
							//console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
							fixCanvasTagSize( windowWidth, canvasHeights[ elementIndex ] );
	
						}, 100 );
						

						
						//Current item entry action
						var baseTimeline = new TimelineMax( { onComplete: function () {
							displacementSprite.scale.set( 1 );       
						 },onUpdate: function() {
							displacementSprite.rotation += baseTimeline.progress() * 0.02;      
							displacementSprite.scale.set( baseTimeline.progress() * 3 );

						} });

						baseTimeline.clear();

						if ( baseTimeline.isActive() ) {
						  return;
						}        

						
						

						baseTimeline
						.to( displacementFilter.scale, animSpeed/1000, { x: 300, y: 300, ease: Power1.easeOut } )
						.to( prevSp, (animSpeed/2)/1000, { alpha: 0, ease: Power2.easeOut }, (animSpeed/3)/1000 )
						.to( curSp, (animSpeed/2)/1000, { alpha: 1, ease: Power2.easeOut }, (animSpeed/2)/1000 )
						.to( displacementFilter.scale, animSpeed/1000, { x: 0, y: 0, ease: Power2.easeOut }, (animSpeed/2)/1000 )
						.to( $current, animSpeed/1000, { alpha: 1, ease: Power2.easeOut }, 'final' );

						
						
						

						//Add new ripple each time mouse
						//-------------------------------------
						$sliderWrapper[0].addEventListener("mousedown", function(e) {
					  
							TweenMax.to( displacementFilter.scale, 1, { x: "+=" + Math.sin( e.pageX ) * 100 + "", y: "+=" + Math.cos( e.pageY ) * 100 + ""  });   
							rotateSpite();
						});
						$sliderWrapper[0].addEventListener("mouseup", function(e) {
					
							TweenMax.to( displacementFilter.scale, 1, { x: 0, y: 0 } );
						});
						
						var rotateSpite = function() {
							displacementFilter.rotation += 0.001;
						};
						
						
						
						
						
						
						
					}
					

				} // end effect
				
				
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 2 -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid2' ) ) {
					
				
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			

					
					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						TweenMax.to( displacementSprite.scale, 1, { 
							x: 10
						} );
			
						
					} else {
						
						
						//Current item entry action
						TweenMax.to( $myRenderer, animSpeed/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = container__items.children[ elementIndex ];

								TweenMax.to( this.target, animSpeed/1000, {
									alpha : 1
								});	


								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = container__items.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										if ( Object.prototype.toString.call( videoSource.pause ) == '[object Function]' ) videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									if ( Object.prototype.toString.call( videoSource2.play ) == '[object Function]' ) videoSource2.play();
									videoSource2.muted = false;
								}


								//Reset the height of the canvas when each item is switched
								//Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
								//console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
								fixCanvasTagSize( windowWidth, canvasHeights[ elementIndex ] );	

								
								//display filters
								
								//sprite
								var baseTimeline = new TimelineMax( {
									delay       : 0,
									paused      : false,
									repeat      : 0,
									onRepeat    : function() {},
									onComplete  : function() {
										
										TweenMax.to( displacementSprite.scale, 1, { x: 1, y: 1 });   
										TweenMax.to( displacementSprite, 1, { rotation: 0 }); 
										
										

									},
									onUpdate    : function() {  
										displacementSprite.scale.set( baseTimeline.progress() * 13 );
										displacementSprite.rotation += baseTimeline.progress() * 0.02;
										
									}
								} );
								
								baseTimeline.clear();

								//filter
								baseTimeline
								  .to( displacementFilter.scale, animSpeed/1000, { y: "+=" + 200 + "", ease: Power3.easeOut } )
								  .to( curSp, (animSpeed/2)/1000, { alpha: 1, ease: Power3.easeOut }, (animSpeed/2)/1000 )     
								  .to( displacementFilter.scale, animSpeed/1000, { y: 0,  ease: Power3.easeOut }, (animSpeed/2)/1000 )
								  .to( $current, animSpeed/1000, { alpha: 1, ease: Power2.easeOut }, 'final' );

								

							}
						});		

						

						//Add new ripple each time mouse is clicked/mousemoved
						//-------------------------------------
						document.addEventListener("mousemove", function(e) {
					
							TweenMax.to( displacementFilter.scale, 1, { x: e.pageX/2 + "" });   
						});

	
					}	
					
					

					
				

				} // end effect
				
				

				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 3 -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid3' ) ) {
					
				
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			

					
					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						
						TweenMax.to( displacementSprite, 1, { 
							x: 23,
							y: 10
						} );
						
						
					} else {
						
						
						//Current item entry action
						TweenMax.to( $myRenderer, animSpeed/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = container__items.children[ elementIndex ];

								TweenMax.to( this.target, animSpeed/1000, {
									alpha : 1
								});	


								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = container__items.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										if ( Object.prototype.toString.call( videoSource.pause ) == '[object Function]' ) videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									if ( Object.prototype.toString.call( videoSource2.play ) == '[object Function]' ) videoSource2.play();
									videoSource2.muted = false;
								}
								
								
								//Reset the height of the canvas when each item is switched
								//Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
								//console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
								fixCanvasTagSize( windowWidth, canvasHeights[ elementIndex ] );	

								

								//display filters
								
								//sprite
								var baseTimeline = new TimelineMax( {
									delay       : 0,
									paused      : false,
									repeat      : 0,
									onRepeat    : function() {},
									onComplete  : function() {
							

									},
									onUpdate    : function() {  
									   
									}
								} );
								
								baseTimeline.clear();

								//filter
								baseTimeline
								  .to( displacementFilter.scale, animSpeed/1000, { y: "+=" + 50 + "", ease: Power3.easeOut } )
								  .to( curSp, (animSpeed/2)/1000, { alpha: 1, ease: Power3.easeOut }, (animSpeed/2)/1000 )     
								  .to( displacementFilter.scale, animSpeed/1000, { y: 0,  ease: Power3.easeOut }, (animSpeed/2)/1000 )
								  .to( $current, animSpeed/1000, { alpha: 1, ease: Power2.easeOut }, 'final' );

								
								

							}
						});		

	
					}	
					
					

					
				

				} // end effect
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Parallax Effect -----------------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-parallax' ) ) {
					
					
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			
					
					//Prevent text overlap when switching quickly
					$allItems.attr( 'data-text-eff-enable', 0 );
					$current.attr( 'data-text-eff-enable', 1 );	

					
				
					var curSpParallax  = container__items.children[ elementIndex ],
						prevSpParallax = container__items.children[ prevElementIndex ];

					//Display the current item
					//-------------------------------------
					if ( !slider.hasClass( 'js-init-ok' ) ) {
						for ( var m = 0; m < spTotal; m++ ) {

							var objParallax = container__items.children[ m ];
							
							TweenMax.set( objParallax.mask, {
								x : renderer.view.width
							});
						}

						//Avoid repeated initialization
						slider.addClass( 'js-init-ok' );	
					}

					


					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action

					} else {
						
						//Video sprite initialization
						//Need to ensure that the video tag exists
						setTimeout( function() {
							for ( var m = 0; m < spTotal; m++ ) {

								var obj = container__items.children[ m ];
								
								//pause all videos
								if ( obj._texture.baseTexture.imageType == null ) {
									var videoSource = obj.texture.baseTexture.source;


									// play the video
									videoSource.currentTime = 0;
									videoSource.autoplay = false;
									if ( Object.prototype.toString.call( videoSource.pause ) == '[object Function]' ) videoSource.pause();
									videoSource.muted = true;
								}	
	

							}

							//play current video
							if ( curSpParallax._texture.baseTexture.imageType == null ) {
								var videoSource2 = curSpParallax.texture.baseTexture.source;

								// play the video
								videoSource2.currentTime = 0;
								videoSource2.autoplay = true;
								if ( Object.prototype.toString.call( videoSource2.play ) == '[object Function]' ) videoSource2.play();
								videoSource2.muted = false;
							}	

							//Reset the height of the canvas when each item is switched
							//Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
							//console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
							fixCanvasTagSize( windowWidth, canvasHeights[ elementIndex ] );		


						}, 100 );
						
						
						
						
						//Current item entry action
						var restoreX,
							offsetX       = renderer.view.width / 6,
							parallaxSpeed = animSpeed/1000,
							restoreItems  = function() {
								//restore other items besides the current item
								for ( var n = 0; n < spTotal; n++ ) {

									var objParallax = container__items.children[ n ];
									if ( elementIndex != n ) objParallax.mask.x = restoreX;
								}
	
							},
							goNextItem    = function() {
								
								// Paralax effect on current slide
								TweenMax.to( curSpParallax, parallaxSpeed, { 
									x      : 0, 
									ease   : Power2.easeInOut 
								});

								// Current Mask animation
								TweenMax.to( curSpParallax.mask, parallaxSpeed, { 
									x          : 0, 
									ease       : Power4.easeInOut, 
									onComplete : function() {
										restoreItems();
									}
								});		
								
								
								setTimeout( function() {
									
									//text effect
									if ( $.isFunction( $.fn.UixTextEff ) ) {
										$current.find( '[data-text-eff]' ).each( function( index )  {
											$( document ).UixTextEff( { selectors: '[data-text-eff="'+$( this ).data( 'text-eff' )+'"]' } );
										});

									}	


									//Prevent text overlap when switching quickly
									$allItems.each( function()  {
										if ( $( this ).attr( 'data-text-eff-enable' ) == 1 ) {

											TweenMax.to( $( this ), parallaxSpeed, {
												alpha : 1,
												delay : parallaxSpeed/2
											});	

										} else {

											TweenMax.to( $( this ), parallaxSpeed, {
												alpha : 0,
												delay : parallaxSpeed/2
											});				
										}
									});

									
								}, parallaxSpeed*1000 / 2 );
								
								
								
							};
						
						
						// Direction handler
						if ( dir == 'next' ){
							
							curSpParallax.x = offsetX;
							curSpParallax.mask.x = renderer.view.width;
							restoreX = renderer.view.width;
				
							// Paralax effect on current slide
							TweenMax.to( prevSpParallax, parallaxSpeed, { 
								x      : -offsetX, 
								ease   : Power2.easeInOut
							});
							
						} else { 
							
							curSpParallax.x = -offsetX;
							curSpParallax.mask.x = - ( renderer.view.width + curSpParallax.x );
							restoreX = -renderer.view.width;
							
							// Paralax effect on previous slide
							TweenMax.to( prevSpParallax, parallaxSpeed, { 
								x      : offsetX, 
								ease   : Power2.easeInOut
							});

							// Previous Mask animation
							TweenMax.to( prevSpParallax.mask, parallaxSpeed, { 
								x      : renderer.view.width, 
								ease   : Power4.easeInOut
							});

							
						}
						
						goNextItem();
						


					}
					
				

				} // end effect		
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- 3D Rotating Effect -----------------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-3d-rotating' ) ) {
					
					
			
					//Hide description container of item
					//-------------------------------------
					TweenMax.to( $allItems, animSpeed/1000, {
						alpha : 0
					});			

					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					
					if ( goType == 'out' ) {
						//Current item leaving action
						
						
						//rotation transition
						TweenMax.to( scenesAll[ elementIndex ].children[ 0 ].rotation, animSpeed/1000, {
							x: '+=2',
							y: '+=2'
						});	
						
						
	
					} else {
						
						//Current item entry action
						TweenMax.to( $myRenderer, animSpeed/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = $myRenderer.find( '.list-item' ).eq( elementIndex );

								TweenMax.to( this.target, animSpeed/1000, {
									alpha : 1
								});


								//display the current item
								TweenMax.set( $myRenderer.find( '.list-item' ), {
									alpha: 0,
									css  : {
										display: 'none'
									}
								});	


								// pause all videos
								for ( var k = 0; k < spTotal; k++ ) {

									var videoOb = texturesAll[ k ].image;

									if ( videoOb.currentSrc.indexOf( '.mp4' ) >= 0 ) {
										videoOb.autoplay = false;
										videoOb.currentTime = 0;
										videoOb.muted = true;
										videoOb.pause();
									}

								}



								// play the video
								var videoObCur =  texturesAll[ elementIndex ].image;

								if ( videoObCur.currentSrc.indexOf( '.mp4' ) >= 0 ) {
									videoObCur.autoplay = true;
									videoObCur.currentTime = 0;
									videoObCur.muted = false;
									videoObCur.play();
								}



								//display filters
								TweenMax.to( curSp, animSpeed/1000, {
									alpha: 1,
									css : {
										display: 'block'
									},
									onComplete : function() {
										TweenMax.to( $current, animSpeed/1000, {
											alpha : 1
										});		
									}
								});	


							}
						});			

						
					}



					

				}// end effect
					
				
				
				
			} else {
				slider.find( '.uix-advanced-slider-sp__item canvas' ).hide();
			}
	
			
		}

		
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {Object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {Boolean} play            - Forced to trigger pause or play events.
		 * @return {Void}
		 */
		function normalSliderVideoInit( wrapper, play ) {
			wrapper.find( '.uix-video__slider' ).each( function()  {
				var $this          = $( this ),
					videoWrapperW  = $this.closest( '.uix-advanced-slider__outline' ).width(),
					curVideoID     = $this.find( 'video' ).attr( 'id' ) + '-slider-videopush',
					coverPlayBtnID = 'videocover-' + curVideoID,
					dataControls   = $this.data( 'embed-video-controls' ),
					dataAuto       = $this.data( 'embed-video-autoplay' ),
					dataLoop       = $this.data( 'embed-video-loop' ),
					dataW          = $this.data( 'embed-video-width' ),
					dataH          = $this.data( 'embed-video-height' ),
					$replayBtn     = $( '#'+curVideoID+'-replay-btn' );
				
				
				//Push a new ID to video
				//Solve the problem that ajax asynchronous loading does not play
				$this.find( '.video-js' ).attr( 'id', curVideoID );

				
				if ( typeof dataAuto === typeof undefined ) {
					dataAuto = true;
				}
				if ( typeof dataLoop === typeof undefined ) {
					dataLoop = true;
				}
				

				if ( typeof dataControls === typeof undefined ) {
					dataControls = false;
				}	
				
				if ( typeof dataW === typeof undefined || dataW == 'auto' ) {
					dataW = videoWrapperW;
				}	

				if ( typeof dataH === typeof undefined || dataH == 'auto' ) {
					dataH = videoWrapperW/1.77777777777778;
				}

				

				//Display cover and play buttons when some mobile device browsers cannot automatically play video
				if ( $( '#' + coverPlayBtnID ).length == 0 ) {
					$( '<div id="'+coverPlayBtnID+'" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url('+$this.find( 'video' ).attr( 'poster' )+')"></span><span class="uix-video__cover__playbtn"></span></div>' ).insertBefore( $this );


					var btnEv = ( Modernizr.touchevents ) ? 'touchstart' : 'click';
					$( '#' + coverPlayBtnID + ' .uix-video__cover__playbtn' ).on( btnEv, function( e ) {
						e.preventDefault();

						myPlayer.play();

						$( '#' + coverPlayBtnID ).hide();

					});

				}
				
				
				//Add replay button to video 
				if ( $replayBtn.length == 0 ) {
					$this.after( '<span class="uix-video__btn-play" id="'+curVideoID+'-replay-btn"></span>' );
				}
				
				
				//HTML5 video autoplay on mobile revisited
				if ( dataAuto && windowWidth <= 768 ) {
					$this.find( '.video-js' ).attr({
						'autoplay'    : 'true',
						'muted'       : 'true',
						'playsinline' : 'true'
					});
				}

				var myPlayer = videojs( curVideoID, {
										  width     : dataW,
										  height    : dataH,
										  loop      : dataLoop,
										  autoplay  : dataAuto
										});


				
				
				myPlayer.ready(function() {
					
					
					/* ---------  Video initialize */
					myPlayer.on( 'loadedmetadata', function() {

						//Get Video Dimensions
						var curW    = this.videoWidth(),
							curH    = this.videoHeight(),
							newW    = curW,
							newH    = curH;

						newW = videoWrapperW;

						//Scaled/Proportional Content 
						newH = curH*(newW/curW);


						if ( !isNaN( newW ) && !isNaN( newH ) )  {
							myPlayer.height( newH );		
							myPlayer.width( newW );		
							
							$this.css( 'height', newH );
						}



						//Show this video wrapper
						$this.css( 'visibility', 'visible' );

						//Hide loading effect
						$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();

					});		

		
				
					/* ---------  Set, tell the player it's in fullscreen  */
					if ( dataAuto ) {
						//Fix an error of Video auto play is not working in browser
						//myPlayer.muted( true ); 
						
						//Prevent autoplay error: Uncaught (in promise) DOMException
						var promise = myPlayer.play();

						if ( promise !== undefined ) {
							promise.then( function() {
								// Autoplay started!
							
							}).catch( function( error ) {
								// Autoplay was prevented.
								$( '#' + coverPlayBtnID ).show();
								$( '#' + coverPlayBtnID + ' .uix-video__cover__playbtn' ).show();
								console.log( 'Autoplay was prevented.' );
								
							});
							
						}
					}

					

					/* ---------  Disable control bar play button click */
					if ( !dataControls ) {
						myPlayer.controls( false );
					}
					
					
					/* ---------  Determine if the video is auto played from mobile devices  */
					var autoPlayOK = false;

					myPlayer.on( 'timeupdate', function() {

						var duration = this.duration();
						if ( duration > 0 ) {
							autoPlayOK = true;
							if ( this.currentTime() > 0 ) {
								autoPlayOK = true;
								this.off( 'timeupdate' );

								//Hide cover and play buttons when the video automatically played
								$( '#' + coverPlayBtnID ).hide();
							} 

						}

					});
				

					
					/* ---------  Pause the video when it is not current slider  */
					if ( !play ) {
						myPlayer.pause();
						myPlayer.currentTime(0);
						
					} else {
						if ( dataAuto ) {

							myPlayer.currentTime(0);
							
							//Prevent autoplay error: Uncaught (in promise) DOMException
							var promise = myPlayer.play();

							if ( promise !== undefined ) {
								promise.then( function() {
									// Autoplay started!

								}).catch( function( error ) {
									// Autoplay was prevented.
									$( '#' + coverPlayBtnID ).show();
									$( '#' + coverPlayBtnID + ' .uix-video__cover__playbtn' ).show();
									console.log( 'Autoplay was prevented.' );

								});

							}

							//Hidden replay button
							$replayBtn.hide();

							//Should the video go to the beginning when it ends
							myPlayer.on( 'ended', function () { 
								
								if ( dataLoop ) {
									myPlayer.currentTime(0);
									myPlayer.play();	
								} else {
									//Replay this video
									myPlayer.currentTime(0);
									
									$replayBtn
										.show()
										.off( 'click' )
										.on( 'click', function( e ) {
											e.preventDefault();

											myPlayer.play();
											$replayBtn.hide();

										});						
								}
							
							});		


						}	
					}
					

				});

			});	
		}	    
		
    };

    APP.components.pageLoaded.push( APP.ADVANCED_SLIDER_FILTER.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );



