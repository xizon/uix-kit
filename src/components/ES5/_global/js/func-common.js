
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
