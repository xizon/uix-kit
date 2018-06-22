
/* 
 *************************************
 * <!-- Mobile Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MOBILE_MENU               = APP.MOBILE_MENU || {};
	APP.MOBILE_MENU.version       = '0.0.1';
    APP.MOBILE_MENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();




		//Show Toolbar when viewing site for WordPress
		var waypoints = $( '.admin-bar .menu-mobile-toggle' ).waypoint({
			handler: function( direction ) {

				$( this.element ).toggleClass( 'spy-scroll-postion', direction === 'down' );

			},
			offset: -46
		});



		// Mobile Menu
		var $toggle     = $( '.menu-mobile-toggle' ),
			$toggleBody = $( 'body' );



		//Add mobile menu to your website
		$( 'nav.menu-container' ).clone().addClass( 'mobile' ).appendTo( 'body' );
		//Wait until previous .appendTo() is complete
		$.when( $( '.menu-container.mobile' ).length > 0 ).then( function(){


			$toggle.on( 'touchstart click', function( e ) {
				e.preventDefault();

				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation(); 

				$( this ).toggleClass( 'open' );
				if ( $( this ).hasClass( 'open' ) ) {

					//Add mobile brand
					var logoURL = $( '.mobile-brand img' ).attr( 'src' );
					if ( typeof logoURL !== typeof undefined && logoURL != '' ) {
						if ( logoURL.indexOf( 'blank.gif' ) >= 0 ) $( '.mobile-inner' ).css( 'margin-top', '-70px' );
					}	

					//Toggle effect
					$toggleBody.addClass( 'menu-open' );
				} else {
					$toggleBody.removeClass( 'menu-open' );
				}

			});

			//Mobile menu mask event
			$( '.menu-mobile-mask' ).on( 'click', function() {
				$toggle.removeClass( 'open' );
				$toggleBody.removeClass( 'menu-open' );
			});




			// Menu click event
			$( '.menu-container.mobile ul li' ).on( 'click', function( e ) {

				  var arrowText = $( this ).find( '.mobile-nav-arrow' ).text().replace( /(.).*\1/g, "$1" );
				  $( this ).find( '> .sub-menu:not(.sub-sub)' ).toggle();

				  if ( arrowText != '-' ) {
					  $( this ).find( '.mobile-nav-arrow' ).text( '-' );
				  } else {
					  $( this ).find( '.mobile-nav-arrow' ).text( '+' );
				  }


			} );


			sidrmenuInit( windowWidth ); 

			// Close the menu on window change
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( $window.width() != windowWidth ) {

					// Update the window width for next time
					windowWidth = $window.width();

					// Do stuff here
					$toggleBody.removeClass( 'menu-open' );
					$toggle.removeClass( 'open' );
					sidrmenuInit( windowWidth );


				}
			});


		});




		function sidrmenuInit( w ) {

			if ( w <= 768 ) {
				$( '.menu-container.mobile .menu-main > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.mobile-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="mobile-nav-arrow">+</em>' );
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


