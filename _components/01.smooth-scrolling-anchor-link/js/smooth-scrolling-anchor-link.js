
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
		
	
		
		$( 'a[href*="#"]' ).on( 'click', function( e ) {
		
			if ( 
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
				location.hostname == this.hostname
			) {
				
				// Figure out element to scroll to
				var target = $( this.hash );
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if ( target.length ) {

					// Only prevent default if animation is actually gonna happen
					e.preventDefault();
					

					$( 'html, body' ).animate({
						scrollTop: target.offset().top
					}, 500, function() {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ( $target.is( ':focus' ) ) { // Checking if the target was focused
							return false;
						} else {
							$target.attr( 'tabindex', '-1' ); // Adding tabindex for elements not focusable
							$target.focus();
						};
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

