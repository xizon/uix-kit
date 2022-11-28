
/*
 * Core scripts for current site
 *
 * @private
 * @description Used for all modules from ./src/components/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 */
export const UixModuleInstance = ( ( $, window, document ) => {

    let _APP           = {},
        components     = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">' );
	}

	if ( $.isFunction( $.fn.waitForImages ) ) {
		$( 'body' ).waitForImages( pageLoaded );
	} else {
		$( window ).on( 'load', pageLoaded );
	}

    $( document ).ready( documentReady );

    function documentReady( context ) {

        context = ( typeof context == typeof undefined ) ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }
	

    function pageLoaded( context ){

        context = ( typeof context == "object" ) ? $ : context;
        components.pageLoaded.forEach( function( component ) {
           component( context );
        });
    }

    _APP.setContext = function ( contextSelector ) {
        let context = $;
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

})( $, window, document );

