
/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ACCORDION               = APP.ACCORDION || {};
	APP.ACCORDION.version       = '0.0.1';
    APP.ACCORDION.documentReady = function( $ ) {

		$( '.custom-accordion' ).each( function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' ),
				$li             = $this.children( 'dl' ),
				$titlebox       = $this.find( 'dt' );
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.first().addClass( 'active' );
			}
			

			$li.on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
				
				$( this ).find( 'dd' ).addClass( 'active' );
				
				
				if ( !$( this ).hasClass( 'active' ) ) {
					$li.removeClass( 'active' );

					$( this ).addClass( 'active' );
				} else {
					$li.removeClass( 'active' );
				}
			
			}); 
						
			
			
		});
		
    };

    APP.components.documentReady.push( APP.ACCORDION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


