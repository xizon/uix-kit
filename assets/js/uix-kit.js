/* *************************************

	---------------------------
	MAIN SCRIPTS
	---------------------------
	
	TABLE OF CONTENTS
	---------------------------
	
		
	1. Header
	2. Loader
	3. Scroll Effect
	4. Parallax
	5. Overlay
	6. Scroll Reveal
	7. Navigation
	8. Grid List
	9. FlexSlider
	10. Forms
	11. Text effect
	12. Retina Graphics for Website
	13. Modal
	14. Tabs
	15. Mega Menu
	16. Dropdown Categories
	17. Pagination
	18. Counter
	19. Multiple columns full height for Bootstrap 3.x
	20. AJAX

************************************* */

var templateUrl = wp_theme_root_path.templateUrl,
	homeUrl     = wp_theme_root_path.homeUrl;

var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };


	$( 'body' ).waitForImages( pageLoaded );
    $( document ).ready( documentReady );
	
	
	
    function documentReady( context ) {
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }

    function pageLoaded( context ){
        
        context = typeof context == "object" ? $ : context;
        components.pageLoaded.forEach( function( component ) {
           component( context );
        });
    }

    theme.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    theme.components         = components;
    theme.documentReady      = documentReady;
	theme.pageLoaded         = pageLoaded;

    return theme;
}( jQuery, window, document ) );



/*! 
 *************************************
 * 1. Header
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window      = $( window );

		$window.on( 'scroll', function() {

			//---
			if ( $window.scrollTop() > 120 ) {	
				$( '.header-area' ).addClass( 'spy-scroll-fixed' );
			}else{
				$( '.header-area' ).removeClass( 'spy-scroll-fixed' );
			};


		});	
		
		
		//Header initialize
		headerInit();
		
		$window.on('resize', function() {
			headerInit();

		});
		
		function headerInit() {
			$( '.header-inner.auto-height' ).css( 'height', $( '.header-area' ).outerHeight() + 'px' ); 
		}
		
    };

    theme.header = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 2. Loader
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		// Remove loader
		$( '.loader' ).delay( 1500 ).fadeOut();
		
    };

    theme.loader = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * 3. Scroll Effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
        
		// Back to top
		$( document ).UItoTop( { easingType: 'easeOutQuart', scrollSpeed: 500 } );
		
		// Scroll to element
		$( 'a[href^="#"]' ).on( 'click', function( e ) {
		
			var target = $( this ).attr( 'href' );
		    
			if ( $( target ).length ) {
				e.preventDefault();
				$( 'html, body' ).stop().animate({
					scrollTop: $( target ).offset().top
				}, 1000);	
			}
	
		
		});
		
		// Making class active by scrolling past it
		$( window ).on( 'scroll', function() {
			var scrollTop = $( window ).scrollTop();
			
			$( '[data-section="true"]' ).each(function() {
			    
				var curID = $( this ).attr( 'id' );
				
				if ( scrollTop > $( this ).offset().top - 20 ) {
					$( '.menu-main li.active' ).removeClass( 'active' );
					$( '.menu-main li a[href^="#'+curID+'"]' ).parent().addClass( 'active' );
				}
	
			});
		});
		
		
    };

    theme.scrolltop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

/*! 
 *************************************
 * 4. Parallax
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
        
        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        

		//  Initialize
		parallaxInit();
		$window.on('resize', function() {
			parallaxInit();
		} );
		
		function parallaxInit() {
			$( '.parallax' ).each(function() {
				var $this       = $( this ),
				    dataAtt     = $this.data( 'parallax' ),
					dataH       = $this.data( 'height' ),
					dataW       = $this.data( 'width' ),
					dataImg     = $this.data( 'image-src' ),
					dataSkew    = $this.data( 'skew' ),
					dataSpeed   = $this.data( 'speed' );
				
				
				if( typeof dataAtt === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataAtt = 'fixed';
				}
				
				if( typeof dataW != typeof undefined ) {
					$this.css( {
						'width': dataW 
					} );
	
				}
				
				if( typeof dataH != typeof undefined ) {
					$this.addClass( 'cover' );
					$this.css( {
						'height': dataH
					} );
					$this.find( '.parallax-img' ).css( {
						'max-height': dataH
					} );	
				}
				
				if( typeof dataSpeed === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataSpeed = 0;
				}	
				
				
				if ( 
					$this.hasClass( 'height-10' ) || 
					$this.hasClass( 'height-20' ) || 
					$this.hasClass( 'height-30' ) || 
					$this.hasClass( 'height-40' ) || 
					$this.hasClass( 'height-50' ) || 
					$this.hasClass( 'height-60' ) || 
					$this.hasClass( 'height-70' ) || 
					$this.hasClass( 'height-80' ) || 
					$this.hasClass( 'height-90' ) || 
					$this.hasClass( 'height-100' )
				 ) {		
					
					var newH = $this.height();
					$this.css( {
						'height': newH + 'px'
					} );	
					$this.find( '.parallax-img' ).css( {
						'max-height': newH + 'px'
					} );	
				 }
				
				
				if( typeof dataImg != typeof undefined ) {
					$this.css( {
						'background': 'url(' + dataImg + ') 50% 0 no-repeat ' + dataAtt
					} );
				}
				
				if( typeof dataSkew != typeof undefined ) {
					$this.css( {
						'-ms-transform'     : 'skew(0deg, '+dataSkew+'deg)', /* IE 9 */
						'-webkit-transform' : 'skew(0deg, '+dataSkew+'deg)', /* Chrome, Safari, Opera */
						'transform'         : 'skew(0deg, '+dataSkew+'deg)'
					} );
				}	
				
	
				$this.bgParallax( "50%", dataSpeed );
				
				$window.on( 'scroll', function() {
					var scrolled = $window.scrollTop();
					$this.find( '.parallax-element' ).css( 'margin-top', ( scrolled * dataSpeed ) + 'px' );
				});	
		
			});
		
	
		}
		
	

    };

	

    theme.parallax = {
        pageLoaded : pageLoaded
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * 5. Overlay
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
    var documentReady = function( $ ) {
		
		$( '.overlay-bg' ).each(function() {
			
			var dataBgColor = $( this ).data( 'overlay-bg' ),
				dataBgOpacity = $( this ).data( 'overlay-opacity' );
			
			
			if( typeof dataBgColor != typeof undefined ) {
				
				if( typeof dataBgOpacity === typeof undefined ) { // If there is no data-xxx, save current source to it
					$( this ).attr( 'data-overlay-opacity', 1 );
					
				}
				
				$( this ).animate( { opacity: $( this ).data( 'overlay-opacity' ) }, 0 );
				
				$( this ).css( {
					'background-color': $( this ).data( 'overlay-bg' )
				} );
	
			}
			
			
			
		});		
	};
	
		
    theme.overlay = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 6. Scroll Reveal
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {

		/*
		// 'bottom', 'left', 'top', 'right'
		origin: 'bottom',

		// Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
		distance: '20px',

		// Time in milliseconds.
		duration: 500,
		delay: 0,

		// Starting angles in degrees, will transition from these values to 0 in all axes.
		rotate: { x: 0, y: 0, z: 0 },

		// Starting opacity value, before transitioning to the computed opacity.
		opacity: 0,

		// Starting scale value, will transition from this value to 1
		scale: 0.9,

		// Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
		easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',

		// `<html>` is the default reveal container. You can pass either:
		// DOM Node, e.g. document.querySelector('.fooContainer')
		// Selector, e.g. '.fooContainer'
		container: window.document.documentElement,

		// true/false to control reveal animations on mobile.
		mobile: true,

		// true:  reveals occur every time elements become visible
		// false: reveals occur once as elements become visible
		reset: false,

		// 'always' — delay for all reveal animations
		// 'once'   — delay only the first time reveals occur
		// 'onload' - delay only for animations triggered by first load
		useDelay: 'always',

		// Change when an element is considered in the viewport. The default value
		// of 0.20 means 20% of an element must be visible for its reveal to occur.
		viewFactor: 0.2,

		// Pixel values that alter the container boundaries.
		// e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
		// --
		// Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
		viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },

		// Callbacks that fire for each triggered element reveal, and reset.
		beforeReveal: function (domEl) {},
		beforeReset: function (domEl) {},

		// Callbacks that fire for each completed element reveal, and reset.
		afterReveal: function (domEl) {},
		afterReset: function (domEl) {}
		*/
		
		// jQuery.browser is a deprecated method, and you shouldn't really rely on UA testing this way either.
		if ( Modernizr.cssanimations ) {
			window.sr = ScrollReveal();
			if ( sr.isSupported() ) {
				sr.reveal( '.scroll-reveal', {
					delay    : 0,
					rotate   : { z: 0 },
					origin   : 'bottom',
					distance : '105px',
					duration : 800,
					scale    : 1
				} );
			}
			
		}

		
	};
	
		
    theme.scrollReveal = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

/*! 
 *************************************
 * 7. Navigation
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
			
			// Menu Hover
			var mTop = 15;
			$( 'ul.menu-main > li.multi-column > ul li ul' ).addClass( 'multi' );
			$( 'ul.menu-main > li:not(.multi-column) ul, li.multi-column > ul.sub-menu > li > ul, ul.menu-main li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );
			
			$( 'ul.menu-main li' ).on( 'mouseenter', function(){
				$( this ).find( ' > ul.sub-menu:not(.multi), .mega-arrow' ).show().animate( { marginTop: 0, opacity: 1 }, { duration: 150 } );
				
			}).on( 'mouseleave' , function(){
				$( this ).find( '.mega-arrow' ).hide().animate( { opacity: 0 }, { duration: 150 } );
				$( this ).find( ' > ul.sub-menu:not(.multi)' ).animate( { marginTop: mTop + 'px', opacity: 0 }, { duration: 150,
						complete: function() {
							$( this ).hide();
						} 
				} );		
			});
	
	
		
			//Add Sub-menu Arrow
			$( 'ul.menu-main li' ).each( function() {
				if ( $( this ).find( 'ul' ).length > 0 ) {
					$( this ).prepend( '<span class="nav-arrow"></span>' );
				}
				
			} );	
		
			
			// Mobile Menu
			if ( $( '.brand img' ).length > 0 ) {
				$( '.mobile-brand' ).html( '<img src="'+$( '.brand img' ).attr( 'src' )+'" alt="">' );
			} else {
				$( '.mobile-brand' ).html( '<img src=" ' + templateUrl + '/assets/images/blank.gif" alt="">' );
			};
			
			
		    var $toggle = $( '.menu-toggle' ),
			    $menuToBody = $( 'body' ),
				sidrname   = 'sidr-left',
				sidrside   = 'left';
			
		
		    if ( $( 'body' ).hasClass( 'rtl' ) ) {
				sidrname   = 'sidr-right';
				sidrside   = 'right';
			}
				
			$toggle.sidr({
				name: sidrname,
				side: sidrside,
				source: '.menu-container',
				body: $menuToBody,
				onOpen: function( ev ) {
				    $toggle.addClass( 'open' );

					var logoURL = $( '.sidr-class-mobile-brand img' ).attr( 'src' );
					if ( typeof logoURL !== typeof undefined && logoURL != '' ) {
						if ( logoURL.indexOf( 'blank.gif' ) >= 0 ) $( '.sidr-inner' ).css( 'margin-top', '-70px' );
					}	
					
					//Fix the icon class name
					$( '.sidr-class-fa' ).each( function()  {
						var liOldClass = $( this ).attr( 'class' );
						$( this ).addClass( liOldClass.replace(/sidr-class-/g, '' ) );
						
					});
					
					
				},	
				onClose: function() {
				    $toggle.removeClass( 'open' );
				}
			  
			});
			
			
			$( '.sidr li' ).on( 'click', function() {
				  
				  var arrowText = $( this ).find( '.sidr-nav-arrow' ).text().replace( /(.).*\1/g, "$1" );
				  $( this ).find( '> .sidr-class-sub-menu:not(.sidr-class-sub-sub)' ).toggle();
				
				  if ( arrowText != '-' ) {
					  $( this ).find( '.sidr-nav-arrow' ).text( '-' );
				  } else {
					  $( this ).find( '.sidr-nav-arrow' ).text( '+' );
				  }
				  
				  
			} );
		
		
	
			// Close the menu on window change
			$window.on( 'resize', function() {
				windowWidth  = $window.width();
				$.sidr( 'close', sidrname );
				$( '.menu-toggle' ).removeClass( 'open' );
				if ( windowWidth <= 768 ) sidrmenuInit(); 
			} );
			
			if ( windowWidth <= 768 ) {
			    sidrmenuInit(); 
			};
		
			
			function sidrmenuInit() {
	
				$( '.sidr-class-menu-main > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.sidr-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="sidr-nav-arrow">+</em>' );
						$( this ).find( 'ul ul' ).addClass( 'sidr-class-sub-sub' );
						$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0)' );
					}
				} );		

			};
			
			//Detect user scroll down or scroll up		
			var lastScrollTop = 0,
			    delta         = 5;
    
			$window.on( 'scroll', function() {
				
				// Show Toolbar when viewing site
				if ( $window.scrollTop() >= 46 ) {	
					$( '.admin-bar .menu-toggle' ).addClass( 'spy-scroll-postion' );
				}else{
					$( '.admin-bar .menu-toggle' ).removeClass( 'spy-scroll-postion' );
				};
		
				
				//---
				if ( $window.scrollTop() > 120 ) {	
					$( '.menu-container' ).addClass( 'spy-scroll-fixed' );
				}else{
					$( '.menu-container' ).removeClass( 'spy-scroll-fixed' );
				};
				
				//---
				var nowScrollTop = $(this).scrollTop();
				if ( Math.abs(lastScrollTop - nowScrollTop) >= delta ) {
					if ( nowScrollTop > lastScrollTop ) {
						// SCROLLING DOWN 
					} else {
						// SCROLLING UP 
						
					};
					lastScrollTop = nowScrollTop;
				};

				
			});	


			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				if ( typeof attr !== typeof undefined && attr !== false ) {
					if  ( $( this ).attr( 'href' ).indexOf( '/#' ) >= 0   || $( this ).attr( 'href' ) == '#' ) {
						$( this ).attr( 'data-normal', 1 ); 
					 }	
				}
					
			});
		

			
		
	};
	
		
    theme.navigation = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 8. Grid List
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
	
		$( '.iso-grid-container' ).each( function() {
			var type = $( this ).data( 'show-type' );
			
			// Masonry
			if ( type.indexOf( 'masonry' ) >= 0  ) {
				$( this ).addClass( 'masonry-container' );
				$( this ).find( '.iso-grid-item' ).addClass( 'masonry-item' );
			};
			
			// Filterable
			if ( type.indexOf( 'filter' ) >= 0  ) {
				$( this ).addClass( 'filter-container' );
				$( this ).find( '.iso-grid-item' ).addClass( 'filter-item' );	
			}	
		
		});
	
	    /*--  Function of Masonry  --*/
		var masonryObj = $( '.masonry-container .iso-grid-tiles' );
		imagesLoaded( masonryObj ).on( 'always', function() {
			  masonryObj.masonry({
				itemSelector: '.masonry-item'
			  });  
		});
		
		
	    /*--  Function of Filterable  --*/
		if ( $( "[data-show-type]" ).length > 0 ) {
			if ( $( "[data-show-type]" ).data( 'show-type' ).indexOf( 'filter' ) >= 0 ) {
				
				$( '.iso-grid-container' ).each( function() {
					var filterCat      = $( this ).data( 'filter-id' ),
						$grid          = $( this ).find( '.iso-grid-tiles' ),
						$filterOptions = $( filterCat );
						
					imagesLoaded( $grid ).on( 'always', function() {
						
						 $grid.shuffle({
							itemSelector : '.filter-item',
							speed        : 550, // Transition/animation speed (milliseconds).
							easing       : 'ease-out', // CSS easing function to use.
							sizer        : null // Sizer element. Use an element to determine the size of columns and gutters.
						  });
						  
						
						$filterOptions.find( 'li > a' ).on( 'click', function() {
							  var $this       = $( this ),
								  activeClass = 'current-cat',
								  isActive    = $this.hasClass( activeClass ),
								  group       = isActive ? 'all' : $this.data( 'group' );
						
							  // Hide current label, show current label in title
							  if ( !isActive ) {
								$filterOptions.find( '.' + activeClass ).removeClass( activeClass );
							  }
						
							  $this.toggleClass( activeClass );
						
							  // Filter elements
							  $grid.shuffle( 'shuffle', group );
							  
							  return false;	
						});
					
			
					});
	
					
				} );
		
				
			} else {
				$( '[data-group="all"]' ).parent( 'li' ).hide();
			}
	
		}
		
		
		
	};
	
		
    theme.gridList = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



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
				dataArrows   = $this.data( 'arrows' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			
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
				slideshow         : true,
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
				dataArrows   = $this.data( 'arrows' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			
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
				slideshow         : true,
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
		
		$( '.custom-theme-flexslider.custom-itemgrid' ).each( function( index )  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			
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
				slideshow         : true,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslides, //Fires when the slider loads the first slide
				after             : initslides, //Fires after each slider animation completes.
			    itemWidth         : 1,
				move              : 1, // Number of carousel items that should move on animation.
			    minItems          : getGridSizeS(), // use function to pull in initial value
			    maxItems          : getGridSizeS() // use function to pull in initial value
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
			if ( !slider.playing ) {
				slider.play();
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



/*! 
 *************************************
 * 10. Forms
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
		/*--- Hover Effect ----*/
		$( '.float-label' ).each( function(){
			
			var $this = $( this );
			
			// on focus add cladd active to label
			$this.focus( function() {
				$this.next().addClass( 'active' );
			});
			//on blur check field and remove class if needed
			$this.blur( function() {
				if( $this.val() === '' || $this.val() === 'blank') {
					$this.next().removeClass();
				}
			});
			
			// if exist cookie value
			if( $this.val() != '' && $this.val() != 'blank') { 
			    $this.next().addClass( 'active' );
			}
			
		});
		
		$( '.wp-search-submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		/*--- Input Validation ----*/
		var formData  = $( '[data-validate=3]' ).find( 'form' ).serializeArray();
		
		function formValidate( curname ) {
			
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			
			for (var input in formData ) {
				var element  = $( formData[input] ).attr( 'name' ),
					curname  = ( curname === '' || curname === 0  ) ? element : curname;
				
				
				/* --------- */
				if ( curname == 'author' ) {
					if ( $( '#' + curname ).val() == '' ) { 
						$( '#' + curname ).removeClass( 'valid' ).addClass( 'invalid' ).focus();
					} else {
						$( '#' + curname ).removeClass( 'invalid' ).addClass( 'valid' );
					}
				}
				
				/* --------- */
				if ( curname == 'email' ) {
					if ( reg.test( $( '#' + curname ).val() ) == false ) { 
						$( '#' + curname ).removeClass( 'valid' ).addClass( 'invalid' ).focus();
					} else {
						$( '#' + curname ).removeClass( 'invalid' ).addClass( 'valid' );
					}
				}
				
				/* --------- */
				if ( curname == 'comments' ) {
					if ( $( '#' + curname ).val() == '' ) { 
						$( '#' + curname ).removeClass( 'valid' ).addClass( 'invalid' ).focus();
					} else {
						$( '#' + curname ).removeClass( 'invalid' ).addClass( 'valid' );
					}
				}
				
			}
		
		}
		
		$( '[data-validate=3] input, [data-validate=3] textarea' ).on( 'keyup', function( event ) {
			
			formValidate( $( this ).attr( 'name' ) );
		});

		$( '[data-validate=3]' ).find( 'form' ).submit( function( event ) {
			
			var formOK     = true;
			
			for (var input in formData ) {
				var element  = $( formData[input] ).attr( 'name' );
				
				formValidate( element );	
				
				var invalid  = $( '#' + element ).hasClass( 'invalid' );
				
				if ( invalid ) {
					formOK = false;
					break;
				}
				
			}

			
			if ( formOK ) {
				$( '#submit' ).text(  'Live demo is unable to send data.'  ).attr(  'disabled',  'disabled'  );
			} else {
				/* Do not submit data */
				event.preventDefault(); 	
			}
            

		
		});
		
		
		
		
	};
	
		
    theme.forms = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * 11. Text effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
	//////////////// cipher
	var cipher = function() {
	  function e(a, d, b) {
		var c, f, g, h;
		b == a.length ? k.animationComplete = !0 : (g = d.innerHTML, h = Math.floor(21 * Math.random() + 5), c = 32 === a[b] ? 32 : a[b] - h, f = setInterval(function() {
		  d.innerHTML = g + String.fromCharCode(c);
		  c == a[b] ? (clearInterval(f), c = 32, b++, setTimeout(function() {
			e(a, d, b);
		  }, 10)) : c++;
		}, 5));
	  }
	  var k = {};
	  return k = {animationComplete:!1, text:function(a) {
		this.animationComplete = !1;
		a = document.getElementById(a);
		for (var d = a.innerHTML, b = [], c = 0;c < d.length;c++) {
		  b.push(d.charCodeAt(c));
		}
		a.innerHTML = "";
		e(b, a, 0);
	  }};
	}();


    var pageLoaded = function() {

		setTimeout(function() {
			if ( $( '#brand-text' ).text().length > 0 ) {
				cipher.text( 'brand-text' );
			}
			
		}, 1500 );	
		
    };

    theme.textEffect = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 12. Retina Graphics for Website
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		//Determine if you have retinal display
		var hasRetina  = false,
			rootRetina = (typeof exports === 'undefined' ? window : exports),
			mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
	
		if ( rootRetina.devicePixelRatio > 1 || rootRetina.matchMedia && rootRetina.matchMedia( mediaQuery ).matches ) {
			hasRetina = true;
		} 

		if ( hasRetina ) {
			//do something
			$( '[data-retina]' ).each( function() {
				$( this ).attr( {
					'src'     : $( this ).data( 'retina' ),
				} );
			});
		
		} 
	
		
	};
	
		
    theme.retina = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 13. Modal
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		function getTransitionDuration( elementOrSelector ){
			var $el, durString, isMS, numberStr, numberNum;
			$el = $( elementOrSelector );
			if( $el.length === 0 ){
				return false;
			}
			$el = $($el[0]); // Force just the first item.  need more?  use .each
			
			var dur = $el.css('transition-duration');
			if( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}
			
			durString = dur.toLowerCase();
			isMS = durString.indexOf( 'ms' ) >= 0;
			numberNum = durString.replace( 'ms', '' ).replace( 's', '' );
			return isMS ? numberNum : numberNum * 1000;
		};
		
	
	    $( 'body' ).prepend( '<div class="modal-mask"></div>' );
		$( '[data-modal-id]' ).on( 'click', function() {
			var dataID = $( this ).data( 'modal-id' ),
			    dataH  = $( this ).data( 'modal-height' ),
				dataW  = $( this ).data( 'modal-width' ),
				$obj   = $( '.modal-box#'+dataID );
			
			// Initializate modal
			$( this ).attr( 'href', 'javascript:void(0)' );
			$obj.find( '.content' ).css( 'overflow-y', 'hidden' );
			
			if ( $obj.length > 0 ) {
				if( typeof dataH != typeof undefined && dataH != '' ) {
					$obj.css( {'height': dataH } );
				}
				
				if( typeof dataW != typeof undefined && dataW != '' ) {
					$obj.css( {'width': dataW, 'left': 'calc( (100% - '+dataW+')/2 )' } );
				}
				
				$( '.modal-mask' ).fadeIn( 'fast' );
				$obj.addClass( 'active' );	
			}
			
			if ( $obj.hasClass( 'fullscreen' ) ) {
				setTimeout( function() {
					$( 'html' ).css( 'overflow-y', 'hidden' );
					$obj.find( '.content' ).css( 'overflow-y', 'scroll' );
				}, getTransitionDuration( '.modal-box#'+dataID ) );
				
			}
		
		});
		
		$( '.modal-box .close-btn' ).on( 'click', function() {
			$( this ).parent().removeClass( 'active' );
		});
		
		$( '.modal-box .close-btn, .modal-mask' ).on( 'click', function() {
			$( '.modal-box' ).removeClass( 'active' );
			$( '.modal-mask' ).fadeOut( 'fast' );
			$( '.modal-box' ).find( '.content' ).css( 'overflow-y', 'hidden' );
			$( 'html' ).css( 'overflow-y', 'auto' );
			setTimeout( function() {
	
			}, getTransitionDuration( '.modal-box:first' ) );
			
		});
		
	}
		
      
    theme.modalbox = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * 14. Tabs
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-tabs' ).each(function( id ) {
			var $this           = $( this ),
			    $li             = $this.find( 'ul > li' ),
				liNum           = $li.length,
				$contentbox     = $this.find( '.content' ),
				fullwidth       = $this.data( 'fullwidth' ),
				rotation        = $this.data( 'rotation' ),
				rotationPathLen = $this.data( 'rotation-path-len' ),
				rotationWrapper = $this.data( 'rotation-wrapper' ),
				rotationReverse = $this.data( 'rotation-reverse' ),
				rotationMove    = $this.data( 'rotation-move' ),
				tabBoxID        = id,
				isNumeric       = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			if( typeof fullwidth != typeof undefined && fullwidth == 1 ) {
				$li.css( 'width', ( 100 / liNum ) + '%' );
			}
			
			if( typeof rotation === typeof undefined ) {
				rotation = false;
			}	
			
			if( typeof rotationPathLen === typeof undefined ) {
				rotationPathLen = 360;
			}		
			
			if( typeof rotationWrapper === typeof undefined ) {
				rotationWrapper = 0;
			}		
			
			if( typeof rotationReverse === typeof undefined ) {
				rotationReverse = false;
			}	
			if( typeof rotationMove === typeof undefined ) {
				rotationMove = 0;
			}		
			
			
			$li.each( function( index ) {
				index = index + 1;
				$( this ).attr( 'href', 'javascript:' );
				$( this ).attr( 'data-tab', tabBoxID + '-tabs-show' + index );
			});
			$( $contentbox ).each( function( index ) {
				index = index + 1;
				$( this ).attr( 'id', tabBoxID + '-tabs-show' + index );
			});
			
			
			// Tab Rotation Effect
			if ( rotation ) {
				
				//reversing the order of child elements
				if ( rotationReverse ) $this.find( 'ul' ).html( $this.find( 'ul > li' ).get().reverse() );
				
				initLiPos( $this.find( 'ul' ), rotationPathLen, rotationWrapper, false );

			}
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				
				
				// Tab Rotation Effect
				if ( rotation ) {
					initLiPos( $this.find( 'ul' ), rotationPathLen, rotationWrapper, index * rotationMove );
				}
				
				return false;
				
				
			});
			
			$this.find( 'ul > li.active' ).trigger( 'click' );
			

			// Initialize li position
			function initLiPos( liWrapper, pathLen, degWrapper, clickDeg ) {
				
				var liArr      = liWrapper.find( 'li' ),
					angleStart = -360;
				
				
				if ( !isNumeric.test( clickDeg ) ) {
					clickDeg = 0;	
				}

				liWrapper
					.addClass( 'open' )
					.css({ 
							'-webkit-transform' : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)',
							'-ms-transform'     : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)',
							'transform'         : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)'
						});



				for( var i = 0; i < liArr.length; i++ ) {

					var deg = i * parseFloat( pathLen / liArr.length );

					if ( liWrapper.hasClass( 'open' ) ) {
						liRotate( liArr[i], deg, angleStart, degWrapper, clickDeg );

					} else {
						liRotate( liArr[i], angleStart, angleStart, degWrapper, clickDeg );
					}

				}


			
				
			}
			
			// Rotate animation
			function liRotate( obj, deg, angleStart, degWrapper, moveDeg ) {
				
				
				$( { deg: angleStart } ).animate( { deg: deg }, {
					step: function( now ) {

						
				
						if ( !isNumeric.test( moveDeg ) ) {
							moveDeg = 0;	
						}
						
						$( obj )
						   .css({ 
									'-webkit-transform' : 'rotate('+parseFloat( now )+'deg)',
									'-ms-transform'     : 'rotate('+parseFloat( now )+'deg)',
									'transform'         : 'rotate('+parseFloat( now )+'deg)'
								})
						   .find( 'a' )
						   .css({ 
									'-webkit-transform' : 'rotate('+ -parseFloat( now - moveDeg + degWrapper )+'deg)',
									'-ms-transform'     : 'rotate('+ -parseFloat( now - moveDeg + degWrapper )+'deg)',
									'transform'         : 'rotate('+ -parseFloat( now - moveDeg + degWrapper )+'deg)'
								});

						
						
					}, duration: 0 });
			}


			
			
				
			
		});
		

		
	}
		
      
    theme.customTabs = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 15. Mega Menu
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
		
		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit();
		}, 500 );
		
		$( window ).on('resize', function() {
			megaMenuInit();

		});
		
	
		// For the absolute coordinates of any jquery element 
		function getAbsoluteCoordinates( $element ) {
			var windowWidth     = $( window ).width(),
			    leftPos         = null;

			
			if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
				leftPos = ( $element.offset().left == 0 ) ? $element.parent().offset().left : $element.offset().left;
			} else {
				
				//($(window).width() - ($whatever.offset().left + $whatever.outerWidth()));
				leftPos = ( $element.offset().left == 0 ) ? ( windowWidth - ( $element.parent().offset().left + $element.parent().outerWidth() ) ) : ( windowWidth - ( $element.offset().left + $element.outerWidth() ) );
			}
				

			return leftPos;
		}	

		
		// Initialize mega menu
		function megaMenuInit() {
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height(),
				maxWidth     = 1170, //The maximum width of the mega menu wrapper
			    perDefaultW  = 220; //Default width of each column

			
			// Remove the html tag for mega menu item
			$( 'li.multi-column  > ul .multi-column-title, li.sidr-class-multi-column > ul .sidr-class-multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( windowWidth > 768 ){

				$( 'li.multi-column' ).each( function() {
					var root_li          = $( this ),
						col_total        = root_li.find( '> ul .multi-column-title' ).length,
						col_div          = root_li.find( '> ul .multi-column-title' ).closest( 'li' ),
						mega_div         = root_li.find( ' > ul.sub-menu' ),
						mega_div_w       = mega_div.width(),
						mega_single_w    = null,
						root_li_left     = null;
					
					
					// Add mega arrow
					if ( root_li.find( '.mega-arrow' ).length < 1 ) root_li.prepend( '<span class="mega-arrow"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( col_total > 0 ) {

						root_li_left     = getAbsoluteCoordinates( mega_div );
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > windowWidth ) maxWidth = windowWidth;
						
						
						if ( mega_div_w > maxWidth ) {

							mega_div_w       = maxWidth;
							mega_single_w    = maxWidth/col_total - 2.888;
							
							mega_div.find( '> li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								mega_div.css( {
									'margin-left' : ( - root_li_left ) + ( ( windowWidth - mega_div_w )/2 ) + 'px'
								} );
							} else {
								mega_div.css( {
									'margin-right' : ( - root_li_left ) + ( ( windowWidth - mega_div_w )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							mega_div.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );				
							
							var chkWidth = parseFloat( root_li_left  + mega_div_w );


							if ( chkWidth > windowWidth ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									mega_div.css( {
										'margin-left' : - ( chkWidth - windowWidth ) + 'px'
									} );
								} else {
									mega_div.css( {
										'margin-right' : - ( chkWidth - windowWidth ) + 'px'
									} );
								}	

							}	
							
								
							
						}
						
					
		
					}


				} );	

			}
		}
		

		
		
		
    };

    theme.megamenu = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );

/*! 
 *************************************
 * 16. Dropdown Categories
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });

	};
	
		
    theme.dropdownCat = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 17. Pagination
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.pagination-container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
	};
	
		
    theme.Pagination = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * 18. Counter
 *************************************
 */
//Custom Function
(function($){
	$.fn.jCustomCounter=function(options){
		var settings=$.extend({
            "animToLastFrameEvent": function () {
               
            },
			'start'    : 0,
			'end'      : 100,
			'easing'   : 'swing',
			'duration' : 400,
			'complete' : ''

		}
		,options);
		this.each(function(){
			
		
			var $this = $( this );

			$( { count: settings.start } ).animate( { count: settings.end }, {
				duration : settings.duration,
				easing   : settings.easing,
				step     : function() {
					var mathCount = Math.ceil( this.count );
					if ( mathCount < 10 ) {
						mathCount = '0' + mathCount;
					}
					$this.text( mathCount );
				},
				complete : settings.complete
			});

			
		})
	}
})(jQuery);	
		
		
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		//Counter initialize
		$( 'html, body' ).stop().animate({
			scrollTop: 2
		}, 100 );	
		
		
		$window.on( 'scroll', function() {

			var scrollTop = $window.scrollTop();
			counterInit( scrollTop );
			
			//Detecting when user scrolls to bottom of div
			var arrivedAtBottom = function () { 
				return scrollTop + $window.height() == $( document ).height(); 
			} 
			
			if( arrivedAtBottom() ) { 
				counterInit( 'go' );
			}
			
		});	
		

		function counterInit( sn ) {
			
			$( '[data-counter-number]' ).each(function() {
				
			
				var $this       = $( this ),
					activated   = $this.data( 'activated' ),//In order to avoid duplication of the running script with Uix Page Builder ( required )
				    dataNum     = $this.data( 'counter-number' ),
					dataDur     = $this.data( 'counter-duration' );
				

				if ( typeof activated === typeof undefined || activated === 0 ) {

					if( typeof dataNum === typeof undefined ) { // If there is no data-xxx, save current source to it
						dataNum = Math.floor( Math.random() * 100 );
					}	

					if( typeof dataDur === typeof undefined ) {
						dataDur = 3000;
					}	
					
					
					if ( 
						parseFloat( sn + 50 ) >= parseFloat( $this.offset().top - windowHeight/2 - 50 ) ||
						sn == 'go'
					) {
						
						
						$this.jCustomCounter({
							end      : dataNum,
							duration : dataDur
						});
						
						//Prevents front-end javascripts that are activated in the background to repeat loading.
						$this.data( 'activated', 1 );		
						
						
					}


	


				}	

				
	
			});
		}
		
		
		
		
    };

    theme.counter = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 19. Multiple columns full height for Bootstrap 3.x
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();


		// Close the menu on window change
		$window.on( 'resize', function() {
			windowWidth  = $window.width();
			if ( windowWidth > 768 ) {
				rowColInit( false ); 
			} else {
				rowColInit( true ); 
			}
		} );

		if ( windowWidth > 768 ) {
			rowColInit( false ); 
		} else {
			rowColInit( true ); 
		}


		function rowColInit( reset ) {


			$( '.row.full-height' ).each( function()  {
				var h = ( !reset ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( '> div' ).css( 'height', h );
			});


		};

		
		

    };

    theme.rowFullheight = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * 20. AJAX
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*
		 * Apply the original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		function applyOriginalScripts() {
			var pageLoaded    = theme.components.pageLoaded,
				documentReady = theme.components.documentReady;
			
			pageLoaded[2](); //Parallax
			documentReady[1]($); //Overlay
			
			
	 
		}
	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );




		