
/* 
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed     - The speed of movement between elements.
 * @param  {JSON} bg          - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *
 *************************************
 */

( function ( $ ) {
	'use strict';
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




