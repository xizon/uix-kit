
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
    module.SMOOTH_SCROLLING_PAGE.version       = '0.1.0';
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

            
            // Parallax 
            //-------------------------------------	
            $( '.uix-scrollspy-animate--parallax__wrapper' ).each( function()  {
                const $wrapper = $( this );
                const $target = $wrapper.find( '.uix-scrollspy-animate--parallax' );
                const rect = $target[0].getBoundingClientRect();
                const spyTop = rect.top;
                const speed = -parseFloat( $wrapper.data( 'scrollspy-speed' ) );
                
                
                //
                $wrapper.css({
                    'overflow': 'hidden',
                    'height': rect.height - rect.height*0.3
                });   
                
                
                $target.css({
                    'margin-top': -rect.height*0.15
                }); 

                //
                TweenMax.set( $wrapper, {
                    css:{ 
                        'transform': 'matrix(1, 0, 0, 1, 0, '+( 0 - ( spyTop * speed ) )+')',
                        'transition': 'none'
                    }
                });   
                TweenMax.set( $target, {
                    css:{ 
                        'transform': 'matrix(1, 0, 0, 1, 0, '+( 0 - ( spyTop * (speed/2) ) )+')',
                        'transition': 'none'
                    }
                });    
            });

            
            // Transparency
            //-------------------------------------	
            $( '.uix-scrollspy-animate--transparency' ).each( function()  {
                const $this = $( this );
                const rect = $this[0].getBoundingClientRect();
                const spyTop = rect.top;
                const speed = -parseFloat( $this.data( 'scrollspy-speed' ) );

                const scale               = ( 0 - ( spyTop * speed ) ) / rect.height,
                      elOpacity           = scale;   
                
                TweenMax.set( $this, {
                    alpha: ( $this.data( 'scrollspy-reverse' ) ? 1-elOpacity : elOpacity ) 
                });    
            });  
         
            
            

        
            
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



