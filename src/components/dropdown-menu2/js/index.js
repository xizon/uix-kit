
/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */	
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const DROPDOWN_MENU2 = ( ( module, $, window, document ) => {
	if ( window.DROPDOWN_MENU2 === null ) return false;
	
	
	
    module.DROPDOWN_MENU2               = module.DROPDOWN_MENU2 || {};
    module.DROPDOWN_MENU2.version       = '0.0.5';
    module.DROPDOWN_MENU2.documentReady = function( $ ) {

		const $verticalMenuLi = $( '.uix-vertical-menu li' );
		
		$verticalMenuLi.find( '> a' ).off( 'click' ).on( 'click', function( e ) {
			
			const $sub = $( this ).next( 'ul' );
			
			if ( $sub.length > 0 ) {

				e.preventDefault();
				
				//Its value is not a boolean but a string
				const expanded = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true;
				
				if ( expanded ) {
					//Hide other all sibling <ul> of the selected element
					const $e = $( this ).parent( 'li' ).siblings().find( '> a' );
					
					$e.removeClass( 'is-active' ).attr( 'aria-expanded', false );

					$( this ).addClass( 'is-active' ).attr( 'aria-expanded', true );
					
					
					TweenMax.to( $e.next( 'ul' ), 0.5, { height: 0 } );

					//to open
					// - temporarilty set height:auto
					// - tween from height:0
					TweenMax.set( $sub, { height: 'auto' } );
					TweenMax.from( $sub, 0.5, { height:0 } );	

					
					
					
				} else {
					
					$( this ).removeClass( 'is-active' ).attr( 'aria-expanded', false );
					
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
			const len = $( this ).find( 'ul' ).length;
			if ( len == 0 ) {
				$( this ).children( 'a' ).children( '.uix-vertical-menu__arrow' ).hide();
			}
		});
		
    };

    module.components.documentReady.push( module.DROPDOWN_MENU2.documentReady );

	return class DROPDOWN_MENU2 {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


