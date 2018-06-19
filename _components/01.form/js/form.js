
/* 
 *************************************
 * <!-- Form -->
 *************************************
 */
/*
    Note:
	
	If you use the "change" event to asynchronously change a custom control of select, radio or checkbox, 
	you need add a callback function that initializes the style:
	
	$( document ).customSelectInit();
	$( document ).customRadioCheckboxInit();
	
*/

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FORM               = APP.FORM || {};
	APP.FORM.version       = '0.0.1';
    APP.FORM.documentReady = function( $ ) {

		/* 
		 ---------------------------
		 Callbacks for special forms (supports asynchronous)
		 ---------------------------
		 */ 
		// Add this code to initialize the style when calling 
		// the form externally with other scripts
		$( document ).customSpecialFormsInit();
		
		/* 
		 ---------------------------
		 Disabled Status
		 ---------------------------
		 */ 	
		
		$( 'input.disable' ).each( function(){
			$( this ).prop('disabled', true);
		});
		
		
		
		/* 
		 ---------------------------
		 Input File
		 ---------------------------
		 */ 
		$( '.controls-file-container' ).each( function()  {
			var fileInput  = $( this ).find( 'input[type="file"]' ),
				fileBtn    = $( this ).find( '.controls-file-trigger' ),
				filePath   = $( this ).next( '.controls-file-return' );
			
			fileBtn.on( 'click', function() {
				fileInput.focusin();
				
			});	
			
			fileInput.on( 'change', function() {
				filePath.text( $( this ).val() );
			});	
			
		});

		
		/* 
		 ---------------------------
		 Hover Effect
		 ---------------------------
		 */ 
		$( '.float-label' ).each( function(){
			
			var $this = $( this );
			

			// on focus add cladd active to label
			$this.on( 'focus', function() {
				$( this ).closest( 'div' ).find( 'label, .bar' ).addClass( 'active' );
			});
			
			
			//on blur check field and remove class if needed
			$this.on( 'blur change', function( e ) {
				if( $this.val() === '' || $this.val() === 'blank') {
					$( this ).closest( 'div' ).find( 'label, .bar' ).removeClass( 'active' );
				}	
				
			});
			
			// if exist cookie value
			if( $this.val() != '' && $this.val() != 'blank') { 
			   $( this ).closest( 'div' ).find( 'label, .bar' ).addClass( 'active' );
			}
			
			
		});
		
		
		//Search Submit Event in WordPress
		$( '.wp-search-submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		/* 
		 ---------------------------
		 Date Picker
		 ---------------------------
		 */ 
		if ( $.isFunction( $.fn.datepicker ) ) {

			$( '[data-picker]' ).each( function() {

				var $this            = $( this ),
					dateFormat       = $this.data( 'picker-format' ),
					monthNames       = $this.data( 'picker-month' ),
					monthNamesShort  = $this.data( 'picker-month-s' ),
					nextText         = $this.data( 'picker-next' ),
					prevText         = $this.data( 'picker-prev' ),
					dayNames         = $this.data( 'picker-day' ),
					dayNamesShort    = $this.data( 'picker-day-s' );
				
				
				
				// If there is no data-xxx, save current source to it
				if( typeof dateFormat === typeof undefined ) dateFormat = 'MM d, yy';
				if( typeof monthNames === typeof undefined ) monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				if( typeof monthNamesShort === typeof undefined ) monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				if( typeof nextText === typeof undefined ) nextText = '&#8594;';
				if( typeof prevText === typeof undefined ) prevText = '&#8592;';
				if( typeof dayNames === typeof undefined ) dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				if( typeof dayNamesShort === typeof undefined ) dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		
				$this.datepicker({
					"monthNames"      : monthNames,
					"monthNamesShort" : monthNamesShort,
					"nextText"        : nextText,
					"prevText"        : prevText,
					"dayNames"        : dayNames,
					"dayNamesShort"   : dayNamesShort,
					"dateFormat"      : dateFormat,
					"changeMonth"     : true,
					"changeYear"      : true,
					"yearRange"       : "1930:2092"
				});
				


			} );
			
			
		
			//Dynamic listening for the latest value
			$( document ).on( 'mouseleave', '[data-handler]', function() {
				$( '[data-picker]' ).each( function() {
					$( this ).closest( 'div' ).find( 'label, .bar' ).addClass( 'active' );
				});

			});	
			
			

		}
		
		/* 
		 ---------------------------
		 Input Validation 
		 ---------------------------
		 */ 
		//Using the jQuery Validation Plugin to check your form
		
		
		
    };

    APP.components.documentReady.push( APP.FORM.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Callbacks for special forms (supports asynchronous)
 *
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.customSpecialFormsInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({ }, options );
 
        this.each( function() {
			
			//Custom Select
			$( document ).customSelectInit();


			//Custom Radio, Toggle And Checkbox
			$( document ).customRadioCheckboxInit();


			//Create Line Effect on Click
			$( document ).customControlsLineEffInit();


			
		});
 
    };
 
}( jQuery ));



/*
 * Custom Select
 *
 * @param  {string} selector             - The current selector.
 * @param  {string} targetWrapper        - Wrapper of the selector.
 * @param  {string} trigger              - Trigger of the selector.
 * @param  {string} itemsWrapper         - Selector's options container.
 * @param  {object} item                 - Each option of the selector.
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.customSelectInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selector         : '.custom-select',
			targetWrapper    : '.custom-select-wrapper',
			trigger          : '.custom-select-trigger',	
			itemsWrapper     : '.custom-options',
			item             : '.custom-option'
        }, options );
 
        this.each( function() {
			
		
			$( settings.selector ).not( '.new' ).each( function() {

				var $this     = $( this ),
					classes   = $this.attr( 'class' ),
					id        = $this.attr( 'id' ),
					name      = $this.attr( 'name' ),
					template  = '',
					labelText = $this.find( '> span' ).html(),
					dataExist = $this.data( 'exist' );

				

				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {

					template  = '<div class="' + classes + ' new">';
					template += '<span class="custom-select-trigger">' + $this.find( 'select' ).attr( 'placeholder' ) + '</span><span class="bar"></span>';
					template += '<div class="custom-options">';

					$this.find( 'select option' ).each( function( index ) {

						var selected = '';

						if ( $( this ).is( ':selected' ) ) {
							selected = 'active';
						}

						template += '<span class="custom-option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
					});
					template += '</div></div>';

					if ( typeof labelText != typeof undefined && labelText != '' ) {
						template += '<span class="custom-select-label">' + labelText + '</span>';
					}


					$this.wrap('<div class="custom-select-wrapper"></div>');
					$this.hide();
					$this.after( template );	


					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );
				}


			});

			//Show/Hide Selector
			$( document ).on( 'click', settings.trigger, function( e ) {
				e.preventDefault();

				var $selectWrapper    = $( this ).closest( settings.targetWrapper ),
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.new' );

				$selectCurWrapper.addClass( 'opened' );

			});

			$( document.body ).on( 'click touchstart', function( e ) {
				$( settings.selector + '.new' ).removeClass( 'opened' );
			});		




			//Set the default selector text
			$( settings.selector + '.new' ).each( function( index ) {
				$( this ).find( settings.trigger ).text( $( this ).find( settings.item + '.active' ).html() );
			});


			//Change Event Here
			//Prevents the triggering of multiple change events
			$( document ).off( 'click.curCustomSelectItem' );
			$( document ).on( 'click.curCustomSelectItem', settings.item, function( e ) {
				e.preventDefault();

				var $selectWrapper    = $( this ).closest( settings.targetWrapper ),
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.new' ),
					curVal            = $( this ).data( 'value' );

				//Close the selector
				$selectCurWrapper.removeClass( 'opened' );

				//Set the selector text
				$selectCurWrapper.find( settings.trigger ).text( $( this ).html() );

				//Activate this option
				$selectCurWrapper.find( settings.item ).removeClass( 'active' );
				$( this ).addClass( 'active' );

				//Set select option 'selected', by value
				$selectWrapper.find( 'select' ).val( curVal );
				$selectWrapper.find( 'select option' ).removeAttr( 'selected' );
				$selectWrapper.find( 'select option[value="'+curVal+'"]' ).attr( 'selected', 'selected' ).change();

			});



			//Synchronize to the original select change event
			$( settings.selector ).not( '.new' ).each( function() {

				var $this       = $( this ).find( 'select' ),
					$cusSelect  = $this.closest( settings.targetWrapper ).find( settings.selector + '.new' ),
					newOptions  = '';


				$this.closest( settings.targetWrapper ).find( 'select option' ).each( function( index ) {

					var selected = '';

					if ( $( this ).is( ':selected' ) ) {
						selected = 'active';
					}

					newOptions += '<span class="custom-option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
				});


				$cusSelect.find( settings.itemsWrapper ).html( '<div>' + newOptions + '</div>' );


				//Set the default selector text
				$cusSelect.each( function( index ) {
					$( this ).find( settings.trigger ).text( $( this ).find( settings.item + '.active' ).html() );
				});

			});

			
			
		});
 
    };
 
}( jQuery ));



/*
 * Custom Radio, Checkbox and Toggle 
 *
 * @param  {string} radioWrapper             - Wrapper of the radio.
 * @param  {string} toggle                   - Toggle of the checkbox.
 * @param  {string} checkboxWrapper          - Wrapper of the checkbox.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customRadioCheckboxInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			radioWrapper    : '.custom-radio',
			toggle          : '.custom-toggle',
			checkboxWrapper : '.custom-checkbox'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customRadio        = settings.radioWrapper,
				customToggle       = settings.toggle,
				customCheckbox     = settings.checkboxWrapper;


			$( customRadio ).find( 'input[type="radio"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="custom-radio-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			$( customToggle ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="custom-toggle-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			$( customCheckbox ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="custom-checkbox-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			
			
		});
 
    };
 
}( jQuery ));


		


/*
 * Create Line Effect on Click
 *
 * @param  {string} controls                 - Wrapper of controls.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customControlsLineEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.controls.line-eff'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customControls     = settings.controls;


			$( customControls ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="bar"></span>' ).insertAfter( $( this ).find( 'label' ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			
			
			
		});
 
    };
 
}( jQuery ));
