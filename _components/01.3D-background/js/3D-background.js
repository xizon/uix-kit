/* 
 *************************************
 * <!-- 3D Background -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height();
		
		
		
		//grab each 3dAnimate element and pass it into the animate function along with the config data
		$( '[data-3dAnimate]' ).each( function( index, element ) {
			var a = $( element ).data( '3danimate' );
			animate3dElement( a[0], a[1], element );
		});
		

		
		/*
		 * Sets an animation for each element
		 *
		 * @param  {number} base           - Base offset value.
		 * @param  {number} multiple       - The power of target number.
		 * @param  {object} element        - An HTML element.
		 * @return {void}                  - The constructor.
		 */
		function animate3dElement( base, multiple, element ) {

			//get the specs of the element
			var divOffset = $( element ).offset(),
				divTop    = divOffset.top,
				divLeft   = divOffset.left,
				divWidth  = $( element ).innerWidth(),
				divHeight = $( element ).innerHeight();

	
			//set an onmousemove event on the element
			$( element ).on( 'mousemove touchmove', function( e ){

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



				$( this ).children().each( function( index, element ) {
					var x         = pctX * ( base*Math.pow( multiple, index ) ),
						y         = pctY * ( base*Math.pow( multiple, index ) ),
						z         = 0,
						deg       = pctY * ( 180 / Math.PI ),
						rotateDeg = parseFloat( deg - 35 );
				
					
					$( element ).css( 'transform', 'translate('+ x +'px ,'+ y +'px) rotate3d( -1, 1, 0, '+ rotateDeg +'deg )' );
					
					
					
				});

			});

		}
		
    };

    App.threeDimensionalBackground = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );








