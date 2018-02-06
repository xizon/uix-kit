/*! 
 *************************************
 * Progress Bar
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		$( '[data-progressbar-percent]' ).each(function() {

			var $this        = $( this ),
				percent      = $this.data( 'progressbar-percent' ),
				unit         = $this.data( 'progressbar-unit' );
			
			if( typeof percent === typeof undefined ) {
				percent = 0;
			}
			
			if( typeof unit === typeof undefined ) {
				unit = '%';
			}	
			
			
			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					
					
					//Radial Progress Bar
					if ( $this.hasClass( 'custom-radial-progressbar' ) ) {
						$this.find( '.track' ).html( '<span>'+percent+'<em class="unit">'+unit+'</em></span>' );
						$this.addClass( 'progress-' + percent );	
					} 


					//Rectangle Progress Bar
					if ( $this.hasClass( 'custom-rectangle-progressbar' ) ) {
						$this.find( '.bar > span' ).html( ''+percent+'<em class="unit">'+unit+'</em>' );
						$this.addClass( 'progress-' + percent );	
					} 
		
					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  
					

			    },
			    offset: '100%' //0~100%, bottom-in-view
			});


		});
		
		
	

		
		
    };

    theme.progressBar = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );






