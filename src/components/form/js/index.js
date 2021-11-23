
/* 
 *************************************
 * <!-- Form -->
 *************************************
 */
/*
    Note:
	
	If you use the "change" event to asynchronously change a custom control of select, radio or checkbox, 
	you need add a callback function that initializes the style:
	
	$( document ).UixRenderXXXXXXXXX();

	
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
import UixRenderNormalRadio from '@uixkit/core/form/js/fn/normal-radio';
import UixRenderDatePicker from '@uixkit/core/form/js/fn/datepicker';
import UixRenderControlsHover from '@uixkit/core/form/js/fn/controls-hover';
import UixRenderCustomSingleSel from '@uixkit/core/form/js/fn/single-seletor';
import UixRenderCustomMultiSel from '@uixkit/core/form/js/fn/multi-seletor';
import UixRenderCustomFileDropzone from '@uixkit/core/form/js/fn/file-dropzone';
import UixRenderCustomFile from '@uixkit/core/form/js/fn/upload';
import UixRenderControlsDisable from '@uixkit/core/form/js/fn/controls-disable';
import UixRenderControlsLineEff from '@uixkit/core/form/js/fn/controls-line';
import UixRenderCustomRadioCheckbox from '@uixkit/core/form/js/fn/radio-and-checkbox';
import UixRenderCustomSelect from '@uixkit/core/form/js/fn/select';
import UixRenderTagInput from '@uixkit/core/form/js/fn/tag-input';
import UixRenderDynamicFields from '@uixkit/core/form/js/fn/dynamic-fields';
import UixRenderNumberInput from '@uixkit/core/form/js/fn/number-input';





import '../scss/_basic.scss';
import '../scss/_layout.scss';
import '../scss/_theme_material.scss';
import '../scss/_jquery.datetimepicker.scss';



export const FORM = ( ( module, $, window, document ) => {
	if ( window.FORM === null ) return false;
	
	
	
    module.FORM               = module.FORM || {};
    module.FORM.version       = '0.1.8';
    module.FORM.documentReady = function( $ ) {

		
		/*
		 * Callbacks for special forms (supports asynchronous)
		 * Add this code to initialize the style when calling 
		 * the form externally with other scripts
		 *
		 * @return {Void}
		 */
		$( document ).UixRenderCustomSelect(); //Render Custom Select
		$( document ).UixRenderCustomRadioCheckbox(); //Render Custom Radio, Toggle And Checkbox
		$( document ).UixRenderControlsLineEff(); //Create Line Effect on Click
		$( document ).UixRenderControlsDisable(); //Disabled Controls
		$( document ).UixRenderCustomFile(); //Render Custom File Type
		$( document ).UixRenderCustomFileDropzone(); //Render Custom File Dropzone
		$( document ).UixRenderControlsHover(); //Hover Effect
		$( document ).UixRenderCustomMultiSel(); //Render Multiple Selector
		$( document ).UixRenderCustomSingleSel(); //Render Single Selector
		$( document ).UixRenderNormalRadio(); //Render Normal Radio
		$( document ).UixRenderDatePicker(); //Render Date Picker	
		$( document ).UixRenderTagInput(); //Render Tag Input
		$( document ).UixRenderDynamicFields(); //Render Dynamic Fields
		$( document ).UixRenderNumberInput(); //Render Number Input
		
		
		/* 
		 ---------------------------
		 Click Event of Submit Button
		 ---------------------------
		 */ 
		//Search Submit Event in WordPress
		$( '.uix-search-box__submit' ).off( 'click' ).on( 'click', function() {
			$( this ).closest( 'form' ).submit();
		});
		
		

		
    };

    module.components.documentReady.push( module.FORM.documentReady );
	

	return class FORM {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


