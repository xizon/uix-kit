/* 
 *************************************
 * <!-- 3D Background -->
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


export const THREE_BACKGROUND = ( ( module, $, window, document ) => {
	if ( window.THREE_BACKGROUND === null ) return false;
	
	
	
    module.THREE_BACKGROUND               = module.THREE_BACKGROUND || {};
    module.THREE_BACKGROUND.version       = '0.0.2';
    module.THREE_BACKGROUND.documentReady = function( $ ) {


		//grab each 3dAnimate element and pass it into the animate function along with the config data
		$( '[data-3d-animate]' ).each( function( index, element ) {
			var config      = $( element ).data( '3d-animate' );
			
			
			if ( typeof config === typeof undefined ) {
				config = false;
			}

			if ( config ) {
				
				if ( Object.prototype.toString.call( config.offset ) == '[object Array]' ) {
					animate3dMultiElement( config.offset[0], config.offset[1], element, config.reset );
				} else {
					animate3dElement( config.offset, element, config.reset );
				}

			}
			
			
		});
		
	
		/*
		 * Sets an animation for each element
		 *
		 * @param  {Number} base           - Base offset value.
		 * @param  {String} obj            - An HTML element.
		 * @param  {Boolean} reset         - Reset block on mouse leave
		 * @return {Void}
		 */
		function animate3dElement( base, obj, reset ) {

			var $el      = $( obj ),
				w        = $el.innerWidth(),
				h        = $el.innerHeight();
			

//			TweenMax.set( $el, {
//				perspective    : 500,
//				transformStyle : "preserve-3d"
//			});


			
			// mouse move on block
			$( obj ).on( 'mousemove touchmove', function( e ) {
				
				var mX, 
					mY,
					rmX,
					rmY,
					touches = e.originalEvent.touches;
			
				if ( touches && touches.length ) {

					mX = touches[0].pageX;
					mY = touches[0].pageY;

				} else {

					mX = e.pageX;
					mY = e.pageY;
				}
				
				//Find mouse position relative to element
				rmX = mX - $( this ).offset().left;
				rmY = mY - $( this ).offset().top;	
				
				//console.log('X: ' + rmX + ' Y: ' + rmY );
	
				
				// function to run matrix3D effect on block
				var tX = mousePosition( rmX, w ),
					tY = mousePosition( rmY, h );


				TweenMax.to( $( this ), 0.2, {
					rotationY          : tX,
					rotationX          : tY,
					backgroundPosition : ( tX + 120 ) + "% 50%",
				});
				
				
				
			});
				
			
			if ( reset ) {
				$( obj ).on( 'mouseleave touchcancel', function() {
					TweenMax.to( $( this ), 0.5, {
						rotationY          : 0,
						rotationX          : 0,
						backgroundPosition : "120% 50%"
					});
				});	
			}
				


			// make some calculations for mouse position
			function mousePosition( mousePos, dimension ) {
				return ( Math.floor( mousePos / dimension * (base*2) ) - base );
			}

			
		}
			
		
		
		/*
		 * Sets an animation with parallax for each element
		 *
		 * @param  {Number} base           - Base offset value.
		 * @param  {Number} multiple       - The power of target number.
		 * @param  {String} obj            - An HTML element.
		 * @param  {Boolean} reset         - Reset block on mouse leave
		 * @return {Void}
		 */
		function animate3dMultiElement( base, multiple, obj, reset ) {

			//get the specs of the element
			var divOffset = $( obj ).offset(),
				divTop    = divOffset.top,
				divLeft   = divOffset.left,
				divWidth  = $( obj ).innerWidth(),
				divHeight = $( obj ).innerHeight();

			
	
			//set an onmousemove event on the element
			$( obj ).on( 'mousemove touchmove', function( e ){

				var pctX, 
					pctY,
					touches = e.originalEvent.touches;
			
				if ( touches && touches.length ) {

					pctX = ( touches[0].pageX - divLeft )/divWidth;
					pctY = ( touches[0].pageY - divTop )/divHeight;

				} else {

					pctX = ( e.pageX - divLeft )/divWidth;
					pctY = ( e.pageY - divTop )/divHeight;
				}

				
				

				$( this ).children().each( function( index, elementSub ) {
					var x         = pctX * ( base*Math.pow( multiple, index ) ),
						y         = pctY * ( base*Math.pow( multiple, index ) ),
						z         = 0,
						deg       = pctY * ( 180 / Math.PI ),
						rotateDeg = parseFloat( deg - 35 );
					
					
					TweenMax.to( $( elementSub ), 0.2, {
						css: {
							'transform' : 'translate('+ x +'px ,'+ y +'px) rotate3d( -1, 1, 0, '+ rotateDeg +'deg )'
						}
					});
			
					
				});

			});
			
			if ( reset ) {
				$( obj ).on( 'mouseleave touchcancel', function() {
					
					
					$( this ).children().each( function( index, elementSub ) {

						TweenMax.to( $( elementSub ), 0.5, {
							css: {
								'transform' : 'translate(0,0) rotate3d( -1, 1, 0, 0deg )'
							}
						});
					});
				});	
			}
						
			

		}
		
		
    };

    module.components.documentReady.push( module.THREE_BACKGROUND.documentReady );
	

	return class THREE_BACKGROUND {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );





