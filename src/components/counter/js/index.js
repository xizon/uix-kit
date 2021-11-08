
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
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';
import UixCountTo from '@uixkit/core/counter/js/fn/count-to';


export const COUNTER = ( ( module, $, window, document ) => {
	if ( window.COUNTER === null ) return false;
	
	
	
    module.COUNTER               = module.COUNTER || {};
    module.COUNTER.version       = '0.0.6';
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
            

            // Add function to the element that should be used as the scrollable area.
            const throttleFunc = UixThrottle(scrollUpdate, 5);
            window.removeEventListener('scroll', throttleFunc);
            window.removeEventListener('touchmove', throttleFunc);
            window.addEventListener('scroll', throttleFunc);
            window.addEventListener('touchmove', throttleFunc);
            throttleFunc();



        });//end each        
		

		
    };

    module.components.documentReady.push( module.COUNTER.documentReady );
	

	return class COUNTER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );
