/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	
		
		
		// Disable devices scaling
		//-------------------------------------	
		document.addEventListener('touchstart',function (event) {
			if(event.touches.length>1){
				event.preventDefault();
			}
		});
		
		var lastTouchEnd=0;
		document.addEventListener('touchend',function (event) {
			var now=(new Date()).getTime();
			if( now-lastTouchEnd <= 300 ){
				event.preventDefault();
			}
			lastTouchEnd=now;
		},false);
		
		
		
		// Loader Process
		//-------------------------------------	
		$( 'body' ).waitForImages().progress( function( loaded, count, success ) {
			
			var per = parseInt( loaded/(count-1) * 100 );
			
			if ( $( 'img' ).length <= 1 ) {
				per = 100;
			}
			
			if ( isNaN( per ) ) per = 100;
			
			$( '.loader-progress span' ).text( per + '%' );
			
			
		}).done( function() {
			
			//Event after loading is complete
			
			
			// Remove loader
			TweenMax.to( '.loader, .loader-progress', 0.5, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
							
			
			

		});
		
		
		
    };

    App.loader = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


			