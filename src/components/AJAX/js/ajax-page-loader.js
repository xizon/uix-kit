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
		    windowWidth              = window.innerWidth,
		    windowHeight             = window.innerHeight;

		
		
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

		
		
		
		//Detect URL change
		window.addEventListener( 'popstate', function( e ) {
			moveTo( $( ajaxContainer ), false, 'down', 0 );
		});

		
		

		/* 
		 ====================================================
		 *  AJAX Interaction
		 ====================================================
		 */
		/*
		 * Initialize the clickable ajax links
		 *
		 * @return {Void}  - The constructor.
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
			windowWidth = window.innerWidth;
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
		 * @param  {Object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}                - The constructor.
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
		 * @param  {Object} container    - The instance returned from the request succeeds 
		 * @param  {String} url          - The target URL via AJAX.
		 * @param  {String} dir          - Rolling direction indicator.
		 * @param  {Number} customIndex  - User-specified index value, located on the corresponding AJAX hyperlink.
		 * @return {Void}                - The constructor.
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
						ajaxSucceeds( dir, container, url, $( response ).find( '.js-uix-ajax-load__container' ).html(), $( response ).filter( 'title' ).text() );

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
		 * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {Object} container - The instance returned from the request succeeds
		 * @param  {String} url       - Current URL after click
		 * @param  {String} content   - The data returned from the server
		 * @param  {String} title        - The title of a requested page.
		 * @return {Void}             - The constructor.
		 */
		function ajaxSucceeds( dir, container, url, content, title ) {
			
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
						} else {
							location.hash = url;
						}
				
						//Change the page title
						document.title = title;	
						
						
						//Change URL without refresh the page
//						if ( url == 'home.html' ) {
//							history.pushState(null, null, window.location.href.replace( 'home.html', '' ) );
//						}	
						
						

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
		 * @param  {String} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {String} oldContent     - A string of HTML to set as the content of matched old element.
		 * @param  {String} newContent     - A string of HTML to set as the content of matched new element.
		 * @return {Void}                  - The constructor.
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
 * @param  {Boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to 
 *                                           load asynchronous information
 * @param  {Boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to 
 *                                           load asynchronous information
 * @param  {Boolean} ajaxDDList            - Run script of module "Dynamic Drop Down List from JSON".
 * @param  {Boolean} counterAnim           - Run script of module "Counter".
 * @return {Void}  - The constructor.
 */
( function ( $ ) {
    $.fn.applyOriginalSomeScripts = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			scrollReveal    : true,
			ajaxPostList    : true,
			ajaxDDList      : true,
			counterAnim     : true
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
			if ( APP.TABLE ) APP.TABLE.documentReady($); //Responsive Table
			if ( APP.MODAL_DIALOG ) APP.MODAL_DIALOG.documentReady($); //Modal Dialog
			if ( APP.PARALLAX ) APP.PARALLAX.documentReady($); //Parallax
			if ( APP.VIDEOS ) APP.VIDEOS.documentReady($); //Videos
			if ( APP.BODY_AND_HEADER ) APP.BODY_AND_HEADER.documentReady($); //Header Area
			if ( APP.SET_BG ) APP.SET_BG.documentReady($); //Specify a background image
			if ( APP.GET_CUSTOM_ATTRS ) APP.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
			if ( APP.PAGINATION ) APP.PAGINATION.documentReady($); //Pagination
			if ( APP.FORM ) APP.FORM.documentReady($); //Form
			if ( APP.FLEXSLIDER ) APP.FLEXSLIDER.documentReady($); //Flexslider
			if ( APP.RETINA ) APP.RETINA.documentReady($); //Retina Graphics for Website
			if ( APP.SHOW_MORELESS ) APP.SHOW_MORELESS.documentReady($); //Show More Less
			if ( APP.DROPDOWN_MENU ) APP.DROPDOWN_MENU.documentReady($); //Dropdown Menu
			if ( APP.DROPDOWN_MENU2 ) APP.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
			if ( APP.ACCORDION ) APP.ACCORDION.documentReady($); //Accordion	
			if ( APP.ADVANCED_CONTENT_SLIDER ) APP.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider
			if ( APP.GALLERY ) APP.GALLERY.documentReady($); //Gallery
			if ( APP.IMAGE_SHAPES ) APP.IMAGE_SHAPES.documentReady($); //Image Shapes
			if ( APP.PERIODICAL_SCROLL ) APP.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
			if ( APP.PRICING ) APP.PRICING.documentReady($); //Pricing
			if ( APP.PROGRESSBAR ) APP.PROGRESSBAR.documentReady($); //Progress Bar
			if ( APP.PROGRESSLINE ) APP.PROGRESSLINE.documentReady($); //Progress Line
			if ( APP.ROTATING_EL ) APP.ROTATING_EL.documentReady($); //Rotating Elements
			if ( APP.SMOOTH_SCROLLING_ANCHORLINK ) APP.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
			if ( APP.TABS ) APP.TABS.documentReady($); //Tabs
			if ( APP.TEAM_FOCUS ) APP.TEAM_FOCUS.documentReady($); //Team Focus
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
			
			//Dynamic Drop Down List from JSON
			if ( settings.ajaxDDList ) {
				if ( APP.DYNAMIC_DD_LIST ) APP.DYNAMIC_DD_LIST.documentReady($);
			}
				
			
			//Counter
			if ( settings.counterAnim ) {
				if ( APP.COUNTER ) APP.COUNTER.documentReady($);
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
 * @param  {Boolean} runAll          - Run all module scripts.
 * @return {Void}  - The constructor.
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

