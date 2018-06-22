/* 
 *************************************
 * <!-- Custom Core Scripts  -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
    
    APP.INDEX               = APP.INDEX || {};
	APP.INDEX.version       = '0.0.1';
    APP.INDEX.documentReady = function( $ ) {

	    //your code here...
		
    };
	
    APP.INDEX.pageLoaded    = function() {

	    //your code here...
		
    };
	

    APP.components.documentReady.push( APP.INDEX.documentReady );
    APP.components.pageLoaded.push( APP.INDEX.pageLoaded );
	
	
    return APP;

}( APP, jQuery, window, document ) );




