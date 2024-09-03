
/* 
 *************************************
 * <!-- Hover Delay Interaction -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


export const HOVER_DELAY_INTERACTION = ( ( module, $, window, document ) => {
	if ( window.HOVER_DELAY_INTERACTION === null ) return false;
	
	
    module.HOVER_DELAY_INTERACTION               = module.HOVER_DELAY_INTERACTION || {};
    module.HOVER_DELAY_INTERACTION.version       = '0.0.1';
    module.HOVER_DELAY_INTERACTION.documentReady = function( $ ) {

		
		const delayTime = 250;
	   
		$( '.uix-hover-delay-el' ).on( 'mouseover', function() {

			const $this = $( this );

			if ($this.prop('hoverTimeout' ) ) {
				$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
			}

			$this.prop( 'hoverIntent', setTimeout( function() {
				$this.find( '> div' ).html( 'Okay!' );
			}, delayTime ) );
			
		}).on( 'mouseleave', function() {
			const $this = $( this );

			if ($this.prop( 'hoverIntent' ) ) {
				$this.prop( 'hoverIntent', clearTimeout($this.prop('hoverIntent')));
			}

			$this.prop( 'hoverTimeout', setTimeout( function() {
				$this.find( '> div' ).html( 'Touch Me' );
			}, delayTime ) );
		});
		
    };

    module.components.documentReady.push( module.HOVER_DELAY_INTERACTION.documentReady );
	

	return class HOVER_DELAY_INTERACTION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



