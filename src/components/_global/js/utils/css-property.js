
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
