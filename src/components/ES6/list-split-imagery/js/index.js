
/* 
 *************************************
 * <!-- Fullwidth List of Split -->
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


export const POST_LIST_SPLIT_FULLWIDTH = ( ( module, $, window, document ) => {
	
	

    module.POST_LIST_SPLIT_FULLWIDTH               = module.POST_LIST_SPLIT_FULLWIDTH || {};
    module.POST_LIST_SPLIT_FULLWIDTH.version       = '0.0.2';
    module.POST_LIST_SPLIT_FULLWIDTH.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.uix-list-split-imagery' ).each( function() {
				var imgH = $( this ).find( '.uix-list-split-imagery__img img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', 'auto' );
				}

			});	
		}
			    
		
    };

    module.components.pageLoaded.push( module.POST_LIST_SPLIT_FULLWIDTH.pageLoaded );

	return class POST_LIST_SPLIT_FULLWIDTH {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




