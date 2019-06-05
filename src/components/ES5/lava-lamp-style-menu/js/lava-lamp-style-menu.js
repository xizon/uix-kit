
/* 
 *************************************
 * <!-- Lava-Lamp Style Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.LAVA_LAMP_STYLE_MENU               = APP.LAVA_LAMP_STYLE_MENU || {};
	APP.LAVA_LAMP_STYLE_MENU.version       = '0.0.1';
    APP.LAVA_LAMP_STYLE_MENU.documentReady = function( $ ) {


		
		var $menuContainer = $( '.uix-lavalamp-menu__container' ),
		    menu           = 'ul.uix-lavalamp-menu',
			line           = menu + ' .uix-lavalamp-menu__slide-line';
		
		
		//Prevent this module from loading in other pages
		if ( $menuContainer.length == 0 ) return false;
		

		
		// adds sliding underline HTML
		$( menu ).append('<span class="uix-lavalamp-menu__slide-line"></span>');

		// set initial position of slide line
		TweenMax.set( line, {
			css: {
				width: 0,
				x: 0,
				y: 0
			}
		});
		
		
		function nemuLineGo( index ) {
			
			var $this  = $( menu + ' > li' ).eq( index ).find( 'a' ),
			    offset = $this.offset(),
				
			//find the offset of the wrapping div  
			offsetBody = $( '.uix-lavalamp-menu__container' ).offset();

			
			//Activate navigation style
			$( menu + ' > li' ).removeClass( 'is-active' );
			$this.parent().addClass( 'is-active' );
			
			// GSAP animate to clicked menu item
			TweenMax.to( line, 1, {
				css: {
					width  : parseFloat( $this.outerWidth() + 0 ) + 'px',
					x      : ( offset.left - offsetBody.left ) + 'px'
				},
				ease: Elastic.easeOut.config(1, 0.5)
			});
			
			
			
	
		}

		// animate slide-line on click
		$( document ).on( 'mouseover', menu + ' > li a', function() {

			nemuLineGo( $( this ).parent().index() );

		});
		

		
		nemuLineGo( 0 );
		


		
    };

    APP.components.documentReady.push( APP.LAVA_LAMP_STYLE_MENU.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




