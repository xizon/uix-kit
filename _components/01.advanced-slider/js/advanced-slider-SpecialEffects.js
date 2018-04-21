
/* 
 *************************************
 * <!-- Advanced Slider (Special Effects) -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		
	
		var $window            = $( window ),
			windowWidth        = $window.width(),
			windowHeight       = $window.height();
		
		
		
		advancedSliderInit();
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				advancedSliderInit();
				
			}
		});
		

		
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {boolean} play            - Forced to trigger pause or play events.
		 * @return {void}                    - The constructor.
		 */
		function advancedSliderVideoEmbedInit( wrapper, play ) {
			wrapper.find( '.slider-video-embed' ).each( function()  {
				var $this         = $( this ),
					videoWrapperW = $this.closest( '.custom-advanced-slider-outer' ).width(),
					videoWrapperH = $this.closest( '.custom-advanced-slider-outer' ).height(),
					curVideoID    = $this.find( '.video-js' ).attr( 'id' ),
					dataControls  = $this.data( 'embed-video-controls' ),
					dataAuto      = $this.data( 'embed-video-autoplay' ),
					dataLoop      = $this.data( 'embed-video-loop' ),
					dataW         = $this.data( 'embed-video-width' ),
					dataH         = $this.data( 'embed-video-height' ),
					$replayBtn    = $( '#'+curVideoID+'-replay-btn' );
				
				if ( videoWrapperH == 0 ) videoWrapperH = videoWrapperW/1.77777777777778;

			
				if( typeof dataAuto === typeof undefined ) {
					dataAuto = true;
				}
				if( typeof dataLoop === typeof undefined ) {
					dataLoop = true;
				}
				

				if( typeof dataControls === typeof undefined ) {
					dataControls = false;
				}	
				
				if( typeof dataW === typeof undefined || dataW == 'auto' ) {
					dataW = videoWrapperW;
				}	

				if( typeof dataH === typeof undefined || dataH == 'auto' ) {
					dataH = videoWrapperH;
				}

				
				
				
				
				//Add replay button to video 
				if ( $replayBtn.length == 0 ) {
					$this.after( '<span class="web-video-replay" id="'+curVideoID+'-replay-btn"></span>' );
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
										  controlBar: {
											  muteToggle : false,
											  autoplay   : dataAuto,
											  loop       : dataLoop,
											  controls   : true,
											  controlBar : {
												  muteToggle: false
											  }
										  }


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
							myPlayer
								.width( newW )
								.height( newH );	
							
							$this.css( 'height', newH );
						}



						//Show this video wrapper
						$this.css( 'visibility', 'visible' );

						//Hide loading effect
						$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();

					});		

		
				
					/* ---------  Set, tell the player it's in fullscreen  */
					if ( dataAuto ) {
						myPlayer.play();
					}


					/* ---------  Disable control bar play button click */
					if ( !dataControls ) {
						myPlayer.controls( false );
					}

					
					/* ---------  Pause the video when it is not current slider  */
					if ( !play ) {
						myPlayer.pause();
						myPlayer.currentTime(0);
						
					} else {
						if ( dataAuto ) {

							myPlayer.currentTime(0);
							myPlayer.play();
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
		
		
		
		/*
		 * Initialize slideshow
		 *
		 * @return {void}                   - The constructor.
		 */
        function advancedSliderInit() {
			
			var $advSlider = $( '.custom-advanced-slider-sp' );
			$advSlider.each( function()  {

				var $this                    = $( this ),
					$items                   = $this.find( '.item' ),
					total                    = $items.length,
					timerEvtStop             = null,
					dataControlsPagination   = $this.data( 'controls-pagination' ),
					dataControlsArrows       = $this.data( 'controls-arrows' ),
					dataLoop                 = $this.data( 'loop' ),
					dataAuto                 = $this.data( 'auto' ),
					dataTiming               = $this.data( 'timing' );


				if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.custom-advanced-slider-sp-pagination';
				if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.custom-advanced-slider-sp-arrows';
				if( typeof dataLoop === typeof undefined ) dataLoop = false;
				if( typeof dataAuto === typeof undefined ) dataAuto = false;	
				if( typeof dataTiming === typeof undefined ) dataTiming = 10000;



			
				//Initialize the slider style
				//-------------------------------------	
				$items.first().addClass( 'active' );
				
			
				var curImgH = 0;
				//If the src is already set, then the event is firing in the cached case, 
				//before you even get the event handler bound. To fix this, you can loop 
				//through checking and triggering the event based off .complete
				$items.first().find( 'img' ).one( 'load', function() {
					curImgH = $( this ).height();
				}).each(function() {
					if( this.complete ) $( this ).load();
				});	


				if ( curImgH > 0 ) {
					$this.css( 'height', curImgH + 'px' );
				}

	
				//Load slides to canvas
				//-------------------------------------	
				$this.find( '.item' ).each( function( index )  {
					

					//Canvas Interactions
					if ( $items.eq( index ).find( 'video' ).length == 0 ) {
						if ( $( '#custom-advanced-slider-sp-canvas-item-'+index ).length == 0 ) {
							$( this ).prepend( '<canvas id="custom-advanced-slider-sp-canvas-item-'+index+'" width="'+$this.width()+'" height="'+$this.height()+'"></canvas>' );
						}
						canvasInteractions( index, $this );
					}
					
					
				});
				
				
			
				// Fires local videos asynchronously with slider switch.
				//-------------------------------------
				advancedSliderVideoEmbedInit( $items, false );	

				
				
				//Autoplay Slider
				//-------------------------------------			
				if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {
					
					var playTimes     = 0,
						timerEvtStop  = false;

					// change item
					setInterval( function() {
					
						if ( timerEvtStop ) return;

						setTimeout( function() {
							if ( playTimes == total ) playTimes = 0;
							if ( playTimes < 0 ) playTimes = total-1;	

							advancedSliderUpdates( playTimes, $advSlider );

							playTimes++;
							
						}, dataTiming );	
						
					}, dataTiming );
	
				}
				
				$this.on( 'mouseout', function() {
					timerEvtStop = false;
				} );



				//Pagination dots 
				//-------------------------------------	
				var _dot       = '',
					_dotActive = '';
				_dot += '<ul>';
				for ( var i = 0; i < total; i++ ) {

					_dotActive = ( i == 0 ) ? 'class="active"' : '';

					_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
				}
				_dot += '</ul>';

				if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );
				
				$( dataControlsPagination ).find( 'li a' ).on( 'click', function( e ) {
					e.preventDefault();
					
					if ( !$( this ).hasClass( 'active' ) ) {
						advancedSliderUpdates( $( this ).attr( 'data-index' ), $advSlider );

						//Pause the auto play event
						timerEvtStop = true;	
					}

	

				});
				
				//Next/Prev buttons
				//-------------------------------------		
				var _prev = $( dataControlsArrows ).find( '.prev' ),
					_next = $( dataControlsArrows ).find( '.next' );
					
				$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );
				
				$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
				if ( !dataLoop ) {
					_prev.addClass( 'disabled' );
				}
				
				_prev.on( 'click', function( e ) {
					e.preventDefault();
					
					advancedSliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $advSlider );

					//Pause the auto play event
					timerEvtStop = true;

				});
				
				_next.on( 'click', function( e ) {
					e.preventDefault();
					
					advancedSliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $advSlider );

					
					//Pause the auto play event
					timerEvtStop = true;
					
					
				});
				
				

			});


		}
		
	
		/*
		 * Transition Between Slides
		 *
		 * @param  {number} elementIndex     - Index of current slider.
		 * @param  {object} slider           - Selector of the slider .
		 * @return {void}                    - The constructor.
		 */
        function advancedSliderUpdates( elementIndex, slider ) {
			
			var $items                   = slider.find( '.item' ),
				$current                 = $items.eq( elementIndex ),
			    total                    = $items.length,
				dataCountTotal           = slider.data( 'count-total' ),
				dataCountCur             = slider.data( 'count-now' ),
				dataControlsPagination   = slider.data( 'controls-pagination' ),
				dataControlsArrows       = slider.data( 'controls-arrows' ),	
				dataLoop                 = slider.data( 'loop' ),
				dataAuto                 = slider.data( 'auto' );
				
			
			if( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
			if( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.custom-advanced-slider-sp-pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.custom-advanced-slider-sp-arrows';
			if( typeof dataLoop === typeof undefined ) dataLoop = false;
			if( typeof dataAuto === typeof undefined ) dataAuto = false;			
		
			
			
			//Reset the slider height
			//-------------------------------------	
			var curNewImgH = false;
			$current.find( 'img' ).one( 'load', function() {
				curNewImgH = $( this ).height();
			}).each(function() {
				if( this.complete ) $( this ).load();
			});	


			if ( curNewImgH && curNewImgH > 0 ) {
				slider.css( 'height', curNewImgH + 'px' );
			}
			
			
			
			//Transition Interception
			//-------------------------------------
			if ( dataLoop ) {
				if ( elementIndex == total ) elementIndex = 0;
				if ( elementIndex < 0 ) elementIndex = total-1;	
			} else {
				$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
				if ( elementIndex == total - 1 ) $( dataControlsArrows ).find( '.next' ).addClass( 'disabled' );
				if ( elementIndex == 0 ) $( dataControlsArrows ).find( '.prev' ).addClass( 'disabled' );
			}

			$( dataControlsPagination ).find( 'li a' ).removeClass( 'leave' );
			$( dataControlsPagination ).find( 'li a.active' ).removeClass( 'active' ).addClass( 'leave' );
			$( dataControlsPagination ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'active' ).removeClass( 'leave' );
			
			
			$items.removeClass( 'leave' );
			slider.find( '.item.active' ).removeClass( 'active' ).addClass( 'leave' );
			$items.eq( elementIndex ).addClass( 'active' ).removeClass( 'leave' );

			
			

			//Display counter
			//-------------------------------------

			$( dataCountTotal ).text( total );
			$( dataCountCur ).text( parseFloat( elementIndex ) + 1 );		
			
			
			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			advancedSliderVideoEmbedInit( $items, false );
			advancedSliderVideoEmbedInit( $current, true );
			

			
			//Canvas Interactions
			//-------------------------------------
			canvasInteractions( elementIndex, slider )


			
		}
		
	
		/*
		 * Canvas Interactions
		 * @http://pixijs.download/dev/docs/index.html
		 *
		 * @param  {number} elementIndex     - Index of current slider.
		 * @param  {object} slider           - Selector of the slider .
		 * @return {void}                    - The constructor.
		 */
        function canvasInteractions( elementIndex, slider ) {
			
			if ( Modernizr.webgl ) {
			
				var hasVideo              = ( slider.find( '.item' ).eq( elementIndex ).find( 'video' ).length > 0 ) ? true : false,
				    curImgURL             = slider.find( '.item' ).eq( elementIndex ).find( 'img' ).attr( 'src' ),
					stageW                = slider.width(),
					stageH                = slider.height(),
					curSprite             = new PIXI.Sprite.fromImage( curImgURL, true ),
					ticker                = new PIXI.ticker.Ticker(),
					renderer              = new PIXI.Application( stageW, stageH, {
															backgroundColor : 0x000000, 
															autoResize      : true, 
															view            : document.getElementById( 'custom-advanced-slider-sp-canvas-item-'+elementIndex )
														}),
				
					filterAnimRenderer    = new PIXI.autoDetectRenderer( stageW, stageH, {
															backgroundColor : 0x000000, 
															transparent     : false,
															view            : document.getElementById( 'custom-advanced-slider-sp-canvas-item-'+elementIndex )
														});

				
				//If video
				if ( hasVideo ) return false;
				
			

				curSprite.width  = stageW;
				curSprite.height = stageH;


				//Brightness Effect
				//-------------------------------------		
				if ( slider.hasClass( 'eff-brightness' ) ) {

					// ------------ Add child container to the stage of each slider's canvas
					renderer.stage.addChild( curSprite );

					
					// ------------ Animation Effects
					TweenLite.set( curSprite, {
						pixi: {
							brightness: 5
						}
					});	

					TweenLite.to( curSprite, 3, {
						pixi: {
							brightness: 1
						},
						delay: 0.6
					});		


				}


				//Liquid Distortion Effect
				//-------------------------------------		
				if ( slider.hasClass( 'eff-liquid' ) ) {

					
					    // ------------ Add filter container to the main container 
						var count       = 0,
							ropeLength  = stageW / 10,
							points      = [];

						for ( var i = 0; i < 10; i++ ) {
							points.push( new PIXI.Point( i * ropeLength, 0 ) );
						}

						// Set the filter to stage and set some default values for the animation
					    var strip = new PIXI.mesh.Rope( PIXI.Texture.fromImage( curImgURL ), points );
				
					
						strip.x = 0;
					    strip.y = stageH/2 - 20;

						// ------------ Add child container to the stage of each slider's canvas
						renderer.stage.scale.set( 1 + stageH / stageW );
						renderer.stage.addChild( strip );

					
					    // ------------ Animation Effects
						ticker.autoStart = true;
						ticker.add( function( delta ) {

							// speed
							count += 0.01;
						
							// make the effect
							for ( var j = 0; j < points.length; j++ ) {
								
								points[j].y = Math.sin((j * 0.5) + count) * 15;
								points[j].x = j * ropeLength + Math.cos((j * 0.3) + count) * 15;	
							}
							
						});
					
					   

				}	
				
				
				//Liquid Distortion Effect
				//-------------------------------------		
				if ( slider.hasClass( 'eff-liquid2' ) ) {
					
						var filterStage         = new PIXI.Container(),
							displacementSprite  = new PIXI.Sprite.fromImage( curImgURL ),
							displacementFilter  = new PIXI.filters.DisplacementFilter( displacementSprite ),
							rendererWidth       = renderer.view.width,
							rendererHeight      = renderer.view.height;
							
				

						// ------------ Add filter container to the main container 
						curSprite.scale.set(1.04);
						filterStage.addChild( curSprite );

						// Enable Interactions
						filterStage.interactive = true;

						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


						// Set the filter to stage and set some default values for the animation
						filterStage.filters = [ displacementFilter ];        

						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = filterAnimRenderer.width / 2;
						displacementSprite.y = filterAnimRenderer.height / 2; 


						displacementSprite.scale.x = 1;
						displacementSprite.scale.y = 1;

						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						filterStage.addChild( displacementSprite );
					
					
					    // ------------ Add child container to the stage of each slider's canvas
					    renderer.stage.addChild( filterStage );	
					
					
						// ------------ Animation Effects
						ticker.autoStart = true;
						ticker.add( function( delta ) {
							
							
							displacementSprite.x += 12.14 * delta;
							displacementSprite.y += 42.24 * delta;

							displacementSprite.scale.x += 0.2 * delta;
							displacementSprite.scale.y += 0.2 * delta;
							
							
							renderer.render( filterStage );

						});
					
						// ------------ Add new ripple each time mouse is clicked
						renderer.view.addEventListener( 'mousedown', function(ev) {
							//console.log( ev.clientX + ', ' + ev.clientY );
							
							
						}, false);
					
					



				}		
				
				
				
				
			} else {
				slider.find( '.item canvas' ).hide();
			}
	
			
		}



    };

	
    theme.advancedSlider_SpecialEffects = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

