

/* 
 *************************************
 * <!-- AJAX -->
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
			
			theme.commonHeight.pageLoaded(); //Common Height
			theme.accordion.documentReady($); //Accordion
			
			
		}

	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


