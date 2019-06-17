
/**

	TABLE OF CONTENTS
	---------------------------


	${{TOC}}

*/

/*
 *************************************
 * <!-- Base -->
 *************************************
 */
import '../scss/_style.scss';


/*
 * Global variables from front pages
 *
 * @private
 */
export let
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
 * Determine whether it is a special browser
 *
 * @private
 */
export const browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};



/*
 * Core scripts for current site
 *
 * @private
 * @description Used for all modules from ./src/components/ES6/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/jquery.waypoints.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 */
export const UixModuleInstance = ( ( $, window, document ) => {
	'use strict';

    var _APP           = {},
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

})( $, window, document );




/*
 * Create GUID / UUID
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}                        - The globally-unique identifiers.
 */
export const UixGUID = UixGUID || ( () => {
    function t() {
        do {
            var x = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function(t) {
                var x = 16 * Math.random() | 0;
                return ("x" == t ? x: 3 & x | 8).toString(16)
            })
        } while (! t . register ( x ));
        return x;
    }

    return t.version = "1.4.2",
    t.create = function() {
        return t();
    },
    t._list = {},
    Object.defineProperty(t, "list", {
        get: function() {
            var x = [];
            for (var r in t._list) x.push(r);
            return x;
        },
        set: function(x) {
            t._list = {};
            for (var r = 0; r < x.length; r++) t._list[x[r]] = 1;
        }
    }),
    t.exists = function(x) {
        return !! t._list[x];
    },
    t.register = function(x) {
        return ! t.exists(x) && (t._list[x] = 1, !0);
    },
	t
})();



/*
 * Evaluating a string as a mathematical expression in JavaScript
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}            - New calculation result.
 */
export const UixMath = UixMath || ( () => {
    function t() { }

    return t.version = "0.0.1",

    t.evaluate = function(s) {

		var chars = s.replace(/\s/g, '').split("");
		var n = [], op = [], index = 0, oplast = true;

		n[index] = "";

		// Parse the expression
		for (var c = 0; c < chars.length; c++) {

			if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
				op[index] = chars[c];
				index++;
				n[index] = "";
				oplast = true;
			} else {
				n[index] += chars[c];
				oplast = false;
			}
		}

		// Calculate the expression
		s = parseFloat(n[0]);
		for (var o = 0; o < op.length; o++) {
			var num = parseFloat(n[o + 1]);
			switch (op[o]) {
				case "+":
					s = s + num;
					break;
				case "-":
					s = s - num;
					break;
				case "*":
					s = s * num;
					break;
				case "/":
					s = s / num;
					break;
			}
		}

		return s;
    },
	t
})();



/*
 * Get the CSS property
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Object} el     - Target object, using class name or ID to locate.
 * @return {String|JSON}   - The value of property.
 */
export const UixCssProperty = UixCssProperty || ( () => {
    function t() { }

    return t.version = "0.0.1",

    t.getTransitionDuration = function( el ) {

		if ( typeof el === typeof undefined ) {
			return 0;
		}


		var style    = window.getComputedStyle(el),
			duration = style.webkitTransitionDuration,
			delay    = style.webkitTransitionDelay;

		if ( typeof duration != typeof undefined ) {
			// fix miliseconds vs seconds
			duration = (duration.indexOf("ms")>-1) ? parseFloat(duration) : parseFloat(duration)*1000;
			delay = (delay.indexOf("ms")>-1) ? parseFloat(delay) : parseFloat(delay)*1000;

			return duration;
		} else {
			return 0;
		}

    },

    //
    t.getAbsoluteCoordinates = function( el ) {

		var windowWidth     = window.innerWidth,
			leftPos         = null,
			topPos          = null;

		if ( ! document.getElementsByTagName( 'body' )[0].className.match(/rtl/) ) {
			leftPos = ( el.offsetLeft == 0 ) ? el.parentElement.offsetLeft : el.offsetLeft;
			topPos = ( el.offsetTop == 0 ) ? el.parentElement.offsetTop : el.offsetTop;
		} else {

			// width and height in pixels, including padding and border
			// Corresponds to jQuery outerWidth(), outerHeight()
			leftPos = ( el.offsetLeft == 0 ) ? ( windowWidth - ( el.parentElement.offsetLeft + el.parentElement.offsetWidth ) ) : ( windowWidth - ( el.offsetLeft + el.offsetWidth ) );
			topPos = ( el.offsetTop == 0 ) ? ( windowWidth - ( el.parentElement.offsetTop + el.parentElement.offsetHeight ) ) : ( windowWidth - ( el.offsetTop + el.offsetHeight ) );
		}


		return {
			'left': leftPos,
			'top': topPos
		};

    },


	t
})();

