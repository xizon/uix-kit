import { UixGUID } from '@uixkit/core/_global/js';
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
import UixRenderNumberInput from '@uixkit/core/form/js/fn/number-input';


/*
 * Render Dynamic Fields
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderDynamicFields = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__dynamic-fields-container'
        }, options );
 
        this.each( function() {
		

			$( settings.controls ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {



					// Mouse events
					//------------------------------------------
					const $addButton       = $this.find( '.uix-controls__dynamic-fields__addbtn' ), //The add button
						  $appendWrapper   = $this.find( '.uix-controls__dynamic-fields__append' ), //The field wrapper ID or class 
						  loopCls          = '.uix-controls__dynamic-fields__tmpl__wrapper',
						  defaultItems     = $appendWrapper.find( loopCls ).length;
						  
					
					let	x                = ( defaultItems == 0 ) ? 1 : defaultItems+1,
						maxField         = $this.data( 'max-fields' ),
						fieldHTML        = '';
		
					//Maximum number of forms added
					if ( typeof maxField === typeof undefined ) {
						 maxField = 5;
					}
		
					//Add a field
					const addOne = function( fieldCode ) {
						
						
						//replace the index of field name
						fieldCode = fieldCode.replace(/___GUID___/gi, UixGUID.create() );
						
						//hide add button
						if ( x == maxField ) $addButton.hide();
						
						if ( x <= maxField ) { 
		
							
							$appendWrapper.append( fieldCode );

							//Initialize Form
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
							$( document ).UixRenderNumberInput(); //Render Number Input
							
							x++;
						}
		
					};
		
					// default item
					if ( defaultItems == 0 ) {
						addOne( $this.find( '.uix-controls__dynamic-fields__tmpl' ).html() );
					}
					
					
					//Prevent duplicate function assigned
					$addButton.off( 'click' ).off( 'click' ).on( 'click', function( e ) {
						e.preventDefault();
		
						
						//template init
						addOne( $this.find( '.uix-controls__dynamic-fields__tmpl' ).html() );
						
						//Remove per item
						//Prevent duplicate function assigned
						$this.find( '.uix-controls__dynamic-fields__removebtn' ).off( 'click' ).on( 'click', function( e ) {
							e.preventDefault();
		
		
							//display add button
							$addButton.show();
		
		
							//remove current item
							$( this ).closest( loopCls ).remove();
		
		
							x--;
						});	   
						
						return false;
					});
		


					//------------------------------------------

					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );

				}//endif actived			
		

			});
	
			
		});
 
    };
 
}( jQuery ));
