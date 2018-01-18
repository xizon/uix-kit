/*! 
 *************************************
 * 3. Scroll Effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
        
		// Back to top
		$( document ).UItoTop( { easingType: 'easeOutQuart', scrollSpeed: 500 } );
		
		// Scroll to element
		$( 'a[href^="#"]' ).on( 'click', function( e ) {
		
			var target = $( this ).attr( 'href' );
		    
			if ( $( target ).length ) {
				e.preventDefault();
				$( 'html, body' ).stop().animate({
					scrollTop: $( target ).offset().top
				}, 1000);	
			}
	
		
		});
		
		// Making class active by scrolling past it
		$( window ).on( 'scroll touchmove', function() {
			var scrollTop = $( window ).scrollTop();
			
			$( '[data-section="true"]' ).each(function() {
			    
				var curID = $( this ).attr( 'id' );
				
				if ( scrollTop > $( this ).offset().top - 20 ) {
					$( '.menu-main li.active' ).removeClass( 'active' );
					$( '.menu-main li a[href^="#'+curID+'"]' ).parent().addClass( 'active' );
				}
	
			});
		});
		
		
    };

    theme.scrolltop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );