
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
    module.SCROLL_REVEAL.version       = '0.1.5';
    module.SCROLL_REVEAL.documentReady = function( $ ) {

		
		//From JSON config in data attribute in HTML
		const $scrollElements = $( '[data-uix-anim]' );
    
        $( window ).off( 'scroll.SCROLL_REVEAL touchmove.SCROLL_REVEAL' );
        
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
							
							
							//Other animation
							//------------------------
							
							
							//Image transition
							spyImageTrans( 'show' );
	
							
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
							
							
							//Other animation
							//------------------------
							
							
							//Image transition
							spyImageTrans( 'hide' );
							
							
                        }  
 
                        $el.removeData( 'activated' );


                    }//endif actived

                }  
            };
            
            
            scrollUpdate();
            
            // Please do not use scroll's off method in each
            $( window ).on( 'scroll.SCROLL_REVEAL touchmove.SCROLL_REVEAL', function( event ) {
                 scrollUpdate();
            });
			
			
            
             /*
             * The transition effect of each group of images
             *
             * @return {Void}
			 * #Usage: 
			 
				<ul data-uix-anim='{"viewport":"90%","from":{"y":0},"to":{"y":0},"ease":"Power2.easeOut","duration":0.8,"delay":0.2,"infinite":true}' data-img-ids='["[data-imgshow]"]'>
					<li data-imgshow="1"><img src="logo-1.jpg" alt=""></li>
					<li data-imgshow="1"><img src="logo-2.jpg" alt=""></li>
					<li data-imgshow="1"><img src="logo-3.jpg" alt=""></li>
					<li data-imgshow="1"><img src="logo-4.jpg" alt=""></li>
				<ul>
 
			 
             */ 
			function spyImageTrans( type ) {
				
				const _imgIds = $el.data( 'img-ids' );
				
				if ( typeof _imgIds !== typeof undefined ) {
					//add
					if ( type == 'show' ) {
						_imgIds.forEach( function( element ) {
							$( element ).each( function( index )  {
								$( this ).delay( 50*index ).queue( 'fx', function() { 
									$( this ).addClass( 'is-active' );
									$( this ).dequeue();
								});
							});
						});
						
					} else {
						//remove 
						_imgIds.forEach( function( element ) {
							$( element ).removeClass( 'is-active' );
						});
					}
	
				} 
				
			}
				
			
			
			



        });//end each        
		
    };

    module.components.documentReady.push( module.SCROLL_REVEAL.documentReady );
	

	return class SCROLL_REVEAL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

