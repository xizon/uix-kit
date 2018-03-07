

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
			
			theme.rowFullheight.pageLoaded(); //Multiple columns full height for Bootstrap 3.x
			theme.accordion.documentReady($); //Accordion
			
			
		}

	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


