

/* 
 *************************************
 * <!-- AJAX -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*
		 * Apply some original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		
		
		function applyOriginalSomeScripts() {
			
			App.commonHeight.pageLoaded(); //Common Height
			App.parallax.documentReady($); //Parallax
			
			
		}

		
		/*
		 * Apply all the original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		
		
		function applyOriginalAllScripts() {
			
			
			var scipts_pageLoaded    = App.components.pageLoaded,
				scipts_documentReady = App.components.documentReady;
			
			
			for ( var i = 0; i < scipts_pageLoaded.length; i++ ) {
			     scipts_pageLoaded[i]();
			}
			for ( var j = 0; j < scipts_documentReady.length; j++ ) {
			     scipts_documentReady[j]( $ );
			}	
		
			
			
		}
	
		
		
		
	};
	
		
    App.ajax = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


