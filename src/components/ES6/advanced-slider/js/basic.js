
/* 
 *************************************
 * <!-- Advanced Slider (Basic) -->
 *************************************
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


import '../scss/_basic.scss';


export const ADVANCED_SLIDER = ( ( module, $, window, document ) => {
	if ( window.ADVANCED_SLIDER === null ) return false;
	
	
	

    module.ADVANCED_SLIDER               = module.ADVANCED_SLIDER || {};
    module.ADVANCED_SLIDER.version       = '0.1.6';
    module.ADVANCED_SLIDER.pageLoaded    = function() {

		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			animDelay                 = 0,
			$sliderWrapper            = $( '.uix-advanced-slider' );
			
			
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
					$items                   = $this.find( '.uix-advanced-slider__item' ),
					$first                   = $items.first(),
					nativeItemW,
					nativeItemH,
                    activated                = $this.data( 'activated' ); 
				
				
                
                if ( typeof activated === typeof undefined || activated === 0 ) {
                    

                    //Get parameter configuration from the data-* attribute of HTML
                    var dataAuto                 = $this.data( 'auto' ),
                        dataTiming               = $this.data( 'timing' ),
                        dataLoop                 = $this.data( 'loop' ),
                        dataControlsPagination   = $this.data( 'controls-pagination' ),
                        dataControlsArrows       = $this.data( 'controls-arrows' ),
                        dataDraggable            = $this.data( 'draggable' ),
                        dataDraggableCursor      = $this.data( 'draggable-cursor' ),                     
                        dataCountTotal           = $this.data( 'count-total' ),
                        dataCountCur             = $this.data( 'count-now' );

                    
                    
                    if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
                    if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
                    if ( typeof dataLoop === typeof undefined ) dataLoop = false; 
                    if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider__pagination';
                    if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-advanced-slider__arrows';
                    if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
                    if ( typeof dataDraggableCursor === typeof undefined || dataDraggableCursor == false ) dataDraggableCursor = 'move';
                    if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
                    if ( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';

                    
               
                    //Autoplay times
                    var playTimes;
                    //A function called "timer" once every second (like a digital watch).
                    $this[0].animatedSlides;



                    animDelay = UixCssProperty.getTransitionDuration( $first[0] );



                    //Initialize the first item container
                    //-------------------------------------		
                    $items.addClass( 'next' );

                    setTimeout( function() {
                        $first.addClass( 'is-active' );
                    }, animDelay );


                    if ( $first.find( 'video' ).length > 0 ) {

                        //Returns the dimensions (intrinsic height and width ) of the video
                        var video    = document.getElementById( $first.find( 'video' ).attr( 'id' ) ),
                            videoURL = $first.find( 'source:first' ).attr( 'src' );

                        video.addEventListener( 'loadedmetadata', function( e ) {
                            $this.css( 'height', this.videoHeight*($this.width()/this.videoWidth) + 'px' );	

                            nativeItemW = this.videoWidth;
                            nativeItemH = this.videoHeight;	

                            //Initialize all the items to the stage
                            addItemsToStage( $this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur );

                        }, false);	

                        video.src = videoURL;


                    } else {

                        var imgURL   = $first.find( 'img' ).attr( 'src' );

                        if ( typeof imgURL != typeof undefined ) {
                            var img = new Image();

                            img.onload = function() {
                                $this.css( 'height', $this.width()*(this.height/this.width) + 'px' );		

                                nativeItemW = this.width;
                                nativeItemH = this.height;	

                                //Initialize all the items to the stage
                                addItemsToStage( $this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur );

                            };

                            img.src = imgURL;
                        }



                    }	



                    //Autoplay Slider
                    //-------------------------------------		
                    if ( !resize ) {


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


                    }

                    
                    //Prevents front-end javascripts that are activated with AJAX to repeat loading.
                    $this.data( 'activated', 1 );
                    
                }//endif activated
  
				

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

			var items = slider.find( '.uix-advanced-slider__item' ),
				total = items.length;
			
			slider[0].animatedSlides = setInterval( function() {

				playTimes = parseFloat( items.filter( '.is-active' ).index() );
				playTimes++;
				
			
				if ( !loop ) {
					if ( playTimes < total && playTimes >= 0 ) sliderUpdates( playTimes, $sliderWrapper, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
				} else {
					if ( playTimes == total ) playTimes = 0;
					if ( playTimes < 0 ) playTimes = total-1;		
					sliderUpdates( playTimes, $sliderWrapper, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
				}
				

				
			}, timing );	
		}

		

        /*
		 * Initialize all the items to the stage
		 *
		 * @param  {Object} slider                 - Current selector of each slider.
		 * @param  {Number} nativeItemW            - Returns the intrinsic width of the image/video.
		 * @param  {Number} nativeItemH            - Returns the intrinsic height of the image/video.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
         * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
         * @param  {Boolean} draggable             - Allow drag and drop on the slider.
         * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
		 * @return {Void}
		 */
        function addItemsToStage( slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID  ) {
			
			var $this                    = slider,
				$items                   = $this.find( '.uix-advanced-slider__item' ),
				$first                   = $items.first(),
				itemsTotal               = $items.length;
	

			//If arrows does not exist on the page, it will be added by default, 
			//and the drag and drop function will be activated.
			if ( $( arrowsID ).length == 0 ) {
				$( 'body' ).prepend( '<div style="display:none;" class="uix-advanced-slider__arrows '+arrowsID.replace('#','').replace('.','')+'"><a href="#" class="uix-advanced-slider__arrows--prev"></a><a href="#" class="uix-advanced-slider__arrows--next"></a></div>' );
			}
			
			
			
			
		    //Prevent bubbling
			if ( itemsTotal == 1 ) {
				$( paginationID ).hide();
				$( arrowsID ).hide();
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

				_dotActive = ( i == 0 ) ? 'class="is-active"' : '';

				_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
			}
			_dot += '</ul>';

			if ( $( paginationID ).html() == '' ) $( paginationID ).html( _dot );

			$( paginationID ).find( 'li a' ).off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				if ( !$( this ).hasClass( 'is-active' ) ) {
					

					//Determine the direction
					var curDir = 'prev';
					if ( $( this ).attr( 'data-index' ) > parseFloat( $items.filter( '.is-active' ).index() ) ) {
						curDir = 'next';
					}
					
					
					sliderUpdates( $( this ).attr( 'data-index' ), $this, curDir, countTotalID, countCurID, paginationID, arrowsID, loop );

					//Pause the auto play event
					clearInterval( $this[0].animatedSlides );	
				}



			});

			//Next/Prev buttons
			//-------------------------------------		
			var _prev = $( arrowsID ).find( '.uix-advanced-slider__arrows--prev' ),
				_next = $( arrowsID ).find( '.uix-advanced-slider__arrows--next' );

			$( arrowsID ).find( 'a' ).attr( 'href', 'javascript:' );

			$( arrowsID ).find( 'a' ).removeClass( 'is-disabled' );
			if ( !loop ) {
				_prev.addClass( 'is-disabled' );
			}


			_prev.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				sliderUpdates( parseFloat( $items.filter( '.is-active' ).index() ) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop );

				//Pause the auto play event
				clearInterval( $this[0].animatedSlides );

			});

			_next.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				sliderUpdates( parseFloat( $items.filter( '.is-active' ).index() ) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );


				//Pause the auto play event
				clearInterval( $this[0].animatedSlides );


			});



			//Added touch method to mobile device and desktop
			//-------------------------------------	
			var $dragDropTrigger = $items;
			

			//Make the cursor a move icon when a user hovers over an item
			if ( draggable && draggableCursor != '' && draggableCursor != false ) $dragDropTrigger.css( 'cursor', draggableCursor );


			//Mouse event
			$dragDropTrigger.on( 'mousedown.ADVANCED_SLIDER touchstart.ADVANCED_SLIDER', function( e ) {
				
				//Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android

				var touches = e.originalEvent.touches;

				$( this ).addClass( 'is-dragging' );


				if ( touches && touches.length ) {	
					$( this ).data( 'origin_mouse_x', parseInt( touches[0].pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( touches[0].pageY ) );

				} else {

					if ( draggable ) {
						$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
						$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );	
					}


				}

				$dragDropTrigger.on( 'mouseup.ADVANCED_SLIDER touchmove.ADVANCED_SLIDER', function( e ) {
					

					$( this ).removeClass( 'is-dragging' );
					var touches        = e.originalEvent.touches,
						origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
						origin_mouse_y = $( this ).data( 'origin_mouse_y' );

					if ( touches && touches.length ) {

						var deltaX = origin_mouse_x - touches[0].pageX,
							deltaY = origin_mouse_y - touches[0].pageY;

						//--- left
						if ( deltaX >= 50) {
							if ( $items.filter( '.is-active' ).index() < itemsTotal - 1 ) _next.trigger( 'click' );
						}
						
						//--- right
						if ( deltaX <= -50) {
							if ( $items.filter( '.is-active' ).index() > 0 ) _prev.trigger( 'click' );
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

						
						if ( draggable ) {
							//right
							if ( e.pageX > origin_mouse_x ) {				
								if ( $items.filter( '.is-active' ).index() > 0 ) _prev.trigger( 'click' );
							}

							//left
							if ( e.pageX < origin_mouse_x ) {
								if ( $items.filter( '.is-active' ).index() < itemsTotal - 1 ) _next.trigger( 'click' );
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
		 * @param  {Number} elementIndex           - Index of current slider.
		 * @param  {Object} slider                 - Selector of the slider .
		 * @param  {String} dir                    - Switching direction indicator.
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
         * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
		 * @return {Void}
		 */
        function sliderUpdates( elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop ) {
			
			var $items                   = slider.find( '.uix-advanced-slider__item' ),
				$current                 = $items.eq( elementIndex ),
			    total                    = $items.length
			
		
		    //Prevent bubbling
			if ( total == 1 ) {
				$( paginationID ).hide();
				$( arrowsID ).hide();
				return false;
			}
	
			
			
			//Transition Interception
			//-------------------------------------
			if ( loop ) {
				if ( elementIndex == total ) elementIndex = 0;
				if ( elementIndex < 0 ) elementIndex = total-1;	
			} else {
				$( arrowsID ).find( 'a' ).removeClass( 'is-disabled' );
				if ( elementIndex == total - 1 ) $( arrowsID ).find( '.uix-advanced-slider__arrows--next' ).addClass( 'is-disabled' );
				if ( elementIndex == 0 ) $( arrowsID ).find( '.uix-advanced-slider__arrows--prev' ).addClass( 'is-disabled' );
			}

			// To determine if it is a touch screen.
			if ( Modernizr.touchevents ) {
				if ( elementIndex == total ) elementIndex = total-1;
				if ( elementIndex < 0 ) elementIndex = 0;	
				
				//Prevent bubbling
				if ( !loop ) {
					//first item
					if ( elementIndex == 0 ) {
						$( arrowsID ).find( '.uix-advanced-slider__arrows--prev' ).addClass( 'is-disabled' );
					}

					//last item
					if ( elementIndex == total - 1 ) {
						$( arrowsID ).find( '.uix-advanced-slider__arrows--next' ).addClass( 'is-disabled' );
					}	
				}

				
			}
			
			
			//Determine the direction and add class to switching direction indicator.
			var dirIndicatorClass = '';
			if ( dir == 'prev' ) dirIndicatorClass = 'prev';
			if ( dir == 'next' ) dirIndicatorClass = 'next';
			

			
			//Add transition class to Controls Pagination
			$( paginationID ).find( 'li a' ).removeClass( 'leave' );
			$( paginationID ).find( 'li a.is-active' ).removeClass( 'is-active' ).addClass( 'leave');
			$( paginationID ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'is-active').removeClass( 'leave' );
			
			//Add transition class to each item
			$items.removeClass( 'leave prev next' );
			$items.addClass( dirIndicatorClass );
			slider.find( '.uix-advanced-slider__item.is-active' ).removeClass( 'is-active' ).addClass( 'leave ' + dirIndicatorClass );
			$items.eq( elementIndex ).addClass( 'is-active ' + dirIndicatorClass ).removeClass( 'leave' );

			
			

			//Display counter
			//-------------------------------------
			$( countTotalID ).text( total );
			$( countCurID ).text( parseFloat( elementIndex ) + 1 );		
			

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
		 * @param  {Object} slider           - Current selector of each slider.
		 * @return {Void}
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

				var imgURL   = slider.find( 'img' ).attr( 'src' );
				

				if ( typeof imgURL != typeof undefined ) {
					var img = new Image();

					img.onload = function() {

						$sliderWrapper.css( 'height', slider.closest( '.uix-advanced-slider__outline' ).width()*(this.height/this.width) + 'px' );		

					};

					img.src = imgURL;	
				}
			


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

				
				var myPlayer = videojs( curVideoID, 
				   {
					  width     : dataW,
					  height    : dataH,
					  loop      : dataLoop,
					  autoplay  : dataAuto
					}, 
				   function onPlayerReady() {


						var initVideo = function( obj ) {

							//Get Video Dimensions
							var curW    = obj.videoWidth(),
								curH    = obj.videoHeight(),
								newW    = curW,
								newH    = curH;

							newW = videoWrapperW;

							//Scaled/Proportional Content 
							newH = curH*(newW/curW);


							if ( !isNaN( newW ) && !isNaN( newH ) )  {
								obj.height( newH );		
								obj.width( newW );			

								$this.css( 'height', newH );
							}



							//Show this video wrapper
							$this.css( 'visibility', 'visible' );

							//Hide loading effect
							$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();
						}

						
						/* ---------  Video initialize */
						this.on( 'loadedmetadata', function() {

							initVideo( this );

						});
					
					    /* ---------  Display the play button  */
					    if ( ! dataAuto ) $this.find( '.vjs-big-play-button' ).show();
					    $this.find( '.vjs-big-play-button' ).off( 'click' ).on( 'click', function() {
							$( this ).hide();
						});
					

				
						/* ---------  Set, tell the player it's in fullscreen  */
						if ( dataAuto ) {
							//Fix an error of Video auto play is not working in browser
							this.muted( true ); 

							//Prevent autoplay error: Uncaught (in promise) DOMException
							var promise = this.play();

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
							this.controls( false );
						}


						/* ---------  Determine if the video is auto played from mobile devices  */
						var autoPlayOK = false;

						this.on( 'timeupdate', function() {

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
							this.pause();
							this.currentTime(0);

						} else {
                            
                            //Unmute, because there is interaction, you can turn on the audio.
                            this.muted( false );
                            
                            
                            
							if ( dataAuto ) {
                                 
								this.currentTime(0);

								//Prevent autoplay error: Uncaught (in promise) DOMException
								var promise = this.play();

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
								this.on( 'ended', function () { 

									if ( dataLoop ) {
										this.currentTime(0);
										this.play();	
									} else {
										//Replay this video
										this.currentTime(0);

										$replayBtn
											.show()
											.off( 'click' )
											.on( 'click', function( e ) {
												e.preventDefault();

												this.play();
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

    module.components.pageLoaded.push( module.ADVANCED_SLIDER.pageLoaded );
	

	return class ADVANCED_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


