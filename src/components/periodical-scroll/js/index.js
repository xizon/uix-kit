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
    module.PERIODICAL_SCROLL.version       = '0.0.5';
    module.PERIODICAL_SCROLL.documentReady = function( $ ) {

		$( '.uix-periodical-scroll' ).each( function() {

			const $this       = $( this );
            
			let speed       = $this.data( 'speed' ),
				timing      = $this.data( 'timing' );
            
			const $list       = $this.find( '> ul' );
			const itemHeight  = $list.find( 'li:first' ).height();

			$this.css({
				'height': itemHeight + 'px',
				'overflow': 'hidden'
				
			})

			if ( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if ( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			
			//If there is only one item, add one to complete the seamless loop effect
			if ( $list.find( 'li' ).length == 1 ) {
				$list.prepend( $list.find( 'li:first' ).clone() );
			}
			
			
			//
			const eachItemAnimOKDelay = 150;
			const $item = $list.find( '> li' );
			const moveY = itemHeight*2;
			
			
			
			//Prevent repetition of animation events
			TweenMax.killTweensOf( $item );
			
			
			//
			const tl = new TimelineMax({
				              repeat      : -1,
				              repeatDelay : eachItemAnimOKDelay/1000

                           });
            
			
			//pauses wherever the playhead currently is:
			tl.pause();
			setTimeout( function() {
				tl.play();
			}, speed );
            

			tl
            .add( TweenMax.staggerFromTo( $item, speed/1000, {
                opacity : 0,
                y       : moveY
            },{
                opacity : 1,
                y       : 0
            }, timing/1000 ) )

            .add( TweenMax.staggerTo( $item, speed/1000, {
                delay    : timing/1000,
                opacity  : 0,
                y        : -moveY,
				onComplete: function() {
					TweenMax.set( this.target, {
						delay    : eachItemAnimOKDelay/1000,
						opacity : 0,
						y       : moveY
					});
								  
				}
            }, timing/1000 ), 0 );
            
            
			
			$item.on( 'mouseenter', function() { 
				tl.pause();
			} )
		    .on( 'mouseleave', function() { 
				tl.play();
				
				if ( $( this ).index() > 0 ) {
					TweenMax.set( $item.first(), {
						opacity : 0,
						y       : moveY
					});	
				}

				
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

