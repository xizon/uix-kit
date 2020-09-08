
/* 
 *************************************
 * <!-- Lava-Lamp Style Menu -->
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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const LAVA_LAMP_STYLE_MENU = ( ( module, $, window, document ) => {
	if ( window.LAVA_LAMP_STYLE_MENU === null ) return false;
	
	
	
    module.LAVA_LAMP_STYLE_MENU               = module.LAVA_LAMP_STYLE_MENU || {};
    module.LAVA_LAMP_STYLE_MENU.version       = '0.0.3';
    module.LAVA_LAMP_STYLE_MENU.documentReady = function( $ ) {


		
		const $menuContainer = $( '.uix-lavalamp-menu__container' ),
		      menu           = 'ul.uix-lavalamp-menu',
			  followEl       = menu + ' .uix-lavalamp-menu__slide-line';
		
		
		//Prevent this module from loading in other pages
		if ( $menuContainer.length == 0 ) return false;
		

		
		// adds sliding underline HTML
		$( menu ).append('<span class="uix-lavalamp-menu__slide-line"></span>');

		// set initial position of element
		TweenMax.set( followEl, {
			css: {
				width: 0,
				x: 0,
				y: 0
			}
		});
		
		
		function mouseFollowEv( index ) {
			
			const $this      = $( menu + ' > li' ).eq( index ).find( 'a' ),
			      offset     = $this.offset(),
                  offsetBody = $( '.uix-lavalamp-menu__container' ).offset(); //find the offset of the wrapping div  

			
			//Activate navigation style
			$( menu + ' > li' ).removeClass( 'is-active' );
			$this.parent().addClass( 'is-active' );
			
			// GSAP animate to clicked menu item
			TweenMax.to( followEl, 1, {
				css: {
					width  : parseFloat( $this.outerWidth() + 0 ) + 'px',
					x      : ( offset.left - offsetBody.left ) + 'px'
				},
				ease: Elastic.easeOut.config(1, 0.5)
			});
			
			
			
	
		}

		
		//!import: Please do not try `$( document ).on( MOUSE_EVENT )` to improve performance
		$( menu + ' > li a' ).on( 'mouseover', function() {
			mouseFollowEv( $( this ).parent().index() );
		});
		

		
		mouseFollowEv( 0 );
		


		
    };

    module.components.documentReady.push( module.LAVA_LAMP_STYLE_MENU.documentReady );

	return class LAVA_LAMP_STYLE_MENU {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


