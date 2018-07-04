/* 
 *************************************
 * <!-- Progress Bar -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PROGRESSBAR               = APP.PROGRESSBAR || {};
	APP.PROGRESSBAR.version       = '0.0.4';
    APP.PROGRESSBAR.documentReady = function( $ ) {

		var waypoints = $( '[data-progressbar-percent]' ).waypoint({
			handler: function( direction ) {

				var $this        = $( this.element ),
					percent      = $this.data( 'progressbar-percent' ),
					unit         = $this.data( 'progressbar-unit' );

				if( typeof percent === typeof undefined ) {
					percent = 0;
				}

				if( typeof unit === typeof undefined ) {
					unit = '%';
				}	


				//Radial Progress Bar
				if ( $this.hasClass( 'uix-progressbar--circle' ) ) {
					$this.find( '.uix-progressbar__track' ).html( '<span>'+percent+'<em class="uix-progressbar__unit">'+unit+'</em></span>' );
					$this.addClass( 'uix-progressbar--progress-' + percent );	
				} 


				//Rectangle Progress Bar
				if ( $this.hasClass( 'uix-progressbar--rectangle' ) ) {
					$this.find( '.uix-progressbar__bar > span' ).html( ''+percent+'<em class="uix-progressbar__unit">'+unit+'</em>' );
					$this.addClass( 'uix-progressbar--progress-' + percent );	
				} 

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();



			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
    };

    APP.components.documentReady.push( APP.PROGRESSBAR.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


