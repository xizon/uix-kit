
/*! 
 *************************************
 * 18. Counter
 *************************************
 */
//Custom Function
(function($){
	$.fn.jCustomCounter=function(options){
		var settings=$.extend({
            "animToLastFrameEvent": function () {
               
            },
			'start'    : 0,
			'end'      : 100,
			'easing'   : 'swing',
			'duration' : 400,
			'complete' : ''

		}
		,options);
		this.each(function(){
			
		
			var $this = $( this );

			$( { count: settings.start } ).animate( { count: settings.end }, {
				duration : settings.duration,
				easing   : settings.easing,
				step     : function() {
					var mathCount = Math.ceil( this.count );
					if ( mathCount < 10 ) {
						mathCount = '0' + mathCount;
					}
					$this.text( mathCount );
				},
				complete : settings.complete
			});

			
		})
	}
})(jQuery);	
		
		
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		//Counter initialize
		$( 'html, body' ).stop().animate({
			scrollTop: 2
		}, 100 );	
		
		
		$window.on( 'scroll', function() {

			var scrollTop = $window.scrollTop();
			counterInit( scrollTop );
			
			//Detecting when user scrolls to bottom of div
			var arrivedAtBottom = function () { 
				return scrollTop + $window.height() == $( document ).height(); 
			} 
			
			if( arrivedAtBottom() ) { 
				counterInit( 'go' );
			}
			
		});	
		

		function counterInit( sn ) {
			
			$( '[data-counter-number]' ).each(function() {
				
			
				var $this       = $( this ),
					activated   = $this.data( 'activated' ),//In order to avoid duplication of the running script with Uix Page Builder ( required )
				    dataNum     = $this.data( 'counter-number' ),
					dataDur     = $this.data( 'counter-duration' );
				

				if ( typeof activated === typeof undefined || activated === 0 ) {

					if( typeof dataNum === typeof undefined ) { // If there is no data-xxx, save current source to it
						dataNum = Math.floor( Math.random() * 100 );
					}	

					if( typeof dataDur === typeof undefined ) {
						dataDur = 3000;
					}	
					
					
					if ( 
						parseFloat( sn + 50 ) >= parseFloat( $this.offset().top - windowHeight/2 - 50 ) ||
						sn == 'go'
					) {
						
						
						$this.jCustomCounter({
							end      : dataNum,
							duration : dataDur
						});
						
						//Prevents front-end javascripts that are activated in the background to repeat loading.
						$this.data( 'activated', 1 );		
						
						
					}


	


				}	

				
	
			});
		}
		
		
		
		
    };

    theme.counter = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );
