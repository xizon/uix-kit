
/* 
 *************************************
 * <!-- Base Functions -->
 *************************************
 */

//=========================================================
//=========================================================
//=========================================================
//=========================================================
//=========================================================

/* 
 *************************************
 * Create GUID / UUID
 *
 * @return {String}                        - The globally-unique identifiers.
 *************************************
 */
var UixGUID = UixGUID || (function() {
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
 *************************************
 * Evaluating a string as a mathematical expression in JavaScript
 *
 * @return {String}            - New calculation result.
 *************************************
 */
var UixMath = UixMath || (function() {
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
 *************************************
 * Get the CSS property
 *
 * @param  {Object} el     - Target object, using class name or ID to locate.
 * @return {String|JSON}            - The value of property.
 *************************************
 */
var UixCssProperty = UixCssProperty || (function() {
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
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed     - The speed of movement between elements.
 * @param  {JSON} bg          - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *************************************
 */

( function ( $ ) {
    $.fn.UixParallax = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			speed    : 0.25,
			bg       : { enable: true, xPos: '50%' }
        }, options );
 
        this.each( function() {
			
			var bgEff      = settings.bg,
				$this      = $( this ),
				bgXpos     = '50%',
				speed      = -parseFloat( settings.speed );
			
			
			
			if ( bgEff ) {
				bgEff      = settings.bg.enable;
				bgXpos     = settings.bg.xPos;
			}
			
	
			//Prohibit transition delay
			$this.css( {
				'transition': 'none'
			} );

		    $( window ).on( 'scroll touchmove', function( e ){
				scrollUpdate();
			});
			
			
			//Initialize the position of the background
			if ( bgEff ) {
				//background parallax
				TweenMax.set( $this, {
					backgroundPosition: bgXpos + ' ' + (-$this.offset().top*speed) + 'px'
				});
			} else {
				//element parallax
				TweenMax.set( $this, {
					y: 0
				});	
			}
			
			
			function scrollUpdate() {
				var scrolled = $( window ).scrollTop(),
					st       = $this.offset().top - scrolled;
				

				
				if ( bgEff ) {
					//background parallax
					TweenMax.set( $this, {
						backgroundPosition: bgXpos + ' ' + ( 0 - ( st * speed ) ) + 'px'
					});
				} else {
					//element parallax
					TweenMax.set( $this, {
						y: ( 0 - ( scrolled * speed ) )
					});
					
					
				}
				
			}

			
			
		});
 
    };
 
}( jQuery ));
