/**
 * ---------------------------
 * MAIN SCRIPTS
 * ---------------------------
 *
 * 
 * ## Project Name        :  Uix Kit
 * ## Description         :  Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap
 * ## Version             :  0.0.7
 * ## Last Update         :  January 24, 2018
 * ## Created             :  by UIUX Lab (https://uiux.cc)
 * ## Contact Us          :  uiuxlab@gmail.com
 * ## Compatible With     :  Bootstrap 3.x, Chinese, English
 * ## Compatible Browsers :  IE9, IE10, IE11, Firefox, Safari, Opera, Chrome, Edge
 * ## Released under the MIT license.
 */

/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	1. Header
	2. Loader
	3. Back to Top
	4. Overlay
	5. Navigation
	6. Videos
	7. Multiple columns full height for Bootstrap 3.x
	8. Mega Menu
	9. Dropdown Categories
	10. Pagination

	

*/

var templateUrl = wp_theme_custom_root_path.templateUrl,
	homeUrl     = wp_theme_custom_root_path.homeUrl;

//Determine whether it is a special browser
var is_safari   = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE        = !!window.ActiveXObject || "ActiveXObject" in window;     /*Test to 6 ~ 11 (not edge) */


var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="'+templateUrl+'/assets/images/blank.gif" alt="" style="display:none">' );
	}
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
	

		//-------- Sticky header area
		var waypoints = $( '.header-area' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

			},
			offset: -120
		});
		
		
		
		//-------- Header initialize
		headerInit();
		
		$( window ).on('resize', function() {
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
 * 3. Back to Top
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		// Add button to body for back to top
		$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		
		// Sticky button of back to top 
		var waypoints = $( '#toTop' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'active', direction === 'down' );

			},
			offset: -120
		});
		
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			$( 'html, body' ).stop().animate({
				scrollTop: 0
			}, { easing: 'easeOutQuart', duration: 500 } );	
		
		});
		
	   
		
		
    };

    theme.backtoTop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * 4. Overlay
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
 * 5. Navigation
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
		
			
		
			//Show Toolbar when viewing site for WordPress
			var waypoints = $( '.admin-bar .menu-toggle' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-postion', direction === 'down' );

				},
				offset: -46
			});

			// Sticky primary navigation
			var waypoints2 = $( '.menu-container' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

				},
				offset: -120
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
 * 6. Videos
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		//--------- Video Modal initialize
		//Check out: http://docs.videojs.com/tutorial-player-workflows.html
		$( 'video.video-js' ).each( function()  {
			$( this ).css({
				  'width'      : windowWidth - 80 + 'px',
				  'height'     : windowHeight - 150 + 'px'
			});
		});

		$( '.web-video-btn' ).on( 'click', function() {
			var vid = $( this ).data( 'video-id' ),
				myPlayer = videojs( vid, {
									  controlBar: {
										  muteToggle : false,
										  autoplay   : true,
										  loop       : true,
										  controls   : true,
										  controlBar : {
											muteToggle: false
										  }
									  }
									});		
			
			
			myPlayer.ready(function() {
				
				  // set, tell the player it's in fullscreen 
				  //myPlayer.exitFullscreen();
				  //myPlayer.requestFullscreen();
				  myPlayer.play();

			});
			
			$( '.modal-box .close-btn' ).on( 'click', function() {
				
				myPlayer.ready(function() {
				    myPlayer.pause();
				});				
				
			});
			
			
		});
		
		
		
    };

    theme.videos = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * 7. Multiple columns full height for Bootstrap 3.x
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


		}

		
		

    };

    theme.rowFullheight = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );





/*! 
 *************************************
 * 8. `Mega Menu`
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
 * 9. Dropdown Categories
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
 * 10. Pagination
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
 * Accordion
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
		$( '.custom-accordion' ).each(function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' ),
				$li             = $this.find( 'dl' ),
				$titlebox       = $this.find( 'dt' );
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.filter( '.active' ).find( 'dd' ).slideDown( 300 );
			}
			

			$titlebox.on( aEvent, function() {
				
				var $cur = $( this ).closest( 'dl' );
				
				if ( !$cur.hasClass( 'active' ) ) {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );

					$cur.addClass( 'active' );
					$cur.find( 'dd' ).slideDown( 300 );	
				} else {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );
				}
				
			}); 
			
		});
		
	};
	
		
    theme.accordion = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Counter
 *************************************
 */	
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
	
		$( '[data-counter-number]' ).each(function() {

			var $this = $( this );
			
			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					
					$this.countTo({
						dilimiter      : true,
						doubleDigits   : true
					});
					
					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  

			    },
			    offset: '100%' //0~100%, bottom-in-view
			});


		});

		
		
    };

    theme.counter = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*--------------------------------
 * Counter function 
 --------------------------------*/
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from            : $( this ).data( 'counter-start' ),
				to              : $( this ).data( 'counter-number' ),
				speed           : $( this ).data( 'counter-duration' ),
				refreshInterval : $( this ).data( 'counter-refresh-interval' ),
				dilimiter       : $( this ).data( 'counter-dilimiter' ),
				doubleDigits    : $( this ).data( 'counter-double-digits' )
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self      = this,
				$self     = $( this ),
				loopCount = 0,
				value     = settings.from,
				data      = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render( value ) {
				var formattedValue = Number( value ).toFixed();
				
				if ( settings.dilimiter && formattedValue > 0 ) {
					formattedValue = formattedValue.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
				}
				
				if (settings.doubleDigits) {
					if ( formattedValue < 10 ) {
						formattedValue = '0' + formattedValue;
					}
				}	
				
				
				$self.html( formattedValue );
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from           : 0,            // the number the element should start at
		number         : 0,            // the number the element should end at
		duration       : 500,         // how long it should take to count between the target numbers
		refreshInterval: 1,           // how often the element should be updated
		dilimiter      : true,        // the number of decimal places to show
		onUpdate       : null,        // callback method for every time the element is updated
		onComplete     : null,       // callback method for when the element finishes updating,
		doubleDigits   : false       // two digits are used by default
	};
	
	
}(jQuery));

/*! 
 *************************************
 * Form
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*--- Input File ----*/
		$( '.controls-file-container' ).each( function()  {
			var fileInput  = $( this ).find( 'input[type="file"]' ),
				fileBtn    = $( this ).find( '.controls-file-trigger' ),
				filePath   = $( this ).next( '.controls-file-return' );
			
			fileBtn.on( 'click', function() {
				fileInput.focusin();
			});	
			
			fileInput.on( 'change', function() {
				filePath.text( $( this ).val() );
			});	
			
		});

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
		//Using the jQuery Validation Plugin to check your form
		
		
	};
	
		
    theme.form = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Isometric Grid
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
			}
			
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
	
		
    theme.isometricGrid = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Mobile Menu with Sidr
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
			
			
			// Mobile Menu
			if ( $( '.brand img' ).length > 0 ) {
				$( '.mobile-brand' ).html( '<img src="'+$( '.brand img' ).attr( 'src' )+'" alt="">' );
			} else {
				$( '.mobile-brand' ).html( '<img src=" ' + templateUrl + '/assets/images/blank.gif" alt="">' );
			}
			
			
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
			}
		
			
			function sidrmenuInit() {
	
				$( '.sidr-class-menu-main > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.sidr-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="sidr-nav-arrow">+</em>' );
						$( this ).find( 'ul ul' ).addClass( 'sidr-class-sub-sub' );
						$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0);' );
					}
				} );		

			}
			
		
		
	};
	
		
    theme.mobileMenu = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Modal
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
		}
		
	
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
		
	};
		
      
    theme.modalbox = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Navigation Highlighting
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
        // Get section or article by href
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }
        // Get link by section or article id
        function getRelatedNavigation( el ) {
            return $( '.menu-main li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );
        } 
        
	    //-------- Navigation highlighting using waypoints
		if ( $( 'body' ).hasClass( 'onepage' ) ) {


			// Smooth scroll to content
			$( '.menu-main li > a' ).on('click', function(e) {
				e.preventDefault();

				$( 'html,body' ).animate({
					scrollTop: getRelatedContent( this ).offset().top - 20
				});
			});	

			//-------- Default cwaypoint settings
			var topSectionSpacing = $( '.header-area' ).outerHeight( true );
			var waypoints1 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {


					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'down' );
					$( this.element ).toggleClass( 'active', direction === 'down' );

				},
				offset: topSectionSpacing
			});	

			var waypoints2 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {

					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'up' );
					$( this.element ).toggleClass( 'active', direction === 'up' );

				},
				offset: function() {  
					return -$( this.element ).height() - topSectionSpacing; 
				}
			});	

			setTimeout( function() {
				$( '.menu-main li:first' ).addClass( 'active' );
			}, 1000 );	
		}

		
		
		
		
    };

    theme.navHighlight = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * Parallax
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
				
				$window.on( 'scroll touchmove', function() {
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
 * Pricing
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		
		//-------- Pricing initialize
		pricingInit();
		
		$( window ).on('resize', function() {
			pricingInit();

		});
		
		function pricingInit() {
			//Initialize the height
			$( '.custom-price' ).each( function(){


					//returns new id
					var $this            = $( this ),
						priceBGH         = Array(),
						priceBGH_excerpt = Array(),
						$initHeight      = $this.find( '.init-height' );

					$initHeight.each( function( index ) {
						//Screen protection of height
						$( this ).find( '.border,.excerpt' ).css( 'height', 'auto' );

						var tempheight = $( this ).height();
						var tempheight_excerpt = $( this ).find( '.excerpt' ).height();
						priceBGH.push( tempheight );
						priceBGH_excerpt.push( tempheight_excerpt );


					} );

					var priceBGH_Max = Math.max.apply( Math, priceBGH );


					if ( priceBGH_Max > 0 ) {
						if ( $( document.body ).width() > 768 ){

							// Initialize the height of all columns
							$initHeight.find( '.border' ).css( 'height', priceBGH_Max + 'px' );

							// Actived columns
							$initHeight.find( '.border.active' ).each( function() {

								var ty = Math.abs( parseInt( $( this ).css('transform').split(',')[5]));
								if ( !isNaN(ty) ) {
									$( this ).css( 'height', priceBGH_Max + ty*2 + 'px' );
								}

							});	



						} else {
							$initHeight.find( '.border' ).css( 'height', 'auto' );


						}


						// Actived columns
						$initHeight.find( '.border.active' ).each( function() {

							var textColor = $( this ).closest( '.border-hover' ).data( 'tcolor' ),
								btnColor  = $( this ).closest( '.border-hover' ).data( 'bcolor' );

							$( this ).css( 'background-color', btnColor );
							$( this ).find( '.button' ).removeClass( 'button-bg-primary' ).addClass( 'button-bg-secondary' );


						});	



					}


			});
		}
		
		


		
    };

    theme.pricing = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );







/*! 
 *************************************
 * Progress Bar
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    



		
    };

    theme.progressBar = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * Retina Graphics for Website
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
 * Scroll Reveal
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {

		//Reversing Scroll Animations in CSS with Waypoints
		if ( Modernizr.cssanimations ) {
			
			var $scrollRevealElements = $( '.scroll-reveal' ),
				waypoints             = $scrollRevealElements.waypoint({
				handler: function( direction ) {

					//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
					$( this.element ).addClass( 'animated fadeInUp' );

				},
				offset: '100%' //0~100%, bottom-in-view
			});

	
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
 * Slideshow ( with custom flexslider )
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		

		var $window            = $( window ),
			windowWidth        = $window.width(),
			windowHeight       = $window.height(),
			specialSliderType  = [ '.custom-primary-flexslider', '.custom-controls', '.custom-itemgrid', '.custom-counter-show' ];
		
		
		// Normal slideshow
		var $sliderDefault, specialSliderClasses = '';
		for ( var i = 0; i < specialSliderType.length; i++ ) {
			specialSliderClasses += ':not('+specialSliderType[i]+')';
		}
		$sliderDefault = $( '.custom-theme-flexslider' + specialSliderClasses );
		

		// callback function
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
	
		
        function initslidesItemgrid( slider ) {

			var prefix      = 'custom-theme',
				activeClass = prefix+'-flex-active-slide';
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
			$sliderItemgird.find( '.custom-theme-slides > div.item' ).removeClass( activeClass );
			$sliderItemgird.find( '.custom-theme-slides > div.item:eq('+parseFloat(slider.currentSlide+1)+')' ).addClass( activeClass );
			
	
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
		
		
		//-------  Initialize slideshow ( default )
		$sliderDefault.each( function( index )  {
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
		
		
		//-------  Initialize primary slideshow
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
	
		
		
		//-------  Initialize slideshow (custom controls)
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
		
		
		

		
		//-------  Initialize slideshow (display counter)
		$( '.custom-theme-flexslider.custom-counter-show' ).each( function( index )  {
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
		
	
	
		
		
		//-------  Initialize slideshow (with dynamic min/max ranges)
		
		//store the slider in a local variable
		var flexslider      = { vars:{} },
			$sliderItemgird = $( '.custom-theme-flexslider.custom-itemgrid' );
		
		// tiny helper function to add breakpoints
		function getGridSizeS() {
			return 3;
		}
		

		$sliderItemgird.each( function( index )  {
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

			
		});
		
		
		// check grid size on resize event
		$window.on( 'resize', function() {
			var gridSize = getGridSizeS();

			flexslider.vars.minItems = gridSize;
			flexslider.vars.maxItems = gridSize;
		});
		


		
	};
	
		
    theme.flexSlider = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );





/*! 
 *************************************
 * Sticky Elements 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			topSpacing   = $( '.header-area' ).outerHeight( true ) + 10;
		
		
		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + $window.height() ),
				targetTop   = parseFloat( $( document ).height() - 200 );

			//Detecting when user scrolls to bottom of div
			if ( dynamicTop >= targetTop ) {
				
				
				$( '.stick-widget.sticky' )
					  .css( {
						  'top'  : parseFloat( topSpacing - (dynamicTop - targetTop) ) + 'px'
					  } );
				
			}


		});	

		$( '.stick-widget' ).each( function()  {
			
			var $this      = $( this ),
				oWIdth     = $this.width();
			
			
			var	waypoints = $this.waypoint({

			  handler: function( direction ) {
				  
				  $this
					  .toggleClass( 'sticky', direction === 'down' )
					  .css( {
						  'width': oWIdth + 'px',
						  'top'  : topSpacing + 'px'
					  } );
				  
				

			  },

			  offset: topSpacing

			});	
		});


		
    };

    theme.stickyElements = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );





/*! 
 *************************************
 * Tabs
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-tabs' ).each(function( id ) {
			var $this             = $( this ),
			    $li               = $this.find( 'ul > li' ),
				liNum             = $li.length,
				$contentbox       = $this.find( '.content' ),
				ulWidth           = $this.data( 'width' ),
				fullwidth         = $this.data( 'fullwidth' ),
				rotation          = $this.data( 'rotation' ),
				rotationRadius    = $this.data( 'rotation-radius' ),
				rotationWapperDeg = $this.data( 'rotation-wrapper-angle' ),
				
				tabBoxID          = id,
				isNumeric         = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			if( typeof fullwidth != typeof undefined && fullwidth == 1 ) {
				$li.css( 'width', ( 100 / liNum ) + '%' );
			}
			
					
			
			if( typeof rotation === typeof undefined ) {
				rotation = false;
			}	
			
			
			if( typeof rotationWapperDeg === typeof undefined ) {
				rotationWapperDeg = 0;
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
				
				var increase   = Math.PI * 2 / liNum,
					radius     = rotationRadius,
					angle      = 0;
				
				//Initialize button position
				$this.find( 'ul' ).css({ 
							'-webkit-transform' : 'rotate('+ parseFloat( rotationWapperDeg ) +'deg)',
							'-ms-transform'     : 'rotate('+ parseFloat( rotationWapperDeg ) +'deg)',
							'transform'         : 'rotate('+ parseFloat( rotationWapperDeg ) +'deg)'
						})
						.find( '> li' )
						.css({ 
								'-webkit-transform' : 'rotate('+ -parseFloat( rotationWapperDeg )+'deg)',
								'-ms-transform'     : 'rotate('+ -parseFloat( rotationWapperDeg )+'deg)',
								'transform'         : 'rotate('+ -parseFloat( rotationWapperDeg )+'deg)'
							});
				
				
				$li.each( function( index ) {
					$( this ).css( {
						'left'              : Math.cos( - Math.PI / 2 + index * increase) * radius + 'px',
						'top'               : Math.sin( - Math.PI / 2 + index * increase) * radius + 'px'
					} );
					

					
					$( this ).on( 'click', function( e ) {
						
						var n        = $(this).index(),
							endAngle = n % liNum * increase; 


						( function turn() {
							if (Math.abs(endAngle - angle) > 1 / 8) {
								var sign = endAngle > angle ? 1 : -1;
								angle = angle + sign / 8;
								setTimeout(turn, 20);
							} else {
								angle = endAngle;
							}


							$li.each( function( index ) {
								$( this ).css( {
									'left'        : Math.cos( - Math.PI / 2 + index * increase - angle) * radius + 'px',
									'top'         : Math.sin( - Math.PI / 2 + index * increase - angle) * radius + 'px'
								} );

							});	


						})();	
						
					});
					
				});	
				

				
			}
			
			
			// Tab Sliding Effext
			$this.find( 'ul li:first' ).prepend( '<div class="marker"></div>' );
			
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				//sliding marker
				var translateX = $( this ).index() * 100;
				$this.find( '.marker' ).css({
					'-webkit-transform'  : 'translateX( '+translateX+'% )',
					'-ms-transform'      : 'translateX( '+translateX+'% )',
					'transform'          : 'translateX( '+translateX+'% )'	
				});
		
				
				return false;
				
				
			});
			
			// Init
			$this.find( 'ul > li.active' ).trigger( 'click' );
				
			
		});
		

		
	};
		
      
    theme.customTabs = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Testimonials Carousel
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		var $obj = $( '.custom-testimonials .flexslider' );
		$obj.flexslider({
			animation         : 'slide',
			slideshow         : true,
			smoothHeight      : true,
			controlNav        : true,
			manualControls    : '.slides-custom-control li',
			directionNav      : false,
			animationSpeed    : 600,
			slideshowSpeed    : 7000,
			selector          : ".slides > li",
			drag              : true,
			start: function(slider){
				$obj.on( 'mousedown', function( e ) {
					if ( $obj.data( 'flexslider' ).animating ) {
						return;
					}
						
					$( this ).addClass('dragging');
					$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
					$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
					$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );
				} );
			
				$obj.on( 'mouseup', function( e ) {
					if ( $obj.data('flexslider').animating ) {
						return;
					}
						
					$( this ).removeClass('dragging');
					var origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
					    origin_mouse_y = $( this ).data( 'origin_mouse_y' );
					
					if ( 'horizontal' === $obj.data('flexslider').vars.direction ) {
						if ( e.pageX > origin_mouse_x ) {
							$obj.flexslider('prev');
						}
						if ( e.pageX < origin_mouse_x ) {
							$obj.flexslider('next');
						}
					} else {
						if ( e.pageY > origin_mouse_y ) {
							$obj.flexslider('prev');
						}
						if ( e.pageY < origin_mouse_y ) {
							$obj.flexslider('next');
						}
					}
				} );
			}
		});
		
		
    };

    theme.testimonials = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );









/*! 
 *************************************
 * Text effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
	//////////////// cipher
	var cipher = function() {
	  function e(a, d, b) {
		var c, f, g, h;
          
        if ( b == a.length ) {
            k.animationComplete = !0;
        } else {
            g = d.innerHTML;
            h = Math.floor(21 * Math.random() + 5);
            
            if ( 32 === a[b] ) {
               c = 32; 
            } else {
               c = a[b] - h; 
            }
            
            f = setInterval(function() {
                
              d.innerHTML = g + String.fromCharCode(c);

                if ( c == a[b] ) {
                    clearInterval( f );
                    c = 32;
                    b++;

                    setTimeout( function() {
                        e(a, d, b);
                    }, 10 );

                } else {
                    c++;
                }

            }, 5 );
            
        }
          
          
	  }
	  var k = {};
        
	  return k = {
          animationComplete : !1, 
          text              : function(a) {
                                    this.animationComplete = !1;
                                    a = document.getElementById(a);
                                    for ( var d = a.innerHTML, b = [], c = 0; c < d.length; c++ ) {
                                      b.push( d.charCodeAt( c ) );
                                    }
                                    a.innerHTML = "";
                                    e(b, a, 0);
	                          }
      };
        
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
 * Timeline
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height(),
			$timeline        = $( '.list-timeline-container-outer.horizontal > .list-timeline-container' ),
			$item            = $timeline.find( '.list-timeline-item' );
				

		
		//--------  Timeline Event
		if ( windowWidth > 768 ) {
			$( '.list-timeline-container-outer-wrapper.horizontal' ).each( function()  {


				var $this = $( this );

				$this.css( 'height', $this.height() - 17 + 'px' ); //Scrollbar width is 17px by default


				$this.find( '.timeline-prev' ).on( 'click', function( e ) {
					e.preventDefault();
					timelinePrev( $this, false );
					return false;
				});

				$this.find( '.timeline-next' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineNext( $this, false );
					return false;
				});

				$this.find( '.list-timeline-item' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineNext( $this, $( this ) );
					return false;
				});



			});	
		}

		
		
		function timelinePrev( obj, iscur ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;
			}
			
			
			
			
			//loop the items
			if ( tLoop ) {
				if ( tarIndex < 0 ) tarIndex = itemTotal-1;
			} else {
				if ( tarIndex < 0 ) tarIndex = 0;
			}
			
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );

			//scroll left
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			
		}


		function timelineNext( obj, iscur ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;
			}
			
			
			
			
			//loop the items
			if ( tLoop ) {
				if ( tarIndex == itemTotal ) tarIndex = 0;
			} else {
				if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
			}
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );
			

			//scroll right
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			
		}




    };

    theme.timeline = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Video background
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		

		
		$( '.web-video-background-container' ).each( function()  {
			var $this       = $( this ).find( '> div' ),
				dataPoster  = $this.data( 'video-poster-src' ),
				dataMp4     = $this.data( 'video-mp4-src' ),
				dataWebm    = $this.data( 'video-webm-src' ),
				dataOgv     = $this.data( 'video-ogv-src' );

			$this.videoBG({
				mp4    : dataMp4,
				webm   : dataWebm,
				poster : dataPoster,
				scale  : true,
				zIndex : 0
			});
		});
			
		
		
    };

    theme.videoBackground = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


/**
 * @preserve Copyright 2011 Syd Lawrence ( www.sydlawrence.com ).
 * Version: 0.2
 *
 * Licensed under MIT and GPLv2.
 *
 * Usage: $('body').videoBG(options);
 *
 */

 (function( $ ){

  $.fn.videoBG = function( selector, options ) {
    if (options === undefined) {
      options = {};
    }
    if (typeof selector === "object") {
      options = $.extend({}, $.fn.videoBG.defaults, selector);
    }
    else if (!selector) {
      options = $.fn.videoBG.defaults;
    }
    else {
      return $(selector).videoBG(options);
    }

    var container = $(this);

    // check if elements available otherwise it will cause issues
    if (!container.length) {
      return;
    }

    // container to be at least relative
    if (container.css('position') == 'static' || !container.css('position')) {
      container.css('position','relative');
    }

    // we need a width
    if (options.width === 0) {
      options.width = container.width();
    }

    // we need a height
    if (options.height === 0) {
      options.height = container.height();
    }

    // get the wrapper
    var wrap = $.fn.videoBG.wrapper();
    wrap.height(options.height)
      .width(options.width);

    // if is a text replacement
    if (options.textReplacement) {

      // force sizes
      options.scale = true;

      // set sizes and forcing text out
      container.width(options.width)
        .height(options.height)
        .css('text-indent','-9999px');
    }
    else {

      // set the wrapper above the video
      wrap.css('z-index',options.zIndex+1);
    }

    // move the contents into the wrapper
    wrap.html(container.clone(true));

    // get the video
    var video = $.fn.videoBG.video(options);

    // if we are forcing width / height
    if (options.scale) {

      // overlay wrapper
      wrap.height(options.height)
        .width(options.width);

      // video
      video.height(options.height)
        .width(options.width);
    }

    // add it all to the container
    container.html(wrap);
    container.append(video);

    return video.find("video")[0];
  };

  // set to fullscreen
  $.fn.videoBG.setFullscreen = function($el) {
    var windowWidth = $(window).width(),
    windowHeight = $(window).height();

    $el.css('min-height',0).css('min-width',0);
    $el.parent().width(windowWidth).height(windowHeight);
    // if by width
    var shift = 0;
    if (windowWidth / windowHeight > $el.aspectRatio) {
      $el.width(windowWidth).height('auto');
      // shift the element up
      var height = $el.height();
      shift = (height - windowHeight) / 2;
      if (shift < 0) {
        shift = 0;
      }
      $el.css("top",-shift);
    } else {
      $el.width('auto').height(windowHeight);
      // shift the element left
      var width = $el.width();
      shift = (width - windowWidth) / 2;
      if (shift < 0) {
        shift = 0;
      }
      $el.css("left",-shift);

      // this is a hack mainly due to the iphone
      if (shift === 0) {
        var t = setTimeout(function() {
          $.fn.videoBG.setFullscreen($el);
        },500);
      }
    }

    $('body > .videoBG_wrapper').width(windowWidth).height(windowHeight);

  };

  // get the formatted video element
  $.fn.videoBG.video = function(options) {

    $('html, body').scrollTop(-1);

    // video container
    var $div = $('<div/>');
    $div.addClass('videoBG')
      .css('position',options.position)
      .css('z-index',options.zIndex)
      .css('top',0)
      .css('left',0)
      .css('height',options.height)
      .css('width',options.width)
      .css('opacity',options.opacity)
      .css('overflow','hidden');

    // video element
    var $video = $('<video/>');
    $video.css('position','absolute')
      .css('z-index',options.zIndex)
      .attr('poster',options.poster)
      .css('top',0)
      .css('left',0)
      .css('min-width','100%')
      .css('min-height','100%');

    if (options.autoplay) {
      $video.attr('autoplay',options.autoplay);
    }

    // if fullscreen
    if (options.fullscreen) {
      $video.bind('canplay',function() {
        // set the aspect ratio
        $video.aspectRatio = $video.width() / $video.height();
        $.fn.videoBG.setFullscreen($video);
      });

      // listen out for screenresize
      var resizeTimeout;
      $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          $.fn.videoBG.setFullscreen($video);
        },100);
      });
      $.fn.videoBG.setFullscreen($video);
    }


    // video standard element
    var v = $video[0];

    // if meant to loop
    if (options.loop) {
      loops_left = options.loop;

      // cant use the loop attribute as firefox doesnt support it
      $video.bind('ended', function(){

        // if we have some loops to throw
        if (loops_left) {
          // replay that bad boy
          v.play();
        }

        // if not forever
        if (loops_left !== true) {
          // one less loop
          loops_left--;
        }
      });
    }

    // when can play, play
    $video.bind('canplay', function(){

      if (options.autoplay) {
        // replay that bad boy
        v.play();
      }

    });


    // if supports video
    if ($.fn.videoBG.supportsVideo()) {

      // supports webm
      if ($.fn.videoBG.supportType('webm')){

        // play webm
        $video.attr('src',options.webm);
      }
      // supports mp4
      else if ($.fn.videoBG.supportType('mp4')) {

        // play mp4
        $video.attr('src',options.mp4);
      }
      // throw ogv at it then
      else {

        // play ogv
        $video.attr('src',options.ogv);
      }

    }

    // image for those that dont support the video
    var $img = $('<img/>');
    $img.attr('src',options.poster)
      .css('position','absolute')
      .css('z-index',options.zIndex)
      .css('top',0)
      .css('left',0)
      .css('min-width','100%')
      .css('min-height','100%');

    // add the image to the video
    // if suuports video
    if ($.fn.videoBG.supportsVideo()) {
      // add the video to the wrapper
      $div.html($video);
    }

    // nope - whoa old skool
    else {

      // add the image instead
      $div.html($img);
    }

    // if text replacement
    if (options.textReplacement) {

      // force the heights and widths
      $div.css('min-height',1).css('min-width',1);
      $video.css('min-height',1).css('min-width',1);
      $img.css('min-height',1).css('min-width',1);

      $div.height(options.height).width(options.width);
      $video.height(options.height).width(options.width);
      $img.height(options.height).width(options.width);
    }

    if ($.fn.videoBG.supportsVideo()) {
      v.play();
    }
    return $div;
  };

  // check if suuports video
  $.fn.videoBG.supportsVideo = function() {
    return (document.createElement('video').canPlayType);
  };

  // check which type is supported
  $.fn.videoBG.supportType = function(str) {

    // if not at all supported
    if (!$.fn.videoBG.supportsVideo()) {
      return false;
    }

    // create video
    var v = document.createElement('video');

    // check which?
    switch (str) {
      case 'webm' :
        return (v.canPlayType('video/webm; codecs="vp8, vorbis"'));
      case 'mp4' :
        return (v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
      case 'ogv' :
        return (v.canPlayType('video/ogg; codecs="theora, vorbis"'));
    }
    // nope
    return false;
  };

  // get the overlay wrapper
  $.fn.videoBG.wrapper = function() {
    var $wrap = $('<div/>');
    $wrap.addClass('videoBG_wrapper')
      .css('position','absolute')
      .css('top',0)
      .css('left',0);
    return $wrap;
  };

  // these are the defaults
  $.fn.videoBG.defaults = {
    mp4:'',
    ogv:'',
    webm:'',
    poster:'',
    autoplay:true,
    loop:true,
    scale:false,
    position:"absolute",
    opacity:1,
    textReplacement:false,
    zIndex:0,
    width:0,
    height:0,
    fullscreen:false,
    imgFallback:true
  };

})( jQuery );




/*! 
 *************************************
 * AJAX
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
			
			pageLoaded[0](); //Header
			documentReady[0]($); //Back to Top
			documentReady[1]($); //Overlay
			
			
	 
		}
	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


