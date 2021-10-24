
/* 
 *************************************
 * <!-- Full Width Column to Edge -->
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


import '../scss/_style.scss';



export const FULL_WIDTH_COLUMN_TO_EDGE = ( ( module, $, window, document ) => {
	if ( window.FULL_WIDTH_COLUMN_TO_EDGE === null ) return false;
	
	
    module.FULL_WIDTH_COLUMN_TO_EDGE               = module.FULL_WIDTH_COLUMN_TO_EDGE || {};
    module.FULL_WIDTH_COLUMN_TO_EDGE.version       = '0.0.2';
    module.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded    = function() {

		$( '.js-uix-fullwidth-column-to-edge--extend-right' ).each( function()  {
			const $el = $( this );
			const actived = $el.data( 'activated' );
			if( typeof actived === typeof undefined ) {

				fullwidthToDir( $( this ), 'right', window.innerWidth );

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				$el.data( 'activated', 1 );
			}//endif actived
		});

		$( '.js-uix-fullwidth-column-to-edge--extend-left' ).each( function()  {
			const $el = $( this );
			const actived = $el.data( 'activated' );
			if( typeof actived === typeof undefined ) {

				fullwidthToDir( $( this ), 'left', window.innerWidth );

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				$el.data( 'activated', 1 );

			}//endif actived


		});
		
		
        function fullwidthToDir( obj, dir, w ) {
            const dividerPosition = obj.offset();
            const dividerWidth = $( window ).width() - dividerPosition.left;
            const bsGridGutter = 15;
        
        
            if ( w > 768 ) {
                obj.css( 'width', dividerWidth + bsGridGutter );
                
                if ( dir == 'left' ) {
                    const _dis = -(dividerPosition.left + bsGridGutter*2 );
                    obj.css( 'margin-left', _dis+'px' );
                }  

            } else {
                obj.css( 'width', 'inherit' );
                
                if ( dir == 'left' ) {
                    obj.css( 'margin-left', -bsGridGutter + 'px' );
                }    
                
                
            }
        }
        

		
		
    };

    module.components.pageLoaded.push( module.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded );

	return class FULL_WIDTH_COLUMN_TO_EDGE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




