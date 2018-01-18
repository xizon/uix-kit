/*! 
 *************************************
 * 3. Scroll Effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
        
		var $window      = $( window );

		// Back to top
		$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		$window.on( 'scroll touchmove', function() {

			//---
			if ( $window.scrollTop() > 120 ) {	
				$( '#toTop' ).addClass( 'active' );
			}else{
				$( '#toTop' ).removeClass( 'active' );
			};


		});	
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			$( 'html, body' ).stop().animate({
				scrollTop: 0
			}, { easing: 'easeOutQuart', duration: 500 } );	
		
		});
		
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