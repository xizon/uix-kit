
/* 
 *************************************
 * <!-- Smooth Scrolling When Clicking An Anchor Link -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
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
			TweenLite.to( window, 0.5, {
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
					

					TweenLite.to( window, 0.5, {
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
	
		
    theme.smoothScrollingAnchorLink = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

