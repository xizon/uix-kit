
/*
 * Check if a string is a valid JSON string
 * Note: Used when certain functions use "JSON.parse"
 *
 * @param  {String} string                   - A json arbitrary string
 * @return {Boolean}                         - Return a boolean.
 */
( function ( $ ) {
    'use strict';
    $.fn.UixIsJsonObj = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			string    : ''
        }, options );
 
        this.each( function() {
			
			const str = settings.str;

			if ( typeof( str ) == 'string' && str.length > 0 ) {

				if ( str.replace( /\"\"/g, '' ).replace( /\,/g, '' ) == '[{}]' ) {
					return false;
				} else {

					if (/^[\],:{}\s]*$/.test( str.replace(/\\["\\\/bfnrtu]/g, '@' ).
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

						return true;

					}else{

						return false;

					}	

				}

			} else {
				return false;
			}
			
			
		});
 
    };
 
}( jQuery ));
