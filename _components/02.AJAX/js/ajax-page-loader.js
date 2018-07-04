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
			APP.COMMON_HEIGHT.pageLoaded(); //Common Height
			APP.LIGHTBOX.pageLoaded(); //Custom Lightbox
			APP.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)
			APP.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider (Special Effects)	
			APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded(); //Fullwidth List of Split
			APP.STICKY_EL.pageLoaded(); //Sticky Elements
			APP.TEXT_EFFECT.pageLoaded(); //Text effect
			APP.TIMELINE.pageLoaded(); //Timeline
			
		
			//----
			APP.MODAL_DIALOG.documentReady($); //Modal Dialog
			APP.PARALLAX.documentReady($); //Parallax
			APP.VIDEOS.documentReady($); //Videos
			APP.HEADER.documentReady($); //Header Area
			APP.SET_BG.documentReady($); //Specify a background image
			APP.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
			APP.PAGINATION.documentReady($); //Pagination
			APP.FORM.documentReady($); //Form
			APP.DYNAMIC_DD_LIST.documentReady($); //Dynamic Drop Down List from JSON
			APP.FLEXSLIDER.documentReady($); //Flexslider
			APP.RETINA.documentReady($); //Retina Graphics for Website
			APP.SHOW_MORELESS.documentReady($); //Show More Less
			APP.DROPDOWN_MENU.documentReady($); //Dropdown Menu
			APP.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
			APP.COUNTER.documentReady($); //Counter
			APP._3D_BACKGROUND.documentReady($); //3D Background
			APP.ACCORDION.documentReady($); //Accordion	
			APP.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider
			APP.GALLERY.documentReady($); //Gallery
			APP.IMAGE_SHAPES.documentReady($); //Image Shapes
			APP.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
			APP.PRICING.documentReady($); //Pricing
			APP.PROGRESSBAR.documentReady($); //Progress Bar
			APP.ROTATING_EL.documentReady($); //Rotating Elements
			APP.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
			APP.TABS.documentReady($); //Tabs
			APP.TEAM_FOCUS.documentReady($); //Team Focus
			APP.TESTIMONIALS.documentReady($); //Testimonials Carousel
			
			if ( settings.scrollReveal ) APP.SCROLL_REVEAL.documentReady($); //Scroll Reveal
			if ( settings.ajaxPostList ) APP.POST_LIST_AJAX.documentReady($); //Posts List With Ajax
			
			
			
			//----Other functions here



			//----Uix Shortcodes
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

