
/* 
 *************************************
 * <!-- Smooth Scrolling Page -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

export const SMOOTH_SCROLLING_PAGE = ( ( module, $, window, document ) => {
	if ( window.SMOOTH_SCROLLING_PAGE === null ) return false;
	
	
	
    module.SMOOTH_SCROLLING_PAGE               = module.SMOOTH_SCROLLING_PAGE || {};
    module.SMOOTH_SCROLLING_PAGE.version       = '0.1.4';
    module.SMOOTH_SCROLLING_PAGE.pageLoaded = function() {

		//Prevent this module from loading in other pages
        //--------------
		if ( !$( 'body' ).hasClass( 'smooth-scrolling-page' ) ) return false;

        
        // Core params
        //--------------
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
              };
        
        let requestId = null;
        let lastScrollTop = 0; // Determine the direction of scrolling

        TweenMax.set( scroller.target, {
            rotation: 0.01,
            force3D: true
        });



        //Increase the viewport to display the visual area
        const elTop = $( scroller.target ).offset().top;
		
        

        // Scrolling Progress
        //--------------
        const tlTarget1 = '#app-scrolling-progress1';
        const tlTarget2 = '#app-scrolling-progress2';
        const tlTarget3 = '#app-scrolling-progress3';
        TweenMax.set( tlTarget1, {toAlpha: 1});
        
        // time should be adjusted relative to window width or height
        // Animation progress has nothing to do with time

		//
		//
        const time = 10;
        const time02 = 2;
        const timestop01 = time / 9.9999;
        const timestop02 = time / 8.1;
        
        const tlAction = new TimelineMax({ paused: true })
                            .to( tlTarget1, time, {
                                height: ( $( scroller.target ).height() ) - windowHeight*2 - 200
                            })
                            .to( tlTarget1, time02, {
                                height: ( $( scroller.target ).height() ) - windowHeight*2
                            })
                            .to( tlTarget1, time, {
                                width: 15
                            }, 0)

                            .to( tlTarget2, 0.3, {
                                rotation: -10,
                                scale: 0.5, 
                                transformOrigin: 'center'
                            }, timestop01 )

                            
                            .to( tlTarget3, 0.3, {
                                rotation: 1125,
                                scale: 0.1, 
                                transformOrigin: 'center'
                            }, timestop02 );

      
		//
		//
		let scene2_progress = 0;
		const scene2Action = new TimelineMax({ paused: true })
							.to( '#app-scene-2 p', 0.3, {
								x: 100
							}, 0);
		
		//
		//
		let scene3_progress = 0;
		const scene3Action = new TimelineMax({ paused: true })
							.to( '#app-scene-3 p', 0.3, {
								x: 200
							}, 0);
		
        
        // Core Actions
        //--------------
        
        const initSmoothScrollingPageWrapper = 'js-uix-smooth-scrolling-page-wrapper';

        if ( ! $( 'body' ).hasClass( initSmoothScrollingPageWrapper ) ) {
            $( 'body' ).addClass( initSmoothScrollingPageWrapper );
            $( scroller.target )
                .wrap( '<div id="uix-scrollspy-area__wrapper" style="overflow:hidden;position:fixed;height:100%;width:100%;top:0;left:0;right:0;bottom:0;"></div>' )
                .css( 'margin-top', elTop + 'px' );   
        }


        function scrollAnimate() {

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


            // update requestId
            requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(scrollAnimate) : null;


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
            //--------------------------------- Scrolling Progress -------------------------------	
            //----------------------------------------------------------------------------------   

            const scrollDistance = $( scroller.target ).height(),
                  visibleAreaDistance = windowHeight,
                  scrollPercent = scrolled / (scrollDistance - visibleAreaDistance);
			
			//
			console.log( 'Body progress: ' + scrollPercent );

            const progressBlobs = scrollPercent * 1; // slower (= <) or faster and/or change height of 'scrollDistance'
            const scrollDir =  ( scrolled > lastScrollTop ) ? 'down' : 'up';

            TweenMax.to( tlAction, 1, {
                progress: progressBlobs, 
                ease: Sine.easeOut
            });
			
			
			
			
            //----------------------------------------------------------------------------------
            //---------------------- SCROLLING PROGRESS HELPER ----------------------------------	
            //----------------------------------------------------------------------------------   
			const triggerViewport = 0.5;

		
			//Scene 2 progress
			//-----------------
			const scene2_height = $( '#app-scene-2' ).outerHeight( true ), // do not use .height()
				  scene2_spyTop = $( '#app-scene-2' )[0].getBoundingClientRect().top;
			
			const scene2_scrollPercent = parseFloat( scene2_spyTop / scene2_height ) - triggerViewport;

			if ( scene2_scrollPercent <= 0 && scene2_scrollPercent >= -1 ) {
				console.log( 'Scene 2 progress: ' + Math.abs( scene2_scrollPercent ) );
				scene2_progress = Math.abs( scene2_scrollPercent );
			}


			TweenMax.to( scene2Action, 1, {
				progress: scene2_progress
			});

		
			
			//Scene 3 progress
			//-----------------
			const scene3_height = $( '#app-scene-3' ).outerHeight( true ), // do not use .height()
				  scene3_spyTop = $( '#app-scene-3' )[0].getBoundingClientRect().top;
			
			const scene3_scrollPercent = parseFloat( scene3_spyTop / scene3_height ) - triggerViewport;
			
			
			if ( scene3_scrollPercent <= 0 && scene3_scrollPercent >= -1 ) {
				console.log( 'Scene 3 progress: ' + Math.abs( scene3_scrollPercent ) );
				scene3_progress = Math.abs( scene3_scrollPercent );
			}
			
			TweenMax.to( scene3Action, 1, {
				progress: scene3_progress
			});
			
			
            //----------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------	
            //----------------------------------------------------------------------------------  
            
            
            //
            lastScrollTop = scrolled;

        }//end scrollAnimate()



        function scrollUpdate() {
            scroller.scrollRequest++;
            if (!requestId) {
                requestId = requestAnimationFrame(scrollAnimate);
            }
        }
        
        // Add function to the element that should be used as the scrollable area.
        const throttleFunc = UixThrottle(scrollUpdate, 5);
        window.removeEventListener('scroll', throttleFunc);
        window.removeEventListener('touchmove', throttleFunc);
        window.addEventListener('scroll', throttleFunc);
        window.addEventListener('touchmove', throttleFunc);
        throttleFunc();
        


        function windowUpdate() {
            // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
            if ( window.innerWidth != windowWidth ) {
                
                // Update the window width for next time
                windowWidth = window.innerWidth;
        
                // Do stuff here
                scroller.resizeRequest++;
                if (!requestId) {
                    requestId = requestAnimationFrame(scrollAnimate);
                }
        
        
            }
        }
        
        // Add function to the window that should be resized
        const debounceFuncWindow = UixDebounce(windowUpdate, 50);
        window.removeEventListener('resize', debounceFuncWindow);
        window.addEventListener('resize', debounceFuncWindow);




		
    };
    
    module.components.pageLoaded.push( module.SMOOTH_SCROLLING_PAGE.pageLoaded );

	return class SMOOTH_SCROLLING_PAGE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



