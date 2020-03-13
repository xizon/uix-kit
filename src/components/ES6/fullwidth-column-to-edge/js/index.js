
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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';



export const FULL_WIDTH_COLUMN_TO_EDGE = ( ( module, $, window, document ) => {
	if ( window.FULL_WIDTH_COLUMN_TO_EDGE === null ) return false;
	
	
	

    module.FULL_WIDTH_COLUMN_TO_EDGE               = module.FULL_WIDTH_COLUMN_TO_EDGE || {};
    module.FULL_WIDTH_COLUMN_TO_EDGE.version       = '0.0.1';
    module.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded    = function() {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
		
		fullwidthColumnToEdgeInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
                fullwidthColumnToEdgeInit( windowWidth );



			}
		});
        
        function fullwidthColumnToEdgeInit( w ) {
            
            $( '.js-uix-fullwidth-column-to-edge--extend-right' ).each( function()  {
                fullwidthToDir( $( this ), 'right', w );
            });

            $( '.js-uix-fullwidth-column-to-edge--extend-left' ).each( function()  {
                fullwidthToDir( $( this ), 'left', w );
            });

        }
		
		
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




