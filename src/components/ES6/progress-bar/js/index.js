/* 
 *************************************
 * <!-- Progress Bar -->
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


import '../scss/_style.scss';


export const PROGRESS_BAR = ( ( module, $, window, document ) => {
	
	
    module.PROGRESS_BAR               = module.PROGRESS_BAR || {};
    module.PROGRESS_BAR.version       = '0.0.4';
    module.PROGRESS_BAR.documentReady = function( $ ) {

		var waypoints = $( '[data-progressbar-percent]' ).waypoint({
			handler: function( direction ) {

				var $this        = $( this.element ),
					percent      = $this.data( 'progressbar-percent' ),
					unit         = $this.data( 'progressbar-unit' );

				if ( typeof percent === typeof undefined ) {
					percent = 0;
				}

				if ( typeof unit === typeof undefined ) {
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

    module.components.documentReady.push( module.PROGRESS_BAR.documentReady );
	

	return class PROGRESS_BAR {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

