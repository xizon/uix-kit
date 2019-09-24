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
    module.PERIODICAL_SCROLL.version       = '0.0.2';
    module.PERIODICAL_SCROLL.documentReady = function( $ ) {

		$( '[data-periodical-scroll-container]' ).each( function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' ),
				$wrap       = $this.find( ul ),
				itemHeight  = $wrap.find( 'li:first' ).height();


			if ( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if ( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			var $item     = $wrap.find( '> li' ),
				moveY     = itemHeight*2,
				timeline  = new TimelineMax({
				onComplete: function() {
					setTimeout( function() {
						timeline.restart();
					}, timing );
					
				}
			});

			TweenLite.defaultEase = Circ.easeInOut;

			timeline
					.add( TweenMax.staggerFromTo( $item, speed/1000, {
						opacity : 0,
						y       : moveY
					},
					{
						opacity : 1,
						y       : 0,
					}, timing/1000 ))
			
					.add( TweenMax.staggerTo( $item, speed/1000, {
						delay    : timing/1000,
						opacity  : 0,
						y        : -moveY,
					}, timing/1000 ), 0 );
			

			
			$wrap.on( 'mouseenter', function() { 
				timeline.pause();
			} )
		    .on( 'mouseleave', function() { 
				timeline.play();
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

