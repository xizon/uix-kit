
/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


export const COMMON_HEIGHT = ( ( module, $, window, document ) => {
	if ( window.COMMON_HEIGHT === null ) return false;
	
	
	module.COMMON_HEIGHT               = module.COMMON_HEIGHT || {};
    module.COMMON_HEIGHT.version       = '0.0.4';
	module.COMMON_HEIGHT.pageLoaded = function() {


		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
		
		commonHeightInit( windowWidth );

        function windowUpdate() {
            // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
            if ( window.innerWidth != windowWidth ) {
                
                // Update the window width for next time
                windowWidth = window.innerWidth;
        
                // Do stuff here
                commonHeightInit( windowWidth );
        
        
            }
        }
        
        // Add function to the window that should be resized
        const debounceFuncWindow = UixDebounce(windowUpdate, 50);
        window.removeEventListener('resize', debounceFuncWindow);
        window.addEventListener('resize', debounceFuncWindow);

        
        function commonHeightInit( w ) {
            
            $( '.js-uix-common-height' ).each( function()  {
                const $this        = $( this );
                const element = $this;
                const selectors = '[class*=col-], [class*=uix-core-grid__col-]'; //Bootstrap grid system and Custom uix grid system
                let maxHeight = 0;


                // Select and loop the elements you want to equalise
                element.children( selectors ).each( function() {
                    const element = $( this );
                    
                    //Solve the problem that the image cannot be read accurately
                    element.find( 'img' ).each( function()  {
                        const imgOuter = $( this ).parent( 'a' ).css( 'display' );
                        if ( imgOuter == 'inline' ) {
                            $( this ).parent( 'a' ).css( 'display', 'inline-block' );
                        }
                    });

                    
                   
                    if( element.hasClass( 'max-height' ) ) {
                        
                        // if has max-height
                        maxHeight = element.outerHeight();
                    } else {
                        // if this box is higher than the cached highest then store it
                        if( element.height() > maxHeight ) {
                            maxHeight = element.outerHeight(); 
                        }  
                    }
                    
                    
                });
                
                
           
                // Set the height of all those children to whichever was highest 
                if ( w > 768 ) {
                    element.children( selectors ).each( function() {
                        $( this ).css( 'height', maxHeight );
                    });	
                } else {
                    element.children( selectors ).each( function() {
                        $( this ).css( 'height', 'auto' );
                    });		
                }

            });	   
        }
        
        


	};

	module.components.pageLoaded.push( module.COMMON_HEIGHT.pageLoaded );

	return class COMMON_HEIGHT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

