
/* 
 *************************************
 * <!-- Theme Scripts  -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
    
    APP.MAIN               = APP.MAIN || {};
	APP.MAIN.version       = '0.0.1';
    APP.MAIN.documentReady = function( $ ) {

		/* 
		 ====================================================
		 *  Function Title Here
		 ====================================================
		 */
		//your code here...
		
		
    };
	
    APP.MAIN.pageLoaded    = function() {

		/* 
		 ====================================================
		 *  Function Title Here
		 ====================================================
		 */
		//your code here...
		
    };
	

    APP.components.documentReady.push( APP.MAIN.documentReady );
    APP.components.pageLoaded.push( APP.MAIN.pageLoaded );
	
	
    return APP;

}( APP, jQuery, window, document ) );


