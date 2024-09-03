/* 
 *************************************
 * <!-- Infinite Scrolling Element -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const INFINITE_SCROLLING_EL = ( ( module, $, window, document ) => {
	if ( window.INFINITE_SCROLLING_EL === null ) return false;
	
	
	
    module.INFINITE_SCROLLING_EL               = module.INFINITE_SCROLLING_EL || {};
    module.INFINITE_SCROLLING_EL.version       = '0.0.3';
    module.INFINITE_SCROLLING_EL.documentReady = function( $ ) {

		$( '.uix-infinite-scrolling' ).each( function() {

			const $this = $( this );
			let	speed = $this.data( 'speed' ),
                gap = $this.data( 'gap' );
			if ( typeof speed === typeof undefined ) speed = 3000;
            if ( typeof gap === typeof undefined ) gap = 20;


            const root = $this[0];
            const wrapperWidth = root.clientWidth;
            const $list = root.firstElementChild; // whitespace nodes might interfere with using `firstChild`
            const $itemsOriginal = $list.children;
            const itemsTotal = $itemsOriginal.length;
            
            //original width (including: padding)
            //------------------------------------------
            const itemsWidthOriginal = [];
            Array.prototype.forEach.call($list.children, function (node, index) {
              itemsWidthOriginal.push(node.clientWidth + gap); 
            });
            const allWidthOriginal = itemsWidthOriginal.reduce(function (previousValue, currentValue, currentIndex, array) {
              let newVal = previousValue + currentValue;
              return newVal;
            });
            
            
            //clone elements in order to complement content area
            //------------------------------------------
            const loopTimes = Math.ceil(wrapperWidth/allWidthOriginal);
            
            for (let i = 0; i < loopTimes; i++ ) {
              const $clonedItems = $list.cloneNode(true).querySelectorAll( 'li' ); //do not use `children`
              Array.prototype.some.call($clonedItems, function (node, index) {
                $list.appendChild( node );
                if ( index === itemsTotal-1 ) return true;
              });
            }
            
            
            //calculate the total width
            //------------------------------------------
            const $items = root.getElementsByTagName( 'li' );
            const itemsWidth = [];
            const itemPos = [];
            Array.prototype.forEach.call($items, function (node, index) {
              itemsWidth.push(node.clientWidth + gap);
            });
            
            
            itemPos.push(0, itemsWidth[0]);
            const allWidth = itemsWidth.reduce(function (previousValue, currentValue, currentIndex, array) {
              let newVal = previousValue + currentValue;
              itemPos.push(newVal)
              return newVal;
            });
            itemPos.pop();
            
            // console.log('itemsWidth: ', itemsWidth);
            // console.log('itemPos: ', itemPos);
            // console.log('allWidth: ', allWidth);
            
            
            //initially colorize each box and position in a row
            //------------------------------------------
            TweenMax.set($items, {
              x: function (i) {
                return itemPos[i];
              }
            });
            

            //TimelineMax
            const tl = new TimelineMax({
                repeat: -1,
                paused: true
            });

            
            tl.to($items, speed/1000, {
              ease: Linear.easeNone,
              x: "-=" + allWidthOriginal, //move each box "allWidthOriginal" to left
              modifiers: {
                x: function(x, target) {
                  return x % allWidth; //force x value to be between 0 and "allWidth" using modulus
                }
              }
            })
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

