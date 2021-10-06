
/* 
 *************************************
 * <!-- SVG Mask Slider -->
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


import '../scss/_style.scss';


export const SVG_MASK_SLIDER = ( ( module, $, window, document ) => {
	if ( window.SVG_MASK_SLIDER === null ) return false;
	
    
    module.SVG_MASK_SLIDER               = module.SVG_MASK_SLIDER || {};
    module.SVG_MASK_SLIDER.version       = '0.0.3';
    module.SVG_MASK_SLIDER.pageLoaded    = function() {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
		let	animDelay = 0;
		let	animSpeed = 1000;
		const $sliderWrapper = $( '.uix-svgMask-slider' );
		let svgAnimating = false;


        
		//
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

				const $this                    = $( this );
                
				const $items                   = $this.find( '.uix-svgMask-slider__item' ),
				      $first                   = $items.first(),
                      activated                = $this.data( 'activated' ); 
                
				let	  nativeItemW,
					  nativeItemH;
                      
				
				
                
                if ( typeof activated === typeof undefined || activated === 0 ) {
                    

                    //Get parameter configuration from the data-* attribute of HTML
                    let dataControlsPagination   = $this.data( 'controls-pagination' ),
                        dataControlsArrows       = $this.data( 'controls-arrows' ),
                        dataDraggable            = $this.data( 'draggable' ),
                        dataDraggableCursor      = $this.data( 'draggable-cursor' ),                     
                        dataCountTotal           = $this.data( 'count-total' ),
                        dataCountCur             = $this.data( 'count-now' ),
						dataSpeed                = $this.data( 'speed' );


                    if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-svgMask-slider__pagination';
                    if ( typeof dataControlsArrows === typeof undefined || dataControlsArrows == false ) dataControlsArrows = '.uix-svgMask-slider__arrows';
                    if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
                    if ( typeof dataDraggableCursor === typeof undefined || dataDraggableCursor == false ) dataDraggableCursor = 'move';
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

                    //Get the animation speed
                    //-------------------------------------	
                    if ( typeof dataSpeed != typeof undefined && dataSpeed != false ) {
                        animSpeed = dataSpeed;
                    }
					

					//Get the duration of the animation
					//-------------------------------------	
                    animDelay = animSpeed;
					
					
			
					//Get timeline elements
					//-------------------------------------	
					const txtTimeline = new TimelineMax({delay: 0});
					const txtMaskTimeline = new TimelineMax({delay: 0});

					txtTimeline
						.to( $items.find( '.uix-svgMask-slider__txt__content' ), 0.1, {opacity: 0})
						.to( $items.find( 'svg image' ), 0.2, {scale: 1.1},'-=0.1')
						.to( $this.find( '.uix-svgMask-slider__inner' ), 0.9, {ease: Circ.easeOut, scale: 0.85},'-=0.2')
						.to( $this.find( '.uix-svgMask-slider__inner' ), 0.75, {ease: Elastic.easeOut.config(4, 1.5), scale: 1} )
						.pause();

					txtMaskTimeline
						.to( $items.find( '.uix-svgMask-slider__txt__mask' ), 0.6, {css: { marginLeft: 0 } })
						.to( $items.find( '.uix-svgMask-slider__txt__content' ), 0.1, {opacity:1}, "-=0.1")  
					    .to( $items.find( 'svg image' ), 0.2, {scale: 1},'-=0.1')
						.to( $items.find( '.uix-svgMask-slider__txt__mask' ), 0.6, {css: { marginLeft: '-100vw' } });


					

					//Initialize the properties of each Item
					//-------------------------------------	
					$items.each( function( index )  {
						const _id = UixGUID.create();
						const _item = $( this );
						_item.find( 'clipPath' ).attr( 'id', _id + '-img' );
						_item.find( 'image' ).attr( 'clip-path', 'url(#'+_id+'-img)' );
						_item.delay( animDelay*index ).queue( 'fx', function() { 
							$( this ).addClass( 'is-loaded' ).dequeue();
						});
					});

					
					

                    //Initialize the first item container
                    //-------------------------------------		
                    $items.addClass( 'next' );

                    setTimeout( function() {
                        $first.addClass( 'is-active' );
                    }, animDelay );

					
					//
					let imgURL   = $first.find( 'img' ).attr( 'src' );
					if ( typeof imgURL != typeof undefined ) {
						const img = new Image();

						img.onload = function() {
							$this.css( 'height', $this.width()*(this.height/this.width) + 'px' );		

							nativeItemW = this.width;
							nativeItemH = this.height;	

							//Initialize all the items to the stage
							addItemsToStage( $this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur, txtTimeline, txtMaskTimeline );
						

						};

						img.src = imgURL;
					}




                    //Autoplay Slider
                    //-------------------------------------		
                    if ( !resize ) {


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
		 * @param  {Element} slider                 - Selector of the slider .
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
		 * @return {Void}                          - The constructor.
		 */
		function sliderAutoPlay( playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID ) {	

			const items = slider.find( '.uix-svgMask-slider__item' ),
				total = items.length;
			
			slider[0].animatedSlides = setInterval( function() {

				playTimes = parseFloat( items.filter( '.is-active' ).index() );
				playTimes++;
				
			
				if ( !loop ) {
					if ( playTimes < total && playTimes >= 0 ) sliderUpdates( playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
				} else {
					if ( playTimes == total ) playTimes = 0;
					if ( playTimes < 0 ) playTimes = total-1;		
					sliderUpdates( playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );
				}
				

				
			}, timing );	
		}

		

        /*
		 * Initialize all the items to the stage
		 *
		 * @param  {Element} slider                 - Current selector of each slider.
		 * @param  {Number} nativeItemW            - Returns the intrinsic width of the image.
		 * @param  {Number} nativeItemH            - Returns the intrinsic height of the image.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
         * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
         * @param  {Boolean} draggable             - Allow drag and drop on the slider.
         * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
         * @param  {Function} tl1                  - Timeline animation of text field.
         * @param  {Function} tl2                  - Timeline animation of text mask field.
		 * @return {Void}
		 */
        function addItemsToStage( slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID, tl1, tl2  ) {
			
			const $this                  = slider,
				$items                   = $this.find( '.uix-svgMask-slider__item' ),
				$first                   = $items.first(),
				itemTotal                = $items.length;
	

			//If arrows does not exist on the page, it will be added by default, 
			//and the drag and drop function will be activated.
			if ( $( arrowsID ).length == 0 ) {
				$( 'body' ).prepend( '<div style="display:none;" class="uix-svgMask-slider__arrows '+arrowsID.replace('#','').replace('.','')+'"><a href="#" class="uix-svgMask-slider__arrows--prev"></a><a href="#" class="uix-svgMask-slider__arrows--next"></a></div>' );
			}
			

            //Add identifiers for the first and last items
            $items.last().addClass( 'last' );
            $items.first().addClass( 'first' );

			
		    //Prevent bubbling
			if ( itemTotal == 1 ) {
				$( paginationID ).hide();
				$( arrowsID ).hide();
			}

			

			//Pagination dots 
			//-------------------------------------	
			let _dot       = '',
				_dotActive = '';
			_dot += '<ul>';
			for ( let i = 0; i < itemTotal; i++ ) {

				_dotActive = ( i == 0 ) ? 'class="is-active"' : '';

				_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
			}
			_dot += '</ul>';

			if ( $( paginationID ).html() == '' ) $( paginationID ).html( _dot );

			$( paginationID ).find( 'li a' ).off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();
				
				if ( svgAnimating ) return false;
                
                //Prevent buttons' events from firing multiple times
                const $btn = $( this );
                if ( $btn.attr( 'aria-disabled' ) == 'true' ) return false;
                $( paginationID ).find( 'li a' ).attr( 'aria-disabled', 'true' );
                
                $( paginationID ).find( 'li a' )
                    .delay(animDelay)
                    .queue(function(next) { $( paginationID ).find( 'li a' ).attr( 'aria-disabled', 'false' ); next(); }); 
                
                
                //
				if ( !$( this ).hasClass( 'is-active' ) ) {
					
					

					//Text animation from timeline
					tl1.restart();

					setTimeout(function() {
						tl2.restart();
					}, 1500 ); 


					//Determine the direction
					let curDir = 'prev';
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
			const _prev = $( arrowsID ).find( '.uix-svgMask-slider__arrows--prev' ),
				  _next = $( arrowsID ).find( '.uix-svgMask-slider__arrows--next' );

			$( arrowsID ).find( 'a' ).attr( 'href', 'javascript:' );

			$( arrowsID ).find( 'a' ).removeClass( 'is-disabled' );
			if ( !loop ) {
				_prev.addClass( 'is-disabled' );
			}

			_prev.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				//Pause the auto play event
				clearInterval( $this[0].animatedSlides );   

				//Move animation
				prevMove();
			});

			_next.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				//Pause the auto play event
				clearInterval( $this[0].animatedSlides );   

				//Move animation
				nextMove();
			});

			function prevMove() {
				if ( svgAnimating ) return false;

                //Prevent buttons' events from firing multiple times
                if ( _prev.attr( 'aria-disabled' ) == 'true' ) return false;
                _prev.attr( 'aria-disabled', 'true' );

                _prev
                    .delay(animDelay)
                    .queue(function(next) { _prev.attr( 'aria-disabled', 'false' ); next(); });                
                
				//
				if ( _prev.hasClass( 'is-disabled' ) ) return false;					
				
				//Text animation from timeline
				tl1.restart();

				setTimeout(function() {
					tl2.restart();
				}, 1500 ); 
				
				
                //
				sliderUpdates( parseFloat( $items.filter( '.is-active' ).index() ) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop );

			}
			
			function nextMove() {
				if ( svgAnimating ) return false;
                
                //Prevent buttons' events from firing multiple times
                if ( _next.attr( 'aria-disabled' ) == 'true' ) return false;
                _next.attr( 'aria-disabled', 'true' );

                _next
                    .delay(animDelay)
                    .queue(function(next) { _next.attr( 'aria-disabled', 'false' ); next(); });                
                
				
				//
				if ( _next.hasClass( 'is-disabled' ) ) return false;
				
				//Text animation from timeline
				tl1.restart();

				setTimeout(function() {
					tl2.restart();
				}, 1500 ); 
				
				
                //
				sliderUpdates( parseFloat( $items.filter( '.is-active' ).index() ) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop );

			} 
			
			//Added touch method to mobile device and desktop
			//-------------------------------------	
			const $dragTrigger = $this.find( '.uix-svgMask-slider__inner' );
			let mouseX, mouseY;
			let isMoving = false;
			
			//Avoid images causing mouseup to fail
			$dragTrigger.find( 'img' ).css({
				'pointer-events': 'none',
				'user-select': 'none'
			});
			
			
			//Make the cursor a move icon when a user hovers over an item
			if ( draggable && draggableCursor != '' && draggableCursor != false ) $dragTrigger.css( 'cursor', draggableCursor );
			
			
			$dragTrigger[0].removeEventListener( 'mousedown', dragStart );
			document.removeEventListener( 'mouseup', dragEnd );
			
			$dragTrigger[0].removeEventListener( 'touchstart', dragStart );
			document.removeEventListener( 'touchend', dragEnd );
			
			
			//
			$dragTrigger[0].addEventListener( 'mousedown', dragStart );
			$dragTrigger[0].addEventListener( 'touchstart', dragStart );
			
			
			function dragStart(e) {
				//Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
				const touches = e.touches;
			
				if ( touches && touches.length ) {	
					mouseX = touches[0].clientX;
					mouseY = touches[0].clientY;
				} else {
					mouseX = e.clientX;
					mouseY = e.clientY;
				} 
			
				document.addEventListener( 'mouseup', dragEnd );
				document.addEventListener( 'mousemove', dragProcess );
			
				document.addEventListener( 'touchend', dragEnd );
				document.addEventListener( 'touchmove', dragProcess ); 
			
			}
			
			function dragProcess(e) {
			
				const touches = e.touches;
				let offsetX, offsetY;
			
			
				if ( touches && touches.length ) {	
					offsetX = mouseX - touches[0].clientX,
					offsetY = mouseY - touches[0].clientY;
				} else {
					offsetX = mouseX - e.clientX,
					offsetY = mouseY - e.clientY;
				} 
			
			
				//--- left
				if ( offsetX >= 50) {
					if ( draggable || ( touches && touches.length ) ) {
						if ( !isMoving ) {
							isMoving = true;
							nextMove();
						}
					}
				}
			
				//--- right
				if ( offsetX <= -50) {
					if ( draggable || ( touches && touches.length ) ) {
						if ( !isMoving ) {
							isMoving = true;
							prevMove();
						}
					}
				}
			
				//--- up
				if ( offsetY >= 50) { 
			
				}
			
				//--- down
				if ( offsetY <= -50) {
			
				}
			}
			
			function dragEnd(e) {
				document.removeEventListener( 'mousemove', dragProcess);
				document.removeEventListener( 'touchmove', dragProcess);
			
				//restore move action status
				setTimeout( function() {
					isMoving = false;
				}, animDelay);
			}


			
		}
		
		
	
		
		/*
		 * Transition Between Slides
		 *
		 * @param  {Number} elementIndex           - Index of current slider.
		 * @param  {Element} slider                 - Selector of the slider .
		 * @param  {String} dir                    - Switching direction indicator.
         * @param  {String} countTotalID           - Total number ID or class of counter.
         * @param  {String} countCurID             - Current number ID or class of counter.
         * @param  {String} paginationID           - Navigation ID for paging control of each slide.
         * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
         * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
		 * @return {Void}
		 */
        function sliderUpdates( elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop ) {
			
			const $items                   = slider.find( '.uix-svgMask-slider__item' ),
                  total                    = $items.length;
			
		
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
				if ( elementIndex == total - 1 ) $( arrowsID ).find( '.uix-svgMask-slider__arrows--next' ).addClass( 'is-disabled' );
				if ( elementIndex == 0 ) $( arrowsID ).find( '.uix-svgMask-slider__arrows--prev' ).addClass( 'is-disabled' );
			}

			// To determine if it is a touch screen.
			if ( Modernizr.touchevents ) {
				if ( elementIndex == total ) elementIndex = total-1;
				if ( elementIndex < 0 ) elementIndex = 0;	
				
				//Prevent bubbling
				if ( !loop ) {
					//first item
					if ( elementIndex == 0 ) {
						$( arrowsID ).find( '.uix-svgMask-slider__arrows--prev' ).addClass( 'is-disabled' );
					}

					//last item
					if ( elementIndex == total - 1 ) {
						$( arrowsID ).find( '.uix-svgMask-slider__arrows--next' ).addClass( 'is-disabled' );
					}	
				}

				
			}
            
            
            
            // call the current item
            //-------------------------------------
            const $current = $items.eq( elementIndex );
			
			
			//Determine the direction and add class to switching direction indicator.
			let dirIndicatorClass = '';
			if ( dir == 'prev' ) dirIndicatorClass = 'prev';
			if ( dir == 'next' ) dirIndicatorClass = 'next';
			

			
			//Add transition class to Controls Pagination
			$( paginationID ).find( 'li a' ).removeClass( 'leave' );
			$( paginationID ).find( 'li a.is-active' ).removeClass( 'is-active' ).addClass( 'leave');
			$( paginationID ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'is-active').removeClass( 'leave' );
			
			//Add transition class to each item
			$items.removeClass( 'leave prev next' );
			$items.addClass( dirIndicatorClass );
			slider.find( '.uix-svgMask-slider__item.is-active' ).removeClass( 'is-active' ).addClass( 'leave ' + dirIndicatorClass );
			$current.addClass( 'is-active ' + dirIndicatorClass ).removeClass( 'leave' );

			
			
			//SVG Animation
			//-------------------------------------
			if( !svgAnimating ) {
				
				//don't animate if already animating
				svgAnimating = true;

				

				const path1 = '1 0.5 1 540.5 1 1080.5 0 1080.5 4 1080.5 4 540.5 4 0.5 0 0.5 1 0.5',
					  path2 = '0.5 0.5 0.5 540.5 0.5 1080.5 1519.5 1080.5 1531.5 1080.5 1066.5 525.5 601.5 1.5 589.5 1.5 0.5 0.5',
					  path3 = '0.5 0.5 0.5 540.5 0.5 1080.5 960.5 1080.5 1920.5 1080.5 1920.5 540.5 1920.5 0.5 960.5 0.5 0.5 0.5';

				if ( dir == 'next' ) {
					$current.find('polygon').css({
						'transform-origin': 'center',
						'transform': 'rotate(180deg)'	
					});

				} else {
					$current.find('polygon').css({
						'transform-origin': 'center',
						'transform': 'rotate(0)'	
					});	
				}


				//----
				//@required: MorphSVGPlugin
				/*
				TweenMax.set( $current.find('polygon')[0], {
					attr: {
							  points: path1
						  },
					onComplete: function() {

						TweenMax.to( this.target, animSpeed/1000, {
							morphSVG: path2,
							delay: 0,
							ease: Power2.easeOut,
							onComplete: function() {

								TweenMax.to( this.target, animSpeed/1000, {
									morphSVG: path3,
									delay: 0,
									ease: Power2.easeInOut,
									onComplete: function() {
										svgAnimating = false;
									}
								});	


							}
						});	

					}
				});
				*/
				

				TweenMax.set( $current.find('polygon')[0], {
					attr: {
							  points: path1
						  },
					onComplete: function() {

						anime.timeline({
							loop: false
						}).add({
							targets: $current.find('polygon')[0],
							points: [
								{value: path2}
							],
							duration: animSpeed,
							easing: "easeOutExpo"
						}).add({
							targets: $current.find('polygon')[0],
							points: [
								{value: path3}
							],
							duration: animSpeed,
							easing: "easeOutExpo",
							complete: function() {
								svgAnimating = false;
							}
						});	



					}
				});	


	
			}//endif svgAnimating

			

			//Display counter
			//-------------------------------------
			$( countTotalID ).text( total );
			$( countCurID ).text( parseFloat( elementIndex ) + 1 );		
			

			
			//Reset the default height of item
			//-------------------------------------	
			itemDefaultInit( slider, $current );		
			
		
			
		}
		
        
		/*
		 * Initialize the default height of item
		 *
         * @param  {Element} slider                 - Selector of the slider .
		 * @param  {Element} currentLlement         - Current selector of each slider.
		 * @return {Void}
		 */
        function itemDefaultInit( slider, currentLlement ) {


			//
			let imgURL   = currentLlement.find( 'img' ).attr( 'src' );
			if ( typeof imgURL != typeof undefined ) {
				const img = new Image();

				img.onload = function() {
					slider.css( 'height', currentLlement.closest( '.uix-svgMask-slider__outline' ).width()*(this.height/this.width) + 'px' );		

				};

				img.src = imgURL;	
			}

		}

    
		
    };

    module.components.pageLoaded.push( module.SVG_MASK_SLIDER.pageLoaded );
	

	return class SVG_MASK_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


