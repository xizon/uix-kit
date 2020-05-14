
/* 
 *************************************
 * <!-- Specify a background image -->
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
import UixParallax from '@uixkit/core/_global/js/fn/UixParallax';

export const SET_BG = ( ( module, $, window, document ) => {
	if ( window.SET_BG === null ) return false;
	
	
	
	
	module.SET_BG               = module.SET_BG || {};
    module.SET_BG.version       = '0.0.6';
	module.SET_BG.documentReady = function( $ ) {


		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
		//  Initialize
		setBGInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;
				windowHeight = window.innerHeight;

				// Do stuff here
				setBGInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Initialize background using "data-bg" attribute.
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function setBGInit( w, h ) {
			
			$( '[data-bg]' ).each( function() {
				const $this    = $( this );
                
				let config   = $this.data( 'bg' );


				if ( typeof config === typeof undefined ) {
					config = {
						"src"        : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
						"position"   : "top left",
						"size"       : "cover",
						"repeat"     : "no-repeat",
						"fill"       : false,
						"parallax"   : 0,
                        "transition" : "none 0s ease 0s",
                        "move"       : false  // {"dir":"left","duration":"10s","easing":"linear","loop":true}
					};
				}

				if ( config ) {

					let dataImg       = config.src,
						dataPos       = config.position,
						dataSize      = config.size,
						dataRepeat    = config.repeat,
                        dataEasing    = config.transition,
						dataParallax  = config.parallax,
                        dataMove      = config.move;

					if ( typeof dataPos === typeof undefined ) dataPos = 'top left';
					if ( typeof dataSize === typeof undefined ) dataSize = 'cover';
					if ( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';
                    if ( typeof dataEasing === typeof undefined ) dataEasing = 'none 0s ease 0s';
                    if ( typeof dataMove === typeof undefined ) dataMove = false;


					//Using parallax
					if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {
						dataPos = dataPos.replace( 'top', '50%' );
					}
               
                    
                    //background animation
                    let moveAnim             = 'none',
                        moveAnimLoop         = 'infinite',
                        moveEasing           = 'linear',
                        moveKeyframesTop     = '@keyframes js-uix-cssanim--move-t{from{background-position:0 0;}to{background-position:0 -19999px;}',
                        moveKeyframesBottom  = '@keyframes js-uix-cssanim--move-b{from{background-position:0 0;}to{background-position:0 19999px;}',
                        moveKeyframesLeft    = '@keyframes js-uix-cssanim--move-l{from{background-position:0 0;}to{background-position:-19999px 0;}',
                        moveKeyframesRight   = '@keyframes js-uix-cssanim--move-r{from{background-position:0 0;}to{background-position:19999px 0;}';


                    if ( dataMove && Object.prototype.toString.call( dataMove )=='[object Object]' ) {

                        if ( ! dataMove.loop ) moveAnimLoop = '1 forwards';

                        dataPos = '0 0';


                        switch (dataMove.dir) {
                            case 'top':
                                moveAnim = 'js-uix-cssanim--move-t '+parseInt(dataMove.speed)+'s '+moveEasing+' '+ moveAnimLoop;
                                break;
                            case 'bottom':
                                moveAnim = 'js-uix-cssanim--move-b '+parseInt(dataMove.speed)+'s '+moveEasing+' '+ moveAnimLoop;        
                                break;
                            case 'left':
                                moveAnim = 'js-uix-cssanim--move-l '+parseInt(dataMove.speed)+'s '+moveEasing+' '+ moveAnimLoop;    
                                break;
                            case 'right':
                                moveAnim = 'js-uix-cssanim--move-r '+parseInt(dataMove.speed)+'s '+moveEasing+' '+ moveAnimLoop;            
                                break;
                        }


                        //  CSS3 animation keyframe attributes inline
                        if ( $( '#js-uix-cssanim--move-t' ).length == 0 ) {
                            $( '<style id="js-uix-cssanim--move-t">' )
                                .text( moveKeyframesTop )
                                .appendTo( 'head' );   
                        }
                        if ( $( '#js-uix-cssanim--move-b' ).length == 0 ) {
                            $( '<style id="js-uix-cssanim--move-b">' )
                                .text( moveKeyframesBottom )
                                .appendTo( 'head' );   
                        }
                        if ( $( '#js-uix-cssanim--move-l' ).length == 0 ) {
                            $( '<style id="js-uix-cssanim--move-l">' )
                                .text( moveKeyframesLeft )
                                .appendTo( 'head' );   
                        }
                        if ( $( '#js-uix-cssanim--move-r' ).length == 0 ) {
                            $( '<style id="js-uix-cssanim--move-r">' )
                                .text( moveKeyframesRight )
                                .appendTo( 'head' );   
                        }          


                    }

					
                    
                    //-----
					if ( typeof dataImg != typeof undefined && dataImg != '' ) {

						if ( config.fill ) {
							//Show Image Under Text
							if ( Modernizr.cssanimations ) {
								$this.css( {
									'background'               : 'url('+dataImg+') '+dataRepeat+'',
									'background-size'          : dataSize,
									'-webkit-background-clip'  : 'text',
									'-webkit-text-fill-color'  : 'transparent',
                                    'animation'                : moveAnim
								} );	

							}


						} else {
                            
							$this.css( {
								'background-image'    : 'url('+dataImg+')',
								'background-position' : dataPos,
								'background-size'     : dataSize,
								'background-repeat'   : dataRepeat,
                                'animation'           : moveAnim
							} );	
                            
                            
                            

                            
						}


						//Using parallax
						if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {

							$this.UixParallax( { 'speed': dataParallax, transition : dataEasing, 'bg': { enable: true, xPos: '50%' } } );
						}


					}	


				}




			});
	
			
		}


	};

	module.components.documentReady.push( module.SET_BG.documentReady );

	return class SET_BG {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

