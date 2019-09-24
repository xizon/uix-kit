
/*
 * Render Multiple Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderCustomMultiSel = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__multi-sel'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				$( this ).find( '> span' ).each( function()  {

					var targetID = '#' + $( this ).parent().attr( 'data-targetid' );

					if ( $( targetID ).val().indexOf( $( this ).data( 'value' ) ) >= 0 ) {
						$( this ).addClass( 'is-active' ).attr( 'aria-checked', true );
					} else {
						$( this ).removeClass( 'is-active' ).attr( 'aria-checked', false );
					}	



				});
			});
			
		});
 
    };
 
}( jQuery ));
