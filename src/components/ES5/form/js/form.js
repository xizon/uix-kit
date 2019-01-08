
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
	APP.FORM.version       = '0.0.3';
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
		 Submit Event
		 ---------------------------
		 */ 
		//Search Submit Event in WordPress
		$( '.uix-search-box__submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		
		

		
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
 * @return {Void}
 */
( function ( $ ) {
    $.fn.customSpecialFormsInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({ }, options );
 
        this.each( function() {
			
			/* 
			 ---------------------------
			 Custom Select
			 ---------------------------
			 */ 	
			$( document ).customSelectInit();


			/* 
			 ---------------------------
			 Custom Radio, Toggle And Checkbox
			 ---------------------------
			 */ 		
			$( document ).customRadioCheckboxInit();


			/* 
			 ---------------------------
			 Create Line Effect on Click
			 ---------------------------
			 */ 			
			$( document ).customControlsLineEffInit();
			
			/* 
			 ---------------------------
			 Multiple Selector
			 ---------------------------
			 */ 
			//Control Status
			var multiSel = '.uix-controls__multi-sel > span';
			
			$( multiSel ).each( function()  {
				
				var targetID = '#' + $( this ).parent().attr( "data-targetid" );
			
				if ( $( targetID ).val().indexOf( $( this ).data( 'value' ) ) >= 0 ) {
					$( this ).addClass( 'active' );
				} else {
					$( this ).removeClass( 'active' );
				}	
			
				
			});
			
			
			$( document ).on( 'click', multiSel, function( e ) {
				e.preventDefault();

				var $selector     = $( this ).parent(),
					$option       = $( this ),
					targetID      = '#' + $selector.data( "targetid" ),
					curVal        = $option.data( 'value' ),
					tarVal        = $( targetID ).val() + ',',
					resVal        = '';

				$option.toggleClass( 'active' );

				if ( tarVal.indexOf( curVal + ',' ) < 0 ) {
					resVal = tarVal + curVal + ',';
				} else {
					resVal = tarVal.replace( curVal + ',', '' );
				}

				resVal = resVal
								.replace(/,\s*$/, '' )
								.replace(/^,/, '' );

				$( targetID ).val( resVal );


				//Dynamic listening for the latest value
				$( targetID ).focus().blur();

			} );


			/* 
			 ---------------------------
			 Single Selector
			 ---------------------------
			 */ 
			//Control Status
			var singleSel = '.uix-controls__single-sel > span';
			
			$( singleSel ).each( function()  {
				
				var targetID = '#' + $( this ).parent().attr( "data-targetid" );
			
				if ( $( targetID ).val() == $( this ).data( 'value' ) ) {
					$( this ).addClass( 'active' );
				} else {
					$( this ).removeClass( 'active' );
				}	
			
				
			});
					
			
			$( document ).on( 'click', singleSel, function( e ) {
				e.preventDefault();

				var $selector     = $( this ).parent(),
					$option       = $( this ),
					targetID      = '#' + $selector.data( "targetid" ),
					curVal        = $option.data( 'value' );


				//Radio Selector
				$selector.find( '> span' ).removeClass( 'active' );
				$( targetID ).val( curVal );
				$option.addClass( 'active' );



				//Dynamic listening for the latest value
				$( targetID ).focus().blur();

			} );



			/* 
			 ---------------------------
			 Disabled Status
			 ---------------------------
			 */ 	

			$( 'input.disabled' ).each( function(){
				$( this ).prop('disabled', true);
			});



			/* 
			 ---------------------------
			 Input File
			 ---------------------------
			 */ 
			$( '.uix-controls__file-container' ).each( function()  {
				var fileInput  = $( this ).find( 'input[type="file"]' ),
					fileBtn    = $( this ).find( '.uix-controls__file-trigger' ),
					filePath   = $( this ).next( '.uix-controls__file-return' );

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
					$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
				});


				//on blur check field and remove class if needed
				$this.on( 'blur change', function( e ) {
					if( $this.val() === '' || $this.val() === 'blank') {
						$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).removeClass( 'active' );
					}	

				});

				// if exist cookie value
				if( $this.val() != '' && $this.val() != 'blank') { 
				   $( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
				}


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
						nextText         = $this.data( 'picker-next' ),
						prevText         = $this.data( 'picker-prev' ),
						dayNames         = $this.data( 'picker-day' ),
						myminDate        = $this.data( 'picker-min-date' ),
						mymaxDate        = $this.data( 'picker-max-date' );



					// If there is no data-xxx, save current source to it
					if ( typeof dateFormat === typeof undefined ) dateFormat = 'MM d, yy';
					if ( typeof monthNames === typeof undefined ) monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					if ( typeof nextText === typeof undefined ) nextText = '&#8594;';
					if ( typeof prevText === typeof undefined ) prevText = '&#8592;';
					if ( typeof dayNames === typeof undefined ) dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
					if ( typeof myminDate === typeof undefined ) myminDate = -1825;
					if ( typeof mymaxDate === typeof undefined ) mymaxDate = 0;

					$this.datepicker({
						"monthNamesShort" : monthNames,
						"nextText"        : nextText,
						"prevText"        : prevText,
						"dayNamesShort"   : dayNames,
						"dateFormat"      : dateFormat,
						"changeMonth"     : true,
						"changeYear"      : true,
						"yearRange"       : "1930:2092",
						"minDate"         : myminDate,
						"maxDate"         : mymaxDate
					});



				} );



				//Dynamic listening for the latest value
				$( document ).on( 'mouseleave', '[data-handler]', function() {
					$( '[data-picker]' ).each( function() {
						$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
					});

				});	



			}



			
		});
 
    };
 
}( jQuery ));



/*
 * Custom Select
 *
 * @param  {String} selector             - The current selector.
 * @param  {String} targetWrapper        - Wrapper of the selector.
 * @param  {String} trigger              - Trigger of the selector.
 * @param  {String} itemsWrapper         - Selector's options container.
 * @param  {Object} item                 - Each option of the selector.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.customSelectInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selector         : '.uix-controls__select',
			targetWrapper    : '.uix-controls__select-wrapper',
			trigger          : '.uix-controls__select-trigger',	
			itemsWrapper     : '.uix-controls__select__option-container',
			item             : '.uix-controls__select__option'
        }, options );
 
        this.each( function() {
			
		
			$( settings.selector ).not( '.js-uix-new' ).each( function() {

				var $this     = $( this ),
					classes   = $this.attr( 'class' ),
					id        = $this.attr( 'id' ),
					name      = $this.attr( 'name' ),
					template  = '',
					labelText = $this.find( '> span' ).html(),
					dataExist = $this.data( 'exist' );

				

				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {

					template  = '<div class="' + classes + ' js-uix-new">';
					template += '<span class="uix-controls__select-trigger">' + $this.find( 'select' ).attr( 'placeholder' ) + '</span><span class="uix-controls__bar"></span>';
					template += '<div class="uix-controls__select__option-container">';

					$this.find( 'select option' ).each( function( index ) {

						var selected = '';

						if ( $( this ).is( ':selected' ) ) {
							selected = 'active';
						}

						template += '<span class="uix-controls__select__option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
					});
					template += '</div></div>';

					if ( typeof labelText != typeof undefined && labelText != '' ) {
						template += '<span class="uix-controls__select-label">' + labelText + '</span>';
					}


					$this.wrap('<div class="'+ settings.targetWrapper.replace( '.', '' )+' '+( $this.hasClass( 'uix-controls--line' ) ? 'uix-controls--line' : '' )+' '+( $this.hasClass( 'is-fullwidth' ) ? 'is-fullwidth' : '' )+' '+( $this.hasClass( 'disabled' ) ? 'disabled' : '' )+'"></div>');
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
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.js-uix-new' );

				$selectCurWrapper.addClass( 'is-opened' );

			});

			
			$( document.body ).on( 'click', function( e ) {
				
				if ( 
					e.target.className != '' && 
					typeof e.target.className != typeof undefined && 
					Object.prototype.toString.call( e.target.className ) != '[object SVGAnimatedString]' 
				) {
	
					if ( e.target.className.indexOf( 'uix-controls__select__option' ) < 0 ) {
						$( settings.selector + '.js-uix-new' ).removeClass( 'is-opened' );
					}	
				}

				
			});		



			//Set the default selector text
			$( settings.selector + '.js-uix-new' ).each( function( index ) {
				$( this ).find( settings.trigger ).text( $( this ).find( settings.item + '.active' ).html() );
			});


			//Change Event Here
			//Prevents the triggering of multiple change events
			$( document ).off( 'click.FORM_SELECT' );
			$( document ).on( 'click.FORM_SELECT', settings.item, function( e ) {
				e.preventDefault();

				var $selectWrapper    = $( this ).closest( settings.targetWrapper ),
					$selectCurWrapper = $selectWrapper.find( settings.selector + '.js-uix-new' ),
					curVal            = $( this ).data( 'value' );

				//Close the selector
				$selectCurWrapper.removeClass( 'is-opened' );

				//Set the selector text
				$selectCurWrapper.find( settings.trigger ).text( $( this ).html() ).addClass( 'active' );

				//Activate this option
				$selectCurWrapper.find( settings.item ).removeClass( 'active' );
				$( this ).addClass( 'active' );

				//Set select option 'selected', by value
				$selectWrapper.find( 'select' ).val( curVal );
				$selectWrapper.find( 'select option' ).removeAttr( 'selected' );
				$selectWrapper.find( 'select option[value="'+curVal+'"]' ).attr( 'selected', 'selected' ).change();

			});



			//Synchronize to the original select change event
			$( settings.selector ).not( '.js-uix-new' ).each( function() {

				var $this       = $( this ).find( 'select' ),
					$cusSelect  = $this.closest( settings.targetWrapper ).find( settings.selector + '.js-uix-new' ),
					newOptions  = '';


				$this.closest( settings.targetWrapper ).find( 'select option' ).each( function( index ) {

					var selected = '';

					if ( $( this ).is( ':selected' ) ) {
						selected = 'active';
					}

					newOptions += '<span class="uix-controls__select__option '+selected+'" data-value="' + $( this ).attr( 'value' ) + '">' + $( this ).html() + '</span>';
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
 * @param  {String} radioWrapper             - Wrapper of the radio.
 * @param  {String} toggle                   - Toggle of the checkbox.
 * @param  {String} checkboxWrapper          - Wrapper of the checkbox.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.customRadioCheckboxInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			radioWrapper    : '.uix-controls__radio',
			toggle          : '.uix-controls__toggle',
			checkboxWrapper : '.uix-controls__checkbox'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customRadio        = settings.radioWrapper,
				customToggle       = settings.toggle,
				customCheckbox     = settings.checkboxWrapper;


			$( customRadio ).find( 'input[type="radio"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__radio-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			$( customToggle ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__toggle-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			$( customCheckbox ).find( 'input[type="checkbox"]' ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__checkbox-trigger"></span>' ).insertAfter( $( this ) );

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
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.customControlsLineEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls.uix-controls--line'
        }, options );
 
        this.each( function() {
			
			var $this              = $( this ),
				customControls     = settings.controls;


			$( customControls ).each( function() {
				var dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__bar"></span>' ).insertAfter( $( this ).find( 'label' ) );
					
					
					//Multiple Selector or Single Selector
					if ( $( this ).hasClass( 'uix-controls__multi-sel' ) || $( this ).hasClass( 'uix-controls__single-sel' ) ) {
						
						$( this ).find( '> span' ).each( function()  {
							$( this ).prepend( '<span class="uix-controls__bar"></span>' );
						});
						
					}
					

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			
			
			
		});
 
    };
 
}( jQuery ));
