
/* 
 *************************************
 * <!-- Hover Delay Interaction -->
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
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


export const HOVER_DELAY_INTERACTION = ( ( module, $, window, document ) => {
	
    module.HOVER_DELAY_INTERACTION               = module.HOVER_DELAY_INTERACTION || {};
	module.HOVER_DELAY_INTERACTION.version       = '0.0.1';
    module.HOVER_DELAY_INTERACTION.documentReady = function( $ ) {

		
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

    module.components.documentReady.push( module.HOVER_DELAY_INTERACTION.documentReady );
	

	return class HOVER_DELAY_INTERACTION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



