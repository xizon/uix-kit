
/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_MENU2               = APP.DROPDOWN_MENU2 || {};
	APP.DROPDOWN_MENU2.version       = '0.0.1';
    APP.DROPDOWN_MENU2.documentReady = function( $ ) {

		var $verticalMenuLi = $( '.uix-vertical-menu li' );
		
		$verticalMenuLi.find( '> a' ).on( 'click', function( e ) {
			e.preventDefault();
			
			//Hide other all sibling <ul> of the selected element
			$( this ).parent( 'li' ).siblings()
			                        .removeClass( 'active' )
									.find( '> ul' ).slideUp( 500 );

			
			var $sub = $( this ).parent( 'li' ).children( 'ul' );

			$sub.slideToggle( 500 );
			$( this ).parent( 'li' ).toggleClass( 'active' );

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


