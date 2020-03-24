
/* 
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed       - The speed of movement between elements.
 * @param  {String} transition  - Transition time can simulate easing effect.
 * @param  {Object} bg            - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *
 *************************************
 */

( function ( $ ) {
	'use strict';
    $.fn.UixParallax = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			speed    : 0.25,
            transition : 'all 0.4s cubic-bezier(0, 0, 0.34, 0.96) 0s',
			bg       : { enable: true, xPos: '50%' }
        }, options );
        
        this.each( function() {
			
			let bgEff      = settings.bg,
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

            // Please do not use scroll's off method in each
		    $( window ).on( 'scroll.UixParallax touchmove.UixParallax', function( e ){
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
				const spyTop = $this[0].getBoundingClientRect().top;
         
				if ( bgEff ) {
					//background parallax
					TweenMax.set( $this, {
                        css:{ 
                            'background-position': bgXpos + ' ' + ( 0 - ( spyTop * speed ) ) + 'px',
                            'transition': settings.transition
                        }
					});
				} else {
					//element parallax
					TweenMax.set( $this, {
                        css:{ 
                            'transform': 'matrix(1, 0, 0, 1, 0, '+( 0 - ( spyTop * speed ) )+')',
                            'transition': settings.transition
                        }
					});
					
					
				}
				
			}

			
			
		});
 
    };
 
}( jQuery ));


