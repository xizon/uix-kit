
/*
 * Disabled Controls
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderControlsDisable = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : 'input.is-disabled'
        }, options );
 
        this.each( function() {
		
			$( settings.controls ).prop( 'disabled', true );
			
		});
 
    };
 
}( jQuery ));
