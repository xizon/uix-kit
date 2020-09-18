
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
/* !!! To build a table of contents (TOC), you need to import this scss file into JS */
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
// Add feature test for passive event listener support
let supportsPassive = false;
try {
  document.addEventListener("test", null, { get passive() { supportsPassive = true }});
} catch(e) {}


export const browser = {
    isMobile        : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	isAndroid       : /(android)/i.test(navigator.userAgent),
	isPC            : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari        : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE            : !!window.ActiveXObject || "ActiveXObject" in window,     /*Test to 6 ~ 11 (not edge) */
    supportsPassive : supportsPassive
};




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




/*
 * Create GUID / UUID
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}                        - The globally-unique identifiers.
 */
export const UixGUID = UixGUID || ( () => {
    function t() { }

    return t.version = "0.0.1",

    t.create = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                  v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    //
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

		const chars = s.replace(/\s/g, '').split("");
		let n = [], op = [], index = 0, oplast = true;

		n[index] = "";

		// Parse the expression
		for (let c = 0; c < chars.length; c++) {

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
		for (let o = 0; o < op.length; o++) {
			const num = parseFloat(n[o + 1]);
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
        
    //
	t
})();



/*
 * Get the CSS property
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {!Element} el     - The Element for which to get the computed style. Using class name or ID to locate.
 * @return {String|Object}   - The value of property.
 */
export const UixCssProperty = UixCssProperty || ( () => {
    function t() { }

    return t.version = "0.0.1",

    t.getTransitionDuration = function( el ) {

		if ( typeof el === typeof undefined ) {
			return 0;
		}


		let style    = window.getComputedStyle(el),
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

		let windowWidth     = window.innerWidth,
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


     //
	t
})();

