
/* 
 *************************************
 * <!-- Scroll Reveal -->
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


export const SCROLL_REVEAL = ( ( module, $, window, document ) => {
	if ( window.SCROLL_REVEAL === null ) return false;
	
	
    module.SCROLL_REVEAL               = module.SCROLL_REVEAL || {};
    module.SCROLL_REVEAL.version       = '0.1.3';
    module.SCROLL_REVEAL.documentReady = function( $ ) {

		
		//From JSON config in data attribute in HTML
		const $scrollElements = $( '[data-uix-anim]' );
    
        $scrollElements.each( function()  {

            
            let viewport;
            
            
            const $el = $( this );
            const tl = new TimelineMax({paused: true});
            
            
            //
            let config = $el.data( 'uix-anim' );

            if( typeof config === typeof undefined || config == '' || config === false ) {
                config = {
                    "from"     : {"opacity":0,"x":70},
                    "to"       : {"opacity":1,"x":0},
                    "ease"     : "Power2.easeOut",
                    "duration" : 0.4,
                    "delay"    : 0,
                    "infinite" : false,
                    "viewport" : '100%' //A percentage of the viewport's height.
                };
            }


            //get attributes to tweenMax
            let fromCSS     = config.from,
                toCSS       = config.to,
                myEase      = config.ease,
                myDuration  = config.duration,
                myDelay     = config.delay,
                infinite    = config.infinite;

            //A percentage of the viewport's height.
            viewport = config.viewport;


            if ( typeof viewport === typeof undefined ) viewport = '100%';
            if ( typeof myEase === typeof undefined ) myEase = 'Power2.easeOut';
            if ( typeof myDelay === typeof undefined ) myDelay = 0;
            if ( typeof myDuration === typeof undefined ) myDuration = 0.4;
            if ( typeof infinite === typeof undefined ) infinite = false;


            //Conversion between percentage and decimal
            viewport = parseFloat( viewport ) / 100.0;
            
            //Make it go back and forth
            const reverse = ( infinite ) ? 1 : 0;
            
            //Set the initial state of the element
            TweenMax.set( $el, {
                css        : fromCSS
            });
            
            //
            const fromIsString = ( Object.prototype.toString.call( fromCSS ) == '[object String]' ) ? true : false;
            if( fromIsString ) {
                toCSS = toCSS.replace(/\./, '' );
            } else {
                tl.to( $el, myDuration, {
                    css    : toCSS,
                    ease   : myEase,
                    delay  : myDelay
                });
                $el[0].animation = tl;
            }  
            
       

            //
            const scrollUpdate = function() {
                
                const spyTop = $el[0].getBoundingClientRect().top;
                
                //Prevent asynchronous loading of repeated calls
                const actived = $el.data( 'activated' );


                if ( spyTop < ( window.innerHeight * viewport ) ) {

                    if( typeof actived === typeof undefined ) {

                        
                        if( fromIsString ) {
                            //Add class when element becomes visible
                            $el.delay( myDelay*1000 ).queue( 'fx', function() { 
                                $( this ).addClass( toCSS ).dequeue();
                            });

                        } else {
                            $el[0].animation.play();
                        }  

                        
                        
                        //Prevents front-end javascripts that are activated in the background to repeat loading.
                        $el.data( 'activated', 1 );



                    }//endif actived


                } else {
                    
           
                    if ( typeof actived !== typeof undefined && reverse === 1 ) {

                        if( fromIsString ) {
                            //Add class when element becomes visible
                            $el.removeClass( toCSS );
                        } else {
                            $el[0].animation.reverse();
                        }  
 
                        $el.removeData( 'activated' );


                    }//endif actived

                }  
            };
            
            
            scrollUpdate();
            $( window ).on( 'scroll.SCROLL_REVEAL touchmove.SCROLL_REVEAL', function( event ) {
                 scrollUpdate();
            });



        });//end each        
		
    };

    module.components.documentReady.push( module.SCROLL_REVEAL.documentReady );
	

	return class SCROLL_REVEAL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

