
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
 */
export const browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};



/*
 * Core scripts for current site
 * @global
 *
 * //Used for all modules from ./src/components/ES6/[__]/js
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

})( $, window, document );




/*
 * Create GUID / UUID
 *
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



/*
 * Apply some asynchronism scripts
 *
 * @param  {Boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxDDList            - Run script of module "Dynamic Drop Down List from JSON".
 * @param  {Boolean} counterAnim           - Run script of module "Counter".
 * @return {Void}
 */
export const UixApplyAsyncScripts = ( options ) => {
	'use strict';

	// This is the easiest way to have default options.
	var settings = $.extend({
		scrollReveal    : true, // @from ./src/components/ES6/scroll-reveal
		ajaxPostList    : true, // @from ./src/components/ES6/list-posts
		ajaxDDList      : true, // @from ./src/components/ES6/dynamic-dropdown-list-json
		counterAnim     : true, // @from ./src/components/ES6/counter
		lightBox        : true  // @from ./src/components/ES6/lightbox
	}, options );


	//----
	if ( UixModuleInstance.MAIN )                         UixModuleInstance.MAIN.pageLoaded(); //Theme Scripts
	if ( UixModuleInstance.COMMON_HEIGHT )                UixModuleInstance.COMMON_HEIGHT.pageLoaded(); //Common Height
	if ( UixModuleInstance.ADVANCED_SLIDER )              UixModuleInstance.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)
	if ( UixModuleInstance.ADVANCED_SLIDER_FILTER )       UixModuleInstance.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider
	if ( UixModuleInstance.POST_LIST_SPLIT_FULLWIDTH )    UixModuleInstance.POST_LIST_SPLIT_FULLWIDTH.pageLoaded(); //Fullwidth List of Split
	if ( UixModuleInstance.STICKY_EL )                    UixModuleInstance.STICKY_EL.pageLoaded(); //Sticky Elements
	if ( UixModuleInstance.TEXT_EFFECT )                  UixModuleInstance.TEXT_EFFECT.pageLoaded(); //Text effect
	if ( UixModuleInstance.TIMELINE )                     UixModuleInstance.TIMELINE.pageLoaded(); //Timeline



	//----
	if ( UixModuleInstance.MAIN )                         UixModuleInstance.MAIN.documentReady($); //Theme Scripts
	if ( UixModuleInstance.TABLE )                        UixModuleInstance.TABLE.documentReady($); //Responsive Table
	if ( UixModuleInstance.TABLE_SORTER )                 UixModuleInstance.TABLE_SORTER.documentReady($); //Table Sorter
	if ( UixModuleInstance.MODAL_DIALOG )                 UixModuleInstance.MODAL_DIALOG.documentReady($); //Modal Dialog
	if ( UixModuleInstance.PARALLAX )                     UixModuleInstance.PARALLAX.documentReady($); //Parallax
	if ( UixModuleInstance.VIDEOS )                       UixModuleInstance.VIDEOS.documentReady($); //Videos
	if ( UixModuleInstance.BODY_AND_HEADER )              UixModuleInstance.BODY_AND_HEADER.documentReady($); //Header Area
	if ( UixModuleInstance.SET_BG )                       UixModuleInstance.SET_BG.documentReady($); //Specify a background image
	if ( UixModuleInstance.GET_CUSTOM_ATTRS )             UixModuleInstance.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
	if ( UixModuleInstance.PAGINATION )                   UixModuleInstance.PAGINATION.documentReady($); //Pagination
	if ( UixModuleInstance.FORM )                         UixModuleInstance.FORM.documentReady($); //Form
	if ( UixModuleInstance.FLEXSLIDER )                   UixModuleInstance.FLEXSLIDER.documentReady($); //Flexslider
	if ( UixModuleInstance.RETINA )                       UixModuleInstance.RETINA.documentReady($); //Retina Graphics for Website
	if ( UixModuleInstance.SHOW_MORELESS )                UixModuleInstance.SHOW_MORELESS.documentReady($); //Show More Less
	if ( UixModuleInstance.DROPDOWN_MENU )                UixModuleInstance.DROPDOWN_MENU.documentReady($); //Dropdown Menu
	if ( UixModuleInstance.DROPDOWN_MENU2 )               UixModuleInstance.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
	if ( UixModuleInstance.ACCORDION )                    UixModuleInstance.ACCORDION.documentReady($); //Accordion
	if ( UixModuleInstance.ADVANCED_CONTENT_SLIDER )      UixModuleInstance.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider
	if ( UixModuleInstance.GALLERY )                      UixModuleInstance.GALLERY.documentReady($); //Gallery
	if ( UixModuleInstance.IMAGE_SHAPES )                 UixModuleInstance.IMAGE_SHAPES.documentReady($); //Image Shapes
	if ( UixModuleInstance.PERIODICAL_SCROLL )            UixModuleInstance.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
	if ( UixModuleInstance.PRICING )                      UixModuleInstance.PRICING.documentReady($); //Pricing
	if ( UixModuleInstance.PROGRESS_BAR )                  UixModuleInstance.PROGRESS_BAR.documentReady($); //Progress Bar
	if ( UixModuleInstance.PROGRESS_LINE )                 UixModuleInstance.PROGRESS_LINE.documentReady($); //Progress Line
	if ( UixModuleInstance.ROTATING_EL )                  UixModuleInstance.ROTATING_EL.documentReady($); //Rotating Elements
	if ( UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK )  UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
	if ( UixModuleInstance.TABS )                         UixModuleInstance.TABS.documentReady($); //Tabs
	if ( UixModuleInstance.TEAM_FOCUS )                   UixModuleInstance.TEAM_FOCUS.documentReady($); //Team Focus
	if ( UixModuleInstance.LAVA_LAMP_STYLE_MENU )         UixModuleInstance.LAVA_LAMP_STYLE_MENU.documentReady($); //Lava-Lamp Style Menu
	if ( UixModuleInstance.CIRCLE_LAYOUT )                UixModuleInstance.CIRCLE_LAYOUT.documentReady($); //Circle Layout
	if ( UixModuleInstance.MULTI_ITEMS_CAROUSEL )         UixModuleInstance.MULTI_ITEMS_CAROUSEL.documentReady($); //Multiple Items Carousel
	if ( UixModuleInstance.THREE_BACKGROUND )             UixModuleInstance.THREE_BACKGROUND.documentReady($); //3D Background
	if ( UixModuleInstance.THREE_CAROUSEL )               UixModuleInstance.THREE_CAROUSEL.documentReady($); //3D Carousel



	//---- Prevent overlay clicks on asynchronous requests
	//---- Commonly used for AJAX modules that are clicked by button
	//Scroll Reveal
	if ( settings.scrollReveal ) {
		if ( UixModuleInstance.SCROLL_REVEAL ) UixModuleInstance.SCROLL_REVEAL.documentReady($);
	}

	//Posts List With Ajax
	if ( settings.ajaxPostList ) {
		if ( UixModuleInstance.POST_LIST_AJAX ) UixModuleInstance.POST_LIST_AJAX.documentReady($);
	}

	//Dynamic Drop Down List from JSON
	if ( settings.ajaxDDList ) {
		if ( UixModuleInstance.DYNAMIC_DD_LIST ) UixModuleInstance.DYNAMIC_DD_LIST.documentReady($);
	}


	//Counter
	if ( settings.counterAnim ) {
		if ( UixModuleInstance.COUNTER ) UixModuleInstance.COUNTER.documentReady($);
	}

	//Custom Lightbox
	if ( settings.lightBox ) {
		if ( UixModuleInstance.LIGHTBOX ) UixModuleInstance.LIGHTBOX.pageLoaded();
	}



	//----Uix Shortcodes (WordPress Plugin)
	if ( $.isFunction( $.uix_sc_init ) ) {
		$.uix_sc_init();
	}

};



/*
 * Apply all the asynchronism scripts
 *
 * @param  {Boolean} runAll          - Run all module scripts.
 * @return {Void}
 */
export const UixApplyAsyncAllScripts = ( options ) => {
	'use strict';

	// This is the easiest way to have default options.
	var settings = $.extend({
		runAll    : true
	}, options );

	var $this = $( this );

	var scipts_pageLoaded    = UixModuleInstance.components.pageLoaded,
		scipts_documentReady = UixModuleInstance.components.documentReady;

	if ( settings.runAll ) {

		for ( var i = 0; i < scipts_pageLoaded.length; i++ ) {
			 scipts_pageLoaded[i]();
		}
		for ( var j = 0; j < scipts_documentReady.length; j++ ) {
			 scipts_documentReady[j]( $ );
		}
	}



	//Uix Shortcodes
	if ( $.isFunction( $.uix_sc_init ) ) {
		$.uix_sc_init();
	}


};
