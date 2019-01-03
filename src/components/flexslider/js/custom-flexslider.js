
/* 
 *************************************
 * <!-- Flexslider -->
 *************************************
 */

/**
 * APP.FLEXSLIDER
 * @global
 * @requires ./examples/assets/js/min/jquery.easing.min.js
 */



APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FLEXSLIDER               = APP.FLEXSLIDER || {};
	APP.FLEXSLIDER.version       = '0.1.4';
    APP.FLEXSLIDER.documentReady = function( $ ) {

		var $window            = $( window ),
			windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight,
			flexslider         = {
						           vars: {}
					              };
		
		/*
		 * Tiny helper function to add breakpoints.
		 *
		 * @param  {Number} number           - Number of carousel items that should be visible.
		 * @return {Void}
		 */
        function getGridSize( number ) {
            return ( window.innerWidth <= 768 ) ? 1 : number;
        }

		
		/*
		 * Return an event from callback function to each slider.
		 *
		 * @param  {Object} thisSlider             - The current slider.
		 * @param  {Object} sliderWrapper          - The current slider wrapper.
		 * @param  {String} fireState              - State of fire asynchronously.
		 * @return {Number}                        - Index of current slider .
		 */
        function initslides( sliderWrapper, thisSlider, fireState ) {
			
			var prefix            = 'uix-flexslider__';
			
			if ( thisSlider.find( '.'+prefix+'item' ).length == 0 ) return false;

			var curIndex          = thisSlider.currentSlide,
				count             = thisSlider.count,
				activeClass       = prefix + 'item--active',
				prevClass         = activeClass + '-prev',
				nextClass         = activeClass + '-next',
				$items            = thisSlider.find( '.'+prefix+'item' ),
				$current          = thisSlider.slides.eq( curIndex ),
				$prev             = thisSlider.slides.eq( curIndex - 1 ),
				$next             = thisSlider.slides.eq( thisSlider.animatingTo ),
				$first            = thisSlider.slides.eq( 0 ),
				curHeight         = $current.height(),
				dataNhumbs        = thisSlider.data( 'my-nav-thumbs' ),
				dataPNThumbs      = thisSlider.data( 'my-prev-next-thumbs' ),
				dataTimeline      = thisSlider.data( 'my-nav-timeline' ),
				dataCountTotal    = thisSlider.data( 'my-count-total' ),
				dataCountCur      = thisSlider.data( 'my-count-now' ),
				dataShowItems     = thisSlider.data( 'my-multiple-items' ),
				dataShowItemsMove = thisSlider.data( 'my-multiple-items-move' ),
				dataParallax      = thisSlider.data( 'my-parallax' );
			
			
			if ( typeof dataPNThumbs === typeof undefined ) dataPNThumbs = false;
			if ( typeof dataTimeline === typeof undefined ) dataTimeline = false;
			if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = false;
			if ( typeof dataCountCur === typeof undefined ) dataCountCur = false;
			if ( typeof dataParallax === typeof undefined ) dataParallax = false;
			if ( typeof dataShowItemsMove === typeof undefined ) dataShowItemsMove = 1;
			
			
			//Total counter selector
			//Current counter selector.
			var countTotalSelector = ( dataCountTotal ) ? $( dataCountTotal ) : $( '.uix-flexslider__mycontrols__count em.count' ), 
				countCurSelector   = ( dataCountCur ) ? $( dataCountCur ) : $( '.uix-flexslider__mycontrols__count em.current' );
			
			
			
			// Fires when the slider loads the first slide.
			// Fires after each slider animation completes.
			if ( fireState == 'start' || fireState == 'after' ) {
				
				//Remove the slider loading
				//-------------------------------------
				thisSlider.removeClass( prefix+'-flexslider-loading' );
				

				
				//With Timeline
				//-------------------------------------	
				if ( dataTimeline && dataTimeline != '' ) {
					var curPerMinWidth = curIndex/count*100 + '%',
						curPerMaxWidth = (curIndex + 1)/count*100 + '%',
						curTotalWidth  = $( dataTimeline ).width();
				
					//Fires animation effect of an element width.
					$( dataTimeline ).find( '> span' ).css( {
						'width'     : curTotalWidth,
						'transition': 'all ' + parseFloat( thisSlider.vars.slideshowSpeed - thisSlider.vars.animationSpeed ) + 'ms linear'	
					} );	
					
	
				}
				

				
				
				//Display Next/Prev image thumbnail in navigation
				//-------------------------------------		
				if ( dataPNThumbs && dataPNThumbs != '' ) {
					var prevIndex  = curIndex - 1,
						nextIndex  = thisSlider.animatingTo + 1,
						pimg       = '',
						nimg       = '',
						$plink     = $( dataPNThumbs+'> a' ),
						$plinkPrev = $plink.filter( '.uix-flexslider__mycontrols--thumb__prev' ),
						$plinkNext = $plink.filter( '.uix-flexslider__mycontrols--thumb__next' );

					$plinkPrev.removeClass( 'disabled' );
					$plinkNext.removeClass( 'disabled' );

					if ( !thisSlider.vars.animationLoop ) {
						if ( prevIndex === -1 ) $plinkPrev.addClass( 'disabled' );
						if ( nextIndex === thisSlider.last + 1 ) $plinkNext.addClass( 'disabled' );	
					} else {
						if ( prevIndex === -1 ) prevIndex = thisSlider.last;
						if ( nextIndex === thisSlider.last + 1 ) nextIndex = 0;
					}

					//Get images URL
					pimg = thisSlider.slides.eq( prevIndex ).find( 'img' ).attr( 'src' );
					nimg = thisSlider.slides.eq( nextIndex ).find( 'img' ).attr( 'src' );


					if ( $( dataPNThumbs ).length > 0 ) {

						$plink.attr( 'href', 'javascript:void(0);' );


						if ( typeof pimg != typeof undefined ) $plinkPrev.attr( 'data-goto', prevIndex ).find( '> span' ).html('<img src="'+pimg+'" alt="">');
						if ( typeof nimg != typeof undefined ) $plinkNext.attr( 'data-goto', nextIndex ).find( '> span' ).html('<img src="'+nimg+'" alt="">');		


						$plink.on( 'click', function( e ) {
							e.preventDefault();

							thisSlider.flexslider( parseInt( $( this ).attr( 'data-goto' ) ) );
						});
					}	
				}

				
		
				
				// Fires local videos asynchronously with slider switch.
				//-------------------------------------
				videoEmbedInit( $items, false );
				videoEmbedInit( $current, true );

				//Auto-restart player if paused after action
				//-------------------------------------
				if ( thisSlider.vars.slideshow ) {
					if ( !thisSlider.playing ) {
						thisSlider.play();
					}	
				}

				//Prevent to <a> of page transitions
				//-------------------------------------
				$( 'a' ).each( function() {
					var attr = $( this ).attr( 'href' );

					if ( typeof attr === typeof undefined ) {
						$( this ).attr( 'href', '#' );
					}
				});


				//Thumbnail ControlNav Pattern
				//-------------------------------------
				if ( dataNhumbs && dataNhumbs != '' ) {
					$( '.uix-flexslider__thumbs'+dataNhumbs+' > ul > li' ).removeClass( 'active' );
					$( '.uix-flexslider__thumbs'+dataNhumbs+' > ul > li' ).eq( curIndex ).addClass( 'active' );			
				}


				//Initialize items background of the slider
				//-------------------------------------
				thisSlider.find( '[data-slider-bg]' ).each( function()  {
					$( this ).css( 'background-image', 'url('+$( this ).data( 'slider-bg' )+')' );
				});	


				//Enable "prettyPhoto" plugin
				//-------------------------------------
				if( $.isFunction( $.fn.lightbox ) ) {
					thisSlider.slides.find( "a[rel^='theme-slider-prettyPhoto']" ).lightbox();
				}


				//Return an event from callback function to each slider 
				//with dynamic min/max ranges.
				//-------------------------------------
				
				
				if( 
					typeof dataShowItems != typeof undefined && 
					dataShowItems != '' && 
					dataShowItems != 0
				) {

					
					if ( dataShowItemsMove == 1 ) {
						
						$items.removeClass( activeClass );
						$items.removeClass( prevClass );
						$items.removeClass( nextClass );

						if ( windowWidth <= 768 ) {

							//Focus slider
							$items.eq( parseFloat( curIndex ) ).addClass( activeClass );	

						} else {
							//Focus slider
							$items.eq( parseFloat( curIndex+1 ) ).addClass( activeClass );

							//Previous slider
							$items.eq( parseFloat( curIndex ) ).addClass( prevClass );

							//Next slider
							$items.eq( parseFloat( curIndex+2 ) ).addClass( nextClass );	
						}
						
					} else {
						$items.addClass( activeClass );
					}


					
				}


				//Display counter
				//-------------------------------------
				if ( sliderWrapper.find( '.uix-flexslider__mycontrols__count' ).length == 0 ) {
					if ( sliderWrapper.closest( 'section' ).find( '.uix-flexslider__mycontrols__count' ).length > 0 ) {
						var showCountTotal = count,
							showCountCur   = curIndex + 1;
						
						if ( showCountTotal < 10 ) showCountTotal = '0' + showCountTotal;
						if ( showCountCur < 10 ) showCountCur = '0' + showCountCur;
						
						countTotalSelector.text( showCountTotal );
						countCurSelector.text( showCountCur );		
					}
				}

				
				
			}
			
			// Fires asynchronously with each slider animation.
			if ( fireState == 'before' ) {
				
				//Common images style
				//-------------------------------------	
				$next.find( 'img' ).addClass( 'active' );
				$current.find( 'img' ).removeClass( 'active' );
				$prev.find( 'img' ).removeClass( 'active' );
				$first.find( 'img' ).removeClass( 'active' );

				//With Timeline
				//-------------------------------------	
				if ( dataTimeline && dataTimeline != '' ) {
			
					//Fires animation effect of an element width.
					$( dataTimeline ).find( '> span' ).css( {
						'width'     : 0,
						'transition': 'all 100ms linear'	
					} );
					

	
				}	
				
				
			}
			
			
			// Fires when the slider reaches the last slide (asynchronous).
			if ( fireState == 'end' ) {
				
				
				//Common images style
				//-------------------------------------	
				$first.find( 'img' ).addClass( 'active' );
		
				
			}
			
			
			// Fires asynchronously with each slider animation.
			// Fires when the slider loads the first slide.
			if ( fireState == 'before' || fireState == 'start' ) {
				
				//Return an event from callback function to each slider to make parallax effect.
				//-------------------------------------
				if ( dataParallax ) {
				
					
					var dir = 'uix-flexslider__item--left';

					$.each( thisSlider.slides, function( i, item ) {
						var el = $( item );
						el.removeClass( 'uix-flexslider__item--right uix-flexslider__item--left' );
						if (i >= thisSlider.animatingTo && dir !== 'uix-flexslider__item--right') {
							dir = 'uix-flexslider__item--right';
						} else {
							el.addClass( dir );
						}
					});	
				}	
			}
			
			
			
			return curIndex;
			
        }
		
	

	
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {Object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {Boolean} play            - Forced to trigger pause or play events.
		 * @return {Void}
		 */
		function videoEmbedInit( wrapper, play ) {
			wrapper.find( '.uix-video__slider' ).each( function()  {
				var $this          = $( this ),
					videoWrapperW  = $this.closest( '[data-embed-video-wrapper]' ).width(),
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
		

		
		/*
		 * Make slider image draggable 
		 *
		 * @param  {Object} $obj             - The current FlexSlider setup using custom selector.
		 * @return {Void}
		 */
        function slidesExDraggable( $obj ) {
			
			var $dragDropTrigger = $obj.find( '.uix-flexslider__inner > div.uix-flexslider__item' );
			
			//Make the cursor a move icon when a user hovers over an item
			$dragDropTrigger.css( 'cursor', 'move' );
			

			//Mouse event
			$dragDropTrigger.on( 'mousedown', function( e ) {
				e.preventDefault();
				
				if ( $obj.data( 'flexslider' ).animating ) {
					return;
				}

				$( this ).addClass( 'dragging' );
				$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
				$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );
				
			} ).on( 'mouseup', function( e ) {
				e.preventDefault();
				
				if ( $obj.data('flexslider').animating ) {
					return;
				}

				$( this ).removeClass( 'dragging' );
				var origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
					origin_mouse_y = $( this ).data( 'origin_mouse_y' );
				
				
				if ( 'horizontal' === $obj.data( 'flexslider' ).vars.direction ) {
					
					//right
					if ( e.pageX > origin_mouse_x ) {
						$obj.flexslider( 'prev' );
					}
					
					//left
					if ( e.pageX < origin_mouse_x ) {
						$obj.flexslider( 'next' );
					}
					
				} else {

					//down
					if ( e.pageY > origin_mouse_y ) {
						$obj.flexslider( 'prev' );
					}
					
					//up
					if ( e.pageY < origin_mouse_y ) {
						$obj.flexslider( 'next' );
					}
					
				}
			} );
			
			
        }

		
		/*
		 *  Scroll The Slider With Mousewheel
		 *
		 * @param  {Object} $obj            - The current FlexSlider setup using custom selector.
		 * @return {Void}
		 */
        function slidesExMousewheel( $obj ) {

			var timer    = null,
				wheeling = false;

			$obj.on( 'wheel', function( e ) {
				var deltaY = e.originalEvent.deltaY;

				if ( timer ) {
					clearTimeout( timer );
				}

				if ( !wheeling ) {
					if ( deltaY < 0 ) {
						//up
						$obj.flexslider( 'prev' );
					} else {
						//down
						$obj.flexslider( 'next' );
						
					}
				}

				wheeling = true;

				timer = setTimeout(function() {
					wheeling = false;
				}, 60 );

			});
			
        }	
		

		
		
		/*
		 * Slider With Thumbnail ControlNav Pattern
		 *
		 * @param  {Object} slider           - The current slider.
		 * @param  {String} navThumbClass    - Class name of thumbnail controlNav.
		 * @return {Void}
		 */
        function initslidesWithNavThumb( slider, navThumbClass ) {

				$( '.uix-flexslider__thumbs'+navThumbClass+' > ul > li' ).on( 'click', function() {

					$( '.uix-flexslider__thumbs'+navThumbClass+' > ul > li' ).removeClass( 'active' );
					$( this ).addClass( 'active' );
					slider.flexslider( $( this ).index() );

				});	
			
        }
			
		
		
		/*
		* Method that updates children slides
		* fortunately, since all the children are not animating,
		* they will only update if the main flexslider updates. 
		 *
		 * @param  {Number} slideNumber          - The current slider index.
		 * @param  {Object} childrenSlidesObj    - Target slider.
		 * @param  {Boolean} loop                - Gives the slider a seamless infinite loop.
		 * @param  {Number} speed                - Set the speed of animations, in milliseconds.
		 * @param  {Number} timing               - Set the speed of the slideshow cycling, in milliseconds.
		 * @return {Void}
		 */
		function updateChildrenSlides( slideNumber, childrenSlidesObj, loop, speed, timing ) {
			
			/** 
			* Create the children flexsliders. Must be array of jquery objects with the
			* flexslider data. Easiest way is to place selector group in a var.
			*/
			var childrenSlides = $( childrenSlidesObj ).flexslider({
				slideshow         : false, // Remove the animations
				controlNav        : false, // Remove the controls
				animationLoop     : loop,
				animationSpeed    : speed,
				slideshowSpeed    : timing
			}); 

			
			// Iterate through the children slides but not past the max
			for ( var i=0; i < childrenSlides.length; i++ ) {
				// Run the animate method on the child slide
				$( childrenSlides[i] ).data( 'flexslider' ).flexAnimate( slideNumber );
			}   
		}
		

		/*! 
		 ---------------------------
         Initialize slideshow
		 ---------------------------
		 */
		var $sliderDefault = $( '.uix-flexslider' );
		$sliderDefault.each( function()  {
			var $this             = $( this ),
				dataSpeed         = $this.data( 'speed' ),
				dataDrag          = $this.data( 'draggable' ),
				dataWheel         = $this.data( 'wheel' ),
				dataTiming        = $this.data( 'timing' ),
				dataLoop          = $this.data( 'loop' ),
				dataPrev          = $this.data( 'prev' ),
				dataNext          = $this.data( 'next' ),
				dataAnim          = $this.data( 'animation' ),
				dataPaging        = $this.data( 'paging' ),
				dataArrows        = $this.data( 'arrows' ),
				dataAuto          = $this.data( 'auto' ),
				dataNhumbs        = $this.data( 'my-nav-thumbs' ),
				dataPNThumbs      = $this.data( 'my-prev-next-thumbs' ),
				dataTimeline      = $this.data( 'my-nav-timeline' ),
				dataCountTotal    = $this.data( 'my-count-total' ),
				dataCountCur      = $this.data( 'my-count-now' ),
				customConID       = $this.data( 'my-controls' ),
				dataShowItems     = $this.data( 'my-multiple-items' ),
				dataShowItemsMove = $this.data( 'my-multiple-items-move' ),
				dataParallax      = $this.data( 'my-parallax' ),
				dataSync          = $this.data( 'my-sync' );
			
			
			//Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this.find( '.uix-flexslider__item' ), false );
			
			
			// Custom Controls
			var myControlsContainer, myCustomDirectionNav;
			if ( typeof customConID === typeof undefined || customConID == '' || customConID == false ) {
				myControlsContainer  = '';
				myCustomDirectionNav = '';
			} else {
				myControlsContainer  = $( '.uix-flexslider__mycontrols'+customConID+' .uix-flexslider__mycontrols__control-paging' );
				myCustomDirectionNav = $( '.uix-flexslider__mycontrols'+customConID+' a' );	
			}

			
			// If there is no data-xxx, save current source to it
			if ( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if ( typeof dataLoop === typeof undefined ) dataLoop = true;
			if ( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if ( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if ( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if ( typeof dataPaging === typeof undefined ) dataPaging = true;
			if ( typeof dataArrows === typeof undefined ) dataArrows = true;
			if ( typeof dataAuto === typeof undefined ) dataAuto = true;
			if ( typeof dataDrag === typeof undefined ) dataDrag = false;
			if ( typeof dataWheel === typeof undefined ) dataWheel = false;
			if ( typeof dataNhumbs === typeof undefined ) dataNhumbs = false;
			if ( typeof dataPNThumbs === typeof undefined ) dataPNThumbs = false;
			if ( typeof dataTimeline === typeof undefined ) dataTimeline = false;
			if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = false;
			if ( typeof dataCountCur === typeof undefined ) dataCountCur = false;
			if ( typeof dataParallax === typeof undefined ) dataParallax = false;
		    if ( typeof dataShowItemsMove === typeof undefined ) dataShowItemsMove = 1;
			
			

			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );

			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			

			//With Thumbnail ControlNav Pattern
			if ( dataNhumbs ) {
				initslidesWithNavThumb( $this, dataNhumbs );
				//Prevent index error
				dataLoop = false;
			}
			
		
			
			//Show number of items
			var my_itemWidth = 0, 
				my_move      = dataShowItemsMove,
				my_minItems  = 0,
				my_maxItems  = 0;
			
			if ( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {
				
			    my_itemWidth = 1;
				my_minItems  = getGridSize( dataShowItems );
				my_maxItems  = getGridSize( dataShowItems );
				
			} 
			
			
			// Determine if this slider is added with a synchronization event
			$( '[data-my-sync]' ).each( function()  {
				var curSync      = $( this ).data( 'my-sync' ),
					thisSliderID = $this.attr( 'id' );
				
				
				if ( typeof curSync != typeof undefined ) {
					curSync = curSync.toString().replace( '#', '' ).replace( '.', '' );
				}
				
				
				if ( typeof thisSliderID != typeof undefined && thisSliderID == curSync ) {
					dataAuto = false; //Set it not to scroll automatically
					dataPaging = false;
					
					// break out of jQuery each Loop
					return false; 
				}


			});


			
			$this.flexslider({
				namespace	      : 'uix-flexslider__',
				animation         : dataAnim,
				selector          : '.uix-flexslider__inner > div.uix-flexslider__item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
			    itemWidth         : my_itemWidth,
				move              : my_move, // Number of carousel items that should move on animation.
			    minItems          : my_minItems, // use function to pull in initial value
			    maxItems          : my_maxItems, // use function to pull in initial value
				controlsContainer : myControlsContainer,
				customDirectionNav: myCustomDirectionNav,
				
				
				//Fires when the slider loads the first slide.
				start: function( slider ) {
					
					//set slider instance to flexslider variable
					if ( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {
					    flexslider = slider;		
					}
					
					initslides( $this, slider, 'start' );

				},
				
				//Fires asynchronously with each slider animation.
				before: function( slider ) {
					initslides( $this, slider, 'before' );
					
					// Call the updateChildrenSlides which itterates through all children slides 
					if ( typeof dataSync != typeof undefined && dataSync != '' && dataSync != 0 ) {
						updateChildrenSlides( slider.animatingTo, dataSync, dataLoop, dataSpeed, dataTiming );
						
					}
					

				},
				
				//Fires after each slider animation completes.
				after: function( slider ) {
					initslides( $this, slider, 'after' );

					
				},
				
				//Fires when the slider reaches the last slide (asynchronous).
				end: function( slider ) {
					initslides( $this, slider, 'end' );
				}
			});
			
		
			
		});
		

		
		/*! 
		 ---------------------------
         Check grid size on resize event
		 ---------------------------
		 */
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				$sliderDefault.each( function() {
					
					if ( $( this ).length > 0 ) {

						// check grid size on resize event
						var dataShowItems = $( this ).data( 'my-multiple-items' );
		
						
						if ( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {

							var gridSize = getGridSize( dataShowItems );
							flexslider.vars.minItems = gridSize;
							flexslider.vars.maxItems = gridSize;
							
						}
						
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});
				
			
				
			}
		});
		
    };

    APP.components.documentReady.push( APP.FLEXSLIDER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




