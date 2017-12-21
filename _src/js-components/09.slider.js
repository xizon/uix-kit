
/*! 
 *************************************
 * 9. FlexSlider
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		

		//-------  Initialize Carousel
		$( '.custom-theme-flexslider:not(.custom-primary-flexslider):not(.custom-controls):not(.custom-itemgrid)' ).each( function( index )  {
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

			
		});
		
		
		//-------  Initialize Carousel (custom controls)
		$( '.custom-theme-flexslider.custom-controls' ).each( function( index )  {
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

			
		});
		
		
		
		//-------  Initialize Carousel (Carousel with dynamic min/max ranges)
		
		//store the slider in a local variable
		var flexslider  = { vars:{} }
		
		// tiny helper function to add breakpoints
		function getGridSizeL() {
			return ( window.innerWidth < 600 ) ? 2 : ( window.innerWidth < 900 ) ? 3 : 4;
		}
		
		function getGridSizeS() {
			return ( window.innerWidth < 600 ) ? 2 : ( window.innerWidth < 900 ) ? 2 : 3;
		}
		
		$( '.custom-theme-flexslider.custom-itemgrid-1' ).each( function( index )  {
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
			    itemWidth         : 1,
				move              : 0, // Number of carousel items that should move on animation.
			    minItems          : getGridSizeS(), // use function to pull in initial value
			    maxItems          : getGridSizeS() // use function to pull in initial value
			});

			
		});
		
		
		$( '.custom-theme-flexslider.custom-itemgrid-2' ).each( function( index )  {
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

			
		});	
		
		
		//-------  Initialize Primary Carousel
		$( '.custom-primary-flexslider' ).flexslider({
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
	
	
		
		
		//-------  Common initialization function
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
	

	
		
	};
	
		
    theme.flexSlider = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


