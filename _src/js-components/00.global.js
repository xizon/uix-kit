/* 

	TABLE OF CONTENTS
	---------------------------
	
		
	1. Header
	2. Loader
	3. Scroll Effect
	4. Parallax
	5. Overlay
	6. Scroll Reveal
	7. Navigation
	8. Grid List
	9. FlexSlider
	10. Forms
	11. Text effect
	12. Retina Graphics for Website
	13. Modal
	14. Tabs
	15. Mega Menu
	16. Dropdown Categories
	17. Pagination
	18. Counter
	19. Timeline
	20. Videos
	21. Accordion
	22. Multiple columns full height for Bootstrap 3.x
	23. AJAX

*/

var templateUrl = wp_theme_root_path.templateUrl,
	homeUrl     = wp_theme_root_path.homeUrl;

var is_safari   = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/); /*Test to 9, 10. */

var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };


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





		