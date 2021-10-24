/*
 * Text Animation
 *
 * @param  {String} selectors                - Text wrapper ID or class name.
 * @return {Void}
 */
import { UixThrottle } from '@uixkit/core/_global/js';

( function ( $ ) {
    $.fn.UixTextEff = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			selectors    : '.letters-eff-fadeInRight',
            scrollSpy    : false
        }, options );
 
        this.each( function() {
			
			
            
			const customControls       = settings.selectors;
            const scrollSpy            = settings.scrollSpy;
            const $this                = $( customControls );
            
			let	speed                = $this.data( 'text-eff-speed' ),
				txtEff;

			
			
            if ( typeof speed === typeof undefined ) {
                speed = 1200;
            }	

            //The data-text-eff attribute must be unique, otherwise it will not execute correctly.
            if ( $this.length > 1 ) return false;


            $this.html( $this.text().replace(/([^\x00-\x80]|\w|((?=[\x21-\x7e]+)[^A-Za-z0-9]))/g, "<span class='uix-letter'>$&</span>") );

            //--------------
            if (customControls.indexOf('fadeInRight') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    translateX: [40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: speed,
                    delay: function(el, i) {
                        return 500 + 30 * i;
                    }
                });

            }

            //--------------
            if (customControls.indexOf('zoomInDown') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    scale: [0, 1],
                    duration: speed,
                    elasticity: 600,
                    delay: function(el, i) {
                        return 45 * (i + 1);
                    }
                });

            }

            //--------------
            if (customControls.indexOf('flyInOut') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    translateX: [40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: speed,
                    delay: function(el, i) {
                        return 500 + 30 * i;
                    }
                });


            }


            //--------------
            if (customControls.indexOf('fading') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: speed,
                    delay: function(el, i) {
                        return 150 * (i + 1)
                    }
                });

            }

            //--------------
            if (customControls.indexOf('floatingUp') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    translateY: ["1.1em", 0],
                    translateZ: 0,
                    duration: speed,
                    delay: function(el, i) {
                        return 50 * i;
                    }
                });

            }

            //--------------
            if (customControls.indexOf('scaleIn') >= 0) {
                txtEff = anime.timeline({
                    loop: false
                }).add({
                    targets: customControls + ' .uix-letter',
                    opacity: [0,1],
                    scale: [3.5, 1],
                    duration: speed
                });

            }

            txtEff.pause();


            if ( ! scrollSpy ) {
                txtEff.play();
            } else {

                const viewport = 1;
         
                //
                const scrollUpdate = function() {

                    const spyTop = $this[0].getBoundingClientRect().top;
                    

                    //Prevent asynchronous loading of repeated calls
                    const actived = $this.data( 'activated' );


                    if ( spyTop < ( window.innerHeight * viewport ) ) {

                        if( typeof actived === typeof undefined ) {


                            txtEff.play();

                            //Prevents front-end javascripts that are activated in the background to repeat loading.
                            $this.data( 'activated', 1 );


                        }//endif actived


                    }
                };


                // Add function to the element that should be used as the scrollable area.
                const throttleFunc = UixThrottle(scrollUpdate, 5);
                window.removeEventListener('scroll', throttleFunc);
                window.removeEventListener('touchmove', throttleFunc);
                window.addEventListener('scroll', throttleFunc);
                window.addEventListener('touchmove', throttleFunc);


                // Prevent calculation errors caused by unloaded completion
                if (document.readyState != 'loading') {
                    throttleFunc();
                } else if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', throttleFunc);
                } else {
                    document.attachEvent('onreadystatechange', function () {
                        if (document.readyState != 'loading') throttleFunc();
                    });
                }
                

            }

                  
			
		});
 
    };
 
}( jQuery ));