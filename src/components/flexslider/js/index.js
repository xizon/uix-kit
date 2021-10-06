
/* 
 *************************************
 * <!-- Flexslider (Third-party plugin) -->
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


import '@uixkit/core/flexslider/js/third-party/jquery.flexslider.js';


import '../scss/_style.scss';


export const FLEXSLIDER = ( ( module, $, window, document ) => {
	if ( window.FLEXSLIDER === null ) return false;
	
	
	
    module.FLEXSLIDER               = module.FLEXSLIDER || {};
    module.FLEXSLIDER.version       = '0.2.0';
    module.FLEXSLIDER.documentReady = function( $ ) {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
		

        
		let	flexslider         = {
						           vars: {}
					              };
		
		const pluginNamespace = 'uix-flexslider__';
		
		
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
		 * @param  {Element} thisSlider             - The current slider.
		 * @param  {Element} sliderWrapper          - The current slider wrapper.
		 * @param  {String} fireState              - State of fire asynchronously.
		 * @return {Number}                        - Index of current slider .
		 */
        function initslides( sliderWrapper, thisSlider, fireState ) {
			
	
			if ( thisSlider.find( '.'+pluginNamespace+'item' ).length == 0 ) return false;

			let curIndex          = thisSlider.currentSlide,
				count             = thisSlider.count,
				activeClass       = pluginNamespace + 'item--active',
				prevClass         = activeClass + '-prev',
				nextClass         = activeClass + '-next',
				$items            = thisSlider.find( '.'+pluginNamespace+'item' ),
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
				dataParallax      = thisSlider.data( 'my-parallax' ),
				dataCustomConID   = thisSlider.data( 'my-controls' );
			
			
			if ( typeof dataPNThumbs === typeof undefined ) dataPNThumbs = false;
			if ( typeof dataTimeline === typeof undefined ) dataTimeline = false;
			if ( typeof dataCountTotal === typeof undefined ) dataCountTotal = false;
			if ( typeof dataCountCur === typeof undefined ) dataCountCur = false;
			if ( typeof dataParallax === typeof undefined ) dataParallax = false;
			if ( typeof dataShowItemsMove === typeof undefined ) dataShowItemsMove = 1;
			
			
			
			//Add disabled class to custom navigation 
			if ( typeof dataCustomConID != typeof undefined && dataCustomConID != '' && dataCustomConID != false ) {
				const myCustomDirectionNav = $( '.uix-flexslider__mycontrols'+dataCustomConID+' a' );	
				const disabledClass = pluginNamespace + 'disabled';
				if (thisSlider.pagingCount === 1) {
					myCustomDirectionNav.addClass(disabledClass).attr( 'tabindex', '-1' );
				} else if (!thisSlider.vars.animationLoop) {
					if ( thisSlider.animatingTo === 0 ) {
						myCustomDirectionNav.removeClass(disabledClass);
						myCustomDirectionNav.first().addClass(disabledClass).attr( 'tabindex', '-1' );
					} else if ( thisSlider.animatingTo === thisSlider.last ) {
						myCustomDirectionNav.removeClass(disabledClass);
						myCustomDirectionNav.last().addClass(disabledClass).attr( 'tabindex', '-1' );
					} else {
						myCustomDirectionNav.removeClass(disabledClass).removeAttr( 'tabindex' );
					}
				} else {
					myCustomDirectionNav.removeClass(disabledClass).removeAttr( 'tabindex' );
				}

			}
			

			
			//Total counter selector
			//Current counter selector.
			const countTotalSelector = ( dataCountTotal ) ? $( dataCountTotal ) : $( '.uix-flexslider__mycontrols__count em.count' ), 
				  countCurSelector   = ( dataCountCur ) ? $( dataCountCur ) : $( '.uix-flexslider__mycontrols__count em.current' );
			
			
			
			// Fires when the slider loads the first slide.
			// Fires after each slider animation completes.
			if ( fireState == 'start' || fireState == 'after' ) {
				
				//Remove the slider loading
				//-------------------------------------
				thisSlider.removeClass( pluginNamespace+'-flexslider-loading' );
				

				
				//With Timeline
				//-------------------------------------	
				if ( dataTimeline && dataTimeline != '' ) {
					const curPerMinWidth = curIndex/count*100 + '%',
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
					let prevIndex  = curIndex - 1,
						nextIndex  = thisSlider.animatingTo + 1,
						pimg       = '',
						nimg       = '',
						$plink     = $( dataPNThumbs+'> a' ),
						$plinkPrev = $plink.filter( '.uix-flexslider__mycontrols--thumb__prev' ),
						$plinkNext = $plink.filter( '.uix-flexslider__mycontrols--thumb__next' );

					$plinkPrev.removeClass( 'is-disabled' );
					$plinkNext.removeClass( 'is-disabled' );

					if ( !thisSlider.vars.animationLoop ) {
						if ( prevIndex === -1 ) $plinkPrev.addClass( 'is-disabled' );
						if ( nextIndex === thisSlider.last + 1 ) $plinkNext.addClass( 'is-disabled' );	
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


						$plink.off( 'click' ).on( 'click', function( e ) {
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
					const attr = $( this ).attr( 'href' );

					if ( typeof attr === typeof undefined ) {
						$( this ).attr( 'href', '#' );
					}
				});


				//Thumbnail ControlNav Pattern
				//-------------------------------------
				if ( dataNhumbs && dataNhumbs != '' ) {
					$( '.uix-flexslider__thumbs'+dataNhumbs+' > ul > li' ).removeClass( 'is-active' );
					$( '.uix-flexslider__thumbs'+dataNhumbs+' > ul > li' ).eq( curIndex ).addClass( 'is-active' );			
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
						let showCountTotal = count,
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
				$next.find( 'img' ).addClass( 'is-active' );
				$current.find( 'img' ).removeClass( 'is-active' );
				$prev.find( 'img' ).removeClass( 'is-active' );
				$first.find( 'img' ).removeClass( 'is-active' );

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
				$first.find( 'img' ).addClass( 'is-active' );
		
				
			}
			
			
			// Fires asynchronously with each slider animation.
			// Fires when the slider loads the first slide.
			if ( fireState == 'before' || fireState == 'start' ) {
				
				//Return an event from callback function to each slider to make parallax effect.
				//-------------------------------------
				if ( dataParallax ) {
				
					
					let dir = 'uix-flexslider__item--left';

					$.each( thisSlider.slides, function( i, item ) {
						const el = $( item );
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
		 * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {Boolean} play            - Forced to trigger pause or play events.
		 * @return {Void}
		 */
		function videoEmbedInit( wrapper, play ) {
			wrapper.find( '.uix-video__slider' ).each( function()  {
				const $this          = $( this );
                
				const videoWrapperW  = $this.closest( '[data-embed-video-wrapper]' ).width(),
					  curVideoID     = $this.find( 'video' ).attr( 'id' ) + '-slider-videopush',
					  coverPlayBtnID = 'videocover-' + curVideoID,
                      $replayBtn     = $( '#'+curVideoID+'-replay-btn' );
                
				let	dataControls   = $this.data( 'embed-video-controls' ),
					dataAuto       = $this.data( 'embed-video-autoplay' ),
					dataLoop       = $this.data( 'embed-video-loop' ),
					dataW          = $this.data( 'embed-video-width' ),
					dataH          = $this.data( 'embed-video-height' );

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


					const btnEv = ( Modernizr.touchevents ) ? 'touchstart' : 'click';
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

				
				const myPlayer = videojs( curVideoID, 
				   {
					  width     : dataW,
					  height    : dataH,
					  loop      : dataLoop,
					  autoplay  : dataAuto
					}, 
				   function onPlayerReady() {


						const initVideo = function( obj ) {

							//Get Video Dimensions
							let curW    = obj.videoWidth(),
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
							//this.muted( true ); 



							//Prevent autoplay error: Uncaught (in promise) DOMException
							const promise = this.play();

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
						let autoPlayOK = false;

						this.on( 'timeupdate', function() {

							let duration = this.duration();
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
							if ( dataAuto ) {

								this.currentTime(0);


								//Prevent autoplay error: Uncaught (in promise) DOMException
								const promise = this.play();

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
		

		
		/*
		 * Make slider image draggable 
		 *
		 * @param  {Element} $obj             - The current FlexSlider setup using custom selector.
		 * @return {Void}
		 */
        function slidesExDraggable( $obj, animDelay ) {


			function prevMove() {
				$obj.flexslider( 'prev' );
			}
			
			function nextMove() {
				$obj.flexslider( 'next' );
			} 
			
			//Added touch method to mobile device and desktop
			//-------------------------------------	
			const $dragTrigger = $obj.find( '.uix-flexslider__inner' );
			let mouseX, mouseY;
			let isMoving = false;
			
			//Avoid images causing mouseup to fail
			$dragTrigger.find( 'img' ).css({
				'pointer-events': 'none',
				'user-select': 'none'
			});
			
			
			//Make the cursor a move icon when a user hovers over an item
			$dragTrigger.css( 'cursor', 'move' );
			
			
			$dragTrigger[0].removeEventListener( 'mousedown', dragStart );
			document.removeEventListener( 'mouseup', dragEnd );
			
			
			//
			$dragTrigger[0].addEventListener( 'mousedown', dragStart );
			
			
			function dragStart(e) {

				if ( $obj.data( 'flexslider' ).animating ) {
					return;
				}

				//Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
				mouseX = e.clientX;
				mouseY = e.clientY;
			
				document.addEventListener( 'mouseup', dragEnd );
				document.addEventListener( 'mousemove', dragProcess );
			
			}
			
			function dragProcess(e) {
			
				let offsetX, offsetY;
			
				offsetX = mouseX - e.clientX,
				offsetY = mouseY - e.clientY;
			
				if ( 'horizontal' === $obj.data( 'flexslider' ).vars.direction ) {
					
					//--- left
					if ( offsetX >= 50) {
						if ( !isMoving ) {
							isMoving = true;
							nextMove();
						}
					}
				
					//--- right
					if ( offsetX <= -50) {
						if ( !isMoving ) {
							isMoving = true;
							prevMove();
						}
					}
					
				} else {

					//--- up
					if ( offsetY >= 50) { 
						if ( !isMoving ) {
							isMoving = true;
							nextMove();
						}
					}
				
					//--- down
					if ( offsetY <= -50) {
						if ( !isMoving ) {
							isMoving = true;
							prevMove();
						}
					}
					
				}

			

			}
			
			function dragEnd(e) {
				document.removeEventListener( 'mousemove', dragProcess);
			
				//restore move action status
				setTimeout( function() {
					isMoving = false;
				}, animDelay);
			}

			
			
        }

		
		/*
		 *  Scroll The Slider With Mousewheel
		 *
		 * @param  {Element} $obj            - The current FlexSlider setup using custom selector.
		 * @return {Void}
		 */
        function slidesExMousewheel( $obj ) {

			let timer    = null,
				wheeling = false;

            
			$obj[0].addEventListener( 'wheel', function( e ) {

				//Gets a value that indicates the amount that the mouse wheel has changed.
				const delta = Math.max(-1, Math.min(1, (-e.deltaY)));

				if ( timer ) {
					clearTimeout( timer );
				}

				if ( !wheeling ) {
					
					if( delta < 0 ) { 
						//scroll down
						$obj.flexslider( 'next' );

					} else {
						//scroll up
						$obj.flexslider( 'prev' );
					}
					
				
				}

				wheeling = true;

				timer = setTimeout(function() {
					wheeling = false;
				}, 60 );			
				
			
			}, browser.supportsPassive ? { passive: true } : false );

			
			
        }	
		

		
		
		/*
		 * Slider With Thumbnail ControlNav Pattern
		 *
		 * @param  {Element} slider           - The current slider.
		 * @param  {String} navThumbClass    - Class name of thumbnail controlNav.
		 * @return {Void}
		 */
        function initslidesWithNavThumb( slider, navThumbClass ) {

				$( '.uix-flexslider__thumbs'+navThumbClass+' > ul > li' ).off( 'click' ).on( 'click', function() {

					$( '.uix-flexslider__thumbs'+navThumbClass+' > ul > li' ).removeClass( 'is-active' );
					$( this ).addClass( 'is-active' );
					slider.flexslider( $( this ).index() );

				});	
			
        }
			
		
		
		/*
		* Method that updates children slides
		* fortunately, since all the children are not animating,
		* they will only update if the main flexslider updates. 
		 *
		 * @param  {Number} slideNumber          - The current slider index.
		 * @param  {Element} childrenSlidesObj    - Target slider.
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
			let childrenSlides = $( childrenSlidesObj ).flexslider({
				slideshow         : false, // Remove the animations
				controlNav        : false, // Remove the controls
				animationLoop     : loop,
				animationSpeed    : speed,
				slideshowSpeed    : timing
			}); 

			
			// Iterate through the children slides but not past the max
			for ( let i=0; i < childrenSlides.length; i++ ) {
				// Run the animate method on the child slide
				$( childrenSlides[i] ).data( 'flexslider' ).flexAnimate( slideNumber );
			}   
		}
		

		/*! 
		 ---------------------------
         Initialize slideshow
		 ---------------------------
		 */
		const $sliderDefault = $( '.uix-flexslider' );
		$sliderDefault.each( function()  {
			const $this             = $( this );
	
			let	dataSpeed         = $this.data( 'speed' ),
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
			let myControlsContainer, myCustomDirectionNav;
			if ( typeof customConID === typeof undefined || customConID == '' || customConID == false ) {
				myControlsContainer  = '';
				myCustomDirectionNav = '';
			} else {
				myControlsContainer  = $( '.uix-flexslider__mycontrols'+customConID+' .uix-flexslider__mycontrols__control-paging' );
				myCustomDirectionNav = $( '.uix-flexslider__mycontrols'+customConID+' a' );	
				
				
				//Change the class naming of the page up and down buttons to support trigger events
				myCustomDirectionNav.first().addClass( pluginNamespace + 'prev' );
				myCustomDirectionNav.last().addClass( pluginNamespace + 'next' );
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
			if ( dataDrag ) slidesExDraggable( $this, dataSpeed );

			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			

			//With Thumbnail ControlNav Pattern
			if ( dataNhumbs ) {
				initslidesWithNavThumb( $this, dataNhumbs );
				//Prevent index error
				dataLoop = false;
			}
			
		
			
			//Show number of items
			let my_itemWidth = 0, 
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
				let curSync      = $( this ).data( 'my-sync' );
				const thisSliderID = $this.attr( 'id' );
				
				
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
				namespace	      : pluginNamespace,
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
						const dataShowItems = $( this ).data( 'my-multiple-items' );
		
						
						if ( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {

							const gridSize = getGridSize( dataShowItems );
							flexslider.vars.minItems = gridSize;
							flexslider.vars.maxItems = gridSize;
							
						}
						
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});
				
			
				
			}
		});
		
    };
	
    module.components.documentReady.push( module.FLEXSLIDER.documentReady );
	

	return class FLEXSLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


