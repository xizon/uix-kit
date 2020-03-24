
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
    module.COUNTER.version       = '0.0.3';
    module.COUNTER.documentReady = function( $ ) {

		
		const $scrollElements = $( '[data-counter-number]' );
      
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
