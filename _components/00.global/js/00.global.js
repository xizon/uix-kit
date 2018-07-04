/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	${{TOC}}

*/

if ( typeof jQuery === 'undefined' || typeof TweenMax === 'undefined' || typeof Waypoint === 'undefined' ) {
    throw new Error( 'Uix Kit\'s JavaScript requires jQuery, TweenMax, Waypoint.' );
}


//Global variables from front pages
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
    templateUrl = APP_ROOTPATH.templateUrl;
	homeUrl     = APP_ROOTPATH.homeUrl;
	ajaxUrl     = APP_ROOTPATH.ajaxUrl;
}


//Modify templateUrl as the correct path when local test is enabled
if ( location.hostname === 'localhost' || location.hostname === '127.0.0.1' ) {
    templateUrl = '/examples';
}


//Determine whether it is a special browser
var browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};



//Core scripts for current site
var APP = (function ( $, window, document ) {
    'use strict';

    var APP           = {},
        components    = { documentReady: [], pageLoaded: [] };

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

    APP.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    APP.components         = components;
    APP.documentReady      = documentReady;
	APP.pageLoaded         = pageLoaded;

    return APP;
}( jQuery, window, document ) ); 





/*
 * Hash Change Event
 *
 * @return {void}                        - The constructor.
 */
( function($){

  // Store the initial location.hash so that the event isn't triggered when
  // the page is first loaded.
  var last_hash = location.hash,

    // An id with which the polling loop can be canceled.
    timeout_id;

  // Special event definition.
  $.event.special.hashchange = {
    setup: function() {
      // If the event is supported natively, return false so that jQuery
      // will bind to the event using DOM methods instead of using the
      //  polling loop.
      if ( 'onhashchange' in window ) { return false; }

      // Start the polling loop if it's not already running.
      start();
    },
    teardown: function() {
      // If the event is supported natively, return false so that jQuery
      // will bind to the event using DOM methods instead of using the
      // polling loop.
      if ( 'onhashchange' in window ) { return false; }

      // Stop the polling loop. Since this event is only evern bound to
      // the `window` object, multiple-element tracking is unnecessary.
      stop();
    },
    add: function( handleObj ) {
      // Save a reference to the bound event handler.
      var old_handler = handleObj.handler;

      // This function will now be called when the event is triggered,
      // instead of the bound event handler.
      handleObj.handler = function(event) {

        // Augment the event object with the location.hash at the time
        // the event was triggered.
        event.fragment = location.hash.replace( /^#/, '' );

        // Call the originally-bound event handler, complete with modified
        // event object! The result from this call doesn't need to be
        // returned, because there is no default action to prevent, and 
        // nothing to propagate to.
        old_handler.apply( this, arguments );
      };
    }
  };

  // Start (or continue) the polling loop.
  function start() {
    // Stop the polling loop if it has already started.
    stop();

    // Get the current location.hash. If is has changed since the last loop
    // iteration, store that value and trigger the hashchange event.
    var hash = location.hash;
    if ( hash !== last_hash ) {
      $(window).trigger( 'hashchange' );
      last_hash = hash;
    }

    // Poll, setting timeout_id so the polling loop can be canceled.
    timeout_id = setTimeout( start, 100 );
  };

  // Stop the polling loop.
  function stop() {
    clearTimeout( timeout_id );
  };

})(jQuery);



/*
 * Get all attributes of an element using jQuery
 *
 * @return {array}                        - Returns a new array.
 */
( function( old ) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
} )( $.fn.attr );
