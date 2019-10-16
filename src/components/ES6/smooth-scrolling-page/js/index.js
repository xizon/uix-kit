
/* 
 *************************************
 * <!-- Smooth Scrolling Page -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';

export const SMOOTH_SCROLLING_PAGE = ( ( module, $, window, document ) => {
	if ( window.SMOOTH_SCROLLING_PAGE === null ) return false;
	
	
	
    module.SMOOTH_SCROLLING_PAGE               = module.SMOOTH_SCROLLING_PAGE || {};
    module.SMOOTH_SCROLLING_PAGE.version       = '0.0.1';
    module.SMOOTH_SCROLLING_PAGE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'smooth-scrolling-page' ) ) return false;
		
        
        var html = document.documentElement,
            body = document.body,
            scroller = {
                target: document.querySelector( '#uix-scrollspy-area' ),
                ease: 0.05,
                // <= scroll speed
                endY: 0,
                y: 0,
                resizeRequest: 1,
                scrollRequest: 0,
            },
            requestId = null;

        TweenMax.set( scroller.target, {
            rotation: 0.01,
            force3D: true
        });
        


        $( window ).on( 'resize', function() {
            // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
            if ( window.innerWidth != windowWidth ) {

                // Update the window width for next time
                windowWidth = window.innerWidth;

                // Do stuff here
                scroller.resizeRequest++;
                if (!requestId) {
                    requestId = requestAnimationFrame(updateScroller);
                }

            }
        });

        $( window ).on( 'scroll ready load resize resizeEnd touchmove', function() {
            scroller.scrollRequest++;
            if (!requestId) {
                requestId = requestAnimationFrame(updateScroller);
            }
        });

        updateScroller();

        function updateScroller() {

            var resized = scroller.resizeRequest > 0;

            if (resized) {
                var height = scroller.target.clientHeight;
                body.style.height = height + "px";
                scroller.resizeRequest = 0;
            }

            var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

            scroller.endY = scrollY;
            scroller.y += (scrollY - scroller.y) * scroller.ease;

            if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
                scroller.y = scrollY;
                scroller.scrollRequest = 0;
            }

            TweenMax.set(scroller.target, {
                y: -scroller.y
            });


            requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;



            //+++++++++++++++++++
            console.log( 'scrollTop: ' + scroller.y );

          

        }


		
    };

    module.components.documentReady.push( module.SMOOTH_SCROLLING_PAGE.documentReady );

	return class SMOOTH_SCROLLING_PAGE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



