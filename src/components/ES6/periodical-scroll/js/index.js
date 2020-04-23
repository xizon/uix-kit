/* 
 *************************************
 * <!-- Periodical Scroll -->
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


import '../scss/_style.scss';


export const PERIODICAL_SCROLL = ( ( module, $, window, document ) => {
	if ( window.PERIODICAL_SCROLL === null ) return false;
	
	
	
    module.PERIODICAL_SCROLL               = module.PERIODICAL_SCROLL || {};
    module.PERIODICAL_SCROLL.version       = '0.0.3';
    module.PERIODICAL_SCROLL.documentReady = function( $ ) {

		$( '.uix-periodical-scroll' ).each( function() {

			const $this       = $( this );
            
			let speed       = $this.data( 'speed' ),
				timing      = $this.data( 'timing' );
            
			const $list       = $this.find( '> ul' );
			const itemHeight  = $list.find( 'li:first' ).height();


			if ( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if ( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			const $item = $list.find( '> li' );
			const moveY = itemHeight*2;
			const tl = new TimelineMax({
                              onComplete: function() {
                                  
                                    TweenMax.set( $item.first(), {
                                        opacity : 0,
                                        y       : moveY
                                    });
                                  
                                    setTimeout( function() {
                                        tl.restart();
                                    }, timing );

                              }
                           });
            
            

			tl
            .add( TweenMax.staggerFromTo( $item, speed/1000, {
                opacity : 0,
                y       : moveY
            },{
                opacity : 1,
                y       : 0,
            }, timing/1000 ) )

            .add( TweenMax.staggerTo( $item, speed/1000, {
                delay    : timing/1000,
                opacity  : 0,
                y        : -moveY,
            }, timing/1000 ), 0 );
            
            
			
			$list.on( 'mouseenter', function() { 
				tl.pause();
			} )
		    .on( 'mouseleave', function() { 
				tl.play();
			} );
			

			
		});
		
    };

    module.components.documentReady.push( module.PERIODICAL_SCROLL.documentReady );
	

	return class PERIODICAL_SCROLL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

