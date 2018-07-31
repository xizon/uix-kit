/**
 * ---------------------------
 * MAIN SCRIPTS
 * ---------------------------
 *
 * 
 * ## Project Name        :  Uix Kit Demo
 * ## Project Description :  Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap
 * ## Based on            :  Uix Kit (https://github.com/xizon/uix-kit)
 * ## Version             :  2.0.0
 * ## Last Update         :  July 31, 2018
 * ## Powered by          :  UIUX Lab
 * ## Created by          :  UIUX Lab (https://uiux.cc)
 * ## Contact Us          :  uiuxlab@gmail.com
 * ## Compatible With     :  Bootstrap 3.x
 * ## Released under the MIT license.
 */

/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	1. Body And Header 
    2. Loader 
    3. Back to Top 
    4. Get all custom attributes of an element like "data-*" 
    5. Navigation 
    6. Videos 
    7. Common Height 
    8. Mega Menu 
    9. Dropdown Categories 
    10. Specify a background image 
    11. Pagination 
    12. Modal Dialog 
    13. Mobile Menu 
    14. 3D Background 
    15. 3D Background 2 
    16. 3D Background 2 
    17. 3D Carousel 
    18. 3D Model 
    19. 3D Pages 
    20. 3D Particle Effect 
    21. 3D Sphere Rotation 
    22. Accordion 
    23. Accordion Background Images 
    24. Advanced Content Slider 
    25. Advanced Slider (Special Effects) 
    26. Advanced Slider (Basic) 
    27. Circle Layout 
    28. Counter 
    29. Dropdown Menu 
    30. Dropdown Menu 2 (Multi-level drop-down navigation) 
    31. Dynamic Drop Down List from JSON 
    32. Flexslider 
    33. Form 
    34. Form Progress 
    35. jQuery UI Datepicker 1.11.4 
    36. Gallery 
    37. Image Shapes 
    38. Theme Scripts  
    39. Lava-Lamp Style Menu 
    40. Custom Lightbox 
    41. Bulleted List 
    42. Posts List With Ajax 
    43. Fullwidth List of Split 
    44. Mousewheel Interaction 
    45. Multiple Items Carousel 
    46. Full Page/One Page Transition 
    47. Full Page/One Page Transition 2 
    48. Parallax 
    49. Periodical Scroll 
    50. Pricing 
    51. Progress Bar 
    52. Retina Graphics for Website 
    53. Rotating Elements 
    54. Scroll Reveal 
    55. Show More Less 
    56. Smooth Scrolling When Clicking An Anchor Link 
    57. Source Code View 
    58. Sticky Elements 
    59. SVG Map (China) 
    60. SVG Map (World) 
    61. Tabs 
    62. Team Focus 
    63. Testimonials Carousel 
    64. Text effect 
    65. Timeline 
    66. Vertical Menu 
    67. Ajax Page Loader (Loading A Page via Ajax Into Div)  
    68. Ajax Push Content  
    69. GSAP Plugins 
    70. Three.js Plugins 


*/

if ( typeof jQuery === 'undefined' || typeof TweenMax === 'undefined' || typeof Waypoint === 'undefined' ) {
    throw new Error( 'Uix Kit\'s JavaScript requires jQuery, TweenMax, Waypoint.' );
}


//Global variables from front pages
var 
	//If the file is in the root directory, you can leave it empty. 
	//If in another directory, you can write: "/blog"
    templateUrl, 

	//Eg. https://uiux.cc
	homeUrl, 
	
	//Eg. https://uiux.cc/wp-admin/admin-ajax.php
	ajaxUrl; 


if ( typeof APP_ROOTPATH === 'undefined' ) {
    templateUrl = '';
	homeUrl     = '';
	ajaxUrl     = '';
} else {
    templateUrl = APP_ROOTPATH.templateUrl;
	homeUrl     = APP_ROOTPATH.homeUrl;
	ajaxUrl     = APP_ROOTPATH.ajaxUrl;
}


//Modify templateUrl as the correct path when local test is enabled
if ( location.hostname === 'localhost' || location.hostname === '127.0.0.1' ) {
    templateUrl = '/examples';
}


//Determine whether it is a special browser
var browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};



//Core scripts for current site
var APP = (function ( $, window, document ) {
    'use strict';

    var APP           = {},
        components    = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">' );
	}
	
	if( $.isFunction( $.fn.waitForImages ) ) {
		$( 'body' ).waitForImages( pageLoaded );
	} else {
		$( window ).on( 'load', pageLoaded );
	}
	
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

    APP.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    APP.components         = components;
    APP.documentReady      = documentReady;
	APP.pageLoaded         = pageLoaded;

    return APP;
}( jQuery, window, document ) ); 



/*
 * Create GUID / UUID
 *
 * @return {string}                        - The globally-unique identifiers.
 */
var crypto = window.crypto || window.msCrypto || null; // IE11 fix
var UIX_GUID = UIX_GUID || (function() {

    var EMPTY = '00000000-0000-0000-0000-000000000000';

    var _padLeft = function(paddingString, width, replacementChar) {
        return paddingString.length >= width ? paddingString: _padLeft(replacementChar + paddingString, width, replacementChar || ' ');
    };

    var _s4 = function(number) {
        var hexadecimalResult = number.toString(16);
        return _padLeft(hexadecimalResult, 4, '0');
    };

    var _cryptoGuid = function() {
        var buffer = new window.Uint16Array(8);
        window.crypto.getRandomValues(buffer);
        return [_s4(buffer[0]) + _s4(buffer[1]), _s4(buffer[2]), _s4(buffer[3]), _s4(buffer[4]), _s4(buffer[5]) + _s4(buffer[6]) + _s4(buffer[7])].join('-');
    };

    var _guid = function() {
        var currentDateMilliseconds = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(currentChar) {
            var randomChar = (currentDateMilliseconds + Math.random() * 16) % 16 | 0;
            currentDateMilliseconds = Math.floor(currentDateMilliseconds / 16);
            return (currentChar === 'x' ? randomChar: (randomChar & 0x7 | 0x8)).toString(16);
        });
    };

    var create = function() {
        var hasCrypto = crypto != 'undefined' && crypto !== null,
        hasRandomValues = typeof(window.crypto.getRandomValues) != 'undefined';
        return (hasCrypto && hasRandomValues) ? _cryptoGuid() : _guid();
    };

    return {
        newGuid: create,
        empty: EMPTY
    };
})();



/*
 * Hash Change Event
 *
 * @return {void}                        - The constructor.
 */
( function($){

  // Store the initial location.hash so that the event isn't triggered when
  // the page is first loaded.
  var last_hash = location.hash,

    // An id with which the polling loop can be canceled.
    timeout_id;

  // Special event definition.
  $.event.special.hashchange = {
    setup: function() {
      // If the event is supported natively, return false so that jQuery
      // will bind to the event using DOM methods instead of using the
      //  polling loop.
      if ( 'onhashchange' in window ) { return false; }

      // Start the polling loop if it's not already running.
      start();
    },
    teardown: function() {
      // If the event is supported natively, return false so that jQuery
      // will bind to the event using DOM methods instead of using the
      // polling loop.
      if ( 'onhashchange' in window ) { return false; }

      // Stop the polling loop. Since this event is only evern bound to
      // the `window` object, multiple-element tracking is unnecessary.
      stop();
    },
    add: function( handleObj ) {
      // Save a reference to the bound event handler.
      var old_handler = handleObj.handler;

      // This function will now be called when the event is triggered,
      // instead of the bound event handler.
      handleObj.handler = function(event) {

        // Augment the event object with the location.hash at the time
        // the event was triggered.
        event.fragment = location.hash.replace( /^#/, '' );

        // Call the originally-bound event handler, complete with modified
        // event object! The result from this call doesn't need to be
        // returned, because there is no default action to prevent, and 
        // nothing to propagate to.
        old_handler.apply( this, arguments );
      };
    }
  };

  // Start (or continue) the polling loop.
  function start() {
    // Stop the polling loop if it has already started.
    stop();

    // Get the current location.hash. If is has changed since the last loop
    // iteration, store that value and trigger the hashchange event.
    var hash = location.hash;
    if ( hash !== last_hash ) {
      $(window).trigger( 'hashchange' );
      last_hash = hash;
    }

    // Poll, setting timeout_id so the polling loop can be canceled.
    timeout_id = setTimeout( start, 100 );
  };

  // Stop the polling loop.
  function stop() {
    clearTimeout( timeout_id );
  };

})(jQuery);



/*
 * Get all attributes of an element using jQuery
 *
 * @return {array}                        - Returns a new array.
 */
( function( old ) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
} )( $.fn.attr );


/* 
 *************************************
 * <!-- Body And Header -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BODY_AND_HEADER               = APP.BODY_AND_HEADER || {};
	APP.BODY_AND_HEADER.version       = '0.0.2';
    APP.BODY_AND_HEADER.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		//-------- Header initialize
		headerInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				headerInit( windowWidth );
		

			}
		});
		function headerInit( w ) {
			if ( w > 768 ) {
				
				$( '.uix-header__placeholder.uix-header__placeholder--auto-height' ).css( 'height', $( '.uix-header__container' ).outerHeight() + 'px' ); 
				
				$( 'body' ).removeClass( 'is-mobile' );
			} else {
				$( 'body' ).addClass( 'is-mobile' );
			}
		}
		
		


		
		//-------- Sticky header area
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.uix-header__container' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});

		
    };

    APP.components.documentReady.push( APP.BODY_AND_HEADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


		
/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.LOADER               = APP.LOADER || {};
	APP.LOADER.version       = '0.0.2';
    APP.LOADER.documentReady = function( $ ) {

		// Disable devices scaling
		//-------------------------------------	
		document.addEventListener( 'touchstart', function (event) {
			if(event.touches.length>1){
				event.preventDefault();
			}
		});
		
		var lastTouchEnd=0;
		document.addEventListener( 'touchend', function (event) {
			var now=(new Date()).getTime();
			if( now-lastTouchEnd <= 300 ){
				event.preventDefault();
			}
			lastTouchEnd=now;
		},false);
		
		
		
		// Loader Process
		//-------------------------------------	
		$( 'body' ).waitForImages().progress( function( loaded, count, success ) {
			
			var per = parseInt( loaded/(count-1) * 100 );
			
			if ( $( 'img' ).length <= 1 ) {
				per = 100;
			}
			
			if ( isNaN( per ) ) per = 100;
			
			$( '.uix-loader-progress span' ).text( per + '%' );
			
			
		}).done( function() {
			
			//Event after loading is complete
			
			
			// Remove loader
			TweenMax.to( '.uix-loader, .uix-loader-progress', 0.5, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
							
			
			

		});    
		
    };

    APP.components.documentReady.push( APP.LOADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



			
/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BACK_TO_TOP               = APP.BACK_TO_TOP || {};
	APP.BACK_TO_TOP.version       = '0.0.2';
    APP.BACK_TO_TOP.documentReady = function( $ ) {

		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			$el          = $( '#uix-to-top' );


		//-------- Sticky button of back to top 
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		$( window ).on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = windowHeight/2;

		
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'active' );
			} else {
				$el.removeClass( 'active' );	
			}

		});


		//-------- Click event of back button
		$el.on( 'click', function( e ) {
			e.preventDefault();

			TweenMax.to( window, 0.5, {
				scrollTo: {
					y: 0  //y: "max" --> vertical scroll to bottom
				},
				ease: Power2.easeOut
			});	

			
			
			
			
		});	
			
		
		
    };

    APP.components.documentReady.push( APP.BACK_TO_TOP.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Get all custom attributes of an element like "data-*" -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.GET_CUSTOM_ATTRS               = APP.GET_CUSTOM_ATTRS || {};
	APP.GET_CUSTOM_ATTRS.version       = '0.0.1';
    APP.GET_CUSTOM_ATTRS.documentReady = function( $ ) {

		$( '[data-my-custom-datas]' ).each( function() {
			var $this         = $( this );

			
			//Get all attributes of an element and push the new attributes like "data-*"
			var curAttrs        = $this.attr(),
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-custom-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-custom-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		});
		
    };

    APP.components.documentReady.push( APP.GET_CUSTOM_ATTRS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Navigation -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.NAVIGATION               = APP.NAVIGATION || {};
	APP.NAVIGATION.version       = '0.0.4';
    APP.NAVIGATION.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			ulForDesktop = '.uix-menu__container:not(.is-mobile) ul.uix-menu';


		//-------- Menu selected (if it exists "data-current" property in <ul>)
		var curMenuIndex = $( ulForDesktop ).data( 'current' );
		if ( typeof curMenuIndex !== typeof undefined ) {
			$( ulForDesktop + ' > li:eq('+curMenuIndex+')' ).addClass( 'active' );
		}



		//-------- Menu Hover
		var mTop = 15;
		$( ulForDesktop + ' > li.multi-column > ul li ul' ).addClass( 'multi' );
		$( ulForDesktop + ' > li:not(.multi-column) ul, .uix-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, '+ulForDesktop+' li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );

		$( ulForDesktop + ' li' ).on( 'mouseenter', function(){


			TweenMax.set( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), {
				css: {
					opacity    : 0,
					display    : 'block',
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.to( this.target, 0.3, {
						css: {
							opacity    : 1,
							marginTop  : 0
						},
						ease   : Power2.easeOut
					});		



				}
			});				



		}).on( 'mouseleave' , function(){


			TweenMax.to( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), 0.3, {
				css: {
					opacity    : 0,
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.set( this.target, {
						css: {
							display    : 'none',
						}
					});		



				}
			});				

		});



		//-------- Add Sub-menu Arrow
		$( ulForDesktop + ' li' ).each( function() {
			if ( $( this ).find( 'ul' ).length > 0 ) {
				$( this ).prepend( '<span class="uix-menu__arrow"></span>' );
			}

		} );	



		//-------- Sticky primary navigation
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.uix-menu__container:not(.is-mobile)' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});
		

		//-------- Prevent to <a> of page transitions
		$( 'a' ).each( function() {
			var attr = $( this ).attr( 'href' );
			if ( typeof attr !== typeof undefined && attr !== false ) {
				if  ( $( this ).attr( 'href' ).indexOf( '/#' ) >= 0   || $( this ).attr( 'href' ) == '#' ) {
					$( this ).attr( 'data-normal', 1 ); 
				 }	
			}

		});
	
		
    };

    APP.components.documentReady.push( APP.NAVIGATION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Videos -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.VIDEOS               = APP.VIDEOS || {};
	APP.VIDEOS.version       = '0.0.6';
    APP.VIDEOS.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		
		/* 
		 ---------------------------
		 Video Embed
		 ---------------------------
		 */  
		$( '.uix-video' ).each( function()  {
			var $this          = $( this ),
				tempID         = 'video-' + UIX_GUID.newGuid(),
			    curVideoID     = tempID,
				coverPlayBtnID = 'videocover-' + curVideoID,
				videoWrapperW  = $this.closest( '[data-embed-video-wrapper]' ).width(),
				videoWrapperH  = $this.closest( '[data-embed-video-wrapper]' ).height(),
				dataAuto       = $this.data( 'embed-video-autoplay' ),
				dataLoop       = $this.data( 'embed-video-loop' ),
				dataControls   = $this.data( 'embed-video-controls' ),
				dataW          = $this.data( 'embed-video-width' ),
				dataH          = $this.data( 'embed-video-height' );

			
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
				
				//Prevent some devices from automatically playing video and trigger with buttons
				if ( !dataAuto || browser.isAndroid ) {
					$( '#' + coverPlayBtnID + ' .cover-play' ).show();
				}

			}
			
			
			
			 

			/* ---------  HTML5 video autoplay on mobile revisited  */
			if ( windowWidth <= 768 ) {
				$this.find( '.video-js' ).attr({
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
											  muteToggle: false,
										  
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
					}



					
					
					//Show this video wrapper
					$this.css( 'visibility', 'visible' );
					


					//Hide loading effect
					$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();

				});		
			


			
				
				/* ---------  Set, tell the player it's in fullscreen  */
				if ( dataAuto ) {

					myPlayer.muted( true ); //Fix an error of Video auto play is not working in browser
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
				



			});
			
		});
		
		
	
		/* 
		 ---------------------------
		 Video Popup Interaction
		 ---------------------------
		 */  
		var modalDialogTrigger = '[data-video-win]';
		
		//Add video container
		$( modalDialogTrigger ).each( function()  {
			
	
			var $this             = $( this ),
				videoSrcIfm       = '',
				videoSrcMp4       = $this.data( 'video-mp4' ),
				videoSrcWebm      = $this.data( 'video-webm' ),
				videoSrcOgv       = $this.data( 'video-ogv' ),
				videoPoster       = $this.data( 'video-poster' ),
				videoContainerMid = $this.data( 'modal-id' ),
				videoContainerVid = $this.data( 'video-id' );
				
			
			if( typeof videoSrcMp4 === typeof undefined ) {
				videoSrcMp4 = '';
			}	
			
			if( typeof videoSrcWebm === typeof undefined ) {
				videoSrcWebm = '';
			}	
			
			if( typeof videoSrcOgv === typeof undefined ) {
				videoSrcOgv = '';
			}		
			
			if ( $this.find( '[data-video-iframe]' ).length > 0 ) {
				videoSrcIfm = $this.find( '[data-video-iframe]' ).html();
			}
				
		
				
			//Add modal dialog
			if ( $( '#' + videoContainerMid ).length == 0 ) {
				
				var v      = '',
					vmp4   = '',
					vwebm  = '',
					vogv   = '';
				
				if ( videoSrcMp4 != '' ) {
					vmp4 = '<source src="'+videoSrcMp4+'" type="video/mp4">';
				}
				if ( videoSrcWebm != '' ) {
					vwebm = '<source src="'+videoSrcWebm+'" type="video/webm">';
				}
				if ( videoSrcOgv != '' ) {
					vogv = '<source src="'+videoSrcOgv+'" type="video/ogv">';
				}
				
				v += '<div class="uix-modal-box is-fullscreen is-video" id="'+videoContainerMid+'">';
				v += '<a href="javascript:void(0)" class="uix-modal-box__close"></a>';
				v += '<div class="uix-modal-box__content">';
				v += '<div class="uix-modal-box__video-waiting"></div><div class="uix-modal-box__video-container" data-video-player-init="0">';
				
				if ( $this.find( '[data-video-iframe]' ).length > 0 && videoSrcIfm != '' ) {
					//If iframe
					v += '<div id="'+videoContainerVid+'" class="embed-responsive embed-responsive-16by9">';
					v += videoSrcIfm;
					v += '</div>';			

				} else {
					//If local video
					v += '<video id="'+videoContainerVid+'" class="video-js vjs-default-skin" controls poster="'+videoPoster+'">';
					v += vmp4 + vwebm + vogv;
					v += '</video>';
				}

				v += '</div>';
				v += '</div>';
				v += '</div>';

				
				//Wait until previous .append() is complete
				$( v ).appendTo( 'body' );
	
			}
			
			
		});
		
		
		//Check out: http://docs.videojs.com/tutorial-player-workflows.html
		$( document ).on( 'click', modalDialogTrigger, function() {

			var vid          = $( this ).data( 'video-id' ),
				$ifm         = false,
				newMaxW      = windowWidth - 80,
				newMaxH      = windowHeight - 80,
				$vContainer  = $( '#' + vid ).closest( '.uix-modal-box__video-container' ),
				$vLoader     = $vContainer.prev( '.uix-modal-box__video-waiting' ),
				myPlayerInit = $vContainer.data( 'video-player-init' );

			

			//----- Hidden/Display the wrapper of video
			var displayVC = function() {
				
				TweenMax.set( $vContainer, {
					alpha: 1
				});
				$vLoader.removeClass( 'active' );
			};
			
			var hiddenVC = function() {
				
				TweenMax.set( $vContainer, {
					alpha: 0
				});

				$vLoader.addClass( 'active' );
			};

			
			

			
			//----- Embed iframe
			if ( $( '#' + vid ).find( 'iframe' ).length > 0 ) {
				$ifm = $( '#' + vid ).find( 'iframe' );
			} else {
				hiddenVC();
			}


			if ( $ifm && typeof $ifm === 'object' ) {

				if ( $ifm.length > 0 ) {

					var curW    = $ifm.width(),
						curH    = $ifm.height(),
						newW    = curW,
						newH    = curH;



					if ( curH > newMaxH ) {
						newH = newMaxH;

						//Scaled/Proportional Content 
						newW = curW*(newH/curH);

					}	

					if ( newW > newMaxW ) {
						newW = newMaxW;

						//Scaled/Proportional Content 
						newH = curH*(newW/curW);
					}	
					

					$ifm.css({
						'left'   : ( newMaxW - newW )/2 + 'px',
						'top'    : ( newMaxH - newH )/2 + 'px',
						'height' : newH + 'px',
						'width'  : newW + 'px'
					});	

					if ( windowWidth <= 768 ) {
						$ifm.css({
							'top'    : 0
						}).parent( '.embed-responsive' ).css({
							'top'    : ( newMaxH - newH )/2 + 'px'
						});		

					}


				}

				return false;
			}


			//----- HTML5 video autoplay on mobile revisited
			if ( windowWidth <= 768 ) {
				$( '#' + vid ).attr({
					'playsinline' : 'true'
				});
			}
			
			


			//----- Embed local video
			var myPlayer     = videojs( vid, {
									  width     : 1,
									  height    : 1,
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


				/* ---------  Video Modal initialize */
				myPlayer.on( 'loadedmetadata', function() {

					//Get Video Dimensions
					var curW    = this.videoWidth(),
						curH    = this.videoHeight(),
						newW    = curW,
						newH    = curH;

					//Resise modal
					if ( curH > newMaxH ) {
						newH = newMaxH;

						//Scaled/Proportional Content 
						newW = curW*(newH/curH);


					}


					if ( newW > newMaxW ) {
						newW = newMaxW;

						//Scaled/Proportional Content 
						newH = curH*(newW/curW);
					}	


					myPlayer
						.width( newW )
						.height( newH );


					//In order to allow CSS to support video centering
					$vContainer.find( ' > div.video-js' ).css({
						'width' : newW + 'px'
					});			
					
					
					//Vertically center the video area
					var mt = parseFloat( windowHeight - newH )/2 - 50;
					$vContainer.css({
						'transform' : 'translateY('+ mt +'px)'
					});			
					
					//Display the wrapper of video
					displayVC();
					
					//If a player instance has already been created for this variable.
					$vContainer.data( 'video-player-init', 1 );

					
				});

				/* ---------  Set, tell the player it's in fullscreen  */
				//myPlayer.exitFullscreen();
				//myPlayer.requestFullscreen();
				myPlayer.play();

				/* ---------  Disable control bar play button click */
				//myPlayer.controls( false );

				/* ---------  Display video playback progress  */
				myPlayer.on( 'timeupdate', function() {

					var duration = this.duration(),
					progressAmount = '0%';
					if (duration > 0) {
						progressAmount = ((this.currentTime() / duration) * 100) + "%";
					}

					//console.log( progressAmount );
				});

				/* ---------  Callback for when a video has ended */
				myPlayer.on( 'ended', function() {
					//console.log( 'video is done!' );
				});


			});

			
			/* ---------  Display the wrapper of video  */
			if ( myPlayerInit === 1 ) {
				displayVC();
			}
			
			
			/* ---------  Close the modal  */
			$( document ).on( 'click', '.uix-modal-box .uix-modal-box__close', function() {

				myPlayer.ready(function() {
					myPlayer.pause();
					
				});				

			});


		});
		
    };

    APP.components.documentReady.push( APP.VIDEOS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.COMMON_HEIGHT               = APP.COMMON_HEIGHT || {};
	APP.COMMON_HEIGHT.version       = '0.0.1';
    APP.COMMON_HEIGHT.pageLoaded    = function() {

	    $( '.js-uix-common-height' ).commonHeight();
		
    };

    APP.components.pageLoaded.push( APP.COMMON_HEIGHT.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Returns Common Height
 *
 * @param  {string} selector             - The current selector.
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.commonHeight = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
			selector : '[class*=col-], [class*=uix-core-grid__col-], [class*=uix-el-grid__col-]' //Bootstrap grid system and Custom seamless grid system
        }, options );
 
        this.each( function() {
			
			var $this        = $( this ),
				$window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height(),
				element      = $this,
				selectors    = settings.selector,
				maxHeight    = 0;


			element.children( selectors ).each( function() {
				var element = $( this ).children();
				
				//Solve the problem that the image cannot be read accurately
				element.find( 'img' ).each( function()  {
					var imgOuter = $( this ).parent( 'a' ).css( 'display' );
					if ( imgOuter == 'inline' ) {
						$( this ).parent( 'a' ).css( 'display', 'inline-block' );
					}
				});
				
				
				//Height condition judgment
				if( element.hasClass( 'max-height' ) ) {
					maxHeight = element.outerHeight();
				} else {
					if ( element.outerHeight() > maxHeight )
					maxHeight = element.outerHeight();
				}
			});

			

			//No on mobile devices
			commonHeightInit( windowWidth );
			
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( $window.width() != windowWidth ) {

					// Update the window width for next time
					windowWidth = $window.width();

					// Do stuff here
					commonHeightInit( windowWidth );


				}
			});

			
			function commonHeightInit( w ) {

				if ( w > 768 ) {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', maxHeight );
					});	
				} else {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', 'auto' );
					});		
				}


			}		
			

			
		});
 
    };
 
}( jQuery ));



/* 
 *************************************
 * <!-- Mega Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MEGAMENU               = APP.MEGAMENU || {};
	APP.MEGAMENU.version       = '0.0.1';
    APP.MEGAMENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit( windowWidth );
		}, 500 );
		
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				megaMenuInit( windowWidth );
		

			}
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
		function megaMenuInit( w ) {
			var $menuWrap  = $( '.uix-menu__container:not(.is-mobile)' ),
				maxWidth     = 1170, //The maximum width of the mega menu wrapper
				
				//This value is equal to the $nav-mega-li-w variable in the SCSS
			    perDefaultW  = 270; //Default width of each column

			
			//Basic Container
			if ( w > 1430 ) maxWidth = 1278;
			if ( w > 1600 ) maxWidth = 1410;
			
			
			
			// Remove the html tag for mega menu item
			$menuWrap.find( 'li.multi-column  > ul .multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( w > 768 ){

				$menuWrap.find( 'li.multi-column' ).each( function() {
					var root_li          = $( this ),
						col_total        = root_li.find( '> ul .multi-column-title' ).length,
						col_div          = root_li.find( '> ul .multi-column-title' ).closest( 'li' ),
						mega_div         = root_li.find( ' > ul.sub-menu' ),
						mega_div_w       = mega_div.width(),
						mega_single_w    = null,
						root_li_left     = null;
					
					
					// Add mega arrow
					if ( root_li.find( '.uix-menu__arrow-mega' ).length < 1 ) root_li.prepend( '<span class="uix-menu__arrow-mega"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( col_total > 0 ) {

						root_li_left     = getAbsoluteCoordinates( mega_div );
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > w ) maxWidth = w;
						
						
						if ( mega_div_w > maxWidth ) {

							mega_div_w       = maxWidth;
							mega_single_w    = maxWidth/col_total - 2.888;
							
							//Resetting the width of each column
							mega_div.find( '> li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							//Resetting the width of each <li> tag
							mega_div.find( '> li ul li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								mega_div.css( {
									'margin-left' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							} else {
								mega_div.css( {
									'margin-right' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							//Resetting the width of each column
							mega_div.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );	
							
							//Resetting the width of each <li> tag
							mega_div.find( '> li ul li' ).css( {
								'width' : perDefaultW + 'px'
							} );
								
							
							
							var chkWidth = parseFloat( root_li_left  + mega_div_w );


							if ( chkWidth > w ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									mega_div.css( {
										'margin-left' : - ( chkWidth - w ) + 'px'
									} );
								} else {
									mega_div.css( {
										'margin-right' : - ( chkWidth - w ) + 'px'
									} );
								}	

							}	
							
								
							
						}
						
					
		
					}


				} );	

			}
		}
			
		
    };

    APP.components.documentReady.push( APP.MEGAMENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Dropdown Categories -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_CAT               = APP.DROPDOWN_CAT || {};
	APP.DROPDOWN_CAT.version       = '0.0.1';
    APP.DROPDOWN_CAT.documentReady = function( $ ) {

		
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });
		
    };

    APP.components.documentReady.push( APP.DROPDOWN_CAT.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Pagination -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PAGINATION               = APP.PAGINATION || {};
	APP.PAGINATION.version       = '0.0.1';
    APP.PAGINATION.documentReady = function( $ ) {

		$( '.uix-pagination__container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
		
    };

    APP.components.documentReady.push( APP.PAGINATION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SET_BG               = APP.SET_BG || {};
	APP.SET_BG.version       = '0.0.1';
    APP.SET_BG.documentReady = function( $ ) {

		$( '[data-bg]' ).each( function() {
			var $this    = $( this ),
				config   = $this.data( 'bg' );


			if( typeof config === typeof undefined ) {
				config = {
					"src"      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
					"position" : "top left",
					"size"     : "cover",
					"repeat"   : "no-repeat",
					"fill"     : false,
				};
			}

			if ( config ) {

				var dataImg       = config.src,
					dataPos       = config.position,
					dataSize      = config.size,
					dataRepeat    = config.repeat;

				if( typeof dataPos === typeof undefined ) dataPos = 'top left';
				if( typeof dataSize === typeof undefined ) dataSize = 'cover';
				if( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';
				

				if ( typeof dataImg != typeof undefined && dataImg != '' ) {

					if ( config.fill ) {
						//Show Image Under Text
						if ( Modernizr.cssanimations ) {
							$this.css( {
								'background'               : 'url('+dataImg+') '+dataRepeat+'',
								'background-size'          : dataSize,
								'-webkit-background-clip'  : 'text',
								'-webkit-text-fill-color'  : 'transparent',
							} );	
	
						}


					} else {

						$this.css( {
							'background-image'    : 'url('+dataImg+')',
							'background-position' : dataPos,
							'background-size'     : dataSize,
							'background-repeat'   : dataRepeat
						} );	
					}

				}	
				
				
			}
		

			

		});
		
		
    };

    APP.components.documentReady.push( APP.SET_BG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.1';
    APP.MODAL_DIALOG.documentReady = function( $ ) {

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
		
		
		/*
		  * Unbind that one in a safe way that won't accidentally unbind other click handlers.
		  * In order to trigger other custom Modal Dialog events.
			
			$( '#element' ).off( 'click.MODAL_DIALOG' );
			$( '#element' ).off( 'click.MODAL_DIALOG_CLOSE' );
			
		*/
		
	
		if ( $( '.uix-modal-mask' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-modal-mask"></div>' );
		}
	    
		$( document ).on( 'click.MODAL_DIALOG', '[data-modal-id]', function() {
			var dataID = $( this ).data( 'modal-id' ),
			    dataH  = $( this ).data( 'modal-height' ),
				dataW  = $( this ).data( 'modal-width' ),
				$obj   = $( '.uix-modal-box#'+dataID );
			
			// Initializate modal
			$( this ).attr( 'href', 'javascript:void(0)' );
			$obj.find( '.uix-modal-box__content' ).addClass( 'js-uix-no-fullscreen' );
			
			
			if ( $( this ).data( 'video-win' ) ) {
				$obj.find( '.uix-modal-box__content' ).css( 'overflow-y', 'hidden' );
			}
			
			
			if ( $obj.length > 0 ) {
				if( typeof dataH != typeof undefined && dataH != '' ) {
					$obj.css( {'height': dataH } );
				}
				
				if( typeof dataW != typeof undefined && dataW != '' ) {
					$obj.css( {'width': dataW } );
				}
				
				TweenMax.set( '.uix-modal-mask', {
					css: {
						opacity : 0,
						display : 'none'
					},
					onComplete : function() {
						
						TweenMax.to( this.target, 0.3, {
							css: {
								opacity    : 1,
								display    : 'block'
							}
						});		
						
					}
				});

				$obj.addClass( 'active' );	
			}
			
			if ( $obj.hasClass( 'is-fullscreen' ) ) {
				setTimeout( function() {
					$( 'html' ).css( 'overflow-y', 'hidden' );
					
					if ( !$obj.hasClass( 'is-video' ) ) {
						$obj.find( '.uix-modal-box__content' ).css( 'overflow-y', 'scroll' );
					}
					
				}, getTransitionDuration( '.uix-modal-box#'+dataID ) );
				
			}
		
		});
		
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close', function() {
			$( this ).parent().removeClass( 'active' );
		});
		
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close, .uix-modal-mask', function() {
			$( '.uix-modal-box' ).removeClass( 'active' );
			TweenMax.to( '.uix-modal-mask', 0.3, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
				
			$( '.uix-modal-box' ).find( '.uix-modal-box__content' ).removeClass( 'js-uix-no-fullscreen' );
			$( 'html' ).css( 'overflow-y', 'auto' );
			setTimeout( function() {
	
			}, getTransitionDuration( '.uix-modal-box:first' ) );
			
		});
		
    };

    APP.components.documentReady.push( APP.MODAL_DIALOG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Mobile Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MOBILE_MENU               = APP.MOBILE_MENU || {};
	APP.MOBILE_MENU.version       = '0.0.2';
    APP.MOBILE_MENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();




		//-------- Show Toolbar when viewing site for WordPress
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.admin-bar .uix-menu-mobile__toggle' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 46;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});



		//-------- Mobile Menu
		var $toggle     = $( '.uix-menu-mobile__toggle' ),
			$toggleBody = $( 'body' );



		//-------- Add mobile menu to your website
		$( 'nav.uix-menu__container' ).clone().addClass( 'is-mobile' ).appendTo( 'body' );
		//Wait until previous .appendTo() is complete
		$.when( $( '.uix-menu__container.is-mobile' ).length > 0 ).then( function(){


			$toggle.on( 'touchstart click', function( e ) {
				e.preventDefault();

				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation(); 

				$( this ).toggleClass( 'is-opened' );
				if ( $( this ).hasClass( 'is-opened' ) ) {

					//Add mobile brand
					var logoURL = $( '.uix-brand--mobile img' ).attr( 'src' );
					if ( typeof logoURL !== typeof undefined && logoURL != '' ) {
						if ( logoURL.indexOf( 'blank.gif' ) >= 0 ) $( '.mobile-inner' ).css( 'margin-top', '-70px' );
					}	

					//Toggle effect
					$toggleBody.addClass( 'js-uix-menu-opened' );
				} else {
					$toggleBody.removeClass( 'js-uix-menu-opened' );
				}

			});

			//Mobile menu mask event
			$( '.uix-menu-mobile__mask' ).on( 'click', function() {
				$toggle.removeClass( 'is-opened' );
				$toggleBody.removeClass( 'js-uix-menu-opened' );
			});




			// Menu click event
			$( '.uix-menu__container.is-mobile ul li' ).on( 'click', function( e ) {

				  var arrowText = $( this ).find( '.uix-menu__arrow-mobile' ).text().replace( /(.).*\1/g, "$1" );
				  $( this ).find( '> .sub-menu:not(.sub-sub)' ).toggle();

				  if ( arrowText != '-' ) {
					  $( this ).find( '.uix-menu__arrow-mobile' ).text( '-' );
				  } else {
					  $( this ).find( '.uix-menu__arrow-mobile' ).text( '+' );
				  }


			} );


			mobileMenuInit( windowWidth ); 

			// Close the menu on window change
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( $window.width() != windowWidth ) {

					// Update the window width for next time
					windowWidth = $window.width();

					// Do stuff here
					$toggleBody.removeClass( 'js-uix-menu-opened' );
					$toggle.removeClass( 'is-opened' );
					mobileMenuInit( windowWidth );


				}
			});


		});



		/*
		 * Initialize mobile menu
		 *
		 * @param  {number} w                  - Returns width of browser viewport.
		 * @return {void}                      - The constructor.
		 */
		function mobileMenuInit( w ) {

			if ( w <= 768 ) {
				$( '.uix-menu__container.is-mobile .uix-menu > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.uix-menu__arrow-mobile' ).length < 1 ) $( this ).prepend( '<em class="uix-menu__arrow-mobile">+</em>' );
						$( this ).find( 'ul ul' ).addClass( 'sub-sub' );
						$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0);' );
					}
				} );		
			}


		}
		
    };

    APP.components.documentReady.push( APP.MOBILE_MENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- 3D Background -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_BACKGROUND               = APP._3D_BACKGROUND || {};
	APP._3D_BACKGROUND.version       = '0.0.2';
    APP._3D_BACKGROUND.documentReady = function( $ ) {


		//grab each 3dAnimate element and pass it into the animate function along with the config data
		$( '[data-3d-animate]' ).each( function( index, element ) {
			var config      = $( element ).data( '3d-animate' );
			
			
			if( typeof config === typeof undefined ) {
				config = false;
			}

			if ( config ) {
				
				if ( Object.prototype.toString.call( config.offset ) == '[object Array]' ) {
					animate3dMultiElement( config.offset[0], config.offset[1], element, config.reset );
				} else {
					animate3dElement( config.offset, element, config.reset );
				}

			}
			
			
		});
		
		
	
		/*
		 * Sets an animation for each element
		 *
		 * @param  {number} base           - Base offset value.
		 * @param  {object} obj            - An HTML element.
		 * @param  {boolean} reset         - Reset block on mouse leave
		 * @return {void}                  - The constructor.
		 */
		function animate3dElement( base, obj, reset ) {

			var $el      = $( obj ),
				w        = $el.innerWidth(),
				h        = $el.innerHeight();
			

//			TweenMax.set( $el, {
//				perspective    : 500,
//				transformStyle : "preserve-3d"
//			});


			
			// mouse move on block
			$( obj ).on( 'mousemove touchmove', function( e ) {
				
				var mX, 
					mY,
					rmX,
					rmY,
					touches = e.originalEvent.touches;
			
				if ( touches && touches.length ) {

					mX = touches[0].pageX;
					mY = touches[0].pageY;

				} else {

					mX = e.pageX;
					mY = e.pageY;
				}
				
				//Find mouse position relative to element
				rmX = mX - $( this ).offset().left;
				rmY = mY - $( this ).offset().top;	
				
				//console.log('X: ' + rmX + ' Y: ' + rmY );
	
				
				// function to run matrix3D effect on block
				var tX = mousePosition( rmX, w ),
					tY = mousePosition( rmY, h );


				TweenMax.to( $( this ), 0.2, {
					rotationY          : tX,
					rotationX          : tY,
					backgroundPosition : ( tX + 120 ) + "% 50%",
				});
				
				
				
			});
				
			
			if ( reset ) {
				$( obj ).on( 'mouseleave touchcancel', function() {
					TweenMax.to( $( this ), 0.5, {
						rotationY          : 0,
						rotationX          : 0,
						backgroundPosition : "120% 50%"
					});
				});	
			}
				


			// make some calculations for mouse position
			function mousePosition( mousePos, dimension ) {
				return ( Math.floor( mousePos / dimension * (base*2) ) - base );
			}

			
		}
			
		
		
		/*
		 * Sets an animation with parallax for each element
		 *
		 * @param  {number} base           - Base offset value.
		 * @param  {number} multiple       - The power of target number.
		 * @param  {object} obj            - An HTML element.
		 * @param  {boolean} reset         - Reset block on mouse leave
		 * @return {void}                  - The constructor.
		 */
		function animate3dMultiElement( base, multiple, obj, reset ) {

			//get the specs of the element
			var divOffset = $( obj ).offset(),
				divTop    = divOffset.top,
				divLeft   = divOffset.left,
				divWidth  = $( obj ).innerWidth(),
				divHeight = $( obj ).innerHeight();

			
	
			//set an onmousemove event on the element
			$( obj ).on( 'mousemove touchmove', function( e ){

				var pctX, 
					pctY,
					touches = e.originalEvent.touches;
			
				if ( touches && touches.length ) {

					pctX = ( touches[0].pageX - divLeft )/divWidth;
					pctY = ( touches[0].pageY - divTop )/divHeight;

				} else {

					pctX = ( e.pageX - divLeft )/divWidth;
					pctY = ( e.pageY - divTop )/divHeight;
				}

				
				

				$( this ).children().each( function( index, elementSub ) {
					var x         = pctX * ( base*Math.pow( multiple, index ) ),
						y         = pctY * ( base*Math.pow( multiple, index ) ),
						z         = 0,
						deg       = pctY * ( 180 / Math.PI ),
						rotateDeg = parseFloat( deg - 35 );
					
					
					TweenMax.to( $( elementSub ), 0.2, {
						css: {
							'transform' : 'translate('+ x +'px ,'+ y +'px) rotate3d( -1, 1, 0, '+ rotateDeg +'deg )'
						}
					});
			
					
				});

			});
			
			if ( reset ) {
				$( obj ).on( 'mouseleave touchcancel', function() {
					
					
					$( this ).children().each( function( index, elementSub ) {

						TweenMax.to( $( elementSub ), 0.5, {
							css: {
								'transform' : 'translate(0,0) rotate3d( -1, 1, 0, 0deg )'
							}
						});
					});
				});	
			}
						
			

		}
		
		
    };

    APP.components.documentReady.push( APP._3D_BACKGROUND.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- 3D Background 2 -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_BACKGROUND_THREE2               = APP._3D_BACKGROUND_THREE2 || {};
	APP._3D_BACKGROUND_THREE2.version       = '0.0.1';
    APP._3D_BACKGROUND_THREE2.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas2' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-background-three-canvas2';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			radius       = 100,
			theta        = 0,
			clickEnable   = false,
			newCameraX   = 0,
			newCameraY   = 0,
			newCameraZ   = 0;
		
		var mouse = new THREE.Vector2(), 
			INTERSECTED,
			INTERSECTED_CLICK,
			raycaster;
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);
			

			
			//controls
			controls = new THREE.OrbitControls( camera );
			controls.autoRotate = true;
			controls.autoRotateSpeed = 0.5;
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			
			controls.target.set( 30, 167, 81 );
			controls.update();			


			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0x555555 ) );

			light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 500, 2000 );
			scene.add( light );
			
			

			//WebGL Renderer	
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// Immediately use the texture for material creation
			generateGeometry( 'poly', 200 );


			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
			// When the mouse moves, call the given function
			raycaster = new THREE.Raycaster();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			
		
			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED != intersects[ 0 ].object ) {
					
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xffcc00 );
				}
			} else {
				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				INTERSECTED = null;
			}

			controls.update();
			
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
		
		
		function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			clickEnable = true;
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED_CLICK != intersects[ 0 ].object ) {
					
					INTERSECTED_CLICK = intersects[ 0 ].object;
					
					TweenMax.to( INTERSECTED_CLICK.scale, 1, {
						x: '+=' + ( 200 - INTERSECTED_CLICK.scale.x ) * 0.05,
						y: '+=' + ( 200 - INTERSECTED_CLICK.scale.y ) * 0.05,
						z: '+=' + ( 200 - INTERSECTED_CLICK.scale.z ) * 0.05
					});	
						
					
					INTERSECTED_CLICK.updateMatrix();	
					
				}
			} else {
				INTERSECTED_CLICK = null;
			}
			/*
			// Parse all the faces
			for ( var i in intersects ) {

				intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

			}
			*/		

			
			
			
		}
		function onDocumentMouseUp( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			
			theta = 0;
			clickEnable = false;
			
		}
			
		
		
		
		/*
		 * Batch generation of geometry
		 *
		 * @param  {string} objectType     - String of geometry type identifier.
		 * @param  {number} numObjects       - The total number of generated objects.
		 * @return {void}                  - The constructor.
		 */
		function generateGeometry( objectType, numObjects ) {

            var geometry;
			if ( objectType == "cube" ) {
				geometry = new THREE.BoxGeometry( 1, 1, 1 );
			} else if ( objectType == "sphere" ) {
				geometry = new THREE.IcosahedronGeometry( 1, 1 );

			} else if ( objectType == "poly" ) {
				geometry = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
			}

			
			var applyVertexColors = function( g, c ) {

				g.faces.forEach( function( f ) {

					var n = ( f instanceof THREE.Face3 ) ? 3 : 4;

					for ( var j = 0; j < n; j ++ ) {

						f.vertexColors[ j ] = c;

					}

				} );

			};

			for ( var i = 0; i < numObjects; i ++ ) {

				var position = new THREE.Vector3();

				position.x = Math.random() * 10000 - 5000;
				position.y = Math.random() * 6000 - 3000;
				position.z = Math.random() * 8000 - 4000;

				var rotation = new THREE.Euler();

				rotation.x = Math.random() * 2 * Math.PI;
				rotation.y = Math.random() * 2 * Math.PI;
				rotation.z = Math.random() * 2 * Math.PI;

				var scale = new THREE.Vector3();

				
				// give the geom's vertices a random color, to be displayed
				var color = new THREE.Color();
				
				color.setRGB( Math.random() + 0.1, 0, 0 );
				applyVertexColors( geometry, color );

				

				// Immediately use the texture for material creation
				var defaultMaterial     = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );

				displacementSprite  = new THREE.Mesh( geometry, defaultMaterial );
				displacementSprite.position.x = Math.random() * 800 - 400;
				displacementSprite.position.y = Math.random() * 800 - 400;
				displacementSprite.position.z = Math.random() * 800 - 400;
				displacementSprite.rotation.x = Math.random() * 2 * Math.PI;
				displacementSprite.rotation.y = Math.random() * 2 * Math.PI;
				displacementSprite.rotation.z = Math.random() * 2 * Math.PI;
				displacementSprite.scale.x = Math.random() + 5;
				displacementSprite.scale.y = Math.random() + 5;
				displacementSprite.scale.z = Math.random() + 5;
				
				
				scene.add( displacementSprite );


			}


		}
		
    };

    APP.components.documentReady.push( APP._3D_BACKGROUND_THREE2.documentReady );
    return APP;

}( APP, jQuery, window, document ) );








/* 
 *************************************
 * <!-- 3D Background 2 -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_BACKGROUND_THREE               = APP._3D_BACKGROUND_THREE || {};
	APP._3D_BACKGROUND_THREE.version       = '0.0.1';
    APP._3D_BACKGROUND_THREE.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-background-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-background-three-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			clock = new THREE.Clock();

		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0x555555 ) );

			light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 500, 2000 );
			scene.add( light );
			
			

			//WebGL Renderer		
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// Immediately use the texture for material creation
			var defaultMaterial    = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
			
			displacementSprite = new THREE.Mesh( generateGeometry( 'sphere', 200 ), defaultMaterial );
			scene.add( displacementSprite );


			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            var objVector = new THREE.Vector3(0,0.2,0.1),
				delta     = clock.getDelta();
			
			displacementSprite.rotation.x += delta * objVector.x;
			displacementSprite.rotation.y += delta * objVector.y;
			displacementSprite.rotation.z += delta * objVector.z;

			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			controls.update();
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		

		
		/*
		 * Batch generation of geometry
		 *
		 * @param  {string} objectType     - String of geometry type identifier.
		 * @param  {number} numObjects       - The total number of generated objects.
		 * @return {void}                  - The constructor.
		 */
		function generateGeometry( objectType, numObjects ) {

			var geometry = new THREE.Geometry();

			var applyVertexColors = function( g, c ) {

				g.faces.forEach( function( f ) {

					var n = ( f instanceof THREE.Face3 ) ? 3 : 4;

					for ( var j = 0; j < n; j ++ ) {

						f.vertexColors[ j ] = c;

					}

				} );

			};

			for ( var i = 0; i < numObjects; i ++ ) {

				var position = new THREE.Vector3();

				position.x = Math.random() * 10000 - 5000;
				position.y = Math.random() * 6000 - 3000;
				position.z = Math.random() * 8000 - 4000;

				var rotation = new THREE.Euler();

				rotation.x = Math.random() * 2 * Math.PI;
				rotation.y = Math.random() * 2 * Math.PI;
				rotation.z = Math.random() * 2 * Math.PI;

				var scale = new THREE.Vector3();

				var geom, color = new THREE.Color();

				scale.x = Math.random() * 200 + 100;

				if ( objectType == "cube" ) {

					geom = new THREE.BoxGeometry( 1, 1, 1 );
					scale.y = Math.random() * 200 + 100;
					scale.z = Math.random() * 200 + 100;
					color.setRGB( 0, 0, Math.random() + 0.1 );

				} else if ( objectType == "sphere" ) {

					geom = new THREE.IcosahedronGeometry( 1, 1 );
					scale.y = scale.z = scale.x;
					color.setRGB( Math.random() + 0.1, 0, 0 );

				} else if ( objectType == "poly" ) {


					geom = new THREE.CylinderGeometry( 3, 6, 3, 5, 1 );
					scale.y = Math.random() * 30;
					scale.z = Math.random() * 30;
					color.setRGB( Math.random() + 0.1, 0, 0 );

				}


				// give the geom's vertices a random color, to be displayed
				applyVertexColors( geom, color );

				var object = new THREE.Mesh( geom );
				object.position.copy( position );
				object.rotation.copy( rotation );
				object.scale.copy( scale );
				object.updateMatrix();

				geometry.merge( object.geometry, object.matrix );

			}

			return geometry;
			

		}

		
    };

    APP.components.documentReady.push( APP._3D_BACKGROUND_THREE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- 3D Carousel -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_CAROUSEL               = APP._3D_CAROUSEL || {};
	APP._3D_CAROUSEL.version       = '0.0.1';
    APP._3D_CAROUSEL.documentReady = function( $ ) {

		$( '.uix-3d-carousel' ).each( function() {
			var $this             = $( this ),
				dataTiming        = $this.data( 'timing' ),
				dataPrevBtn       = $this.data( 'prev-btn' ),
				dataNextBtn       = $this.data( 'next-btn' ),
				dataDraggable     = $this.data( 'draggable' ),
			    autoSwap          = null,
				$wrapper          = $this.find( '> ul' ),
				$items            = $wrapper.find( '> li' ),
				items             = [],
				startItem         = 1,
				position          = 0,
				itemCount         = $items.length,
				leftpos           = itemCount,
				resetCount        = itemCount;

			if( typeof dataTiming === typeof undefined ) dataTiming = 5000;
			if( typeof dataPrevBtn === typeof undefined ) dataPrevBtn = ".my-carousel-3d-prev";
			if( typeof dataNextBtn === typeof undefined ) dataNextBtn = ".my-carousel-3d-next";
			if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
			

			//Avoid problems caused by insufficient quantity
			//-------------------------------------		
			if ( itemCount == 3 ) {
				var $clone3 = $items.eq(1).clone();
				$items.last().after( $clone3 );
			}
			
			if ( itemCount == 2 ) {
				var $clone2_1 = $items.eq(0).clone(),
					$clone2_2 = $items.eq(1).clone();
				$items.last().after( [$clone2_1, $clone2_2 ] );
			}
			
			if ( itemCount == 1 ) {
				var $clone1_1 = $items.eq(0).clone(),
					$clone1_2 = $items.eq(0).clone(),
					$clone1_3 = $items.eq(0).clone();
					
				$items.last().after( [$clone1_1, $clone1_2, $clone1_3 ] );
			}		
			

			//New objects of items and wrapper
			$wrapper  = $this.find( '> ul' );
			$items = $wrapper.find( '> li' );
			itemCount = $items.length;
			leftpos  = itemCount;
			resetCount = itemCount;

			//Adding an index to an element makes it easy to query
			//-------------------------------------	
			$items.each( function( index ) {
				items[index] = $( this ).text();
				$( this ).attr( 'id', index+1 );

			});

			//Pause slideshow and reinstantiate on mouseout
			//-------------------------------------	
			$wrapper.on( 'mouseenter', function() {
				clearInterval( autoSwap );
			} ).on( 'mouseleave' , function() {
				autoSwap = setInterval( itemUpdates, dataTiming );
			} );


			
			//Initialize the default effect
			//-------------------------------------	
			itemUpdates( 'clockwise' );
			
			
			//The matched click events for the element.
			//-------------------------------------	
			$( dataPrevBtn ).on( 'click', function( e ) {
				e.preventDefault();
				itemUpdates( 'clockwise' );
				return false;
				
			});
			$( dataNextBtn ).on( 'click', function( e ) {
				e.preventDefault();
				itemUpdates( 'counter-clockwise' );
				return false;
				
			});
			
			
			$items.on( 'click', function( e ) {
				e.preventDefault();

				if ( $( this ).attr( 'class' ) == 'uix-3d-carousel__item uix-3d-carousel__item--left-pos' ) {
					itemUpdates( 'counter-clockwise' );
				} else {
					itemUpdates( 'clockwise' );
				}
			});


			//Drag and Drop
			//-------------------------------------	
			var $dragDropTrigger = $wrapper;

			//Mouse event
			$dragDropTrigger.on( 'mousedown._3D_CAROUSEL touchstart._3D_CAROUSEL', function( e ) {
				e.preventDefault();

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

				$dragDropTrigger.on( 'mouseup._3D_CAROUSEL touchmove._3D_CAROUSEL', function( e ) {
					e.preventDefault();

					$( this ).removeClass( 'dragging' );
					var touches        = e.originalEvent.touches,
						origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
						origin_mouse_y = $( this ).data( 'origin_mouse_y' );

					if ( touches && touches.length ) {

						var deltaX = origin_mouse_x - touches[0].pageX,
							deltaY = origin_mouse_y - touches[0].pageY;

						if ( deltaX >= 50) {
							//--- left
							itemUpdates( 'clockwise' );


						}
						if ( deltaX <= -50) {
							//--- right
							itemUpdates( 'counter-clockwise' );


						}
						if ( deltaY >= 50) {
							//--- up


						}
						if ( deltaY <= -50) {
							//--- down

						}

						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$dragDropTrigger.off( 'touchmove._3D_CAROUSEL' );
						}	


					} else {

						if ( dataDraggable ) {
							//right
							if ( e.pageX > origin_mouse_x ) {
								itemUpdates( 'counter-clockwise' );
							}

							//left
							if ( e.pageX < origin_mouse_x ) {
								itemUpdates( 'clockwise' );
								
							}

							//down
							if ( e.pageY > origin_mouse_y ) {

							}

							//up
							if ( e.pageY < origin_mouse_y ) {

							}	

							$dragDropTrigger.off( 'mouseup._3D_CAROUSEL' );

						}	



					}



				} );




			} );
			

			/*
			 * Swap Between Images
			 *
			 * @param  {string} action           - Direction of movement, optional: clockwise, counter-clockwise
			 * @return {void}                    - The constructor.
			 */
			function itemUpdates( action ) {
				var direction = action;

				//moving carousel backwards
				if ( direction == 'counter-clockwise' ) {
					var leftitem = parseFloat( $wrapper.find( '> li.uix-3d-carousel__item--left-pos' ).attr( 'id' ) - 1 );
					if ( leftitem == 0 ) {
						leftitem = itemCount;
					}

					$wrapper.find( '> li.uix-3d-carousel__item--right-pos' ).removeClass( 'uix-3d-carousel__item--right-pos' ).addClass( 'uix-3d-carousel__item--back-pos' );
					$wrapper.find( '> li.uix-3d-carousel__item--main-pos' ).removeClass( 'uix-3d-carousel__item--main-pos' ).addClass( 'uix-3d-carousel__item--right-pos' );
					$wrapper.find( '> li.uix-3d-carousel__item--left-pos' ).removeClass( 'uix-3d-carousel__item--left-pos' ).addClass( 'uix-3d-carousel__item--main-pos' );
					$wrapper.find( '> li#' + leftitem + '').removeClass( 'uix-3d-carousel__item--back-pos' ).addClass( 'uix-3d-carousel__item--left-pos' );

					startItem--;

					if ( startItem < 1 ) {
						startItem = itemCount;
					}
				}

				//moving carousel forward
				if ( direction == 'clockwise' || direction == '' || direction == null ) {
					var carousel3DPos = function( dir ) {
						if ( dir != 'leftposition' ) {
							//increment image list id
							position++;

							//if final result is greater than image count, reset position.
							if ( startItem + position > resetCount ) {
								position = 1 - startItem;
							}
						}

						//setting the left positioned item
						if (dir == 'leftposition') {
							//left positioned image should always be one left than main positioned image.
							position = startItem - 1;

							//reset last image in list to left position if first image is in main position
							if (position < 1) {
								position = itemCount;
							}
						}

						return position;
					};

					$wrapper.find( '> li#' + startItem + '').removeClass( 'uix-3d-carousel__item--main-pos' ).addClass( 'uix-3d-carousel__item--left-pos' );
					$wrapper.find( '> li#' + (startItem + carousel3DPos()) + '').removeClass( 'uix-3d-carousel__item--right-pos' ).addClass( 'uix-3d-carousel__item--main-pos' );
					$wrapper.find( '> li#' + (startItem + carousel3DPos()) + '').removeClass( 'uix-3d-carousel__item--back-pos' ).addClass( 'uix-3d-carousel__item--right-pos' );
					$wrapper.find( '> li#' + carousel3DPos( 'leftposition' ) + '').removeClass( 'uix-3d-carousel__item--left-pos' ).addClass( 'uix-3d-carousel__item--back-pos' );

					startItem++;
					position = 0;
					if ( startItem > itemCount ) {
						startItem = 1;
					}
				}
			}

			

		});

		
    };

    APP.components.documentReady.push( APP._3D_CAROUSEL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- 3D Model -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_MODEL               = APP._3D_MODEL || {};
	APP._3D_MODEL.version       = '0.0.1';
    APP._3D_MODEL.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-model-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-model-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite,
			radius       = 100,
			theta        = 0,
			clickEnable   = false,
			newCameraX   = 0,
			newCameraY   = 0,
			newCameraZ   = 0;
		
		var mouse = new THREE.Vector2(), 
			INTERSECTED,
			INTERSECTED_CLICK,
			raycaster;
		
		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);
			

			
			//controls
			controls = new THREE.OrbitControls( camera );
			controls.autoRotate = true;
			controls.autoRotateSpeed = 0.5;
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 100;
			controls.maxDistance = 500;
			controls.maxPolarAngle = Math.PI / 2;
			
			controls.target.set( 30, 167, 81 );
			controls.update();			


			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0xcccccc, 0.4 ) );

			light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 500, 2000 );
			scene.add( light );
			
			

			//WebGL Renderer	
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// Immediately use the texture for material creation
			var manager = new THREE.LoadingManager();
			manager.onProgress = function ( item, loaded, total ) {

				console.log( item, loaded, total );

			};

			var textureLoader = new THREE.TextureLoader( manager ),
				texture       = textureLoader.load( templateUrl + '/assets/models/obj/project.png' ),
				onProgress    = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				},
				onError       = function ( xhr ) { };
			
			
			var loader        = new THREE.OBJLoader( manager );
			loader.load( templateUrl + '/assets/models/obj/project.obj', function ( object ) {

				object.traverse( function ( child ) {

					if ( child instanceof THREE.Mesh ) {

						child.material.map = texture;

					}

				} );

				object.scale.set( 165, 165, 165 );
				object.position.y = 100;
				scene.add( object );

			}, onProgress, onError );

			
			

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
			// When the mouse moves, call the given function
			raycaster = new THREE.Raycaster();
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
            theta += 0.1;
			
			
		
			//To set a background color.
			//renderer.setClearColor( 0x000000 );	
			
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED != intersects[ 0 ].object ) {
					
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xffcc00 );
				}
			} else {
				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				INTERSECTED = null;
			}

			controls.update();
			
			
			renderer.render( scene, camera );
			
			

			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		
		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
		
		
		function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			clickEnable = true;
			
			//Mouse interactions
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( scene.children );
			if ( intersects.length > 0 ) {
				if ( INTERSECTED_CLICK != intersects[ 0 ].object ) {
					
					INTERSECTED_CLICK = intersects[ 0 ].object;
					
					TweenMax.to( INTERSECTED_CLICK.scale, 1, {
						x: '+=' + ( 200 - INTERSECTED_CLICK.scale.x ) * 0.05,
						y: '+=' + ( 200 - INTERSECTED_CLICK.scale.y ) * 0.05,
						z: '+=' + ( 200 - INTERSECTED_CLICK.scale.z ) * 0.05
					});	
						
					
					INTERSECTED_CLICK.updateMatrix();	
					
				}
			} else {
				INTERSECTED_CLICK = null;
			}
			/*
			// Parse all the faces
			for ( var i in intersects ) {

				intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

			}
			*/		

			
			
			
		}
		function onDocumentMouseUp( event ) {
			event.preventDefault();
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			
			theta = 0;
			clickEnable = false;
			
		}
			
		

		
    };

    APP.components.documentReady.push( APP._3D_MODEL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_PAGES               = APP._3D_PAGES || {};
	APP._3D_PAGES.version       = '0.0.1';
    APP._3D_PAGES.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-renderer' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			viewRenderer              = '3D-renderer';
		
		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			clock = new THREE.Clock();

		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 1000;
			controls.maxDistance = 1500;
			controls.maxPolarAngle = Math.PI / 2;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			light = new THREE.HemisphereLight( 0xffbf67, 0x15c6ff );
			scene.add( light );

			//WebGL Renderer
			renderer = new THREE.WebGLRenderer( { 
									alpha    : true, 
									antialias: true 
								} );
			renderer.setClearColor( 0xffffff, 0 );
			renderer.setSize( windowWidth - 50, windowHeight - 50 );
			renderer.domElement.style.zIndex = 5;
			document.getElementById( viewRenderer ).appendChild( renderer.domElement );

			
			//Add HTML elements to scene
			var target  = $( '#html3D-view' ).clone(),
				pages   = target.find( '.html3D-view-content' );

			pages.each( function() {
				var el = new THREE.CSS3DObject( $.parseHTML( $( this )[0].outerHTML )[0] );

				el.position.x = $( this ).data( 'position-x' ) || 0;
				el.position.y = $( this ).data( 'position-y' ) || 0;
				el.position.z = $( this ).data( 'position-z' ) || 0;
				el.rotation.x = $( this ).data( 'rotation-x' ) || 0;
				el.rotation.y = $( this ).data( 'rotation-y' ) || 3.14159265358979;
				el.rotation.z = $( this ).data( 'rotation-z' ) || 0;

				scene.add( el );
			});
			

			
			
			//CSS3D Renderer
			renderer = new THREE.CSS3DRenderer();
			renderer.setSize( windowWidth, windowHeight );
			renderer.domElement.style.position = 'absolute';
			renderer.domElement.style.top = 0;
			document.getElementById( viewRenderer ).appendChild( renderer.domElement );

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );

            var delta = clock.getDelta();
			
			controls.update();
			
			renderer.render( scene, camera );
			
		}
		
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}


		
    };

    APP.components.documentReady.push( APP._3D_PAGES.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_PARTICLE               = APP._3D_PARTICLE || {};
	APP._3D_PARTICLE.version       = '0.0.1';
    APP._3D_PARTICLE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-particle-effect-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-particle-effect-canvas',
			rendererCanvasWidth       = 800,
			rendererCanvasHeight      = 400;
		
		// Draw Image To Canvas
		//-------------------------------------	
		//drawImageToCanvas( rendererCanvasID, $( '#' + rendererCanvasID ).data( 'img-src' ) );

		
		// Effect Render
		//-------------------------------------	
		var renderer, scene, camera, controls;


		// Create a camera, which defines where we're looking at.		
		renderer = new THREE.WebGLRenderer( { 
								canvas   : document.getElementById( rendererCanvasID ), //canvas
								alpha    : true, 
								antialias: true 
							} );
		renderer.setSize( windowWidth, windowHeight );
	
		
		scene = new THREE.Scene();
		
		//camera
		camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 0.01, 100 );
		camera.position.set( -1.5, 0.5, 0.5 );
		camera.lookAt( new THREE.Vector3(0,0,0) );
		
		//controls
		controls = new THREE.OrbitControls( camera );
		controls.rotateSpeed = 0.5;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.enableZoom = true;
		controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		controls.dampingFactor = 0.25;
		controls.screenSpacePanning = false;
	    controls.minDistance = 1.5;
		controls.maxDistance = 5;
		controls.maxPolarAngle = Math.PI / 2;
		

	
		// Immediately use the texture for material creation
		var createGeometryTexture = function( geometry, size ) {
			var data = new Float32Array(size * size * 3);
			var verticesLength = geometry.vertices.length;
			for (var i = 0; i < size * size; i++) {
				if (verticesLength > i) {
					data[i * 3] = geometry.vertices[i].x;
					data[i * 3 + 1] = geometry.vertices[i].y;
					data[i * 3 + 2] = geometry.vertices[i].z;
				} else {
					data[i * 3] = data[i * 3 + 1] = data[i * 3 + 2] = 0.0;
				}
			}
			var dataTexture = new THREE.DataTexture( data, size, size, THREE.RGBFormat, THREE.FloatType );
			dataTexture.needsUpdate = true;
			return dataTexture;
		};

		var size            = 84,
			horizontalPlane = {
			vertices: []
		};
		
		for (var i = 0; i < size * size; i++) {
			horizontalPlane.vertices.push({
				x: (((i % size) / size) - 0.5) * 1.2,
				y: 0.0,
				z: (((i / size) / size) - 0.5) * 1.2
			});
		}

		var particleTextureTarget = createGeometryTexture(new THREE.SphereGeometry(0.5, size - 1, size - 1), size),
			texturePlane          = createGeometryTexture(horizontalPlane, size),
			textureSphere         = createGeometryTexture(new THREE.SphereGeometry(0.5, size - 1, size - 1), size),
			textureBox            = createGeometryTexture(new THREE.BoxGeometry(0.7, 0.7, 0.7, 26, 26, 26), size);

		
		// Add textures to array for iteration
		var geometryTextures = [];
		geometryTextures.push( texturePlane, textureSphere, textureBox );

		// Change particleTextureTarget.image on click
		var geometryTextureIndex = 0;
		$( 'body' ).on( 'click', function() {
			geometryTextureIndex++;
			if (geometryTextureIndex > geometryTextures.length - 1) {
				geometryTextureIndex = 0;
			}
			particleTextureTarget.image = geometryTextures[geometryTextureIndex].image;
			particleTextureTarget.needsUpdate = true;
		});
		

		// Create the particles
		var particleOptions = {
			textureSize            : size,
			explodeRate            : 0.1,
			targetTexture          : particleTextureTarget,
			velocityFunctionString : 'outVelocity = direction * (dist/50.0);',
			colorFunctionString    : 'color = vec4(0.0, 0.0, 0.0, 1.0);'
		};
		var particles = new Particles( renderer, scene, particleOptions );

		

		render();
		function render() {

			requestAnimationFrame( render );

			// required if controls.enableDamping or controls.autoRotate are set to true
			controls.update();
			
			// Update the particles for each frame
			particles.pointCloud.rotation.y += 0.005;
			particles.update();

			renderer.render( scene, camera );

		}
		
		
		
	

		/*
		 * Returns a random number between two other numbers
		 *
		 * @param  {string} src                 - The URL of the image.
		 * @param  {number} width               - The width of the image.
		 * @param  {number} height              - The height of the image.
		 * @param  {function} callback          - Callback function when the image is loaded.
		 * @return {object}                     - The image element.
		 */
		function loadImage( src, width, height, callback ) {
			var image = new Image( width, height ); 
			image.src = src ;
			image.onload = function() {
				callback.call();
			};

			return image;
		}
		
	
		/*
		 * Draw Image To Canvas
		 *
		 * @param  {object} canvasID         - The ID of a canvas.
		 * @param  {string} img              - Image URL.
		 * @return {void}                    - The constructor.
		 */
		function drawImageToCanvas( canvasID, img ) {
			
			var image = loadImage( img, rendererCanvasWidth, rendererCanvasHeight, function() {

					var c      = document.getElementById( canvasID ),
						ctx    = c.getContext( '2d' );
					
					c.width = rendererCanvasWidth;
					c.height = rendererCanvasHeight;

					ctx.drawImage( image, 0, 0 );

		
				}
			);
			
		
		}
		
    };

    APP.components.documentReady.push( APP._3D_PARTICLE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- 3D Sphere Rotation -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_SPHERE_THREE               = APP._3D_SPHERE_THREE || {};
	APP._3D_SPHERE_THREE.version       = '0.0.1';
    APP._3D_SPHERE_THREE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-sphere-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			rendererCanvasID          = '3D-sphere-three-canvas';
		
	

		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			displacementSprite;

		
		init();
		render();

		function init() {
			// camera
			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
			camera.position.set( 0, -46, 18 );

			// controls
			controls = new THREE.OrbitControls( camera );
			controls.minDistance = 10;
			controls.maxDistance = 50;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			scene.add( new THREE.AmbientLight( 0x555555 ) );

			light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 500, 2000 );
			scene.add( light );
			
			

			//WebGL Renderer		
			renderer = new THREE.WebGLRenderer( { 
									canvas   : document.getElementById( rendererCanvasID ), //canvas
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( windowWidth, windowHeight );

			
			// axes
			//scene.add( new THREE.AxisHelper( 20 ) );

			// geometry
			var geometry = new THREE.SphereGeometry( 3, 32, 32 );

			// material, we create the material when the texture is loaded
			var texture = new THREE.TextureLoader().load( templateUrl + '/assets/images/demo/test-img-big-1.jpg' ),
				material = new THREE.MeshBasicMaterial( { map: texture } );

			// parent
			displacementSprite = new THREE.Object3D();
			scene.add( displacementSprite );

			// pivots
			var pivot1 = new THREE.Object3D(),
				pivot2 = new THREE.Object3D(),
				pivot3 = new THREE.Object3D();
			
			pivot1.rotation.z = 0;
			pivot2.rotation.z = 2 * Math.PI / 3;
			pivot3.rotation.z = 4 * Math.PI / 3;
			displacementSprite.add( pivot1 );
			displacementSprite.add( pivot2 );
			displacementSprite.add( pivot3 );

			// mesh
			var mesh1 = new THREE.Mesh( geometry, material ),
				mesh2 = new THREE.Mesh( geometry, material ),
				mesh3 = new THREE.Mesh( geometry, material );
			
			mesh1.position.y = 5;
			mesh2.position.y = 15;
			mesh3.position.y = 25;
			pivot1.add( mesh1 );
			pivot2.add( mesh2 );
			pivot3.add( mesh3 );
			
			
			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );
			
			displacementSprite.rotation.z += 0.01;
			controls.update();
			
			renderer.render( scene, camera );
			
		}


		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}


		
    };
	
    APP.components.documentReady.push( APP._3D_SPHERE_THREE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );









/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ACCORDION               = APP.ACCORDION || {};
	APP.ACCORDION.version       = '0.0.1';
    APP.ACCORDION.documentReady = function( $ ) {

		$( '.uix-accordion' ).each( function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' ),
				$li             = $this.children( 'dl' ),
				$titlebox       = $this.find( 'dt' );
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.first().addClass( 'active' );
			}
			

			$li.on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
				
				$( this ).find( 'dd' ).addClass( 'active' );
				
				
				if ( !$( this ).hasClass( 'active' ) ) {
					$li.removeClass( 'active' );

					$( this ).addClass( 'active' );
				} else {
					$li.removeClass( 'active' );
				}
			
			}); 
						
			
			
		});
		
    };

    APP.components.documentReady.push( APP.ACCORDION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Accordion Background Images -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ACCORDION_BG               = APP.ACCORDION_BG || {};
	APP.ACCORDION_BG.version       = '0.0.4';
    APP.ACCORDION_BG.documentReady = function( $ ) {
		
		
        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();
		
		
		if ( windowWidth <= 768 ) return false;
		
		
		$( '.uix-accordion-img' ).each( function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				outReset        = $this.data( 'out-reset' ),
				widthShow       = $this.data( 'width-show' ),
				closeBtn        = $this.data( 'close-btn' ),
				$li             = $this.find( 'ul' ).children( 'li' ),
				total           = $li.length;
			
			
			
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof outReset === typeof undefined ) {
				outReset = true;
			}	
			
			if( typeof widthShow === typeof undefined ) {
				widthShow = '60%';
			}		
			
			//Initialize the width of each item
			itemInit();
			
			

			$li.on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
			
				
				//Apply click method to outer div but not inner div
				if ( e.target.className == 'uix-accordion-img__content' ) {
					
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).addClass( 'active' );

					} else {
						
						$li.addClass( 'sub-active' );
						$( this ).addClass( 'active' );
						$( this ).siblings().removeClass( 'active' );

						$li.css( 'width', ( 100 - parseFloat( widthShow ) )/(total - 1) + '%' );
						$( this ).css( 'width', widthShow );

					}	
				}
			
			}); 
			
			if ( outReset ) {
				$this.on( 'mouseleave', function( e ) {
					itemInit();
				}); 	
			}
			
			if( typeof closeBtn != typeof undefined && closeBtn != false && closeBtn != '' ) {
				$( closeBtn ).on( 'click', function( e ) {
					e.preventDefault();
					itemInit();
				}); 		
				
			}	
			
			
	
			/*
			 * Initialize the width of each item
			 *
			 * @return {void}             - The constructor.
			 */
			function itemInit() {
				$li.removeClass( 'active sub-active' ).css( 'width', 100/total + '%' );
			}
			
			
			
		});
		
	
		
    };

    APP.components.documentReady.push( APP.ACCORDION_BG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Advanced Content Slider -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ADVANCED_CONTENT_SLIDER               = APP.ADVANCED_CONTENT_SLIDER || {};
	APP.ADVANCED_CONTENT_SLIDER.version       = '0.0.2';
    APP.ADVANCED_CONTENT_SLIDER.documentReady = function( $ ) {

		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			animDuration              = 1200;
		
		
		
		sliderInit();
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				sliderInit();
				
			}
		});
		
		
		/*
		 * Initialize slideshow
		 *
		 * @return {void}                   - The constructor.
		 */
        function sliderInit() {
			
			$( '.uix-advanced-content-slider' ).each( function() {
				var $this                      = $( this ),
					$items                     = $this.find( '.uix-advanced-content-slider__item' ),
					$itemsWrapper              = $this.children( '.uix-advanced-content-slider__inner' ),
					$first                     = $items.first(),
					itemWidth                  = $this.width(),
					itemsTotal                 = $items.length,
					totalWidth                 = itemWidth*itemsTotal,
					dataControlsPagination     = $this.data( 'controls-pagination' ),
					dataControlsArrows         = $this.data( 'controls-arrows' ),
					dataDraggable              = $this.data( 'draggable' ),
					dataDraggableCursor        = $this.data( 'draggable-cursor' ),
					dataControlsPaginationAuto = false;

				
				

				if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-content-slider-sp-pagination';
				if ( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-content-slider-sp-arrows';
				if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
				if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
				
				if ( $( dataControlsPagination ).html().length == 0 ) dataControlsPaginationAuto = true;

				

				//Initialize the width of each item
				//-------------------------------------		
				$first.addClass( 'active' );
				
				$items.css( 'width', itemWidth + 'px' );
				
				TweenMax.set( $itemsWrapper, { 
					width: totalWidth,
					onComplete  : function() {
						$this.css( 'height', 'auto' );
						
					}
				} );	
				

				//Pagination dots 
				//-------------------------------------	
				if ( dataControlsPaginationAuto ) {
					var _dot       = '',
						_dotActive = '';
					_dot += '<ul class="uix-advanced-content-slider__pagination--default">';
					for ( var i = 0; i < itemsTotal; i++ ) {

						_dotActive = ( i == 0 ) ? 'class="active"' : '';

						_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
					}
					_dot += '</ul>';

					if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );	
				} else {
					$( dataControlsPagination ).find( 'li' ).first().find( 'a' ).addClass( 'active' );
					$( dataControlsPagination ).find( 'li' ).first().addClass( 'active' );
				}


				$( dataControlsPagination ).find( 'li a' ).on( 'click', function( e ) {
					e.preventDefault();

					if ( !$( this ).hasClass( 'active' ) ) {
						
						sliderUpdates( $( this ).attr( 'data-index' ), $this, dataControlsArrows, dataControlsPagination );
					}



				});

				
				//Next/Prev buttons
				//-------------------------------------		
				var _prev = $( dataControlsArrows ).find( '.uix-advanced-content-slider__arrows--prev' ),
					_next = $( dataControlsArrows ).find( '.uix-advanced-content-slider__arrows--next' );
				
				

				$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );
				
				_prev.addClass( 'disabled' );

				_prev.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );

				});

				_next.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );

				});
				
				
				//Drag and Drop
				//-------------------------------------	
				var $dragDropTrigger = $items;

				//Make the cursor a move icon when a user hovers over an item
				if ( dataDraggable && dataDraggableCursor != '' && dataDraggableCursor != false ) $dragDropTrigger.css( 'cursor', dataDraggableCursor );
				


				//Mouse event
				$dragDropTrigger.on( 'mousedown.ADVANCED_CONTENT_SLIDER touchstart.ADVANCED_CONTENT_SLIDER', function( e ) {
					e.preventDefault();

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
					
					$dragDropTrigger.on( 'mouseup.ADVANCED_CONTENT_SLIDER touchmove.ADVANCED_CONTENT_SLIDER', function( e ) {
						e.preventDefault();

						$( this ).removeClass( 'dragging' );
						var touches        = e.originalEvent.touches,
							origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
							origin_mouse_y = $( this ).data( 'origin_mouse_y' );

						if ( touches && touches.length ) {

							var deltaX = origin_mouse_x - touches[0].pageX,
								deltaY = origin_mouse_y - touches[0].pageY;

							if ( deltaX >= 50) {
								//--- left
								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );


							}
							if ( deltaX <= -50) {
								//--- right
								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );


							}
							if ( deltaY >= 50) {
								//--- up


							}
							if ( deltaY <= -50) {
								//--- down

							}

							if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
								$dragDropTrigger.off( 'touchmove.ADVANCED_CONTENT_SLIDER' );
							}	


						} else {
							
							if ( dataDraggable ) {
								//right
								if ( e.pageX > origin_mouse_x ) {
									sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );
								}

								//left
								if ( e.pageX < origin_mouse_x ) {
									sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );
								}

								//down
								if ( e.pageY > origin_mouse_y ) {

								}

								//up
								if ( e.pageY < origin_mouse_y ) {

								}	

								$dragDropTrigger.off( 'mouseup.ADVANCED_CONTENT_SLIDER' );
								
							}	
							
							
							
						}



					} );

					
					

				} );

			
				
			});	
			
		}
		
		/*
		 * Transition Between Slides
		 *
		 * @param  {number} elementIndex     - Index of current slider.
		 * @param  {object} slider           - Selector of the slider .
		 * @param  {string} arrows           - Controller name of prev/next buttons.
		 * @param  {string} pagination       - Controller name of pagination buttons.
		 * @return {void}                    - The constructor.
		 */
        function sliderUpdates( elementIndex, slider, arrows, pagination ) {
			
			var $items        = slider.find( '.uix-advanced-content-slider__item' ),
				itemsTotal    = $items.length,
				$prev         = $( arrows ).find( '.uix-advanced-content-slider__arrows--prev' ),
				$next         = $( arrows ).find( '.uix-advanced-content-slider__arrows--next' ),
				$pagination   = $( pagination ).find( 'li a' );
				
			if ( elementIndex <= itemsTotal - 1 && elementIndex >= 0 ) {

				if ( elementIndex > parseFloat( itemsTotal - 1 ) ) elementIndex = parseFloat( itemsTotal - 1 );
				if ( elementIndex < 0 ) elementIndex = 0;
				
				$next.removeClass( 'disabled' );
				$prev.removeClass( 'disabled' );
				$pagination.removeClass( 'active' );
				$pagination.parent().removeClass( 'active' );

				if ( elementIndex == itemsTotal - 1 ) {
					$next.addClass( 'disabled' );
				}

				if ( elementIndex == 0 ) {
					$prev.addClass( 'disabled' );
				}

				

				$items.removeClass( 'active' );
				$items.eq( elementIndex ).addClass( 'active' );	
				$pagination.eq( elementIndex ).addClass( 'active' );
				$pagination.eq( elementIndex ).parent().addClass( 'active' );
				
				
				
				TweenMax.to( slider.children( '.uix-advanced-content-slider__inner' ), animDuration/1000, { 
					x: '-' + ( slider.width() * elementIndex ),
					onComplete  : function() {

					},
					ease: Power3.easeOut
				} );
				
	
			}
			

			
		}
		
		
    };

    APP.components.documentReady.push( APP.ADVANCED_CONTENT_SLIDER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Advanced Slider (Special Effects) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.ADVANCED_SLIDER_FILTER               = APP.ADVANCED_SLIDER_FILTER || {};
	APP.ADVANCED_SLIDER_FILTER.version       = '0.0.6';
    APP.ADVANCED_SLIDER_FILTER.pageLoaded    = function() {

	
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			animDuration              = 600,
			$sliderWrapper            = $( '.uix-advanced-slider-sp' ),
			tempID                    = 'video-' + UIX_GUID.newGuid(),

			
			//Autoplay global variables
			timer                     = null,
			playTimes,
			
			
			//Basic webGL renderers 
			rendererOuterID           = 'uix-advanced-slider-sp__canvas-container',
			rendererCanvasID          = 'uix-advanced-slider-sp__canvas',
			renderer,
		    
			//PIXI
			renderer_filter,
		    rendererCanvasID_filter   = rendererCanvasID,
		    stage_filter,
			items_container,
			displacementSprite,
			displacementFilter,
			
			//Three.js
			scenesAll                 = [],
			texturesAll               = [],
			webGLRenderer;
		
		
		
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
		 * @return {void}                   - The constructor.
		 */
        function sliderInit( resize ) {
	
			$sliderWrapper.each( function()  {

				var $this                    = $( this ),
					$items                   = $this.find( '.uix-advanced-slider-sp__item' ),
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
				$items                   = $this.find( '.uix-advanced-slider-sp__item' ),
				$first                   = $items.first(),
				itemsTotal               = $items.length,
				dataControlsPagination   = $this.data( 'controls-pagination' ),
				dataControlsArrows       = $this.data( 'controls-arrows' ),
				dataLoop                 = $this.data( 'loop' ),
				dataFilterTexture        = $this.data( 'filter-texture' );

	
			
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
			if( typeof dataLoop === typeof undefined ) dataLoop = false;
			if( typeof dataFilterTexture === typeof undefined ) dataFilterTexture = '';


				

		    //Prevent bubbling
			if ( itemsTotal == 1 ) {
				$( dataControlsPagination ).hide();
				$( dataControlsArrows ).hide();
			}

			if ( Modernizr.webgl ) {
				
				//Load slides to canvas
				//-------------------------------------	
				if ( $( '#' + rendererCanvasID ).length == 0 ) {
					$this.prepend( '<div id="'+rendererOuterID+'" class="uix-advanced-slider-sp__canvas-container"><canvas id="'+rendererCanvasID+'"></canvas></div>' );
				}

				//Basic webGL renderers 
				//-------------------------------------
				renderer              = new PIXI.Application( $this.width(), $this.height(), {
														//backgroundColor : 0x000000, 
					                                    transparent     : true,
														autoResize      : true, 
														view            : document.getElementById( rendererCanvasID )
													});

				renderer_filter       = new PIXI.autoDetectRenderer( $this.width(), $this.height(), {
														//backgroundColor : 0x000000, 
														transparent     : true,
														view            : document.getElementById( rendererCanvasID_filter )
													});


				stage_filter          = new PIXI.Container();
				items_container       = new PIXI.Container();
				displacementSprite    = ( dataFilterTexture.indexOf( '.mp4' ) >= 0 ) ? new PIXI.Sprite( PIXI.Texture.fromVideo( dataFilterTexture ) ) : new PIXI.Sprite.fromImage( dataFilterTexture );
				displacementFilter    = new PIXI.filters.DisplacementFilter( displacementSprite );


				//----------------------------------------------------------------------------------
				//--------------------------------- Brightness Effect -------------------------------	
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: renderer.stage.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-brightness' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );

						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;

							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								var	curW    = this.videoWidth,
									curH    = this.videoHeight,
									newW    = curW,
									newH    = curH;

								newW = $this.width();

								//Scaled/Proportional Content 
								newH = curH*(newW/curW);

								//At the same time change the height of the canvas
								renderer.view.style.width = newW + 'px';
								renderer.view.style.height = newH + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $thisItem.find( 'img' ).width() + 'px';
								renderer.view.style.height = $thisItem.find( 'img' ).height() + 'px';


							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						// Render updated scene
						renderer.stage.addChild( curSprite );

						TweenMax.set( curSprite, {
							alpha : 0
						});	



					});



					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animDuration );



				}// end effect





				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: items_container.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								var	curW    = this.videoWidth,
									curH    = this.videoHeight,
									newW    = curW,
									newH    = curH;

								newW = $this.width();

								//Scaled/Proportional Content 
								newH = curH*(newW/curW);

								//At the same time change the height of the canvas
								renderer.view.style.width = newW + 'px';
								renderer.view.style.height = newH + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $thisItem.find( 'img' ).width() + 'px';
								renderer.view.style.height =$thisItem.find( 'img' ).height() + 'px';

							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );


						items_container.addChild( curSprite );
						// Enable interactions
						items_container.interactive = true;


						//Add child container to the main container 
						//-------------------------------------
						stage_filter.addChild( items_container );
						// Enable Interactions
						stage_filter.interactive = true;

						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


						//Set the filter to stage and set some default values for the animation
						//-------------------------------------
						stage_filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer_filter.width / 2;
						displacementSprite.y = renderer_filter.height / 2; 

						displacementSprite.scale.x = 1;
						displacementSprite.scale.y = 1;

						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage_filter.addChild( displacementSprite );


						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {

							// Render updated scene
							renderer_filter.render( stage_filter );

						});
						
	

					});

					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animDuration );


				}// end effect



				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 2 -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: items_container.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid2' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								var	curW    = this.videoWidth,
									curH    = this.videoHeight,
									newW    = curW,
									newH    = curH;

								newW = $this.width();

								//Scaled/Proportional Content 
								newH = curH*(newW/curW);

								//At the same time change the height of the canvas
								renderer.view.style.width = newW + 'px';
								renderer.view.style.height = newH + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $thisItem.find( 'img' ).width() + 'px';
								renderer.view.style.height =$thisItem.find( 'img' ).height() + 'px';

							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );

						TweenMax.set( curSprite, {
							alpha : 0
						});	


						items_container.addChild( curSprite );
						// Enable interactions
						items_container.interactive = true;


						//Add child container to the main container 
						//-------------------------------------
						stage_filter.addChild( items_container );
						// Enable Interactions
						stage_filter.interactive = true;

						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
						


						//Set the filter to stage and set some default values for the animation
						//-------------------------------------
						stage_filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer_filter.width / 2;
						displacementSprite.y = renderer_filter.height / 2;
					


						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage_filter.addChild( displacementSprite );

						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {
							
          
							// Render updated scene
							renderer_filter.render( stage_filter );

						});


					});

					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animDuration );


				}// end effect
		
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 3 -----------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: items_container.children[index]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-liquid3' ) ) {

					$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

						var $thisItem = $( this );



						//Load sprite from each slider to canvas
						//-------------------------------------
						var curSprite, 
							canvasRatio = $this.width()/nativeItemW;

						if ( $thisItem.find( 'video' ).length > 0 ) {


							// create a video texture from a path
							var videoURL = $thisItem.find( 'source:first' ).attr( 'src' ),
								texture  = PIXI.Texture.fromVideo( videoURL );

							curSprite = new PIXI.Sprite( texture );

							// pause the video
							var videoSource = texture.baseTexture.source;
							videoSource.autoplay = false;
							videoSource.pause();
							videoSource.currentTime = 0;
							videoSource.muted = true;


							//Returns the dimensions (intrinsic height and width ) of the video
							var video = document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) );
							video.addEventListener( 'loadedmetadata', function( e ) {

								var	curW    = this.videoWidth,
									curH    = this.videoHeight,
									newW    = curW,
									newH    = curH;

								newW = $this.width();

								//Scaled/Proportional Content 
								newH = curH*(newW/curW);

								//At the same time change the height of the canvas
								renderer.view.style.width = newW + 'px';
								renderer.view.style.height = newH + 'px';	


							}, false);	

							video.src = videoURL;



						} else {

							var imgURL   = $thisItem.find( 'img' ).attr( 'src' ),
								imgCur   = new Image();

							curSprite = new PIXI.Sprite.fromImage( imgURL );

							imgCur.onload = function() {

								//At the same time change the height of the canvas
								renderer.view.style.width = $thisItem.find( 'img' ).width() + 'px';
								renderer.view.style.height =$thisItem.find( 'img' ).height() + 'px';

							};

							imgCur.src = imgURL;


						}

						curSprite.width  = $this.width();
						curSprite.height = $this.height();	


						//Need to scale according to the screen
						curSprite.scale.set( canvasRatio );

						TweenMax.set( curSprite, {
							alpha : 0
						});	


						items_container.addChild( curSprite );
						// Enable interactions
						items_container.interactive = true;


						//Add child container to the main container 
						//-------------------------------------
						stage_filter.addChild( items_container );
						// Enable Interactions
						stage_filter.interactive = true;

						//A texture stores the information that represents an image
						displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
						


						//Set the filter to stage and set some default values for the animation
						//-------------------------------------
						stage_filter.filters = [ displacementFilter ];    


						//Add filter container to the main container
						//-------------------------------------				
						displacementSprite.anchor.set( 0.5 );
						displacementSprite.x = renderer_filter.width / 2;
						displacementSprite.y = renderer_filter.height / 2;
					


						// PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
						displacementFilter.autoFit = false;

						stage_filter.addChild( displacementSprite );

						//Animation Effects
						//-------------------------------------
						var ticker       = new PIXI.ticker.Ticker();
						ticker.autoStart = true;
						ticker.add( function( delta ) {
							
                            //Need the displacementSprite.texture.baseTexture.wrapMode is "PIXI.WRAP_MODES.REPEAT"
							displacementSprite.x += 1 * delta;
							displacementSprite.y += 0.3;
							
							// Render updated scene
							renderer_filter.render( stage_filter );

						});


					});

					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animDuration );


				}// end effect
				

				//----------------------------------------------------------------------------------
				//--------------------------------- 3D Rotating Effect -----------------------------
				//----------------------------------------------------------------------------------
				//Usage of returning sprite object: texturesAll[ index ]     scenesAll[ index ]
				if ( $this.hasClass( 'uix-advanced-slider-sp--eff-3d-rotating' ) ) {


					var texture;

					//Drag and Drop
					var targetRotationX             = 0,
						targetRotationXOnMouseDown  = 0,
						targetRotationXOnTouchDown  = 0,
						targetRotationY             = 0,
						targetRotationYOnMouseDown  = 0,
						targetRotationYOnTouchDown  = 0,
						mouseX                      = 0,
						mouseY                      = 0,
						mouseXOnMouseDown           = 0,
						mouseXOnTouchDown           = 0,
						mouseYOnMouseDown           = 0,
						mouseYOnTouchDown           = 0,
						windowHalfX                 = $this.width() / 2,
						windowHalfY                 = $this.height() / 2;



					//Add Geometries and Lights to the main container 
					//-------------------------------------					
					var init = function() {
						$this.find( '.uix-advanced-slider-sp__item' ).each( function( index )  {

							var $thisItem = $( this );

							// create a scene, that will hold all our elements such as objects, cameras and lights.
							var scene  = new THREE.Scene();
							scene.name = 'scene-' + index;


							// make a list item
							var element = document.createElement( 'div' );
							element.className = 'list-item';
							element.innerHTML = '<div class="scene" style="width:'+$this.width() +'px;height:'+$this.height() +'px;"></div>';

							// Look up the element that represents the area
							// we want to render the scene
							scene.userData.element = element.querySelector( '.scene' );
							document.getElementById( rendererOuterID ).appendChild( element );

							TweenMax.set( $( '#' + rendererOuterID ).find( '.list-item' ), {
									alpha: 0,
									css  : {
										display: 'none'
									}
								});	


							// Create a camera, which defines where we're looking at.
							var aspect      = $this.width() / $this.height(),
								camera      = new THREE.PerspectiveCamera( 55, aspect, 0.1, 1000 );

							camera.position.x = 0;
							camera.position.y = -30;
							camera.position.z = 25;
							camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
							scene.userData.camera = camera;


							// Generate one plane geometries mesh to each scene
							if ( $thisItem.find( 'video' ).length > 0 ) {


								texture = new THREE.VideoTexture( document.getElementById( $thisItem.find( 'video' ).attr( 'id' ) ) );
								texture.minFilter = THREE.LinearFilter;
								texture.magFilter = THREE.LinearFilter;
								texture.format = THREE.RGBFormat;

								// pause the video
								texture.image.autoplay = true;
								texture.image.currentTime = 0;
								texture.image.muted = false;
								texture.image.pause();



							} else {
								texture = new THREE.TextureLoader().load( $thisItem.find( 'img' ).attr( 'src' ) );
								texture.generateMipmaps = false;
								texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
								texture.minFilter = THREE.LinearFilter;
							}

							// texture controller
							texturesAll.push( texture );




							// Immediately use the texture for material creation
							var spriteMat            = new THREE.MeshPhongMaterial( { map: texture } ),
								imgRatio             = $this.width() / $this.height(),
								geometry             = new THREE.BoxGeometry( imgRatio*15, 15, 2 ),
								displacementSprite   = new THREE.Mesh( geometry, spriteMat );

							displacementSprite.position.set( -0.01, -0.01, 0 );
							displacementSprite.rotation.set( 0, 0, 0 );
							scene.add( displacementSprite );


							// Generate Ambient Light
							var ambiLight = new THREE.AmbientLight( 0x404040 );
							scene.add( ambiLight );

							// Generate Directional Light
							var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
							light.position.set( 0, 30, 70 );
							scene.add( light );


							// Display multiple instances of three.js in a single page
							scenesAll.push( scene );



						});


						//Create a render and set the size
						webGLRenderer = new THREE.WebGLRenderer( { 
												canvas   : document.getElementById( rendererCanvasID ), //canvas
												alpha    : true, 
												antialias: true 
											} );

						webGLRenderer.setClearColor( new THREE.Color( 0x000000, 0 ) );
						webGLRenderer.setPixelRatio( window.devicePixelRatio );  
						webGLRenderer.shadowMap.enabled = true;


					};

					//Add render event
					//-------------------------------------	

					//Converts numeric degrees to radians
					var toRad = function( number ) {
						return number * Math.PI / 180;
					};


					var render = function() {


						webGLRenderer.setClearColor( 0x000000 );
						webGLRenderer.setScissorTest( false );
						webGLRenderer.clear();

						webGLRenderer.setClearColor( 0x000000 );
						webGLRenderer.setScissorTest( true );

						scenesAll.forEach( function( scene, i ) {

							// Get the element that is a place holder for where we want to draw the scene
							var element = scene.userData.element,
								camera  = scene.userData.camera,
								rect    = element.getBoundingClientRect();


							//automatic rotation
							scene.children[0].rotation.y = Date.now() * 0.0001;
							var amplitudeVal = 1.0 + Math.sin( Date.now() * 0.0001 * 0.5 );

							
							//drag & drop
	//						scene.children[0].rotation.x = toRad( targetRotationX * 4 );
	//						scene.children[0].rotation.y = toRad( targetRotationY * 4 );	
	//						
							//drag & drop with easing effect
							scene.children[0].rotation.x += ( targetRotationX - scene.children[0].rotation.x ) * 0.05;
							scene.children[0].rotation.y += ( targetRotationY - scene.children[0].rotation.y ) * 0.05;


							// set the viewport
							webGLRenderer.setViewport( 0, 0, rect.width, rect.height );
							webGLRenderer.setScissor( 0, 0, rect.width, rect.height );


							//tell texture object it needs to be updated
							texture.needsUpdate = true;

							camera.aspect = $this.width() / $this.height(); // not changing in this example
							camera.updateProjectionMatrix();

							//drag & drop
							webGLRenderer.render( scene, camera );

						} );

					};



					//Animation Interactions
					//-------------------------------------
					var animate = function() {
						render();
						requestAnimationFrame( animate );
					};


					init();
					animate();


					//Rotation and Drop

					var onDocumentMouseDown = function( e ) {
						e.preventDefault();
						document.addEventListener( 'mousemove', onDocumentMouseMove, false );
						document.addEventListener( 'mouseup', onDocumentMouseUp, false );
						document.addEventListener( 'mouseout', onDocumentMouseOut, false );
						mouseXOnMouseDown = e.clientX - windowHalfX;
						mouseYOnMouseDown = e.clientY - windowHalfY;
						targetRotationXOnMouseDown = targetRotationX;
						targetRotationYOnMouseDown = targetRotationY;
					};

					var onDocumentMouseMove = function( e ) {
						mouseX = e.clientX - windowHalfX;
						mouseY = e.clientY - windowHalfY;
						targetRotationX = targetRotationXOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
						targetRotationY = targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown) * 0.02;
					};

					var onDocumentMouseUp = function( e ) {
						document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
						document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
						document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

					};

					var onDocumentMouseOut = function( e ) {
						document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
						document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
						document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

					};




					var onDocumentTouchStart = function( e ) {
						e.preventDefault();
						e = e.changedTouches[ 0 ];

						document.addEventListener( 'touchmove', onDocumentTouchMove, false );
						document.addEventListener( 'touchend', onDocumentTouchEnd, false );
						mouseXOnTouchDown = e.clientX - windowHalfX;
						mouseYOnTouchDown = e.clientY - windowHalfY;
						targetRotationXOnTouchDown = targetRotationX;
						targetRotationYOnTouchDown = targetRotationY;


					};

					var onDocumentTouchMove = function( e ) {
						e.preventDefault();
						e = e.changedTouches[ 0 ];

						mouseX = e.clientX - windowHalfX;
						mouseY = e.clientY - windowHalfY;
						targetRotationX = targetRotationXOnTouchDown + (mouseX - mouseXOnTouchDown) * 0.02;
						targetRotationY = targetRotationYOnTouchDown + (mouseY - mouseYOnTouchDown) * 0.02;	



					};

					var onDocumentTouchEnd = function( e ) {
						document.removeEventListener( 'touchmove', onDocumentTouchMove, false );
						document.removeEventListener( 'touchend', onDocumentTouchEnd, false );

					};

					if ( Modernizr.touchevents ) {
						document.addEventListener( 'touchstart', onDocumentTouchStart, false );
					} else {
						document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					}




					//Responsive plane geometries
					//-------------------------------------
					window.addEventListener( 'resize', function () {

						var width = document.getElementById( rendererCanvasID ).clientWidth;
						var height = document.getElementById( rendererCanvasID ).clientHeight;

						if ( document.getElementById( rendererCanvasID ).width !== width || document.getElementById( rendererCanvasID ).height !== height ) {

							webGLRenderer.setSize( width, height, false );

						}


					}, false );


					//Initialize the default height of canvas
					//-------------------------------------	
					setTimeout( function() {
						canvasDefaultInit( $first );
					}, animDuration );


				}// end effect


				//Canvas Interactions
				//-------------------------------------
				transitionInteractions( 0, itemsTotal-1, $this, 'in' );
				
				
				
			}
			

			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			if ( !Modernizr.webgl ) normalSliderVideoInit( $items, false );	



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
					
					
					//Canvas Interactions
					transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out' );
					
					
					//Determine the direction
					var curDir = 'prev';
					if ( $( this ).attr( 'data-index' ) > parseFloat( $items.filter( '.active' ).index() ) ) {
						curDir = 'next';
					}
					
					
					//Update the current and previous/next items
					sliderUpdates( $( this ).attr( 'data-index' ), sliderWrapper, curDir );

					//Pause the auto play event
					clearInterval( timer );	
				}



			});

			//Next/Prev buttons
			//-------------------------------------		
			var _prev = $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ),
				_next = $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' );

			$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );

			$( dataControlsArrows ).find( 'a' ).removeClass( 'disabled' );
			if ( !dataLoop ) {
				_prev.addClass( 'disabled' );
			}



			_prev.on( 'click', function( e ) {
				e.preventDefault();

				//Canvas Interactions
				transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out' );	

				//Update the current and previous items
				sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, sliderWrapper, 'prev' );

				//Pause the auto play event
				clearInterval( timer );

			});

			_next.on( 'click', function( e ) {
				e.preventDefault();

				//Canvas Interactions
				transitionInteractions( $items.filter( '.active' ).index(), $items.filter( '.leave' ).index(), sliderWrapper, 'out' );	

				//Update the current and next items
				sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, sliderWrapper, 'next' );


				//Pause the auto play event
				clearInterval( timer );


			});



			//Added touch method to mobile device
			//-------------------------------------	
			var startX,
				startY;


			$this.on( 'touchstart.ADVANCED_SLIDER_FILTER', function( event ) {
				var touches = event.originalEvent.touches;
				if ( touches && touches.length ) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;


					$this.on( 'touchmove.ADVANCED_SLIDER_FILTER', function( event ) {

						var touches = event.originalEvent.touches;
						if ( touches && touches.length ) {
							var deltaX = startX - touches[0].pageX,
								deltaY = startY - touches[0].pageY;

							if ( deltaX >= 50) {
								//--- swipe left


								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, sliderWrapper, 'prev' );


								//Pause the auto play event
								clearInterval( timer );

							}
							if ( deltaX <= -50) {
								//--- swipe right

								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, sliderWrapper, 'next' );


								//Pause the auto play event
								clearInterval( timer );							


							}
							if ( deltaY >= 50) {
								//--- swipe up


							}
							if ( deltaY <= -50) {
								//--- swipe down

							}
							if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
								$this.off( 'touchmove.ADVANCED_SLIDER_FILTER' );
							}
						}

					});
				}	
			});
			

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
			
			var $items                   = slider.find( '.uix-advanced-slider-sp__item' ),
				$current                 = $items.eq( elementIndex ),
			    total                    = $items.length,
				dataCountTotal           = slider.data( 'count-total' ),
				dataCountCur             = slider.data( 'count-now' ),
				dataControlsPagination   = slider.data( 'controls-pagination' ),
				dataControlsArrows       = slider.data( 'controls-arrows' ),	
				dataLoop                 = slider.data( 'loop' );
			

			if( typeof dataCountTotal === typeof undefined ) dataCountTotal = 'p.count em.count';
			if( typeof dataCountCur === typeof undefined ) dataCountCur = 'p.count em.current';
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
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
				if ( elementIndex == total - 1 ) $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' ).addClass( 'disabled' );
				if ( elementIndex == 0 ) $( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ).addClass( 'disabled' );
			}

			// To determine if it is a touch screen.
			if ( Modernizr.touchevents ) {
				if ( elementIndex == total ) elementIndex = total-1;
				if ( elementIndex < 0 ) elementIndex = 0;	
				
				//Prevent bubbling
				if ( !dataLoop ) {
					//first item
					if ( elementIndex == 0 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--prev' ).addClass( 'disabled' );
					}

					//last item
					if ( elementIndex == total - 1 ) {
						$( dataControlsArrows ).find( '.uix-advanced-slider-sp__arrows--next' ).addClass( 'disabled' );
					}	
				}

				
			}
			
			//Determine the direction and add class to switching direction indicator.
			var dirIndicatorClass = '';
			if ( dir == 'prev' ) dirIndicatorClass = 'prev';
			if ( dir == 'next' ) dirIndicatorClass = 'next';
			


			//Add transition class to Controls Pagination
			$( dataControlsPagination ).find( 'li a' ).removeClass( 'leave' );
			$( dataControlsPagination ).find( 'li a.active' ).removeClass( 'active' ).addClass( 'leave' );
			$( dataControlsPagination ).find( 'li a[data-index="'+elementIndex+'"]' ).addClass( 'active' ).removeClass( 'leave' );
			
			
			
			//Add transition class to each item
			$items.removeClass( 'leave prev next' );
			$items.addClass( dirIndicatorClass );
			slider.find( '.uix-advanced-slider-sp__item.active' ).removeClass( 'active' ).addClass( 'leave ' + dirIndicatorClass );
			$items.eq( elementIndex ).addClass( 'active ' + dirIndicatorClass ).removeClass( 'leave' );

			
			

			//Display counter
			//-------------------------------------
			$( dataCountTotal ).text( total );
			$( dataCountCur ).text( parseFloat( elementIndex ) + 1 );		
			

			// Fires local videos asynchronously with slider switch.
			//-------------------------------------
			if ( !Modernizr.webgl ) {
				normalSliderVideoInit( $items, false );
				normalSliderVideoInit( $current, true );	
			}
			
			//Reset the default height of canvas
			//-------------------------------------	
			setTimeout( function() {
				canvasDefaultInit( $current );
			}, animDuration );
			
			//Canvas Interactions
			//-------------------------------------
			transitionInteractions( elementIndex, $items.filter( '.leave' ).index(), slider, 'in' );
			

			
		}
		
	

		

		/*
		 * Initialize the default height of canvas
		 *
		 * @param  {object} slider           - Current selector of each slider.
		 * @return {void}                    - The constructor.
		 */
        function canvasDefaultInit( slider ) {
			
			if ( slider.find( 'video' ).length > 0 ) {

				//Returns the dimensions (intrinsic height and width ) of the video
				var video    = document.getElementById( slider.find( 'video' ).attr( 'id' ) ),
					videoURL = slider.find( 'source:first' ).attr( 'src' );

				video.addEventListener( 'loadedmetadata', function( e ) {

					//At the same time change the height of the canvas and slider container
					var h = this.videoHeight*(slider.closest( '.uix-advanced-slider__outline' ).width()/this.videoWidth);
					
					if ( Modernizr.webgl ) {
						renderer.view.style.height = h + 'px';
					}
					
					//---
					$sliderWrapper.css( 'height', h + 'px' );	

				}, false);	

				video.src = videoURL;


			} else {

				var imgURL   = slider.find( 'img' ).attr( 'src' ),
					img      = new Image();
				

				img.onload = function() {

					if ( Modernizr.webgl ) {
					    renderer.view.style.height = slider.find( 'img' ).height() + 'px';		
					}
					//---
					$sliderWrapper.css( 'height', slider.closest( '.uix-advanced-slider__outline' ).width()*(this.height/this.width) + 'px' );		

				};

				img.src = imgURL;

			}	
			


		}
		
		
		
		/*
		 * Canvas Transition Interactions
		 * @http://pixijs.download/dev/docs/index.html
		 *
		 * @param  {number} elementIndex           - Index of current slider.
		 * @param  {number} prevElementIndex       - Index of previous slider.
		 * @param  {object} slider                 - Selector of the slider.
		 * @param  {string} goType                 - The type of entry and exit between two items.  
		                                             Optional values: in, out
		 * @return {void}                          - The constructor.
		 */
        function transitionInteractions( elementIndex, prevElementIndex, slider, goType ) {
			
			if ( Modernizr.webgl ) {
			
				var $myRenderer           = $( '#' + rendererOuterID ),
				    $current              = slider.find( '.uix-advanced-slider-sp__item' ).eq( elementIndex ),
					imgSel                = $current.find( 'img' ),
				    curImgURL             = imgSel.attr( 'src' ),
					stageW                = slider.width(),
					stageH                = slider.height(),
					spTotal               = slider.find( '.uix-advanced-slider-sp__item' ).length;
				
				
				elementIndex              = parseFloat( elementIndex );
				prevElementIndex          = parseFloat( prevElementIndex );
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Brightness Effect -------------------------------	
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-brightness' ) ) {
				
			
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						TweenMax.to( renderer.stage.children[ elementIndex ], 1, {
							pixi: {
								brightness: 5
							},
							alpha : 1
						});	
						
					} else {
						//Current item entry action
						
						TweenMax.to( $myRenderer, animDuration/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = renderer.stage.children[ elementIndex ];

								TweenMax.to( this.target, animDuration/1000, {
									alpha : 1
								});			


								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = renderer.stage.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									videoSource2.play();
									videoSource2.muted = false;
								}


								//display filters
								TweenMax.set( curSp, {
									pixi: {
										brightness: 5
									},
									alpha : 1,
									onComplete    : function() {
										TweenMax.to( this.target, animDuration/1000, {
											pixi: {
												brightness: 1
											}
										});				
									}
								});		
	



							}
						});			
					}
					
					

	


				} // end effect


				

				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid' ) ) {
					
				
					var curSp  = items_container.children[ elementIndex ],
						prevSp = items_container.children[ prevElementIndex ];

						
					//Display the current item
					//-------------------------------------
					if ( !slider.hasClass( 'js-init-ok' ) ) {
						for ( var k = 0; k < spTotal; k++ ) {

							var obj = items_container.children[ k ];
							
							TweenMax.set( obj, {
								alpha : 0
							});
						}

						//Avoid repeated initialization
						slider.addClass( 'js-init-ok' );	
					}



					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action

						
					} else {
						
						
						//Video sprite initialization
						setTimeout( function() {
							for ( var k = 0; k < spTotal; k++ ) {

								var obj = items_container.children[ k ];
								
								//pause all videos
								if ( obj._texture.baseTexture.imageType == null ) {
									var videoSource = obj.texture.baseTexture.source;


									// play the video
									videoSource.currentTime = 0;
									videoSource.autoplay = false;
									videoSource.pause();
									videoSource.muted = true;
								}	
	

							}

							//play current video
							if ( curSp._texture.baseTexture.imageType == null ) {
								var videoSource2 = curSp.texture.baseTexture.source;

								// play the video
								videoSource2.currentTime = 0;
								videoSource2.autoplay = true;
								videoSource2.play();
								videoSource2.muted = false;
							}	

	
						}, animDuration*2 );
						
						

						
						
						//Current item entry action
				
						var baseTimeline = new TimelineMax( { onComplete: function () {
							displacementSprite.scale.set( 1 );       
						 },onUpdate: function() {
							displacementSprite.rotation += baseTimeline.progress() * 0.02;      
							displacementSprite.scale.set( baseTimeline.progress() * 3 );

						} });

						baseTimeline.clear();

						if ( baseTimeline.isActive() ) {
						  return;
						}        

						
						

						baseTimeline
						.to( displacementFilter.scale, 1, { x: 300, y: 300, ease: Power1.easeOut } )
						.to( prevSp, 0.5, { alpha: 0, ease: Power2.easeOut }, 0.2 )
						.to( curSp, 0.5, { alpha: 1, ease: Power2.easeOut }, 0.3)
						.to( displacementFilter.scale, 1, { x: 0, y: 0, ease: Power2.easeOut }, 0.3 );

						



						//Add new ripple each time mouse
						//-------------------------------------
						document.addEventListener("mousedown", function(e) {
					  
							TweenMax.to( displacementFilter.scale, 1, { x: "+=" + Math.sin( e.pageX ) * 100 + "", y: "+=" + Math.cos( e.pageY ) * 100 + ""  });   
							rotateSpite();
						});
						document.addEventListener("mouseup", function(e) {
					
							TweenMax.to( displacementFilter.scale, 1, { x: 0, y: 0 } );
						});
						
						var rotateSpite = function() {
							displacementFilter.rotation += 0.001;
						};
						
						
						
						
					}
					

				} // end effect
				
				
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 2 -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid2' ) ) {
					
				
					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						TweenMax.to( displacementSprite.scale, 1, { 
							x: 10
						} );

						
					} else {
						//Current item entry action
						
						TweenMax.to( $myRenderer, animDuration/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = items_container.children[ elementIndex ];

								TweenMax.to( this.target, animDuration/1000, {
									alpha : 1
								});	


								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = items_container.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									videoSource2.play();
									videoSource2.muted = false;
								}


								//display filters
								
								//sprite
								var baseTimeline = new TimelineMax( {
									delay       : 0,
									paused      : false,
									repeat      : 0,
									onRepeat    : function() {},
									onComplete  : function() {
										
										TweenMax.to( displacementSprite.scale, 1, { x: 1, y: 1 });   
										TweenMax.to( displacementSprite, 1, { rotation: 0 }); 
										
										

									},
									onUpdate    : function() {  
										displacementSprite.scale.set( baseTimeline.progress() * 13 );
										displacementSprite.rotation += baseTimeline.progress() * 0.02;
										
									}
								} );
								
								baseTimeline.clear();

								//filter
								baseTimeline
								  .to( displacementFilter.scale, 1, { y: "+=" + 200 + "", ease: Power3.easeOut } )
								  .to( curSp, 0.5, { alpha: 1, ease: Power3.easeOut }, 0.4 )     
								  .to( displacementFilter.scale, 1, { y: 0,  ease: Power3.easeOut }, 1 );      		

								
								

								

							}
						});		

						

						//Add new ripple each time mouse is clicked/mousemoved
						//-------------------------------------
						document.addEventListener("mousemove", function(e) {
					
							TweenMax.to( displacementFilter.scale, 1, { x: e.pageX/2 + "" });   
						});

	
					}	
					
					

					
				

				} // end effect
				
				

				//----------------------------------------------------------------------------------
				//--------------------------------- Liquid Distortion Effect 3 -----------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-liquid3' ) ) {
					
				
					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					if ( goType == 'out' ) {
						//Current item leaving action
						
						
						TweenMax.to( displacementSprite, 1, { 
							x: 23,
							y: 10
						} );
						
						
					} else {
						//Current item entry action
						
						TweenMax.to( $myRenderer, animDuration/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = items_container.children[ elementIndex ];

								TweenMax.to( this.target, animDuration/1000, {
									alpha : 1
								});	


								//display the current item
								for ( var k = 0; k < spTotal; k++ ) {

									var obj = items_container.children[ k ];
									TweenMax.set( obj, {
										alpha : 0
									});	

									//pause all videos
									if ( obj._texture.baseTexture.imageType == null ) {
										var videoSource = obj.texture.baseTexture.source;

										// play the video
										videoSource.currentTime = 0;
										videoSource.autoplay = false;
										videoSource.pause();
										videoSource.muted = true;
									}		

								}



								//play current video
								if ( curSp._texture.baseTexture.imageType == null ) {
									var videoSource2 = curSp.texture.baseTexture.source;

									// play the video
									videoSource2.currentTime = 0;
									videoSource2.autoplay = true;
									videoSource2.play();
									videoSource2.muted = false;
								}


								//display filters
								
								//sprite
								var baseTimeline = new TimelineMax( {
									delay       : 0,
									paused      : false,
									repeat      : 0,
									onRepeat    : function() {},
									onComplete  : function() {
							

									},
									onUpdate    : function() {  
									   
									}
								} );
								
								baseTimeline.clear();

								//filter
								baseTimeline
								  .to( displacementFilter.scale, 1, { y: "+=" + 50 + "", ease: Power3.easeOut } )
								  .to( curSp, 0.5, { alpha: 1, ease: Power3.easeOut }, 0.4 )     
								  .to( displacementFilter.scale, 1, { y: 0,  ease: Power3.easeOut }, 1 );  

								
								
								
								

								

							}
						});		

	
					}	
					
					

					
				

				} // end effect
				
				
				
				
				
				//----------------------------------------------------------------------------------
				//--------------------------------- 3D Rotating Effect -----------------------------
				//----------------------------------------------------------------------------------
				if ( slider.hasClass( 'uix-advanced-slider-sp--eff-3d-rotating' ) ) {
					
					//Display wrapper of canvas (transitions between slides)
					//-------------------------------------	
					
					if ( goType == 'out' ) {
						//Current item leaving action
						
						
						//rotation transition
						TweenMax.to( scenesAll[ elementIndex ].children[ 0 ].rotation, animDuration/1000, {
							x: '+=2',
							y: '+=2'
						});	
						
						
	
					} else {
						//Current item entry action
						
						TweenMax.to( $myRenderer, animDuration/1000, {
							alpha : 0,
							onComplete    : function() {

								var curSp = $myRenderer.find( '.list-item' ).eq( elementIndex );

								TweenMax.to( this.target, animDuration/1000, {
									alpha : 1
								});


								//display the current item
								TweenMax.set( $myRenderer.find( '.list-item' ), {
									alpha: 0,
									css  : {
										display: 'none'
									}
								});	


								// pause all videos
								for ( var k = 0; k < spTotal; k++ ) {

									var videoOb = texturesAll[ k ].image;

									if ( videoOb.currentSrc.indexOf( '.mp4' ) >= 0 ) {
										videoOb.autoplay = false;
										videoOb.currentTime = 0;
										videoOb.muted = true;
										videoOb.pause();
									}

								}



								// play the video
								var videoObCur =  texturesAll[ elementIndex ].image;

								if ( videoObCur.currentSrc.indexOf( '.mp4' ) >= 0 ) {
									videoObCur.autoplay = true;
									videoObCur.currentTime = 0;
									videoObCur.muted = false;
									videoObCur.play();
								}



								//display filters
								TweenMax.to( curSp, animDuration/1000, {
									alpha: 1,
									css : {
										display: 'block'
									}
								});	


							}
						});			

						
					}



					

				}// end effect
					
				
				
				
			} else {
				slider.find( '.uix-advanced-slider-sp__item canvas' ).hide();
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

    APP.components.pageLoaded.push( APP.ADVANCED_SLIDER_FILTER.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Advanced Slider (Basic) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.ADVANCED_SLIDER               = APP.ADVANCED_SLIDER || {};
	APP.ADVANCED_SLIDER.version       = '0.0.6';
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
				dataLoop                 = $this.data( 'loop' );

	
			
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
			if( typeof dataLoop === typeof undefined ) dataLoop = false;

				

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



			//Added touch method to mobile device
			//-------------------------------------	
			var startX,
				startY;


			$this.on( 'touchstart.ADVANCED_SLIDER', function( event ) {
				var touches = event.originalEvent.touches;
				if ( touches && touches.length ) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;


					$this.on( 'touchmove.ADVANCED_SLIDER', function( event ) {

						var touches = event.originalEvent.touches;
						if ( touches && touches.length ) {
							var deltaX = startX - touches[0].pageX,
								deltaY = startY - touches[0].pageY;

							if ( deltaX >= 50) {
								//--- swipe left


								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, sliderWrapper, 'prev' );


								//Pause the auto play event
								clearInterval( timer );

							}
							if ( deltaX <= -50) {
								//--- swipe right

								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, sliderWrapper, 'next' );


								//Pause the auto play event
								clearInterval( timer );							


							}
							if ( deltaY >= 50) {
								//--- swipe up


							}
							if ( deltaY <= -50) {
								//--- swipe down

							}
							if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
								$this.off( 'touchmove.ADVANCED_SLIDER' );
							}
						}

					});
				}	
			});
			

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
			if( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
			if( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
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





/* 
 *************************************
 * <!-- Circle Layout -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.CIRCLE_LAYOUT               = APP.CIRCLE_LAYOUT || {};
	APP.CIRCLE_LAYOUT.version       = '0.0.1';
    APP.CIRCLE_LAYOUT.documentReady = function( $ ) {

		$( '.js-uix-circle-layout' ).each( function( id ) {
			var $this             = $( this ),
				$ul               = $this.find( '> ul' ),
			    $li               = $ul.find( '> li' ),
				liWidth           = $li.first().outerWidth(),
				liHeight          = $li.first().outerHeight(),
				display           = $this.data( 'circle-layout-display' ),
				radius            = $this.data( 'circle-layout-radius' ),
				radius2           = $this.data( 'circle-layout-radius-c' ),
				rotation          = $this.data( 'circle-layout-rotation' );
			
			
			
			if( typeof display === typeof undefined ) {
				display = 5;
			}	
			
			if( typeof radius === typeof undefined ) {
				radius = 180;
			}	
			
			if( typeof radius2 === typeof undefined ) {
				radius2 = 110;
			}		
			
			if( typeof rotation === typeof undefined ) {
				rotation = 0;
			}			
			
			$this.css( {
			    'width'      : radius * 2 + 'px'
			} );

			
			
			$ul.css( {
			    'width'     : radius * 2 + 'px',
			    'height'    : radius * 2 + 'px',
				'transform' : 'rotate('+parseFloat(rotation)+'deg)'
			} );

			
			$ul.next( 'div' ).css( {
			    'width'      : radius2 * 2 + 'px',
			    'height'     : radius2 * 2 + 'px'
			} );	
			
			
			

			//Layout components in a circle layout
			var angle           = 0,
			    step            = 2 * Math.PI / display,
			    transitionDelay = 0,
				pad             = $ul.width();

			
			$li.each( function() { //Can'nt use arrow function here!!!
				// 'this' works differently with arrow fucntions
				var el          = $( this ),
					x           = radius * Math.cos(angle) - liWidth / 2,
					y           = radius * Math.sin(angle) - liHeight / 2;

				
				el.css({
					'transform'        : 'translate('+parseFloat( x + liWidth/2 )+'px,'+parseFloat( pad/2 + y + liHeight/2 )+'px)',
					'transition-delay' : transitionDelay + "s"
				})
				.find( '> a' )
				.css({
					'transform'        : 'rotate('+parseFloat(-rotation)+'deg)'
				});
				
				
				
				
				angle += step;
				transitionDelay += 0.15;
			});	

			
			
		});
		
		
    };

    APP.components.documentReady.push( APP.CIRCLE_LAYOUT.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Counter -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.COUNTER               = APP.COUNTER || {};
	APP.COUNTER.version       = '0.0.2';
    APP.COUNTER.documentReady = function( $ ) {

		var waypoints = $( '[data-counter-number]' ).waypoint({
			handler: function( direction ) {

				$( this.element ).countTo();

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();


			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
    };

    APP.components.documentReady.push( APP.COUNTER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






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

/* 
 *************************************
 * <!-- Dropdown Menu -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_MENU               = APP.DROPDOWN_MENU || {};
	APP.DROPDOWN_MENU.version       = '0.0.1';
    APP.DROPDOWN_MENU.documentReady = function( $ ) {

		//Create a trigger of Dropdown Menu on Click
		$( '.uix-dropdown-menu' ).each( function() {
			var $this = $( this );

			//Close the target
			$this.find( '> label' ).on( 'click', function( e ) {
				e.preventDefault();
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();

				$this.toggleClass( 'is-opened' );

			});	

			$this.find( 'li a' ).on( 'click', function() {
				$this.removeClass( 'is-opened' );	
				$this.find( 'input[type="hidden"]' ).val( $( this ).data( 'value' ) );
				$this.find( '> label > span' ).html( $( this ).text() );
 
			});		


			$( 'html' ).on( 'click', function() {
				$this.removeClass( 'is-opened' );	
			});		



		});

		
    };

    APP.components.documentReady.push( APP.DROPDOWN_MENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_MENU2               = APP.DROPDOWN_MENU2 || {};
	APP.DROPDOWN_MENU2.version       = '0.0.1';
    APP.DROPDOWN_MENU2.documentReady = function( $ ) {

		var $verticalMenuLi = $( '.uix-vertical-menu li' );
		
		$verticalMenuLi.find( '> a' ).on( 'click', function( e ) {
			e.preventDefault();
			
			//Hide other all sibling <ul> of the selected element
			$( this ).parent( 'li' ).siblings()
			                        .removeClass( 'active' )
									.find( '> ul' ).slideUp( 500 );

			
			var $sub = $( this ).parent( 'li' ).children( 'ul' );

			$sub.slideToggle( 500 );
			$( this ).parent( 'li' ).toggleClass( 'active' );

        });
		
		//Add multilevel indicator arrow
		if ( $verticalMenuLi.find( '> a .uix-vertical-menu__arrow' ).length == 0 ) {
			$verticalMenuLi.find( '> a' ).append( '<span class="uix-vertical-menu__arrow"></span>' );
		}
        
		$verticalMenuLi.each( function() {
			var len = $( this ).find( 'ul' ).length;
			if ( len == 0 ) {
				$( this ).children( 'a' ).children( '.uix-vertical-menu__arrow' ).hide();
			}
		});
		
    };

    APP.components.documentReady.push( APP.DROPDOWN_MENU2.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DYNAMIC_DD_LIST               = APP.DYNAMIC_DD_LIST || {};
	APP.DYNAMIC_DD_LIST.version       = '0.0.1';
    APP.DYNAMIC_DD_LIST.documentReady = function( $ ) {

		$( '[data-ajax-dynamic-dd-json]' ).each( function() {
			var $this            = $( this ),
			    jsonFile         = $this.data( 'ajax-dynamic-dd-json' ),
				ranID            = 'dynamic-dd-control-' + UIX_GUID.newGuid(),
				method           = $this.data( 'ajax-dynamic-dd-method' ),
				event            = $this.data( 'ajax-dynamic-dd-event' ),
				associated       = $this.data( 'ajax-dynamic-dd-associated' ),
				toData           = $this.data( 'ajax-dynamic-dd-data' ),
				ID               = $this.attr( 'id' ),
				thisChange       = true,
				curID;
	

			if( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}	
			
			if( typeof toData === typeof undefined ) {
				toData = '';
			}	
			
			if( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			
			
			if( typeof associated === typeof undefined ) {
				associated = '#demo';
			}		
			
			if( typeof ID === typeof undefined ) {
				$this.attr( 'id', ranID );
			}	
			
			
			curID = $this.attr( 'id' );
			
			
			//Parse the JSON data
			if ( jsonFile != '' ) {
				
				//Initialize dependent/chained dropdown list
				$.ajax({
					url      : jsonFile,
					method   : method,
					data     : toData,
					dataType : 'json',
					success  : function ( data ) { 

						var firstOptionsHtml = '';
						
						//Push the options to target select
						for ( var m = 0; m < data.length; m++ ) {
							firstOptionsHtml += "<option value='"+data[m].name+"'>"+data[m].name+"</option>";
						}	
						
						$( firstOptionsHtml ).insertAfter( $this.find( 'option' ).first() );


						//Initialize the custom select
						$( document ).customSelectInit();
					

					 },
					 error  : function() {


					 }
				});
				
				
				
				//Dropdown list change event trigger
				$( document ).on( 'change', '#' + curID, function( e ) {

					e.preventDefault();
					
				
					if ( thisChange ) {
						
						thisChange = false;
						
						var curVal = $( '#' + curID + ' option:selected' ).val();

						
						if ( curVal != '' ) {
							
							//remove the empty option
							$( '#' + curID + ' option[value=""]' ).remove();

							//Returns JSON data
							$.ajax({
								url      : jsonFile, //Be careful about the format of the JSON file
								method   : method,
								data     : toData,
								dataType : 'json',
								success  : function ( data ) { 

									//If the data is empty
									if ( data == null ) {
										//do something
									}

									
									for ( var m = 0; m < data.length; m++ ) {

										//Check if a key exists inside a json object
										if ( data[m].name == curVal ) {


											var optionsHtml   = '',
												cities        = data[m].city,
												list          = data[m].list;


											if ( typeof list === typeof undefined ) {
												//Traversing json of chinese provinces and cities
												//-------------------------------------	
												for ( var i = 0; i < cities.length; i++ ) {

													var city      = cities[i].name,
														area      = cities[i].area;

													var areaTxt = '';
													for ( var k = 0; k < area.length; k++ ) {
														areaTxt += JSON.stringify( area[k] ) + ',';
													}

													areaTxt = areaTxt.replace(/,\s*$/, '' );


													optionsHtml += "<option data-name='"+city+"' data-area='["+areaTxt+"]'  value='"+city+"'>"+city+"</option>";

												}
											} else {
												//Traversing json with coordinates and details
												//-------------------------------------		
												for ( var i2 = 0; i2 < list.length; i2++ ) {

													var name      = list[i2].name,
														longitude = list[i2].longitude,
														latitude  = list[i2].latitude,
														addresses = list[i2].addresses;

													var addressesTxt = '';
													for ( var k2 = 0; k2 < addresses.length; k2++ ) {
														
														//Need to filter single quotes
														addressesTxt += JSON.stringify( addresses[k2] ).replace(/'/g, '&apos;' ) + ',';
													}

													addressesTxt = addressesTxt.replace(/,\s*$/, '' );


													optionsHtml += "<option data-name='"+name+"' data-addresses='["+addressesTxt+"]' data-longitude='"+longitude+"' data-latitude='"+latitude+"' value='"+name+"'>"+name+"</option>";

												}

											}

											$( associated ).html( optionsHtml );


											//Initialize the custom select
											$( document ).customSelectInit();
											$( associated ).attr( 'selected', 'selected' ).change();

											break;
										}
									}//end for
									

									//Avoid duplicate events running
									thisChange = true;

								 },
								 error  : function() {


								 }
							});


						}	
					}
					

					
					return false;


				});	
				
				
				
				//The target select event
				$( document ).on( 'change.cusSelectDynamicDD', associated, function( e ) {

					e.preventDefault();
					
					var $this        = $( this[ this.selectedIndex ] ),
						curVal       = $this.val(),
						curLongitude = $this.data( 'longitude' ),
						curLatitude  = $this.data( 'latitude' ),
						curAddresses = $this.data( 'addresses' ),
						curContents  = '';
					
					if ( Object.prototype.toString.call( curAddresses ) =='[object Array]' ) {
						for ( var k = 0; k < curAddresses.length; k++ ) {
							curContents += curAddresses[k].addr_name + ': ' + curAddresses[k].addr_longitude + ', ' + curAddresses[k].addr_latitude;
						}
						
					}
					
					//console.log( curVal + ' Longitude: ' + curLongitude + ' | Latitude: ' + curLatitude + ' | Addresses: ' + curContents );
					
					return false;
				
					

				});				
				
				
			}
			


			
			
		});
		
    };

    APP.components.documentReady.push( APP.DYNAMIC_DD_LIST.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







/*
 * Search string from JSON data
 * @Format reference: assets/json/countries.json
 *
 * @param  {function} callback               - Return function after successful loading of JSON file.
 * @param  {string} jsonFile                 - The path to the JSON file.
 * @param  {string} key                      - Target key of the JSON data.
 * @return {function}                        - Return a callback function.
 */
( function ( $ ) {
    $.fn.searchJsonString = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			method    : 'POST',
			callback  : null,
			jsonFile  : '',
			key       : 'addresses'
        }, options );
 
        this.each( function() {
			
			var obj = $( this );
			
			
			//Returns JSON data
			$.ajax({
				url      : settings.jsonFile,
				method   : settings.method,
				dataType : 'json',
				success  : function ( data ) { 

					var newArr = [];
					
					//Convert JSON to an array
					var formatFromServer = function formatFromServer( data ) {
						var formatData = {};

						for ( var item in data ) {
							if ( $( document ).isJsonObject( { string:  data[item] } ) ) {
								formatFromServer( data[item], formatData );
							} else {
								formatData[item] = data[item];
							}
						}

						for ( var item2 in formatData ) {
							//console.log( formatData[ item2 ] );
							newArr.push( formatData[ item2 ] );
						}



						return formatData;
					};

					formatFromServer( data );


					//search JSON key that contains specific string
					for ( var p = 0; p < newArr.length; p++ ) {
						
						for ( var n = 0; n < newArr[p].list.length; n++ ) {
							
							if ( Object.prototype.toString.call( newArr[p].list[n][settings.key] ) =='[object Array]' ) {
								
								// API: Callback
								settings.callback( newArr[p].list[n][settings.key] );

							}


						}


					}



				 },
				 error  : function() {


				 }
			});

			
		});
 
    };
 
}( jQuery ));



/*
 * Check if a string is a valid JSON string
 * Note: Used when certain functions use "JSON.parse"
 *
 * @param  {string} string                   - A json arbitrary string
 * @return {boolean}                         - Return a boolean.
 */
( function ( $ ) {
    $.fn.isJsonObject = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			string    : ''
        }, options );
 
        this.each( function() {
			
			var str = settings.str;

			if ( typeof( str ) == 'string' && str.length > 0 ) {

				if ( str.replace( /\"\"/g, '' ).replace( /\,/g, '' ) == '[{}]' ) {
					return false;
				} else {

					if (/^[\],:{}\s]*$/.test( str.replace(/\\["\\\/bfnrtu]/g, '@' ).
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

						return true;

					}else{

						return false;

					}	

				}

			} else {
				return false;
			}
			
			
		});
 
    };
 
}( jQuery ));


/* 
 *************************************
 * <!-- Flexslider -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FLEXSLIDER               = APP.FLEXSLIDER || {};
	APP.FLEXSLIDER.version       = '0.1.0';
    APP.FLEXSLIDER.documentReady = function( $ ) {

		var $window            = $( window ),
			windowWidth        = $window.width(),
			windowHeight       = $window.height(),
			flexslider         = {
						           vars: {}
					              };
		
		/*
		 * Tiny helper function to add breakpoints.
		 *
		 * @param  {number} number           - Number of carousel items that should be visible.
		 * @return {void}                    - The constructor.
		 */
        function getGridSize( number ) {
            return ( $window.width() <= 768 ) ? 1 : number;
        }

		
		/*
		 * Return an event from callback function to each slider.
		 *
		 * @param  {object} thisSlider             - The current slider.
		 * @param  {object} sliderWrapper          - The current slider wrapper.
		 * @param  {string} fireState              - State of fire asynchronously.
		 * @return {number}                        - Index of current slider .
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
				dataParallax      = thisSlider.data( 'my-parallax' );
			
			
			if( typeof dataPNThumbs === typeof undefined ) dataPNThumbs = false;
			if( typeof dataTimeline === typeof undefined ) dataTimeline = false;
			if( typeof dataCountTotal === typeof undefined ) dataCountTotal = false;
			if( typeof dataCountCur === typeof undefined ) dataCountCur = false;
			if( typeof dataParallax === typeof undefined ) dataParallax = false;	
			
			
			//Total counter selector
			//Current counter selector.
			var countTotalSelector = ( dataCountTotal ) ? $( dataCountTotal ) : $( 'p.count em.count' ), 
				countCurSelector   = ( dataCountCur ) ? $( dataCountCur ) : $( 'p.count em.current' );
			
			

			
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
						$plinkPrev = $plink.filter( '.uix-flexslider__arrows-thumb--prev' ),
						$plinkNext = $plink.filter( '.uix-flexslider__arrows-thumb--next' );

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
				if( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {


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
					
				}


				//Display counter
				//-------------------------------------
				if ( sliderWrapper.find( '.count' ).length == 0 ) {
					if ( sliderWrapper.closest( 'section' ).find( '.count' ).length > 0 ) {
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
		 * @param  {object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {boolean} play            - Forced to trigger pause or play events.
		 * @return {void}                    - The constructor.
		 */
		function videoEmbedInit( wrapper, play ) {
			wrapper.find( '.uix-video__slider' ).each( function()  {
				var $this          = $( this ),
					videoWrapperW  = $this.closest( '[data-embed-video-wrapper]' ).width(),
					videoWrapperH  = $this.closest( '[data-embed-video-wrapper]' ).height(),
					tempID         = 'video-' + UIX_GUID.newGuid(),
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
		

		
		/*
		 * Make slider image draggable 
		 *
		 * @param  {object} $obj             - The current FlexSlider setup using custom selector.
		 * @return {void}                   - The constructor.
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
		 * @param  {number} slideNumber          - The current slider index.
		 * @param  {object} childrenSlidesObj    - Target slider.
		 * @param  {boolean} loop                - Gives the slider a seamless infinite loop.
		 * @param  {number} speed                - Set the speed of animations, in milliseconds.
		 * @param  {number} timing               - Set the speed of the slideshow cycling, in milliseconds.
		 * @return {void}                        - The constructor.
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
				dataParallax      = $this.data( 'my-parallax' ),
				dataSync          = $this.data( 'my-sync' );
			
			
			//Fires local videos asynchronously with slider switch.
			videoEmbedInit( $this.find( '.uix-flexslider__item' ), false );
			
			
			// Custom Controls
			var myControlsContainer, myCustomDirectionNav;
			if( typeof customConID === typeof undefined || customConID == '' || customConID == false ) {
				myControlsContainer  = '';
				myCustomDirectionNav = '';
			} else {
				myControlsContainer  = $( '.uix-flexslider__controls' + customConID );
				myCustomDirectionNav = $( '.uix-flexslider__arrows'+customConID+' a' );	
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
			if( typeof dataPNThumbs === typeof undefined ) dataPNThumbs = false;
			if( typeof dataTimeline === typeof undefined ) dataTimeline = false;
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
				my_minItems  = getGridSize( dataShowItems );
				my_maxItems  = getGridSize( dataShowItems );
				
			} 
			
			
			// Determine if this slider is added with a synchronization event
			$( '[data-my-sync]' ).each( function()  {
				var curSync      = $( this ).data( 'my-sync' ),
					thisSliderID = $this.attr( 'id' );
				
				
				if( typeof curSync != typeof undefined ) {
					curSync = curSync.toString().replace( '#', '' ).replace( '.', '' );
				}
				
				
				if( typeof thisSliderID != typeof undefined && thisSliderID == curSync ) {
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
					if( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {
					    flexslider = slider;		
					}
					
					initslides( $this, slider, 'start' );

				},
				
				//Fires asynchronously with each slider animation.
				before: function( slider ) {
					initslides( $this, slider, 'before' );
					
					// Call the updateChildrenSlides which itterates through all children slides 
					if( typeof dataSync != typeof undefined && dataSync != '' && dataSync != 0 ) {
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
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				$sliderDefault.each( function() {
					
					if ( $( this ).length > 0 ) {

						// check grid size on resize event
						var dataShowItems = $( this ).data( 'my-multiple-items' );
		
						
						if( typeof dataShowItems != typeof undefined && dataShowItems != '' && dataShowItems != 0 ) {

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





/*
 * jQuery FlexSlider v2.7.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public

    //if rtl value was not passed and html is in rtl..enable it by default.
  	if(typeof options.rtl=='undefined' && $('html').attr('dir')=='rtl'){
  		options.rtl=true;
    }
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // deprecating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : ( slider.vars.rtl ? "marginRight" : "marginLeft" );
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (slider.vars.rtl?
                                ((keycode === 37) ? slider.getTarget('next') :
                                (keycode === 39) ? slider.getTarget('prev') : false)
                                :
                                ((keycode === 39) ? slider.getTarget('next') :
                                (keycode === 37) ? slider.getTarget('prev') : false)
                                )
                                ;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
        				var posFromX;
                if(slider.vars.rtl){
        					posFromX = -1*($slide.offset().right - $(slider).scrollLeft()); // Find position of slide relative to right of slider container
        				}
        				else
        				{
        					posFromX = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
        				}
                if( posFromX <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;
                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : (slider.vars.rtl?-1:1)*(startX - localX);
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = (slider.vars.rtl?-1:1)*accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each( function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * ((slider.vars.rtl)?1:-1)) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl?-1:1)*parseInt(target)+'px') + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
          if(slider.vars.rtl){
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
           }
            else{
              slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            }
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        if(slider.vars.rtl){
          slider.slides.css({"width": "100%", "float": 'right', "marginLeft": "-100%", "position": "relative"});
        }
        else{
          slider.slides.css({"width": "100%", "float": 'left', "marginRight": "-100%", "position": "relative"});
        }
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {},             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
	rtl: false             //{NEW} Boolean: Whether or not to enable RTL mode
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each( function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);

/* 
 *************************************
 * <!-- Form -->
 *************************************
 */
/*
    Note:
	
	If you use the "change" event to asynchronously change a custom control of select, radio or checkbox, 
	you need add a callback function that initializes the style:
	
	$( document ).customSelectInit();
	$( document ).customRadioCheckboxInit();
	
*/

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FORM               = APP.FORM || {};
	APP.FORM.version       = '0.0.1';
    APP.FORM.documentReady = function( $ ) {

		/* 
		 ---------------------------
		 Callbacks for special forms (supports asynchronous)
		 ---------------------------
		 */ 
		// Add this code to initialize the style when calling 
		// the form externally with other scripts
		$( document ).customSpecialFormsInit();
		
		/* 
		 ---------------------------
		 Disabled Status
		 ---------------------------
		 */ 	
		
		$( 'input.disabled' ).each( function(){
			$( this ).prop('disabled', true);
		});
		
		
		
		/* 
		 ---------------------------
		 Input File
		 ---------------------------
		 */ 
		$( '.uix-controls__file-container' ).each( function()  {
			var fileInput  = $( this ).find( 'input[type="file"]' ),
				fileBtn    = $( this ).find( '.uix-controls__file-trigger' ),
				filePath   = $( this ).next( '.uix-controls__file-return' );
			
			fileBtn.on( 'click', function() {
				fileInput.focusin();
				
			});	
			
			fileInput.on( 'change', function() {
				filePath.text( $( this ).val() );
			});	
			
		});

		
		/* 
		 ---------------------------
		 Hover Effect
		 ---------------------------
		 */ 
		$( '.float-label' ).each( function(){
			
			var $this = $( this );
			

			// on focus add cladd active to label
			$this.on( 'focus', function() {
				$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
			});
			
			
			//on blur check field and remove class if needed
			$this.on( 'blur change', function( e ) {
				if( $this.val() === '' || $this.val() === 'blank') {
					$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).removeClass( 'active' );
				}	
				
			});
			
			// if exist cookie value
			if( $this.val() != '' && $this.val() != 'blank') { 
			   $( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
			}
			
			
		});
		
		
		//Search Submit Event in WordPress
		$( '.uix-search-box__submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		/* 
		 ---------------------------
		 Date Picker
		 ---------------------------
		 */ 
		if ( $.isFunction( $.fn.datepicker ) ) {

			$( '[data-picker]' ).each( function() {

				var $this            = $( this ),
					dateFormat       = $this.data( 'picker-format' ),
					monthNames       = $this.data( 'picker-month' ),
					nextText         = $this.data( 'picker-next' ),
					prevText         = $this.data( 'picker-prev' ),
					dayNames         = $this.data( 'picker-day' ),
					myminDate        = $this.data( 'picker-min-date' ),
					mymaxDate        = $this.data( 'picker-max-date' );
				
				
				
				// If there is no data-xxx, save current source to it
				if( typeof dateFormat === typeof undefined ) dateFormat = 'MM d, yy';
				if( typeof monthNames === typeof undefined ) monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				if( typeof nextText === typeof undefined ) nextText = '&#8594;';
				if( typeof prevText === typeof undefined ) prevText = '&#8592;';
				if( typeof dayNames === typeof undefined ) dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
				if( typeof myminDate === typeof undefined ) myminDate = -1825;
				if( typeof mymaxDate === typeof undefined ) mymaxDate = 0;
		
				$this.datepicker({
					"monthNamesShort" : monthNames,
					"nextText"        : nextText,
					"prevText"        : prevText,
					"dayNamesShort"   : dayNames,
					"dateFormat"      : dateFormat,
					"changeMonth"     : true,
					"changeYear"      : true,
					"yearRange"       : "1930:2092",
					"minDate"         : myminDate,
					"maxDate"         : mymaxDate
				});
				


			} );
			
			
		
			//Dynamic listening for the latest value
			$( document ).on( 'mouseleave', '[data-handler]', function() {
				$( '[data-picker]' ).each( function() {
					$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
				});

			});	
			
			

		}
		
		/* 
		 ---------------------------
		 Input Validation 
		 ---------------------------
		 */ 
//		$(document).on( 'submit', '.app-general-form-container form', function(e) {
//
//			var $form        = $( this ),
//				validationOK = true,
//				emailRe      = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm,
//				numReg       = /^\d+$/;
//
//
//
//			//Email
//			var emailVal = $form.find( '[name="name5"]' ).val();
//			if ( emailVal != '' && !emailRe.test( emailVal ) ) {
//				$form.find( '.response' ).html( '<span class="no"><i class="fa fa-times" aria-hidden="true"></i> A valid email address.</span>' );
//
//				validationOK = false;
//			}
//
//
//			$form.find( '.reqiured' ).each( function()  {
//
//
//				if ( $( this ).val() == '' ) {
//
//					var info = $( this )
//									.closest( '.row' )
//									.find( '.col-sm-4' )
//									.html()
//									.replace(/(&nbsp;|<([^>]+)>|\*)/ig, '' );
//
//					$form.find( '.response' ).html( '<span class="no"><i class="fa fa-times" aria-hidden="true"></i> "'+info+'" Can not be empty.</span>' );
//
//					validationOK = false;
//					return false;
//
//				}
//
//
//
//			});
//
//
//			if ( validationOK ) {
//				return true;
//			} else {
//				return false;
//			}
//
//		});
		
		
		
    };

    APP.components.documentReady.push( APP.FORM.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Callbacks for special forms (supports asynchronous)
 *
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.customSpecialFormsInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({ }, options );
 
        this.each( function() {
			
			//Custom Select
			$( document ).customSelectInit();


			//Custom Radio, Toggle And Checkbox
			$( document ).customRadioCheckboxInit();


			//Create Line Effect on Click
			$( document ).customControlsLineEffInit();


			
		});
 
    };
 
}( jQuery ));



/*
 * Custom Select
 *
 * @param  {string} selector             - The current selector.
 * @param  {string} targetWrapper        - Wrapper of the selector.
 * @param  {string} trigger              - Trigger of the selector.
 * @param  {string} itemsWrapper         - Selector's options container.
 * @param  {object} item                 - Each option of the selector.
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.customSelectInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selector         : '.uix-controls__select',
			targetWrapper    : '.uix-controls__select-wrapper',
			trigger          : '.uix-controls__select-trigger',	
			itemsWrapper     : '.uix-controls__select__option-container',
			item             : '.uix-controls__select__option'
        }, options );
 
        this.each( function() {
			
		
			$( settings.selector ).not( '.js-uix-new' ).each( function() {

				var $this     = $( this ),
					classes   = $this.attr( 'class' ),
					id        = $this.attr( 'id' ),
					name      = $this.attr( 'name' ),
					template  = '',
					labelText = $this.find( '> span' ).html(),
					dataExist = $this.data( 'exist' );

				

				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {

					template  = '<div class="' + classes + ' js-uix-new">';
					template += '<span class="uix-controls__select-trigger">' + $this.find( 'select' ).attr( 'placeholder' ) + '</span><span class="uix-controls__bar"></span>';
					template += '<div class="uix-controls__select__option-container">';

					$this.find( 'select option' ).each( function( index ) {

						var selected = '';

						if ( $( this ).is( ':selected' ) ) {
							selected = 'active';
						}

						template += '<span class="uix-controls__select__option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
					});
					template += '</div></div>';

					if ( typeof labelText != typeof undefined && labelText != '' ) {
						template += '<span class="uix-controls__select-label">' + labelText + '</span>';
					}


					$this.wrap('<div class="'+ settings.targetWrapper.replace( '.', '' )+' '+( $this.hasClass( 'uix-controls--line' ) ? 'uix-controls--line' : '' )+' '+( $this.hasClass( 'is-fullwidth' ) ? 'is-fullwidth' : '' )+' '+( $this.hasClass( 'disabled' ) ? 'disabled' : '' )+'"></div>');
					$this.hide();
					$this.after( template );	


					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );
				}


			});

			//Show/Hide Selector
			$( document ).on( 'click', settings.trigger, function( e ) {
				e.preventDefault();

				var $selectWrapper    = $( this ).closest( settings.targetWrapper ),
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.js-uix-new' );

				$selectCurWrapper.addClass( 'is-opened' );

			});

			$( document.body ).on( 'click touchstart', function( e ) {
				$( settings.selector + '.js-uix-new' ).removeClass( 'is-opened' );
			});		




			//Set the default selector text
			$( settings.selector + '.js-uix-new' ).each( function( index ) {
				$( this ).find( settings.trigger ).text( $( this ).find( settings.item + '.active' ).html() );
			});


			//Change Event Here
			//Prevents the triggering of multiple change events
			$( document ).off( 'click.FORM_SELECT' );
			$( document ).on( 'click.FORM_SELECT', settings.item, function( e ) {
				e.preventDefault();

				var $selectWrapper    = $( this ).closest( settings.targetWrapper ),
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.js-uix-new' ),
					curVal            = $( this ).data( 'value' );

				//Close the selector
				$selectCurWrapper.removeClass( 'is-opened' );

				//Set the selector text
				$selectCurWrapper.find( settings.trigger ).text( $( this ).html() );

				//Activate this option
				$selectCurWrapper.find( settings.item ).removeClass( 'active' );
				$( this ).addClass( 'active' );

				//Set select option 'selected', by value
				$selectWrapper.find( 'select' ).val( curVal );
				$selectWrapper.find( 'select option' ).removeAttr( 'selected' );
				$selectWrapper.find( 'select option[value="'+curVal+'"]' ).attr( 'selected', 'selected' ).change();

			});



			//Synchronize to the original select change event
			$( settings.selector ).not( '.js-uix-new' ).each( function() {

				var $this       = $( this ).find( 'select' ),
					$cusSelect  = $this.closest( settings.targetWrapper ).find( settings.selector + '.js-uix-new' ),
					newOptions  = '';


				$this.closest( settings.targetWrapper ).find( 'select option' ).each( function( index ) {

					var selected = '';

					if ( $( this ).is( ':selected' ) ) {
						selected = 'active';
					}

					newOptions += '<span class="uix-controls__select__option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
				});


				$cusSelect.find( settings.itemsWrapper ).html( '<div>' + newOptions + '</div>' );


				//Set the default selector text
				$cusSelect.each( function( index ) {
					$( this ).find( settings.trigger ).text( $( this ).find( settings.item + '.active' ).html() );
				});

			});

			
			
		});
 
    };
 
}( jQuery ));



/*
 * Custom Radio, Checkbox and Toggle 
 *
 * @param  {string} radioWrapper             - Wrapper of the radio.
 * @param  {string} toggle                   - Toggle of the checkbox.
 * @param  {string} checkboxWrapper          - Wrapper of the checkbox.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customRadioCheckboxInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			radioWrapper    : '.uix-controls__radio',
			toggle          : '.uix-controls__toggle',
			checkboxWrapper : '.uix-controls__checkbox'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customRadio        = settings.radioWrapper,
				customToggle       = settings.toggle,
				customCheckbox     = settings.checkboxWrapper;


			$( customRadio ).find( 'input[type="radio"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__radio-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			$( customToggle ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__toggle-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			$( customCheckbox ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__checkbox-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			
			
		});
 
    };
 
}( jQuery ));


		


/*
 * Create Line Effect on Click
 *
 * @param  {string} controls                 - Wrapper of controls.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customControlsLineEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls.uix-controls--line'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customControls     = settings.controls;


			$( customControls ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__bar"></span>' ).insertAfter( $( this ).find( 'label' ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			
			
			
		});
 
    };
 
}( jQuery ));


/* 
 *************************************
 * <!-- jQuery UI Datepicker 1.11.4 -->
 *************************************
 */

/*
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */


$.extend($.ui, { datepicker: { version: "1.11.4" } });

var datepicker_instActive;

function datepicker_getZindex( elem ) {
	var position, value;
	while ( elem.length && elem[ 0 ] !== document ) {
		// Ignore z-index if position is set to a value where z-index is ignored by the browser
		// This makes behavior of this function consistent across browsers
		// WebKit always returns auto if the element is positioned
		position = elem.css( "position" );
		if ( position === "absolute" || position === "relative" || position === "fixed" ) {
			// IE returns 0 when zIndex is not specified
			// other browsers return a string
			// we ignore the case of nested elements with an explicit value of 0
			// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
			value = parseInt( elem.css( "zIndex" ), 10 );
			if ( !isNaN( value ) && value !== 0 ) {
				return value;
			}
		}
		elem = elem.parent();
	}

	return 0;
}
/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January","February","March","April","May","June",
			"July","August","September","October","November","December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend( true, {}, this.regional[ "" ]);
	this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
	this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
	setDefaults: function(settings) {
		datepicker_extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
	_attachDatepicker: function(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
		this._autoSize(inst);
		$.data(target, "datepicker", inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.unbind("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ?
				$("<img/>").addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$("<button type='button'></button>").addClass(this._triggerClass).
					html(!buttonImage ? buttonText : $("<img/>").attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, "datepicker", inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.keydown(this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], "datepicker", inst);
		}
		datepicker_extendRemove(inst.settings, settings || {});
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], "datepicker", inst);
		return this;
	},

	/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
	_destroyDatepicker: function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, "datepicker");
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind("focus", this._showDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}

		if ( datepicker_instActive === inst ) {
			datepicker_instActive = null;
		}
	},

	/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_enableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").
				each( function() { this.disabled = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_disableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").
				each( function() { this.disabled = true; }).end().
				filter("img").css({opacity: "0.5", cursor: "default"});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
	_getInst: function(target) {
		try {
			return $.data(target, "datepicker");
		}
		catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
	_optionDatepicker: function(target, name, value) {
		var settings, date, minDate, maxDate,
			inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name === "all" ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			datepicker_extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ( "disabled" in settings ) {
				if ( settings.disabled ) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
									$.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			
			//Prevents further propagation of the current event in the capturing and bubbling phases.
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var chars, chr,
			inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var date,
			inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));

				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		datepicker_extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) { // hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each( function() {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px"});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.css( "z-index", datepicker_getZindex( $( input ) ) + 1 );
			$.datepicker._datepickerShowing = true;

			if ( $.effects && $.effects.effect[ showAnim ] ) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ( $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);

		var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17,
			activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );

		if ( activeCell.length > 0 ) {
			datepicker_handleMouseover.apply( activeCell.get( 0 ) );
		}

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
			inst.input.focus();
		}

		// deffered render of the years select (to avoid flashes on Firefox)
		if( inst.yearshtml ){
			origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function( inst ) {
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
	_hideDatepicker: function(input) {
		var showAnim, duration, postProcess, onClose,
			inst = this._curInst;

		if (!inst || (input && inst !== $.data(input, "datepicker"))) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var date,
			target = $(id),
			inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] =
		inst["draw" + (period === "M" ? "Month" : "Year")] =
			parseInt(select.options[select.selectedIndex].value,10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var inst,
			target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		} else if (inst.input) {
			inst.input.trigger("change"); // fire the change event
		}

		if (inst.inline){
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) !== "object") {
				inst.input.focus(); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

		if (altField) { // update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each( function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
	iso8601Week: function(date) {
		var time,
			checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
	parseDate: function (format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}

		var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			literal = false,
			date,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Extract a number from the string value
			getNumber = function(match) {
				var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					minSize = (match === "y" ? size : 1),
					digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			// Extract a name from the string value and convert to an index
			getName = function(match, shortNames, longNames) {
				var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
						return [ [k, v] ];
					}).sort(function (a, b) {
						return -(a[1].length - b[1].length);
					});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},
			// Confirm that a literal character matches the string value
			checkLiteral = function() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")){
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length){
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
	formatDate: function (format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Format a number, with leading zero if necessary
			formatNumber = function(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},
			// Format a name, short or long as requested
			formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += (lookAhead("y") ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var iFormat,
			chars = "",
			literal = false,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d": case "m": case "y": case "@":
						chars += "0123456789";
						break;
					case "D": case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = (noDefault ? "" : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						offset, $.datepicker._getFormatConfig(inst));
				}
				catch (e) {
					// Ignore
				}

				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d" : case "D" :
							day += parseInt(matches[1],10); break;
						case "w" : case "W" :
							day += parseInt(matches[1],10) * 7; break;
						case "m" : case "M" :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y": case "Y" :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));

		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
	_daylightSavingAdjust: function(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function () {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function () {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				today: function () {
					$.datepicker._gotoToday(id);
				},
				selectDay: function () {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function () {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjust(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
			isRTL = this._get(inst, "isRTL"),
			showButtonPanel = this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));

		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

		nextText = this._get(inst, "nextText");
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));

		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

		currentText = this._get(inst, "currentText");
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

		controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
			this._get(inst, "closeText") + "</button>" : "");

		buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";
		dow;
		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0: calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
							case numMonths[1]-1: calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
							default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-datepicker-calendar'><thead>" +
					"<tr>";
				thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
				for (dow = 0; dow < 7; dow++) { // days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += "<tr>";
					tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) + "</td>");
					for (dow = 0; dow < 7; dow++) { // create date picker days
						daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
						otherMonth = (printDate.getMonth() !== drawMonth);
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
							(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
							"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {

		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='ui-datepicker-title'>",
			monthHtml = "";

		// month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = (minDate && minDate.getFullYear() === drawYear);
			inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for ( month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {
				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function(value) {
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
		return (maxDate && newDate > maxDate ? maxDate : newDate);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
			if (years){
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if ( yearSplit[0].match(/[+\-].*/) ) {
					minYear += currentYear;
				}
				if ( yearSplit[1].match(/[+\-].*/) ) {
					maxYear += currentYear;
				}
			}

		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function datepicker_bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).removeClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).removeClass("ui-datepicker-next-hover");
			}
		})
		.delegate( selector, "mouseover", datepicker_handleMouseover );
}

function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
		$(this).addClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).addClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).addClass("ui-datepicker-next-hover");
		}
	}
}

/* jQuery extend now ignores nulls! */
function datepicker_extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#"+$.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each( function() {
		typeof options === "string" ?
			$.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.11.4";

var datepicker = $.datepicker;



/* 
 *************************************
 * <!-- Form Progress -->
 *************************************
 */
/*
    Note:
	
	If you want to initialize the indicator to a location when the page is first run,
	you need to call the following function:
	
	$( document ).formProgressNext({ 
		'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
		'formTarget'       : $( '.uix-form-progress__target' ),
		'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
		'index'            : 0 // 0 -> step 1, 1 -> step 2, 2 -> step 3, 3 -> step 4, 4 -> step 5 
	});
	
*/


APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.FORM_PROGRESS               = APP.FORM_PROGRESS || {};
	APP.FORM_PROGRESS.version       = '0.0.1';
    APP.FORM_PROGRESS.pageLoaded    = function() {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-form-progress-eff' ) ) return false;
		

		var $progressBar   = $( '.uix-form-progress progress' ),
			$formTarget    = $( '.uix-form-progress__target' ),
			$indicator     = $( '.uix-form-progress .uix-form-progress__indicator' ),
			formAreaH      = $formTarget.height(),
			allStep        = $indicator.length,
			stepPerValue   = 100/( allStep - 1 ),
			value          = 0,
			transitionEnd  = 'webkitTransitionEnd transitionend';
		

		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		
		//Gets the party started.
		formReset();
		
		//Display the target
		setTimeout( function() {
			$formTarget.addClass( 'active' );
		}, parseFloat( dur ) * 1000 );
		

		// Show next form on continue click
		$( document ).on( 'click', '.uix-form-progress__target .go-step:not(.disable)', function( e ) {
			e.preventDefault();
			var $sections = $( this ).parents( '.uix-form-progress__target__step' );
			$( document ).formProgressNext({ 
				'selector'   : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget' : $formTarget,
				'indicator'  : '.uix-form-progress .uix-form-progress__indicator',
				'index'      : $sections.index() + 1
			});
			
		});
		
		

		// Reset form on reset button click
		$( document ).on( 'click', '.uix-form-progress__target .go-reset', function( e ) {
			e.preventDefault();
			formReset();
		});
		

		/*
		 * Resets the form back to the default state.
		 *
		 * @return {void}                   - The constructor.
		 */
		function formReset() {
			
			$( document ).formProgressNext({ 
				'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget'       : $( '.uix-form-progress__target' ),
				'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
				'index'            : 0 // 0 -> step 1, 1 -> step 2, 2 -> step 3, 3 -> step 4, 4 -> step 5 
			});
		
			
		}
			    
		
    };

    APP.components.pageLoaded.push( APP.FORM_PROGRESS.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Shows the next form.
 *
 * @param  {object} selector        - Each target forms selector.
 * @param  {object} formTarget      - Wrapper of target forms selector.
 * @param  {string} indicator       - Indicator of timeline.
 * @param  {number} index           - Default index for initialization.
 * @return {void}                   - The constructor.
 */
( function ( $ ) {
    $.fn.formProgressNext = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selector         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			formTarget       : $( '.uix-form-progress__target' ),
			indicator        : '.uix-form-progress .uix-form-progress__indicator',
			index            : 0
        }, options );
 
        this.each( function() {
			
			var $this            = $( this ),
				transitionEnd    = 'webkitTransitionEnd transitionend',
				$sections        = settings.selector,
				$formTarget      = settings.formTarget,	
				$indicator       = $( settings.indicator ),
				allStep          = $indicator.length,
				stepPerValue     = 100/( allStep - 1 ),
				value            = 0,
				tarIndex, curIndex;


			//Returns current index
			if ( settings.index > allStep - 1 ) {
				curIndex = allStep - 1;
			} else {
				curIndex = settings.index;
			}


			tarIndex = curIndex - 1;


			// Returns current index
			if ( tarIndex > ( allStep - 2 ) ) {
				value = stepPerValue * (allStep - 2);
				curIndex = allStep - 2;
			} else {
				curIndex = tarIndex;

			}


			// Increment value (based on 4 steps 0 - 100)
			value = stepPerValue * curIndex;

			//Get form transition speed
			var dur = $formTarget.data( 'anime-speed' );
			if( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}

			var durString  = dur.toLowerCase(),
				isMS       = durString.indexOf( 'ms' ) >= 0,
				numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
				animeSpeed = isMS ? numberNum : numberNum * 1000;



			var currentFormStep  = parseInt($sections.eq( tarIndex ).attr( 'data-step' ) ) || false,
				$nextForm        = $formTarget.find( '.uix-form-progress__target__step[data-step="' + (currentFormStep + 1) + '"]'),
				currentFormIndex = $nextForm.attr( 'data-step' ) - 1;


			if ( isNaN( currentFormIndex ) ) currentFormIndex = 0;

			// Activate other unused modules
			if ( currentFormIndex > 0 ) {
				for ( var i = 0; i < curIndex; i++ ) {
					$sections.eq( i ).addClass( 'leaving' );
					$indicator.eq( i ).addClass( 'active' );
				}
				$indicator.eq( curIndex ).addClass( 'active' );
				
			}



			// Hide current form fields
			$sections.eq( tarIndex ).addClass( 'leaving' );
			setTimeout(function() {
				$indicator.eq( currentFormIndex ).addClass( 'active' );
			}, animeSpeed );


			// Show next form fields
			$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
				$nextForm.removeClass( 'coming waiting' );
			});
			
			// Active next form fields
			$sections.removeClass( 'active' );
			$sections.eq( currentFormIndex ).addClass( 'active' );

			// Increment value (based on 4 steps 0 - 100)
			value += stepPerValue;

			//console.log( currentFormIndex );



			//Initialize pointer and form location data
			if ( currentFormIndex == 0 ) {

				//Avoid initialization to always cover other same events
				$( 'body' ).addClass( 'form-progress-initok' );


				//so something
				$indicator.removeClass( 'active' );
				$indicator.each( function( index )  {
					$( this ).css( 'left', index*stepPerValue + '%' );
					$formTarget.find( '.uix-form-progress__target__step:eq('+index+')' ).attr( 'data-step', index+1 );
				});

				setTimeout(function() {
					$formTarget.addClass( 'js-uix-show' );
				}, animeSpeed );


				$formTarget.find( '.uix-form-progress__target__step' )
												.removeClass( 'left leaving' )
												.css( {
													'position'   : 'absolute'
												} )
												.not( ':eq(0)' )
												.addClass( 'waiting' );


			}


			//Set wrapper height
			var currentContentH  = $formTarget.find( '.uix-form-progress__target__step:eq('+currentFormIndex+') > .uix-form-progress__content' ).height() + 100;
			$formTarget.css( 'height', currentContentH + 'px' );

			var curText = $( '.uix-form-progress .uix-form-progress__indicator:eq('+currentFormIndex+') > span' ).html();
			$( '#app-form-progress-text' ).text( curText );

			//The current indicator class
			$indicator.removeClass( 'current' );
			$indicator.eq( currentFormIndex ).addClass( 'current' );

			// Reset if we've reached the end
			if (value >= 100) {
				$formTarget.find( '.uix-form-progress__target__step' )
											   .addClass( 'leaving' )
											   .last()
											   .removeClass( 'coming waiting leaving' );
			} else {
				$( '.uix-form-progress' ).find( '.uix-form-progress__indicator.active' ).next( '.uix-form-progress__indicator' ).addClass( 'active' );
			}

			// Set progress bar value
			$( '.uix-form-progress .uix-form-progress__line span' ).css( 'width', value + '%' );


			//Scroll Top
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y: 0
				},
				ease: Power2.easeOut
			});	
			
			

			return false;
			
			
		});
 
    };
 
}( jQuery ));



/* 
 *************************************
 * <!-- Gallery -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.GALLERY               = APP.GALLERY || {};
	APP.GALLERY.version       = '0.0.1';
    APP.GALLERY.documentReady = function( $ ) {

		$( '.uix-gallery' ).each( function() {
			var type = $( this ).data( 'show-type' );
			
			// Masonry
			if ( type.indexOf( 'masonry' ) >= 0  ) {
				$( this ).addClass( 'masonry-container' );
				$( this ).find( '.uix-gallery__item' ).addClass( 'masonry-item' );
			}
			
			// Filterable
			if ( type.indexOf( 'filter' ) >= 0  ) {
				$( this ).addClass( 'filter-container' );
				$( this ).find( '.uix-gallery__item' ).addClass( 'filter-item' );	
			}	
		
		});
	
	    /*--  Function of Masonry  --*/
		var masonryObj = $( '.masonry-container .uix-gallery-tiles' );
		imagesLoaded( masonryObj ).on( 'always', function() {
			  masonryObj.masonry({
				itemSelector: '.masonry-item'
			  });  
		});
		
		
	    /*--  Function of Filterable  --*/
		if ( $( "[data-show-type]" ).length > 0 ) {
			if ( $( "[data-show-type]" ).data( 'show-type' ).indexOf( 'filter' ) >= 0 ) {
				
				$( '.uix-gallery' ).each( function() {
					var filterCat      = $( this ).data( 'filter-id' ),
						$grid          = $( this ).find( '.uix-gallery-tiles' ),
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

    APP.components.documentReady.push( APP.GALLERY.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Image Shapes -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.IMAGE_SHAPES               = APP.IMAGE_SHAPES || {};
	APP.IMAGE_SHAPES.version       = '0.0.1';
    APP.IMAGE_SHAPES.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        
		//  Initialize
		shapesInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth  = $window.width();

				// Do stuff here
				shapesInit( windowWidth );
		

			}
		});
		
	
		/*
		 * Initialize Shapes
		 *
		 * @param  {number} w         - Returns width of browser viewport
		 * @param  {number} h         - Returns height of browser viewport
		 * @return {void}             - The constructor.
		 */
		function shapesInit( w ) {
			
			$( '.uix-shape-img' ).each( function()  {
				var $this          = $( this ),
					ranID          = 'uix-shape-img-' + UIX_GUID.newGuid(),
					svgPath        = $this.data( 'path' ),
					svgW           = parseFloat( $this.data( 'svg-const-width' ) ),
					svgH           = parseFloat( $this.data( 'svg-const-height' ) ),
					imgW           = parseFloat( $this.data( 'img-width' ) ),
					svgRatio       = svgW / svgH,
					imgRatio       = null,
					bothWidthRatio = null,
					newSvgHeight   = null,		
					newImgHeight   = null,		
					svgOut         = '',
					curImgW        = imgW,
					curImgH        = null,
					curImgURL      = $this.find( 'img' ).attr( 'src' );

				if ( imgW > w ) {
					imgW = w;
				}


				//Check if the picture is loaded on the page
				var img = new Image();
				img.onload = function() {
					curImgH   = $this.find( 'img' ).height();
					curImgW   = $this.find( 'img' ).width();
					imgRatio  = curImgW / curImgH;	

					//Add a custom shape SVG to the page
					bothWidthRatio = imgW / svgW;
					newSvgHeight   = imgW / svgRatio;
					newImgHeight   = svgW / imgRatio;

					svgOut += '<svg fill-rule="evenodd" clip-rule="evenodd" width="'+imgW+'px" height="'+newSvgHeight+'px" viewBox="0 0 '+imgW+' '+newSvgHeight+'" >';
					svgOut += '	<pattern id="'+ranID+'" patternUnits="userSpaceOnUse" width="'+svgW+'" height="'+svgH+'">';
					svgOut += '		  <image xlink:href="'+curImgURL+'" width="'+svgW+'px" height="'+newImgHeight+'px" x="0" y="0" />';
					svgOut += '	</pattern> ';   
					svgOut += '	<path fill="url(#'+ranID+')" transform="scale('+bothWidthRatio+')" d="'+svgPath+'"/>';
					svgOut += '</svg>';	


					$this.addClass( 'active' ).html( svgOut );		
				};
				
				
				img.src = curImgURL;

			 
	

			});
			
		}	
		
    };

    APP.components.documentReady.push( APP.IMAGE_SHAPES.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Theme Scripts  -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
    
    APP.INDEX               = APP.INDEX || {};
	APP.INDEX.version       = '0.0.1';
    APP.INDEX.documentReady = function( $ ) {

	    //your code here...
		
    };
	
    APP.INDEX.pageLoaded    = function() {

	    //your code here...
		
    };
	

    APP.components.documentReady.push( APP.INDEX.documentReady );
    APP.components.pageLoaded.push( APP.INDEX.pageLoaded );
	
	
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Lava-Lamp Style Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.LAVA_LAMP_STYLE_MENU               = APP.LAVA_LAMP_STYLE_MENU || {};
	APP.LAVA_LAMP_STYLE_MENU.version       = '0.0.1';
    APP.LAVA_LAMP_STYLE_MENU.documentReady = function( $ ) {


		
		var $menuContainer = $( '.uix-lavalamp-menu__container' ),
		    menu           = 'ul.uix-lavalamp-menu',
			line           = menu + ' .uix-lavalamp-menu__slide-line';
		
		
		//Prevent this module from loading in other pages
		if ( $menuContainer.length == 0 ) return false;
		

		
		// adds sliding underline HTML
		$( menu ).append('<span class="uix-lavalamp-menu__slide-line"></span>');

		// set initial position of slide line
		TweenMax.set( line, {
			css: {
				width: 0,
				x: 0,
				y: 0
			}
		});
		
		
		function nemuLineGo( index ) {
			
			var $this  = $( menu + ' > li' ).eq( index ).find( 'a' ),
			    offset = $this.offset(),
				
			//find the offset of the wrapping div  
			offsetBody = $( '.uix-lavalamp-menu__container' ).offset();

			// GSAP animate to clicked menu item
			TweenMax.to( line, 1, {
				css: {
					width  : $this.outerWidth() + 'px',
					x      : ( offset.left - offsetBody.left ) + 'px'
				},
				ease: Elastic.easeOut.config(1, 0.5)
			});
			
			
			
	
		}

		// animate slide-line on click
		$( document ).on( 'mouseover', menu + ' > li a', function() {

			nemuLineGo( $( this ).parent().index() );

		});
		

		
		nemuLineGo( 0 );
		


		
    };

    APP.components.documentReady.push( APP.LAVA_LAMP_STYLE_MENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Custom Lightbox -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.LIGHTBOX               = APP.LIGHTBOX || {};
	APP.LIGHTBOX.version       = '0.0.8';
    APP.LIGHTBOX.pageLoaded    = function() {

		if ( $( '.uix-lightbox__container' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-lightbox__container"><div class="uix-lightbox__inner"><div class="uix-lightbox__html"></div><span class="uix-lightbox__close"></span><p class="title"></p></div></div><div class="uix-lightbox__container-mask"></div><div class="uix-lightbox__close-fixed"></div>' );
		}
		

		var	$lbCon          = $( '.uix-lightbox__inner' ),
			$lbWrapper      = $( '.uix-lightbox__container' ),
			$lbMask         = $( '.uix-lightbox__container-mask' ),
			lbCloseEl       = '.uix-lightbox__container .uix-lightbox__close',
			lbCloseFixedEl  = '.uix-lightbox__close-fixed',
			$lbContent      = $lbCon.find( '.uix-lightbox__html' ),
			tempID          = 'lightbox-' + UIX_GUID.newGuid();
		
		$( document ).on( 'click touchstart', '.uix-lightbox__trigger', function() { 

			var $this         = $( this ),
				dataPhoto     = $this.data( 'lb-src' ),
				dataHtmlID    = $this.data( 'lb-html' ),
				dataFixed     = $this.data( 'lb-fixed' ),
				dataMaskClose = $this.data( 'lb-mask-close' ),
				dataMethod    = $this.data( 'lb-ajax-method' ),
				dataAjaxCon   = $this.data( 'lb-ajax-content' ),
				htmlContent   = '',
				imgSrcStr     = '',
				imgSrcStrToW  = '';
			

			
		
			if( typeof dataFixed === typeof undefined ) {
				dataFixed = true;
			}
			if( typeof dataMaskClose === typeof undefined ) {
				dataMaskClose = false;
			}	
			
			if( typeof dataMethod === typeof undefined ) {
				dataMethod = 'POST';
			}		
			
			
			
			//Reset the wrapper position
			$lbWrapper.css( 'margin-top', 0 );	
			

			if ( !dataFixed ) {
				$lbWrapper.addClass( 'js-uix-no-fixed' );
				$( lbCloseEl ).addClass( 'js-uix-no-fixed' );
				$( lbCloseFixedEl ).addClass( 'active' );
				
				//Initialize the wrapper position
				$lbWrapper.css( 'margin-top', $( window ).scrollTop() + 'px' );	
				
			}
			
			
			//Reset current container type
			$lbCon.removeClass( 'js-uix-custom js-uix-pure-image' );
			
			

			//-------- If it is photo
			//-----------------------------
			if( typeof dataPhoto != typeof undefined && dataPhoto != '' ) {
				
				
				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				
				if ( dataPhoto.indexOf( '[' ) >= 0 &&  dataPhoto.indexOf( ']' ) >= 0 ) {
					imgSrcStr = JSON.parse( dataPhoto.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g,'"') );
				} else {
					imgSrcStr = dataPhoto;
					
				}
				
				
				//Judging whether multiple image sets
				if ( Object.prototype.toString.call( imgSrcStr ) =='[object Array]' ) {
					
					var largePhotos = '',
						thumbs      = '';
					
					imgSrcStrToW = imgSrcStr[0].large;
					
					//push the large photos
					largePhotos += '<div class="uix-lightbox__photo-container uix-lightbox__photo-sets-container"><ul>';
					for ( var i = 0; i < imgSrcStr.length; i++ ) {
						
						
						largePhotos += '<li>';
						largePhotos += '	<a class="uix-lightbox__original__link" href="#'+tempID+'-sets-'+i+'">';
						largePhotos += '	   <img src="'+ imgSrcStr[i].large +'" alt="">';
						largePhotos += '	</a>';
						largePhotos += '	<div class="uix-lightbox__original__target" id="'+tempID+'-sets-'+i+'">';
						largePhotos += '	   <img src="'+ imgSrcStr[i].large +'" alt="">';
						largePhotos += '	   <a class="uix-lightbox__original__close" href="#"></a>';
						largePhotos += '	</div>';
						largePhotos += '</li>'; 

					}
					largePhotos += '</ul></div>';
					
					//push the thumbs
					thumbs += '<div class="uix-lightbox__thumb-container"><ul>';
					for ( var k = 0; k < imgSrcStr.length; k++ ) {
						thumbs += '<li><img src="'+ imgSrcStr[k].thumb +'" alt=""></li>';
					}
					thumbs += '</ul></div>';
					
					htmlContent = largePhotos + thumbs;
					

					
				} else {

					//Only one image
					imgSrcStrToW = imgSrcStr;
					htmlContent += '<div class="uix-lightbox__photo-container">';
					htmlContent += '	<a class="uix-lightbox__original__link" href="#'+tempID+'">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	</a>';
					htmlContent += '	<div class="uix-lightbox__original__target" id="'+tempID+'">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	   <a class="uix-lightbox__original__close" href="#"></a>';
					htmlContent += '	</div>';
					htmlContent += '</div>'; 
					
				}
						
				$lbContent.html( htmlContent ).promise().done( function(){

					//Set current container type
					$lbCon.addClass( 'js-uix-pure-image' );

					//Set container width
					var img = new Image();
					img.src = imgSrcStrToW;
					img.onload = function() {
						
						var sw = $( window ).width() - 30,
							w  = ( this.width > 1000 ) ? 1000 : this.width,
							h;
				
						if ( w > sw ) w = sw;
						
						h = w * ( this.height/this.width );
						
					
						$lbCon.css( {
							'width': w + 'px'
						} );
						
						
						$( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ).css( {
							'height': h + 'px'
						} );	
						
						
					};
					
					
					$lbCon.find( '> .uix-lightbox__html' ).removeClass( 'js-uix-no-img' );

				});		

				
			}	
			
			
			//-------- If it is not photo
			//-----------------------------
			if( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				$lbContent.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
					
					//Set current container type
					$lbCon.addClass( 'js-uix-custom' );
					
					//Set container width
					if ( $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content' ).length > 0 ) {
						
						if ( $( window ).width() <= 768 ) {
							$lbCon.css( 'width', $( window ).width() - 10 + 'px' );
						} else {
							$lbCon.css( 'width', $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content' ).width() + 'px' );
						}
						
						
						$lbCon.find( '> .uix-lightbox__html' ).addClass( 'js-uix-no-img' );
						
						
						//Ajax-loaded content
						if( typeof dataAjaxCon != typeof undefined && dataAjaxCon != '' ) {
							
							var $ajaxContentContainer = $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content > div' );
							
							$ajaxContentContainer.html( $ajaxContentContainer.data( 'loading-text' ) );
							
							$.ajax({
								url      : dataAjaxCon,
								method   : dataMethod,
								dataType : 'html',
								success  : function( response ) { 
									$ajaxContentContainer.html( $( response ).find( '.uix-entry__content' ).html() );

								 },
								 error : function( XMLHttpRequest, textStatus, errorThrown ) {

								 }
							});

						}
						
						
					}

				});
				
				

			}	
			

		});

		
		//Close the window
		$( document ).on( 'click', lbCloseEl, function() {
			customLBCloseEvent();
		});

		
		$( document ).on( 'click', lbCloseFixedEl, function() {
			customLBCloseEvent();
		});	
		

		//Click thumbnail to switch large photo
		$( document ).on( 'click', '.uix-lightbox__thumb-container li', function() {
			
			var $largePhoto = $( this ).closest( '.uix-lightbox__html' ).find( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ),
				$thumb      = $( '.uix-lightbox__thumb-container li' ),
				curImgH     = 0;

			
			$thumb.removeClass( 'active' );
			$( this ).addClass( 'active' );
			
			$largePhoto.find( 'li' ).fadeOut( 300 ).removeClass( 'active' );
			$largePhoto.find( 'li' ).eq( $( this ).index() ).addClass( 'active' ).fadeIn( 300, function() {
				
				//Reset the container height
				curImgH = $largePhoto.find( 'li' ).eq( $( this ).index() ).find( 'img' ).height();
				
				$largePhoto.css( {
					'height': curImgH + 'px'
				} );
			});

				
			
		});		
		
		
		
		function customLBCloseEvent() {
			//Remove all dynamic classes
			$lbWrapper.removeClass( 'js-uix-no-fixed' );
			$( lbCloseEl ).removeClass( 'js-uix-no-fixed' );
			$( lbCloseFixedEl ).removeClass( 'active' );
			
			$( 'html' ).css( 'overflow-y', 'auto' );
			
			//Reset current container type
			$lbCon.removeClass( 'js-uix-custom js-uix-pure-image' );
			
			
			//close windows
			$lbWrapper.hide();
			$lbMask.hide();
			
			
			//Changing The Site URL
			var href = window.location.href.substr( 0, window.location.href.indexOf( '#' ) );
			history.pushState( '', document.title, href );
	
			
		}
		
		
		
		
		
		
		//Close/Open enlarge image
		$( document ).on( 'click', '.uix-lightbox__original__link', function( e ) {
			$( 'html' ).css( 'overflow-y', 'hidden' );

		});	
		
		$( document ).on( 'click', '.uix-lightbox__original__close', function( e ) {

			$( 'html' ).css( 'overflow-y', 'auto' );
		});

		
		
		
		    
		
    };

    APP.components.pageLoaded.push( APP.LIGHTBOX.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Bulleted List -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BULLETED_LIST               = APP.BULLETED_LIST || {};
	APP.BULLETED_LIST.version       = '0.0.1';
    APP.BULLETED_LIST.documentReady = function( $ ) {


		// Icon bulleted lists
		$( '[data-list-bullet]' ).each( function() {
			var bullet = $( this ).attr( 'data-list-bullet' );
			$( this ).find( 'li' ).prepend( '<i class="'+bullet+'" aria-hidden="true"></i>' );
		});

		
    };

    APP.components.documentReady.push( APP.BULLETED_LIST.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Posts List With Ajax -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.POST_LIST_AJAX               = APP.POST_LIST_AJAX || {};
	APP.POST_LIST_AJAX.version       = '0.0.6';
    APP.POST_LIST_AJAX.documentReady = function( $ ) {

		$( '[data-ajax-list-json]' ).each( function() {
			var $this            = $( this ),
				wrapperID        = 'refresh-all-waypoint-' + UIX_GUID.newGuid(),
			    curPage          = $this.data( 'ajax-list-page-now' ),
				perShow          = $this.data( 'ajax-list-page-per' ),
				totalPage        = $this.data( 'ajax-list-page-total' ),
				method           = $this.data( 'ajax-list-method' ),
				trigger          = $this.data( 'ajax-list-trigger' ),
				infinitescroll   = $this.data( 'ajax-list-infinitescroll' ),
				jsonFile         = $this.data( 'ajax-list-json' ),
				addition         = $this.data( 'ajax-list-addition' ),
				template7ID      = $this.data( 'ajax-list-temp-id' ),
				pushContainer    = $this.data( 'ajax-list-push-container-class' ),
				triggerActive    = $this.data( 'ajax-list-trigger-active-class' ),
				pageParmStr      = $this.data( 'ajax-list-page-parm-str' ),
				noneInfo         = $this.data( 'ajax-list-none-info' );
	
			
			

			$this.attr( 'id', wrapperID );
			
			

			if( typeof pageParmStr === typeof undefined ) {
				pageParmStr = {
					'totalPage'     : 'total',
					'currentPage'   : 'page',
					'displayPerPage': 'per'
				};
			}
			
			if( typeof curPage === typeof undefined ) {
				curPage = 1;
			}
			
			
			if( typeof perShow === typeof undefined ) {
				perShow = 8;
			}
			
			if( typeof totalPage === typeof undefined ) {
				totalPage = 3;
			}
			
			if( typeof totalPage != typeof undefined && totalPage == '-1' ) {
				totalPage = 9999;
			}
			
			
			if( typeof trigger === typeof undefined ) {
				trigger = '.uix-load-more';
			}
			
			if( typeof infinitescroll === typeof undefined ) {
				infinitescroll = false;
			}	
			
			if( typeof addition === typeof undefined ) {
				addition = true;
			}			
			
			
			if( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}		
			
			if( typeof template7ID === typeof undefined ) {
				template7ID = '';
			}	
			if( typeof triggerActive === typeof undefined ) {
				triggerActive = 'active';
			}		
			
			if( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			if( typeof noneInfo === typeof undefined ) {
				noneInfo = '{"none":"","error":""}';
			}
			
			
			
			triggerActive = triggerActive.replace( '.', '' );
			
			
			
			if( typeof pushContainer === typeof undefined ) {
				pushContainer = '.uix-ajax-items__container';
				
				if ( $this.find( pushContainer ).length == 0 ) {
					$( '#' + template7ID ).after( '<div class="uix-ajax-items__container"></div>' );
				}
				
			}		
			
			
			
			//Get all attributes of an element and push the new attributes like "data-*"
			var curAttrs        = $this.attr(),
				defaultPostData = '',
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-ajax-list-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-ajax-list-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		
			
			//Parse the JSON data
			if ( jsonFile != '' && template7ID != '' ) {
				
				
				if ( infinitescroll ) {
					/* 
					 ---------------------------
					 Infinite scroll
					 ---------------------------
					 */ 	
					var $button = $( trigger ),
						btnTop  = $button.offset().top;
					
					//Add default page number to the button
					$button.attr( 'data-cur-page', 1 );

					
					//Hide the next button 
					if ( totalPage == 1 ) {
						$button.addClass( 'hide' );	
					}
					
				
						
					$( window ).on( 'scroll touchmove', function() {
						
					
						
						var scrolled = $( window ).scrollTop();
						
						if ( scrolled >= parseFloat( $button.offset().top - $( window ).height()/2 - $button.outerHeight( true )*2 ) && !$button.hasClass( triggerActive ) ) {

								// Active this button
								$button.addClass( triggerActive );					    
							
								var curPage = $button.attr( 'data-cur-page' );
							
								//Add next page number to the button
								curPage = parseFloat( curPage ) + 1;
								$button.attr( 'data-cur-page', curPage );
							
							    //Avoid touching the same button multiple times
							    if ( curPage == totalPage + 1 ) return false;
							
								//Perform dynamic loading
								if ( customPostData != '' ) {
									defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
								} else {
									defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
								}


								ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );


							
						}
						
					});	
					
				} else {
					/* 
					 ---------------------------
					 Ajax with JSON data
					 ---------------------------
					 */
					
					var triggerStr = '';
					
					if ( trigger.indexOf( '[' ) >= 0 &&  trigger.indexOf( ']' ) >= 0 ) {
						triggerStr = JSON.parse( trigger.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g,'"') );
					} else {
						triggerStr = trigger;

					}

					//Whether there are two flip buttons "Previous" and "Next"
					if ( Object.prototype.toString.call( triggerStr ) =='[object Array]' ) {

						var prevTrigger = triggerStr[0].prev,
							nextTrigger = triggerStr[1].next;
						
						//Add default page number to the button
						$( nextTrigger ).parent().attr( 'data-cur-page', 1 );


						
						//--------------- Next Button ------------------
						//Hide the next button 
						if ( totalPage == 1 ) {
							$( nextTrigger ).addClass( 'hide' );	
						}

						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( nextTrigger ).on( 'click', function( e ) {

							e.preventDefault();

							var $button = $( this ),
								curPage = $button.parent().attr( 'data-cur-page' );
							
							//Add next page number to the button
							curPage = parseFloat( curPage ) + 1;
							$button.parent().attr( 'data-cur-page', curPage );
							
							//Init button status
							$( prevTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( triggerActive );
							$( prevTrigger ).removeClass( 'hide' );
							


							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );
							
							return false;


						});		
						
							
						
						//----------------- Previous Button ----------------
						//Hide the prev button 
						$( prevTrigger ).addClass( 'hide' );
						
						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( prevTrigger ).on( 'click', function( e ) {

							e.preventDefault();

							var $button = $( this ),
								curPage = $button.parent().attr( 'data-cur-page' );
				
							//Add next page number to the button
							curPage = parseFloat( curPage ) - 1;
							$button.parent().attr( 'data-cur-page', curPage );
							
							//Init button status
							$( prevTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( 'hide' );
							


							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );

							
							return false;


						});						


					} else {
						
						
						//----------------- More Button ----------------
						//Add default page number to the button
						$( trigger ).attr( 'data-cur-page', 1 );

						//Hide the next button 
						if ( totalPage == 1 ) {
							$( trigger ).addClass( 'hide' );	

						}

						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( trigger ).on( 'click.POST_LIST_AJAX', function( e ) {

							e.preventDefault();

							var $button = $( this ),
								curPage = $button.attr( 'data-cur-page' );

							//Add next page number to the button
							curPage = parseFloat( curPage ) + 1;
							$button.attr( 'data-cur-page', curPage );
							
						
							
							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );

							
							return false;


						});	
						
					}	
					
				
					
				}//end if
				
			}
			
		});
			
			
		/*
		 * Ajax with JSON data
		 *
		 * @param  {object} ajaxWrapper     - The outermost container of list.
		 * @param  {object} defaultPostData - Data to be sent to the server which is custom JSON fields.
		 * @param  {object} trigger         - Trigger ajax loaded button object.
		 * @param  {number} curPage         - The current page to load.
		 * @param  {number} perShow         - The amount to load each time.
		 * @param  {number} totalPage       - The total page to load.
		 * @param  {string} template7ID     - HTML template ID
		 * @param  {string} jsonFile        - JSON file path to docking data
		 * @param  {string} triggerActive   - The class name of trigger button actived.
		 * @param  {string} pushContainer   - This container is used to display the loaded dynamic data.
		 * @param  {string} method          - The type of request to make, which can be either "POST" or "GET".
		 * @param  {boolean} addition       - Do or not append to the original content.
		 * @param  {string} noneInfo        - Returns information of ajax asynchronous callback when the content is empty.
		 * @return {void}                   - The constructor.
		 */
		
		function ajaxLoadInit( ajaxWrapper, defaultPostData, trigger, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo ) {

			var $divRoot         = ajaxWrapper,
				template         = document.getElementById( template7ID ).innerHTML,
				compiledTemplate = Template7.compile( template ),
				$button          = $( trigger );

			
			$.ajax({
				url      : jsonFile, //Be careful about the format of the JSON file
				method   : method,
				data     : defaultPostData,
				dataType : 'json',
				success  : function (data) { 
					
					
					//If the data is empty
					if ( data && ( data == null || Object.prototype.toString.call( data.items )=='[object String]' ) ) {
						$button.addClass( 'hide' );
						
						//callback information
						$divRoot.after( noneInfo.none );
						
					}
					
				
					
					//Check if a key exists inside a json object
					if ( data && data.hasOwnProperty( 'items' ) && Object.prototype.toString.call( data.items )=='[object Array]' ) {
						
						
						//Data overflow may occur when the total number of pages is not posted
						try {

							var thisData      = data,
								html          = compiledTemplate( thisData ),
								curHtml       = $divRoot.find( pushContainer ).html(),
								result        = null,
								htmlEl        = null;


							
							
							//--------- Do or not append to the original content
							if ( addition ) {
								result = curHtml + html;
								htmlEl = $( result );
								$divRoot.find( pushContainer ).before( htmlEl );
							} else {
								result = html;
								htmlEl = $( result );
								$divRoot.find( pushContainer ).html( htmlEl );
							}
							
							
							
							
							//--------- jQuery Masonry and Ajax Append Items
							$( '.uix-gallery' ).each( function() {
								var type = $( this ).data( 'show-type' );

								if ( type.indexOf( 'masonry' ) >= 0  ) {
									$( this ).addClass( 'masonry-container' );
									$( this ).find( '.uix-gallery__item' ).addClass( 'masonry-item' );
								}
								
							});
							
							var masonryItemContainer = $( '.masonry-container' );
							imagesLoaded( masonryItemContainer ).on( 'always', function() {
								 masonryItemContainer.masonry({
								    itemSelector: '.masonry-item'
								 });  
								
								$( masonryItemContainer ).masonry( 'reloadItems' );
								$( masonryItemContainer ).masonry( 'layout' );	
								
							});	
				
							
							//--------- Apply the original scripts
							$( document ).applyOriginalSomeScripts({
								scrollReveal : true,
								ajaxPostList : false
							});


							//--------- Remove this button
							$button.removeClass( triggerActive );	
	
							//--------- Hidden button when the page total number is set and does not equal -1 or 9999
							if ( 
								curPage == totalPage && 
								totalPage != 9999 && 
								totalPage != -1 &&
								totalPage != 1
							) {
								$button.addClass( 'hide' );
								//callback information
								$divRoot.after( noneInfo.none );
							}		
							
							if ( curPage == 1 ) {
								$button.addClass( 'hide' );
								//callback information
								$divRoot.after( noneInfo.none );
							}			
							

						} catch ( err ) {
							console.log( err.message );
							$button.addClass( 'hide' );
							//callback information
							$divRoot.after( noneInfo.error );


						}
						

						
					}

				 },
				 error : function( XMLHttpRequest, textStatus, errorThrown ) {
					 
					 //The current data is empty
					 $button.addClass( 'hide' );
					 
					//callback information
					$divRoot.after( noneInfo.none );
					 
					 
				 }
			});

		}

	
	   	
		
    };

    APP.components.documentReady.push( APP.POST_LIST_AJAX.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







/* 
 *************************************
 * <!-- Fullwidth List of Split -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.POST_LIST_SPLIT_FULLWIDTH               = APP.POST_LIST_SPLIT_FULLWIDTH || {};
	APP.POST_LIST_SPLIT_FULLWIDTH.version       = '0.0.2';
    APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.uix-list-split-imagery' ).each( function() {
				var imgH = $( this ).find( '.uix-list-split-imagery__img img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', 'auto' );
				}

			});	
		}
			    
		
    };

    APP.components.pageLoaded.push( APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Mousewheel Interaction -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MOUSEWHEEL_INTERACTION               = APP.MOUSEWHEEL_INTERACTION || {};
	APP.MOUSEWHEEL_INTERACTION.version       = '0.0.1';
    APP.MOUSEWHEEL_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-mousewheel-eff' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation     = 0,
			quietPeriod       = 500, //Do not change it
			animationTime     = 1000,//According to page transition animation changes
			scrollCount       = 0;
		
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});
		
	
	
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: &darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;, Total: ' + scrollCount );

				scrollCount++;
				
			} else {
				//scroll up
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: &uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;, Total: ' + scrollCount );

				scrollCount++;
			  
			}
			lastAnimation = timeNow;
		}
		
    };

    APP.components.documentReady.push( APP.MOUSEWHEEL_INTERACTION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Multiple Items Carousel -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MULTI_ITEMS_CAROUSEL               = APP.MULTI_ITEMS_CAROUSEL || {};
	APP.MULTI_ITEMS_CAROUSEL.version       = '0.0.2';
    APP.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {

		$( '.uix-multi-carousel' ).each( function()  {

			var $carouselWrapper   = $( this ),
				goSteps            = 0,
				$carousel          = $carouselWrapper.find( '.uix-multi-carousel__items' ),
				$carouselItem      = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
				itemTotal          = $carouselItem.length,
				amountVisible      = $carouselWrapper.data( 'cus-carousel-show' ),
				carouselItemWidth  = $carousel.width()/amountVisible,
				carouselItemHeight = $carousel.height()/amountVisible,
				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' ),
				carouselPaging     = $carouselWrapper.data( 'cus-carousel-paging' );

			
			if( typeof carouselDir === typeof undefined ) {
				carouselDir = 'horizontal';
			}
			
			if( typeof carouselLoop === typeof undefined ) {
				carouselLoop = false;
			}
			if( typeof amountVisible === typeof undefined ) {
				amountVisible = 3;
			}
			if( typeof carouselSpeed === typeof undefined ) {
				carouselSpeed = 250;
			}
			if( typeof carouselNext === typeof undefined ) {
				carouselNext = '.uix-multi-carousel__controls--next';
			}
			if( typeof carouselPrev === typeof undefined ) {
				carouselPrev = '.uix-multi-carousel__controls--prev';
			}
			

			/* 
			 ---------------------------
			 Get the number of steps to the last visible element
			 ---------------------------
			 */ 
			var lastSteps = parseFloat( itemTotal - amountVisible );
			 


			/* 
			 ---------------------------
			 Initialize carousel
			 ---------------------------
			 */  
			var newWidth, newHeight;
			if ( carouselDir == 'horizontal' ) { 
				newWidth = ( $carouselWrapper.width() / amountVisible );
				$carousel.css( 'width', itemTotal * carouselItemWidth );
			} else {
				newHeight = ( $carouselWrapper.height() / amountVisible );
				$carousel.css( 'height', itemTotal * carouselItemHeight );
			}


			// Re-order all items
			carouselReOrder();



			//default button status
			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
				$( carouselPrev ).addClass( 'disabled' );
			}	

			/* 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function carouselReOrder() {
				
				//Active the center item
				carouselActiveCenterItem( $carouselItem, 'default', null );
				
				$carouselItem.each( function( index ) {
				

						if ( carouselDir == 'horizontal' ) {
							$( this )
								.width( newWidth + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						} else {
							$( this )
								.height( newHeight + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						}

					});	
			}
			
			/* 
			 ---------------------------
			 Active the center item
			 ---------------------------
			 */ 
			
			function carouselActiveCenterItem( el, dir, steps ) {
				var curItemIndex    = (amountVisible/2).toFixed(0),
					centerItemIndex = Math.floor(amountVisible / 2)-1;		
				el.removeClass( 'active active-prev active-next' );
				
				
			
				if ( dir == 'default' ) {
					el.eq( parseFloat( curItemIndex - 1 ) ).addClass( 'active' );		
				} else {
					el.eq( parseFloat( steps + centerItemIndex + 1 ) ).addClass( 'active' );	
				}
				
				//Add nearest classes for 3 elements
				el.each( function() {
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).prev().addClass( 'active-prev' );
						$( this ).next().addClass( 'active-next' );
						
						return false;
					}
				});	
				
				
				
			}	
			


			
			
			/* 
			 ---------------------------
			 Move left/up
			 ---------------------------
			 */ 
			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
				
				
				var $btn        = $( this ),
					$curWrapper = $( e.data[0] ),
					//Protection button is not triggered multiple times.
					btnLock     = $btn.data( 'click' );
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					goSteps++;
				
					//Loop items
					if ( carouselLoop ) {
						if ( goSteps > lastSteps ) goSteps = 0;
					} else {
						if ( goSteps > lastSteps ) goSteps = lastSteps;
					}
					
					itemUpdates( $curWrapper, $btn, carouselNext, carouselPrev, goSteps );

				}


			});

			
			/* 
			 ---------------------------
			 Move right/down
			 ---------------------------
			 */ 
			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();

				var $btn        = $( this ),
					$curWrapper = $( e.data[0] ),
					//Protection button is not triggered multiple times.
					btnLock     = $btn.data( 'click' );
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					goSteps--;
				
					//Loop items
					if ( carouselLoop ) {
						if ( goSteps < 0 ) goSteps = lastSteps;
					} else {
						if ( goSteps < 0 ) goSteps = 0;
					}
					
					itemUpdates( $curWrapper, $btn, carouselNext, carouselPrev, goSteps );

				

				}


			});
			
			
			
			/*
			 * Transition Between Items
			 *
			 * @param  {object} wrapper         - Wrapper of carousel.
			 * @param  {object} curBtn          - The button that currently triggers the move.
			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
			 * @param  {number} steps           - The number of steps per move.
			 * @return {void}                   - The constructor.
			 */
			function itemUpdates( wrapper, curBtn, nextBtnStr, prevBtnStr, steps ) {

		
				var $curWrapper = wrapper.children( '.uix-multi-carousel__items' ),  //Default: $carousel
					$curItems   = $curWrapper.find( '> div' ), //Default: $carouselItem
					isEnd       = false,
					isFirst     = false,
					isMid       = false;
		
				//Reset prevents code from duplicate run
				var preventEvent = function() {
					if ( curBtn ) curBtn.data( 'click', 0 );
				};
				
				
				//Determine if the element is at the end or beginning
				if ( steps == lastSteps ) isEnd = true;
				if ( steps == 0 ) isFirst = true;
				if ( steps < lastSteps && steps > 0 ) isMid = true;
				
				
				//The state of the control button
				if ( !carouselLoop ) {
					
					if ( isEnd ) $( nextBtnStr ).addClass( 'disabled' );
					if ( isFirst ) $( prevBtnStr ).addClass( 'disabled' );
					
					if ( isMid ) {
						$( nextBtnStr ).removeClass( 'disabled' );
						$( prevBtnStr ).removeClass( 'disabled' );
					}
					
					
				}
				


				//Avoid button repeated trigger
				if ( curBtn ) curBtn.data( 'click', 1 );


				//Clone the first element to the last position
				if ( carouselDir == 'horizontal' ) {

					TweenMax.to( $curWrapper, carouselSpeed/1000, {
						x          : '-' + carouselItemWidth*steps,
						onComplete : function() {

							//Active the center item
							carouselActiveCenterItem( $curItems, 'move', steps );

							//Reset prevents code from duplicate run
							preventEvent();


						}
					});		



				} else {

					TweenMax.to( $curWrapper, carouselSpeed/1000, {
						y          : '-' + carouselItemHeight*steps,
						onComplete : function() {

							//Active the center item
							carouselActiveCenterItem( $curItems, 'move', steps );

							//Reset prevents code from duplicate run
							preventEvent();


						}
					});		


				}
				
				

					

			}
	
			
			
		



		});		
		
		
    };

    APP.components.documentReady.push( APP.MULTI_ITEMS_CAROUSEL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



//APP = ( function ( APP, $, window, document ) {
//    'use strict';
//	
//    APP.MULTI_ITEMS_CAROUSEL               = APP.MULTI_ITEMS_CAROUSEL || {};
//	  APP.MULTI_ITEMS_CAROUSEL.version       = '0.0.1';
//    APP.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {
//
//		$( '.uix-multi-carousel' ).each( function()  {
//
//			var $carouselWrapper   = $( this ),
//				$carousel          = $carouselWrapper.find( '.uix-multi-carousel__items' ),
//				$carouselItem      = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
//				carouselItemTotal  = $carouselItem.length,
//				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
//				carouselItemWidth  = $carousel.width()/showcarouselItem,
//				carouselItemHeight = $carousel.height()/showcarouselItem,
//				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
//				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
//				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
//				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
//				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );
//
//			if( typeof carouselDir === typeof undefined ) {
//				carouselDir = 'horizontal';
//			}
//			
//			if( typeof carouselLoop === typeof undefined ) {
//				carouselLoop = false;
//			}
//			if( typeof showcarouselItem === typeof undefined ) {
//				showcarouselItem = 3;
//			}
//			if( typeof carouselSpeed === typeof undefined ) {
//				carouselSpeed = 250;
//			}
//			if( typeof carouselNext === typeof undefined ) {
//				carouselNext = '.uix-multi-carousel__controls--next';
//			}
//			if( typeof carouselPrev === typeof undefined ) {
//				carouselPrev = '.uix-multi-carousel__controls--prev';
//			}
//
//
//			
//			/* 
//			 ---------------------------
//			 Initialize carousel
//			 ---------------------------
//			 */  
//			var newWidth, newHeight;
//			if ( carouselDir == 'horizontal' ) { 
//				newWidth = ( $carouselWrapper.width() / showcarouselItem );
//				$carousel.css( 'width', carouselItemTotal * carouselItemWidth );
//			} else {
//				newHeight = ( $carouselWrapper.height() / showcarouselItem );
//				$carousel.css( 'height', carouselItemTotal * carouselItemHeight );
//			}
//
//
//			// Re-order all items
//			carouselReOrder();
//
//
//
//			//default button status
//			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
//				$( carouselPrev ).addClass( 'disabled' );
//			}	
//
//			/* 
//			 ---------------------------
//			 Re-order all items
//			 ---------------------------
//			 */ 
//			
//			function carouselReOrder() {
//				
//				//Active the center item
//				carouselActiveCenterItem( $carouselItem, 'default' );
//				
//				$carouselItem.each( function( index ) {
//				
//
//						if ( carouselDir == 'horizontal' ) {
//							$( this )
//								.width( newWidth + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						} else {
//							$( this )
//								.height( newHeight + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						}
//
//					});	
//			}
//			
//			/* 
//			 ---------------------------
//			 Active the center item
//			 ---------------------------
//			 */ 
//			
//			function carouselActiveCenterItem( el, dir ) {
//				var curItemIndex    = (showcarouselItem/2).toFixed(0),
//					centerItemIndex = Math.floor(showcarouselItem / 2)-1;		
//				el.removeClass( 'active active-prev active-next' );
//				
//				
//				
//				if ( dir == 'left' ) {
//					el.eq( curItemIndex ).addClass( 'active' );
//					
//				} else if ( dir == 'right' ) {
//					el.eq( centerItemIndex ).addClass( 'active' );	
//					
//				} else if ( dir == 'default' ) {
//					el.eq( curItemIndex - 1 ).addClass( 'active' );		
//				}
//				
//				//Add nearest classes for 3 elements
//				el.each( function() {
//					if ( $( this ).hasClass( 'active' ) ) {
//						$( this ).prev().addClass( 'active-prev' );
//						$( this ).next().addClass( 'active-next' );
//						
//						return false;
//					}
//				});	
//				
//				
//				
//			}	
//			
//
//			
//			
//			/* 
//			 ---------------------------
//			 Move left/up
//			 ---------------------------
//			 */ 
//			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//				
//				
//				var $btn        = $( this ),
//					$curWrapper = $( e.data[0] ),
//					$curItems   = $curWrapper.children().find( '> div' ),
//					//Protection button is not triggered multiple times.
//					btnLock     = $btn.data( 'click' );
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					moveNext( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//
//
//			});
//
//			
//			/* 
//			 ---------------------------
//			 Move right/down
//			 ---------------------------
//			 */ 
//			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//
//				
//				var $btn        = $( this ),
//					$curWrapper = $( e.data[0] ),
//					$curItems   = $curWrapper.children().find( '> div' ),
//					//Protection button is not triggered multiple times.
//					btnLock     = $btn.data( 'click' );
//
//			
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					movePrev( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//				
//				
//
//			});
//			
//			
//			
//			/*
//			 * Transition between items next (left/up)
//			 *
//			 * @param  {object} wrapper         - Wrapper of carousel.
//			 * @param  {object} items           - Items of carousel.
//			 * @param  {object} curBtn          - The button that currently triggers the move.
//			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {void}                   - The constructor.
//			 */
//			function moveNext( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				var $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				//Move to the end
//				if ( (carouselItemTotal - showcarouselItem + 1) == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( (carouselItemTotal - showcarouselItem) == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				var preventEvent = function() {
//					if ( carouselPrev && carouselPrev != '' ) {
//						$( carouselPrev ).data( 'click', 0 ).removeClass( 'disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginLeft : -carouselItemWidth
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-left"
//								$curItems.css( 'margin-left', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//
//							}
//						});		
//						
//					
//
//
//					} else {
//
//
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginTop : -carouselItemHeight
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-top"
//								$curItems.css( 'margin-top', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//							}
//						});		
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//	
//			
//			
//			
//			/*
//			 * Transition between items previously (right/down)
//			 *
//			 * @param  {object} wrapper         - Wrapper of carousel.
//			 * @param  {object} items           - Items of carousel.
//			 * @param  {object} curBtn          - The button that currently triggers the move.
//			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {void}                   - The constructor.
//			 */
//			function movePrev( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				var $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				
//				//Move to the end
//				if ( 1 == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( 2 == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				var preventEvent = function() {
//					if ( carouselNext && carouselNext != '' ) {
//						$( carouselNext ).data( 'click', 0 ).removeClass( 'disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-left', -carouselItemWidth + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginLeft : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//						
//
//
//
//							}
//						});
//						
//
//
//
//					} else {
//
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-top', -carouselItemHeight + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginTop : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//
//							}
//						});
//
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//
//
//
//
//
//		});		
//		
//    };
//
//    APP.components.documentReady.push( APP.MULTI_ITEMS_CAROUSEL.documentReady );
//    return APP;
//
//}( APP, jQuery, window, document ) );
//



/* 
 *************************************
 * <!-- Full Page/One Page Transition -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ONEPAGE               = APP.ONEPAGE || {};
	APP.ONEPAGE.version       = '0.0.2';
    APP.ONEPAGE.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();
		

	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation      = 0,
			quietPeriod        = 500, //Do not change it
			animationTime      = 1000,//According to page transition animation changes
			$sectionsContainer = $( '.uix-noemal-load__onepage-container' ),
			$sections          = $sectionsContainer.find( '> section' ),
			sectionTotal       = $sections.length,
			topSectionSpacing  = 0,
			$primaryMenu       = $( '.uix-menu' ),
			$sidefixedMenu     = $( '.uix-menu-sidefixed' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		


		// Prepare everything before binding wheel scroll
		$.each( $sections, function( i ) {
			$( this ).attr( 'data-index', i );
			if ( i == 0 ) {
				$( this ).addClass( 'active' );

			}
			
		});
		

		
		//Init the section location
		sectionStart();
		
		
		$( window ).on( 'hashchange', function(){
			console.log( 'hash changed!' );
		} );
		

		
		/*
		 * Init the section location
		 *
		 * @return {void}                - The constructor.
		 */
		function sectionStart() {
	
			setTimeout( function() {
				var hash = window.location.hash,
					locArr,
					loc, 
					curTab;

				if ( hash ) {
					
					//Add hashchange event
					locArr = hash.split( 'section-' );
					loc    = locArr[1];
					moveTo( $sectionsContainer, false, loc );
				} else {
					moveTo( $sectionsContainer, false, 1 );
				}

			}, quietPeriod );

		}
			
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $sectionsContainer, 'down', false );
				
			} else {
				//scroll up
				moveTo( $sectionsContainer, 'up', false );
				
			  
			}
			lastAnimation = timeNow;
		}
		
      
		
		/*
		 * Move Animation
		 *
		 * @param  {object} el           - The container of each sections.
		 * @param  {string} dir          - Rolling direction indicator.
		 * @param  {number} hashID       - ID of custom hashchange event.
		 * @return {void}                - The constructor.
		 */
		function moveTo( el, dir, hashID ) {
			var index     = parseFloat( $sections.filter( '.active' ).attr( 'data-index' ) ),
				nextIndex = null,
				$next     = null,
				isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			
			 
			if ( dir == 'down' || dir === false ) {
				nextIndex = index + 1;
			} else {
				nextIndex = index - 1;
			}
			

			//ID of custom hashchange event
			if ( isNumeric.test( hashID ) ) nextIndex = parseFloat( hashID - 1 );
			
			
			if ( nextIndex <= parseFloat( sectionTotal-1 ) && nextIndex >= 0 ) {
				
				if ( nextIndex > parseFloat( sectionTotal-1 ) ) nextIndex = parseFloat( sectionTotal-1 );
				if ( nextIndex < 0 ) nextIndex = 0;


				//Returns the target section
				$next = $sections.eq( nextIndex );

				//Smooth scroll to content
				if ( $next.length > 0 ) {
					TweenMax.to( window, animationTime/1000, {
						scrollTo: {
							y: $next.offset().top - topSectionSpacing
						},
						ease: Power2.easeOut,
						onComplete: function() {

							$sections.removeClass( 'leave' );
							$sections.eq( index ).addClass( 'leave' );

							$sections.removeClass( 'active' );
							$next.addClass( 'active' ).removeClass( 'leave' );



							//Changing The Site URL
							var curSectionIndex = $sections.filter( '.active' ).index() + 1,
								href            = window.location.href.substr( 0, window.location.href.indexOf( '#' ) ) + '#' + $sections.filter( '.active' ).attr( 'id' );

							// Save state on history stack
							// - First argument is any object that will let you restore state
							// - Second argument is a title (not the page title, and not currently used)
							// - Third argument is the URL - this will appear in the browser address bar
							history.pushState( {}, document.title, href );
							console.log( 'Section ' + curSectionIndex + ' loaded!' );


						}
					});			
				}	
				
			}
			

	

			
		}
		
		

		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
		goPageSection( $primaryMenu );
		goPageSection( $sidefixedMenu );

        
	
		//Activate the first item
		$primaryMenu.find( 'li:first' ).addClass( 'active' );
		$sidefixedMenu.find( 'li:first' ).addClass( 'active' );
		
		
		/*
		 * Get section or article by href
		 *
		 * @param  {string, object} el  - The current selector or selector ID
		 * @return {object}             - A new selector.
		 */
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }
		
		
		/*
		 * Get link by section or article id
		 *
		 * @param  {string, object} el    - The current selector or selector ID
		 * @param  {object} menuObj       - Returns the menu element within the document.
		 * @param  {boolean} echoIndex    - Whether to return the current index.
		 * @return {object}               - A new selector.
		 */
        function getRelatedNavigation( el, menuObj, echoIndex ) {
			
			if ( echoIndex ) {
				return menuObj.find( 'li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' ).index();
			} else {
			    return menuObj.find( 'li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );	
			}
            
        } 
		
		/*
		 * Get all links by section or article
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {object}             - A new selector.
		 */
        function getAllNavigation( menuObj ) {
            return menuObj.find( 'li' );
        } 	
		
		
		/*
		 * Smooth scroll to content
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {void}               - The constructor.
		 */
        function goPageSection( menuObj ) {
			menuObj.find( 'li > a' ).on( 'click', function(e) {
				e.preventDefault();
				
				if ( $( this ).parent().hasClass( 'active' ) ) return false;
				
				
				moveTo( $sectionsContainer, false, $( this ).parent( 'li' ).index() + 1 );
			});	
	
        } 	



		var navMinTop      = ( $sidefixedMenu.length > 0 ) ? $sidefixedMenu.offset().top : 0,
			navMaxTop      = parseFloat( $( document ).height() - $( '.uix-footer__container' ).height() ) - windowHeight/3;

		$window.on( 'scroll touchmove', function() {
			var scrollTop = $( this ).scrollTop(),
				spyTop    = parseFloat( scrollTop + topSectionSpacing ),
				minTop    = $( '[data-highlight-section="true"]' ).first().offset().top,
				maxTop    = $( '[data-highlight-section="true"]' ).last().offset().top + $( '[data-highlight-section="true"]' ).last().height();

			$( '[data-highlight-section="true"]' ).each( function()  {
				var block     = $( this ),
					eleTop    = block.offset().top;
				

				// The 1 pixel in order to solve inaccurate value of outerHeight() 
				// in Safari and Firefox browsers.
				if ( eleTop < spyTop + 1 ) {

					// Highlight element when related content
					getAllNavigation( $primaryMenu ).removeClass( 'active' );
					getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
					getRelatedNavigation( block, $primaryMenu, false ).addClass( 'active' );
					getRelatedNavigation( block, $sidefixedMenu, false ).addClass( 'active' );
					
					
				} 
			});



			//Cancel the current highlight element
			// The 1 pixel in order to solve inaccurate value of outerHeight() 
			// in Safari and Firefox browsers.
			if ( spyTop > maxTop || spyTop < minTop - 1 ) {
				getAllNavigation( $primaryMenu ).removeClass( 'active' );
				getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
			}


			//Detecting when user scrolls to bottom of div
			if ( spyTop > navMaxTop || spyTop < navMinTop ) {
				$sidefixedMenu.removeClass( 'is-fixed' );
			} else {
				$sidefixedMenu.addClass( 'is-fixed' );
			}	




		});	
	
		

		
		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollMoveInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});
		
		
		
		/* 
		 ====================================================
		 *  Touch Method
		 ====================================================
		 */
			
		var startX,
			startY;


		$sectionsContainer.on( 'touchstart.ONEPAGE', function( event ) {
			var touches = event.originalEvent.touches;
			if ( touches && touches.length ) {
				startX = touches[0].pageX;
				startY = touches[0].pageY;


				$sectionsContainer.on( 'touchmove.ONEPAGE', function( event ) {

					var touches = event.originalEvent.touches;
					if ( touches && touches.length ) {
						var deltaX = startX - touches[0].pageX,
							deltaY = startY - touches[0].pageY;

						if ( deltaX >= 50) {
							//--- swipe left


						}
						if ( deltaX <= -50) {
							//--- swipe right
						


						}
						if ( deltaY >= 50) {
							//--- swipe up
							moveTo( $sectionsContainer, 'down', false );

						}
						if ( deltaY <= -50) {
							//--- swipe down
							moveTo( $sectionsContainer, 'up', false );
							

						}
						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$sectionsContainer.off( 'touchmove.ONEPAGE' );
						}
					}

				});
			}	
		});

		
		

		
    };

    APP.components.documentReady.push( APP.ONEPAGE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Full Page/One Page Transition 2 -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ONEPAGE2               = APP.ONEPAGE2 || {};
	APP.ONEPAGE2.version       = '0.0.1';
    APP.ONEPAGE2.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation      = 0,
			quietPeriod        = 500, //Do not change it
			animationTime      = 1000,//According to page transition animation changes
			$sectionsContainer = $( '.uix-noemal-load__onepage-container2' ),
			$sections          = $sectionsContainer.find( '> section' ),
			sectionTotal       = $sections.length,
			topSectionSpacing  = 0,
			$primaryMenu       = $( '.uix-menu' ),
			$sidefixedMenu     = $( '.uix-menu-sidefixed' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		
		
		//Init the sections style
		$sectionsContainer.css({
			'position' : 'relative'
		});
		
		var secIndex = 10;
		for ( var i = 0; i < sectionTotal; i++ ) {
			
			$sections.eq( i ).css({
				'position' : 'absolute',
				'width'    : '100%',
				'z-index'  : secIndex,
				'top'      : 0,
				'left'     : 0
			});		
			
			secIndex--;
			
			
		}
		
		


		// Prepare everything before binding wheel scroll
		$.each( $sections, function( i ) {
			$( this ).attr( 'data-index', i );
			if ( i == 0 ) {
				$( this ).addClass( 'active' );

			}
			
		});
		

		//Init the section location
		sectionStart();

		$( window ).on( 'hashchange', function(){
			console.log( 'hash changed!' );
		} );
		
		
		
		/*
		 * Init the section location
		 *
		 * @return {void}                - The constructor.
		 */
		function sectionStart() {
	
			setTimeout( function() {
				var hash = window.location.hash,
					locArr,
					loc, 
					curTab;

				if ( hash ) {
					
					//Add hashchange event
					locArr = hash.split( 'section-' );
					loc    = locArr[1];
					moveTo( $sectionsContainer, false, loc );
				} else {
					moveTo( $sectionsContainer, false, 1 );
				}

			}, quietPeriod );

		}
			
		

		/*
		 * Initialize the depth of all sections
		 *
		 * @param  {number} nextIndex        - Index of next section.
		 * @param  {number} currentIndex     - Index of current section.
		 * @return {void}                    - The constructor.
		 */
		function sectionsDepthInit( nextIndex, currentIndex ) {
	
			var secIndex = 10;
			
			for ( var i = 0; i < sectionTotal; i++ ) {

				if ( nextIndex && i != nextIndex && i != currentIndex ) {
					$sections.eq( i ).css( 'z-index', secIndex );
				}
				 
				secIndex--;

			}
			
			
		}
		
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $sectionsContainer, 'down', false );
				
			} else {
				//scroll up
				moveTo( $sectionsContainer, 'up', false );
				
			  
			}
			lastAnimation = timeNow;
		}
		
      
		
		/*
		 * Move Animation
		 *
		 * @param  {object} el           - The container of each sections.
		 * @param  {string} dir          - Rolling direction indicator.
		 * @param  {number} hashID       - ID of custom hashchange event.
		 * @return {void}                - The constructor.
		 */
		function moveTo( el, dir, hashID ) {
			var index     = parseFloat( $sections.filter( '.active' ).attr( 'data-index' ) ),
				nextIndex = null,
				$next     = null,
				isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			
			if ( dir == 'down' || dir === false ) {
				nextIndex = index + 1;
			} else {
				nextIndex = index - 1;
			}
			
			//ID of custom hashchange event
			if ( isNumeric.test( hashID ) ) nextIndex = parseFloat( hashID - 1 );
			
			
			if ( nextIndex <= parseFloat( sectionTotal-1 ) && nextIndex >= 0 ) {
				
				if ( nextIndex > parseFloat( sectionTotal-1 ) ) nextIndex = parseFloat( sectionTotal-1 );
				if ( nextIndex < 0 ) nextIndex = 0;


				//Returns the target section
				$next = $sections.eq( nextIndex );

				if ( $next.length > 0 ) {

					TweenMax.set( $next, {
						css: {
							'z-index' : 12,
							'top'     : ( dir == 'down' || dir === false ) ? windowHeight : -windowHeight
						},
						onComplete: function() {

							//Reset sections z-index
							$sections.eq( index ).css( 'z-index', 11 );
							sectionsDepthInit( nextIndex, index );


							TweenMax.to( $sections.eq( index ), animationTime/1000, {
								css: {
									'top'     : ( dir == 'down' || dir === false ) ? -windowHeight/2 : windowHeight/2
								},
								ease: Power2.easeOut
							});		



							TweenMax.to( this.target, animationTime/2000, {
								css: {
									'top'     : 0
								},
								ease: Power2.easeOut,
								onComplete: function() {


									$sections.removeClass( 'leave' );
									$sections.eq( index ).addClass( 'leave' );

									$sections.removeClass( 'active' );
									$next.addClass( 'active' ).removeClass( 'leave' );



									//Changing The Site URL
									var curSectionIndex = $sections.filter( '.active' ).index() + 1,
										href            = window.location.href.substr( 0, window.location.href.indexOf( '#' ) ) + '#' + $sections.filter( '.active' ).attr( 'id' );

									
									// Save state on history stack
									// - First argument is any object that will let you restore state
									// - Second argument is a title (not the page title, and not currently used)
									// - Third argument is the URL - this will appear in the browser address bar
									history.pushState( {}, document.title, href );
									console.log( 'Section ' + curSectionIndex + ' loaded!' );

									// Highlight element when related content
									getAllNavigation( $primaryMenu ).removeClass( 'active' );
									getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
									$primaryMenu.find( 'li' ).eq( nextIndex ).addClass( 'active' );
									$sidefixedMenu.find( 'li' ).eq( nextIndex ).addClass( 'active' );



								}
							});			

						}
					});



				}		
				
				
			}
			
			


			
	
			
		}
		
		
		
		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
		goPageSection( $primaryMenu );
		goPageSection( $sidefixedMenu );

	
		//Activate the first item
		$primaryMenu.find( 'li:first' ).addClass( 'active' );
		$sidefixedMenu.find( 'li:first' ).addClass( 'active' );

		
		/*
		 * Get section or article by href
		 *
		 * @param  {string, object} el  - The current selector or selector ID
		 * @return {object}             - A new selector.
		 */
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }

		
		/*
		 * Get all links by section or article
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {object}             - A new selector.
		 */
        function getAllNavigation( menuObj ) {
            return menuObj.find( 'li' );
        } 	
		
		
		/*
		 * Smooth scroll to content
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {void}               - The constructor.
		 */
        function goPageSection( menuObj ) {
			menuObj.find( 'li > a' ).on( 'click', function(e) {
				e.preventDefault();
				
				if ( $( this ).parent().hasClass( 'active' ) ) return false;
				
			
				var dir = 'down';
				
				if ( $sections.filter( '.active' ).index() > $( this ).parent().index() ) {
					dir = 'up';
				}
				moveTo( $sectionsContainer, dir, $( this ).parent( 'li' ).index() + 1 );
				
				
			});	
	
        } 	
        
	
		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollMoveInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});
		
		
		/* 
		 ====================================================
		 *  Touch Method
		 ====================================================
		 */
			
		var startX,
			startY;


		$sectionsContainer.on( 'touchstart.ONEPAGE2', function( event ) {
			var touches = event.originalEvent.touches;
			if ( touches && touches.length ) {
				startX = touches[0].pageX;
				startY = touches[0].pageY;


				$sectionsContainer.on( 'touchmove.ONEPAGE2', function( event ) {

					var touches = event.originalEvent.touches;
					if ( touches && touches.length ) {
						var deltaX = startX - touches[0].pageX,
							deltaY = startY - touches[0].pageY;

						if ( deltaX >= 50) {
							//--- swipe left


						}
						if ( deltaX <= -50) {
							//--- swipe right
						


						}
						if ( deltaY >= 50) {
							//--- swipe up
							moveTo( $sectionsContainer, 'down', false );

						}
						if ( deltaY <= -50) {
							//--- swipe down
							moveTo( $sectionsContainer, 'up', false );
							

						}
						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$sectionsContainer.off( 'touchmove.ONEPAGE2' );
						}
					}

				});
			}	
		});

		
		
    };

    APP.components.documentReady.push( APP.ONEPAGE2.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Parallax -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PARALLAX               = APP.PARALLAX || {};
	APP.PARALLAX.version       = '0.0.3';
    APP.PARALLAX.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        
		//  Initialize
		parallaxInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth  = $window.width();
				windowHeight = $window.height();

				// Do stuff here
				parallaxInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Initialize parallx settings
		 *
		 * @param  {number} w         - Returns width of browser viewport
		 * @param  {number} h         - Returns height of browser viewport
		 * @return {void}             - The constructor.
		 */
		function parallaxInit( w, h ) {
			
			/* Pure parallax scrolling effect without other embedded HTML elements */
			$( '.uix-parallax--pure-bg' ).each( function() {
				var $this       = $( this ),
					dataImg     = $this.data( 'parallax-bg' ),
					dataSpeed   = $this.data( 'parallax' );
				
				if( typeof dataSpeed === typeof undefined ) {
					dataSpeed = 0;
				}
				
				if( typeof dataImg != typeof undefined && dataImg != '' ) {
					$this.css( 'background-image', 'url('+dataImg+')' );
				}
				
				$window.on( 'scroll touchmove', function() {
					var scrolled = $window.scrollTop();
					$this.css( {
							'margin-top': Math.round( scrolled * dataSpeed ) + 'px',
							'transition': 'none'
						} );
				});	
				
		
			});
			
			
			/* Parallax scrolling effect with embedded HTML elements */
			$( '.uix-parallax' ).each( function() {
				var $this            = $( this ),
					$curImg          = $this.find( '.uix-parallax__img' ),
					dataImg          = $curImg.attr( 'src' ),
					dataSkew         = $this.data( 'skew' ),
					dataSpeed        = $this.data( 'speed' ),
					dataOverlay      = $this.data( 'overlay-bg' ),
					dataFullyVisible = $this.data( 'fully-visible' ),
					dataElSpeed      = $this.find( '.uix-parallax__el' ).data( 'el-speed' ),	
					curImgH          = null,
					curImgW          = null,
					curSize          = 'cover',
				    curAtt           = 'fixed';
				
				
				if( 
					typeof dataOverlay === typeof undefined ||
					dataOverlay == 'none' ||
					dataOverlay == 0 ||
					dataOverlay == false
				  ) {
					dataOverlay = 'rgba(0, 0, 0, 0)';
				}
				
				if( typeof dataSpeed === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataSpeed = 0;
				}	
				
				if( typeof dataElSpeed === typeof undefined ) {
					dataElSpeed = 0;
				}	
				
				if( typeof dataFullyVisible === typeof undefined ) {
					dataFullyVisible = false;
				}	
				
				//Trigger a callback when the selected images are loaded
				//Check if the picture is loaded on the page
				var img    = new Image();
				img.onload = function() {
					
					curImgH = $curImg.height();
					curImgW = $curImg.width();
					
					//Custom height for parallax container
					if ( 
						$this.hasClass( 'uix-height--10' ) || 
						$this.hasClass( 'uix-height--20' ) || 
						$this.hasClass( 'uix-height--30' ) || 
						$this.hasClass( 'uix-height--40' ) || 
						$this.hasClass( 'uix-height--50' ) || 
						$this.hasClass( 'uix-height--60' ) || 
						$this.hasClass( 'uix-height--70' ) || 
						$this.hasClass( 'uix-height--80' ) || 
						$this.hasClass( 'uix-height--90' ) || 
						$this.hasClass( 'uix-height--100' )
					 ) {		

						var newH = $this.height();
						$this.css( {
							'height': newH + 'px'
						} );	
						$curImg.css( 'max-height', newH + 'px' );	
					 } else {
						$this.css( {
							'height': $this.height() + 'px'
						} );	
					 }


					//If the ".uix-v-align--absolute" has more content
					if ( w <= 768 ) {

						if ( $this.find( '.uix-v-align--absolute' ).height() >= curImgH ) {
							$this.find( '.uix-v-align--absolute' ).addClass( 'uix-v-align--relative' );
							$curImg.hide();	
						}

					}


					if ( w > 768 ) {

						//Enable parallax only desktop
						$this.bgParallax( "50%", dataSpeed );


						//Resize the background image to cover the entire container and
						//Resize the background image to make sure the image is fully visible
						if ( curImgW > w ) {
							curSize = 'contain';
						} else {
							curSize = 'cover';
						}

						curAtt = 'fixed';

					} else {
						curSize = 'contain';
						curAtt  = 'scroll';
					}

					//Determine image height and parallax container height
					//If the height is the same, higher or lower than the height of the container height, 
					//be sure to use the cover attribute
					if ( curImgH <= $this.height() ) {
						curSize = 'cover';
					}

					//Whether to display all pictures, including the edges
					if ( dataFullyVisible ) {

						if ( curImgW < w ) {
							curSize = 'cover';
						} else {
							curSize = 'contain';
						}

					}


					//console.log( 'Height: ' +curImgH + '===' + $this.height() + ' | Width: ' + curImgW + '===' + w + ' | ' + curSize );

					//Add background image to parallax container
					if( typeof dataImg != typeof undefined ) {

						if ( Modernizr.cssanimations ) {
							// supported

							$this.css( {
								'background' : 'linear-gradient('+dataOverlay+', '+dataOverlay+'), url(' + dataImg + ') 50% 0/'+curSize+' no-repeat ' + curAtt
							} );
						} else {
							// not-supported

							$this.css( {
								'background' : 'url(' + dataImg + ') 50% 0/'+curSize+' no-repeat ' + curAtt
							} );
						}

					}


					//Apply tilt effect
					if( typeof dataSkew != typeof undefined ) {
						$this.css( {
							'transform'  : 'skew(0deg, '+dataSkew+'deg)'
						} );
					}


					//Embedded parent disparity elements
					if ( $this.find( '.uix-parallax__el' ).length > 0 ) {
						$window.on( 'scroll touchmove', function() {
							var scrolled = $window.scrollTop();
							$this.find( '.uix-parallax__el' ).css( {
								'transform' : 'translateY('+Math.round( ( $this.offset().top - scrolled ) * dataElSpeed )+'px)',
								'transition': 'none'
							} );
						});			
					}
	
					
					
				};
				
				
				img.src = dataImg;
				
			
		
			});
			
		
	
		}	
		
    };

    APP.components.documentReady.push( APP.PARALLAX.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.bgParallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each( function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each( function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);



/* 
 *************************************
 * <!-- Periodical Scroll -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PERIODICAL_SCROLL               = APP.PERIODICAL_SCROLL || {};
	APP.PERIODICAL_SCROLL.version       = '0.0.1';
    APP.PERIODICAL_SCROLL.documentReady = function( $ ) {

		$( '[data-periodical-scroll-container]' ).each( function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' ),
				$wrap       = $this.find( ul ),
				itemHeight  = $wrap.find( 'li:first' ).height();


			if( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			//Initialize the container height
			$wrap.css({
				'height'   : itemHeight + 'px',
				'overflow' : 'hidden'
			});
			
			
			
			var stop      = false,
				obj       = $wrap;

			// change item
			setInterval( periodicalTextChange, timing );

			function periodicalTextChange() {
				
				if ( stop ) return;

				var itemToMove = obj[0].firstElementChild;
				itemToMove.style.marginTop = -itemHeight + 'px';
			  
				// move the child to the end of the items' list
				setTimeout( function() {
					itemToMove.removeAttribute( 'style' );
					obj[0].appendChild( itemToMove );
				}, speed );
			}

			obj.on( 'mouseenter', function() { stop = true; } )
			   .on( 'mouseleave', function() { stop = false; } );		

			
			
		});
		
    };

    APP.components.documentReady.push( APP.PERIODICAL_SCROLL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Pricing -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PRICING               = APP.PRICING || {};
	APP.PRICING.version       = '0.0.2';
    APP.PRICING.documentReady = function( $ ) {

		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		//-------- Pricing initialize
		pricingInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				pricingInit( windowWidth );
		

			}
		});
		
		
		
		function pricingInit( w ) {
			//Initialize the height
			$( '.uix-price' ).each( function(){


					//returns new id
					var $this            = $( this ),
						priceBGH         = Array(),
						priceBGH_excerpt = Array(),
						$initHeight      = $this.find( '.js-uix-init-height' );

					$initHeight.each( function( index ) {
						//Screen protection of height
						$( this ).find( '.uix-price__outline, .uix-price__excerpt' ).css( 'height', 'auto' );

						var tempheight = $( this ).height();
						var tempheight_excerpt = $( this ).find( '.uix-price__excerpt' ).height();
						priceBGH.push( tempheight );
						priceBGH_excerpt.push( tempheight_excerpt );


					} );

					var priceBGH_Max = Math.max.apply( Math, priceBGH );


					if ( priceBGH_Max > 0 ) {
						if ( w > 768 ){

							// Initialize the height of all columns
							$initHeight.find( '.uix-price__outline' ).css( 'height', priceBGH_Max + 'px' );

							// Actived columns
							$initHeight.find( '.uix-price__outline.active' ).each( function() {

								var ty = Math.abs( parseInt( $( this ).css('transform').split(',')[5]));
								if ( !isNaN(ty) ) {
									$( this ).css( 'height', priceBGH_Max + ty*2 + 'px' );
								}

							});	



						} else {
							$initHeight.find( '.uix-price__outline' ).css( 'height', 'auto' );


						}


						// Actived columns
						$initHeight.find( '.uix-price__outline.active' ).each( function() {

							var textColor = $( this ).closest( '.uix-price__outline--hover' ).data( 'tcolor' ),
								btnColor  = $( this ).closest( '.uix-price__outline--hover' ).data( 'bcolor' );

							$( this ).css( 'background-color', btnColor );
							$( this ).find( '.uix-btn' ).removeClass( 'uix-btn__bg--primary' ).addClass( 'uix-btn__bg--secondary' );


						});	



					}


			});
		}
		
		
		
    };

    APP.components.documentReady.push( APP.PRICING.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Progress Bar -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PROGRESSBAR               = APP.PROGRESSBAR || {};
	APP.PROGRESSBAR.version       = '0.0.4';
    APP.PROGRESSBAR.documentReady = function( $ ) {

		var waypoints = $( '[data-progressbar-percent]' ).waypoint({
			handler: function( direction ) {

				var $this        = $( this.element ),
					percent      = $this.data( 'progressbar-percent' ),
					unit         = $this.data( 'progressbar-unit' );

				if( typeof percent === typeof undefined ) {
					percent = 0;
				}

				if( typeof unit === typeof undefined ) {
					unit = '%';
				}	


				//Radial Progress Bar
				if ( $this.hasClass( 'uix-progressbar--circle' ) ) {
					$this.find( '.uix-progressbar__track' ).html( '<span>'+percent+'<em class="uix-progressbar__unit">'+unit+'</em></span>' );
					$this.addClass( 'uix-progressbar--progress-' + percent );	
				} 


				//Rectangle Progress Bar
				if ( $this.hasClass( 'uix-progressbar--rectangle' ) ) {
					$this.find( '.uix-progressbar__bar > span' ).html( ''+percent+'<em class="uix-progressbar__unit">'+unit+'</em>' );
					$this.addClass( 'uix-progressbar--progress-' + percent );	
				} 

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();



			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
    };

    APP.components.documentReady.push( APP.PROGRESSBAR.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Retina Graphics for Website -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.RETINA               = APP.RETINA || {};
	APP.RETINA.version       = '0.0.1';
    APP.RETINA.documentReady = function( $ ) {

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

    APP.components.documentReady.push( APP.RETINA.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/* 
 *************************************
 * <!-- Rotating Elements -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ROTATING_EL               = APP.ROTATING_EL || {};
	APP.ROTATING_EL.version       = '0.0.1';
    APP.ROTATING_EL.documentReady = function( $ ) {


		$( '[data-pointer-to-deg]' ).each( function()  {

			var $this  = $( this ),
				config = $this.data( 'pointer-to-deg' );


			if( typeof config === typeof undefined ) {
				config = false;
			}

			if ( config ) {

				if ( $( config.target ).length == 0 ) return false;
				
				
				var pointer      = $( config.target )[0],
					pointerBox   = pointer.getBoundingClientRect(),
					centerPoint  = window.getComputedStyle( pointer ).transformOrigin,
					centers      = centerPoint.split( ' ' ),
					mouseX,
					mouseY;


				if ( config.mouseSpy ) {
					$( document ).on( 'mousemove touchstart touchmove', function( e ) {
						var pointerEvent = e;
						if ( e.targetTouches && e.targetTouches[0] ) {
							e.preventDefault();
							pointerEvent = e.targetTouches[0];
							mouseX = pointerEvent.pageX;
							mouseY = pointerEvent.pageY;
						} else {
							mouseX = e.clientX;
							mouseY = e.clientY;
						}


						var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
							centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
							radians = Math.atan2(mouseX - centerX, mouseY - centerY),
							degrees = (radians * (180 / Math.PI) * -1) + 180;


						pointer.style.transform = 'rotate(' + degrees + 'deg)';

					});

				}

				
				$this.on( 'click', function( e ) {
					e.preventDefault();

					pointer.style.transform = 'rotate(' + config.deg + 'deg)';

				});
				

			}
			
			
		});
		

			
		
    };

    APP.components.documentReady.push( APP.ROTATING_EL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Scroll Reveal -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SCROLL_REVEAL               = APP.SCROLL_REVEAL || {};
	APP.SCROLL_REVEAL.version       = '0.1.0';
    APP.SCROLL_REVEAL.documentReady = function( $ ) {

		
		var viewport;
		
		//From JSON config in data attribute in HTML
		var $scrollRevealElements = $( '[data-uix-anim]' ),
			tmAnim = function( obj, type ) {

				var config = obj.data( 'uix-anim' );

				if( typeof config === typeof undefined || config == '' || config === false ) {
					config = {
						"from"     : {"opacity":0,"x":70},
						"to"       : {"opacity":1,"x":0},
						"ease"     : "Power2.easeOut",
						"duration" : 0.8,
						"delay"    : 0,
						"infinite" : false,
						"viewport" : '100%' //A percentage of the viewport's height.
					};
				}
				
			
				//get attributes to tweenMax
				var fromCSS     = config.from,
					toCSS       = config.to,
					myEase      = config.ease,
					myDuration  = config.duration,
					myDelay     = config.delay,
					infinite    = config.infinite;
				
				//A percentage of the viewport's height.
				viewport = config.viewport;
				
				
				if( Object.prototype.toString.call( fromCSS ) == '[object String]' ) {
					//Add class when element becomes visible
					
					toCSS = toCSS.replace(/\./, '' );
					
					if ( type == 'from' ) obj.removeClass( toCSS );

					if ( type == 'from-anim' ) obj.removeClass( toCSS );

					//Target animation
					if ( type == 'to' ) obj.addClass( toCSS );

					
				} else {
					//Using TweenMax to create animations
					if ( type == 'from' ) {
						TweenMax.set( obj, {
							css        : fromCSS
						});	

					}

					if ( type == 'from-anim' ) {
						TweenMax.to( obj, myDuration, {
							css        : fromCSS
						});	

					}

					//Target animation
					if ( type == 'to' ) {

						TweenMax.to( obj, myDuration, {
							css    : toCSS,
							ease   : myEase,
							delay  : myDelay
						});		


					}	


					
				}
				
				//Reversing Scroll Animations for Loop  
				if ( type == 'loop' ) {
					if ( infinite ) {
						return 1;
					} else {
						return 0;
					}	
				}

				

			};


		$scrollRevealElements.each( function()  {
			
			//Prevent asynchronous loading of repeated calls
			var actived = $( this ).data( 'active' );
			
			if( typeof actived === typeof undefined ) {
				tmAnim( $( this ), 'from' );

			}
			
		});

		
					
		//Prevent the location of page elements from being loaded incorrectly
		//Invoking a jQuery function after .each() has completed
		setTimeout( function() {
		
			var waypoints = $scrollRevealElements.waypoint({
				handler: function( direction ) {

					
					//Prevent asynchronous loading of repeated calls
					var actived = $( this.element ).data( 'active' ),
						tmLoop  = tmAnim( $( this.element ), 'loop' );
					

					if( typeof actived === typeof undefined && tmLoop != 1 ) {
						
						//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
						tmAnim( $( this.element ), 'to' );

						$( this.element ).data( 'active', 1 );

						
					}
					
					if ( tmLoop === 1 ) {
						if ( direction === 'up' ) {
							tmAnim( $( this.element ), 'from-anim' );
						} else {
							tmAnim( $( this.element ), 'to' );
						}
					}	
					



				},
				offset: viewport //0~100%, bottom-in-view
			});
	
		}, 500 );
		
    };

    APP.components.documentReady.push( APP.SCROLL_REVEAL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SHOW_MORELESS               = APP.SHOW_MORELESS || {};
	APP.SHOW_MORELESS.version       = '0.0.1';
    APP.SHOW_MORELESS.documentReady = function( $ ) {

		$( '.uix-more-btn__link' ).on( 'click', function( e ) {
			e.preventDefault();
			$( this ).parent().prev( '.uix-more-btn' ).toggleClass( 'js-uix-show' );
			$( this ).find( '> span' ).first().toggle();
			$( this ).find( '> span' ).eq(1).toggle();
			

		});	
		
    };

    APP.components.documentReady.push( APP.SHOW_MORELESS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Smooth Scrolling When Clicking An Anchor Link -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SMOOTH_SCROLLING_ANCHORLINK               = APP.SMOOTH_SCROLLING_ANCHORLINK || {};
	APP.SMOOTH_SCROLLING_ANCHORLINK.version       = '0.0.3';
    APP.SMOOTH_SCROLLING_ANCHORLINK.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		
		
		var browserURL = window.location.href;
	
		//Prevent anchor behaviour
		$( 'a' ).click( function( e ) {
			
			var linkURL    = $( this ).attr( 'href' ),
				locIndex, 
				locURL;
			
			if ( linkURL.indexOf( '#' ) >= 0 && linkURL != '#' ) {
				e.preventDefault();
				
				var locArr = linkURL.split( '#' );
			    locIndex = locArr[1];
				locURL   = locArr[0];
				
				
				if ( browserURL.indexOf( locURL ) < 0 ) {
					window.location.href = locURL + '#!!' + locIndex;
				}
				
				
			}
				
			
		} );
		
		
		//Page automatically slide to jump to the corresponding position
		if ( browserURL.indexOf( '#!!' ) >= 0 ) {
			
			var curndex = browserURL.split( '#!!' ),
				$target = $( '#' + curndex[1] );

			//Smooth scrolling
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y: $target.offset().top
				},
				ease: Power2.easeOut
			});		
	
			
		}
		
		
		
		
		
		//Hyperlink click event
		$( 'a[href*="#"]' ).on( 'click', function( e ) {
		
			if ( 
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
				location.hostname == this.hostname &&
				$( this ).attr( 'href' ) != '#'
				
			) {
				
				// Figure out element to scroll to
				var target = $( this.hash );
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if ( target.length ) {

					// Only prevent default if animation is actually gonna happen
					e.preventDefault();
					

					TweenMax.to( window, 0.5, {
						scrollTo: {
							y: target.offset().top
						},
						ease: Power2.easeOut,
						onComplete : function() {
							
							// Callback after animation
							// Must change focus!
							var $target = $( target );
							$target.focus();
							if ( $target.is( ':focus' ) ) { // Checking if the target was focused
								return false;
							} else {
								$target.attr( 'tabindex', '-1' ); // Adding tabindex for elements not focusable
								$target.focus();
							}	
							
						}
					});	
		
					
				}
			}
		} );

		
    };

    APP.components.documentReady.push( APP.SMOOTH_SCROLLING_ANCHORLINK.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * <!-- Source Code View -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SOURCE_CODE_VIEW               = APP.SOURCE_CODE_VIEW || {};
	APP.SOURCE_CODE_VIEW.version       = '0.0.1';
    APP.SOURCE_CODE_VIEW.documentReady = function( $ ) {

		//Add view source code to body
		$( 'body' ).prepend( '<a href="#uix-source-code" id="uix-view-source"><i class="fa fa-code" aria-hidden="true"></i></a><div id="uix-source-code"><a href="javascript:void(0);" id="uix-source-code__close"></a></div>' );
				
		
		
		//View source button event
		$( '#uix-view-source' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'hidden' );
			$( '#uix-source-code' ).show();
		});
		
		$( '#uix-source-code > #uix-source-code__close' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'auto' );
			var uri = window.location.toString();
			if ( uri.indexOf( '#' ) > 0 ) {
				var clean_uri = uri.substring(0, uri.indexOf( '#' ) );
				window.history.replaceState({}, document.title, clean_uri );
			}
			$( '#uix-source-code' ).hide();
			
		});
		
		
		//Remove tag from HTML-String
		var removeElements = function( text, selector ) {
			var wrapped = $( "<div>" + text + "</div>" );
			wrapped.find( selector ).remove();
			return wrapped.html();
		};


		//Source code init
		var sourceCodeBodyClass      = $( 'body' ).attr( 'class' ),
			sourceCodeBodyClassCode  = ( typeof sourceCodeBodyClass != typeof undefined ) ? 'body class="'+sourceCodeBodyClass+'"' : 'body';
		
		$.get( window.location.toString(), function( data ) {
			var pageBodyCode   = data.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0],
				pageHeaderCode = data.split("</head>")[0];
			
			pageBodyCode   = removeElements( pageBodyCode, '#uix-view-source, #uix-source-code' );
			pageBodyCode   = pageBodyCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });
			pageHeaderCode = pageHeaderCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });


			$("<pre />", {
				"html":   pageHeaderCode + '&lt;/head&gt;\n&lt;'+sourceCodeBodyClassCode+'&gt;\n' + pageBodyCode + '\n&lt;/body&gt;\n&lt;/html&gt;',
				"class": 'highlightBlock-print html'
			}).appendTo( '#uix-source-code' );	
			
		});
		
		
		
		//highlighter written
		
    };

    APP.components.documentReady.push( APP.SOURCE_CODE_VIEW.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.STICKY_EL               = APP.STICKY_EL || {};
	APP.STICKY_EL.version       = '0.0.1';
    APP.STICKY_EL.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			topSpacing   = $( '.uix-header__container' ).outerHeight( true ) + 10;
		
		
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

		var	waypoints = $( '.stick-widget' ).waypoint({

		  handler: function( direction ) {


			var $this      = $( this.element ),
				oWIdth     = $this.width();


			  $this
				  .toggleClass( 'sticky', direction === 'down' )
				  .css( {
					  'width': oWIdth + 'px',
					  'top'  : topSpacing + 'px'
				  } );



		  },

		  offset: topSpacing

		});	
		
	
			
//		var	navMinTop    = $( '.stick-widget' ).offset().top + $( window ).height()/3,
//			navMaxTop    = parseFloat( $( document ).height() - $( '.uix-footer__container' ).height() ) - $( window ).height()/3;
//
//
//		$( window ).on( 'scroll touchmove', function() {
//			var scrollTop = $( this ).scrollTop(),
//				spyTop    = parseFloat( scrollTop + $( window ).height()/2 );
//
//			//Detecting when user scrolls to bottom of div
//			if ( spyTop > navMaxTop || spyTop < navMinTop ) {
//				$( '.stick-widget' ).removeClass( 'act' );
//			} else {
//				$( '.stick-widget' ).addClass( 'act' );
//			}	
//
//
//		});


    
		
    };

    APP.components.pageLoaded.push( APP.STICKY_EL.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- SVG Map (China) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SVG_MAP_CHINA               = APP.SVG_MAP_CHINA || {};
	APP.SVG_MAP_CHINA.version       = '0.0.1';
    APP.SVG_MAP_CHINA.documentReady = function( $ ) {


		
		var $svgEl = $( '.uix-svgmap--china' );
		
		$( '.uix-svgmap--china__trigger a' ).on( 'click', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();

			var goName       = $( this ).data( 'title' ),
				goText       = $( this ).text(),
				svgCurName   = '',
				svgNameIndex = 0;
			
			$( '.uix-svgmap--china .uix-svgmap--china__name' ).each( function()  {
				
				if ( goName == $( this ).data( 'title' ) ) {
					svgCurName = $( this ).data( 'title' );
					return false;
				}
			});
			
			svgNameIndex = $( '.uix-svgmap--china .uix-svgmap--china__name[data-title="'+svgCurName+'"]' ).index();
			
			//Hide all elements
			svgMapRestore(1);

			
			//Display current element
			svgMapActive( svgNameIndex, goText );
			
			

		});
		
		
		//Restore all elements
		$( 'body' ).on( 'click', function( e ) {
			svgMapRestore(2);
		});

		function svgMapRestore( type ) {

			var alpha = ( type == 1 ) ? 0.3 : 1;

			$svgEl.children().removeClass( 'is-show' );
			$svgEl.find( 'circle' ).css({
				'r'         : 6,
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});


			$svgEl.find( '.uix-svgmap--china__name' ).each( function()  {
				$( this ).css({
					'transform' : 'translate(0,15px)',
					'z-index'   : 1,
					'opacity'   : alpha
				})
				.text( $( this ).data( 'title' ) );

			});

			$svgEl.find( '.uix-svgmap--china__num' ).css({
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});	


		}


		function svgMapActive( index, text ) {
			$svgEl.each( function()  {
				$( this ).children().eq( index ).addClass( 'is-show' );
				$( this ).find( 'circle' ).eq( index ).css({
					'r'         : 15,
					'z-index'   : 2,
					'opacity'   : 1
				});
				$( this ).find( '.uix-svgmap--china__name' ).eq( index ).css({
					'transform' : 'translate(0,25px)',
					'z-index'   : 2,
					'opacity'   : 1
				})
				.text( text );

				$( this ).find( '.uix-svgmap--china__num' ).eq( index ).css({
					'font-size' : '10px',
					'z-index'   : 2,
					'opacity'   : 1
				});	


			});

		}

		
    };

    APP.components.documentReady.push( APP.SVG_MAP_CHINA.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- SVG Map (World) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SVG_MAP_WORLD               = APP.SVG_MAP_WORLD || {};
	APP.SVG_MAP_WORLD.version       = '0.0.1';
    APP.SVG_MAP_WORLD.documentReady = function( $ ) {


		var $svgEl = $( '.uix-svgmap--world' );
		

		$( '.uix-svgmap--world__trigger a' ).on( 'click', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();

			var goName       = $( this ).data( 'title' ),
				goText       = $( this ).text(),
				svgCurName   = '',
				svgNameIndex = 0;
			
			$( '.uix-svgmap--world .uix-svgmap--world__name' ).each( function( index )  {
				
				if ( goName == $( this ).data( 'title' ) ) {
					svgCurName = $( this ).data( 'title' );
				    svgNameIndex = index;
					return false;
				}
			});
		
			//Hide all elements
			svgMapRestore(1);

			
			//Display current element
			svgMapActive( svgNameIndex, goText );
			
			
	
		});
		
			
			
		//Restore all elements
		$( 'body' ).on( 'click', function( e ) {
			svgMapRestore(2);
		});

		
		function svgMapRestore( type ) {

			var alpha = ( type == 1 ) ? 0.3 : 1;

			$svgEl.children().removeClass( 'is-show' );
			$svgEl.find( 'path' ).css({
				'z-index'   : 1,
				'opacity'   : alpha
			});



			$svgEl.find( '.uix-svgmap--world__name' ).each( function()  {
				$( this ).css({
					'z-index'   : 1,
					'opacity'   : alpha,
					'font-size' : '3px'
				})
				.text( $( this ).data( 'title' ) );

			});



			$svgEl.find( '.uix-svgmap--world__num' ).css({
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});	


		}


		function svgMapActive( index, text ) {
			$svgEl.each( function()  {
				$( this ).children().eq( index ).addClass( 'is-show' );
				$( this ).find( 'path' ).eq( index ).css({
					'z-index'   : 2,
					'opacity'   : 1
				});
				$( this ).find( '.uix-svgmap--world__name' ).eq( index ).css({
					'z-index'   : 2,
					'opacity'   : 1,
					'font-size' : '10px'
				})
				.text( text );

				$( this ).find( '.uix-svgmap--world__num' ).eq( index ).css({
					'font-size' : '10px',
					'z-index'   : 2,
					'opacity'   : 1
				});	


			});

		}
		
    };

    APP.components.documentReady.push( APP.SVG_MAP_WORLD.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * <!-- Tabs -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TABS               = APP.TABS || {};
	APP.TABS.version       = '0.1.2';
    APP.TABS.documentReady = function( $ ) {

		$( '.uix-tabs' ).each( function( id ) {
			var $this             = $( this ),
			    $li               = $this.find( 'ul > li' ),
				liWidth           = $li.first().outerWidth(),
				liHeight          = $li.first().outerHeight(),
				liNum             = $li.length,
				$contentbox       = $this.find( '.uix-tabs__content' ),
				ulWidth           = $this.data( 'width' ),
				fullwidth         = $this.data( 'fullwidth' ),
				rotation          = $this.data( 'rotation' ),
				rotationRadius    = $this.data( 'rotation-radius' ),
				rotationWapperDeg = $this.data( 'rotation-wrapper-angle' ),
				rotationDisplay   = $this.data( 'rotation-display' ),
				
				
				
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
			
			if( typeof rotationDisplay === typeof undefined ) {
				rotationDisplay = 5;
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
		
				$this.find( '.uix-tabs__nav' ).css( {
					'width'      : rotationRadius * 2 + 'px'
				} );

		
				$this.find( 'ul' ).css( {
					'width'     : rotationRadius * 2 + 'px',
					'height'    : rotationRadius * 2 + 'px',
					'transform' : 'rotate('+parseFloat(rotationWapperDeg)+'deg)'
				} );

				

				//Layout components in a circle layout
				var angle           = 0,
					step            = 2 * Math.PI / rotationDisplay,
					transitionDelay = 0,
					pad             = $this.find( 'ul' ).width();


				$this.find( 'ul > li' ).each( function() { //Can'nt use arrow function here!!!
					// 'this' works differently with arrow fucntions
					var el          = $( this ),
						x           = rotationRadius * Math.cos(angle) - liWidth / 2,
						y           = rotationRadius * Math.sin(angle) - liHeight / 2;


					el.css({
						'transform'        : 'translate('+parseFloat( x )+'px,'+parseFloat( pad/2 + y )+'px)',
						'transition-delay' : transitionDelay + "s"
					})
					.find( '> a' )
					.css({
						'transform'        : 'rotate('+parseFloat(-rotationWapperDeg)+'deg)'
					});


					angle += step;
					transitionDelay += 0.15;
					
					
					
					//Click on the rotation effect
					//----------------------- begin ----------------------
					el.on( 'click', function( e ) {
						
						var increase   = Math.PI * 2 / rotationDisplay,
							n          = $( this ).index(),
							endAngle   = n % rotationDisplay * increase; 


						( function turn() {
							if (Math.abs(endAngle - angle) > 1 / 8) {
								var sign = endAngle > angle ? 1 : -1;
								angle = angle + sign / 8;
								setTimeout(turn, 20);
							} else {
								angle = endAngle;
							}
							
							
						
							$this.find( 'ul > li' ).each( function( index ) {
								var x2           = Math.cos( - Math.PI / 2 + index * increase - angle) * rotationRadius - liWidth / 2,
									y2           = Math.sin( - Math.PI / 2 + index * increase - angle) * rotationRadius + liHeight;

							
								$( this ).css({
									'transform'        : 'translate('+parseFloat( x2 )+'px,'+parseFloat( y2 )+'px)',
									'transition'       : 'none',
									'transition-delay' : 0
								})
								.find( '> a' )
								.css({
									'transform'        : 'rotate('+parseFloat(-rotationWapperDeg)+'deg)'
								});

							});

														 
						})();	
						
					});
					//----------------------- end ----------------------
					
					
				});	


				
			}
			
			
			// Tab Sliding Effext
			if ( $this.find( 'ul li:first .uix-tabs__marker' ).length == 0 ) {
				$this.find( 'ul li:first' ).prepend( '<div class="uix-tabs__marker"></div>' );
			}
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.uix-tabs__content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				//sliding marker
				var translateX = $( this ).index() * 100,
					liHeight   = $this.find( 'ul li:first' ).outerHeight(),
					translateY = $( this ).index() * liHeight;
				
				if ( $( window ).width() <= 768 ) {
					$this.find( '.uix-tabs__marker' ).css({
						'transform'          : 'translateY( '+translateY+'px )'	
					});	
				} else {
					$this.find( '.uix-tabs__marker' ).css({
						'transform'          : 'translateX( '+translateX+'% )'	
					});	
				}

		
				
				return false;
				
				
			});
			
			// Init
			$this.find( 'ul > li.active' ).trigger( 'click' );
			
			//Active current tab
			var url    = window.location.href,
				locArr,
			    loc, 
				curTab;
			
			if ( url.indexOf( '#' ) >= 0 ) {
				
				locArr = url.split( '#' );
			    loc    = locArr[1];
				curTab = $( '.uix-tabs' ).find( 'ul > li:eq('+loc+')' );
				curTab.trigger( 'click' );	
			}
				
			
				
			
		});
		
		
    };

    APP.components.documentReady.push( APP.TABS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Team Focus -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TEAM_FOCUS               = APP.TEAM_FOCUS || {};
	APP.TEAM_FOCUS.version       = '0.0.2';
    APP.TEAM_FOCUS.documentReady = function( $ ) {

		var teamFocusContent = '.uix-team-focus',
			teamFocusMask    = '.uix-team-focus__mask';
			
			
		$( teamFocusContent ).each( function() {
			var $this           = $( this ),
				thisID          = 'uix-team-focus-' + UIX_GUID.newGuid(),
				hoverWidth      = $this.data( 'hover-width' ),
				targetWidth     = $this.data( 'target-width' ), // Div over width as a percentage 
				targetInfo      = $this.data( 'target-info' ), // Corresponding character details display
				closeBtn        = $this.data( 'close-btn' ),
				el              = '#' + thisID + '> div',
				total           = 0;
			
			
			
			$this.attr( 'id', thisID );
			
		
			if( typeof hoverWidth === typeof undefined ) {
				hoverWidth = 20;
			}	
			
			if( typeof targetWidth === typeof undefined ) {
				targetWidth = 80;
			}	
			
			if( typeof closeBtn === typeof undefined ) {
				closeBtn = '.close';
			}
			
			if( typeof targetInfo === typeof undefined ) {
				targetInfo = '.uix-team-focus__info';
			}		
		
			total = $( el ).length;
		

			TweenMax.set( el, {
				width: 100/total + '%'
			});
			
			
			//Add an index to each item
			$( el ).each( function( index )  {
				$( this ).attr( 'data-index', index );
			});
			

			//Create item hover overlay effects
			$( el ).on( 'mouseenter', function() {

				var $cur      = $( this ),
					$neighbor = $cur.siblings().not( '.focus' ); //Get the siblings of each element in the set of matched elements

				TweenMax.to( $cur, 0.3, {
					width: hoverWidth + '%'
				});

				TweenMax.to( $neighbor, 0.3, {
					width: ( 100 - hoverWidth )/( total - 1 ) + '%'
				});

			} );

			
			//Display the target item
			$( document ).on( 'click', el, function( e ) {
				e.preventDefault();

				var $cur        = $( this ),
					$neighbor   = $cur.siblings(), //Get the siblings of each element in the set of matched elements
					$cloneItem  = $cur.clone();
				
				//The mask prevent click and hover
				$( teamFocusMask ).show();
				
				$( el ).removeClass( 'active' );
				$cur.addClass( 'active' );
				
				
				
				var $info   = $( targetInfo ),
					cName   = $cur.data( 'name' ),
					cPo     = $cur.data( 'po' ),
					cIntro  = $cur.data( 'intro' );
					
				TweenMax.set( $info, {
					css: {
						opacity : 0,
						display : 'none'
					},
					onComplete : function() {
						
						TweenMax.to( this.target, 0.5, {
							css: {
								opacity    : 1,
								display    : 'block'
							}
						});		
						
					}
				});
				
				
				$info.find( 'h4 strong' ).html( cName );
				$info.find( 'h4 em' ).html( cPo );
				$info.find( '.uix-team-focus__info__text' ).html( cIntro );
				

				if ( !$cur.hasClass( 'focus' ) ) {
					$( el + '.focus' ).remove();


					TweenMax.set( $cloneItem, {
						alpha      : 0,
						onComplete : function() {

							this.target
								.prependTo( '#' + thisID )
								.addClass( 'focus' );

						}
					});

					TweenMax.to( el, 0.3, {
						alpha      : 1
					});


					TweenMax.to( $cur, 0.3, {
						alpha : 0
					});
					
					TweenMax.to( $neighbor, 0.3, {
						alpha : 0.3
					});
				}



			});

			
			//Close the focus item
			$( document ).on( 'click', el + '.focus, ' + closeBtn + ', ' + targetInfo + ', ' + teamFocusMask, function( e ) {
				e.preventDefault();
				
				//Remove the mask
				$( teamFocusMask ).hide();
				
				TweenMax.to( el, 0.3, {
					width : 100/total + '%',
					ease  : Back.easeOut
				});

				TweenMax.to( el + '.focus', 0.3, {
					alpha : 0,
					onComplete : function() {

						$( el + '.focus' ).remove();
						TweenMax.to( el, 0.3, {
							alpha : 1
						});
					}
				});

				
				var $info = $( targetInfo );
				TweenMax.to( $info, 0.5, {
					css: {
						opacity : 0,
						display : 'none'
					}
				});	
				
				$info.find( 'h4 strong' ).html( '' );
				$info.find( 'h4 em' ).html( '' );
				$info.find( '.uix-team-focus__info__text' ).html( '' );		


			});	
			
			
			
		});	


		
    };

    APP.components.documentReady.push( APP.TEAM_FOCUS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Testimonials Carousel -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TESTIMONIALS               = APP.TESTIMONIALS || {};
	APP.TESTIMONIALS.version       = '0.0.1';
    APP.TESTIMONIALS.documentReady = function( $ ) {

		var $obj                 = $( '.uix-testimonials .flexslider' ),
			testimonialsControls = '';
		
		
		for ( var i = 0; i < $obj.find( '.slides > li' ).length; i++ ) {
			testimonialsControls += '<li></li>';
		}
		$( '.uix-testimonials__controls' ).html( testimonialsControls );
    	
		
		
		$obj.flexslider({
			animation         : 'slide',
			slideshow         : true,
			smoothHeight      : true,
			controlNav        : true,
			manualControls    : '.uix-testimonials__controls li',
			directionNav      : false,
			animationSpeed    : 600,
			slideshowSpeed    : 7000,
			selector          : ".slides > li",
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
				
				
				$( '.uix-testimonials__count .total' ).text( '0' + slider.count );
				$( '.uix-testimonials__count .cur' ).text( '0' + parseFloat( slider.currentSlide + 1 ) );
				
			},
			after: function(slider){
				
				$( '.uix-testimonials__count .total' ).text( '0' + slider.count );
				$( '.uix-testimonials__count .cur' ).text( '0' + parseFloat( slider.currentSlide + 1 ) );
				
			}
		});
		
		
    };

    APP.components.documentReady.push( APP.TESTIMONIALS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







/* 
 *************************************
 * <!-- Text effect -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.TEXT_EFFECT               = APP.TEXT_EFFECT || {};
	APP.TEXT_EFFECT.version       = '0.0.3';
    APP.TEXT_EFFECT.pageLoaded    = function() {

		//Default Effect
		//-------------------------------------	
		$( '[data-text-eff]' ).each( function( index )  {
			$( document ).customTextEffInit( { selectors: '[data-text-eff="'+$( this ).data( 'text-eff' )+'"]' } );
		});   
		
    };

    APP.components.pageLoaded.push( APP.TEXT_EFFECT.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/*
 * Text Effect
 *
 * @param  {string} selectors                - Text wrapper ID or class name.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customTextEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selectors    : '.letters-eff-fadeInRight'
        }, options );
 
        this.each( function() {
			
			var $this                = $( this ),
				customControls       = settings.selectors,
				speed                = $( customControls ).data( 'text-eff-speed' ),
				txtEff;

			
				if( typeof speed === typeof undefined ) {
					speed = 1200;
				}	
			
		
				$( customControls ).html( $( customControls ).text().replace(/([^\x00-\x80]|\w)/g, "<span class='uix-letter'>$&</span>") );
			
			
			    //--------------
				if( customControls.indexOf( 'fadeInRight' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
							targets: customControls + ' .uix-letter',
							translateX: [40,0],
							translateZ: 0,
							opacity: [0,1],
							easing: "easeOutExpo",
							duration: speed,
							delay: function(el, i) {
							  return 500 + 30 * i;
							}
						  });

				}
			
			    //--------------
				if( customControls.indexOf( 'zoomInDown' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
						    targets: customControls + ' .uix-letter',
							scale: [0, 1],
							duration: speed,
							elasticity: 600,
							delay: function(el, i) {
							  return 45 * (i+1);
							}
						  });

				}	
			
			    //--------------
				if( customControls.indexOf( 'flyInOut' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
					        .add({
							targets: customControls + ' .uix-letter',
							translateX: [40,0],
							translateZ: 0,
							opacity: [0,1],
							easing: "easeOutExpo",
							duration: speed,
							delay: function(el, i) {
							  return 500 + 30 * i;
							}
						  });
					
				}	
					
			



			
		});
 
    };
 
}( jQuery ));


/* 
 *************************************
 * <!-- Timeline -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.TIMELINE               = APP.TIMELINE || {};
	APP.TIMELINE.version       = '0.1.5';
    APP.TIMELINE.pageLoaded    = function() {

		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height();
				
				

		/*! 
		 ---------------------------
         Horizontal Timeline
		 ---------------------------
		 */
		if ( windowWidth > 768 ) {
			$( '.uix-timeline__container-wrapper.is-horizontal' ).each( function()  {

				var $this          = $( this ),
					$container     = $this.find( '.uix-timeline__container.is-horizontal' ),
					$timeline      = $container.find( '> .uix-timeline' ),
					dateShowEle    = $timeline.data( 'show-ele' );

				if ( typeof dateShowEle === typeof undefined ) {
					dateShowEle = '#timeline-number-show';
				}	
		
			

				$this.find( '.uix-timeline__btn--prev' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, true );
					return false;
				});

				$this.find( '.uix-timeline__btn--next' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, false );
					return false;
				});

				$this.find( '.uix-timeline__item .uix-timeline__item--img' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, $( this ).parent(), dateShowEle, false );
					return false;
				});

				
				//Activate the default selection
				timelineUpdate( $this, $this.find( '.uix-timeline__item.active' ), dateShowEle, false );
				if ( $this.find( '.uix-timeline__item.active' ).index() == 0 ) {
					$this.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
				}
				

				
				if ( $this.hasClass( 'is-reversed' ) ) {
					
					// Set equal heights
					var infoNewHeight = setEqualHeights( $timeline.find( '.uix-timeline__item--info' ) );

					function setEqualHeights( el ) {
						var counter = 0;

						for ( var i = 0; i < el.length; i++) {

							var singleHeight = $( el[i] )[0].offsetHeight;

							if (counter < singleHeight) {
								counter = singleHeight;
							}
						}

						for ( var k = 0; k < el.length; k++) {
							$( el[k] ).css( 'height', counter + 'px' );
						}

						return counter;

					}	
					
			
					// Reset container height
					$container.css( {
						'padding' : infoNewHeight + 'px 0'
					} );	
				}


				
				
			});	
		}
		
		

		/*
		 * Method that updates items of timeline
		 *
		 * @param  {object} obj                  - Wrapper of timeline.
		 * @param  {object} iscur                - The current item.
		 * @param  {string} showEle              - Element ID or class name that push the current text.
		 * @param  {boolean} prev                - Whether to slide forward.
		 * @return {void}                        - The constructor.
		 */
		function timelineUpdate( obj, iscur, showEle, prev ) {
			var	itemTotal  = obj.find( '.uix-timeline__item' ).length,
				tNav       = obj.find( '.uix-timeline__item' ),
				tLoop      = false;
			
			
			var curIndex = obj.find( '.uix-timeline__item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				
				if ( prev ) {
					tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;
				} else {
					tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;
				}
				
			}
			
			
		
			
			//loop the items
			obj.find( '.uix-timeline__btn--prev, .uix-timeline__btn--next' ).removeClass( 'disabled' );
			
			if ( prev ) {
				
				//Previous
				if ( tLoop ) {
					if ( tarIndex < 0 ) tarIndex = itemTotal-1;
				} else {
					if ( tarIndex < 0 ) tarIndex = 0;
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
					
					 
				}
			} else {
				
				//Next
				if ( tLoop ) {
					if ( tarIndex == itemTotal ) tarIndex = 0;
				} else {
					if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
					if ( tarIndex > itemTotal-2 ) obj.find( '.uix-timeline__btn--next' ).addClass( 'disabled' );
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
				}
			}

			
			
			tNav.removeClass( 'active' );
			obj.find( '.uix-timeline__item:eq('+tarIndex+')' ).addClass( 'active' );

			//scroll left
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.uix-timeline__item:eq('+i+')' ).width();
			}
	
			obj.find( '.uix-timeline__container.is-horizontal > .uix-timeline' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			//Push the current text to element 
			$( showEle ).text( obj.find( '.uix-timeline__item:eq('+i+')' ).find( '.uix-timeline__item--date' ).text() );
			
			
		}
    
		
    };

    APP.components.pageLoaded.push( APP.TIMELINE.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Vertical Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.VERTICAL_MENU               = APP.VERTICAL_MENU || {};
	APP.VERTICAL_MENU.version       = '0.0.1';
    APP.VERTICAL_MENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			ulForDesktop = '.uix-v-menu__container:not(.is-mobile) ul.uix-menu';


		// Menu Hover
		var mTop = 15;
		$( ulForDesktop + ' > li.multi-column > ul li ul' ).addClass( 'multi' );
		$( ulForDesktop + ' > li:not(.multi-column) ul, .uix-v-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, '+ulForDesktop+' li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );

		$( ulForDesktop + ' li' ).on( 'mouseenter', function(){


			TweenMax.set( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), {
				css: {
					opacity    : 0,
					display    : 'block',
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.to( this.target, 0.3, {
						css: {
							opacity    : 1,
							marginTop  : 0
						},
						ease   : Power2.easeOut
					});		



				}
			});				


		
			//Calculate whether the total width of a large navigation is greater than the window
			var megaMenuW        = $( ulForDesktop + ' > li.multi-column > ul' ).width(),
				megaMaxW         = parseFloat( windowWidth - $( ulForDesktop ).parent().width() ),
				megaMenuCoLength = $( ulForDesktop + ' > li.multi-column > ul > li' ).length;
			
			if ( megaMenuW > megaMaxW ) {
				
				$( ulForDesktop + ' > li.multi-column > ul > li' ).css( 'width', megaMaxW/megaMenuCoLength + 'px' );
				
			}
			
			

		}).on( 'mouseleave' , function(){


			TweenMax.to( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), 0.3, {
				css: {
					opacity    : 0,
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.set( this.target, {
						css: {
							display    : 'none',
						}
					});		



				}
			});				

		});
		



		//Add Sub-menu Arrow
		$( ulForDesktop + ' li' ).each( function() {
			if ( $( this ).find( 'ul' ).length > 0 ) {
				$( this ).prepend( '<span class="uix-menu__arrow"></span>' );
			}

		} );	
		
		
		
		
		
		//Monitor the maximum height of the vertical navigation
		menuWrapInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth  = $window.width();
				windowHeight = $window.height();

				// Do stuff here
				menuWrapInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Monitor the maximum height of the vertical navigation
		 *
		 * @param  {number} w         - Returns width of browser viewport
		 * @param  {number} h         - Returns height of browser viewport
		 * @return {void}             - The constructor.
		 */
		function menuWrapInit( w, h ) {
			
			var $menuWrap  = $( '.uix-v-menu__container:not(.is-mobile)' ),
				vMenuTop   = 0, //This value is equal to the $vertical-menu-top variable in the SCSS
				winHeight  = h - vMenuTop;

			//WoedPress spy
			if ( $( '.admin-bar' ).length > 0 ) {
				winHeight = h - 132;
			}	

			$menuWrap.css({
				position  : 'fixed',
				height    : winHeight + 'px',
				marginTop : 0
			});	

			$window.on('scroll', function() {

				var curULHeight = $( 'ul.uix-menu' ).height(),
					windowPos   = $window.scrollTop();

				if ( curULHeight > winHeight ) {
					$menuWrap.css({
						position : 'absolute',
						height   : curULHeight + 'px'
					});

					if ( windowPos >= ( curULHeight - winHeight ) ) {
						$menuWrap.css({
							position  : 'fixed',
							marginTop : -( curULHeight - winHeight ) + 'px'
						});	
					} else {
						$menuWrap.css({
							position : 'absolute',
							marginTop : 0
						});		
					}

				}

				if ( $menuWrap.height() < winHeight ) {
					$menuWrap.css({
						position  : 'fixed',
						height    : winHeight + 'px',
						marginTop : 0
					});		
				}


			});	
			
		}
			
		
    };

    APP.components.documentReady.push( APP.VERTICAL_MENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.AJAX_PAGE_LOADER               = APP.AJAX_PAGE_LOADER || {};
	APP.AJAX_PAGE_LOADER.version       = '0.0.4';
    APP.AJAX_PAGE_LOADER.documentReady = function( $ ) {

        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation       = 0,
			quietPeriod         = 500, //Do not change it
			animationTime       = 1000,//According to page transition animation changes
			loaderRemoveDelay   = 500,
			AJAXPageLinks       = '[data-ajax-page]',
			$navs               = $( AJAXPageLinks ).parent().parent().find( 'li' ),
			total               = $navs.length,
			$sectionsContainer  = $( '.uix-ajax-load__fullpage-container' ),
			ajaxContainer       = '.ajax-container',
			curAjaxPageID       = $( ajaxContainer ).data( 'ajax-page-id' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		
		
		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
	
		//Activate the first item
		if ( $( '.js-uix-ajax-load__container' ).length == 0 ) {
			moveTo( $( ajaxContainer ), false, 'down', 0 );
		} else {
			//Activate navigation from AJAX request
			if ( typeof curAjaxPageID != typeof undefined ) $navs.eq( curAjaxPageID ).addClass( 'active' );
		}

		
		

		/* 
		 ====================================================
		 *  AJAX Interaction
		 ====================================================
		 */
		/*
		 * Initialize the clickable ajax links
		 *
		 * @return {void}  - The constructor.
		 */
		function ajaxInit() {
			if ( windowWidth <= 768 ) {
				$( AJAXPageLinks ).data( 'mobile-running', true );
			} else {
				$( AJAXPageLinks ).data( 'mobile-running', false );
			}
			
			
		}
			
		ajaxInit();
		$window.on( 'resize', function() {
			windowWidth = $window.width();
			ajaxInit();
		} );	

		

		
		/*
		 * Call AJAX on click event for "single pages links"
		 *
		 */
		$( document ).on( 'click', AJAXPageLinks, function( e ) {
			
			//Prevents third-party plug-ins from triggering
			if ( $( this ).data( 'mobile-running' ) ) {
				return;
			}
			
			e.preventDefault();
			
			
			var $this            = $( this ),
				curIndex         = $this.attr( 'data-index' ),
			    curURL           = $this.attr( 'href' ); 

			
			//The currently URL of link
			if ( typeof curURL === typeof undefined ) {
				curURL = $this.closest( 'a' ).attr( 'href' );
			}
			
			
			//Prevent multiple request on click
			if ( $( AJAXPageLinks ).data( 'request-running' ) ) {
				return;
			}
			$( AJAXPageLinks ).data( 'request-running', true );

			
			//Click on this link element using an AJAX request
			var dir = 'down';

			if ( $navs.filter( '.active' ).find( '> a' ).attr( 'data-index' ) > curIndex ) {
				dir = 'up';
			}
			moveTo( $( ajaxContainer ), curURL, dir, curIndex );
			
			
			
			return false;
			
			
		});
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $( ajaxContainer ), false, 'down', false );
				
			} else {
				//scroll up
				moveTo( $( ajaxContainer ), false, 'up', false );
				
			  
			}
			lastAnimation = timeNow;
		}
		
		
		/*
		 * Move Animation
		 *
		 * @param  {object} container    - The instance returned from the request succeeds 
		 * @param  {string} url          - The target URL via AJAX.
		 * @param  {string} dir          - Rolling direction indicator.
		 * @param  {number} customIndex  - User-specified index value, located on the corresponding AJAX hyperlink.
		 * @return {void}                - The constructor.
		 */
		function moveTo( container, url, dir, customIndex ) {
			var index     = parseFloat( $navs.filter( '.active' ).find( '> a' ).attr( 'data-index' ) ),
				nextIndex = null,
				isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
		
			//If there is a custom index, it is enabled first
			if ( isNumeric.test( customIndex ) ) {
				nextIndex = customIndex;
				
			} else {
				if ( dir == 'down' || dir === false ) {
					nextIndex = index + 1;
				} else {
					nextIndex = index - 1;
				}	
			}

			
			if ( nextIndex <= parseFloat( total - 1 ) && nextIndex >= 0 ) {
				
				if ( nextIndex > parseFloat( total - 1 ) ) nextIndex = parseFloat( total - 1 );
				if ( nextIndex < 0 ) nextIndex = 0;
				

		
				//Prevents third-party plug-ins from triggering
				if ( $navs.eq( nextIndex ).find( '> a' ).data( 'mobile-running' ) ) {
					return;
				}
			
				
				//Activate navigation from AJAX request
				$navs.removeClass( 'active' );
				$navs.eq( nextIndex ).addClass( 'active' );


				
				//Use automatic indexing when no URLs come in.
				if ( !url || typeof url === typeof undefined ) {
					url = $navs.eq( nextIndex ).find( '> a' ).attr( 'href' );
				}
 
				//Click on this link element using an AJAX request
				$.ajax({
					timeout  : 15000,
					url      : url,
					method   : ( typeof container.data( 'ajax-method' ) === typeof undefined ) ? 'POST' : container.data( 'ajax-method' ),
					dataType : 'html',
					data     : {
						action  : 'load_singlepages_ajax_content'
					},	
					success  : function( response ) {
						
						//A function to be called if the request succeeds
						ajaxSucceeds( dir, container, url, $( response ).find( '.js-uix-ajax-load__container' ).html() );

					},
					error: function(){
						window.location.href = url;
					},
					beforeSend: function() {

						TweenMax.set( '.uix-ajax-load__loader', {
							css         : {
								'display' : 'block'
							},
							onComplete  : function() {
								TweenMax.to( this.target, 0.5, {
									alpha : 1
								});
							}
						});



					}
				}).fail( function( jqXHR, textStatus ) {
					if( textStatus === 'timeout' ) {
						window.location.href = url;
					}
				});		
				
				
			}
			
	
			
		}
		
		
		
		/*
		 * A function to be called if the request succeeds
		 *
		 * @param  {string} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {object} container - The instance returned from the request succeeds
		 * @param  {string} url       - Current URL after click
		 * @param  {string} content   - The data returned from the server
		 * @return {void}             - The constructor.
		 */
		function ajaxSucceeds( dir, container, url, content ) {
			
			var oldContent = container.html();
		
			//Remove loader
			TweenMax.to( '.uix-ajax-load__loader', 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( this.target, {
						css         : {
							'display' : 'none'
						}
					});
					

					//The data returned from the server
					container.html( content ).promise().done( function(){
						
						//Transition effect between two elements.
						eleTransitionEff( dir, oldContent, content );
	
						// Modify the URL without reloading the page
						if( history.pushState ) {
							history.pushState( null, null, url );
						}
						else {
							location.hash = url;
						}
						
						//Change URL without refresh the page
						if ( url == 'home.html' ) {
							history.pushState(null, null, window.location.href.replace( 'home.html', '' ) );
						}	
						
						

						//Prevent multiple request on click
						$( AJAXPageLinks ).data( 'request-running', false );	
						
						
						
					});
					

	
					
				},
				delay       : loaderRemoveDelay/1000
			});
			
			
		}
		
		
		
		/*
		 * Transition effect between two elements.
		 *
		 * @param  {string} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {string} oldContent     - A string of HTML to set as the content of matched old element.
		 * @param  {string} newContent     - A string of HTML to set as the content of matched new element.
		 * @return {void}                  - The constructor.
		 */
		function eleTransitionEff( dir, oldContent, newContent ) {
			
			var $originalItem   = $sectionsContainer.find( '> section' ),
				$cloneItem      = $originalItem.clone();

			
			//Reset the original element
			$originalItem.css( {
				'z-index': 1
			} );
			

			//Clone the last element to the first position
			$cloneItem
				.prependTo( $sectionsContainer )
				.css( {
				    'z-index': 2,
				    'transform': 'translateY('+( ( dir == 'down' || dir === false ) ? windowHeight : -windowHeight )+'px)'
				} )
			    //Add the latest content to the new container
			    .find( ajaxContainer )
			    .html( newContent );

			
			$originalItem.first().find( ajaxContainer ).html( oldContent ).promise().done( function(){
						

				TweenMax.to( $originalItem.first(), animationTime/1000, {
					y          : ( dir == 'down' || dir === false ) ? -windowHeight/2 : windowHeight/2,
					ease       : Power2.easeOut
				});		

				

				TweenMax.to( $cloneItem, animationTime/1000, {
					y          : 0,
					ease       : Power2.easeOut,
					onComplete : function() {

						//Remove duplicate elements
						$originalItem
							.first()
							.remove();


						// Apply the original scripts
						$( document ).applyOriginalSomeScripts();
						
						
					}
				});
	
			});
			
			
		}
		

		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollMoveInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});		
		

		
    };

    APP.components.documentReady.push( APP.AJAX_PAGE_LOADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





		
		
/*
 * Apply some original scripts
 *
 * @param  {boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to 
 *                                           load asynchronous information
 * @param  {boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to 
 *                                           load asynchronous information
 * @return {void}  - The constructor.
 */
( function ( $ ) {
    $.fn.applyOriginalSomeScripts = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			scrollReveal    : true,
			ajaxPostList    : true
        }, options );
 
        this.each( function() {

			
			//----
			if ( APP.INDEX ) APP.INDEX.pageLoaded(); //Theme Scripts
			if ( APP.COMMON_HEIGHT ) APP.COMMON_HEIGHT.pageLoaded(); //Common Height
			if ( APP.LIGHTBOX ) APP.LIGHTBOX.pageLoaded(); //Custom Lightbox
			if ( APP.ADVANCED_SLIDER ) APP.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)
			if ( APP.ADVANCED_SLIDER_FILTER ) APP.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider	
			if ( APP.POST_LIST_SPLIT_FULLWIDTH ) APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded(); //Fullwidth List of Split
			if ( APP.STICKY_EL ) APP.STICKY_EL.pageLoaded(); //Sticky Elements
			if ( APP.TEXT_EFFECT ) APP.TEXT_EFFECT.pageLoaded(); //Text effect
			if ( APP.TIMELINE ) APP.TIMELINE.pageLoaded(); //Timeline
			
		
			//----
			if ( APP.INDEX ) APP.INDEX.documentReady($); //Theme Scripts
			if ( APP.MODAL_DIALOG ) APP.MODAL_DIALOG.documentReady($); //Modal Dialog
			if ( APP.PARALLAX ) APP.PARALLAX.documentReady($); //Parallax
			if ( APP.VIDEOS ) APP.VIDEOS.documentReady($); //Videos
			if ( APP.BODY_AND_HEADER ) APP.BODY_AND_HEADER.documentReady($); //Header Area
			if ( APP.SET_BG ) APP.SET_BG.documentReady($); //Specify a background image
			if ( APP.GET_CUSTOM_ATTRS ) APP.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
			if ( APP.PAGINATION ) APP.PAGINATION.documentReady($); //Pagination
			if ( APP.FORM ) APP.FORM.documentReady($); //Form
			if ( APP.DYNAMIC_DD_LIST ) APP.DYNAMIC_DD_LIST.documentReady($); //Dynamic Drop Down List from JSON
			if ( APP.FLEXSLIDER ) APP.FLEXSLIDER.documentReady($); //Flexslider
			if ( APP.RETINA ) APP.RETINA.documentReady($); //Retina Graphics for Website
			if ( APP.SHOW_MORELESS ) APP.SHOW_MORELESS.documentReady($); //Show More Less
			if ( APP.DROPDOWN_MENU ) APP.DROPDOWN_MENU.documentReady($); //Dropdown Menu
			if ( APP.DROPDOWN_MENU2 ) APP.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
			if ( APP.COUNTER ) APP.COUNTER.documentReady($); //Counter
			if ( APP.ACCORDION ) APP.ACCORDION.documentReady($); //Accordion	
			if ( APP.ADVANCED_CONTENT_SLIDER ) APP.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider
			if ( APP.GALLERY ) APP.GALLERY.documentReady($); //Gallery
			if ( APP.IMAGE_SHAPES ) APP.IMAGE_SHAPES.documentReady($); //Image Shapes
			if ( APP.PERIODICAL_SCROLL ) APP.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
			if ( APP.PRICING ) APP.PRICING.documentReady($); //Pricing
			if ( APP.PROGRESSBAR ) APP.PROGRESSBAR.documentReady($); //Progress Bar
			if ( APP.ROTATING_EL ) APP.ROTATING_EL.documentReady($); //Rotating Elements
			if ( APP.SMOOTH_SCROLLING_ANCHORLINK ) APP.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
			if ( APP.TABS ) APP.TABS.documentReady($); //Tabs
			if ( APP.TEAM_FOCUS ) APP.TEAM_FOCUS.documentReady($); //Team Focus
			if ( APP.TESTIMONIALS ) APP.TESTIMONIALS.documentReady($); //Testimonials Carousel
			if ( APP.LAVA_LAMP_STYLE_MENU ) APP.LAVA_LAMP_STYLE_MENU.documentReady($); //Lava-Lamp Style Menu
			if ( APP.CIRCLE_LAYOUT ) APP.CIRCLE_LAYOUT.documentReady($); //Circle Layout
			if ( APP.MULTI_ITEMS_CAROUSEL ) APP.MULTI_ITEMS_CAROUSEL.documentReady($); //Multiple Items Carousel
			if ( APP._3D_BACKGROUND ) APP._3D_BACKGROUND.documentReady($); //3D Background
			if ( APP._3D_CAROUSEL ) APP._3D_CAROUSEL.documentReady($); //3D Carousel
			
			
			//Scroll Reveal
			if ( settings.scrollReveal ) {
				if ( APP.SCROLL_REVEAL ) APP.SCROLL_REVEAL.documentReady($); 
			}
			
			//Posts List With Ajax
			if ( settings.ajaxPostList ) {
				if ( APP.POST_LIST_AJAX ) APP.POST_LIST_AJAX.documentReady($); 
			}
			
			
			
			//----Other functions here



			//----Uix Shortcodes (WordPress Plugin)
			if ( $.isFunction( $.uix_sc_init ) ) {
				$.uix_sc_init();
			}
			
			
		});
 
    };
 
}( jQuery ));



		

		
/*
 * Apply all the original scripts
 *
 * @param  {boolean} runAll          - Run all module scripts.
 * @return {void}  - The constructor.
 */	
( function ( $ ) {
    $.fn.applyOriginalAllScripts = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			runAll    : true
        }, options );
 
        this.each( function() {

			var scipts_pageLoaded    = APP.components.pageLoaded,
				scipts_documentReady = APP.components.documentReady;

			if ( settings.runAll ) {
				
				for ( var i = 0; i < scipts_pageLoaded.length; i++ ) {
					 scipts_pageLoaded[i]();
				}
				for ( var j = 0; j < scipts_documentReady.length; j++ ) {
					 scipts_documentReady[j]( $ );
				}		
			}



			//Uix Shortcodes
			if ( $.isFunction( $.uix_sc_init ) ) {
				$.uix_sc_init();
			}

			
		});
 
    };
 
}( jQuery ));


		
/*
 * Back to History URL 
 *
 * @return {void}  - The constructor.
 */	
( function ( $ ) {
    $.fn.backToHisroryURL = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			url    : false
        }, options );
 
        this.each( function() {
			
			var baseFullURL = window.location.protocol+'//'+window.location.hostname+window.location.pathname;
			
			if ( settings.url && settings.url != '' ) {
				baseFullURL = settings.url;
			}
			
			if ( $.support.pjax ) {
				history.pushState( {},'', baseFullURL );
			}
		
		});
 
    };
 
}( jQuery ));


/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.AJAX_PUSH_CONTENT               = APP.AJAX_PUSH_CONTENT || {};
	APP.AJAX_PUSH_CONTENT.version       = '0.0.2';
    APP.AJAX_PUSH_CONTENT.documentReady = function( $ ) {

        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var loaderRemoveDelay   = 500,
			AJAXPageLinks       = '[data-ajax-push-content]',
			historyEnable       = false;


		
		/*
		 * Call AJAX on click event for "single pages links"
		 *
		 */
		
		if ( historyEnable ) {
			//Detect URL change in JavaScript
			var History = window.History;

			if ( History.enabled ) {

				// Load the page
				if ( $( '#my-ajax-demo-push-container' ).length > 0 ) {
					pushAction( $( '#my-ajax-demo-push-container' ), '#my-ajax-demo-target-container', "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading...</span></div>", window.location.href, 'POST', false );


					// Apply the original scripts
					$( document ).applyOriginalSomeScripts();		

				}	

			} else {
				return false;
			}


			// Content update and back/forward button handler
			History.Adapter.bind(window, 'statechange', function() {
				var State = History.getState();	
				// Do ajax
				if ( $( '#my-ajax-demo-push-container' ).length > 0 ) {
					pushAction( $( '#my-ajax-demo-push-container' ), '#my-ajax-demo-target-container', "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading...</span></div>", State.data.path, 'POST', false );

				}	


				// Log the history object to your browser's console
				History.log(State);
			});
	
		}




		
		$( document ).on( 'click', AJAXPageLinks, function( event ) {
			
			event.preventDefault();
			
			
			var $this            = $( this ),
				config           = $this.data( 'ajax-push-content' ),
			    curURL           = $this.attr( 'href' ); 

			if( typeof config === typeof undefined ) {
				config = false;
			}
				
			if ( config ) {
			
				//The currently URL of link
				if ( typeof curURL === typeof undefined ) {
					curURL = $this.closest( 'a' ).attr( 'href' );
				}


				//Prevent multiple request on click
				if ( $( AJAXPageLinks ).data( 'request-running' ) ) {
					return;
				}
				$( AJAXPageLinks ).data( 'request-running', true );

			
				if ( historyEnable ) {
					//Click on this link element using an AJAX request
					// When we do this, History.Adapter will also execute its contents. 	
					History.pushState({path: curURL}, document.title, curURL ); 	
				} else {
					
					//Click on this link element using an AJAX request
					pushAction( $( config.container ), config.target, config.loading, curURL, config.method, event );
	
				}

				
			}
			

			return false;
			
			
			
		});
		
		
		
		

		/*
		 * Move Animation
		 *
		 * @param  {object} container    - The target container to which the content will be added.
		 * @param  {string} target       - The instance ID or class name returned from the callback data
		 * @param  {string} loading      - Content of loading area.
		 * @param  {string} url          - The target URL via AJAX.
		 * @param  {string} method       - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
		 * @param  {object} event        - An object containing data that will be passed to the event handler.
		 * @return {void}                - The constructor.
		 */
		function pushAction( container, target, loading, url, method, event ) {
		

			if ( typeof method === typeof undefined || method == '' ) {
			    method = 'POST';
			}
			
			//Click on this link element using an PJAX request
			//This is a lower level function used by $.fn.pjax itself. 
			//It allows you to get a little more control over the pjax event handling.
			if ( event ) {
				
				
//				$.pjax.click( event, container,  {
//					showHTMLdelay : 0, 
//					startEvent    : function() {
//
//
//
//					}, 
//					endEvent      : function() {
//
//
//					}
//				} );

			}

		
			$.ajax({
				timeout  : 15000,
				url      : url,
				method   : method,
				dataType : 'html',
				data     : {
					action  : 'load_singlepages_ajax_content'
				},	
				success  : function( response ) {
					

					//A function to be called if the request succeeds
					ajaxSucceeds( container, url, $( response ).find( target ).html() );

				},
				error: function(){
					window.location.href = url;
				},
				beforeSend: function() {

					TweenMax.to( container.find( '.ajax-content-loader' ), 0.3, {
						css: {
							opacity    : 1
						},
						ease   : Power2.easeOut
					});		


					container.html( '<div class="ajax-content-loader">'+loading+'</div>' ).promise().done( function(){

						
						
						TweenMax.set( container.find( '.ajax-content-loader' ), {
							css         : {
								'display' : 'block'
							},
							onComplete  : function() {
								TweenMax.to( this.target, 0.5, {
									alpha : 1
								});
							}
						});	
					});

					


				}
			}).fail( function( jqXHR, textStatus ) {
				if( textStatus === 'timeout' ) {
					window.location.href = url;
				}
			});		

	
			
		}
		
		
		
		/*
		 * A function to be called if the request succeeds
		 *
		 * @param  {string} container    - The target container to which the content will be added.
		 * @param  {string} url          - Current URL after click
		 * @param  {string} content      - The data returned from the server
		 * @return {void}                - The constructor.
		 */
		function ajaxSucceeds( container, url, content ) {
			
		
			//Remove loader
			TweenMax.to( container.find( '.ajax-content-loader' ), 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( this.target, {
						css         : {
							'display' : 'none'
						}
					});
					

					//The data returned from the server
					container.html( content ).promise().done( function(){
						
						
						// Apply the original scripts
						$( document ).applyOriginalSomeScripts();
	
						
						if ( ! historyEnable ) {
							
							// Modify the URL without reloading the page
							if( history.pushState ) {
								history.pushState( null, null, url );
							}
							else {
								location.hash = url;
							}
	
						}

					

						//Prevent multiple request on click
						$( AJAXPageLinks ).data( 'request-running', false );	
						
						
						
					});
					

	
					
				},
				delay       : loaderRemoveDelay/1000
			});
			
			
		}
		
		
		
    };

    APP.components.documentReady.push( APP.AJAX_PUSH_CONTENT.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



/*!
 * VERSION: 0.6.6
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin","TweenLite","plugins.CSSPlugin"], function(TweenPlugin, TweenLite, CSSPlugin) {

		/** @constructor **/
		var CSSRulePlugin = function() {
				TweenPlugin.call(this, "cssRule");
				this._overwriteProps.length = 0;
			},
			_doc = _gsScope.document,
			_superSetRatio = CSSPlugin.prototype.setRatio,
			p = CSSRulePlugin.prototype = new CSSPlugin();

		p._propName = "cssRule";
		p.constructor = CSSRulePlugin;
		CSSRulePlugin.version = "0.6.6";
		CSSRulePlugin.API = 2;

		/**
		 * Searches the style sheets in the document for a particular selector like ".myClass" or "a" or "a:hover" or ":after" and
		 * returns a reference to that style sheet (or an array of them in the case of a pseudo selector like ":after"). Then you
		 * can animate the individual properties of the style sheet.
		 *
		 * @param {!string} selector a string describing the selector, like ".myClass" or "a" or "a:hover" or ":after"
		 * @return a reference to the style sheet (or an array of them in the case of a pseudo selector). If none was found, null is returned (or an empty array for a pseudo selector)
		 */
		CSSRulePlugin.getRule = function(selector) {
			var ruleProp = _doc.all ? "rules" : "cssRules",
				ss = _doc.styleSheets,
				i = ss.length,
				pseudo = (selector.charAt(0) === ":"),
				j, curSS, cs, a;
			selector = (pseudo ? "" : ",") + selector.split("::").join(":").toLowerCase() + ","; //note: old versions of IE report tag name selectors as upper case, so we just change everything to lowercase.
			if (pseudo) {
				a = [];
			}
			while (--i > -1) {
				//Firefox may throw insecure operation errors when css is loaded from other domains, so try/catch.
				try {
					curSS = ss[i][ruleProp];
					if (!curSS) {
						continue;
					}
					j = curSS.length;
				} catch (e) {
					console.log(e);
					continue;
				}
				while (--j > -1) {
					cs = curSS[j];
					if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) { //note: IE adds an extra ":" to pseudo selectors, so .myClass:after becomes .myClass::after, so we need to strip the extra one out.
						if (pseudo) {
							a.push(cs.style);
						} else {
							return cs.style;
						}
					}
				}
			}
			return a;
		};
							
		
		// @private gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, value, tween) {
			if (target.cssText === undefined) {
				return false;
			}
			var div = target._gsProxy = target._gsProxy || _doc.createElement("div");
			this._ss = target;
			this._proxy = div.style;
			div.style.cssText = target.cssText;
			CSSPlugin.prototype._onInitTween.call(this, div, value, tween); //we just offload all the work to the regular CSSPlugin and then copy the cssText back over to the rule in the setRatio() method. This allows us to have all of the updates to CSSPlugin automatically flow through to CSSRulePlugin instead of having to maintain both
			return true;
		};

		
		
		// @private gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			_superSetRatio.call(this, v);
			this._ss.cssText = this._proxy.cssText;
		};
		
		
		TweenPlugin.activate([CSSRulePlugin]);
		return CSSRulePlugin;
		
	}, true);
	
}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("CSSRulePlugin"));
/*!
 * VERSION: 1.5.3
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	var _numExp = /(\d|\.)+/g,
		_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_hue = function(h, m1, m2) {
			h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
			return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
		},
		/**
		 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
		 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
		 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
		 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
		 */
		_parseColor = function(v, toHSL) {
			var a, r, g, b, h, s, l, max, min, d, wasHSL;
			if (!v) {
				a = _colorLookup.black;
			} else if (typeof(v) === "number") {
				a = [v >> 16, (v >> 8) & 255, v & 255];
			} else {
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					a = _colorLookup[v];
				} else if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						r = v.charAt(1);
						g = v.charAt(2);
						b = v.charAt(3);
						v = "#" + r + r + g + g + b + b;
					}
					v = parseInt(v.substr(1), 16);
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else if (v.substr(0, 3) === "hsl") {
					a = wasHSL = v.match(_numExp);
					if (!toHSL) {
						h = (Number(a[0]) % 360) / 360;
						s = Number(a[1]) / 100;
						l = Number(a[2]) / 100;
						g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
						r = l * 2 - g;
						if (a.length > 3) {
							a[3] = Number(a[3]);
						}
						a[0] = _hue(h + 1 / 3, r, g);
						a[1] = _hue(h, r, g);
						a[2] = _hue(h - 1 / 3, r, g);
					} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
						return v.match(_relNumExp);
					}
				} else {
					a = v.match(_numExp) || _colorLookup.transparent;
				}
				a[0] = Number(a[0]);
				a[1] = Number(a[1]);
				a[2] = Number(a[2]);
				if (a.length > 3) {
					a[3] = Number(a[3]);
				}
			}
			if (toHSL && !wasHSL) {
				r = a[0] / 255;
				g = a[1] / 255;
				b = a[2] / 255;
				max = Math.max(r, g, b);
				min = Math.min(r, g, b);
				l = (max + min) / 2;
				if (max === min) {
					h = s = 0;
				} else {
					d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
					h *= 60;
				}
				a[0] = (h + 0.5) | 0;
				a[1] = (s * 100 + 0.5) | 0;
				a[2] = (l * 100 + 0.5) | 0;
			}
			return a;
		},
		_formatColors = function(s, toHSL) {
			var colors = (s + "").match(_colorExp) || [],
				charIndex = 0,
				parsed = "",
				i, color, temp;
			if (!colors.length) {
				return s;
			}
			for (i = 0; i < colors.length; i++) {
				color = colors[i];
				temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
				charIndex += temp.length + color.length;
				color = _parseColor(color, toHSL);
				if (color.length === 3) {
					color.push(1);
				}
				parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
			}
			return parsed + s.substr(charIndex);
		}, p, _colorStringFilter,
		TweenLite = (_gsScope.GreenSockGlobals || _gsScope).TweenLite,
		_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		ColorPropsPlugin = _gsScope._gsDefine.plugin({
			propName: "colorProps",
			version: "1.5.3",
			priority: -1,
			API: 2,
			global: true,

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, proxy, pt, val;
				this._target = target;
				this._proxy = proxy = ((value.format + "").toUpperCase() === "NUMBER") ? {} : 0;
				for (p in value) {
					if (p !== "format") {
						if (proxy) {
							this._firstNumPT = pt = {_next:this._firstNumPT, t:target, p:p, f:(typeof(target[p]) === "function")};
							proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]()).join(",") + ")";
							val = value[p];
							if (typeof(val) === "function") {
								val = val(index, target);
							}
							this._addTween(proxy, p, "get", ((typeof(val) === "number") ? "rgb(" + _parseColor(val, false).join(",") + ")" : val), p, null, null, _colorStringFilter);
						} else {
							this._addTween(target, p, "get", value[p], p, null, null, _colorStringFilter, index);
						}

					}
				}
				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				var pt = this._firstNumPT,
					val;
				this._super.setRatio.call(this, v);
				while (pt) {
					val = _parseColor(this._proxy[pt.p], false);
					val = val[0] << 16 | val[1] << 8 | val[2];
					if (pt.f) {
						this._target[pt.p](val);
					} else {
						this._target[pt.p] = val;
					}
					pt = pt._next;
				}
			}
		});

	for (p in _colorLookup) {
		_colorExp += "|" + p + "\\b";
	}
	_colorExp = new RegExp(_colorExp+")", "gi");
	ColorPropsPlugin.colorStringFilter = _colorStringFilter = function(a) {
		var combined = a[0] + " " + a[1],
			toHSL;
		_colorExp.lastIndex = 0;
		if (_colorExp.test(combined)) {
			toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
			a[0] = _formatColors(a[0], toHSL);
			a[1] = _formatColors(a[1], toHSL);
		}
	};

	if (!TweenLite.defaultStringFilter) {
		TweenLite.defaultStringFilter = ColorPropsPlugin.colorStringFilter;
	}

	ColorPropsPlugin.parseColor = _parseColor;
	p = ColorPropsPlugin.prototype;
	p._firstNumPT = null;
	p._kill = function(lookup) {
		var pt = this._firstNumPT,
			prev;
		while (pt) {
			if (pt.p in lookup) {
				if (pt === p._firstNumPT) {
					this._firstNumPT = pt._next;
				}
				if (prev) {
					prev._next = pt._next;
				}
			} else {
				prev = pt;
			}
			pt = pt._next;
		}
		return this._super._kill(lookup);
	};

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("ColorPropsPlugin"));
/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	var _numExp = /(\d|\.)+/g,
		_ColorFilter, _ColorMatrixFilter,
		_colorProps = ["redMultiplier","greenMultiplier","blueMultiplier","alphaMultiplier","redOffset","greenOffset","blueOffset","alphaOffset"],
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_parseColor = function(color) {
			if (color === "" || color == null || color === "none") {
				return _colorLookup.transparent;
			} else if (_colorLookup[color]) {
				return _colorLookup[color];
			} else if (typeof(color) === "number") {
				return [color >> 16, (color >> 8) & 255, color & 255];
			} else if (color.charAt(0) === "#") {
				if (color.length === 4) { //for shorthand like #9F0
					color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
				}
				color = parseInt(color.substr(1), 16);
				return [color >> 16, (color >> 8) & 255, color & 255];
			}
			return color.match(_numExp) || _colorLookup.transparent;
		},
		_parseColorFilter = function(t, v, pg) {
			if (!_ColorFilter) {
				_ColorFilter = (_gsScope.ColorFilter || _gsScope.createjs.ColorFilter);
				if (!_ColorFilter) {
					throw("EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.");
				}
			}
			var filters = t.filters || [],
				i = filters.length,
				c, s, e, a, p;
			while (--i > -1) {
				if (filters[i] instanceof _ColorFilter) {
					s = filters[i];
					break;
				}
			}
			if (!s) {
				s = new _ColorFilter();
				filters.push(s);
				t.filters = filters;
			}
			e = s.clone();
			if (v.tint != null) {
				c = _parseColor(v.tint);
				a = (v.tintAmount != null) ? Number(v.tintAmount) : 1;
				e.redOffset = Number(c[0]) * a;
				e.greenOffset = Number(c[1]) * a;
				e.blueOffset = Number(c[2]) * a;
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
			} else {
				for (p in v) {
					if (p !== "exposure") if (p !== "brightness") {
						e[p] = Number(v[p]);
					}
				}
			}
			if (v.exposure != null) {
				e.redOffset = e.greenOffset = e.blueOffset = 255 * (Number(v.exposure) - 1);
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
			} else if (v.brightness != null) {
				a = Number(v.brightness) - 1;
				e.redOffset = e.greenOffset = e.blueOffset = (a > 0) ? a * 255 : 0;
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
			}
			i = 8;
			while (--i > -1) {
				p = _colorProps[i];
				if (s[p] !== e[p]) {
					pg._addTween(s, p, s[p], e[p], "easel_colorFilter");
				}
			}
			pg._overwriteProps.push("easel_colorFilter");
			if (!t.cacheID) {
				throw("EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t);
			}
		},

		_idMatrix = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
		_lumR = 0.212671,
		_lumG = 0.715160,
		_lumB = 0.072169,

		_applyMatrix = function(m, m2) {
			if (!(m instanceof Array) || !(m2 instanceof Array)) {
				return m2;
			}
			var temp = [],
				i = 0,
				z = 0,
				y, x;
			for (y = 0; y < 4; y++) {
				for (x = 0; x < 5; x++) {
					z = (x === 4) ? m[i + 4] : 0;
					temp[i + x] = m[i]   * m2[x] + m[i+1] * m2[x + 5] +	m[i+2] * m2[x + 10] + m[i+3] * m2[x + 15] +	z;
				}
				i += 5;
			}
			return temp;
		},

		_setSaturation = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			var inv = 1 - n,
				r = inv * _lumR,
				g = inv * _lumG,
				b = inv * _lumB;
			return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_colorize = function(m, color, amount) {
			if (isNaN(amount)) {
				amount = 1;
			}
			var c = _parseColor(color),
				r = c[0] / 255,
				g = c[1] / 255,
				b = c[2] / 255,
				inv = 1 - amount;
			return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_setHue = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			n *= Math.PI / 180;
			var c = Math.cos(n),
				s = Math.sin(n);
			return _applyMatrix([(_lumR + (c * (1 - _lumR))) + (s * (-_lumR)), (_lumG + (c * (-_lumG))) + (s * (-_lumG)), (_lumB + (c * (-_lumB))) + (s * (1 - _lumB)), 0, 0, (_lumR + (c * (-_lumR))) + (s * 0.143), (_lumG + (c * (1 - _lumG))) + (s * 0.14), (_lumB + (c * (-_lumB))) + (s * -0.283), 0, 0, (_lumR + (c * (-_lumR))) + (s * (-(1 - _lumR))), (_lumG + (c * (-_lumG))) + (s * _lumG), (_lumB + (c * (1 - _lumB))) + (s * _lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
		},

		_setContrast = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			n += 0.01;
			return _applyMatrix([n,0,0,0,128 * (1 - n), 0,n,0,0,128 * (1 - n), 0,0,n,0,128 * (1 - n), 0,0,0,1,0], m);
		},

		_parseColorMatrixFilter = function(t, v, pg) {
			if (!_ColorMatrixFilter) {
				_ColorMatrixFilter = (_gsScope.ColorMatrixFilter || _gsScope.createjs.ColorMatrixFilter);
				if (!_ColorMatrixFilter) {
					throw("EaselPlugin error: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.");
				}
			}
			var filters = t.filters || [],
				i = filters.length,
				matrix, startMatrix, s;
			while (--i > -1) {
				if (filters[i] instanceof _ColorMatrixFilter) {
					s = filters[i];
					break;
				}
			}
			if (!s) {
				s = new _ColorMatrixFilter(_idMatrix.slice());
				filters.push(s);
				t.filters = filters;
			}
			startMatrix = s.matrix;
			matrix = _idMatrix.slice();
			if (v.colorize != null) {
				matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
			}
			if (v.contrast != null) {
				matrix = _setContrast(matrix, Number(v.contrast));
			}
			if (v.hue != null) {
				matrix = _setHue(matrix, Number(v.hue));
			}
			if (v.saturation != null) {
				matrix = _setSaturation(matrix, Number(v.saturation));
			}

			i = matrix.length;
			while (--i > -1) {
				if (matrix[i] !== startMatrix[i]) {
					pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "easel_colorMatrixFilter");
				}
			}

			pg._overwriteProps.push("easel_colorMatrixFilter");
			if (!t.cacheID) {
				throw("EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t);
			}

			pg._matrix = startMatrix;
		};


	_gsScope._gsDefine.plugin({
		propName: "easel",
		priority: -1,
		version: "0.2.2",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			this._target = target;
			var p, pt, tint, colorMatrix, end, labels, i;
			for (p in value) {

				end = value[p];
				if (typeof(end) === "function") {
					end = end(index, target);
				}
				if (p === "colorFilter" || p === "tint" || p === "tintAmount" || p === "exposure" || p === "brightness") {
					if (!tint) {
						_parseColorFilter(target, value.colorFilter || value, this);
						tint = true;
					}

				} else if (p === "saturation" || p === "contrast" || p === "hue" || p === "colorize" || p === "colorizeAmount") {
					if (!colorMatrix) {
						_parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);
						colorMatrix = true;
					}

				} else if (p === "frame") {
					this._firstPT = pt = {_next:this._firstPT, t:target, p:"gotoAndStop", s:target.currentFrame, f:true, n:"frame", pr:0, type:0, m:Math.round};
					if (typeof(end) === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
						for (i = 0; i < labels.length; i++) {
							if (labels[i].label === end) {
								end = labels[i].position;
							}
						}
					}
					pt.c = (typeof(end) === "number") ? end - pt.s : parseFloat((end+"").split("=").join(""));
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else if (target[p] != null) {
					this._firstPT = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pr:0, type:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					pt.c = (typeof(end) === "number") ? end - pt.s : (typeof(end) === "string") ? parseFloat(end.split("=").join("")) : 0;

					if (pt._next) {
						pt._next._prev = pt;
					}
				}

			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.m) {
					val = pt.m(val, pt.t);
				} else if (val < min && val > -min) {
					val = 0;
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
			if (this._target.cacheID) {
				this._target.updateCache();
			}
		}

	});

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("EaselPlugin"));
/*!
 * VERSION: 0.1.3
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
	
	"use strict";

	_gsScope._gsDefine.plugin({
		propName: "endArray",
		API: 2,
		version: "0.1.3",

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			var i = value.length,
				a = this.a = [],
				start, end;
			this.target = target;
			this._mod = 0;
			if (!i) {
				return false;
			}
			while (--i > -1) {
				start = target[i];
				end = value[i];
				if (start !== end) {
					a.push({i:i, s:start, c:end - start});
				}
			}
			return true;
		},

		mod: function(lookup) {
			if (typeof(lookup.endArray) === "function") {
				this._mod = lookup.endArray;
			}
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var target = this.target,
				a = this.a,
				i = a.length,
				mod = this._mod,
				e, val;
			if (mod) {
				while (--i > -1) {
					e = a[i];
					target[e.i] = mod(e.s + e.c * ratio, target);
				}
			} else {
				while (--i > -1) {
					e = a[i];
					val = e.s + e.c * ratio;
					target[e.i] = (val < 0.000001 && val > -0.000001) ? 0 : val;
				}
			}
		}

	});

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
/*!
 * VERSION: 0.0.3
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
	
	"use strict";

		var _cssRatioSetter = function(pt, cssp, mod) { //Takes an individual CSSPropTween and converts it into a type:2 that has a setRatio that does everything the regular CSSPlugin.setRatio() method does but applying the mod() too. We do this to keep the main CSSPlugin.setRatio() as fast as possible (the vast majority of times, no mod() will be necessary)
				var type = pt.type,
					oldSetRatio = pt.setRatio,
					tween = cssp._tween,
					target = cssp._target;
				pt.type = 2;
				pt.m = mod;
				pt.setRatio = function(v) {
					var min = 0.000001,
						val, str, i;
					if (v === 1 && (tween._time === tween._duration || tween._time === 0)) {

						if (type !== 2) {
							if (pt.r && type !== -1) {
								val = Math.round(pt.s + pt.c);
								if (!type) {
									pt.t[pt.p] = mod(val + pt.xs0, target);
								} else if (type === 1) {
									str = pt.xs0 + val + pt.xs1;
									for (i = 1; i < pt.l; i++) {
										str += pt["xn"+i] + pt["xs"+(i+1)];
									}
									pt.t[pt.p] = mod(str, target);
								}
							} else {
								pt.t[pt.p] = mod(pt.e, target);
							}
						} else {
							oldSetRatio.call(pt, v);
						}

					} else if (v || !(tween._time === tween._duration || tween._time === 0) || tween._rawPrevTime === -0.000001) {
						val = pt.c * v + pt.s;
						if (pt.r) {
							val = Math.round(val);
						} else if (val < min) if (val > -min) {
							val = 0;
						}
						if (!type) {
							pt.t[pt.p] = mod(val + pt.xs0, target);
						} else if (type === 1) {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = mod(str, target);

						} else if (type === -1) { //non-tweening value
							pt.t[pt.p] = mod(pt.xs0, target);

						} else if (oldSetRatio) {
							oldSetRatio.call(pt, v);
						}

					} else {
						if (type !== 2) {
							pt.t[pt.p] = mod(pt.b, target);
						} else {
							oldSetRatio.call(pt, v);
						}
					}
				};
			},
			_modCSS = function(lookup, cssp) {
				var pt = cssp._firstPT,
					hasBezier = (lookup.rotation && cssp._overwriteProps.join("").indexOf("bezier") !== -1); //when a Bezier tween is applying autoRotation, it's a very special case we need to handle differently.
				while (pt) {
					if (typeof(lookup[pt.p]) === "function") {
						_cssRatioSetter(pt, cssp, lookup[pt.p]);
					} else if (hasBezier && pt.n === "bezier" && pt.plugin._overwriteProps.join("").indexOf("rotation") !== -1) {
						pt.data.mod = lookup.rotation;
					}
					pt = pt._next;
				}
			},

			ModifiersPlugin = _gsScope._gsDefine.plugin({
				propName: "modifiers",
				version: "0.0.3",
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					this._vars = value;
					return true;
				},

				initAll: function() {
					var tween = this._tween,
						lookup = this._vars,
						mpt = this,
						pt = tween._firstPT,
						val, next;
					while (pt) {
						next = pt._next; //record here, because it may get removed
						val = lookup[pt.n];
						if (pt.pg) {
							if (pt.t._propName === "css") { //handle CSSPlugin uniquely (for performance, due to the fact that the values almost always are a concatenation of numbers and strings, like suffixes, and we don't want to slow down the regular CSSPlugin setRatio() performance with conditional checks for if the value needs to be modded, so we pull any modding prop out and change it to a type:2 one that simply calls a setRatio() method where we encapsulate the modding and update all together. That way, it says in the main CSSProp linked list and just has some custom logic applied to it inside its setRatio())
								_modCSS(lookup, pt.t);
							} else if (pt.t !== mpt) { //don't run modProps on modProps :)
								val = lookup[pt.t._propName];
								pt.t._mod((typeof(val) === "object") ? val : lookup);
							}
						} else if (typeof(val) === "function") {
							if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
								pt.t._applyPT.m = val;
							} else {
								this._add(pt.t, pt.p, pt.s, pt.c, val);
								//remove from linked list
								if (next) {
									next._prev = pt._prev;
								}
								if (pt._prev) {
									pt._prev._next = next;
								} else if (tween._firstPT === pt) {
									tween._firstPT = next;
								}
								pt._next = pt._prev = null;
								tween._propLookup[pt.n] = mpt;
							}
						}
						pt = next;
					}
					return false;
				}

			}),
			p = ModifiersPlugin.prototype;

		p._add = function(target, p, s, c, mod) {
			this._addTween(target, p, s, s + c, p, mod);
			this._overwriteProps.push(p);
		};

	p = _gsScope._gsDefine.globals.TweenLite.version.split(".");
	if (Number(p[0]) <= 1 && Number(p[1]) < 19 && _gsScope.console) {
		console.log("ModifiersPlugin requires GSAP 1.19.0 or later.");
	}


}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("ModifiersPlugin"));
/*!
 * VERSION: 0.2.1
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * PixiPlugin is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof module !== "undefined" && module.exports && typeof global !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";

    var _numExp = /(\d|\.)+/g,
		_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_hue = function(h, m1, m2) {
			h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
			return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
		},
		/**
		 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if "format" parameter is "hsl", it will populate the array with hue, saturation, and lightness values. Or if "format" is "number", it'll return a number like 0xFF0000 instead of an array. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
		 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
		 * @param {(string)} format If "hsl", an hsl() or hsla() value will be returned instead of rgb() or rgba(). Or if "number", then a numeric value will be returned, like 0xFF0000. Default is rgb.
		 * @return {(array|number)} An array containing red, green, and blue (and optionally alpha) in that order, or if the format parameter was "hsl", the array will contain hue, saturation and lightness (and optionally alpha) in that order. Or if "format" is defined as "number", it'll return a number like 0xFF0000. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and "format" is "hsl".
		 */
		_parseColor = function(v, format) {
			var toHSL = (format === "hsl"),
				a, r, g, b, h, s, l, max, min, d, wasHSL;
			if (!v) {
				a = _colorLookup.black;
			} else if (typeof(v) === "number") {
				a = [v >> 16, (v >> 8) & 255, v & 255];
			} else {
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					a = _colorLookup[v];
				} else if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						r = v.charAt(1);
						g = v.charAt(2);
						b = v.charAt(3);
						v = "#" + r + r + g + g + b + b;
					}
					v = parseInt(v.substr(1), 16);
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else if (v.substr(0, 3) === "hsl") {
					a = wasHSL = v.match(_numExp);
					if (!toHSL) {
						h = (Number(a[0]) % 360) / 360;
						s = Number(a[1]) / 100;
						l = Number(a[2]) / 100;
						g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
						r = l * 2 - g;
						if (a.length > 3) {
							a[3] = Number(v[3]);
						}
						a[0] = _hue(h + 1 / 3, r, g);
						a[1] = _hue(h, r, g);
						a[2] = _hue(h - 1 / 3, r, g);
					} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
						return v.match(_relNumExp);
					}
				} else {
					a = v.match(_numExp) || _colorLookup.transparent;
				}
				a[0] = Number(a[0]);
				a[1] = Number(a[1]);
				a[2] = Number(a[2]);
				if (a.length > 3) {
					a[3] = Number(a[3]);
				}
			}
			if (toHSL && !wasHSL) {
				r = a[0] / 255;
				g = a[1] / 255;
				b = a[2] / 255;
				max = Math.max(r, g, b);
				min = Math.min(r, g, b);
				l = (max + min) / 2;
				if (max === min) {
					h = s = 0;
				} else {
					d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
					h *= 60;
				}
				a[0] = (h + 0.5) | 0;
				a[1] = (s * 100 + 0.5) | 0;
				a[2] = (l * 100 + 0.5) | 0;
			}
			return (format === "number") ? (a[0] << 16 | a[1] << 8 | a[2]) : a;
		},
		_formatColors = function(s, toHSL) {
			var colors = (s + "").match(_colorExp) || [],
				charIndex = 0,
				parsed = "",
				i, color, temp;
			if (!colors.length) {
				return s;
			}
			for (i = 0; i < colors.length; i++) {
				color = colors[i];
				temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
				charIndex += temp.length + color.length;
				color = _parseColor(color, (toHSL ? "hsl" : "rgb"));
				if (color.length === 3) {
					color.push(1);
				}
				parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
			}
			return parsed + s.substr(charIndex);
		}, _colorStringFilter,
		TweenLite = (_gsScope.GreenSockGlobals || _gsScope).TweenLite,
		_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		_idMatrix = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
		_lumR = 0.212671,
		_lumG = 0.715160,
		_lumB = 0.072169,

		_applyMatrix = function(m, m2) {
			var temp = [],
				i = 0,
				z = 0,
				y, x;
			for (y = 0; y < 4; y++) {
				for (x = 0; x < 5; x++) {
					z = (x === 4) ? m[i + 4] : 0;
					temp[i + x] = m[i]   * m2[x] + m[i+1] * m2[x + 5] +	m[i+2] * m2[x + 10] + m[i+3] * m2[x + 15] +	z;
				}
				i += 5;
			}
			return temp;
		},

		_setSaturation = function(m, n) {
			var inv = 1 - n,
				r = inv * _lumR,
				g = inv * _lumG,
				b = inv * _lumB;
			return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_colorize = function(m, color, amount) {
			var c = _parseColor(color),
				r = c[0] / 255,
				g = c[1] / 255,
				b = c[2] / 255,
				inv = 1 - amount;
			return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_setHue = function(m, n) {
			n *= Math.PI / 180;
			var c = Math.cos(n),
				s = Math.sin(n);
			return _applyMatrix([(_lumR + (c * (1 - _lumR))) + (s * (-_lumR)), (_lumG + (c * (-_lumG))) + (s * (-_lumG)), (_lumB + (c * (-_lumB))) + (s * (1 - _lumB)), 0, 0, (_lumR + (c * (-_lumR))) + (s * 0.143), (_lumG + (c * (1 - _lumG))) + (s * 0.14), (_lumB + (c * (-_lumB))) + (s * -0.283), 0, 0, (_lumR + (c * (-_lumR))) + (s * (-(1 - _lumR))), (_lumG + (c * (-_lumG))) + (s * _lumG), (_lumB + (c * (1 - _lumB))) + (s * _lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
		},

		_setContrast = function(m, n) {
			return _applyMatrix([n,0,0,0,0.5 * (1 - n), 0,n,0,0,0.5 * (1 - n), 0,0,n,0,0.5 * (1 - n), 0,0,0,1,0], m);
		},

		_getFilter = function(t, type) {
			var filterClass = _gsScope.PIXI.filters[type],
				filters = t.filters || [],
				i = filters.length,
				filter;
			if (!filterClass) {
				throw("PixiPlugin error: " + type + " isn't present.");
			}
			while (--i > -1) {
				if (filters[i] instanceof filterClass) {
					return filters[i];
				}
			}
			filter = new filterClass();
			if (type === "BlurFilter") {
				filter.blur = 0;
			}
			filters.push(filter);
			t.filters = filters;
			return filter;
		},

		_addColorMatrixFilterCacheTween = function(p, pg, cache, vars) { //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
			pg._addTween(cache, p, cache[p], vars[p], p);
			pg._overwriteProps.push(p);
		},

		_applyBrightnessToMatrix = function(brightness, matrix) {
			var temp = new _gsScope.PIXI.filters.ColorMatrixFilter();
			temp.matrix = matrix;
			temp.brightness(brightness, true);
			return temp.matrix;
		},

		_CMFdefaults = {contrast:1, saturation:1, colorizeAmount:0, colorize:"rgb(255,255,255)", hue:0, brightness:1},

		_parseColorMatrixFilter = function(t, v, pg) {
			var filter = _getFilter(t, "ColorMatrixFilter"),
				cache = t._gsColorMatrixFilter = t._gsColorMatrixFilter || {contrast:1, saturation:1, colorizeAmount:0, colorize:"rgb(255,255,255)", hue:0, brightness:1},
				combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
				i, matrix, startMatrix;
			startMatrix = filter.matrix;
			if (v.resolution) {
				filter.resolution = v.resolution;
			}
			if (v.matrix && v.matrix.length === startMatrix.length) {
				matrix = v.matrix;
				if (cache.contrast !== 1) {
					_addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
				}
				if (cache.hue) {
					_addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
				}
				if (cache.brightness !== 1) {
					_addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
				}
				if (cache.colorizeAmount) {
					_addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
					_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
				}
				if (cache.saturation !== 1) {
					_addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
				}

			} else {
				matrix = _idMatrix.slice();
				if (v.contrast != null) {
					matrix = _setContrast(matrix, Number(v.contrast));
					_addColorMatrixFilterCacheTween("contrast", pg, cache, v);
				} else if (cache.contrast !== 1) {
					if (combine) {
						matrix = _setContrast(matrix, cache.contrast);
					} else {
						_addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
					}
				}
				if (v.hue != null) {
					matrix = _setHue(matrix, Number(v.hue));
					_addColorMatrixFilterCacheTween("hue", pg, cache, v);
				} else if (cache.hue) {
					if (combine) {
						matrix = _setHue(matrix, cache.hue);
					} else {
						_addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
					}
				}
				if (v.brightness != null) {
					matrix = _applyBrightnessToMatrix(Number(v.brightness), matrix);
					_addColorMatrixFilterCacheTween("brightness", pg, cache, v);
				} else if (cache.brightness !== 1) {
					if (combine) {
						matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
					} else {
						_addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
					}
				}
				if (v.colorize != null) {
					v.colorizeAmount = ("colorizeAmount" in v) ? Number(v.colorizeAmount) : 1;
					matrix = _colorize(matrix, v.colorize, v.colorizeAmount);
					_addColorMatrixFilterCacheTween("colorize", pg, cache, v);
					_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
				} else if (cache.colorizeAmount) {
					if (combine) {
						matrix = _colorize(matrix, cache.colorize, cache.colorizeAmount);
					} else {
						_addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
						_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
					}
				}
				if (v.saturation != null) {
					matrix = _setSaturation(matrix, Number(v.saturation));
					_addColorMatrixFilterCacheTween("saturation", pg, cache, v);
				} else if (cache.saturation !== 1) {
					if (combine) {
						matrix = _setSaturation(matrix, cache.saturation);
					} else {
						_addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
					}
				}
			}
			i = matrix.length;
			while (--i > -1) {
				if (matrix[i] !== startMatrix[i]) {
					pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
				}
			}
			pg._overwriteProps.push("colorMatrixFilter");
		},

		_addColorTween = function(target, p, value, colorSetter, plugin) {
			var pt = colorSetter._firstPT = {_next:colorSetter._firstPT, t:target, p:p, proxy:{}, f:(typeof(target[p]) === "function")};
			pt.proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]()).join(",") + ")";
			plugin._addTween(pt.proxy, p, "get", ((typeof(value) === "number") ? "rgb(" + _parseColor(value, false).join(",") + ")" : value), p, null, null, _colorStringFilter);
		},

		//to improve performance, when a color is sensed, we hijack the setRatio() method of the plugin instance with a new function that this method spits back. This is a special method that handles parsing color values on-the-fly and turns them into numeric values which PixiJS requires. In other words, instead of "rgb(255, 0, 0)", PixiJS wants 0xFF0000. This also works with hsl() values.
		_buildColorSetter = function(tween, plugin) {
			var setRatio = plugin.setRatio, //save the original (super) setRatio() function
				func = function(v) {
					var pt = func._firstPT,
						val;
					setRatio.call(plugin, v);
					while (pt) {
						val = _parseColor(pt.proxy[pt.p], "number");
						if (pt.f) {
							pt.t[pt.p](val);
						} else {
							pt.t[pt.p] = val;
						}
						pt = pt._next;
					}
					if (func.graphics) { //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
						func.graphics.dirty++;
						func.graphics.clearDirty++;
					}
				};
			plugin.setRatio = func;
			return func;
		},


		_colorProps = {tint:1, lineColor:1, fillColor:1},
		_xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
		_contexts = {x:"position", y:"position", tileX:"tilePosition", tileY:"tilePosition"},
		_colorMatrixFilterProps = {colorMatrixFilter:1, saturation:1, contrast:1, hue:1, colorize:1, colorizeAmount:1, brightness:1, combineCMF:1},
		_DEG2RAD = Math.PI / 180,
        _degreesToRadians = function(value) {
			return (typeof(value) === "string" && value.charAt(1) === "=") ? value.substr(0, 2) + (parseFloat(value.substr(2)) * _DEG2RAD) : value * _DEG2RAD;
        }, i, p;

	//context setup...
	for (i = 0; i < _xyContexts.length; i++) {
		p = _xyContexts[i];
		_contexts[p + "X"] = p;
		_contexts[p + "Y"] = p;
    }

    //color parsing setup...
	for (p in _colorLookup) {
		_colorExp += "|" + p + "\\b";
	}
	_colorExp = new RegExp(_colorExp+")", "gi");
	_colorStringFilter = function(a) {
		var combined = a[0] + " " + a[1],
			toHSL;
		_colorExp.lastIndex = 0;
		if (_colorExp.test(combined)) {
			toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
			a[0] = _formatColors(a[0], toHSL);
			a[1] = _formatColors(a[1], toHSL);
		}
	};

	if (!TweenLite.defaultStringFilter) {
		TweenLite.defaultStringFilter = _colorStringFilter;
	}

    var PixiPlugin = _gsScope._gsDefine.plugin({
        propName: "pixi",
        priority: 0,
        API: 2,
		global: true,
        version: "0.2.1",

        init: function (target, values, tween, index) {
            if (!target instanceof _gsScope.PIXI.DisplayObject) {
                return false;
            }
            var context, axis, value, colorMatrix, filter, p, padding, colorSetter, i, data, pt;
            for (p in values) {
                context = _contexts[p];
                value = values[p];
                if (typeof(value) === "function") {
                    value = value(index || 0, target);
                }
                if (context) {
                    axis = (p.charAt(p.length-1).toLowerCase().indexOf("x") !== -1) ? "x" : "y";
					this._addTween(target[context], axis, target[context][axis], (context === "skew") ? _degreesToRadians(value) : value, p);
                } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
					this._addTween(target[p], "x", target[p].x, value, p + "X");
					this._addTween(target[p], "y", target[p].y, value, p + "Y");
                } else if (p === "rotation") { //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
					this._addTween(target, p, target.rotation, _degreesToRadians(value), p);

                } else if (_colorMatrixFilterProps[p]) {
					if (!colorMatrix) {
						_parseColorMatrixFilter(target, values.colorMatrixFilter || values, this);
						colorMatrix = true;
					}
                } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
					filter = _getFilter(target, "BlurFilter");
					this._addTween(filter, p, filter[p], value, p);
					if (values.blurPadding !== 0) {
						padding = values.blurPadding || Math.max(filter[p], value) * 2;
						i = target.filters.length;
						while (--i > -1) {
							target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
						}
					}
                } else if (_colorProps[p]) {
					if (!colorSetter) {
						colorSetter = _buildColorSetter(tween, this);
					}
					if ((p === "lineColor" || p === "fillColor") && target instanceof _gsScope.PIXI.Graphics) {
						data = target.graphicsData;
						i = data.length;
						while (--i > -1) {
							_addColorTween(data[i], p, value, colorSetter, this);
						}
						colorSetter.graphics = target;
					} else {
						_addColorTween(target, p, value, colorSetter, this);
					}
                } else if (p === "autoAlpha") {
					this._firstPT = pt = {t: {setRatio:function() { target.visible = !!target.alpha; }}, p: "setRatio", s: 0, c: 1, f: 1, pg: 0, n: "visible", pr: 0, m: 0, _next:this._firstPT};
					if (pt._next) {
						pt._next._prev = pt;
					}
					this._addTween(target, "alpha", target.alpha, value, "alpha");
					this._overwriteProps.push("alpha", "visible");
                } else {
					this._addTween(target, p, target[p], value, p);
                }
				this._overwriteProps.push(p);
            }
            return true;
        }
    });

	PixiPlugin.colorProps = _colorProps;
	PixiPlugin.parseColor = _parseColor;
	PixiPlugin.formatColors = _formatColors;
	PixiPlugin.colorStringFilter = _colorStringFilter;


}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("PixiPlugin"));
/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	var	_NaNExp = /[^\d\-\.]/g,
		_DEG2RAD = Math.PI / 180,
		_numExp = /(\d|\.)+/g,
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		//parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
		_parseColor = function(color) {
			if (typeof(color) === "number") {
				return [color >> 16, (color >> 8) & 255, color & 255];
			} else if (color === "" || color == null || color === "none" || typeof(color) !== "string") {
				return _colorLookup.transparent;
			} else if (_colorLookup[color]) {
				return _colorLookup[color];
			} else if (color.charAt(0) === "#") {
				if (color.length === 4) { //for shorthand like #9F0
					color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
				}
				color = parseInt(color.substr(1), 16);
				return [color >> 16, (color >> 8) & 255, color & 255];
			}
			return color.match(_numExp) || _colorLookup.transparent;
		},

		_transformMap = {scaleX:1, scaleY:1, tx:1, ty:1, rotation:1, shortRotation:1, skewX:1, skewY:1, scale:1},

		//parses the transform values for an element, returning an object with x, y, scaleX, scaleY, rotation, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
		_getTransform = function(t, rec) {
			var s = t.matrix,
				min = 0.000001,
				a = s.a,
				b = s.b,
				c = s.c,
				d = s.d,
				m = rec ? t._gsTransform || {skewY:0} : {skewY:0},
				invX = (m.scaleX < 0); //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.

			m.tx = s.e - (m.ox || 0); //ox is the offset x that we record in setRatio() whenever we apply a custom transform that might use a pivot point. Remember, s.e and s.f get affected by things like scale. For example, imagine an object whose top left corner is at 100,100 and then we scale it up to 300% using the center as the pivot point - that corner would now be very different even though to the user, they didn't intend to change/tween the x/y position per se. Therefore, we record whatever offsets we make so that we can compensate when reading the values back.
			m.ty = s.f - (m.oy || 0); //oy is the offset y (see note above)
			m.scaleX = Math.sqrt(a * a + b * b);
			m.scaleY = Math.sqrt(d * d + c * c);
			m.rotation = (a || b) ? Math.atan2(b, a) : m.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
			m.skewX = (c || d) ? Math.atan2(c, d) + m.rotation : m.skewX || 0;
			if (Math.abs(m.skewX) > Math.PI / 2) {
				if (invX) {
					m.scaleX *= -1;
					m.skewX += (m.rotation <= 0) ? Math.PI : -Math.PI;
					m.rotation += (m.rotation <= 0) ? Math.PI : -Math.PI;
				} else {
					m.scaleY *= -1;
					m.skewX += (m.skewX <= 0) ? Math.PI : -Math.PI;
				}
			}
			//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs().
			if (m.rotation < min) if (m.rotation > -min) if (a || b) {
				m.rotation = 0;
			}
			if (m.skewX < min) if (m.skewX > -min) if (b || c) {
				m.skewX = 0;
			}
			if (rec) {
				t._gsTransform = m; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
			}
			return m;
		},

		//takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
		_parseVal = function(v, d) {
			return (v == null) ? d : (typeof(v) === "string" && v.indexOf("=") === 1) ? parseInt(v.charAt(0)+"1", 10) * Number(v.substr(2)) + d : Number(v);
		},

		//translates strings like "40deg" or "40" or 40rad" or "+=40deg" to a numeric radian angle, optionally relative to a default value (if "+=" or "-=" prefix is found)
		_parseAngle = function(v, d) {
			var m = (v.indexOf("rad") === -1) ? _DEG2RAD : 1,
				r = (v.indexOf("=") === 1);
			v = Number(v.replace(_NaNExp, "")) * m;
			return r ? v + d : v;
		},


		RaphaelPlugin = _gsScope._gsDefine.plugin({
			propName: "raphael",
			version: "0.2.2",
			API: 2,

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween) {
				if (!target.attr) { //raphael must have attr() method
					return false;
				}
				this._target = target;
				this._tween = tween;
				this._props = target._gsProps = target._gsProps || {};
				var p, s, v, pt, clr1, clr2, rel;

				for (p in value) {

					v = value[p];

					if (p === "transform") {
						this._parseTransform(target, v);
						continue;
					} else if (_transformMap[p] || p === "pivot") {
						this._parseTransform(target, value);
						continue;
					}

					s = target.attr(p);

					//Some of these properties are in place in order to conform with the standard PropTweens in TweenPlugins so that overwriting and roundProps occur properly. For example, f and r may seem unnecessary here, but they enable other functionality.
					//_next:*	next linked list node		[object]
					//t: 	*	target 						[object]
					//p:	*	property (camelCase)		[string]
					//s: 	*	starting value				[number]
					//c:	*	change value				[number]
					//f:	* 	is function					[boolean]
					//n:	*	name (for overwriting)		[string]
					//b:		beginning value				[string]
					//i:		intermediate value			[string]
					//e: 		ending value				[string]
					//r:	*	round						[boolean]
					//type:		0=normal, 1=color, 2=rgba, -1=non-tweening prop	[number]
					this._firstPT = pt = {_next:this._firstPT,
						t:this._props,
						p:p,
						b:s,
						f:false,
						n:"raphael_" + p,
						r:false,
						type:0};

					//color values must be split apart into their R, G, B (and sometimes alpha) values and tweened independently.
					if (p === "fill" || p === "stroke") {
						clr1 = _parseColor(s);
						clr2 = _parseColor(v);
						pt.e = v;
						pt.s = Number(clr1[0]);				//red starting value
						pt.c = Number(clr2[0]) - pt.s;		//red change
						pt.gs = Number(clr1[1]);			//green starting value
						pt.gc = Number(clr2[1]) - pt.gs;	//green change
						pt.bs = Number(clr1[2]);			//blue starting value
						pt.bc = Number(clr2[2]) - pt.bs;	//blue change
						if (clr1.length > 3 || clr2.length > 3) { //detect an rgba() value
							pt.as = (clr1.length < 4) ? 1 : Number(clr1[3]);
							pt.ac = ((clr2.length < 4) ? 1 : Number(clr2[3])) - pt.as;
							pt.type = 2; //2 = rgba() tween
						} else {
							pt.type = 1; //1 = color tween, -1 = no tween, just set the value at the end because there's no changes
						}

					} else {

						s = (typeof(s) === "string") ? parseFloat(s.replace(_NaNExp, "")) : Number(s);

						if (typeof(v) === "string") {
							rel = (v.charAt(1) === "=");
							v = parseFloat(v.replace(_NaNExp, ""));
						} else {
							rel = false;
						}

						pt.e = (v || v === 0) ? (rel ? v + s : v) : value[p]; //ensures that any += or -= prefixes are taken care of.

						if ((s || s === 0) && (v || v === 0) && (pt.c = (rel ? v : v - s))) { //faster than isNaN(). Also, we set pt.c (change) here because if it's 0, we'll just treat it like a non-tweening value. can't do (v !== start) because if it's a relative value and the CHANGE is identical to the START, the condition will fail unnecessarily.
							pt.s = s;
						} else {
							pt.type = -1;
							pt.i = value[p]; //intermediate value is typically the same as the end value.
							pt.s = pt.c = 0;
						}

					}

					this._overwriteProps.push("raphael_" + p);
					if (pt._next) {
						pt._next._prev = pt;
					}
				}

				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				var pt = this._firstPT, val;

				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = Math.round(val);
					}
					if (!pt.type) {
						pt.t[pt.p] = val;
					} else if (pt.type === 1) { //rgb()
						pt.t[pt.p] = "rgb(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ")";
					} else if (pt.type === 2) { //rgba()
						pt.t[pt.p] = "rgba(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ", " + (pt.as + (v * pt.ac)) + ")";
					} else if (pt.type === -1) { //non-tweening
						pt.t[pt.p] = pt.i;
					}
					pt = pt._next;
				}

				this._target.attr(this._props);

				//apply transform values like x, y, scaleX, scaleY, rotation, skewX, or skewY. We do these after looping through all the PropTweens because those are where the changes are made to scaleX/scaleY/rotation/skewX/skewY/x/y.
				if (this._transform) {
					pt = this._transform; //to improve speed and reduce size, reuse the pt variable as an alias to the _transform property
					var ang = pt.rotation,
						skew = ang - pt.skewX,
						a = Math.cos(ang) * pt.scaleX,
						b = Math.sin(ang) * pt.scaleX,
						c = Math.sin(skew) * -pt.scaleY,
						d = Math.cos(skew) * pt.scaleY,
						min = 0.000001,
						pxl = this._pxl,
						pyl = this._pyl;

					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases for both b and c. The conditional logic here is faster than calling Math.abs().
					if (b < min) if (b > -min) {
						b = 0;
					}
					if (c < min) if (c > -min) {
						c = 0;
					}
					pt.ox = this._pxg - (pxl * a + pyl * c); //we must record the offset x/y that we're making from the regular tx/ty (matrix.e and f) so that we can correctly interpret positional data in _getTransform(). See note there on tx and ox.
					pt.oy = this._pyg - (pxl * b + pyl * d);
					this._target.transform("m" + a + "," + b + "," + c + "," + d + "," + (pt.tx + pt.ox) + "," + (pt.ty + pt.oy));
				}

			}

		}),
		p = RaphaelPlugin.prototype;

	//compares the beginning x, y, scaleX, scaleY, rotation, and skewX properties with the ending ones and adds PropTweens accordingly wherever necessary. We must tween them individually (rather than just tweening the matrix values) so that elgant overwriting can occur, like if one tween is controlling scaleX, scaleY, and rotation and then another one starts mid-tween that is trying to control the scaleX only - this tween should continue tweening scaleY and rotation.
	p._parseTransform = function(t, v) {
		if (this._transform) { return; } //only need to parse the transform once, and only if the browser supports it.

		var m1 = this._transform = _getTransform(t, true),
			min = 0.000001,
			m2, skewY, p, pt, copy, dx, dy, mtx, pivot;

		if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)

			m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
				  scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
				  tx:_parseVal(v.tx, m1.tx),
				  ty:_parseVal(v.ty, m1.ty)};

			if (v.shortRotation != null) {
				m2.rotation = (typeof(v.shortRotation) === "number") ? v.shortRotation * _DEG2RAD : _parseAngle(v.shortRotation, m1.rotation);
				var dif = (m2.rotation - m1.rotation) % (Math.PI * 2);
				if (dif !== dif % Math.PI) {
					dif += Math.PI * ((dif < 0) ? 2 : -2);
				}
				m2.rotation = m1.rotation + dif;

			} else {
				m2.rotation = (v.rotation == null) ? m1.rotation : (typeof(v.rotation) === "number") ? v.rotation * _DEG2RAD : _parseAngle(v.rotation, m1.rotation);
			}
			m2.skewX = (v.skewX == null) ? m1.skewX : (typeof(v.skewX) === "number") ? v.skewX * _DEG2RAD : _parseAngle(v.skewX, m1.skewX);

			//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
			m2.skewY = (v.skewY == null) ? m1.skewY : (typeof(v.skewY) === "number") ? v.skewY * _DEG2RAD : _parseAngle(v.skewY, m1.skewY);
			if ((skewY = m2.skewY - m1.skewY)) {
				m2.skewX += skewY;
				m2.rotation += skewY;
			}
			//don't allow rotation/skew values to be a SUPER small decimal because when they're translated back to strings for setting the css property, the browser reports them in a funky way, like 1-e7. Of course we could use toFixed() to resolve that issue but that hurts performance quite a bit with all those function calls on every frame, plus it is virtually impossible to discern values that small visually (nobody will notice changing a rotation of 0.0000001 to 0, so the performance improvement is well worth it).
			if (m2.skewY < min) if (m2.skewY > -min) {
				m2.skewY = 0;
			}
			if (m2.skewX < min) if (m2.skewX > -min) {
				m2.skewX = 0;
			}
			if (m2.rotation < min) if (m2.rotation > -min) {
				m2.rotation = 0;
			}

			pivot = v.localPivot || v.globalPivot;

			if (typeof(pivot) === "string") {
				copy = pivot.split(",");
				dx = Number(copy[0]);
				dy = Number(copy[1]);
			} else if (typeof(pivot) === "object") {
				dx = Number(pivot.x);
				dy = Number(pivot.y);
			} else if (v.localPivot) {
				copy = t.getBBox(true);
				dx = copy.width / 2;
				dy = copy.height / 2;
			} else {
				copy = t.getBBox();
				dx = copy.x + copy.width / 2;
				dy = copy.y + copy.height / 2;
			}

			if (v.localPivot) {
				mtx = t.matrix;
				dx += t.attr("x");
				dy += t.attr("y");
				this._pxl = dx;
				this._pyl = dy;
				this._pxg = dx * mtx.a + dy * mtx.c + mtx.e - m1.tx;
				this._pyg = dx * mtx.b + dy * mtx.d + mtx.f - m1.ty;
			} else {
				mtx = t.matrix.invert();
				this._pxl = dx * mtx.a + dy * mtx.c + mtx.e;
				this._pyl = dx * mtx.b + dy * mtx.d + mtx.f;
				this._pxg = dx - m1.tx;
				this._pyg = dy - m1.ty;
			}

		} else if (typeof(v) === "string") { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
			copy = this._target.transform();
			t.transform(v);
			m2 = _getTransform(t, false);
			t.transform(copy);
		} else {
			return;
		}

		for (p in _transformMap) {
			if (m1[p] !== m2[p]) if (p !== "shortRotation") if (p !== "scale") {
				this._firstPT = pt = {_next:this._firstPT, t:m1, p:p, s:m1[p], c:m2[p] - m1[p], n:p, f:false, r:false, b:m1[p], e:m2[p], type:0};
				if (pt._next) {
					pt._next._prev = pt;
				}
				this._overwriteProps.push("raphael_" + p);
			}
		}
	};

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
/*!
 * VERSION: 1.9.0
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	var _doc = (_gsScope.document || {}).documentElement,
		_window = _gsScope,
		_max = function(element, axis) {
			var dim = (axis === "x") ? "Width" : "Height",
				scroll = "scroll" + dim,
				client = "client" + dim,
				body = document.body;
			return (element === _window || element === _doc || element === body) ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
		},
		_unwrapElement = function(value) {
			if (typeof(value) === "string") {
				value = TweenLite.selector(value);
			}
			if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
				value = value[0];
			}
			return (value === _window || (value.nodeType && value.style)) ? value : null;
		},
		_buildGetter = function(e, axis) { //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
			var p = "scroll" + ((axis === "x") ? "Left" : "Top");
			if (e === _window) {
				if (e.pageXOffset != null) {
					p = "page" + axis.toUpperCase() + "Offset";
				} else if (_doc[p] != null) {
					e = _doc;
				} else {
					e = document.body;
				}
			}
			return function() {
				return e[p];
			};
		},
		_getOffset = function(element, container) {
			var rect = _unwrapElement(element).getBoundingClientRect(),
				isRoot = (!container || container === _window || container === document.body),
				cRect = (isRoot ? _doc : container).getBoundingClientRect(),
				offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
			if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
				offsets.x += _buildGetter(container, "x")();
				offsets.y += _buildGetter(container, "y")();
			}
			return offsets;
		},
		_parseVal = function(value, target, axis) {
			var type = typeof(value);
			return !isNaN(value) ? parseFloat(value) : (type === "number" || (type === "string" && value.charAt(1) === "=")) ? value : (value === "max") ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
		},

		ScrollToPlugin = _gsScope._gsDefine.plugin({
			propName: "scrollTo",
			API: 2,
			global: true,
			version:"1.9.0",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween) {
				this._wdw = (target === _window);
				this._target = target;
				this._tween = tween;
				if (typeof(value) !== "object") {
					value = {y:value}; //if we don't receive an object as the parameter, assume the user intends "y".
					if (typeof(value.y) === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
						value.x = value.y;
					}
				} else if (value.nodeType) {
					value = {y:value, x:value};
				}
				this.vars = value;
				this._autoKill = (value.autoKill !== false);
				this.getX = _buildGetter(target, "x");
				this.getY = _buildGetter(target, "y");
				this.x = this.xPrev = this.getX();
				this.y = this.yPrev = this.getY();
				if (value.x != null) {
					this._addTween(this, "x", this.x, _parseVal(value.x, target, "x") - (value.offsetX || 0), "scrollTo_x", true);
					this._overwriteProps.push("scrollTo_x");
				} else {
					this.skipX = true;
				}
				if (value.y != null) {
					this._addTween(this, "y", this.y, _parseVal(value.y, target, "y") - (value.offsetY || 0), "scrollTo_y", true);
					this._overwriteProps.push("scrollTo_y");
				} else {
					this.skipY = true;
				}
				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				this._super.setRatio.call(this, v);

				var x = (this._wdw || !this.skipX) ? this.getX() : this.xPrev,
					y = (this._wdw || !this.skipY) ? this.getY() : this.yPrev,
					yDif = y - this.yPrev,
					xDif = x - this.xPrev,
					threshold = ScrollToPlugin.autoKillThreshold;

				if (this.x < 0) { //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
					this.x = 0;
				}
				if (this.y < 0) {
					this.y = 0;
				}
				if (this._autoKill) {
					//note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
					if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
						this.skipX = true; //if the user scrolls separately, we should stop tweening!
					}
					if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
						this.skipY = true; //if the user scrolls separately, we should stop tweening!
					}
					if (this.skipX && this.skipY) {
						this._tween.kill();
						if (this.vars.onAutoKill) {
							this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
						}
					}
				}
				if (this._wdw) {
					_window.scrollTo((!this.skipX) ? this.x : x, (!this.skipY) ? this.y : y);
				} else {
					if (!this.skipY) {
						this._target.scrollTop = this.y;
					}
					if (!this.skipX) {
						this._target.scrollLeft = this.x;
					}
				}
				this.xPrev = this.x;
				this.yPrev = this.y;
			}

		}),
		p = ScrollToPlugin.prototype;

	ScrollToPlugin.max = _max;
	ScrollToPlugin.getOffset = _getOffset;
	ScrollToPlugin.buildGetter = _buildGetter;
	ScrollToPlugin.autoKillThreshold = 7;

	p._kill = function(lookup) {
		if (lookup.scrollTo_x) {
			this.skipX = true;
		}
		if (lookup.scrollTo_y) {
			this.skipY = true;
		}
		return this._super._kill.call(this, lookup);
	};

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("ScrollToPlugin"));
/*!
 * VERSION: 1.2.0
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * This file is to be used as a simple template for writing your own plugin. See the 
 * TweenPlugin docs for more details.
 *
 * You can start by doing a search for "yourCustomProperty" and replace it with whatever the name
 * of your property is. This way of defining a plugin was introduced in version 1.9.0 - previous versions
 * of TweenLite won't work with this.
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
	//ignore the line above this and at the very end - those are for ensuring things load in the proper order
	"use strict";

	_gsScope._gsDefine.plugin({
		propName: "yourCustomProperty", //the name of the property that will get intercepted and handled by this plugin (obviously change it to whatever you want, typically it is camelCase starting with lowercase).
		priority: 0, //the priority in the rendering pipeline (0 by default). A priority of -1 would mean this plugin will run after all those with 0 or greater. A priority of 1 would get run before 0, etc. This only matters when a plugin relies on other plugins finishing their work before it runs (or visa-versa)
		API: 2, //the API should stay 2 - it just gives us a way to know the method/property structure so that if in the future we change to a different TweenPlugin architecture, we can identify this plugin's structure.
		version: "1.0.0", //your plugin's version number
		overwriteProps: ["yourCustomProperty"], //an array of property names whose tweens should be overwritten by this plugin. For example, if you create a "scale" plugin that handles both "scaleX" and "scaleY", the overwriteProps would be ["scaleX","scaleY"] so that if there's a scaleX or scaleY tween in-progress when a new "scale" tween starts (using this plugin), it would overwrite the scaleX or scaleY tween.

		/*
		 * The init function is called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run. It receives 3 parameters:
		 *   1) target [object] - the target of the tween. In cases where the tween's original target is an array (or jQuery object), this target will be the individual object inside that array (a new plugin instance is created for each target in the array). For example, TweenLite.to([obj1, obj2, obj3], 1, {x:100}) the target will be obj1 or obj2 or obj3 rather than the array containing them.
		 *   2) value [*] - whatever value is passed as the special property value. For example, TweenLite.to(element, 1, {yourCustomProperty:3}) the value would be 3. Or for TweenLite.to(element, 1, {yourCustomProperty:{subProp1:3, subProp2:"whatever"}});, value would be {subProp1:3, subProp2:"whatever"}.
		 *   3) tween [TweenLite] - the TweenLite (or TweenMax) instance that is managing this plugin instance. This can be useful if you need to check certain state-related properties on the tween (maybe in the set method) like its duration or time. Most of the time, however, you don't need to do anything with the tween. It is provided just in case you want to reference it.
		 *   4) index [integer] - the index number of the target in the tween. For example, if an array is passed in as the target (or selector text), this would be 0 for the first one, 1 for the second, 2 for the third, etc. This was introduced in GSAP 1.19.0
		 *
		 * This function should return true unless you want to have TweenLite/Max skip the plugin altogether and instead treat the property/value like a normal tween (as if the plugin wasn't activated). This is rarely useful, so you should almost always return true.
		 */
		init: function(target, value, tween, index) {
			this._target = target; //we record the target so that we can refer to it in the set method when doing updates.

			/* Next, we create a property tween for "scaleX" and "scaleY" properties of our target
			 * (we're just using them as a examples of how to set up a property tween with a name, start, and end value).
			 * the _addTween() method accepts the following parameters:
			 *   1) target [object] - target object whose property this tween will control.
			 *   2) property [string] - the name of the property, like "scaleX" or "scaleY"
			 *   3) start [number] - The starting value of the property. For example, if you're tweening from 0 to 100, start would be 0.
			 *   4) end [number] - the ending value of the property. For example, if you're tweening from 0 to 100, end would be 100.
			 *   5) overwriteProperty [string] - the name that gets registered as the overwrite property so that if another concurrent tween of the same target gets created and it is tweening a property with this name, this one will be overwritten. Typically this is the same as "property".
			 *   6) round [boolean] - if true, the updated value on each update will be rounded to the nearest integer. [false by default]
			 * You do NOT need to use _addTween() at all. It is merely a convenience. You can record your own values internally or whatever you want.
			 */
			this._addTween(target, "scaleX", target.scaleX, value, "scaleX", false);
			this._addTween(target, "scaleY", target.scaleY, value, "scaleY", false);

			//now, just for kicks, we'll record the starting "alpha" value and amount of change so that we can manage this manually rather than _addTween() (again, totally fictitious, just for an example)
			this._alphaStart = target.alpha;
			this._alphaChange = value.alpha - target.alpha;

			//always return true unless we want to scrap the plugin and have the value treated as a normal property tween (very uncommon)
			return true;
		},

		//[optional] - called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.). If you're using this._super._addTween() for all your tweens and you don't need to do anything special on each frame besides updating those values, you can omit this "set" function altogether.
		set: function(ratio) {
			//since we used _addTween() inside init function, it created some property tweens that we'll update by calling the parent prototype's setRatio() (otherwise, the property tweens wouldn't get their values updated). this._super refers to the TweenPlugin prototype from which the plugin inherits (not that you need to worry about that).
			this._super.setRatio.call(this, ratio);

			//now manually set the alpha
			this._target.alpha = this._alphaStart + this._alphaChange * ratio;
		}

	});

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
/*!
 * VERSION: 0.6.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

		var _getText = function(e) {
				var type = e.nodeType,
					result = "";
				if (type === 1 || type === 9 || type === 11) {
					if (typeof(e.textContent) === "string") {
						return e.textContent;
					} else {
						for ( e = e.firstChild; e; e = e.nextSibling ) {
							result += _getText(e);
						}
					}
				} else if (type === 3 || type === 4) {
					return e.nodeValue;
				}
				return result;
			},
			_emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
			_emojiExp = new RegExp(_emoji),
			_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
			_emojiSafeSplit = function(text, delimiter) {
				return ((delimiter === "" || !delimiter) && _emojiExp.test(text)) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
			},
			/* //previous emoji-related splitting. New method above is faster and more concise.
			_emojiStart = 0xD800,
			_emojiEnd = 0xDBFF,
			_emojiLowStart = 0xDC00,
			_emojiRegionStart = 0x1F1E6,
			_emojiRegionEnd = 0x1F1FF,
			_emojiModStart = 0x1f3fb,
			_emojiModEnd = 0x1f3ff,
			_emojiPairCode = function(s) {
				return ((s.charCodeAt(0) - _emojiStart) << 10) + (s.charCodeAt(1) - _emojiLowStart) + 0x10000;
			},
			_emojiSafeSplit = function(text, delimiter) { //like calling String.split(delimiter) except that it keeps emoji characters together.
				if (delimiter !== "") {
					return text.split(delimiter);
				}
				var l = text.length,
					a = [],
					character, i, emojiPair1, emojiPair2, j;
				for (i = 0; i < l; i++) {
					character = text.charAt(i);
					if ((character.charCodeAt(0) >= _emojiStart && character.charCodeAt(0) <= _emojiEnd) || (text.charCodeAt(i+1) >= 0xFE00 && text.charCodeAt(i+1) <= 0xFE0F)) { //special emoji characters use 2 or 4 unicode characters that we must keep together.
						emojiPair1 = _emojiPairCode(text.substr(i, 2));
						emojiPair2 = _emojiPairCode(text.substr(i + 2, 2));
						j = ((emojiPair1 >= _emojiRegionStart && emojiPair1 <= _emojiRegionEnd && emojiPair2 >= _emojiRegionStart && emojiPair2 <= _emojiRegionEnd) || (emojiPair2 >= _emojiModStart && emojiPair2 <= _emojiModEnd)) ? 4 : 2;
						a.push(text.substr(i, j));
						i += j - 1;
					} else {
						a.push(character);
					}
				}
				return a;
			},
			*/
			TextPlugin = _gsScope._gsDefine.plugin({
				propName: "text",
				API: 2,
				version:"0.6.2",

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween, index) {
					var i = target.nodeName.toUpperCase(),
						shrt;
					if (typeof(value) === "function") {
						value = value(index, target);
					}
					this._svg = (target.getBBox && (i === "TEXT" || i === "TSPAN"));
					if (!("innerHTML" in target) && !this._svg) {
						return false;
					}
					this._target = target;
					if (typeof(value) !== "object") {
						value = {value:value};
					}
					if (value.value === undefined) {
						this._text = this._original = [""];
						return true;
					}
					this._delimiter = value.delimiter || "";
					this._original = _emojiSafeSplit(_getText(target).replace(/\s+/g, " "), this._delimiter);
					this._text = _emojiSafeSplit(value.value.replace(/\s+/g, " "), this._delimiter);
					this._runBackwards = (tween.vars.runBackwards === true);
					if (this._runBackwards) {
						i = this._original;
						this._original = this._text;
						this._text = i;
					}
					if (typeof(value.newClass) === "string") {
						this._newClass = value.newClass;
						this._hasClass = true;
					}
					if (typeof(value.oldClass) === "string") {
						this._oldClass = value.oldClass;
						this._hasClass = true;
					}
					i = this._original.length - this._text.length;
					shrt = (i < 0) ? this._original : this._text;
					this._fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : "");
					if (i < 0) {
						i = -i;
					}
					while (--i > -1) {
						shrt.push(this._fillChar);
					}
					return true;
				},

				//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
				set: function(ratio) {
					if (ratio > 1) {
						ratio = 1;
					} else if (ratio < 0) {
						ratio = 0;
					}
					if (this._runBackwards) {
						ratio = 1 - ratio;
					}
					var l = this._text.length,
						i = (ratio * l + 0.5) | 0,
						applyNew, applyOld, str;
					if (this._hasClass) {
						applyNew = (this._newClass && i !== 0);
						applyOld = (this._oldClass && i !== l);
						str = (applyNew ? "<span class='" + this._newClass + "'>" : "") + this._text.slice(0, i).join(this._delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + this._oldClass + "'>" : "") + this._delimiter + this._original.slice(i).join(this._delimiter) + (applyOld ? "</span>" : "");
					} else {
						str = this._text.slice(0, i).join(this._delimiter) + this._delimiter + this._original.slice(i).join(this._delimiter);
					}
					if (this._svg) { //SVG text elements don't have an "innerHTML" in Microsoft browsers.
						this._target.textContent = str;
					} else {
						this._target.innerHTML = (this._fillChar === "&nbsp;" && str.indexOf("  ") !== -1) ? str.split("  ").join("&nbsp;&nbsp;") : str;
					}
				}

			}),
			p = TextPlugin.prototype;

		p._newClass = p._oldClass = p._delimiter = "";

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
	"use strict";
	var getGlobal = function() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof(module) !== "undefined" && module.exports) { //node
		require("../TweenLite.js");
		module.exports = getGlobal();
	} else if (typeof(define) === "function" && define.amd) { //AMD
		define(["TweenLite"], getGlobal);
	}
}("TextPlugin"));
/* 
 *************************************
 * <!-- GSAP Plugins -->
 *************************************
 */
/**
 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
 * @author mrdoob / http://mrdoob.com/
 * @author yomotsu / https://yomotsu.net/
 */

THREE.CSS3DObject = function ( element ) {

	THREE.Object3D.call( this );

	this.element = element;
	this.element.style.position = 'absolute';

	this.addEventListener( 'removed', function () {

		if ( this.element.parentNode !== null ) {

			this.element.parentNode.removeChild( this.element );

		}

	} );

};

THREE.CSS3DObject.prototype = Object.create( THREE.Object3D.prototype );
THREE.CSS3DObject.prototype.constructor = THREE.CSS3DObject;

THREE.CSS3DSprite = function ( element ) {

	THREE.CSS3DObject.call( this, element );

};

THREE.CSS3DSprite.prototype = Object.create( THREE.CSS3DObject.prototype );
THREE.CSS3DSprite.prototype.constructor = THREE.CSS3DSprite;

//

THREE.CSS3DRenderer = function () {

	console.log( 'THREE.CSS3DRenderer', THREE.REVISION );

	var _width, _height;
	var _widthHalf, _heightHalf;

	var matrix = new THREE.Matrix4();

	var cache = {
		camera: { fov: 0, style: '' },
		objects: new WeakMap()
	};

	var domElement = document.createElement( 'div' );
	domElement.style.overflow = 'hidden';

	this.domElement = domElement;

	var cameraElement = document.createElement( 'div' );

	cameraElement.style.WebkitTransformStyle = 'preserve-3d';
	cameraElement.style.transformStyle = 'preserve-3d';

	domElement.appendChild( cameraElement );

	var isIE = /Trident/i.test( navigator.userAgent );

	this.getSize = function () {

		return {
			width: _width,
			height: _height
		};

	};

	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;
		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

		cameraElement.style.width = width + 'px';
		cameraElement.style.height = height + 'px';

	};

	function epsilon( value ) {

		return Math.abs( value ) < 1e-10 ? 0 : value;

	}

	function getCameraCSSMatrix( matrix ) {

		var elements = matrix.elements;

		return 'matrix3d(' +
			epsilon( elements[ 0 ] ) + ',' +
			epsilon( - elements[ 1 ] ) + ',' +
			epsilon( elements[ 2 ] ) + ',' +
			epsilon( elements[ 3 ] ) + ',' +
			epsilon( elements[ 4 ] ) + ',' +
			epsilon( - elements[ 5 ] ) + ',' +
			epsilon( elements[ 6 ] ) + ',' +
			epsilon( elements[ 7 ] ) + ',' +
			epsilon( elements[ 8 ] ) + ',' +
			epsilon( - elements[ 9 ] ) + ',' +
			epsilon( elements[ 10 ] ) + ',' +
			epsilon( elements[ 11 ] ) + ',' +
			epsilon( elements[ 12 ] ) + ',' +
			epsilon( - elements[ 13 ] ) + ',' +
			epsilon( elements[ 14 ] ) + ',' +
			epsilon( elements[ 15 ] ) +
		')';

	}

	function getObjectCSSMatrix( matrix, cameraCSSMatrix ) {

		var elements = matrix.elements;
		var matrix3d = 'matrix3d(' +
			epsilon( elements[ 0 ] ) + ',' +
			epsilon( elements[ 1 ] ) + ',' +
			epsilon( elements[ 2 ] ) + ',' +
			epsilon( elements[ 3 ] ) + ',' +
			epsilon( - elements[ 4 ] ) + ',' +
			epsilon( - elements[ 5 ] ) + ',' +
			epsilon( - elements[ 6 ] ) + ',' +
			epsilon( - elements[ 7 ] ) + ',' +
			epsilon( elements[ 8 ] ) + ',' +
			epsilon( elements[ 9 ] ) + ',' +
			epsilon( elements[ 10 ] ) + ',' +
			epsilon( elements[ 11 ] ) + ',' +
			epsilon( elements[ 12 ] ) + ',' +
			epsilon( elements[ 13 ] ) + ',' +
			epsilon( elements[ 14 ] ) + ',' +
			epsilon( elements[ 15 ] ) +
		')';

		if ( isIE ) {

			return 'translate(-50%,-50%)' +
				'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)' +
				cameraCSSMatrix +
				matrix3d;

		}

		return 'translate(-50%,-50%)' + matrix3d;

	}

	function renderObject( object, camera, cameraCSSMatrix ) {

		if ( object instanceof THREE.CSS3DObject ) {

			var style;

			if ( object instanceof THREE.CSS3DSprite ) {

				// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

				matrix.copy( camera.matrixWorldInverse );
				matrix.transpose();
				matrix.copyPosition( object.matrixWorld );
				matrix.scale( object.scale );

				matrix.elements[ 3 ] = 0;
				matrix.elements[ 7 ] = 0;
				matrix.elements[ 11 ] = 0;
				matrix.elements[ 15 ] = 1;

				style = getObjectCSSMatrix( matrix, cameraCSSMatrix );

			} else {

				style = getObjectCSSMatrix( object.matrixWorld, cameraCSSMatrix );

			}

			var element = object.element;
			var cachedStyle = cache.objects.get( object );

			if ( cachedStyle === undefined || cachedStyle !== style ) {

				element.style.WebkitTransform = style;
				element.style.transform = style;

				var objectData = { style: style };

				if ( isIE ) {

					objectData.distanceToCameraSquared = getDistanceToSquared( camera, object );

				}

				cache.objects.set( object, objectData );

			}

			if ( element.parentNode !== cameraElement ) {

				cameraElement.appendChild( element );

			}

		}

		for ( var i = 0, l = object.children.length; i < l; i ++ ) {

			renderObject( object.children[ i ], camera, cameraCSSMatrix );

		}

	}

	var getDistanceToSquared = function () {

		var a = new THREE.Vector3();
		var b = new THREE.Vector3();

		return function ( object1, object2 ) {

			a.setFromMatrixPosition( object1.matrixWorld );
			b.setFromMatrixPosition( object2.matrixWorld );

			return a.distanceToSquared( b );

		};

	}();

	function filterAndFlatten( scene ) {

		var result = [];

		scene.traverse( function ( object ) {

			if ( object instanceof THREE.CSS3DObject ) result.push( object );

		} );

		return result;

	}

	function zOrder( scene ) {

		var sorted = filterAndFlatten( scene ).sort( function ( a, b ) {

			var distanceA = cache.objects.get( a ).distanceToCameraSquared;
			var distanceB = cache.objects.get( b ).distanceToCameraSquared;

			return distanceA - distanceB;

		} );

		var zMax = sorted.length;

		for ( var i = 0, l = sorted.length; i < l; i ++ ) {

			sorted[ i ].element.style.zIndex = zMax - i;

		}

	}

	this.render = function ( scene, camera ) {

		var fov = camera.projectionMatrix.elements[ 5 ] * _heightHalf;

		if ( cache.camera.fov !== fov ) {

			if ( camera.isPerspectiveCamera ) {

				domElement.style.WebkitPerspective = fov + 'px';
				domElement.style.perspective = fov + 'px';

			}

			cache.camera.fov = fov;

		}

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		var cameraCSSMatrix = camera.isOrthographicCamera ?
			'scale(' + fov + ')' + getCameraCSSMatrix( camera.matrixWorldInverse ) :
			'translateZ(' + fov + 'px)' + getCameraCSSMatrix( camera.matrixWorldInverse );

		var style = cameraCSSMatrix +
			'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)';

		if ( cache.camera.style !== style && ! isIE ) {

			cameraElement.style.WebkitTransform = style;
			cameraElement.style.transform = style;

			cache.camera.style = style;

		}

		renderObject( scene, camera, cameraCSSMatrix );

		if ( isIE ) {

			// IE10 and 11 does not support 'preserve-3d'.
			// Thus, z-order in 3D will not work.
			// We have to calc z-order manually and set CSS z-index for IE.
			// FYI: z-index can't handle object intersection
			zOrder( scene );

		}

	};

};

/**
 * @author Rich Tibbett / https://github.com/richtr
 * @author mrdoob / http://mrdoob.com/
 * @author Tony Parisi / http://www.tonyparisi.com/
 * @author Takahiro / https://github.com/takahirox
 * @author Don McCurdy / https://www.donmccurdy.com
 */

THREE.GLTFLoader = ( function () {

	function GLTFLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
		this.dracoLoader = null;

	}

	GLTFLoader.prototype = {

		constructor: GLTFLoader,

		crossOrigin: 'Anonymous',

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var path = this.path !== undefined ? this.path : THREE.LoaderUtils.extractUrlBase( url );

			var loader = new THREE.FileLoader( scope.manager );

			loader.setResponseType( 'arraybuffer' );

			loader.load( url, function ( data ) {

				try {

					scope.parse( data, path, onLoad, onError );

				} catch ( e ) {

					if ( onError !== undefined ) {

						onError( e );

					} else {

						throw e;

					}

				}

			}, onProgress, onError );

		},

		setCrossOrigin: function ( value ) {

			this.crossOrigin = value;
			return this;

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		setDRACOLoader: function ( dracoLoader ) {

			this.dracoLoader = dracoLoader;
			return this;

		},

		parse: function ( data, path, onLoad, onError ) {

			var content;
			var extensions = {};

			if ( typeof data === 'string' ) {

				content = data;

			} else {

				var magic = THREE.LoaderUtils.decodeText( new Uint8Array( data, 0, 4 ) );

				if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

					try {

						extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

					} catch ( error ) {

						if ( onError ) onError( error );
						return;

					}

					content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

				} else {

					content = THREE.LoaderUtils.decodeText( new Uint8Array( data ) );

				}

			}

			var json = JSON.parse( content );

			if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

				if ( onError ) onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead.' ) );
				return;

			}

			if ( json.extensionsUsed ) {

				for ( var i = 0; i < json.extensionsUsed.length; ++ i ) {

					var extensionName = json.extensionsUsed[ i ];
					var extensionsRequired = json.extensionsRequired || [];

					switch ( extensionName ) {

						case EXTENSIONS.KHR_LIGHTS:
							extensions[ extensionName ] = new GLTFLightsExtension( json );
							break;

						case EXTENSIONS.KHR_MATERIALS_UNLIT:
							extensions[ extensionName ] = new GLTFMaterialsUnlitExtension( json );
							break;

						case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
							extensions[ extensionName ] = new GLTFMaterialsPbrSpecularGlossinessExtension();
							break;

						case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
							extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
							break;

						case EXTENSIONS.MSFT_TEXTURE_DDS:
							extensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] = new GLTFTextureDDSExtension();
							break;

						default:

							if ( extensionsRequired.indexOf( extensionName ) >= 0 ) {

								console.warn( 'THREE.GLTFLoader: Unknown extension "' + extensionName + '".' );

							}

					}

				}

			}

			var parser = new GLTFParser( json, extensions, {

				path: path || this.path || '',
				crossOrigin: this.crossOrigin,
				manager: this.manager

			} );

			parser.parse( function ( scene, scenes, cameras, animations, json ) {

				var glTF = {
					scene: scene,
					scenes: scenes,
					cameras: cameras,
					animations: animations,
					asset: json.asset,
					parser: parser,
					userData: {}
				};

				addUnknownExtensionsToUserData( extensions, glTF, json );

				onLoad( glTF );

			}, onError );

		}

	};

	/* GLTFREGISTRY */

	function GLTFRegistry() {

		var objects = {};

		return	{

			get: function ( key ) {

				return objects[ key ];

			},

			add: function ( key, object ) {

				objects[ key ] = object;

			},

			remove: function ( key ) {

				delete objects[ key ];

			},

			removeAll: function () {

				objects = {};

			}

		};

	}

	/*********************************/
	/********** EXTENSIONS ***********/
	/*********************************/

	var EXTENSIONS = {
		KHR_BINARY_GLTF: 'KHR_binary_glTF',
		KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
		KHR_LIGHTS: 'KHR_lights',
		KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
		KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
		MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
	};

	/**
	 * DDS Texture Extension
	 *
	 * Specification: 
	 * https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_texture_dds
	 * 
	 */
	function GLTFTextureDDSExtension() {

		if ( ! THREE.DDSLoader ) {

			throw new Error( 'THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader' );

		}

		this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
		this.ddsLoader = new THREE.DDSLoader();

	}

	/**
	 * Lights Extension
	 *
	 * Specification: PENDING
	 */
	function GLTFLightsExtension( json ) {

		this.name = EXTENSIONS.KHR_LIGHTS;

		this.lights = {};

		var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_LIGHTS ] ) || {};
		var lights = extension.lights || {};

		for ( var lightId in lights ) {

			var light = lights[ lightId ];
			var lightNode;

			var color = new THREE.Color().fromArray( light.color );

			switch ( light.type ) {

				case 'directional':
					lightNode = new THREE.DirectionalLight( color );
					lightNode.target.position.set( 0, 0, 1 );
					lightNode.add( lightNode.target );
					break;

				case 'point':
					lightNode = new THREE.PointLight( color );
					break;

				case 'spot':
					lightNode = new THREE.SpotLight( color );
					// Handle spotlight properties.
					light.spot = light.spot || {};
					light.spot.innerConeAngle = light.spot.innerConeAngle !== undefined ? light.spot.innerConeAngle : 0;
					light.spot.outerConeAngle = light.spot.outerConeAngle !== undefined ? light.spot.outerConeAngle : Math.PI / 4.0;
					lightNode.angle = light.spot.outerConeAngle;
					lightNode.penumbra = 1.0 - light.spot.innerConeAngle / light.spot.outerConeAngle;
					lightNode.target.position.set( 0, 0, 1 );
					lightNode.add( lightNode.target );
					break;

				case 'ambient':
					lightNode = new THREE.AmbientLight( color );
					break;

			}

			if ( lightNode ) {

				lightNode.decay = 2;

				if ( light.intensity !== undefined ) {

					lightNode.intensity = light.intensity;

				}

				lightNode.name = light.name || ( 'light_' + lightId );
				this.lights[ lightId ] = lightNode;

			}

		}

	}

	/**
	 * Unlit Materials Extension (pending)
	 *
	 * PR: https://github.com/KhronosGroup/glTF/pull/1163
	 */
	function GLTFMaterialsUnlitExtension( json ) {

		this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

	}

	GLTFMaterialsUnlitExtension.prototype.getMaterialType = function ( material ) {

		return THREE.MeshBasicMaterial;

	};

	GLTFMaterialsUnlitExtension.prototype.extendParams = function ( materialParams, material, parser ) {

		var pending = [];

		materialParams.color = new THREE.Color( 1.0, 1.0, 1.0 );
		materialParams.opacity = 1.0;

		var metallicRoughness = material.pbrMetallicRoughness;

		if ( metallicRoughness ) {

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				var array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

			}

		}

		return Promise.all( pending );

	};

	/* BINARY EXTENSION */

	var BINARY_EXTENSION_BUFFER_NAME = 'binary_glTF';
	var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
	var BINARY_EXTENSION_HEADER_LENGTH = 12;
	var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

	function GLTFBinaryExtension( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		var headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );

		this.header = {
			magic: THREE.LoaderUtils.decodeText( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.' );

		}

		var chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		var chunkIndex = 0;

		while ( chunkIndex < chunkView.byteLength ) {

			var chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			var chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				var contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = THREE.LoaderUtils.decodeText( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

	/**
	 * DRACO Mesh Compression Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/pull/874
	 */
	function GLTFDracoMeshCompressionExtension ( json, dracoLoader ) {

		if ( ! dracoLoader ) {

			throw new Error( 'THREE.GLTFLoader: No DRACOLoader instance provided.' );

		}

		this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
		this.json = json;
		this.dracoLoader = dracoLoader;

	}

	GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function ( primitive, parser ) {

		var json = this.json;
		var dracoLoader = this.dracoLoader;
		var bufferViewIndex = primitive.extensions[ this.name ].bufferView;
		var gltfAttributeMap = primitive.extensions[ this.name ].attributes;
		var threeAttributeMap = {};
		var attributeNormalizedMap = {};
		var attributeTypeMap = {};

		for ( var attributeName in gltfAttributeMap ) {

			if ( !( attributeName in ATTRIBUTES ) ) continue;

			threeAttributeMap[ ATTRIBUTES[ attributeName ] ] = gltfAttributeMap[ attributeName ];

		}

		for ( attributeName in primitive.attributes ) {

			if ( ATTRIBUTES[ attributeName ] !== undefined && gltfAttributeMap[ attributeName ] !== undefined ) {

				var accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
				var componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				attributeTypeMap[ ATTRIBUTES[ attributeName ] ]  = componentType;
				attributeNormalizedMap[ ATTRIBUTES[ attributeName ] ] = accessorDef.normalized === true;

			}

		}

		return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

			return new Promise( function ( resolve ) {

				dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

					for ( var attributeName in geometry.attributes ) {

						var attribute = geometry.attributes[ attributeName ];
						var normalized = attributeNormalizedMap[ attributeName ];

						if ( normalized !== undefined ) attribute.normalized = normalized;

					}

					resolve( geometry );

				}, threeAttributeMap, attributeTypeMap );

			} );

		} );

	};

	/**
	 * Specular-Glossiness Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
	 */
	function GLTFMaterialsPbrSpecularGlossinessExtension() {

		return {

			name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

			specularGlossinessParams: [
				'color',
				'map',
				'lightMap',
				'lightMapIntensity',
				'aoMap',
				'aoMapIntensity',
				'emissive',
				'emissiveIntensity',
				'emissiveMap',
				'bumpMap',
				'bumpScale',
				'normalMap',
				'displacementMap',
				'displacementScale',
				'displacementBias',
				'specularMap',
				'specular',
				'glossinessMap',
				'glossiness',
				'alphaMap',
				'envMap',
				'envMapIntensity',
				'refractionRatio',
			],

			getMaterialType: function () {

				return THREE.ShaderMaterial;

			},

			extendParams: function ( params, material, parser ) {

				var pbrSpecularGlossiness = material.extensions[ this.name ];

				var shader = THREE.ShaderLib[ 'standard' ];

				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

				var specularMapParsFragmentChunk = [
					'#ifdef USE_SPECULARMAP',
					'	uniform sampler2D specularMap;',
					'#endif'
				].join( '\n' );

				var glossinessMapParsFragmentChunk = [
					'#ifdef USE_GLOSSINESSMAP',
					'	uniform sampler2D glossinessMap;',
					'#endif'
				].join( '\n' );

				var specularMapFragmentChunk = [
					'vec3 specularFactor = specular;',
					'#ifdef USE_SPECULARMAP',
					'	vec4 texelSpecular = texture2D( specularMap, vUv );',
					'	texelSpecular = sRGBToLinear( texelSpecular );',
					'	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	specularFactor *= texelSpecular.rgb;',
					'#endif'
				].join( '\n' );

				var glossinessMapFragmentChunk = [
					'float glossinessFactor = glossiness;',
					'#ifdef USE_GLOSSINESSMAP',
					'	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
					'	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	glossinessFactor *= texelGlossiness.a;',
					'#endif'
				].join( '\n' );

				var lightPhysicalFragmentChunk = [
					'PhysicalMaterial material;',
					'material.diffuseColor = diffuseColor.rgb;',
					'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
					'material.specularColor = specularFactor.rgb;',
				].join( '\n' );

				var fragmentShader = shader.fragmentShader
					.replace( 'uniform float roughness;', 'uniform vec3 specular;' )
					.replace( 'uniform float metalness;', 'uniform float glossiness;' )
					.replace( '#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk )
					.replace( '#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk )
					.replace( '#include <roughnessmap_fragment>', specularMapFragmentChunk )
					.replace( '#include <metalnessmap_fragment>', glossinessMapFragmentChunk )
					.replace( '#include <lights_physical_fragment>', lightPhysicalFragmentChunk );

				delete uniforms.roughness;
				delete uniforms.metalness;
				delete uniforms.roughnessMap;
				delete uniforms.metalnessMap;

				uniforms.specular = { value: new THREE.Color().setHex( 0x111111 ) };
				uniforms.glossiness = { value: 0.5 };
				uniforms.specularMap = { value: null };
				uniforms.glossinessMap = { value: null };

				params.vertexShader = shader.vertexShader;
				params.fragmentShader = fragmentShader;
				params.uniforms = uniforms;
				params.defines = { 'STANDARD': '' };

				params.color = new THREE.Color( 1.0, 1.0, 1.0 );
				params.opacity = 1.0;

				var pending = [];

				if ( Array.isArray( pbrSpecularGlossiness.diffuseFactor ) ) {

					var array = pbrSpecularGlossiness.diffuseFactor;

					params.color.fromArray( array );
					params.opacity = array[ 3 ];

				}

				if ( pbrSpecularGlossiness.diffuseTexture !== undefined ) {

					pending.push( parser.assignTexture( params, 'map', pbrSpecularGlossiness.diffuseTexture.index ) );

				}

				params.emissive = new THREE.Color( 0.0, 0.0, 0.0 );
				params.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
				params.specular = new THREE.Color( 1.0, 1.0, 1.0 );

				if ( Array.isArray( pbrSpecularGlossiness.specularFactor ) ) {

					params.specular.fromArray( pbrSpecularGlossiness.specularFactor );

				}

				if ( pbrSpecularGlossiness.specularGlossinessTexture !== undefined ) {

					var specGlossIndex = pbrSpecularGlossiness.specularGlossinessTexture.index;
					pending.push( parser.assignTexture( params, 'glossinessMap', specGlossIndex ) );
					pending.push( parser.assignTexture( params, 'specularMap', specGlossIndex ) );

				}

				return Promise.all( pending );

			},

			createMaterial: function ( params ) {

				// setup material properties based on MeshStandardMaterial for Specular-Glossiness

				var material = new THREE.ShaderMaterial( {
					defines: params.defines,
					vertexShader: params.vertexShader,
					fragmentShader: params.fragmentShader,
					uniforms: params.uniforms,
					fog: true,
					lights: true,
					opacity: params.opacity,
					transparent: params.transparent
				} );

				material.isGLTFSpecularGlossinessMaterial = true;

				material.color = params.color;

				material.map = params.map === undefined ? null : params.map;

				material.lightMap = null;
				material.lightMapIntensity = 1.0;

				material.aoMap = params.aoMap === undefined ? null : params.aoMap;
				material.aoMapIntensity = 1.0;

				material.emissive = params.emissive;
				material.emissiveIntensity = 1.0;
				material.emissiveMap = params.emissiveMap === undefined ? null : params.emissiveMap;

				material.bumpMap = params.bumpMap === undefined ? null : params.bumpMap;
				material.bumpScale = 1;

				material.normalMap = params.normalMap === undefined ? null : params.normalMap;
				if ( params.normalScale ) material.normalScale = params.normalScale;

				material.displacementMap = null;
				material.displacementScale = 1;
				material.displacementBias = 0;

				material.specularMap = params.specularMap === undefined ? null : params.specularMap;
				material.specular = params.specular;

				material.glossinessMap = params.glossinessMap === undefined ? null : params.glossinessMap;
				material.glossiness = params.glossiness;

				material.alphaMap = null;

				material.envMap = params.envMap === undefined ? null : params.envMap;
				material.envMapIntensity = 1.0;

				material.refractionRatio = 0.98;

				material.extensions.derivatives = true;

				return material;

			},

			/**
			 * Clones a GLTFSpecularGlossinessMaterial instance. The ShaderMaterial.copy() method can
			 * copy only properties it knows about or inherits, and misses many properties that would
			 * normally be defined by MeshStandardMaterial.
			 *
			 * This method allows GLTFSpecularGlossinessMaterials to be cloned in the process of
			 * loading a glTF model, but cloning later (e.g. by the user) would require these changes
			 * AND also updating `.onBeforeRender` on the parent mesh.
			 *
			 * @param  {THREE.ShaderMaterial} source
			 * @return {THREE.ShaderMaterial}
			 */
			cloneMaterial: function ( source ) {

				var target = source.clone();

				target.isGLTFSpecularGlossinessMaterial = true;

				var params = this.specularGlossinessParams;

				for ( var i = 0, il = params.length; i < il; i ++ ) {

					target[ params[ i ] ] = source[ params[ i ] ];

				}

				return target;

			},

			// Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
			refreshUniforms: function ( renderer, scene, camera, geometry, material, group ) {

				if ( material.isGLTFSpecularGlossinessMaterial !== true ) {

					return;

				}

				var uniforms = material.uniforms;
				var defines = material.defines;

				uniforms.opacity.value = material.opacity;

				uniforms.diffuse.value.copy( material.color );
				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

				uniforms.map.value = material.map;
				uniforms.specularMap.value = material.specularMap;
				uniforms.alphaMap.value = material.alphaMap;

				uniforms.lightMap.value = material.lightMap;
				uniforms.lightMapIntensity.value = material.lightMapIntensity;

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

				// uv repeat and offset setting priorities
				// 1. color map
				// 2. specular map
				// 3. normal map
				// 4. bump map
				// 5. alpha map
				// 6. emissive map

				var uvScaleMap;

				if ( material.map ) {

					uvScaleMap = material.map;

				} else if ( material.specularMap ) {

					uvScaleMap = material.specularMap;

				} else if ( material.displacementMap ) {

					uvScaleMap = material.displacementMap;

				} else if ( material.normalMap ) {

					uvScaleMap = material.normalMap;

				} else if ( material.bumpMap ) {

					uvScaleMap = material.bumpMap;

				} else if ( material.glossinessMap ) {

					uvScaleMap = material.glossinessMap;

				} else if ( material.alphaMap ) {

					uvScaleMap = material.alphaMap;

				} else if ( material.emissiveMap ) {

					uvScaleMap = material.emissiveMap;

				}

				if ( uvScaleMap !== undefined ) {

					// backwards compatibility
					if ( uvScaleMap.isWebGLRenderTarget ) {

						uvScaleMap = uvScaleMap.texture;

					}

					var offset;
					var repeat;

					if ( uvScaleMap.matrix !== undefined ) {

						// > r88.

						if ( uvScaleMap.matrixAutoUpdate === true ) {

							offset = uvScaleMap.offset;
							repeat = uvScaleMap.repeat;
							var rotation = uvScaleMap.rotation;
							var center = uvScaleMap.center;

							uvScaleMap.matrix.setUvTransform( offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y );

						}

						uniforms.uvTransform.value.copy( uvScaleMap.matrix );

					} else {

						// <= r87. Remove when reasonable.

						offset = uvScaleMap.offset;
						repeat = uvScaleMap.repeat;

						uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

					}

				}

				uniforms.envMap.value = material.envMap;
				uniforms.envMapIntensity.value = material.envMapIntensity;
				uniforms.flipEnvMap.value = ( material.envMap && material.envMap.isCubeTexture ) ? - 1 : 1;

				uniforms.refractionRatio.value = material.refractionRatio;

				uniforms.specular.value.copy( material.specular );
				uniforms.glossiness.value = material.glossiness;

				uniforms.glossinessMap.value = material.glossinessMap;

				uniforms.emissiveMap.value = material.emissiveMap;
				uniforms.bumpMap.value = material.bumpMap;
				uniforms.normalMap.value = material.normalMap;

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

				if ( uniforms.glossinessMap.value !== null && defines.USE_GLOSSINESSMAP === undefined ) {

					defines.USE_GLOSSINESSMAP = '';
					// set USE_ROUGHNESSMAP to enable vUv
					defines.USE_ROUGHNESSMAP = '';

				}

				if ( uniforms.glossinessMap.value === null && defines.USE_GLOSSINESSMAP !== undefined ) {

					delete defines.USE_GLOSSINESSMAP;
					delete defines.USE_ROUGHNESSMAP;

				}

			}

		};

	}

	/*********************************/
	/********** INTERPOLATION ********/
	/*********************************/

	// Spline Interpolation
	// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
	function GLTFCubicSplineInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		THREE.Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	};

	GLTFCubicSplineInterpolant.prototype = Object.create( THREE.Interpolant.prototype );
	GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;

	GLTFCubicSplineInterpolant.prototype.interpolate_ = function ( i1, t0, t, t1 ) {

		var result = this.resultBuffer;
		var values = this.sampleValues;
		var stride = this.valueSize;

		var stride2 = stride * 2;
		var stride3 = stride * 3;

		var td = t1 - t0;

		var p = ( t - t0 ) / td;
		var pp = p * p;
		var ppp = pp * p;

		var offset1 = i1 * stride3;
		var offset0 = offset1 - stride3;

		var s0 = 2 * ppp - 3 * pp + 1;
		var s1 = ppp - 2 * pp + p;
		var s2 = - 2 * ppp + 3 * pp;
		var s3 = ppp - pp;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( var i = 0; i !== stride; i ++ ) {

			var p0 = values[ offset0 + i + stride ];        // splineVertex_k
			var m0 = values[ offset0 + i + stride2 ] * td;  // outTangent_k * (t_k+1 - t_k)
			var p1 = values[ offset1 + i + stride ];        // splineVertex_k+1
			var m1 = values[ offset1 + i ] * td;            // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	};

	/*********************************/
	/********** INTERNALS ************/
	/*********************************/

	/* CONSTANTS */

	var WEBGL_CONSTANTS = {
		FLOAT: 5126,
		//FLOAT_MAT2: 35674,
		FLOAT_MAT3: 35675,
		FLOAT_MAT4: 35676,
		FLOAT_VEC2: 35664,
		FLOAT_VEC3: 35665,
		FLOAT_VEC4: 35666,
		LINEAR: 9729,
		REPEAT: 10497,
		SAMPLER_2D: 35678,
		POINTS: 0,
		LINES: 1,
		LINE_LOOP: 2,
		LINE_STRIP: 3,
		TRIANGLES: 4,
		TRIANGLE_STRIP: 5,
		TRIANGLE_FAN: 6,
		UNSIGNED_BYTE: 5121,
		UNSIGNED_SHORT: 5123
	};

	var WEBGL_TYPE = {
		5126: Number,
		//35674: THREE.Matrix2,
		35675: THREE.Matrix3,
		35676: THREE.Matrix4,
		35664: THREE.Vector2,
		35665: THREE.Vector3,
		35666: THREE.Vector4,
		35678: THREE.Texture
	};

	var WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};

	var WEBGL_FILTERS = {
		9728: THREE.NearestFilter,
		9729: THREE.LinearFilter,
		9984: THREE.NearestMipMapNearestFilter,
		9985: THREE.LinearMipMapNearestFilter,
		9986: THREE.NearestMipMapLinearFilter,
		9987: THREE.LinearMipMapLinearFilter
	};

	var WEBGL_WRAPPINGS = {
		33071: THREE.ClampToEdgeWrapping,
		33648: THREE.MirroredRepeatWrapping,
		10497: THREE.RepeatWrapping
	};

	var WEBGL_TEXTURE_FORMATS = {
		6406: THREE.AlphaFormat,
		6407: THREE.RGBFormat,
		6408: THREE.RGBAFormat,
		6409: THREE.LuminanceFormat,
		6410: THREE.LuminanceAlphaFormat
	};

	var WEBGL_TEXTURE_DATATYPES = {
		5121: THREE.UnsignedByteType,
		32819: THREE.UnsignedShort4444Type,
		32820: THREE.UnsignedShort5551Type,
		33635: THREE.UnsignedShort565Type
	};

	var WEBGL_SIDES = {
		1028: THREE.BackSide, // Culling front
		1029: THREE.FrontSide // Culling back
		//1032: THREE.NoSide   // Culling front and back, what to do?
	};

	var WEBGL_DEPTH_FUNCS = {
		512: THREE.NeverDepth,
		513: THREE.LessDepth,
		514: THREE.EqualDepth,
		515: THREE.LessEqualDepth,
		516: THREE.GreaterEqualDepth,
		517: THREE.NotEqualDepth,
		518: THREE.GreaterEqualDepth,
		519: THREE.AlwaysDepth
	};

	var WEBGL_BLEND_EQUATIONS = {
		32774: THREE.AddEquation,
		32778: THREE.SubtractEquation,
		32779: THREE.ReverseSubtractEquation
	};

	var WEBGL_BLEND_FUNCS = {
		0: THREE.ZeroFactor,
		1: THREE.OneFactor,
		768: THREE.SrcColorFactor,
		769: THREE.OneMinusSrcColorFactor,
		770: THREE.SrcAlphaFactor,
		771: THREE.OneMinusSrcAlphaFactor,
		772: THREE.DstAlphaFactor,
		773: THREE.OneMinusDstAlphaFactor,
		774: THREE.DstColorFactor,
		775: THREE.OneMinusDstColorFactor,
		776: THREE.SrcAlphaSaturateFactor
		// The followings are not supported by Three.js yet
		//32769: CONSTANT_COLOR,
		//32770: ONE_MINUS_CONSTANT_COLOR,
		//32771: CONSTANT_ALPHA,
		//32772: ONE_MINUS_CONSTANT_COLOR
	};

	var WEBGL_TYPE_SIZES = {
		'SCALAR': 1,
		'VEC2': 2,
		'VEC3': 3,
		'VEC4': 4,
		'MAT2': 4,
		'MAT3': 9,
		'MAT4': 16
	};

	var ATTRIBUTES = {
		POSITION: 'position',
		NORMAL: 'normal',
		TEXCOORD_0: 'uv',
		TEXCOORD0: 'uv', // deprecated
		TEXCOORD: 'uv', // deprecated
		TEXCOORD_1: 'uv2',
		COLOR_0: 'color',
		COLOR0: 'color', // deprecated
		COLOR: 'color', // deprecated
		WEIGHTS_0: 'skinWeight',
		WEIGHT: 'skinWeight', // deprecated
		JOINTS_0: 'skinIndex',
		JOINT: 'skinIndex' // deprecated
	}

	var PATH_PROPERTIES = {
		scale: 'scale',
		translation: 'position',
		rotation: 'quaternion',
		weights: 'morphTargetInfluences'
	};

	var INTERPOLATION = {
		CUBICSPLINE: THREE.InterpolateSmooth, // We use custom interpolation GLTFCubicSplineInterpolation for CUBICSPLINE.
		                                      // KeyframeTrack.optimize() can't handle glTF Cubic Spline output values layout,
		                                      // using THREE.InterpolateSmooth for KeyframeTrack instantiation to prevent optimization.
		                                      // See KeyframeTrack.optimize() for the detail.
		LINEAR: THREE.InterpolateLinear,
		STEP: THREE.InterpolateDiscrete
	};

	var STATES_ENABLES = {
		2884: 'CULL_FACE',
		2929: 'DEPTH_TEST',
		3042: 'BLEND',
		3089: 'SCISSOR_TEST',
		32823: 'POLYGON_OFFSET_FILL',
		32926: 'SAMPLE_ALPHA_TO_COVERAGE'
	};

	var ALPHA_MODES = {
		OPAQUE: 'OPAQUE',
		MASK: 'MASK',
		BLEND: 'BLEND'
	};

	/* UTILITY FUNCTIONS */

	function resolveURL( url, path ) {

		// Invalid URL
		if ( typeof url !== 'string' || url === '' ) return '';

		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) return url;

		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) return url;

		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) return url;

		// Relative URL
		return path + url;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
	 */
	function createDefaultMaterial() {

		return new THREE.MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: THREE.FrontSide
		} );

	}

	function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

		// Add unknown glTF extensions to an object's userData.

		for ( var name in objectDef.extensions ) {

			if ( knownExtensions[ name ] === undefined ) {

				object.userData.gltfExtensions = object.userData.gltfExtensions || {};
				object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

			}

		}

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
	 *
	 * @param {THREE.Geometry} geometry
	 * @param {Array<GLTF.Target>} targets
	 * @param {Array<THREE.BufferAttribute>} accessors
	 */
	function addMorphTargets( geometry, targets, accessors ) {

		var hasMorphPosition = false;
		var hasMorphNormal = false;

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];

			if ( target.POSITION !== undefined ) hasMorphPosition = true;
			if ( target.NORMAL !== undefined ) hasMorphNormal = true;

			if ( hasMorphPosition && hasMorphNormal ) break;

		}

		if ( ! hasMorphPosition && ! hasMorphNormal ) return;

		var morphPositions = [];
		var morphNormals = [];

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];
			var attributeName = 'morphTarget' + i;

			if ( hasMorphPosition ) {

				// Three.js morph position is absolute value. The formula is
				//   basePosition
				//     + weight0 * ( morphPosition0 - basePosition )
				//     + weight1 * ( morphPosition1 - basePosition )
				//     ...
				// while the glTF one is relative
				//   basePosition
				//     + weight0 * glTFmorphPosition0
				//     + weight1 * glTFmorphPosition1
				//     ...
				// then we need to convert from relative to absolute here.

				if ( target.POSITION !== undefined ) {

					// Cloning not to pollute original accessor
					var positionAttribute = cloneBufferAttribute( accessors[ target.POSITION ] );
					positionAttribute.name = attributeName;

					var position = geometry.attributes.position;

					for ( var j = 0, jl = positionAttribute.count; j < jl; j ++ ) {

						positionAttribute.setXYZ(
							j,
							positionAttribute.getX( j ) + position.getX( j ),
							positionAttribute.getY( j ) + position.getY( j ),
							positionAttribute.getZ( j ) + position.getZ( j )
						);

					}

				} else {

					positionAttribute = geometry.attributes.position;

				}

				morphPositions.push( positionAttribute );

			}

			if ( hasMorphNormal ) {

				// see target.POSITION's comment

				var normalAttribute;

				if ( target.NORMAL !== undefined ) {

					var normalAttribute = cloneBufferAttribute( accessors[ target.NORMAL ] );
					normalAttribute.name = attributeName;

					var normal = geometry.attributes.normal;

					for ( var j = 0, jl = normalAttribute.count; j < jl; j ++ ) {

						normalAttribute.setXYZ(
							j,
							normalAttribute.getX( j ) + normal.getX( j ),
							normalAttribute.getY( j ) + normal.getY( j ),
							normalAttribute.getZ( j ) + normal.getZ( j )
						);

					}

				} else {

					normalAttribute = geometry.attributes.normal;

				}

				morphNormals.push( normalAttribute );

			}

		}

		if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
		if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;

	}

	/**
	 * @param {THREE.Mesh} mesh
	 * @param {GLTF.Mesh} meshDef
	 */
	function updateMorphTargets( mesh, meshDef ) {

		mesh.updateMorphTargets();

		if ( meshDef.weights !== undefined ) {

			for ( var i = 0, il = meshDef.weights.length; i < il; i ++ ) {

				mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

			}

		}

		// .extras has user-defined data, so check that .extras.targetNames is an array.
		if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

			var targetNames = meshDef.extras.targetNames;

			if ( mesh.morphTargetInfluences.length === targetNames.length ) {

				mesh.morphTargetDictionary = {};

				for ( var i = 0, il = targetNames.length; i < il; i ++ ) {

					mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

				}

			} else {

				console.warn( 'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

			}

		}

	}

	function isPrimitiveEqual( a, b ) {

		if ( a.indices !== b.indices ) {

			return false;

		}

		return isObjectEqual( a.attributes, b.attributes );

	}

	function isObjectEqual( a, b ) {

		if ( Object.keys( a ).length !== Object.keys( b ).length ) return false;

		for ( var key in a ) {

			if ( a[ key ] !== b[ key ] ) return false;

		}

		return true;

	}

	function isArrayEqual( a, b ) {

		if ( a.length !== b.length ) return false;

		for ( var i = 0, il = a.length; i < il; i ++ ) {

			if ( a[ i ] !== b[ i ] ) return false;

		}

		return true;

	}

	function getCachedGeometry( cache, newPrimitive ) {

		for ( var i = 0, il = cache.length; i < il; i ++ ) {

			var cached = cache[ i ];

			if ( isPrimitiveEqual( cached.primitive, newPrimitive ) ) return cached.promise;

		}

		return null;

	}

	function getCachedCombinedGeometry( cache, geometries ) {

		for ( var i = 0, il = cache.length; i < il; i ++ ) {

			var cached = cache[ i ];

			if ( isArrayEqual( geometries, cached.baseGeometries ) ) return cached.geometry;

		}

		return null;

	}

	function getCachedMultiPassGeometry( cache, geometry, primitives ) {

		for ( var i = 0, il = cache.length; i < il; i ++ ) {

			var cached = cache[ i ];

			if ( geometry === cached.baseGeometry && isArrayEqual( primitives, cached.primitives ) ) return cached.geometry;

		}

		return null;

	}

	function cloneBufferAttribute( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) {

			var count = attribute.count;
			var itemSize = attribute.itemSize;
			var array = attribute.array.slice( 0, count * itemSize );

			for ( var i = 0; i < count; ++ i ) {

				array[ i ] = attribute.getX( i );
				if ( itemSize >= 2 ) array[ i + 1 ] = attribute.getY( i );
				if ( itemSize >= 3 ) array[ i + 2 ] = attribute.getZ( i );
				if ( itemSize >= 4 ) array[ i + 3 ] = attribute.getW( i );

			}

			return new THREE.BufferAttribute( array, itemSize, attribute.normalized );

		}

		return attribute.clone();

	}

	/**
	 * Checks if we can build a single Mesh with MultiMaterial from multiple primitives.
	 * Returns true if all primitives use the same attributes/morphAttributes/mode
	 * and also have index. Otherwise returns false.
	 *
	 * @param {Array<GLTF.Primitive>} primitives
	 * @return {Boolean}
	 */
	function isMultiPassGeometry( primitives ) {

		if ( primitives.length < 2 ) return false;

		var primitive0 = primitives[ 0 ];
		var targets0 = primitive0.targets || [];

		if ( primitive0.indices === undefined ) return false;

		for ( var i = 1, il = primitives.length; i < il; i ++ ) {

			var primitive = primitives[ i ];

			if ( primitive0.mode !== primitive.mode ) return false;
			if ( primitive.indices === undefined ) return false;
			if ( ! isObjectEqual( primitive0.attributes, primitive.attributes ) ) return false;

			var targets = primitive.targets || [];

			if ( targets0.length !== targets.length ) return false;

			for ( var j = 0, jl = targets0.length; j < jl; j ++ ) {

				if ( ! isObjectEqual( targets0[ j ], targets[ j ] ) ) return false;

			}

		}

		return true;

	}

	/* GLTF PARSER */

	function GLTFParser( json, extensions, options ) {

		this.json = json || {};
		this.extensions = extensions || {};
		this.options = options || {};

		// loader object cache
		this.cache = new GLTFRegistry();

		// BufferGeometry caching
		this.primitiveCache = [];
		this.multiplePrimitivesCache = [];
		this.multiPassGeometryCache = []

		this.textureLoader = new THREE.TextureLoader( this.options.manager );
		this.textureLoader.setCrossOrigin( this.options.crossOrigin );

		this.fileLoader = new THREE.FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

	}

	GLTFParser.prototype.parse = function ( onLoad, onError ) {

		var json = this.json;

		// Clear the loader cache
		this.cache.removeAll();

		// Mark the special nodes/meshes in json for efficient parse
		this.markDefs();

		// Fire the callback on complete
		this.getMultiDependencies( [

			'scene',
			'animation',
			'camera'

		] ).then( function ( dependencies ) {

			var scenes = dependencies.scenes || [];
			var scene = scenes[ json.scene || 0 ];
			var animations = dependencies.animations || [];
			var cameras = dependencies.cameras || [];

			onLoad( scene, scenes, cameras, animations, json );

		} ).catch( onError );

	};

	/**
	 * Marks the special nodes/meshes in json for efficient parse.
	 */
	GLTFParser.prototype.markDefs = function () {

		var nodeDefs = this.json.nodes || [];
		var skinDefs = this.json.skins || [];
		var meshDefs = this.json.meshes || [];

		var meshReferences = {};
		var meshUses = {};

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			var joints = skinDefs[ skinIndex ].joints;

			for ( var i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
		// avoid having more than one THREE.Mesh with the same name, count
		// references and rename instances below.
		//
		// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
		for ( var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			var nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				if ( meshReferences[ nodeDef.mesh ] === undefined ) {

					meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

				}

				meshReferences[ nodeDef.mesh ] ++;

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

		}

		this.json.meshReferences = meshReferences;
		this.json.meshUses = meshUses;

	};

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object>}
	 */
	GLTFParser.prototype.getDependency = function ( type, index ) {

		var cacheKey = type + ':' + index;
		var dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			switch ( type ) {

				case 'scene':
					dependency = this.loadScene( index );
					break;

				case 'node':
					dependency = this.loadNode( index );
					break;

				case 'mesh':
					dependency = this.loadMesh( index );
					break;

				case 'accessor':
					dependency = this.loadAccessor( index );
					break;

				case 'bufferView':
					dependency = this.loadBufferView( index );
					break;

				case 'buffer':
					dependency = this.loadBuffer( index );
					break;

				case 'material':
					dependency = this.loadMaterial( index );
					break;

				case 'texture':
					dependency = this.loadTexture( index );
					break;

				case 'skin':
					dependency = this.loadSkin( index );
					break;

				case 'animation':
					dependency = this.loadAnimation( index );
					break;

				case 'camera':
					dependency = this.loadCamera( index );
					break;

				default:
					throw new Error( 'Unknown type: ' + type );

			}

			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	};

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	GLTFParser.prototype.getDependencies = function ( type ) {

		var dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			var parser = this;
			var defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	};

	/**
	 * Requests all multiple dependencies of the specified types asynchronously, with caching.
	 * @param {Array<string>} types
	 * @return {Promise<Object<Array<Object>>>}
	 */
	GLTFParser.prototype.getMultiDependencies = function ( types ) {

		var results = {};
		var pendings = [];

		for ( var i = 0, il = types.length; i < il; i ++ ) {

			var type = types[ i ];
			var value = this.getDependencies( type );

			value = value.then( function ( key, value ) {

				results[ key ] = value;

			}.bind( this, type + ( type === 'mesh' ? 'es' : 's' ) ) );

			pendings.push( value );

		}

		return Promise.all( pendings ).then( function () {

			return results;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBuffer = function ( bufferIndex ) {

		var bufferDef = this.json.buffers[ bufferIndex ];
		var loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		var options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

		var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			var byteLength = bufferViewDef.byteLength || 0;
			var byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
	 * @param {number} accessorIndex
	 * @return {Promise<THREE.BufferAttribute|THREE.InterleavedBufferAttribute>}
	 */
	GLTFParser.prototype.loadAccessor = function ( accessorIndex ) {

		var parser = this;
		var json = this.json;

		var accessorDef = this.json.accessors[ accessorIndex ];

		if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

			// Ignore empty accessors, which may be used to declare runtime
			// information about attributes coming from another source (e.g. Draco
			// compression extension).
			return null;

		}

		var pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			var bufferView = bufferViews[ 0 ];

			var itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			var TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			var elementBytes = TypedArray.BYTES_PER_ELEMENT;
			var itemBytes = elementBytes * itemSize;
			var byteOffset = accessorDef.byteOffset || 0;
			var byteStride = json.bufferViews[ accessorDef.bufferView ].byteStride;
			var normalized = accessorDef.normalized === true;
			var array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType;
				var ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					// Use the full buffer if it's interleaved.
					array = new TypedArray( bufferView );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new THREE.InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new THREE.InterleavedBufferAttribute( ib, itemSize, byteOffset / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new THREE.BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				var TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				var sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				var sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute.setArray( bufferAttribute.array.slice() );

				}

				for ( var i = 0, il = sparseIndices.length; i < il; i ++ ) {

					var index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

			}

			return bufferAttribute;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<THREE.Texture>}
	 */
	GLTFParser.prototype.loadTexture = function ( textureIndex ) {

		var parser = this;
		var json = this.json;
		var options = this.options;
		var textureLoader = this.textureLoader;

		var URL = window.URL || window.webkitURL;

		var textureDef = json.textures[ textureIndex ];

		var textureExtensions = textureDef.extensions || {};

		var source;

		if ( textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] ) {

			source = json.images[ textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].source ];

		} else {

			source = json.images[ textureDef.source ];

		}

		var sourceURI = source.uri;
		var isObjectURL = false;

		if ( source.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', source.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				var blob = new Blob( [ bufferView ], { type: source.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		}

		return Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			// Load Texture resource.

			var loader = THREE.Loader.Handlers.get( sourceURI );

			if ( ! loader ) {

				loader = textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ]
					? parser.extensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].ddsLoader
					: textureLoader;

			}

			return new Promise( function ( resolve, reject ) {

				loader.load( resolveURL( sourceURI, options.path ), resolve, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			texture.flipY = false;

			if ( textureDef.name !== undefined ) texture.name = textureDef.name;

			// .format of dds texture is set in DDSLoader
			if ( ! textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] ) {

				texture.format = textureDef.format !== undefined ? WEBGL_TEXTURE_FORMATS[ textureDef.format ] : THREE.RGBAFormat;

			}

			if ( textureDef.internalFormat !== undefined && texture.format !== WEBGL_TEXTURE_FORMATS[ textureDef.internalFormat ] ) {

				console.warn( 'THREE.GLTFLoader: Three.js does not support texture internalFormat which is different from texture format. ' +
											'internalFormat will be forced to be the same value as format.' );

			}

			texture.type = textureDef.type !== undefined ? WEBGL_TEXTURE_DATATYPES[ textureDef.type ] : THREE.UnsignedByteType;

			var samplers = json.samplers || {};
			var sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || THREE.LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || THREE.LinearMipMapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || THREE.RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || THREE.RepeatWrapping;

			return texture;

		} );

	};

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} textureName
	 * @param {number} textureIndex
	 * @return {Promise}
	 */
	GLTFParser.prototype.assignTexture = function ( materialParams, textureName, textureIndex ) {

		return this.getDependency( 'texture', textureIndex ).then( function ( texture ) {

			materialParams[ textureName ] = texture;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @param {number} materialIndex
	 * @return {Promise<THREE.Material>}
	 */
	GLTFParser.prototype.loadMaterial = function ( materialIndex ) {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;
		var materialDef = this.json.materials[ materialIndex ];

		var materialType;
		var materialParams = {};
		var materialExtensions = materialDef.extensions || {};

		var pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

			var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
			materialType = sgExtension.getMaterialType( materialDef );
			pending.push( sgExtension.extendParams( materialParams, materialDef, parser ) );

		} else if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

			var kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
			materialType = kmuExtension.getMaterialType( materialDef );
			pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

		} else {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			materialType = THREE.MeshStandardMaterial;

			var metallicRoughness = materialDef.pbrMetallicRoughness || {};

			materialParams.color = new THREE.Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				var array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				var textureIndex = metallicRoughness.metallicRoughnessTexture.index;
				pending.push( parser.assignTexture( materialParams, 'metalnessMap', textureIndex ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', textureIndex ) );

			}

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = THREE.DoubleSide;

		}

		var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture.index ) );

			materialParams.normalScale = new THREE.Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				materialParams.normalScale.set( materialDef.normalTexture.scale, materialDef.normalTexture.scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture.index ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined && materialType !== THREE.MeshBasicMaterial) {

			materialParams.emissive = new THREE.Color().fromArray( materialDef.emissiveFactor );

		}

		if ( materialDef.emissiveTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

			pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture.index ) );

		}

		return Promise.all( pending ).then( function () {

			var material;

			if ( materialType === THREE.ShaderMaterial ) {

				material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

			} else {

				material = new materialType( materialParams );

			}

			if ( materialDef.name !== undefined ) material.name = materialDef.name;

			// Normal map textures use OpenGL conventions:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#materialnormaltexture
			if ( material.normalScale ) {

				material.normalScale.y = - material.normalScale.y;

			}

			// baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.
			if ( material.map ) material.map.encoding = THREE.sRGBEncoding;
			if ( material.emissiveMap ) material.emissiveMap.encoding = THREE.sRGBEncoding;
			if ( material.specularMap ) material.specularMap.encoding = THREE.sRGBEncoding;

			if ( materialDef.extras ) material.userData = materialDef.extras;

			if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

			return material;

		} );

	};

	/**
	 * @param  {THREE.BufferGeometry} geometry
	 * @param  {GLTF.Primitive} primitiveDef
	 * @param  {Array<THREE.BufferAttribute>} accessors
	 */
	function addPrimitiveAttributes( geometry, primitiveDef, accessors ) {

		var attributes = primitiveDef.attributes;

		for ( var gltfAttributeName in attributes ) {

			var threeAttributeName = ATTRIBUTES[ gltfAttributeName ];
			var bufferAttribute = accessors[ attributes[ gltfAttributeName ] ];

			// Skip attributes already provided by e.g. Draco extension.
			if ( !threeAttributeName ) continue;
			if ( threeAttributeName in geometry.attributes ) continue;

			geometry.addAttribute( threeAttributeName, bufferAttribute );

		}

		if ( primitiveDef.indices !== undefined && ! geometry.index ) {

			geometry.setIndex( accessors[ primitiveDef.indices ] );

		}

		if ( primitiveDef.targets !== undefined ) {

			addMorphTargets( geometry, primitiveDef.targets, accessors );

		}

		if ( primitiveDef.extras !== undefined ) {

			geometry.userData = primitiveDef.extras;

		}

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
	 *
	 * Creates BufferGeometries from primitives.
	 * If we can build a single BufferGeometry with .groups from multiple primitives, returns one BufferGeometry.
	 * Otherwise, returns BufferGeometries without .groups as many as primitives.
	 *
	 * @param {Array<Object>} primitives
	 * @return {Promise<Array<THREE.BufferGeometry>>}
	 */
	GLTFParser.prototype.loadGeometries = function ( primitives ) {

		var parser = this;
		var extensions = this.extensions;
		var cache = this.primitiveCache;

		var isMultiPass = isMultiPassGeometry( primitives );
		var originalPrimitives;

		if ( isMultiPass ) {

			originalPrimitives = primitives; // save original primitives and use later

			// We build a single BufferGeometry with .groups from multiple primitives
			// because all primitives share the same attributes/morph/mode and have indices.

			primitives = [ primitives[ 0 ] ];

			// Sets .groups and combined indices to a geometry later in this method.

		}

		return this.getDependencies( 'accessor' ).then( function ( accessors ) {

			var pending = [];

			for ( var i = 0, il = primitives.length; i < il; i ++ ) {

				var primitive = primitives[ i ];

				// See if we've already created this geometry
				var cached = getCachedGeometry( cache, primitive );

				if ( cached ) {

					// Use the cached geometry if it exists
					pending.push( cached );

				} else if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

					// Use DRACO geometry if available
					var geometryPromise = extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
						.decodePrimitive( primitive, parser )
						.then( function ( geometry ) {

							addPrimitiveAttributes( geometry, primitive, accessors );

							return geometry;

						} );

					cache.push( { primitive: primitive, promise: geometryPromise } );

					pending.push( geometryPromise );

				} else {

					// Otherwise create a new geometry
					var geometry = new THREE.BufferGeometry();

					addPrimitiveAttributes( geometry, primitive, accessors );

					var geometryPromise = Promise.resolve( geometry );

					// Cache this geometry
					cache.push( { primitive: primitive, promise: geometryPromise } );

					pending.push( geometryPromise );

				}

			}

			return Promise.all( pending ).then( function ( geometries ) {

				if ( isMultiPass ) {

					var baseGeometry = geometries[ 0 ];

					// See if we've already created this combined geometry
					var cache = parser.multiPassGeometryCache;
					var cached = getCachedMultiPassGeometry( cache, baseGeometry, originalPrimitives );

					if ( cached !== null ) return [ cached.geometry ];

					// Cloning geometry because of index override.
					// Attributes can be reused so cloning by myself here.
					var geometry = new THREE.BufferGeometry();

					geometry.name = baseGeometry.name;
					geometry.userData = baseGeometry.userData;

					for ( var key in baseGeometry.attributes ) geometry.addAttribute( key, baseGeometry.attributes[ key ] );
					for ( var key in baseGeometry.morphAttributes ) geometry.morphAttributes[ key ] = baseGeometry.morphAttributes[ key ];

					var indices = [];
					var offset = 0;

					for ( var i = 0, il = originalPrimitives.length; i < il; i ++ ) {

						var accessor = accessors[ originalPrimitives[ i ].indices ];

						for ( var j = 0, jl = accessor.count; j < jl; j ++ ) indices.push( accessor.array[ j ] );

						geometry.addGroup( offset, accessor.count, i );

						offset += accessor.count;

					}

					geometry.setIndex( indices );

					cache.push( { geometry: geometry, baseGeometry: baseGeometry, primitives: originalPrimitives } );

					return [ geometry ];

				} else if ( geometries.length > 1 && THREE.BufferGeometryUtils !== undefined ) {

					// Tries to merge geometries with BufferGeometryUtils if possible

					for ( var i = 1, il = primitives.length; i < il; i ++ ) {

						// can't merge if draw mode is different
						if ( primitives[ 0 ].mode !== primitives[ i ].mode ) return geometries;

					}

					// See if we've already created this combined geometry
					var cache = parser.multiplePrimitivesCache;
					var cached = getCachedCombinedGeometry( cache, geometries );

					if ( cached ) {

						if ( cached.geometry !== null ) return [ cached.geometry ];

					} else {

						var geometry = THREE.BufferGeometryUtils.mergeBufferGeometries( geometries, true );

						cache.push( { geometry: geometry, baseGeometries: geometries } );

						if ( geometry !== null ) return [ geometry ];

					}

				}

				return geometries;

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 * @param {number} meshIndex
	 * @return {Promise<THREE.Group|THREE.Mesh|THREE.SkinnedMesh>}
	 */
	GLTFParser.prototype.loadMesh = function ( meshIndex ) {

		var scope = this;
		var json = this.json;
		var extensions = this.extensions;

		var meshDef = this.json.meshes[ meshIndex ];

		return this.getMultiDependencies( [

			'accessor',
			'material'

		] ).then( function ( dependencies ) {

			var primitives = meshDef.primitives;
			var originalMaterials = [];

			for ( var i = 0, il = primitives.length; i < il; i ++ ) {

				originalMaterials[ i ] = primitives[ i ].material === undefined
					? createDefaultMaterial()
					: dependencies.materials[ primitives[ i ].material ];

			}

			return scope.loadGeometries( primitives ).then( function ( geometries ) {

				var isMultiMaterial = geometries.length === 1 && geometries[ 0 ].groups.length > 0;

				var meshes = [];

				for ( var i = 0, il = geometries.length; i < il; i ++ ) {

					var geometry = geometries[ i ];
					var primitive = primitives[ i ];

					// 1. create Mesh

					var mesh;

					var material = isMultiMaterial ? originalMaterials : originalMaterials[ i ]

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
						primitive.mode === undefined ) {

						// .isSkinnedMesh isn't in glTF spec. See .markDefs()
						mesh = meshDef.isSkinnedMesh === true
							? new THREE.SkinnedMesh( geometry, material )
							: new THREE.Mesh( geometry, material );

						if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

							mesh.drawMode = THREE.TriangleStripDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

							mesh.drawMode = THREE.TriangleFanDrawMode;

						}

					} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

						mesh = new THREE.LineSegments( geometry, material );

					} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

						mesh = new THREE.Line( geometry, material );

					} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

						mesh = new THREE.LineLoop( geometry, material );

					} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

						mesh = new THREE.Points( geometry, material );

					} else {

						throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

					}

					if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

						updateMorphTargets( mesh, meshDef );

					}

					mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

					if ( geometries.length > 1 ) mesh.name += '_' + i;

					if ( meshDef.extras !== undefined ) mesh.userData = meshDef.extras;

					meshes.push( mesh );

					// 2. update Material depending on Mesh and BufferGeometry

					var materials = isMultiMaterial ? mesh.material : [ mesh.material ];

					var useVertexColors = geometry.attributes.color !== undefined;
					var useFlatShading = geometry.attributes.normal === undefined;
					var useSkinning = mesh.isSkinnedMesh === true;
					var useMorphTargets = Object.keys( geometry.morphAttributes ).length > 0;
					var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

					for ( var j = 0, jl = materials.length; j < jl; j ++ ) {

						var material = materials[ j ];

						if ( mesh.isPoints ) {

							var cacheKey = 'PointsMaterial:' + material.uuid;

							var pointsMaterial = scope.cache.get( cacheKey );

							if ( ! pointsMaterial ) {

								pointsMaterial = new THREE.PointsMaterial();
								THREE.Material.prototype.copy.call( pointsMaterial, material );
								pointsMaterial.color.copy( material.color );
								pointsMaterial.map = material.map;
								pointsMaterial.lights = false;  // PointsMaterial doesn't support lights yet

								scope.cache.add( cacheKey, pointsMaterial );

							}

							material = pointsMaterial;

						} else if ( mesh.isLine ) {

							var cacheKey = 'LineBasicMaterial:' + material.uuid;

							var lineMaterial = scope.cache.get( cacheKey );

							if ( ! lineMaterial ) {

								lineMaterial = new THREE.LineBasicMaterial();
								THREE.Material.prototype.copy.call( lineMaterial, material );
								lineMaterial.color.copy( material.color );
								lineMaterial.lights = false;  // LineBasicMaterial doesn't support lights yet

								scope.cache.add( cacheKey, lineMaterial );

							}

							material = lineMaterial;

						}

						// Clone the material if it will be modified
						if ( useVertexColors || useFlatShading || useSkinning || useMorphTargets ) {

							var cacheKey = 'ClonedMaterial:' + material.uuid + ':';

							if ( material.isGLTFSpecularGlossinessMaterial ) cacheKey += 'specular-glossiness:';
							if ( useSkinning ) cacheKey += 'skinning:';
							if ( useVertexColors ) cacheKey += 'vertex-colors:';
							if ( useFlatShading ) cacheKey += 'flat-shading:';
							if ( useMorphTargets ) cacheKey += 'morph-targets:';
							if ( useMorphNormals ) cacheKey += 'morph-normals:';

							var cachedMaterial = scope.cache.get( cacheKey );

							if ( ! cachedMaterial ) {

								cachedMaterial = material.isGLTFSpecularGlossinessMaterial
										? extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].cloneMaterial( material )
										: material.clone();

								if ( useSkinning ) cachedMaterial.skinning = true;
								if ( useVertexColors ) cachedMaterial.vertexColors = THREE.VertexColors;
								if ( useFlatShading ) cachedMaterial.flatShading = true;
								if ( useMorphTargets ) cachedMaterial.morphTargets = true;
								if ( useMorphNormals ) cachedMaterial.morphNormals = true;

								scope.cache.add( cacheKey, cachedMaterial );

							}

							material = cachedMaterial;

						}

						materials[ j ] = material;

						// workarounds for mesh and geometry

						if ( material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined ) {

							console.log( 'THREE.GLTFLoader: Duplicating UVs to support aoMap.' );
							geometry.addAttribute( 'uv2', new THREE.BufferAttribute( geometry.attributes.uv.array, 2 ) );

						}

						if ( material.isGLTFSpecularGlossinessMaterial ) {

							// for GLTFSpecularGlossinessMaterial(ShaderMaterial) uniforms runtime update
							mesh.onBeforeRender = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].refreshUniforms;

						}

					}

					mesh.material = isMultiMaterial ? materials : materials[ 0 ];

				}

				if ( meshes.length === 1 ) {

					return meshes[ 0 ];

				}

				var group = new THREE.Group();

				for ( var i = 0, il = meshes.length; i < il; i ++ ) {

					group.add( meshes[ i ] );

				}

				return group;

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<THREE.Camera>}
	 */
	GLTFParser.prototype.loadCamera = function ( cameraIndex ) {

		var camera;
		var cameraDef = this.json.cameras[ cameraIndex ];
		var params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			camera = new THREE.PerspectiveCamera( THREE.Math.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new THREE.OrthographicCamera( params.xmag / - 2, params.xmag / 2, params.ymag / 2, params.ymag / - 2, params.znear, params.zfar );

		}

		if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;
		if ( cameraDef.extras ) camera.userData = cameraDef.extras;

		return Promise.resolve( camera );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
	 * @param {number} skinIndex
	 * @return {Promise<Object>}
	 */
	GLTFParser.prototype.loadSkin = function ( skinIndex ) {

		var skinDef = this.json.skins[ skinIndex ];

		var skinEntry = { joints: skinDef.joints };

		if ( skinDef.inverseBindMatrices === undefined ) {

			return Promise.resolve( skinEntry );

		}

		return this.getDependency( 'accessor', skinDef.inverseBindMatrices ).then( function ( accessor ) {

			skinEntry.inverseBindMatrices = accessor;

			return skinEntry;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
	 * @param {number} animationIndex
	 * @return {Promise<THREE.AnimationClip>}
	 */
	GLTFParser.prototype.loadAnimation = function ( animationIndex ) {

		var json = this.json;

		var animationDef = this.json.animations[ animationIndex ];

		return this.getMultiDependencies( [

			'accessor',
			'node'

		] ).then( function ( dependencies ) {

			var tracks = [];

			for ( var i = 0, il = animationDef.channels.length; i < il; i ++ ) {

				var channel = animationDef.channels[ i ];
				var sampler = animationDef.samplers[ channel.sampler ];

				if ( sampler ) {

					var target = channel.target;
					var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
					var input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
					var output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

					var inputAccessor = dependencies.accessors[ input ];
					var outputAccessor = dependencies.accessors[ output ];

					var node = dependencies.nodes[ name ];

					if ( node ) {

						node.updateMatrix();
						node.matrixAutoUpdate = true;

						var TypedKeyframeTrack;

						switch ( PATH_PROPERTIES[ target.path ] ) {

							case PATH_PROPERTIES.weights:

								TypedKeyframeTrack = THREE.NumberKeyframeTrack;
								break;

							case PATH_PROPERTIES.rotation:

								TypedKeyframeTrack = THREE.QuaternionKeyframeTrack;
								break;

							case PATH_PROPERTIES.position:
							case PATH_PROPERTIES.scale:
							default:

								TypedKeyframeTrack = THREE.VectorKeyframeTrack;
								break;

						}

						var targetName = node.name ? node.name : node.uuid;

						var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : THREE.InterpolateLinear;

						var targetNames = [];

						if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

							// node can be THREE.Group here but
							// PATH_PROPERTIES.weights(morphTargetInfluences) should be
							// the property of a mesh object under group.

							node.traverse( function ( object ) {

								if ( object.isMesh === true && object.morphTargetInfluences ) {

									targetNames.push( object.name ? object.name : object.uuid );

								}

							} );

						} else {

							targetNames.push( targetName );

						}

						// KeyframeTrack.optimize() will modify given 'times' and 'values'
						// buffers before creating a truncated copy to keep. Because buffers may
						// be reused by other tracks, make copies here.
						for ( var j = 0, jl = targetNames.length; j < jl; j ++ ) {

							var track = new TypedKeyframeTrack(
								targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
								THREE.AnimationUtils.arraySlice( inputAccessor.array, 0 ),
								THREE.AnimationUtils.arraySlice( outputAccessor.array, 0 ),
								interpolation
							);

							// Here is the trick to enable custom interpolation.
							// Overrides .createInterpolant in a factory method which creates custom interpolation.
							if ( sampler.interpolation === 'CUBICSPLINE' ) {

								track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

									// A CUBICSPLINE keyframe in glTF has three output values for each input value,
									// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
									// must be divided by three to get the interpolant's sampleSize argument.

									return new GLTFCubicSplineInterpolant( this.times, this.values, this.getValueSize() / 3, result );

								};

								// Workaround, provide an alternate way to know if the interpolant type is cubis spline to track.
								// track.getInterpolation() doesn't return valid value for custom interpolant.
								track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

							}

							tracks.push( track );

						}

					}

				}

			}

			var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;

			return new THREE.AnimationClip( name, undefined, tracks );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
	 * @param {number} nodeIndex
	 * @return {Promise<THREE.Object3D>}
	 */
	GLTFParser.prototype.loadNode = function ( nodeIndex ) {

		var json = this.json;
		var extensions = this.extensions;

		var meshReferences = this.json.meshReferences;
		var meshUses = this.json.meshUses;

		var nodeDef = this.json.nodes[ nodeIndex ];

		return this.getMultiDependencies( [

			'mesh',
			'skin',
			'camera',
			'light'

		] ).then( function ( dependencies ) {

			var node;

			// .isBone isn't in glTF spec. See .markDefs
			if ( nodeDef.isBone === true ) {

				node = new THREE.Bone();

			} else if ( nodeDef.mesh !== undefined ) {

				var mesh = dependencies.meshes[ nodeDef.mesh ];

				node = mesh.clone();

				// for Specular-Glossiness
				if ( mesh.isGroup === true ) {

					for ( var i = 0, il = mesh.children.length; i < il; i ++ ) {

						var child = mesh.children[ i ];

						if ( child.material && child.material.isGLTFSpecularGlossinessMaterial === true ) {

							node.children[ i ].onBeforeRender = child.onBeforeRender;

						}

					}

				} else {

					if ( mesh.material && mesh.material.isGLTFSpecularGlossinessMaterial === true ) {

						node.onBeforeRender = mesh.onBeforeRender;

					}

				}

				if ( meshReferences[ nodeDef.mesh ] > 1 ) {

					node.name += '_instance_' + meshUses[ nodeDef.mesh ] ++;

				}

			} else if ( nodeDef.camera !== undefined ) {

				node = dependencies.cameras[ nodeDef.camera ];

			} else if ( nodeDef.extensions
					 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
					 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

				var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
				node = lights[ nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ];

			} else {

				node = new THREE.Object3D();

			}

			if ( nodeDef.name !== undefined ) {

				node.name = THREE.PropertyBinding.sanitizeNodeName( nodeDef.name );

			}

			if ( nodeDef.extras ) node.userData = nodeDef.extras;

			if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

			if ( nodeDef.matrix !== undefined ) {

				var matrix = new THREE.Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			return node;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
	 * @param {number} sceneIndex
	 * @return {Promise<THREE.Scene>}
	 */
	GLTFParser.prototype.loadScene = function () {

		// scene node hierachy builder

		function buildNodeHierachy( nodeId, parentObject, json, allNodes, skins ) {

			var node = allNodes[ nodeId ];
			var nodeDef = json.nodes[ nodeId ];

			// build skeleton here as well

			if ( nodeDef.skin !== undefined ) {

				var meshes = node.isGroup === true ? node.children : [ node ];

				for ( var i = 0, il = meshes.length; i < il; i ++ ) {

					var mesh = meshes[ i ];
					var skinEntry = skins[ nodeDef.skin ];

					var bones = [];
					var boneInverses = [];

					for ( var j = 0, jl = skinEntry.joints.length; j < jl; j ++ ) {

						var jointId = skinEntry.joints[ j ];
						var jointNode = allNodes[ jointId ];

						if ( jointNode ) {

							bones.push( jointNode );

							var mat = new THREE.Matrix4();

							if ( skinEntry.inverseBindMatrices !== undefined ) {

								mat.fromArray( skinEntry.inverseBindMatrices.array, j * 16 );

							}

							boneInverses.push( mat );

						} else {

							console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', jointId );

						}

					}

					mesh.bind( new THREE.Skeleton( bones, boneInverses ), mesh.matrixWorld );

				}

			}

			// build node hierachy

			parentObject.add( node );

			if ( nodeDef.children ) {

				var children = nodeDef.children;

				for ( var i = 0, il = children.length; i < il; i ++ ) {

					var child = children[ i ];
					buildNodeHierachy( child, node, json, allNodes, skins );

				}

			}

		}

		return function loadScene( sceneIndex ) {

			var json = this.json;
			var extensions = this.extensions;
			var sceneDef = this.json.scenes[ sceneIndex ];

			return this.getMultiDependencies( [

				'node',
				'skin'

			] ).then( function ( dependencies ) {

				var scene = new THREE.Scene();
				if ( sceneDef.name !== undefined ) scene.name = sceneDef.name;

				if ( sceneDef.extras ) scene.userData = sceneDef.extras;

				if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

				var nodeIds = sceneDef.nodes || [];

				for ( var i = 0, il = nodeIds.length; i < il; i ++ ) {

					buildNodeHierachy( nodeIds[ i ], scene, json, dependencies.nodes, dependencies.skins );

				}

				// Ambient lighting, if present, is always attached to the scene root.
				if ( sceneDef.extensions
						 && sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
						 && sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					scene.add( lights[ sceneDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ] );

				}

				return scene;

			} );

		};

	}();

	return GLTFLoader;

} )();
/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */

THREE.MTLLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.MTLLoader.prototype = {

	constructor: THREE.MTLLoader,

	/**
	 * Loads and parses a MTL asset from a URL.
	 *
	 * @param {String} url - URL to the MTL file.
	 * @param {Function} [onLoad] - Callback invoked with the loaded object.
	 * @param {Function} [onProgress] - Callback for download progress.
	 * @param {Function} [onError] - Callback for download errors.
	 *
	 * @see setPath setTexturePath
	 *
	 * @note In order for relative texture references to resolve correctly
	 * you must call setPath and/or setTexturePath explicitly prior to load.
	 */
	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( this.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	/**
	 * Set base path for resolving references.
	 * If set this path will be prepended to each loaded and found reference.
	 *
	 * @see setTexturePath
	 * @param {String} path
	 * @return {THREE.MTLLoader}
	 *
	 * @example
	 *     mtlLoader.setPath( 'assets/obj/' );
	 *     mtlLoader.load( 'my.mtl', ... );
	 */
	setPath: function ( path ) {

		this.path = path;
		return this;

	},

	/**
	 * Set base path for resolving texture references.
	 * If set this path will be prepended found texture reference.
	 * If not set and setPath is, it will be used as texture base path.
	 *
	 * @see setPath
	 * @param {String} path
	 * @return {THREE.MTLLoader}
	 *
	 * @example
	 *     mtlLoader.setPath( 'assets/obj/' );
	 *     mtlLoader.setTexturePath( 'assets/textures/' );
	 *     mtlLoader.load( 'my.mtl', ... );
	 */
	setTexturePath: function ( path ) {

		this.texturePath = path;
		return this;

	},

	setBaseUrl: function ( path ) {

		console.warn( 'THREE.MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.' );

		return this.setTexturePath( path );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;
		return this;

	},

	setMaterialOptions: function ( value ) {

		this.materialOptions = value;
		return this;

	},

	/**
	 * Parses a MTL file.
	 *
	 * @param {String} text - Content of MTL file
	 * @return {THREE.MTLLoader.MaterialCreator}
	 *
	 * @see setPath setTexturePath
	 *
	 * @note In order for relative texture references to resolve correctly
	 * you must call setPath and/or setTexturePath explicitly prior to parse.
	 */
	parse: function ( text ) {

		var lines = text.split( '\n' );
		var info = {};
		var delimiter_pattern = /\s+/;
		var materialsInfo = {};

		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				// Blank line or comment ignore
				continue;

			}

			var pos = line.indexOf( ' ' );

			var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
			key = key.toLowerCase();

			var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : '';
			value = value.trim();

			if ( key === 'newmtl' ) {

				// New material

				info = { name: value };
				materialsInfo[ value ] = info;

			} else if ( info ) {

				if ( key === 'ka' || key === 'kd' || key === 'ks' ) {

					var ss = value.split( delimiter_pattern, 3 );
					info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

				} else {

					info[ key ] = value;

				}

			}

		}

		var materialCreator = new THREE.MTLLoader.MaterialCreator( this.texturePath || this.path, this.materialOptions );
		materialCreator.setCrossOrigin( this.crossOrigin );
		materialCreator.setManager( this.manager );
		materialCreator.setMaterials( materialsInfo );
		return materialCreator;

	}

};

/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

THREE.MTLLoader.MaterialCreator = function ( baseUrl, options ) {

	this.baseUrl = baseUrl || '';
	this.options = options;
	this.materialsInfo = {};
	this.materials = {};
	this.materialsArray = [];
	this.nameLookup = {};

	this.side = ( this.options && this.options.side ) ? this.options.side : THREE.FrontSide;
	this.wrap = ( this.options && this.options.wrap ) ? this.options.wrap : THREE.RepeatWrapping;

};

THREE.MTLLoader.MaterialCreator.prototype = {

	constructor: THREE.MTLLoader.MaterialCreator,

	crossOrigin: 'Anonymous',

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	setManager: function ( value ) {

		this.manager = value;

	},

	setMaterials: function ( materialsInfo ) {

		this.materialsInfo = this.convert( materialsInfo );
		this.materials = {};
		this.materialsArray = [];
		this.nameLookup = {};

	},

	convert: function ( materialsInfo ) {

		if ( ! this.options ) return materialsInfo;

		var converted = {};

		for ( var mn in materialsInfo ) {

			// Convert materials info into normalized form based on options

			var mat = materialsInfo[ mn ];

			var covmat = {};

			converted[ mn ] = covmat;

			for ( var prop in mat ) {

				var save = true;
				var value = mat[ prop ];
				var lprop = prop.toLowerCase();

				switch ( lprop ) {

					case 'kd':
					case 'ka':
					case 'ks':

						// Diffuse color (color under white light) using RGB values

						if ( this.options && this.options.normalizeRGB ) {

							value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

						}

						if ( this.options && this.options.ignoreZeroRGBs ) {

							if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0 ) {

								// ignore

								save = false;

							}

						}

						break;

					default:

						break;

				}

				if ( save ) {

					covmat[ lprop ] = value;

				}

			}

		}

		return converted;

	},

	preload: function () {

		for ( var mn in this.materialsInfo ) {

			this.create( mn );

		}

	},

	getIndex: function ( materialName ) {

		return this.nameLookup[ materialName ];

	},

	getAsArray: function () {

		var index = 0;

		for ( var mn in this.materialsInfo ) {

			this.materialsArray[ index ] = this.create( mn );
			this.nameLookup[ mn ] = index;
			index ++;

		}

		return this.materialsArray;

	},

	create: function ( materialName ) {

		if ( this.materials[ materialName ] === undefined ) {

			this.createMaterial_( materialName );

		}

		return this.materials[ materialName ];

	},

	createMaterial_: function ( materialName ) {

		// Create material

		var scope = this;
		var mat = this.materialsInfo[ materialName ];
		var params = {

			name: materialName,
			side: this.side

		};

		function resolveURL( baseUrl, url ) {

			if ( typeof url !== 'string' || url === '' )
				return '';

			// Absolute URL
			if ( /^https?:\/\//i.test( url ) ) return url;

			return baseUrl + url;

		}

		function setMapForType( mapType, value ) {

			if ( params[ mapType ] ) return; // Keep the first encountered texture

			var texParams = scope.getTextureParams( value, params );
			var map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

			map.repeat.copy( texParams.scale );
			map.offset.copy( texParams.offset );

			map.wrapS = scope.wrap;
			map.wrapT = scope.wrap;

			params[ mapType ] = map;

		}

		for ( var prop in mat ) {

			var value = mat[ prop ];
			var n;

			if ( value === '' ) continue;

			switch ( prop.toLowerCase() ) {

				// Ns is material specular exponent

				case 'kd':

					// Diffuse color (color under white light) using RGB values

					params.color = new THREE.Color().fromArray( value );

					break;

				case 'ks':

					// Specular color (color when light is reflected from shiny surface) using RGB values
					params.specular = new THREE.Color().fromArray( value );

					break;

				case 'map_kd':

					// Diffuse texture map

					setMapForType( "map", value );

					break;

				case 'map_ks':

					// Specular map

					setMapForType( "specularMap", value );

					break;

				case 'norm':

					setMapForType( "normalMap", value );

					break;

				case 'map_bump':
				case 'bump':

					// Bump texture map

					setMapForType( "bumpMap", value );

					break;

				case 'ns':

					// The specular exponent (defines the focus of the specular highlight)
					// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

					params.shininess = parseFloat( value );

					break;

				case 'd':
					n = parseFloat( value );

					if ( n < 1 ) {

						params.opacity = n;
						params.transparent = true;

					}

					break;

				case 'tr':
					n = parseFloat( value );

					if ( this.options && this.options.invertTrProperty ) n = 1 - n;

					if ( n > 0 ) {

						params.opacity = 1 - n;
						params.transparent = true;

					}

					break;

				default:
					break;

			}

		}

		this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
		return this.materials[ materialName ];

	},

	getTextureParams: function ( value, matParams ) {

		var texParams = {

			scale: new THREE.Vector2( 1, 1 ),
			offset: new THREE.Vector2( 0, 0 )

		 };

		var items = value.split( /\s+/ );
		var pos;

		pos = items.indexOf( '-bm' );

		if ( pos >= 0 ) {

			matParams.bumpScale = parseFloat( items[ pos + 1 ] );
			items.splice( pos, 2 );

		}

		pos = items.indexOf( '-s' );

		if ( pos >= 0 ) {

			texParams.scale.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
			items.splice( pos, 4 ); // we expect 3 parameters here!

		}

		pos = items.indexOf( '-o' );

		if ( pos >= 0 ) {

			texParams.offset.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
			items.splice( pos, 4 ); // we expect 3 parameters here!

		}

		texParams.url = items.join( ' ' ).trim();
		return texParams;

	},

	loadTexture: function ( url, mapping, onLoad, onProgress, onError ) {

		var texture;
		var loader = THREE.Loader.Handlers.get( url );
		var manager = ( this.manager !== undefined ) ? this.manager : THREE.DefaultLoadingManager;

		if ( loader === null ) {

			loader = new THREE.TextureLoader( manager );

		}

		if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );
		texture = loader.load( url, onLoad, onProgress, onError );

		if ( mapping !== undefined ) texture.mapping = mapping;

		return texture;

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.OBJLoader = ( function () {

	// o object_name | g group_name
	var object_pattern = /^[og]\s*(.+)?/;
	// mtllib file_reference
	var material_library_pattern = /^mtllib /;
	// usemtl material_name
	var material_use_pattern = /^usemtl /;

	function ParserState() {

		var state = {
			objects: [],
			object: {},

			vertices: [],
			normals: [],
			colors: [],
			uvs: [],

			materialLibraries: [],

			startObject: function ( name, fromDeclaration ) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if ( this.object && this.object.fromDeclaration === false ) {

					this.object.name = name;
					this.object.fromDeclaration = ( fromDeclaration !== false );
					return;

				}

				var previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

				this.object = {
					name: name || '',
					fromDeclaration: ( fromDeclaration !== false ),

					geometry: {
						vertices: [],
						normals: [],
						colors: [],
						uvs: []
					},
					materials: [],
					smooth: true,

					startMaterial: function ( name, libraries ) {

						var previous = this._finalize( false );

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

							this.materials.splice( previous.index, 1 );

						}

						var material = {
							index: this.materials.length,
							name: name || '',
							mtllib: ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
							smooth: ( previous !== undefined ? previous.smooth : this.smooth ),
							groupStart: ( previous !== undefined ? previous.groupEnd : 0 ),
							groupEnd: - 1,
							groupCount: - 1,
							inherited: false,

							clone: function ( index ) {

								var cloned = {
									index: ( typeof index === 'number' ? index : this.index ),
									name: this.name,
									mtllib: this.mtllib,
									smooth: this.smooth,
									groupStart: 0,
									groupEnd: - 1,
									groupCount: - 1,
									inherited: false
								};
								cloned.clone = this.clone.bind( cloned );
								return cloned;

							}
						};

						this.materials.push( material );

						return material;

					},

					currentMaterial: function () {

						if ( this.materials.length > 0 ) {

							return this.materials[ this.materials.length - 1 ];

						}

						return undefined;

					},

					_finalize: function ( end ) {

						var lastMultiMaterial = this.currentMaterial();
						if ( lastMultiMaterial && lastMultiMaterial.groupEnd === - 1 ) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Ignore objects tail materials if no face declarations followed them before a new o/g started.
						if ( end && this.materials.length > 1 ) {

							for ( var mi = this.materials.length - 1; mi >= 0; mi -- ) {

								if ( this.materials[ mi ].groupCount <= 0 ) {

									this.materials.splice( mi, 1 );

								}

							}

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if ( end && this.materials.length === 0 ) {

							this.materials.push( {
								name: '',
								smooth: this.smooth
							} );

						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function' ) {

					var declared = previousMaterial.clone( 0 );
					declared.inherited = true;
					this.object.materials.push( declared );

				}

				this.objects.push( this.object );

			},

			finalize: function () {

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

			},

			parseVertexIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseNormalIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseUVIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

			},

			addVertex: function ( a, b, c ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addVertexPoint: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

			},

			addVertexLine: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

			},

			addNormal: function ( a, b, c ) {

				var src = this.normals;
				var dst = this.object.geometry.normals;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addColor: function ( a, b, c ) {

				var src = this.colors;
				var dst = this.object.geometry.colors;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addUV: function ( a, b, c ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ], src[ a + 1 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ] );

			},

			addUVLine: function ( a ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ], src[ a + 1 ] );

			},

			addFace: function ( a, b, c, ua, ub, uc, na, nb, nc ) {

				var vLen = this.vertices.length;

				var ia = this.parseVertexIndex( a, vLen );
				var ib = this.parseVertexIndex( b, vLen );
				var ic = this.parseVertexIndex( c, vLen );

				this.addVertex( ia, ib, ic );

				if ( ua !== undefined && ua !== '' ) {

					var uvLen = this.uvs.length;
					ia = this.parseUVIndex( ua, uvLen );
					ib = this.parseUVIndex( ub, uvLen );
					ic = this.parseUVIndex( uc, uvLen );
					this.addUV( ia, ib, ic );

				}

				if ( na !== undefined && na !== '' ) {

					// Normals are many times the same. If so, skip function call and parseInt.
					var nLen = this.normals.length;
					ia = this.parseNormalIndex( na, nLen );

					ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
					ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

					this.addNormal( ia, ib, ic );

				}

				if ( this.colors.length > 0 ) {

					this.addColor( ia, ib, ic );

				}

			},

			addPointGeometry: function ( vertices ) {

				this.object.geometry.type = 'Points';

				var vLen = this.vertices.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexPoint( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

			},

			addLineGeometry: function ( vertices, uvs ) {

				this.object.geometry.type = 'Line';

				var vLen = this.vertices.length;
				var uvLen = this.uvs.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

				for ( var uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

					this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

				}

			}

		};

		state.startObject( '', false );

		return state;

	}

	//

	function OBJLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

		this.materials = null;

	}

	OBJLoader.prototype = {

		constructor: OBJLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new THREE.FileLoader( scope.manager );
			loader.setPath( this.path );
			loader.load( url, function ( text ) {

				onLoad( scope.parse( text ) );

			}, onProgress, onError );

		},

		setPath: function ( value ) {

			this.path = value;

			return this;

		},

		setMaterials: function ( materials ) {

			this.materials = materials;

			return this;

		},

		parse: function ( text ) {

			console.time( 'OBJLoader' );

			var state = new ParserState();

			if ( text.indexOf( '\r\n' ) !== - 1 ) {

				// This is faster than String.split with regex that splits on both
				text = text.replace( /\r\n/g, '\n' );

			}

			if ( text.indexOf( '\\\n' ) !== - 1 ) {

				// join lines separated by a line continuation character (\)
				text = text.replace( /\\\n/g, '' );

			}

			var lines = text.split( '\n' );
			var line = '', lineFirstChar = '';
			var lineLength = 0;
			var result = [];

			// Faster to just trim left side of the line. Use if available.
			var trimLeft = ( typeof ''.trimLeft === 'function' );

			for ( var i = 0, l = lines.length; i < l; i ++ ) {

				line = lines[ i ];

				line = trimLeft ? line.trimLeft() : line.trim();

				lineLength = line.length;

				if ( lineLength === 0 ) continue;

				lineFirstChar = line.charAt( 0 );

				// @todo invoke passed in handler if any
				if ( lineFirstChar === '#' ) continue;

				if ( lineFirstChar === 'v' ) {

					var data = line.split( /\s+/ );

					switch ( data[ 0 ] ) {

						case 'v':
							state.vertices.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] ),
								parseFloat( data[ 3 ] )
							);
							if ( data.length === 8 ) {

								state.colors.push(
									parseFloat( data[ 4 ] ),
									parseFloat( data[ 5 ] ),
									parseFloat( data[ 6 ] )

								);

							}
							break;
						case 'vn':
							state.normals.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] ),
								parseFloat( data[ 3 ] )
							);
							break;
						case 'vt':
							state.uvs.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] )
							);
							break;

					}

				} else if ( lineFirstChar === 'f' ) {

					var lineData = line.substr( 1 ).trim();
					var vertexData = lineData.split( /\s+/ );
					var faceVertices = [];

					// Parse the face vertex data into an easy to work with format

					for ( var j = 0, jl = vertexData.length; j < jl; j ++ ) {

						var vertex = vertexData[ j ];

						if ( vertex.length > 0 ) {

							var vertexParts = vertex.split( '/' );
							faceVertices.push( vertexParts );

						}

					}

					// Draw an edge between the first vertex and all subsequent vertices to form an n-gon

					var v1 = faceVertices[ 0 ];

					for ( var j = 1, jl = faceVertices.length - 1; j < jl; j ++ ) {

						var v2 = faceVertices[ j ];
						var v3 = faceVertices[ j + 1 ];

						state.addFace(
							v1[ 0 ], v2[ 0 ], v3[ 0 ],
							v1[ 1 ], v2[ 1 ], v3[ 1 ],
							v1[ 2 ], v2[ 2 ], v3[ 2 ]
						);

					}

				} else if ( lineFirstChar === 'l' ) {

					var lineParts = line.substring( 1 ).trim().split( " " );
					var lineVertices = [], lineUVs = [];

					if ( line.indexOf( "/" ) === - 1 ) {

						lineVertices = lineParts;

					} else {

						for ( var li = 0, llen = lineParts.length; li < llen; li ++ ) {

							var parts = lineParts[ li ].split( "/" );

							if ( parts[ 0 ] !== "" ) lineVertices.push( parts[ 0 ] );
							if ( parts[ 1 ] !== "" ) lineUVs.push( parts[ 1 ] );

						}

					}
					state.addLineGeometry( lineVertices, lineUVs );

				} else if ( lineFirstChar === 'p' ) {

					var lineData = line.substr( 1 ).trim();
					var pointData = lineData.split( " " );

					state.addPointGeometry( pointData );

				} else if ( ( result = object_pattern.exec( line ) ) !== null ) {

					// o object_name
					// or
					// g group_name

					// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
					// var name = result[ 0 ].substr( 1 ).trim();
					var name = ( " " + result[ 0 ].substr( 1 ).trim() ).substr( 1 );

					state.startObject( name );

				} else if ( material_use_pattern.test( line ) ) {

					// material

					state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

				} else if ( material_library_pattern.test( line ) ) {

					// mtl file

					state.materialLibraries.push( line.substring( 7 ).trim() );

				} else if ( lineFirstChar === 's' ) {

					result = line.split( ' ' );

					// smooth shading

					// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
					// but does not define a usemtl for each face set.
					// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
					// This requires some care to not create extra material on each smooth value for "normal" obj files.
					// where explicit usemtl defines geometry groups.
					// Example asset: examples/models/obj/cerberus/Cerberus.obj

					/*
					 * http://paulbourke.net/dataformats/obj/
					 * or
					 * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
					 *
					 * From chapter "Grouping" Syntax explanation "s group_number":
					 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
					 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
					 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
					 * than 0."
					 */
					if ( result.length > 1 ) {

						var value = result[ 1 ].trim().toLowerCase();
						state.object.smooth = ( value !== '0' && value !== 'off' );

					} else {

						// ZBrush can produce "s" lines #11707
						state.object.smooth = true;

					}
					var material = state.object.currentMaterial();
					if ( material ) material.smooth = state.object.smooth;

				} else {

					// Handle null terminated files without exception
					if ( line === '\0' ) continue;

					throw new Error( 'THREE.OBJLoader: Unexpected line: "' + line + '"' );

				}

			}

			state.finalize();

			var container = new THREE.Group();
			container.materialLibraries = [].concat( state.materialLibraries );

			for ( var i = 0, l = state.objects.length; i < l; i ++ ) {

				var object = state.objects[ i ];
				var geometry = object.geometry;
				var materials = object.materials;
				var isLine = ( geometry.type === 'Line' );
				var isPoints = ( geometry.type === 'Points' );
				var hasVertexColors = false;

				// Skip o/g line declarations that did not follow with any faces
				if ( geometry.vertices.length === 0 ) continue;

				var buffergeometry = new THREE.BufferGeometry();

				buffergeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( geometry.vertices, 3 ) );

				if ( geometry.normals.length > 0 ) {

					buffergeometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( geometry.normals, 3 ) );

				} else {

					buffergeometry.computeVertexNormals();

				}

				if ( geometry.colors.length > 0 ) {

					hasVertexColors = true;
					buffergeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( geometry.colors, 3 ) );

				}

				if ( geometry.uvs.length > 0 ) {

					buffergeometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( geometry.uvs, 2 ) );

				}

				// Create materials

				var createdMaterials = [];

				for ( var mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

					var sourceMaterial = materials[ mi ];
					var material = undefined;

					if ( this.materials !== null ) {

						material = this.materials.create( sourceMaterial.name );

						// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
						if ( isLine && material && ! ( material instanceof THREE.LineBasicMaterial ) ) {

							var materialLine = new THREE.LineBasicMaterial();
							materialLine.copy( material );
							materialLine.lights = false; // TOFIX
							material = materialLine;

						} else if ( isPoints && material && ! ( material instanceof THREE.PointsMaterial ) ) {

							var materialPoints = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
							materialLine.copy( material );
							material = materialPoints;

						}

					}

					if ( ! material ) {

						if ( isLine ) {

							material = new THREE.LineBasicMaterial();

						} else if ( isPoints ) {

							material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );

						} else {

							material = new THREE.MeshPhongMaterial();

						}

						material.name = sourceMaterial.name;

					}

					material.flatShading = sourceMaterial.smooth ? false : true;
					material.vertexColors = hasVertexColors ? THREE.VertexColors : THREE.NoColors;

					createdMaterials.push( material );

				}

				// Create mesh

				var mesh;

				if ( createdMaterials.length > 1 ) {

					for ( var mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

						var sourceMaterial = materials[ mi ];
						buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

					}

					if ( isLine ) {

						mesh = new THREE.LineSegments( buffergeometry, createdMaterials );

					} else if ( isPoints ) {

						mesh = new THREE.Points( buffergeometry, createdMaterials );

					} else {

						mesh = new THREE.Mesh( buffergeometry, createdMaterials );

					}

				} else {

					if ( isLine ) {

						mesh = new THREE.LineSegments( buffergeometry, createdMaterials[ 0 ] );

					} else if ( isPoints ) {

						mesh = new THREE.Points( buffergeometry, createdMaterials[ 0 ] );

					} else {

						mesh = new THREE.Mesh( buffergeometry, createdMaterials[ 0 ] );

					}

				}

				mesh.name = object.name;

				container.add( mesh );

			}

			console.timeEnd( 'OBJLoader' );

			return container;

		}

	};

	return OBJLoader;

} )();
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or arrow keys / touch: two-finger move

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.panSpeed = 1.0;
	this.screenSpacePanning = false; // if true, pan in screen-space
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.saveState = function () {

		scope.target0.copy( scope.target );
		scope.position0.copy( scope.object.position );
		scope.zoom0 = scope.object.zoom;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location
			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

				panOffset.multiplyScalar( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

				panOffset.set( 0, 0, 0 );

			}

			scale = 1;

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {

			if ( scope.screenSpacePanning === true ) {

				v.setFromMatrixColumn( objectMatrix, 1 );

			} else {

				v.setFromMatrixColumn( objectMatrix, 0 );
				v.crossVectors( scope.object.up, v );

			}

			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( scope.object.isPerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we use only clientHeight here so aspect ratio does not distort speed
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object.isOrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyIn( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyOut( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( event ) {

		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {

		// console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		//console.log( 'handleKeyDown' );

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				scope.update();
				break;

		}

	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDollyPan( event ) {

		//console.log( 'handleTouchStartDollyPan' );

		if ( scope.enableZoom ) {

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyStart.set( 0, distance );

		}

		if ( scope.enablePan ) {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panStart.set( x, y );

		}

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleTouchMoveDollyPan( event ) {

		//console.log( 'handleTouchMoveDollyPan' );

		if ( scope.enableZoom ) {

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyEnd.set( 0, distance );

			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

			dollyIn( dollyDelta.y );

			dollyStart.copy( dollyEnd );

		}

		if ( scope.enablePan ) {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panEnd.set( x, y );

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.button ) {

			case scope.mouseButtons.ORBIT:

				if ( scope.enableRotate === false ) return;

				handleMouseDownRotate( event );

				state = STATE.ROTATE;

				break;

			case scope.mouseButtons.ZOOM:

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

				break;

			case scope.mouseButtons.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseDownPan( event );

				state = STATE.PAN;

				break;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		scope.dispatchEvent( startEvent );

		handleMouseWheel( event );

		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;

				handleTouchStartRotate( event );

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:	// two-fingered touch: dolly-pan

				if ( scope.enableZoom === false && scope.enablePan === false ) return;

				handleTouchStartDollyPan( event );

				state = STATE.TOUCH_DOLLY_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?

				handleTouchMoveRotate( event );

				break;

			case 2: // two-fingered touch: dolly-pan

				if ( scope.enableZoom === false && scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_DOLLY_PAN ) return; // is this needed?

				handleTouchMoveDollyPan( event );

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

	center: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
			return this.target;

		}

	},

	// backward compatibility

	noZoom: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			return ! this.enableZoom;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			this.enableZoom = ! value;

		}

	},

	noRotate: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			return ! this.enableRotate;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			this.enableRotate = ! value;

		}

	},

	noPan: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			return ! this.enablePan;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			this.enablePan = ! value;

		}

	},

	noKeys: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			return ! this.enableKeys;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			this.enableKeys = ! value;

		}

	},

	staticMoving: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			return ! this.enableDamping;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			this.enableDamping = ! value;

		}

	},

	dynamicDampingFactor: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			return this.dampingFactor;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			this.dampingFactor = value;

		}

	}

} );

/* 
 *************************************
 * <!-- Three.js Plugins -->
 *************************************
 */
/* https://github.com/pwambach/threejs-particle-shader 
License: MIT
*/
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	(function(window){

	  var buffer = 0;

	  //Utils
	  function _extend (target, source) {
	    var a = Object.create(target);
	    Object.keys(source).map(function (prop) {
	      a[prop] = source[prop];
	    });
	    return a;
	  }

	  var Particles = function(renderer, scene, options){

	    var defaults = {
	      pointSize: 1.0,
	      gravityFactor: 1.0,
	      textureSize: 256,
	      explodeRate: 1.0,
	      targetPosition: new THREE.Vector3(0.0, 0.0, 0.0)
	    };
	    options = _extend(defaults, options);

	    var textureSize = options.textureSize;

	    var renderTargets = createRenderTargets(textureSize);

	    var shaderTextContents = {
	      velocityVertex: __webpack_require__(1),
	      velocityFragment: __webpack_require__(2),
	      positionVertex: __webpack_require__(3),
	      positionFragment: __webpack_require__(4),
	      displayVertex: __webpack_require__(5),
	      displayFragment: __webpack_require__(6),
	      randomVertex: __webpack_require__(7),
	      randomFragment: __webpack_require__(8)
	    };

	    if(options.velocityFunctionString){
	      shaderTextContents.velocityFragment = replaceBehaviour(shaderTextContents.velocityFragment, options.velocityFunctionString);
	    }

	    if(options.positionFunctionString){
	      shaderTextContents.positionFragment = replaceBehaviour(shaderTextContents.positionFragment, options.positionFunctionString);
	    }

	    if(options.colorFunctionString){
	      shaderTextContents.displayFragment = replaceBehaviour(shaderTextContents.displayFragment, options.colorFunctionString);
	    }

	    var uniforms = {
	      velocity: createVelocityUniforms(renderTargets, options.targetPosition, options.targetTexture, options.gravityFactor),
	      position: createPositionUniforms(renderTargets),
	      display: createDisplayUniforms(renderTargets, options.targetPosition, options.pointSize),
	      random: createRandomUniforms(options.explodeRate),
	    };

	    var shaderMaterials  = createShaderMaterials(shaderTextContents, uniforms);

	    var scenes = {
	      velocity: new THREE.Scene(),
	      position: new THREE.Scene(),
	      display: scene,
	      random: new THREE.Scene()
	    };

	    scenes.velocity.add(createMesh(textureSize, shaderMaterials.velocity));
	    scenes.position.add(createMesh(textureSize, shaderMaterials.position));
	    scenes.random.add(createMesh(textureSize, shaderMaterials.random));
	    this.pointCloud = createPoints(textureSize, shaderMaterials.display);
	    scenes.display.add(this.pointCloud);

	    //debug
	    //scenes.display.add(createMesh(textureSize, shaderMaterials.velocity));
	    //scenes.display.add(createMesh(textureSize, shaderMaterials.position));

	    var processCamera = new THREE.OrthographicCamera(-textureSize/2, textureSize/2, textureSize/2, -textureSize/2, -1, 0);

	    //start with random values
	    renderer.render(scenes.random, processCamera, renderTargets.velocity[0]);
	    renderer.render(scenes.random, processCamera, renderTargets.position[0]);


	    return {
	      update: function(){
	        update(renderer, scenes, processCamera, renderTargets, uniforms);
	      },
	      pointCloud: this.pointCloud
	    };
	  };

	  var replaceBehaviour = function(shader, snippet){
	    var regex = /\/\*replace\*\/[^]*\/\*replace\*\//g;
	    var newShader = shader.replace(regex, snippet);
	    console.log(newShader);
	    return newShader;
	  };

	  var createRenderTargets = function(size, options){
	    return {
	      velocity: [
	        createRenderTarget(size, options),
	        createRenderTarget(size, options)
	      ],
	      position: [
	        createRenderTarget(size, options),
	        createRenderTarget(size, options)
	      ]
	    };
	  };

	  var createRenderTarget = function(size, options) {
	    options = options || {
	      format: THREE.RGBFormat,
	      generateMipmaps: false,
	      magFilter: THREE.NearestFilter,
	      minFilter: THREE.NearestFilter,
	      type: THREE.HalfFloatType
	    };
	    return new THREE.WebGLRenderTarget(size, size, options);
	  };

	  var createVelocityUniforms = function(renderTargets, targetPosition, targetTexture, gravityFactor){
	    return {
	      velTex: {type: "t", value: renderTargets.velocity[0]},
	      posTex: {type: "t", value: renderTargets.position[0]},
	      targetTex: {type: "t", value: targetTexture},
	      targetPosition: {type: "v3", value: targetPosition},
	      useTargetTexture: {type: "i", value: !!targetTexture ? 1 : 0},
	      gravityFactor: {type: "f", value: gravityFactor}
	    };
	  };

	  var createPositionUniforms = function(renderTargets){
	    return {
	      velTex: {type: "t", value: renderTargets.velocity[0]},
	      posTex: {type: "t", value: renderTargets.position[0]}
	    };
	  };

	  var createDisplayUniforms = function(renderTargets, targetPosition, pointSize){
	    return {
	      pointSize: {type: "f", value: pointSize},
	      posTex: {type: "t", value: renderTargets.position[0]},
	      targetPosition: {type: "v3", value: targetPosition},
	      alpha: {type: "f", value: 0.5}
	    };
	  };

	  var createRandomUniforms = function(explodeRate){
	    return {
	      explodeRate: {type: "f", value: explodeRate}
	    };
	  };

	  var createShaderMaterials = function(shaders, uniforms, displayMaterialOptions){

	    displayMaterialOptions = displayMaterialOptions || {
	      transparent: true,
	      wireframe: false,
	      blending: THREE.NormalBlending,
	      depthWrite: false
	    };

	    return {
	      velocity: createShaderMaterial(shaders.velocityVertex, shaders.velocityFragment, uniforms.velocity),
	      position: createShaderMaterial(shaders.positionVertex, shaders.positionFragment, uniforms.position),
	      display: createShaderMaterial(shaders.displayVertex, shaders.displayFragment, uniforms.display, displayMaterialOptions),
	      random: createShaderMaterial(shaders.randomVertex, shaders.randomFragment, uniforms.random)
	    };
	  };

	  var createShaderMaterial = function(vShader, fShader, uniforms, options) {
	    options = options || {};
	    var defaults = {
	      uniforms: uniforms,
	      vertexShader: vShader,
	      fragmentShader: fShader
	    };
	    window.$.extend(defaults, options);
	    return new THREE.ShaderMaterial(defaults);
	  };

	  var createMesh = function(size, material) {
	    return new THREE.Mesh(
	      new THREE.PlaneBufferGeometry( size, size ),
	      material
	    );
	  };

	  var createPoints = function(size, material) {
	    var points = new THREE.Geometry();
	    for (var i = 0; i < size * size; i++) {
	      var pos = new THREE.Vector3((i % size)/size, Math.floor(i/size)/size , 0);
	      points.vertices.push(pos);
	    }
	    return new THREE.Points(points, material);
	  };

	  var update = function(renderer, scenes, processCamera, renderTargets, uniforms){
	    var newBuffer = (buffer+1)%2;
	    uniforms.velocity.velTex.value = renderTargets.velocity[buffer];
	    uniforms.position.posTex.value = renderTargets.position[buffer];
	    renderer.render(scenes.velocity, processCamera, renderTargets.velocity[newBuffer]);

	    uniforms.position.velTex.value = renderTargets.velocity[newBuffer];
	    uniforms.position.posTex.value = renderTargets.position[buffer];
	    renderer.render(scenes.position, processCamera, renderTargets.position[newBuffer]);

	    uniforms.display.posTex.value = renderTargets.position[newBuffer];

	    buffer = newBuffer;
	  };


	  if( true ) {
	    if( typeof module !== 'undefined' && module.exports ) {
	      exports = module.exports = Particles;
	    }
	    exports.Particles = Particles;
	  }
	  if(window) {
	    window.Particles = Particles;
	  }

	})(window);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}\n";

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "varying vec2 vUv;\nuniform sampler2D velTex;\nuniform sampler2D posTex;\nuniform sampler2D targetTex;\nuniform vec3 targetPosition;\nuniform float gravityFactor;\nuniform int useTargetTexture;\n\nvoid main() {\n  vec3 inVelocity = texture2D(velTex, vUv).rgb;\n  vec3 inPosition = texture2D(posTex, vUv).rgb;\n  vec3 targetPos = targetPosition;\n  vec3 outVelocity;\n  if(useTargetTexture == 1) {\n    targetPos = texture2D(targetTex, vUv).rgb;\n  }\n\n  float dist = distance(targetPos, inPosition);\n  vec3 direction = normalize(targetPos - inPosition);\n\n  /*replace*/\n  dist = max(dist, 1.0);\n  outVelocity = inVelocity + ((direction / dist) * gravityFactor * 0.01);\n  /*replace*/\n\n  gl_FragColor = vec4( outVelocity, 1.0 );\n}\n";

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}\n";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "varying vec2 vUv;\nuniform sampler2D velTex;\nuniform sampler2D posTex;\n\nvoid main() {\n  vec3 velocity = texture2D(velTex, vUv).rgb;\n  vec3 pos = texture2D(posTex, vUv).rgb;\n\n  /*replace*/\n  pos += velocity;\n  /*replace*/\n  \n  gl_FragColor = vec4( pos, 1.0 );\n}\n";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "uniform sampler2D posTex;\nuniform float pointSize;\nuniform vec3 targetPosition;\nvarying float dist;\n\nvoid main() {\n  vec3 pos = texture2D(posTex, position.xy).rgb;\n  dist = distance(targetPosition, pos);\n  gl_PointSize = pointSize;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "varying float dist;\nuniform float alpha;\n\nvoid main() {\n  vec4 color;\n  /*replace*/\n  color = vec4(0.0, 1.0, 0.0, alpha);\n  /*replace*/\n  gl_FragColor = color;\n}\n";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}\n";

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "uniform float explodeRate;\nvarying vec2 vUv;\n\n\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy, vec2(12.8273, 67.245))) * 53726.17623);\n}\n\nvoid main() {\n  vec3 col;\n  col.g = rand(vec2(vUv.x, vUv.y + 1.0));\n  col.b = rand(vec2(vUv.x, vUv.y + 2.0));\n  col.r = rand(vec2(vUv.xy));\n  col = col - 0.5;\n  col *= explodeRate;\n\n  gl_FragColor = vec4(col, 1.0);\n}\n";

/***/ }
/******/ ]);