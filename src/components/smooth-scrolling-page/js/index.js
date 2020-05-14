
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
    module.SMOOTH_SCROLLING_PAGE.version       = '0.0.9';
    module.SMOOTH_SCROLLING_PAGE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'smooth-scrolling-page' ) ) return false;
		
        const $window          = $( window );
        let	windowWidth        = window.innerWidth,
            windowHeight       = window.innerHeight;

        const html = document.documentElement,
            body = document.body,
            scroller = {
                target        : '#uix-scrollspy-area',
                ease          : 0.05,

                // <= scroll speed
                endY          : 0,
                y             : 0,
                resizeRequest : 1,
                scrollRequest : 0
            }
        
        let requestId = null;

        TweenMax.set( scroller.target, {
            rotation: 0.01,
            force3D: true
        });



        //Increase the viewport to display the visual area
        const elTop = $( scroller.target ).offset().top;
        const initSmoothScrollingPageWrapper = 'js-uix-smooth-scrolling-page-wrapper';

        if ( ! $( 'body' ).hasClass( initSmoothScrollingPageWrapper ) ) {
            $( 'body' ).addClass( initSmoothScrollingPageWrapper );
            $( scroller.target )
                .wrap( '<div id="uix-scrollspy-area__wrapper" style="overflow:hidden;position:fixed;height:100%;width:100%;top:0;left:0;right:0;bottom:0;"></div>' )
                .css( 'margin-top', elTop + 'px' );   
        }



        $( window ).on( 'resize', function() {
            // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
            if ( window.innerWidth != windowWidth ) {

                // Update the window width for next time
                windowWidth = window.innerWidth;

                // Do stuff here
                scroller.resizeRequest++;
                if (!requestId) {
                    requestId = requestAnimationFrame(scrollUpdate);
                }

            }
        });

        $( window ).off( 'scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE' ).on( 'scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE', function() {
            scroller.scrollRequest++;
            if (!requestId) {
                requestId = requestAnimationFrame(scrollUpdate);
            }
     
        });
        


        scrollUpdate();

        function scrollUpdate() {

            const resized = scroller.resizeRequest > 0;

            if (resized) {
                const height = $( scroller.target ).height();
                body.style.height = parseFloat( height + elTop ) + "px";
                scroller.resizeRequest = 0;
            }


            const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

            scroller.endY = scrollY;
            scroller.y += (scrollY - scroller.y) * scroller.ease;

            if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
                scroller.y = scrollY;
                scroller.scrollRequest = 0;
            }

            TweenMax.set(scroller.target, {
                y: -scroller.y,
                onComplete: function() {
                        
                    //-----Spy scrollTop and elements of page
                    
                    //your code here...
                    
                    
                    
                }
            });


            requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(scrollUpdate) : null;


            //+++++++++++++++++++++++++++++++++++++++++++++++++
            // Custom Functions
            //+++++++++++++++++++++++++++++++++++++++++++++++++
            

            const scrolled    = scroller.y,
                  topSpacing  = ( window.innerWidth <= 768 ) ? 0 : $( '.uix-header__container' ).outerHeight( true ); //with margin 

            //----------------------------------------------------------------------------------
            //--------------------------------- Scrollspy Animate -------------------------------	
            //----------------------------------------------------------------------------------   

            const $targetEl = $( '#uix-scrollspy-animate' );

            if ( $targetEl.length > 0 ) {
                const elHeight      = $targetEl.height(),
                      elOffsetTop   = $targetEl.offset().top - topSpacing;

                const scale               = scrolled / elHeight,
                      elScale             = 1 - scale * 0.1,
                      elOpacity           = 1 - scale,
                      scrollProgress      = ((scrolled - elOffsetTop) / (elHeight - windowHeight / 6));



                // Transparency changes when scrolling
                //-------------------------------------	
                console.log( 'scrolled: ' + scrolled + ' | scrollProgress: ' + scrollProgress + ' | elOpacity: ' + elOpacity + ' | elScale: ' + elScale  );

                
                

            }//endif $targetEl

         
        
            
            //----------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------	
            //----------------------------------------------------------------------------------  
            

        }//end scrollUpdate()


		
    };

    module.components.documentReady.push( module.SMOOTH_SCROLLING_PAGE.documentReady );

	return class SMOOTH_SCROLLING_PAGE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



