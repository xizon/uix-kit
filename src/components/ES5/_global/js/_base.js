
/**

	TABLE OF CONTENTS
	---------------------------
	
	
	${{TOC}}

*/


if ( typeof jQuery === 'undefined' || typeof TweenMax === 'undefined' || typeof Waypoint === 'undefined' || typeof videojs === 'undefined' ) {
    throw new Error( 'Uix Kit\'s JavaScript requires jQuery, TweenMax, Waypoint and videojs.' );
}

//Fixed a bug that Cannot read property 'fn' of undefined for jQuery 1.xx.x.
window.$ = window.jQuery;

/* 
 *************************************
 * Global variables from front pages
 *************************************
 */
var 
	//If the file is in the root directory, you can leave it empty. 
	//If in another directory, you can write: "/blog"
    templateUrl, 

	//Eg. https://uiux.cc
	homeUrl, 
	
	//Eg. https://uiux.cc/wp-admin/admin-ajax.php
	ajaxUrl; 


if ( typeof APP_ROOTPATH === 'undefined' ) {
    templateUrl = '';
	homeUrl     = '';
	ajaxUrl     = '';
} else {
    templateUrl = APP_ROOTPATH.templateUrl.replace(/\/\s*$/, '' );
	homeUrl     = APP_ROOTPATH.homeUrl.replace(/\/\s*$/, '' );
	ajaxUrl     = APP_ROOTPATH.ajaxUrl.replace(/\/\s*$/, '' );
}



/* 
 *************************************
 * Determine whether it is a special browser
 *************************************
 */
var browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};




/* 
 *************************************
 * Core scripts for current site
 *************************************
 */

/**
 * APP
 * @global
 *
 * //Used for all modules from ./src/components/ES5/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/jquery.waypoints.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 * 
 */
var APP = (function ( $, window, document ) {
    'use strict';

    var _APP           = {},
        components     = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">' );
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

    _APP.setContext = function ( contextSelector ) {
        var context = $;
        if ( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    _APP.components         = components;
    _APP.documentReady      = documentReady;
	_APP.pageLoaded         = pageLoaded;

    return _APP;
}( jQuery, window, document ) ); 




