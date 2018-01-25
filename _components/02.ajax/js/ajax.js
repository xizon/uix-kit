

/*! 
 *************************************
 * AJAX
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*
		 * Apply the original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		function applyOriginalScripts() {
			var pageLoaded    = theme.components.pageLoaded,
				documentReady = theme.components.documentReady;
			
			pageLoaded[1](); //Multiple columns full height for Bootstrap 3.x
			pageLoaded[2](); //Parallax
			pageLoaded[3](); //Sticky Elements 
			pageLoaded[4](); //Text effect
			pageLoaded[5](); //Timeline
			
			
			documentReady[0]($); //Header
			documentReady[1]($); //Back to Top
			
			
		}

	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


