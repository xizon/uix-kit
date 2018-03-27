
/*! 
 *************************************
 * Slideshow ( with custom flexslider )
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		

		var $window            = $( window ),
			windowWidth        = $window.width(),
			windowHeight       = $window.height();
		

		/*
		 * Return an event from callback function to each slider.
		 *
		 * @param  {object} thisSlider          - The current slider.
		 * @param  {object} sliderWrapper       - The current slider wrapper.
		 * @param  {number} showItems           - Each slider with dynamic min/max ranges.
		 * @param  {boolean} parallax           - Whether to use parallax effect.
		 * @param  {string} fireState           - State of fire asynchronously.
		 * @param  {string} countTotalSelector  - Total counter selector.
		 * @param  {string} countCurSelector    - Current counter selector.
		 * @return {number}                     - Index of current slider .
		 */
        function initslides( sliderWrapper, thisSlider, showItems, parallax, countTotalSelector, countCurSelector, fireState ) {

			var prefix       = 'custom-theme',
				curIndex     = thisSlider.currentSlide,
				count        = thisSlider.count,
				activeClass  = prefix+'-flex-active-slide',
				prevClass    = activeClass + '-prev',
				nextClass    = activeClass + '-next',
				$items       = thisSlider.find( '.item' ),
				$current     = thisSlider.slides.eq( curIndex ),
				$prev        = thisSlider.slides.eq( curIndex - 1 ),
				$next        = thisSlider.slides.eq( thisSlider.animatingTo ),
				$first       = thisSlider.slides.eq( 0 ),
				curHeight    = $current.height(),
				curNhumbs    = thisSlider.data( 'mynavthumbs' );


			// Fires when the slider loads the first slide.
			// Fires after each slider animation completes.
			if ( fireState == 'start' || fireState == 'after' ) {
				
				//Remove the slider loading
				//-------------------------------------
				thisSlider.removeClass( prefix+'-flexslider-loading' );


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
				if( typeof curNhumbs != typeof undefined ) {
					$( '.custom-theme-flexslider-thumbs'+curNhumbs+' > ul > li' ).removeClass( 'active' );
					$( '.custom-theme-flexslider-thumbs'+curNhumbs+' > ul > li' ).eq( curIndex ).addClass( 'active' );			
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
				if( typeof showItems != typeof undefined && showItems != '' && showItems != 0 ) {


					$items.removeClass( activeClass );
					$items.removeClass( prevClass );
					$items.removeClass( nextClass );

					//Focus slider
					$items.eq( parseFloat( curIndex+1 ) ).addClass( activeClass );

					//Previous slider
					$items.eq( parseFloat( curIndex ) ).addClass( prevClass );

					//Next slider
					$items.eq( parseFloat( curIndex+2 ) ).addClass( nextClass );	
				}


				//Display counter
				//-------------------------------------
				if ( sliderWrapper.find( '.count' ).length == 0 ) {
					if ( sliderWrapper.closest( 'section' ).find( '.count' ).length > 0 ) {
						countTotalSelector.text( count );
						countCurSelector.text( curIndex + 1 );		
					}
				}

				
				
			}
			
			// Fires asynchronously with each slider animation.
			if ( fireState == 'before' ) {
				
				$next.find( 'img' ).addClass( 'active' );
				
				$current.find( 'img' ).removeClass( 'active' );
				$prev.find( 'img' ).removeClass( 'active' );
				$first.find( 'img' ).removeClass( 'active' );
			}
			
			
			// Fires when the slider reaches the last slide (asynchronous).
			if ( fireState == 'end' ) {
				
				$first.find( 'img' ).addClass( 'active' );
				
			}
			
			
			// Fires asynchronously with each slider animation.
			// Fires when the slider loads the first slide.
			if ( fireState == 'before' || fireState == 'start' ) {
				
				//Return an event from callback function to each slider to make parallax effect.
				//-------------------------------------
				if ( parallax ) {
				
					
					var dir = 'left';

					$.each( thisSlider.slides, function( i, item ) {
						var el = $( item );
						el.removeClass( 'right left' );
						if (i >= thisSlider.animatingTo && dir !== 'right') {
							dir = 'right';
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
		 * @param  {object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {boolean} play            - Forced to trigger pause or play events.
		 * @return {void}                    - The constructor.
		 */
		function videoEmbedInit( wrapper, play ) {
			wrapper.find( '.web-video-embed' ).each( function()  {
				var $this         = $( this ),
					curVideoID    = $this.find( '.video-js' ).attr( 'id' ),
					dataAuto      = $this.data( 'embed-video-autoplay' ),
					dataLoop      = $this.data( 'embed-video-loop' );

			
				if( typeof dataAuto === typeof undefined ) {
					dataAuto = true;
				}
				if( typeof dataLoop === typeof undefined ) {
					dataLoop = true;
				}
				
				//HTML5 video autoplay on mobile revisited
				if ( dataAuto && windowWidth <= 768 ) {
					$this.find( '.video-js' ).attr({
						'autoplay'    : 'true',
						'muted'       : 'true',
						'playsinline' : 'true'
					});
				}

				var myPlayer = videojs( curVideoID );


				myPlayer.ready(function() {

					//Pause the video when it is not current slider
					if ( !play ) {
						myPlayer.pause();
						myPlayer.currentTime(0);
					} else {
						if ( dataAuto && dataLoop ) {

							myPlayer.currentTime(0);
							myPlayer.play();

							//Should the video go to the beginning when it ends

							myPlayer.on( 'ended', function () { 
								myPlayer.currentTime(0);
								myPlayer.play();
							});		


						}	
					}
					

				});

			});	
		}	
		

		
		/*
		 * Make slider image draggable 
		 *
		 * @param  {object} $obj             - The current FlexSlider setup using custom selector.
		 * @return {void}                   - The constructor.
		 */
        function slidesExDraggable( $obj ) {
			
			var $dragDropTrigger = $obj.find( '.custom-theme-slides > div.item' );
			
			//Make the cursor a move icon when a user hovers over an item
			$dragDropTrigger.css( 'cursor', 'move' );
			

			//Mouse event
			$dragDropTrigger.on( 'mousedown', function( e ) {
				e.preventDefault();
				
				if ( $obj.data( 'flexslider' ).animating ) {
					return;
				}

				$( this ).addClass( 'dragging' );
				$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
				$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
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
		 * @param  {object} $obj            - The current FlexSlider setup using custom selector.
		 * @return {void}                   - The constructor.
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
		 * @param  {object} slider           - The current slider.
		 * @param  {string} navThumbClass    - Class name of thumbnail controlNav.
		 * @return {void}                    - The constructor.
		 */
        function initslidesWithNavThumb( slider, navThumbClass ) {

				$( '.custom-theme-flexslider-thumbs'+navThumbClass+' > ul > li' ).on( 'click', function() {

					$( '.custom-theme-flexslider-thumbs'+navThumbClass+' > ul > li' ).removeClass( 'active' );
					$( this ).addClass( 'active' );
					slider.flexslider( $( this ).index() );

				});	
			
        }
			

		/*! 
		 ---------------------------
         Initialize slideshow
		 ---------------------------
		 */
		var $sliderDefault = $( '.custom-theme-flexslider' );
		$sliderDefault.each( function()  {
			var $this           = $( this ),
				dataSpeed       = $this.data( 'speed' ),
				dataDrag        = $this.data( 'draggable' ),
				dataWheel       = $this.data( 'wheel' ),
				dataTiming      = $this.data( 'timing' ),
				dataLoop        = $this.data( 'loop' ),
				dataPrev        = $this.data( 'prev' ),
				dataNext        = $this.data( 'next' ),
				dataAnim        = $this.data( 'animation' ),
				dataPaging      = $this.data( 'paging' ),
				dataArrows      = $this.data( 'arrows' ),
				dataAuto        = $this.data( 'auto' ),
				dataNhumbs      = $this.data( 'mynavthumbs' ),
				dataCountTotal  = $this.data( 'mycounttotal' ),
				dataCountCur    = $this.data( 'mycountcur' ),
				customConID     = $this.data( 'mycontrols' ),
				dataShowItems   = $this.data( 'myshow' ),
				dataParallax    = $this.data( 'myparallax' );
			
			// Custom Controls
			var myControlsContainer, myCustomDirectionNav;
			if( typeof customConID === typeof undefined || customConID == '' || customConID == false ) {
				myControlsContainer  = '';
				myCustomDirectionNav = '';
			} else {
				myControlsContainer  = $( '.custom-controls-container' + customConID );
				myCustomDirectionNav = $( '.custom-navigation'+customConID+' a' );	
			}

			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			if( typeof dataNhumbs === typeof undefined ) dataNhumbs = false;
			if( typeof dataCountTotal === typeof undefined ) dataCountTotal = false;
			if( typeof dataCountCur === typeof undefined ) dataCountCur = false;
			if( typeof dataParallax === typeof undefined ) dataParallax = false;
			
			
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
				my_move      = 0,
				my_minItems  = 0,
				my_maxItems  = 0;
			
			if( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {
				
			    my_itemWidth = 1;
				my_move      = 1;
				my_minItems  = dataShowItems;
				my_maxItems  = dataShowItems;
			} 
			
			
			//Display counter
			var $countTotal = ( dataCountTotal ) ? $( dataCountTotal ) : $( 'p.count em.count' ), 
				$countCur   = ( dataCountCur ) ? $( dataCountCur ) : $( 'p.count em.current' );
			
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslides, //Fires when the slider loads the first slide
				after             : initslides, //Fires after each slider animation completes.
			    itemWidth         : my_itemWidth,
				move              : my_move, // Number of carousel items that should move on animation.
			    minItems          : my_minItems, // use function to pull in initial value
			    maxItems          : my_maxItems, // use function to pull in initial value
				controlsContainer : myControlsContainer,
				customDirectionNav: myCustomDirectionNav,
				
				//Fires when the slider loads the first slide.
				start: function( slider ) {
					initslides( $this, slider, dataShowItems, dataParallax, $countTotal, $countCur, 'start' );
				},
				
				//Fires asynchronously with each slider animation.
				before: function( slider ) {
					initslides( $this, slider, dataShowItems, dataParallax, $countTotal, $countCur, 'before' );
				},
				
				//Fires after each slider animation completes.
				after: function( slider ) {
					initslides( $this, slider, dataShowItems, dataParallax, $countTotal, $countCur, 'after' );
				},
				
				//Fires when the slider reaches the last slide (asynchronous).
				end: function( slider ) {
					initslides( $this, slider, dataShowItems, dataParallax, $countTotal, $countCur, 'end' );
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
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				$sliderDefault.each( function() {
					
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});
				
			
				
			}
		});
		

		
	};
	
		
    theme.flexSlider = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


