
/* 
 *************************************
 * <!-- Advanced Slider (Basic) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.ADVANCED_SLIDER               = APP.ADVANCED_SLIDER || {};
	APP.ADVANCED_SLIDER.version       = '0.0.8';
    APP.ADVANCED_SLIDER.pageLoaded    = function() {

		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			animDuration              = 600,
			$sliderWrapper            = $( '.uix-advanced-slider' ),
			tempID                    = 'video-' + UIX_GUID.newGuid(),
			
			//Autoplay global variables
			timer                     = null,
			playTimes;
		
		
		sliderInit( false );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				sliderInit( true );
				
			}
		});
		
		
		/*
		 * Initialize slideshow
		 *
		 * @param  {boolean} resize            - Determine whether the window size changes.
		 * @return {void}                      - The constructor.
		 */
        function sliderInit( resize ) {
	
			$sliderWrapper.each( function()  {

				var $this                    = $( this ),
					$items                   = $this.find( '.uix-advanced-slider__item' ),
					$first                   = $items.first(),
					nativeItemW,
					nativeItemH;
				
				

				//Initialize the first item container
				//-------------------------------------		
				$items.addClass( 'next' );
				
				setTimeout( function() {
					$first.addClass( 'active' );
				}, animDuration );
				

				if ( $first.find( 'video' ).length > 0 ) {

					//Returns the dimensions (intrinsic height and width ) of the video
					var video    = document.getElementById( $first.find( 'video' ).attr( 'id' ) ),
						videoURL = $first.find( 'source:first' ).attr( 'src' );

					video.addEventListener( 'loadedmetadata', function( e ) {
						$this.css( 'height', this.videoHeight*($this.width()/this.videoWidth) + 'px' );	

						nativeItemW = this.videoWidth;
						nativeItemH = this.videoHeight;	

						//Initialize all the items to the stage
						addItemsToStage( $this, $sliderWrapper, nativeItemW, nativeItemH );

					}, false);	

					video.src = videoURL;


				} else {

					var imgURL   = $first.find( 'img' ).attr( 'src' ),
						img      = new Image();

					img.onload = function() {
						$this.css( 'height', $this.width()*(this.height/this.width) + 'px' );		

						nativeItemW = this.width;
						nativeItemH = this.height;	

						//Initialize all the items to the stage
						addItemsToStage( $this, $sliderWrapper, nativeItemW, nativeItemH );

					};

					img.src = imgURL;

				}	
				
				

				//Autoplay Slider
				//-------------------------------------		
				if ( !resize ) {
					
					var dataAuto                 = $this.data( 'auto' ),
						dataTiming               = $this.data( 'timing' ),
						dataLoop                 = $this.data( 'loop' );

					if( typeof dataAuto === typeof undefined ) dataAuto = false;	
					if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
					if( typeof dataLoop === typeof undefined ) dataLoop = false;


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
		 * @param  {number} timing           - Autoplay interval.
		 * @param  {object} items            - Each item in current slider.
		 * @param  {boolean} loop            - Determine whether to loop through each item.
		 * @return {void}                    - The constructor.
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
					sliderUpdates( playTimes, $sliderWrapper, 'next' );
				}
				

				
			}, timing );	
		}

		
		

        /*
		 * Initialize all the items to the stage
		 *
		 * @param  {object} slider           - Current selector of each slider.
		 * @param  {object} sliderWrapper    - Wrapper of the slider.
		 * @param  {number} nativeItemW      - Returns the intrinsic width of the image/video.
		 * @param  {number} nativeItemH      - Returns the intrinsic height of the image/video.
		 * @return {void}                    - The constructor.
		 */
        function addItemsToStage( slider, sliderWrapper, nativeItemW, nativeItemH ) {
			
			var $this                    = slider,
				$items                   = $this.find( '.uix-advanced-slider__item' ),
				$first                   = $items.first(),
				itemsTotal               = $items.length,
				dataControlsPagination   = $this.data( 'controls-pagination' ),
				dataControlsArrows       = $this.data( 'controls-arrows' ),
				dataLoop                 = $this.data( 'loop' ),
				dataDraggable            = $this.data( 'draggable' ),
				dataDraggableCursor      = $this.data( 'draggable-cursor' );
	
			
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider__arrows';
			if( typeof dataLoop === typeof undefined ) dataLoop = false;
			if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
			if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
				

			//If arrows does not exist on the page, it will be added by default, 
			//and the drag and drop function will be activated.
			if ( $( dataControlsArrows ).length == 0 ) {
				$( 'body' ).prepend( '<div style="display:none;" class="uix-advanced-slider__arrows '+dataControlsArrows.replace('#','').replace('.','')+'"><a href="#" class="uix-advanced-slider__arrows--prev"></a><a href="#" class="uix-advanced-slider__arrows--next"></a></div>' );
			}
			
			
			
			
		    //Prevent bubbling
			if ( itemsTotal == 1 ) {
				$( dataControlsPagination ).hide();
				$( dataControlsArrows ).hide();
			}

			

			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			normalSliderVideoInit( $items, false );	




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
					
					
					sliderUpdates( $( this ).attr( 'data-index' ), sliderWrapper, curDir );

					//Pause the auto play event
					clearInterval( timer );	
				}



			});

			//Next/Prev buttons
			//-------------------------------------		
			var _prev = $( dataControlsArrows ).find( '.uix-advanced-slider__arrows--prev' ),
				_next = $( dataControlsArrows ).find( '.uix-advanced-slider__arrows--next' );

			$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

			$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
			if ( !dataLoop ) {
				_prev.addClass( 'disabled' );
			}



			_prev.on( 'click', function( e ) {
				e.preventDefault();

				sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, sliderWrapper, 'prev' );

				//Pause the auto play event
				clearInterval( timer );

			});

			_next.on( 'click', function( e ) {
				e.preventDefault();

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
			$dragDropTrigger.on( 'mousedown.ADVANCED_SLIDER touchstart.ADVANCED_SLIDER', function( e ) {
				
				//Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android

				var touches = e.originalEvent.touches;

				$( this ).addClass( 'dragging' );
				$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
				$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );


				if ( touches && touches.length ) {	
					$( this ).data( 'origin_mouse_x', parseInt( touches[0].pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( touches[0].pageY ) );

				} else {

					if ( dataDraggable ) {
						$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
						$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );	
					}


				}

				$dragDropTrigger.on( 'mouseup.ADVANCED_SLIDER touchmove.ADVANCED_SLIDER', function( e ) {
					

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
							$dragDropTrigger.off( 'touchmove.ADVANCED_SLIDER' );
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

							$dragDropTrigger.off( 'mouseup.ADVANCED_SLIDER' );

						}	



					}



				} );//end: mouseup.ADVANCED_SLIDER touchmove.ADVANCED_SLIDER




			} );// end: mousedown.ADVANCED_SLIDER touchstart.ADVANCED_SLIDER
			
		}
		
		
	
		
		/*
		 * Transition Between Slides
		 *
		 * @param  {number} elementIndex     - Index of current slider.
		 * @param  {object} slider           - Selector of the slider .
		 * @param  {string} dir              - Switching direction indicator.
		 * @return {void}                    - The constructor.
		 */
        function sliderUpdates( elementIndex, slider, dir ) {
			
			var $items                   = slider.find( '.uix-advanced-slider__item' ),
				$current                 = $items.eq( elementIndex ),
			    total                    = $items.length,
				dataCountTotal           = slider.data( 'count-total' ),
				dataCountCur             = slider.data( 'count-now' ),
				dataControlsPagination   = slider.data( 'controls-pagination' ),
				dataControlsArrows       = slider.data( 'controls-arrows' ),	
				dataLoop                 = slider.data( 'loop' );
			

			if( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
			if( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider__arrows';
			if( typeof dataLoop === typeof undefined ) dataLoop = false;
					
		
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
				if ( elementIndex == total - 1 ) $( dataControlsArrows ).find( '.uix-advanced-slider__arrows--next' ).addClass( 'disabled' );
				if ( elementIndex == 0 ) $( dataControlsArrows ).find( '.uix-advanced-slider__arrows--prev' ).addClass( 'disabled' );
			}

			// To determine if it is a touch screen.
			if ( Modernizr.touchevents ) {
				if ( elementIndex == total ) elementIndex = total-1;
				if ( elementIndex < 0 ) elementIndex = 0;	
				
				//Prevent bubbling
				if ( !dataLoop ) {
					//first item
					if ( elementIndex == 0 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider__arrows--prev' ).addClass( 'disabled' );
					}

					//last item
					if ( elementIndex == total - 1 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider__arrows--next' ).addClass( 'disabled' );
					}	
				}

				
			}
			
			
			//Determine the direction and add class to switching direction indicator.
			var dirIndicatorClass = '';
			if ( dir == 'prev' ) dirIndicatorClass = 'prev';
			if ( dir == 'next' ) dirIndicatorClass = 'next';
			

			
			//Add transition class to Controls Pagination
			$( dataControlsPagination ).find( 'li a' ).removeClass( 'leave' );
			$( dataControlsPagination ).find( 'li a.active' ).removeClass( 'active' ).addClass( 'leave');
			$( dataControlsPagination ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'active').removeClass( 'leave' );
			
			//Add transition class to each item
			$items.removeClass( 'leave prev next' );
			$items.addClass( dirIndicatorClass );
			slider.find( '.uix-advanced-slider__item.active' ).removeClass( 'active' ).addClass( 'leave ' + dirIndicatorClass );
			$items.eq( elementIndex ).addClass( 'active ' + dirIndicatorClass ).removeClass( 'leave' );

			
			

			//Display counter
			//-------------------------------------
			$( dataCountTotal ).text( total );
			$( dataCountCur ).text( parseFloat( elementIndex ) + 1 );		
			

			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			normalSliderVideoInit( $items, false );
			normalSliderVideoInit( $current, true );	
			
			//Reset the default height of item
			//-------------------------------------	
			itemDefaultInit( $current );		
			
		
			
		}
		
		/*
		 * Initialize the default height of item
		 *
		 * @param  {object} slider           - Current selector of each slider.
		 * @return {void}                    - The constructor.
		 */
        function itemDefaultInit( slider ) {
			
			if ( slider.find( 'video' ).length > 0 ) {

				//Returns the dimensions (intrinsic height and width ) of the video
				var video    = document.getElementById( slider.find( 'video' ).attr( 'id' ) ),
					videoURL = slider.find( 'source:first' ).attr( 'src' );

				video.addEventListener( 'loadedmetadata', function( e ) {

					$sliderWrapper.css( 'height', this.videoHeight*(slider.closest( '.uix-advanced-slider__outline' ).width()/this.videoWidth) + 'px' );	

				}, false);	

				video.src = videoURL;


			} else {

				var imgURL   = slider.find( 'img' ).attr( 'src' ),
					img      = new Image();
				

				img.onload = function() {

					$sliderWrapper.css( 'height', slider.closest( '.uix-advanced-slider__outline' ).width()*(this.height/this.width) + 'px' );		

				};

				img.src = imgURL;

			}	
			


		}
		
		
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {boolean} play            - Forced to trigger pause or play events.
		 * @return {void}                    - The constructor.
		 */
		function normalSliderVideoInit( wrapper, play ) {
			wrapper.find( '.uix-video__slider' ).each( function()  {
				var $this          = $( this ),
					videoWrapperW  = $this.closest( '.uix-advanced-slider__outline' ).width(),
					videoWrapperH  = $this.closest( '.uix-advanced-slider__outline' ).height(),
					curVideoID     = tempID,
					coverPlayBtnID = 'videocover-' + curVideoID,
					dataControls   = $this.data( 'embed-video-controls' ),
					dataAuto       = $this.data( 'embed-video-autoplay' ),
					dataLoop       = $this.data( 'embed-video-loop' ),
					dataW          = $this.data( 'embed-video-width' ),
					dataH          = $this.data( 'embed-video-height' ),
					$replayBtn     = $( '#'+curVideoID+'-replay-btn' );
				
				//Push a new ID to video
				//Solve the problem that ajax asynchronous loading does not play
				$this.find( '.video-js' ).attr( 'id', tempID );

				
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

				

				//Display cover and play buttons when some mobile device browsers cannot automatically play video
				if ( $( '#' + coverPlayBtnID ).length == 0 ) {
					$( '<div id="'+coverPlayBtnID+'" class="uix-video__cover"><span class="uix-video__cover-placeholder" style="background-image:url('+$this.find( 'video' ).attr( 'poster' )+')"></span><span class="cover-play"></span></div>' ).insertBefore( $this );


					var btnEv = ( Modernizr.touchevents ) ? 'touchstart' : 'click';
					$( '#' + coverPlayBtnID + ' .cover-play' ).on( btnEv, function( e ) {
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
		
    
		
    };

    APP.components.pageLoaded.push( APP.ADVANCED_SLIDER.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );



