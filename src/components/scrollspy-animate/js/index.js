
/* 
 *************************************
 * <!-- Scrollspy Animate -->
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


export const SCROLLSPY_ANIM = ( ( module, $, window, document ) => {
	if ( window.SCROLLSPY_ANIM === null ) return false;
	
	
    module.SCROLLSPY_ANIM               = module.SCROLLSPY_ANIM || {};
    module.SCROLLSPY_ANIM.version       = '0.0.7';
    module.SCROLLSPY_ANIM.documentReady = function( $ ) {

		// Remove pixi.js banner from the console
		PIXI.utils.skipHello();
		
		
		const $el         = $( '#scrollspy-animate-demo' ),
		  	  panelHeight = 0;	
		

		//Prevent this module from loading in other pages
		if ( $el.length == 0 ) return false;
		
        
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
            
        let curSprite;
        let filterSprite;
        
        
		//-------- Text Affect
		if ( Modernizr.webgl ) {
			
			const   $txtContainer    = $el.find( '.row canvas' ),
                    text             = $txtContainer.data( 'txt' ).split( '' ),
                    tHeight          = 45,
                    tWidth           = 25,
                    renderer         = new PIXI.Application({
                        width        : tWidth*(text.length+2),
                        height       : tHeight*2,
                        antialias    : true,
                        transparent  : true,
                        resolution   : 1,
                        autoResize   : 1,
                        view         : document.getElementById( 'scrollspy-animate-demo--txt' )
                    });



			const stage        = new PIXI.Container();
				  
            filterSprite = PIXI.Sprite.from( $txtContainer.data( 'filter-texture' ) );
			filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
			const filter = new PIXI.filters.DisplacementFilter( filterSprite );


			const txtStyle = new PIXI.TextStyle({
                                fontSize        : tHeight,
                                letterSpacing   : 0,
                                breakWords      : true,
                                dropShadow      : true,
                                dropShadowAngle : Math.PI / 6,
                                dropShadowAlpha : 0.5,
                                dropShadowColor : '#333',
                                dropShadowBlur  : 1,
                                fill            : 'white',
                                fontFamily      : 'Arial Black',
                                fontStyle       : 'normal',
                                fontWeight      : 'bold',
                                wordWrap        : false,
                                align           : 'left'
                            });	

			curSprite = new PIXI.Text( $txtContainer.data( 'txt' ), txtStyle );
			curSprite.x = 0;
			curSprite.y = 0;
			
			renderer.stage.addChild( curSprite );
			

			curSprite.anchor.set( 0 );
			curSprite.scale.set( 1 );

            

			filterSprite.anchor.set( 0 );
			filterSprite.scale.set( 0.3 );  
			filterSprite.x = -50;
			filterSprite.y = 0;

			renderer.stage.filterArea = renderer.screen;
			renderer.stage.addChild( curSprite, filterSprite );
			renderer.stage.filters = [filter];

			
			const ticker       = new PIXI.Ticker();
			ticker.autoStart = true;
			ticker.add( function( delta ) {

				filterSprite.y += 0.2 * delta;
				
				// Render updated scene
				renderer.render( stage );

			});

					
		}


        function scrollUpdate() {
            const elHeight      = $el.height(),
                  elOffsetTop   = $el.offset().top - panelHeight; 
            

            const scrolled            = $( window ).scrollTop(),
				  translateTitle      = scrolled / 2,
				  translateBackground = scrolled / 3,
				  scale               = scrolled / elHeight,
				  backgroundScale     = 1, // + scale / 10
				  titleScale          = 1 - scale * 0.1,
				  titleOpacity        = 1 - scale,
				  scrollProgress      = ((scrolled - elOffsetTop) / (elHeight - windowHeight / 6));

			
			
            //-------- Animation
            const spyTop =  $el[0].getBoundingClientRect().top;
            
            if ( spyTop < window.innerHeight ) {
                $el.find( '.row' ).css({
                    'transition': 'none',
                    'transform': 'translateY(' + translateTitle + 'px) scale(' + titleScale + ')',
                    'opacity': titleOpacity
                });
				
                $( 'body' ).removeClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
            } else {
                $( 'body' ).addClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
				
				
            }
			
			
			//-------- Display progress
			$el.find( '.row h3 em' ).text( scrollProgress.toFixed(2) );

			if ( Modernizr.webgl ) {
				TweenMax.set( filterSprite, {
					x: windowHeight*scrollProgress
				});
	
			}
        }
        
        // Add function to the element that should be used as the scrollable area.
        const throttleFunc = UixThrottle(scrollUpdate, 5);
        window.removeEventListener('scroll', throttleFunc);
        window.removeEventListener('touchmove', throttleFunc);
        window.addEventListener('scroll', throttleFunc);
        window.addEventListener('touchmove', throttleFunc);
        throttleFunc();
        
		


		
    };

    module.components.documentReady.push( module.SCROLLSPY_ANIM.documentReady );
	

	return class SCROLLSPY_ANIM {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


