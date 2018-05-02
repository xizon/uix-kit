
/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.custom-accordion' ).each( function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' ),
				$li             = $this.find( 'dl' ),
				$titlebox       = $this.find( 'dt' );
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.filter( '.active' ).find( 'dd' ).slideDown( 300 );
			}
			

			$titlebox.on( aEvent, function() {
				
				var $cur = $( this ).closest( 'dl' );
				
				if ( !$cur.hasClass( 'active' ) ) {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );

					$cur.addClass( 'active' );
					$cur.find( 'dd' ).slideDown( 300 );	
				} else {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );
				}
				
			}); 
			
			
		});
		
		
	};
	
		
    App.accordion = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
