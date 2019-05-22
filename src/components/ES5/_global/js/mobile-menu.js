
/* 
 *************************************
 * <!-- Mobile Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MOBILE_MENU               = APP.MOBILE_MENU || {};
	APP.MOBILE_MENU.version       = '0.0.4';
    APP.MOBILE_MENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;




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



			// Fires drop-menu event 
			var $drMenuLi = $( '.uix-menu__container.is-mobile ul li' );

			$drMenuLi.find( '> a' ).on( 'click', function( e ) {
				
				var arrowText = $( this ).find( '.uix-menu__arrow-mobile' ).text().replace( /(.).*\1/g, "$1" ),
					$sub      = $( this ).next( 'ul' );

				if ( $sub.length > 0 ) {

					e.preventDefault();

					
					//Its value is not a boolean but a string
					var expanded = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true;

					if ( expanded ) {
						//Hide other all sibling <ul> of the selected element
						var $e = $( this ).parent( 'li' ).siblings().find( '> a' );

						$e.removeClass( 'is-opened' ).attr( 'aria-expanded', false );
						$e.parent( 'li' ).find( '.uix-menu__arrow-mobile' ).removeClass( 'is-opened' );
						$e.parent( 'li' ).removeClass( 'is-opened' );
						

						$( this ).addClass( 'is-opened' ).attr( 'aria-expanded', true );
						$( this ).parent( 'li' ).find( '.uix-menu__arrow-mobile' ).addClass( 'is-opened' );
						$( this ).parent( 'li' ).addClass( 'is-opened' );


						TweenMax.to( $e.next( 'ul' ), 0.5, { height: 0 } );

						//to open
						// - temporarilty set height:auto
						// - tween from height:0
						TweenMax.set( $sub, { height: 'auto' } );
						TweenMax.from( $sub, 0.5, { height:0 } );	


					} else {

						$( this ).removeClass( 'is-opened' ).attr( 'aria-expanded', false );
						$( this ).parent( 'li' ).find( '.uix-menu__arrow-mobile' ).removeClass( 'is-opened' );
						$( this ).parent( 'li' ).removeClass( 'is-opened' );

						//to close
						TweenMax.to( $sub, 0.5, { height: 0 } );

					}




					return false;
				}


			});
			
			
			mobileMenuInit( windowWidth ); 

			// Close the menu on window change
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( window.innerWidth != windowWidth ) {

					// Update the window width for next time
					windowWidth = window.innerWidth;

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
		 * @param  {Number} w                  - Returns width of browser viewport.
		 * @return {Void}
		 */
		function mobileMenuInit( w ) {

			if ( w <= 768 ) {
				$( '.uix-menu__container.is-mobile .uix-menu > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.uix-menu__arrow-mobile' ).length < 1 ) $( this ).prepend( '<em class="uix-menu__arrow-mobile"></em>' );
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


