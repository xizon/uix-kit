/* 
 *************************************
 * <!-- 3D Background -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const THREE_BACKGROUND = ( ( module, $, window, document ) => {
	if ( window.THREE_BACKGROUND === null ) return false;
	
	
	
    module.THREE_BACKGROUND               = module.THREE_BACKGROUND || {};
    module.THREE_BACKGROUND.version       = '0.0.4';
    module.THREE_BACKGROUND.documentReady = function( $ ) {


		//grab each 3dAnimate element and pass it into the animate function along with the config data
		$( '[data-3d-animate]' ).each( function( index, element ) {
			let dataConfig = $( element ).data( '3d-animate' );
			
			if ( typeof dataConfig === typeof undefined ) {
				dataConfig = false;
			}

			if ( dataConfig ) {

				element.removeEventListener( 'mousemove', handleMove );
				element.removeEventListener( 'touchmove', handleMove );	
				element.addEventListener( 'mousemove', handleMove );
				element.addEventListener( 'touchmove', handleMove );

				//
				element.removeEventListener( 'mouseleave', handleMoveEnd );
				element.removeEventListener( 'touchend', handleMoveEnd );	
				element.addEventListener( 'mouseleave', handleMoveEnd );
				element.addEventListener( 'touchend', handleMoveEnd );

				//pass arguments to addEventListener listener
				element.obj = element;
				element.itemsTotal = element.children.length;
				element.config = dataConfig;

			}
			
			
		});



		function handleMove(e) {

			const el = e.currentTarget.obj;
			const itemsTotal = e.currentTarget.itemsTotal;
			const offsetRes = e.currentTarget.config.offset;
			const w = el.clientWidth;	//including: padding
			const h = el.clientHeight; //including: padding
			let base = 0; //Base offset value.
			let multiple = 0; //The power of target number.
	
			if ( offsetRes ) {
				if ( itemsTotal === 1 ) {
					base = Math.pow( offsetRes[0], offsetRes[1] );
				} else {
					base = offsetRes[0];
					multiple =  offsetRes[1];
				}
			}
	
	
			let mouseX, 
				mouseY,
				offsetX,
				offsetY;
			
			const touches = e.touches;
	
			//get the absolute position of a mouse
			//!!! Important: If you do not use window.pageXOffset or window.pageYOffset, 
			//              the mouse coordinates are relative to the parent element
			if ( touches && touches.length ) {	
				mouseX = touches[0].clientX + window.pageXOffset;
				mouseY = touches[0].clientY + window.pageYOffset;
			} else {
				mouseX = e.clientX + window.pageXOffset;
				mouseY = e.clientY + window.pageYOffset;
			} 
	
			//Find mouse position relative to element
			//!!! Important: Using `el.offsetTop` or `el.offsetLeft` is relative, the value may be 0
			offsetX = mouseX - $(el).offset().left;
			offsetY = mouseY - $(el).offset().top;
			
			//console.log('mouseX: ', mouseX, ' mouseY: ', mouseY, 'el.offsetLeft: ', $(el).offset().left, ' el.offsetTop: ', $(el).offset().top );
	
	
	
			if ( itemsTotal === 1 ) {
				/*
				////////////////////////////////////////////////////////////
				////////////////////////  Only One   ///////////////////////
				////////////////////////////////////////////////////////////
				*/
				// function to run matrix3D effect on block
				const targetX = mousePosition( offsetX, w, base ),
					  targetY = mousePosition( offsetY, h, base );
	
				el.style.transform = `rotateX(${targetY}deg) rotateY(${targetX}deg)`;
	
	
			} else {
				/*
				////////////////////////////////////////////////////////////
				////////////////////  Multiple Images   ////////////////////
				////////////////////////////////////////////////////////////
				*/
				// function to run matrix3D effect on block
				const targetX = offsetX/w,
					  targetY = offsetY/h;
	
				const $items = el.children;
				Array.prototype.forEach.call($items, function (node, index) {
					const x         = targetX * ( base*Math.pow( multiple, index ) ),
						  y         = targetY * ( base*Math.pow( multiple, index ) ),
						  z         = 0,
						  deg       = targetY * ( 180 / Math.PI ),
						  rotateDeg = deg - 35;
	
	
					node.style.transform = `translate(${x}px ,${y}px) rotate3d( -1, 1, 0, ${rotateDeg}deg )`;
				});
	
	
			}
	
	
	
		}
	
		function handleMoveEnd(e) {
			const el = e.currentTarget.obj;
			const itemsTotal = e.currentTarget.itemsTotal;
			const resetRes = e.currentTarget.config.reset;

			if ( resetRes ) {
	
	
				if ( itemsTotal === 1 ) {
					/*
					////////////////////////////////////////////////////////////
					////////////////////////  Only One   ///////////////////////
					////////////////////////////////////////////////////////////
					*/
					el.style.transform = `rotateX(0deg) rotateY(0deg)`;
		
				} else {
					/*
					////////////////////////////////////////////////////////////
					////////////////////  Multiple Images   ////////////////////
					////////////////////////////////////////////////////////////
					*/
					const $items = el.children;
					Array.prototype.forEach.call($items, function (node, index) {
						node.style.transform = `translate(0,0) rotate3d( -1, 1, 0, 0deg )`;
					});
		
				}
	
	
	
			}
				
		}
	
		// make some calculations for mouse position
		function mousePosition( mousePos, dimension, base ) {
			return ( Math.floor( mousePos / dimension * (base*2) ) - base );
		}
		
	
		
		
    };

    module.components.documentReady.push( module.THREE_BACKGROUND.documentReady );
	

	return class THREE_BACKGROUND {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );





