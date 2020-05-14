/* 
 *************************************
 * <!-- Infinite Scrolling Element -->
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


export const INFINITE_SCROLLING_EL = ( ( module, $, window, document ) => {
	if ( window.INFINITE_SCROLLING_EL === null ) return false;
	
	
	
    module.INFINITE_SCROLLING_EL               = module.INFINITE_SCROLLING_EL || {};
    module.INFINITE_SCROLLING_EL.version       = '0.0.2';
    module.INFINITE_SCROLLING_EL.documentReady = function( $ ) {

		$( '.uix-infinite-scrolling' ).each( function() {

			const $this       = $( this );
            
			let	speed       = $this.data( 'speed' );
            
			if ( typeof speed === typeof undefined ) {
				speed = 3000;
			}

            
			const $list = $this.find( '> ul' );
            const $clonedList = $list.clone();
            
            
            //Calculate the total width
            let listWidth = $list.find( 'li:first' ).width();

            $list.find( 'li' ).each(function(i) {
                listWidth += $(this, i).width();
            });
            
            
            // Set the width of the outer container to match the width of the content
            $this.css( 'width', listWidth + 'px' );
        
            
            //
            $list.add( $clonedList );

            $clonedList.addClass( 'cloned' ).appendTo( $this );

            //TimelineMax
            const tl = new TimelineMax({
                repeat: -1,
                paused: true
            });

            const time = speed/1000;

            tl.fromTo($list, time, {
                rotation: 0.01,
                x: 0
            },{
                force3D: true,
                x: -listWidth,
                ease: Linear.easeNone
            },0)

            .fromTo($clonedList, time, {
                rotation: 0.01,
                x: listWidth
            },{
                force3D: true,
                x: 0,
                ease: Linear.easeNone
            },0)
            
            .set($list, {
                force3D: true,
                rotation: 0.01,
                x: listWidth
            })
            
            .to($clonedList, time, {
                force3D: true,
                rotation: 0.01,
                x: -listWidth,
                ease: Linear.easeNone
            },time)
            
            .to($list, time, {
                force3D: true,
                rotation: 0.01,
                x: 0,
                ease: Linear.easeNone
            },time)
            
            .progress(1)
            .progress(0)
            .play();

            //Pause/Play		
            $this.on( 'mouseenter', function() {
                tl.pause();
            }).on( 'mouseleave', function() {
                tl.play();
            });  

			
		});
		
    };

    module.components.documentReady.push( module.INFINITE_SCROLLING_EL.documentReady );
	

	return class INFINITE_SCROLLING_EL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

