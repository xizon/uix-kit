
/*
 * Apply all the asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} runAll          - Run all module scripts.
 * @return {Void}
 *
 * @Usage:
    
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncAllScripts();
    } );
} ) ( jQuery );
</script>
	

 *
 * 
 */
import { UixModuleInstance } from '@uixkit/core/_global/js';

( function ( $ ) {
	'use strict';
	
    $.fn.UixApplyAsyncAllScripts = function( options ) {
 
		// This is the easiest way to have default options.
		var settings = $.extend({
			runAll    : true
		}, options );
		
		
        this.each( function() {
		
			var scipts_pageLoaded    = UixModuleInstance.components.pageLoaded,
				scipts_documentReady = UixModuleInstance.components.documentReady;

			if ( settings.runAll ) {

				for ( var i = 0; i < scipts_pageLoaded.length; i++ ) {
					 scipts_pageLoaded[i]();
				}
				for ( var j = 0; j < scipts_documentReady.length; j++ ) {
					 scipts_documentReady[j]( $ );
				}
			}



			//Uix Shortcodes
			if ( $.isFunction( $.uix_sc_init ) ) {
				$.uix_sc_init();
			}	
			
		});
 
    };
 
}( jQuery ));
