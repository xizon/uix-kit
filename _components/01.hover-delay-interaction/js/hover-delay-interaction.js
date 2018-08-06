
/* 
 *************************************
 * <!-- Hover Delay Interaction -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.HOVER_DELAY_INTERACTION               = APP.HOVER_DELAY_INTERACTION || {};
	APP.HOVER_DELAY_INTERACTION.version       = '0.0.1';
    APP.HOVER_DELAY_INTERACTION.documentReady = function( $ ) {

		
		var delayTime = 250;
	   
		$( '.uix-hover-delay-el' ).on( 'mouseover', function() {

			var $this = $( this );

			if ($this.prop('hoverTimeout' ) ) {
				$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
			}

			$this.prop( 'hoverIntent', setTimeout( function() {
				$this.find( '> div' ).html( 'Okay!' );
			}, delayTime ) );
			
		}).on( 'mouseleave', function() {
			var $this = $( this );

			if ($this.prop( 'hoverIntent' ) ) {
				$this.prop( 'hoverIntent', clearTimeout($this.prop('hoverIntent')));
			}

			$this.prop( 'hoverTimeout', setTimeout( function() {
				$this.find( '> div' ).html( 'Touch Me' );
			}, delayTime ) );
		});
		
    };

    APP.components.documentReady.push( APP.HOVER_DELAY_INTERACTION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



