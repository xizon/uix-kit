
/* 
 *************************************
 * <!-- Theme Scripts  -->
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


export const MAIN = ( ( module, $, window, document ) => {
	
	
    module.MAIN               = module.MAIN || {};
	module.MAIN.version       = '0.0.1';
    module.MAIN.documentReady = function( $ ) {

		/* 
		 ====================================================
		 *  Function Title Here
		 ====================================================
		 */
		//your code here...
	
		
    };
	
    module.MAIN.pageLoaded    = function() {

		/* 
		 ====================================================
		 *  Function Title Here
		 ====================================================
		 */
		//your code here...
		
    };
	

    module.components.documentReady.push( module.MAIN.documentReady );
    module.components.pageLoaded.push( module.MAIN.pageLoaded );	

	return class MAIN {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


