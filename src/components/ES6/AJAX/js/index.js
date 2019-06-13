/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
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
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const AJAX_PAGE_LOADER = ( ( module, $, window, document ) => {
	
	
    module.AJAX_PAGE_LOADER               = module.AJAX_PAGE_LOADER || {};
	module.AJAX_PAGE_LOADER.version       = '0.0.8';
    module.AJAX_PAGE_LOADER.documentReady = function( $ ) {

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
			moveTo( $( ajaxContainer ), false, 'down', 0, false );
		} else {
			//Activate navigation from AJAX request
			if ( typeof curAjaxPageID != typeof undefined ) $navs.eq( curAjaxPageID ).addClass( 'is-active' );
		}

		
		
		
		//Detect URL change
		window.addEventListener( 'popstate', function( e ) {
			moveTo( $( ajaxContainer ), false, 'down', 0, false );
		});

		
		

		/* 
		 ====================================================
		 *  AJAX Interaction
		 ====================================================
		 */
		/*
		 * Initialize the clickable ajax links
		 *
		 * @return {Void}
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

			
						
			// Modify the URL without reloading the page
			if( history.pushState ) {
				history.pushState( null, null, curURL );

			} else {
				location.hash = curURL;
			}
			
			
			//Click on this link element using an AJAX request
			var dir = ( $navs.filter( '.is-active' ).find( '> a' ).attr( 'data-index' ) > curIndex ) ? 'up' : 'down';
			moveTo( $( ajaxContainer ), curURL, dir, curIndex, false );
			
			
			
			return false;
			
			
		});

		//Detect URL change & Fire click event
		window.addEventListener( 'popstate', function( e ) {
		
			var eleTarget = null,
				goURL     = location.href;
			
			$( AJAXPageLinks ).each( function() {
				
				//don't use $( this ).attr( 'href' )
				
				if ( this.href === location.href ) {
					eleTarget = this;
					goURL = this.href;
				}
			});

		
			var pageIndex = $( eleTarget ).data( 'index' );
			
			//Push new content to target container
			if ( typeof pageIndex != typeof undefined ) {
				moveTo( $( ajaxContainer ), goURL, 'down', pageIndex, false );
			}
			
			// Output history button
			//console.log(  $( eleTarget ).data( 'index' ) );
			
			
		});
		
		
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {Object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $( ajaxContainer ), false, 'down', false, true );
				
			} else {
				//scroll up
				moveTo( $( ajaxContainer ), false, 'up', false, true );
				
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
		 * @param  {Boolean} wheel       - Whether to enable mouse wheel control.
		 * @return {Void}
		 */
		function moveTo( container, url, dir, customIndex, wheel ) {
			var index     = parseFloat( $navs.filter( '.is-active' ).find( '> a' ).attr( 'data-index' ) ),
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
				$navs.removeClass( 'is-active' );
				$navs.eq( nextIndex ).addClass( 'is-active' );

				
				//Use automatic indexing when no URLs come in.
				if ( !url || typeof url === typeof undefined ) {
					url = $navs.eq( nextIndex ).find( '> a' ).attr( 'href' );
				}
				

						
				// Modify the URL without reloading the page when mouse wheel
				if ( wheel ) {
					var turl = $navs.eq( nextIndex ).find( '> a' ).attr( 'href' );
					
					if( history.pushState ) {
						history.pushState( null, null, url );

					} else {
						location.hash = turl;
					}
		
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
						ajaxSucceeds( dir, container, $( response ).find( '.js-uix-ajax-load__container' ).html(), $( response ).filter( 'title' ).text() );

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
		 * @param  {String} content   - The data returned from the server
		 * @param  {String} title        - The title of a requested page.
		 * @return {Void}
		 */
		function ajaxSucceeds( dir, container, content, title ) {
			
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
					container.html( content ).promise().done( function() {
						
						//Transition effect between two elements.
						eleTransitionEff( dir, oldContent, content );

						
						//Change the page title
						if ( title ) {
							document.title = title;
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
		 * @param  {String} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {String} oldContent     - A string of HTML to set as the content of matched old element.
		 * @param  {String} newContent     - A string of HTML to set as the content of matched new element.
		 * @return {Void}
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

			
			$originalItem.first().find( ajaxContainer ).html( oldContent ).promise().done( function() {
						

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


						// Apply some asynchronism scripts
						UixApplyAsyncScripts();
						
						
					}
				});
	
			});
			
			
		}
		

		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		var startY = 0;
		var onTouchStart = function ( e ) {
			var touches = e.touches;
			if ( touches && touches.length ) {
				startY = touches[0].pageY;
				
			}
		};

		
		var onDeviceWheel = function ( e ) {
			
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var dir, delta, mobileDeltaY = null;
			
			var touches = e.touches;
			if ( touches && touches.length ) {
				mobileDeltaY = startY - touches[0].pageY;
			} else {
				delta = Math.max(-1, Math.min(1, (-e.deltaY)));
			}
			
		
			if ( mobileDeltaY != null ) {
				
				if ( mobileDeltaY >= 50 ) {
					//--- swipe up
				    dir = 'up';
				}
				if ( mobileDeltaY <= -50 ) {
					//--- swipe down
					dir = 'down';
				
				}	
			} else {
				if( delta < 0 ) { 
					//scroll down
					dir = 'down';

				} else {
					//scroll up
					dir = 'up';
				}	
			}

			
			scrollMoveInit( e, dir );
			
		};
		


		window.addEventListener( 'wheel', onDeviceWheel, { passive: true } );
		window.addEventListener( 'touchstart', onTouchStart, { passive: true } );
		window.addEventListener( 'touchmove', onDeviceWheel, { passive: true } );
		
		
    };

    module.components.documentReady.push( module.AJAX_PAGE_LOADER.documentReady );

	return class AJAX_PAGE_LOADER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

