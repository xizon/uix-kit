/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		
        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation       = 0,
			quietPeriod         = 500, //Do not change it
			animationTime       = 1000,//According to page transition animation changes
			AJAXPageLinks       = '[data-ajax-page]',
			$navs               = $( AJAXPageLinks ).parent().parent().find( 'li' ),
			total               = $navs.length,
			$sectionsContainer  = $( '.custom-fullpage-ajax-container' ),
			$ajaxContainer      = $( '#ajax-container' ),
			curAjaxPageID       = $ajaxContainer.data( 'ajax-page-id' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		
		
		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
	
		//Activate the first item
		if ( $( '.entry-content' ).length == 0 ) {
			moveTo( $ajaxContainer, false, 'down', 0 );
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
			moveTo( $ajaxContainer, curURL, 'down', curIndex );
			
			
			
			return false;
			
			
		})
		
		
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
				moveTo( $ajaxContainer, false, 'down', false );
				
			} else {
				//scroll up
				moveTo( $ajaxContainer, false, 'up', false );
				
			  
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
					method   : 'POST',
					dataType : 'html',
					data     : {
						action  : 'load_singlepages_ajax_content'
					},	
					success  : function( response ) {
						
						//A function to be called if the request succeeds
						ajaxSucceeds( container, url, $( response ).find( '.entry-content' ).html() );

					},
					error: function(){
						window.location.href = url;
					},
					beforeSend: function() {

						TweenMax.set( '.ajax-loader', {
							css         : {
								'display' : 'block'
							},
							onComplete  : function() {
								TweenMax.to( '.ajax-loader', 0.5, {
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
		 * @param  {object} container - The instance returned from the request succeeds
		 * @param  {string} url       - Current URL after click
		 * @param  {string} content   - The data returned from the server
		 * @return {void}             - The constructor.
		 */
		function ajaxSucceeds( container, url, content ) {
			
		
			//Remove loader
			TweenMax.to( '.ajax-loader', 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( '.ajax-loader', {
						css         : {
							'display' : 'none'
						}
					});
					
					//The data returned from the server
					container.html( content );
	
					
				},
				delay       : 1
			});
			
			
			
			
			
			//Change page title
			if ( container.find( '#ajax-wptitle' ).length > 0 ) {
				$( 'title' ).html( container.find( '#ajax-wptitle' ).data( 'ajax-wptitle' ) );
			}
			
			// Apply the original scripts
			applyOriginalSomeScripts();

			// Modify the URL without reloading the page
			if( history.pushState ) {
				history.pushState( null, null, url );
			}
			else {
				location.hash = url;
			}
			
			//Prevent multiple request on click
			$( AJAXPageLinks ).data( 'request-running', false );
			
		}
		
		
		
		/*
		 * Apply some original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		function applyOriginalSomeScripts() {
			
			App.commonHeight.pageLoaded(); //Common Height
			App.parallax.documentReady($); //Parallax
			
		}

		
		/*
		 * Apply all the original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		
		
		function applyOriginalAllScripts() {
			
			
			var scipts_pageLoaded    = App.components.pageLoaded,
				scipts_documentReady = App.components.documentReady;
			
			
			for ( var i = 0; i < scipts_pageLoaded.length; i++ ) {
			     scipts_pageLoaded[i]();
			}
			for ( var j = 0; j < scipts_documentReady.length; j++ ) {
			     scipts_documentReady[j]( $ );
			}	
		
			
			
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

    App.ajaxPageLoader = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


