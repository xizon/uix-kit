

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
			
			pageLoaded[0](); //Loader
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


