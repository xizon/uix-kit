
/* 
 *************************************
 * <!-- Scrollspy Animate -->
 *************************************
 */

/**
 * module.SCROLLSPY_ANIM
 * 
 * @requires ./examples/assets/js/min/pixi.min.js
 * @requires ./src/components/ES5/_plugins-GSAP
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


export const SCROLLSPY_ANIM = ( ( module, $, window, document ) => {
	if ( window.SCROLLSPY_ANIM === null ) return false;
	
	
	
    module.SCROLLSPY_ANIM               = module.SCROLLSPY_ANIM || {};
    module.SCROLLSPY_ANIM.version       = '0.0.3';
    module.SCROLLSPY_ANIM.documentReady = function( $ ) {

		// Remove pixi.js banner from the console
		PIXI.utils.skipHello();
		
		
		var $el         = $( '#scrollspy-animate-demo' ),
			panelHeight = 0;	
		

		//Prevent this module from loading in other pages
		if ( $el.length == 0 ) return false;
		
        
        var $window      = $( window ),
		    windowWidth  = window.innerWidth,
		    windowHeight = window.innerHeight;

        
		
		//-------- Text Affect
		if ( Modernizr.webgl ) {
			
			var $txtContainer    = $el.find( '.row canvas' ),
				count            = 0,
				curSprite,
				text             = $txtContainer.data( 'txt' ).split( '' ),
				tHeight          = 45,
				tWidth           = 25,
				renderer         = new PIXI.Application( tWidth*(text.length+2), tHeight*2, {
					antialias    : true,
					transparent  : true,
					resolution   : 1,
					autoResize   : 1,
					view         : document.getElementById( 'scrollspy-animate-demo--txt' )
				});
			
			

			var stage        = new PIXI.Container(),
				filterSprite = PIXI.Sprite.fromImage( $txtContainer.data( 'filter-texture' ) );
			
			filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
			var filter = new PIXI.filters.DisplacementFilter( filterSprite );


			var txtStyle = new PIXI.TextStyle({
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

			
			var ticker       = new PIXI.ticker.Ticker();
			ticker.autoStart = true;
			ticker.add( function( delta ) {

				filterSprite.y += 0.2 * delta;
				
				// Render updated scene
				renderer.render( stage );

			});

					
		}


        $window.on( 'scroll.SCROLLSPY_ANIM touchmove.SCROLLSPY_ANIM', function( event ) {
		
            
            var elHeight      = $el.height(),
                elOffsetTop   = $el.offset().top - panelHeight; 
            

            var scrollTop           = $( this ).scrollTop(),
				translateTitle      = scrollTop / 2,
				translateBackground = scrollTop / 3,
				scale               = scrollTop / elHeight,
				backgroundScale     = 1, // + scale / 10
				titleScale          = 1 - scale * 0.1,
				titleOpacity        = 1 - scale,
				scrollProgress      = ((scrollTop - elOffsetTop) / (elHeight - windowHeight / 6));

			
			
            //-------- Animation
            if ( scrollTop < elHeight ) {
     
                $el.find( '.row' ).css({
                    'transition': 'none',
                    'transform': 'translateY(' + translateTitle + 'px) scale(' + titleScale + ')',
                    'opacity': titleOpacity
                });
				
                $( 'body' ).removeClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
            } else if (scrollTop >= elHeight) {
                $( 'body' ).addClass( 'js-uix-content-part' ).removeClass( 'js-uix-bottom-part' );
				
				
            }
			
			
			//-------- Display progress
			$el.find( '.row h3 em' ).text( scrollProgress.toFixed(2) );

			if ( Modernizr.webgl ) {
				TweenMax.set( filterSprite, {
					x: windowHeight*scrollProgress
				});
	
			}

			
			
			
        });


		


		
    };

    module.components.documentReady.push( module.SCROLLSPY_ANIM.documentReady );
	

	return class SCROLLSPY_ANIM {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


