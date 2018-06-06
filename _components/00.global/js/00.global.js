/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	${{TOC}}

*/


//Global variables from front pages
var templateUrl = APP_ROOTPATH.templateUrl,
	homeUrl     = APP_ROOTPATH.homeUrl,
	ajaxUrl     = APP_ROOTPATH.ajaxUrl;

//Modify templateUrl as the correct path when local test is enabled
if ( location.hostname === 'localhost' || location.hostname === '127.0.0.1' ) {
    templateUrl = '/examples';
}


//Determine whether it is a special browser
var browser = {
	isPC : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE     : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};



//Core scripts for current site
var App = (function ( $, window, document ) {
    'use strict';

    var App           = {},
        components    = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="'+templateUrl+'/assets/images/blank.gif" alt="" style="display:none">' );
	}
	
	if( $.isFunction( $.fn.waitForImages ) ) {
		$( 'body' ).waitForImages( pageLoaded );
	} else {
		$( window ).on( 'load', pageLoaded );
	}
	
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

    App.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    App.components         = components;
    App.documentReady      = documentReady;
	App.pageLoaded         = pageLoaded;

    return App;
}( jQuery, window, document ) ); 

