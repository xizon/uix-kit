
/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_MENU2               = APP.DROPDOWN_MENU2 || {};
	APP.DROPDOWN_MENU2.version       = '0.0.4';
    APP.DROPDOWN_MENU2.documentReady = function( $ ) {

		var $verticalMenuLi = $( '.uix-vertical-menu li' );
		
		$verticalMenuLi.find( '> a' ).on( 'click', function( e ) {
			
			var $sub = $( this ).next( 'ul' );
			
			if ( $sub.length > 0 ) {

				e.preventDefault();
				
				//Its value is not a boolean but a string
				var expanded = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true;
				
				if ( expanded ) {
					//Hide other all sibling <ul> of the selected element
					var $e = $( this ).parent( 'li' ).siblings().find( '> a' );
					
					$e.removeClass( 'active' ).attr( 'aria-expanded', false );

					$( this ).addClass( 'active' ).attr( 'aria-expanded', true );
					
					
					TweenMax.to( $e.next( 'ul' ), 0.5, { height: 0 } );

					//to open
					// - temporarilty set height:auto
					// - tween from height:0
					TweenMax.set( $sub, { height: 'auto' } );
					TweenMax.from( $sub, 0.5, { height:0 } );	

					
					
					
				} else {
					
					$( this ).removeClass( 'active' ).attr( 'aria-expanded', false );
					
					//to close
					TweenMax.to( $sub, 0.5, { height: 0 } );

				}
				

				
				
				return false;
			}
				

        });
		
		//Add multilevel indicator arrow
		if ( $verticalMenuLi.find( '> a .uix-vertical-menu__arrow' ).length == 0 ) {
			$verticalMenuLi.find( '> a' ).append( '<span class="uix-vertical-menu__arrow"></span>' );
		}
        
		$verticalMenuLi.each( function() {
			var len = $( this ).find( 'ul' ).length;
			if ( len == 0 ) {
				$( this ).children( 'a' ).children( '.uix-vertical-menu__arrow' ).hide();
			}
		});
		
    };

    APP.components.documentReady.push( APP.DROPDOWN_MENU2.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


