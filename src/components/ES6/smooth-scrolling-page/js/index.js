
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
    module.SMOOTH_SCROLLING_PAGE.version       = '0.0.3';
    module.SMOOTH_SCROLLING_PAGE.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'smooth-scrolling-page' ) ) return false;
		
        var $window      = $( window ),
		    windowWidth  = window.innerWidth,
		    windowHeight = window.innerHeight;

        
        var html = document.documentElement,
            body = document.body,
            scroller = {
                target        : '#uix-scrollspy-area',
                ease          : 0.05,

                // <= scroll speed
                endY          : 0,
                y             : 0,
                resizeRequest : 1,
                scrollRequest : 0
            },
            requestId = null;

        TweenMax.set( scroller.target, {
            rotation: 0.01,
            force3D: true
        });



        //Increase the viewport to display the visual area
        var elTop = $( scroller.target ).offset().top;
        $( scroller.target )
            .wrap( '<div style="overflow:hidden;position:fixed;height:100%;width:100%;top:0;left:0;right:0;bottom:0;"></div>' )
            .css( 'margin-top', elTop + 'px' );




        $( window ).off( 'resize.SMOOTH_SCROLLING_PAGE' ).on( 'resize.SMOOTH_SCROLLING_PAGE', function() {
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

        $( window ).off( 'scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE' ).on( 'scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE', function() {
            scroller.scrollRequest++;
            if (!requestId) {
                requestId = requestAnimationFrame(updateScroller);
            }
        });

        updateScroller();

        function updateScroller() {

            var resized = scroller.resizeRequest > 0;

            if (resized) {
                var height = $( scroller.target ).height();
                body.style.height = parseFloat( height + elTop ) + "px";
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


            //+++++++++++++++++++++++++++++++++++++++++++++++++
            // Custom Functions
            //+++++++++++++++++++++++++++++++++++++++++++++++++
            

            var scrollTop   = scroller.y,
                topSpacing  = ( window.innerWidth <= 768 ) ? 0 : $( '.uix-header__container' ).outerHeight( true ); //with margin 

            //----------------------------------------------------------------------------------
            //--------------------------------- Scrollspy Animate -------------------------------	
            //----------------------------------------------------------------------------------   

            var $targetEl = $( '#uix-scrollspy-animate' );

            if ( $targetEl.length > 0 ) {
                var elHeight      = $targetEl.height(),
                    elOffsetTop   = $targetEl.offset().top - topSpacing;

                var scale               = scrollTop / elHeight,
                    elScale             = 1 - scale * 0.1,
                    elOpacity           = 1 - scale,
                    scrollProgress      = ((scrollTop - elOffsetTop) / (elHeight - windowHeight / 6));


                //
                if ( scrollTop < elHeight ) {
                    $( 'body' ).removeClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
                } else if (scrollTop >= elHeight) {
                    $( 'body' ).addClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
                }


                //
                console.log( 'scrollProgress: ' + scrollProgress );

            }//endif $targetEl

            
            
            //----------------------------------------------------------------------------------
            //--------------------------------- Scrollspy Animate -------------------------------	
            //----------------------------------------------------------------------------------   
            /*
             * Usage: <div class="...  uix-el--transparent" data-scrollspy-anim='{"viewport":0.9,"from":{"opacity":0,"y":150},"to":{"opacity":1,"y":0},"ease":"Power2.easeOut","duration":0.8,"delay":0.6,"infinite":false}'>
            */    
            
            var $scrollRevealElements = $( '[data-scrollspy-anim]' );
            var tmAnim = function( obj, type ) {


                    var config = obj.data( 'scrollspy-anim' );

                    if( typeof config === typeof undefined || config == '' || config === false ) {
                        config = {
                            "from"     : {"opacity":0,"x":70},
                            "to"       : {"opacity":1,"x":0},
                            "ease"     : "Power2.easeOut",
                            "duration" : 0.8,
                            "delay"    : 0,
                            "infinite" : false,
                            "viewport" : 0.5 //A percentage of the viewport's height.
                        };
                    }


                    //get attributes to tweenMax
                    var fromCSS     = config.from,
                        toCSS       = config.to,
                        myEase      = config.ease,
                        myDuration  = config.duration,
                        myDelay     = config.delay,
                        infinite    = config.infinite;

                    //A percentage of the viewport's height.
                    var viewport = config.viewport;

                    if ( typeof viewport === typeof undefined ) viewport = 0.9;
                    if ( typeof myEase === typeof undefined ) myEase = 'Power2.easeOut';
                    if ( typeof myDelay === typeof undefined ) myDelay = 0;
                    if ( typeof myDuration === typeof undefined ) myDuration = 0.4;
                    if ( typeof infinite === typeof undefined ) infinite = false;


                    //Return a value
                    if ( type == 'viewport' ) return viewport;
                    if ( type == 'delay' ) return myDelay;
                    if ( type == 'loop' ) return ( infinite ) ? 1 : 0;


                    if( Object.prototype.toString.call( fromCSS ) == '[object String]' ) {
                        //Add class when element becomes visible

                        toCSS = toCSS.replace(/\./, '' );

                        if ( type == 'from' ) obj.removeClass( toCSS );

                        if ( type == 'from-anim' ) obj.removeClass( toCSS );

                        //Target animation
                        if ( type == 'to' ) {

                            setTimeout( function(){
                                obj.addClass( toCSS );
                            }, myDelay*1000 );

                        }
                            


                    } else {
                        //Using TweenMax to create animations
                        if ( type == 'from' ) {
                            TweenMax.set( obj, {
                                css        : fromCSS
                            });	

                        }

                        if ( type == 'from-anim' ) {
                            TweenMax.to( obj, myDuration, {
                                css        : fromCSS
                            });	

                        }

                        //Target animation
                        if ( type == 'to' ) {

                            TweenMax.to( obj, myDuration, {
                                css    : toCSS,
                                ease   : myEase,
                                delay  : myDelay
                            });		


                        }	



                    }


                };//end function tmAnim()


            $scrollRevealElements.each( function()  {


                var $el = $( this ),
                    viewport = tmAnim( $el, 'viewport' );

                //Prevent asynchronous loading of repeated calls
                var actived = $el.data( 'activated' ),
                    tmLoop  = tmAnim( $el, 'loop' );

                
                if( typeof actived === typeof undefined ) {
                    tmAnim( $el, 'from' );

                }

                if ( parseFloat( scrollTop + topSpacing ) > parseFloat( $el.offset().top - ( window.innerHeight * viewport ) ) ) {

                    if( typeof actived === typeof undefined ) {

                        tmAnim( $el, 'to' );
                        $el.data( 'activated', 1 );
                        
                        
                        //text effect
                        //------------------
                        if ( $.isFunction( $.fn.UixTextEff ) ) {

                            var _ids = $el.data( 'texteff-ids' );
                            if ( typeof _ids !== typeof undefined ) {
                                _ids.forEach( function( element ) {
                                    $( document ).UixTextEff( { selectors: '[data-text-eff="'+element+'"]' } );
                                });

                            }


                        }//endif $.fn.UixTextEff


                        //
                        //other effect
                        //------------------
                        
                        


                    }//endif actived


                } else {


                    if ( typeof actived !== typeof undefined && tmLoop === 1 ) {

                        tmAnim( $el, 'from-anim' );
                        $el.removeData( 'activated' );
                        

                    }//endif actived

                }


            });//end each
            
            
            //----------------------------------------------------------------------------------
            //----------------------- Specify a background image -------------------------------	
            //----------------------------------------------------------------------------------          
            /*
             * Usage: <div class="..." data-scrollspy-bg='{"src":"assets/images/demo.jpg","position":"top left","size":"cover","repeat":"no-repeat","fill":false,"parallax":0}'>
            */    
            
            $( '[data-scrollspy-bg]' ).each( function() {
                var $this    = $( this ),
                    config   = $this.data( 'scrollspy-bg' );


                if ( typeof config === typeof undefined ) {
                    config = {
                        "src"      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                        "position" : "top left",
                        "size"     : "cover",
                        "repeat"   : "no-repeat",
                        "fill"     : false,
                        "parallax" : 0
                    };
                }

                if ( config ) {

                    var dataImg       = config.src,
                        dataPos       = config.position,
                        dataSize      = config.size,
                        dataRepeat    = config.repeat,
                        dataEasing    = config.transition,
                        dataParallax  = config.parallax;

                    if ( typeof dataPos === typeof undefined ) dataPos = 'top left';
                    if ( typeof dataSize === typeof undefined ) dataSize = 'cover';
                    if ( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';
                    if ( typeof dataEasing === typeof undefined ) dataEasing = 'none 0s ease 0s';


                    //Using parallax
                    if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {
                        dataPos = dataPos.replace( 'top', '50%' );
                    }


                    if ( typeof dataImg != typeof undefined && dataImg != '' ) {

                        if ( config.fill ) {
                            //Show Image Under Text
                            if ( Modernizr.cssanimations ) {
                                $this.css( {
                                    'background'               : 'url('+dataImg+') '+dataRepeat+'',
                                    'background-size'          : dataSize,
                                    '-webkit-background-clip'  : 'text',
                                    '-webkit-text-fill-color'  : 'transparent',
                                } );	

                            }


                        } else {

                            $this.css( {
                                'background-image'    : 'url('+dataImg+')',
                                'background-position' : dataPos,
                                'background-size'     : dataSize,
                                'background-repeat'   : dataRepeat
                            } );	
                        }


                        //Using parallax
                        if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {


                            var bgEff      = { enable: true, xPos: '50%' },
                                bgXpos     = '50%',
                                speed      = -parseFloat( dataParallax );


                            //Prohibit transition delay
                            $this.css( {
                                'transition': 'none'
                            } );


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
                            }//endif bgEff


                            var scrolled = scrollTop,
                                st       = $this.offset().top - scrolled;


                            if ( bgEff ) {
                                //background parallax
                                TweenMax.set( $this, {
                                    css:{ 
                                        'background-position': bgXpos + ' ' + ( 0 - ( st * speed ) ) + 'px',
                                        'transition': dataEasing
                                    }
                                });
                            } else {
                                //element parallax
                                TweenMax.set( $this, {
                                    css:{ 
                                        'transform': 'matrix(1, 0, 0, 1, 0, '+( 0 - ( scrolled * speed ) )+')',
                                        'transition': dataEasing
                                    }
                                });


                            }//endif bgEff



                        }//endif dataParallax


                    }	


                }




            });//end each 
            
            
            
            //----------------------------------------------------------------------------------
            //--------------------------------- Parallax --------------------------------------
            //----------------------------------------------------------------------------------    
            /*
             * Usage: <div class="..." data-scrollspy-parallax='{"transition":"none 0s ease 0s","speed":0.2}'>
            */
            
            /* Pure parallax scrolling effect without other embedded HTML elements */
            $( '[data-scrollspy-parallax]' ).each( function() {
        
				var $this       = $( this ),
					dataSpeed   = $this.data( 'scrollspy-parallax' ).speed,
                    dataEasing  = $this.data( 'scrollspy-parallax' ).transition;
				
				if ( typeof dataSpeed === typeof undefined ) {
					dataSpeed = 0;
				}
				if ( typeof dataEasing === typeof undefined ) {
					dataEasing = 'none 0s ease 0s';
				} 
				
                //Prohibit transition delay
                $this.css( {
                    'transition': 'none'
                } );


                //Initialize the position of the background
                //element parallax
                TweenMax.set( $this, {
                    y: 0
                });	


                var scrolled = scrollTop;

                //element parallax
                TweenMax.set( $this, {
                    css:{ 
                        'transform': 'matrix(1, 0, 0, 1, 0, '+( 0 - ( scrolled * dataSpeed ) )+')',
                        'transition': dataEasing
                    }
                });


            });//end each   
    
            
            //----------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------	
            //----------------------------------------------------------------------------------  
            

        }//end updateScroller()


		
    };

    module.components.documentReady.push( module.SMOOTH_SCROLLING_PAGE.documentReady );

	return class SMOOTH_SCROLLING_PAGE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



