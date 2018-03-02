/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	1. Header
	2. Loader
	3. Back to Top
	4. Overlay
	5. Navigation
	6. Videos
	7. Multiple columns full height for Bootstrap 3.x
	8. Mega Menu
	9. Dropdown Categories
	10. Pagination
	11. Specify a background image

*/

var templateUrl = wp_theme_custom_root_path.templateUrl,
	homeUrl     = wp_theme_custom_root_path.homeUrl;

//Determine whether it is a special browser
var is_safari   = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE        = !!window.ActiveXObject || "ActiveXObject" in window;     /*Test to 6 ~ 11 (not edge) */


var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="'+templateUrl+'/assets/images/blank.gif" alt="" style="display:none">' );
	}
	$( 'body' ).waitForImages( pageLoaded );
    $( document ).ready( documentReady );
	
	
	
    function documentReady( context ) {
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }

    function pageLoaded( context ){
        
        context = typeof context == "object" ? $ : context;
        components.pageLoaded.forEach( function( component ) {
           component( context );
        });
    }

    theme.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    theme.components         = components;
    theme.documentReady      = documentReady;
	theme.pageLoaded         = pageLoaded;

    return theme;
}( jQuery, window, document ) ); 

