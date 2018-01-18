
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
			'start'        : 0,
			'end'          : 100,
			'duration'     : 400,
			'doubleDigits' : false,
			'dilimiter'    : true

		}
		,options);
		this.each(function(){
			
		
			var $this   = $( this );
	

			function countUp( count ) {
			  var div_by    = 100,
				  speed     = Math.round( count / div_by ),
				  $display  = $this,
				  run_count = 1,
				  int_speed = settings.duration/100;  
				  
				
			  // Counter init
			  var int = setInterval( function() {
				if( run_count < div_by ){
					
					if ( settings.doubleDigits ) {
						var curr_count_go = speed * run_count;
						if ( curr_count_go < 10 ) {
							curr_count_go = '0' + curr_count_go;
						}	
					}
					
					if ( settings.dilimiter && curr_count > 0 ) {
						curr_count_go = curr_count_go.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
					}
					
					
				    $display.text( curr_count_go );
				    run_count++;
				} else if(parseInt( $display.text().toString().replace(/\,/g, '' ) ) < count) {
				    var curr_count = parseInt( $display.text().toString().replace(/\,/g, '' )) + 1
					
					if ( settings.doubleDigits ) {
						if ( curr_count < 10 ) {
							curr_count = '0' + curr_count;
						}	
					}
					
					
					if ( settings.dilimiter && curr_count > 0 ) {
						curr_count = curr_count.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
					}
					
				    $display.text( curr_count );
				} else {
				    clearInterval( int );
				}
			  }, int_speed );
			}

			countUp( settings.end );
			
			
			
		})
	}
})(jQuery);	
		
		
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
	
		$( '[data-counter-number]' ).each(function() {


			var $this          = $( this ),
				dataNum        = $this.data( 'counter-number' ),
				dataDur        = $this.data( 'counter-duration' ),
				dataDouble     = $this.data( 'counter-double-digits' ),
				dataDilimiter  = $this.data( 'counter-dilimiter' );



			if( typeof dataNum === typeof undefined ) { // If there is no data-xxx, save current source to it
				dataNum = Math.floor( Math.random() * 100 );
			}	

			if( typeof dataDur === typeof undefined ) {
				dataDur = 3000;
			}	

			if( typeof dataDouble === typeof undefined ) {
				dataDouble = true;
			}	

			if( typeof dataDilimiter === typeof undefined ) {
				dataDilimiter = true;
			}	



			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					$this.jCustomCounter({
						end          : dataNum,
						duration     : dataDur,
						doubleDigits : dataDouble,
						dilimiter    : dataDilimiter
					});

					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  

			    },
			    offset: '100%' //0~100%, bottom-in-view
			})




		});

		
		
    };

    theme.counter = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );
