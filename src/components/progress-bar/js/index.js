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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const PROGRESS_BAR = ( ( module, $, window, document ) => {
	if ( window.PROGRESS_BAR === null ) return false;
	
	
	
    module.PROGRESS_BAR               = module.PROGRESS_BAR || {};
    module.PROGRESS_BAR.version       = '0.0.6';
    module.PROGRESS_BAR.documentReady = function( $ ) {

		
		const $scrollElements = $( '[data-progressbar-percent]' );
       
        $( window ).off( 'scroll.PROGRESS_BAR touchmove.PROGRESS_BAR' );
        
        $scrollElements.each( function()  {

            
            const viewport = 1;
            const $el = $( this );
           

            //
            const scrollUpdate = function() {
                
                const spyTop = $el[0].getBoundingClientRect().top;
                
                //Prevent asynchronous loading of repeated calls
                const actived = $el.data( 'activated' );


                if ( spyTop < ( window.innerHeight * viewport ) ) {

                    if( typeof actived === typeof undefined ) {

                        let	percent      = $el.data( 'progressbar-percent' ),
                            unit         = $el.data( 'progressbar-unit' );

                        if ( typeof percent === typeof undefined ) {
                            percent = 0;
                        }

                        if ( typeof unit === typeof undefined ) {
                            unit = '%';
                        }	


                        //Radial Progress Bar
                        if ( $el.hasClass( 'uix-progressbar--circle' ) ) {
                            $el.find( '.uix-progressbar__track' ).html( '<span>'+percent+'<em class="uix-progressbar__unit">'+unit+'</em></span>' );
                            $el.addClass( 'uix-progressbar--progress-' + percent );	
                        } 


                        //Rectangle Progress Bar
                        if ( $el.hasClass( 'uix-progressbar--rectangle' ) ) {
                            $el.find( '.uix-progressbar__bar > span' ).html( ''+percent+'<em class="uix-progressbar__unit">'+unit+'</em>' );
                            $el.addClass( 'uix-progressbar--progress-' + percent );	
                        } 
                        
                        
                        //Prevents front-end javascripts that are activated in the background to repeat loading.
                        $el.data( 'activated', 1 );



                    }//endif actived


                }
            };
            
            
            scrollUpdate();
            
            // Please do not use scroll's off method in each
            $( window ).on( 'scroll.PROGRESS_BAR touchmove.PROGRESS_BAR', function( event ) {
                 scrollUpdate();
            });



        });//end each        
		
		
    };

    module.components.documentReady.push( module.PROGRESS_BAR.documentReady );
	

	return class PROGRESS_BAR {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

