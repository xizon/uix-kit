
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
			windowHeight       = $window.height(),
			specialSliderType  = [ '.custom-primary-flexslider', '.custom-controls', '.custom-itemgrid', '.custom-counter-show' ];
		
		
	
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {wrapper} element         - The outermost video container, which can contain multiple videos
		 * @return {void}                    - The constructor.
		 */
		function videoEmbedInit( wrapper ) {
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
				if ( dataAuto ) {
					$this.find( '.video-js' ).attr({
						'autoplay'    : 'true',
						'muted'       : 'true',
						'playsinline' : 'true'
					});
				}

				var myPlayer = videojs( curVideoID );


				myPlayer.ready(function() {

					if ( dataAuto && dataLoop ) {
					
						myPlayer.currentTime(0);
						myPlayer.play();
						
						//Should the video go to the beginning when it ends
						
						myPlayer.on( 'ended', function () { 
							myPlayer.currentTime(0);
							myPlayer.play();
						});		
						
						
					}


				});

			});	
		}	
		
		/*
		 * Return an event from callback function to each slider.
		 *
		 * @param  {slider} element         - The current slider.
		 * @return {void}                   - The constructor.
		 */
        function initslides( slider ) {

			var prefix    = 'custom-theme',
			    curSlide  = slider.find( '.'+prefix+'-flex-active-slide' ),
				curHeight = curSlide.height();
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
	
			//Auto-restart player if paused after action
			if ( slider.vars.slideshow ) {
				if ( !slider.playing ) {
					slider.play();
				}	
			}
			
			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				
				if ( typeof attr === typeof undefined ) {
					$( this ).attr( 'href', '#' );
				}
			});
			
			/*
			slider.slides.find( "a[rel^='theme-slider-prettyPhoto']" ).lightbox();
			*/
			
        }
	
		
		/*
		 * Return an event from callback function to each slider with dynamic min/max ranges.
		 *
		 * @param  {slider} element         - The current slider.
		 * @return {void}                   - The constructor.
		 */
        function initslidesItemgrid( slider ) {

			var prefix      = 'custom-theme',
				activeClass = prefix+'-flex-active-slide',
				prevClass   = activeClass + '-prev',
				nextClass   = activeClass + '-next',
				item        = '.custom-theme-slides > div.item';
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
			$sliderItemgird.find( item ).removeClass( activeClass );
			$sliderItemgird.find( item ).removeClass( prevClass );
			$sliderItemgird.find( item ).removeClass( nextClass );
			
			//Focus slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide+1)+')' ).addClass( activeClass );
			
			//Previous slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide)+')' ).addClass( prevClass );
			
			//Next slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide+2)+')' ).addClass( nextClass );
			
			
	
			//Auto-restart player if paused after action
			if ( slider.vars.slideshow ) {
				if ( !slider.playing ) {
					slider.play();
				}	
			}
			
			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				
				if ( typeof attr === typeof undefined ) {
					$( this ).attr( 'href', '#' );
				}
			});
			
			
        }
		
		
		
		//-------  Initialize primary slideshow
		var $sliderPrimaryEff = $( '.custom-primary-flexslider' );
		
		$sliderPrimaryEff.flexslider({
			namespace	      : 'custom-theme-flex-',
			animation         : 'slide',
			selector          : '.custom-theme-slides > div.item',
			controlNav        : true,
			smoothHeight      : true,
			prevText          : "<i class='fa fa-chevron-left custom-primary-flexslider-prev'></i>",
			nextText          : "<i class='fa fa-chevron-right custom-primary-flexslider-next'></i>",
			animationSpeed    : 600,
			slideshowSpeed    : 10000,
			slideshow         : true,
			animationLoop     : true,
			start             : initslides, //Fires when the slider loads the first slide
			after             : initslides //Fires after each slider animation completes.
		});
	
		
		
		//-------  Initialize slideshow ( default )
		var $sliderDefault, specialSliderClasses = '';
		for ( var i = 0; i < specialSliderType.length; i++ ) {
			specialSliderClasses += ':not('+specialSliderType[i]+')';
		}
		$sliderDefault = $( '.custom-theme-flexslider' + specialSliderClasses );
		
		$sliderDefault.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
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
				after             : initslides //Fires after each slider animation completes.
			});
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this );
			$this.find( '.custom-theme-flex-nav-prev, .custom-theme-flex-nav-next, .custom-theme-flex-control-nav li' ).on( 'click', function() {
				videoEmbedInit( $this );
			});
					

			
		});
		

		
		
		//-------  Initialize slideshow (custom controls)
		var $sliderMyControls = $( '.custom-theme-flexslider.custom-controls' );
		
		$sliderMyControls.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
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
				controlsContainer : $( '.custom-controls-container' ),
				customDirectionNav: $( '.custom-navigation a' )
			});
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this );
			$this.find( '.custom-navigation a, .custom-controls-container li' ).on( 'click', function() {
				videoEmbedInit( $this );
			});

			
		});
		
		
		

		
		//-------  Initialize slideshow (display counter)
		var $sliderCounterShow = $( '.custom-theme-flexslider.custom-counter-show' );
		
		$sliderCounterShow.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
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
				start: function( slider ) {
					var slide   = slider.currentSlide,
						count   = slider.count,
						current = slider.slides.eq( slider.currentSlide );	
					
					
					
					$( 'p.count em.count' ).text( count );
					
					return $( 'p.count em.current' ).text( slide + 1 );
				},
				before: function( slider ) {
					var current = slider.slides.eq( slider.currentSlide ),
						prev    = slider.slides.eq( slider.currentSlide - 1 ),
						next    = slider.slides.eq( slider.animatingTo ),
						first   = slider.slides.eq( 0 );
					
					
					current.find( 'img' ).removeClass( 'active' );
					prev.find( 'img' ).removeClass( 'active' );
					next.find( 'img' ).addClass( 'active' );
					
					return first.find( 'img' ).removeClass( 'active' );
				},
				after: function( slider ) {
					var slide   = slider.currentSlide,
						current = slider.slides.eq( slider.currentSlide );	
					
					$( 'p.count em.current' ).text( slide + 1 );
					
					return current.find( 'img' ).addClass( 'active' );
				},
				end: function( slider ) {
					var first = slider.slides.eq( 0 );
					
					return first.find( 'img' ).addClass( 'active' );
				}
			});
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this );
			$this.find( '.custom-theme-flex-nav-prev, .custom-theme-flex-nav-next, .custom-theme-flex-control-nav li' ).on( 'click', function() {
				videoEmbedInit( $this );
			});
			

			
		});	
		
	
	
		
		
		//-------  Initialize slideshow (with dynamic min/max ranges)
		
		//store the slider in a local variable
		var $sliderItemgird = $( '.custom-theme-flexslider.custom-itemgrid' );
		
		// tiny helper function to add breakpoints
		function getGridSizeS() {
			return 3;
		}
		

		$sliderItemgird.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
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
				start             : initslidesItemgrid, //Fires when the slider loads the first slide
				after             : initslidesItemgrid, //Fires after each slider animation completes.
			    itemWidth         : 1,
				move              : 1, // Number of carousel items that should move on animation.
			    minItems          : getGridSizeS(), // use function to pull in initial value
			    maxItems          : getGridSizeS() // use function to pull in initial value
			});
			
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this );
			$this.find( '.custom-theme-flex-nav-prev, .custom-theme-flex-nav-next, .custom-theme-flex-control-nav li' ).on( 'click', function() {
				videoEmbedInit( $this );
			});

			
		});
		
		
		
		//-------  Check grid size on resize event
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				$sliderPrimaryEff.data( 'flexslider' ).setup();
				
				
				$sliderDefault.each( function() {
					$( this ).data( 'flexslider' ).setup();
				});
				
				$sliderMyControls.each( function() {
					$( this ).data( 'flexslider' ).setup();
				});
				
				$sliderCounterShow.each( function() {
					$( this ).data( 'flexslider' ).setup();
				});
				
				$sliderItemgird.each( function() {
					$( this ).data( 'flexslider' ).setup();
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

