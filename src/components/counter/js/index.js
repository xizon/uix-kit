
/* 
 *************************************
 * <!-- Counter -->
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
import UixCountTo from '@uixkit/core/counter/js/fn/count-to';

import '../scss/_style.scss';


export const COUNTER = ( ( module, $, window, document ) => {
	if ( window.COUNTER === null ) return false;
	
	
	
    module.COUNTER               = module.COUNTER || {};
    module.COUNTER.version       = '0.0.4';
    module.COUNTER.documentReady = function( $ ) {

		
		const $scrollElements = $( '[data-counter-number]' );
      
        $( window ).off( 'scroll.COUNTER touchmove.COUNTER' );
        
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

                    
                        $el.UixCountTo();
                        
                        //Prevents front-end javascripts that are activated in the background to repeat loading.
                        $el.data( 'activated', 1 );



                    }//endif actived


                }
            };
            
            
            scrollUpdate();
            
            // Please do not use scroll's off method in each
            $( window ).on( 'scroll.COUNTER touchmove.COUNTER', function( event ) {
                 scrollUpdate();
            });



        });//end each        
		

		
    };

    module.components.documentReady.push( module.COUNTER.documentReady );
	

	return class COUNTER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );
