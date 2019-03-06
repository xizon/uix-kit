
/* 
 *************************************
 * <!-- Form -->
 *************************************
 */
/*
    Note:
	
	If you use the "change" event to asynchronously change a custom control of select, radio or checkbox, 
	you need add a callback function that initializes the style:
	

	$( document ).customSelectInit(); //Custom Select
	$( document ).customRadioCheckboxInit(); //Custom Radio, Toggle And Checkbox
	$( document ).customControlsLineEffInit(); //Create Line Effect on Click
	$( document ).disabledFieldsInit(); //Disabled Status
	$( document ).fileInit(); //Input File
	$( document ).fileDropInit(); //Upload field
	$( document ).fieldsHoverEffInit(); //Hover Effect
	$( document ).multiSelInit(); //Multiple Selector Status
	$( document ).singleSelInit(); //Single Selector Status
	$( document ).datePickerlInit(); //Date Picker

	
*/

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FORM               = APP.FORM || {};
	APP.FORM.version       = '0.0.7';
    APP.FORM.documentReady = function( $ ) {

		
		/*
		 * Callbacks for special forms (supports asynchronous)
		 * Add this code to initialize the style when calling 
		 * the form externally with other scripts
		 *
		 * @return {Void}
		 */
		var customSpecialFormsInit = function() {
			$( document ).customSelectInit(); //Custom Select
			$( document ).customRadioCheckboxInit(); //Custom Radio, Toggle And Checkbox
			$( document ).customControlsLineEffInit(); //Create Line Effect on Click
			$( document ).disabledFieldsInit(); //Disabled Status
			$( document ).fileInit(); //Input File
			$( document ).fileDropInit(); //Upload field
			$( document ).fieldsHoverEffInit(); //Hover Effect
			$( document ).multiSelInit(); //Multiple Selector Status
			$( document ).singleSelInit(); //Single Selector Status
			$( document ).datePickerlInit(); //Date Picker	
		};
		
		
	
		customSpecialFormsInit();

		
		
		/* 
		 ---------------------------
		 Click Event of Submit Button
		 ---------------------------
		 */ 
		//Search Submit Event in WordPress
		$( '.uix-search-box__submit' ).on( 'click', function() {
			$( this ).closest( 'form' ).submit();
		});
		
		
		/* 
		 ---------------------------
		 Click Event of add / remove input field dynamically
		 ---------------------------
		 */ 
		$( '.uix-controls__dynamic-fields-container' ).each(function(){


			var $this            = $( this ),
				$addButton       = $this.find( '.uix-controls__dynamic-fields__addbtn' ), //The add button
				removeButton     = '.uix-controls__dynamic-fields__removebtn', //The remove button selector ID or class
				$appendWrapper   = $this.find( '.uix-controls__dynamic-fields__append' ), //The field wrapper ID or class 
				x                = 1,
				maxField         = $this.data( 'max-fields' ),
				fieldHTML        = '';

			//Maximum number of forms added
			if ( typeof maxField === typeof undefined ) {
				 maxField = 5;
			}

			//Add a field
			var addOne = function( fieldCode ) {
				
				
				//replace the index of field name
				fieldCode = fieldCode.replace(/\{index\}/gi, x );
				
				//hide add button
				if ( x == maxField ) $addButton.hide();
				
				if ( x <= maxField ) { 

					
					$appendWrapper.append( fieldCode );
					$.when( $appendWrapper.length > 0 ).then( function() {

						//Initialize Form
						customSpecialFormsInit();
					});
					
					x++;
				}

			};

			addOne( $this.find( '.uix-controls__dynamic-fields__tmpl' ).html() );


			//Prevent duplicate function assigned
			$addButton.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				addOne( $this.find( '.uix-controls__dynamic-fields__tmpl' ).html() );
				return false;
			});

			//Remove per item

			//Prevent duplicate function assigned
			$( removeButton ).off( 'click' );
			$( document ).on( 'click', removeButton, function( e ) {
				e.preventDefault();
				
					
				//display add button
				$addButton.show();


				var $li = $( this ).closest( '.uix-controls__dynamic-fields__tmpl__wrapper' );

				if ( $this.find( '.uix-controls__dynamic-fields .uix-controls__dynamic-fields__tmpl__wrapper' ).length == 1 ) {
					$li.find( 'input, textarea' ).val( '' );
					$li.hide();
				} else {
					$li.remove();
				}


				x--;
			});	



		} );	
		
		
		
		/* 
		 ---------------------------
		 Click Event of Custom Input Number 
		 ---------------------------
		 */ 	
		$( document ).on( 'click', '.uix-controls__number__btn--add', function( e ) {

			var $numberInput = $( this ).closest( '.uix-controls__number' ).find( 'input[type="number"]' ),
				numberInputVal = parseInt( $numberInput.val() );

			if ( e.shiftKey ) {
				numberInputVal += 10;
			} else {
				numberInputVal++;
			}
			$numberInput.val( numberInputVal );
		});

		$( document ).on( 'click', '.uix-controls__number__btn--remove', function( e ) {

			var $numberInput = $( this ).closest( '.uix-controls__number' ).find( 'input[type="number"]' ),
				numberInputVal = parseInt( $numberInput.val() );


			if ( numberInputVal > 11 && e.shiftKey ) {
				numberInputVal -= 10;
			} else if (numberInputVal > 1) {
				numberInputVal--;
			}
			$numberInput.val( numberInputVal );
		});

			
		

		/* 
		 ---------------------------
		 Click Event of Multiple Selector
		 ---------------------------
		 */ 
		var multiSel     = '.uix-controls__multi-sel',
			multiSelItem = multiSel + ' > span';

		$( document ).on( 'click', multiSelItem, function( e ) {
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
		 Click Event of Single Selector
		 ---------------------------
		 */ 
		var singleSel     = '.uix-controls__single-sel',
			singleSelItem = singleSel + ' > span';


		/*
		 * Initialize single switch
		 *
		 * @param  {Object} obj                 - Radio controls. 
		 * @return {Void}
		 */
		var hideAllSingleSelItems = function( obj ) {
			obj.each( function( index )  {

				var $sel                = $( this ),
					defaultValue        = $( '#' + $sel.attr( "data-targetid" ) ).val(),
					deffaultSwitchIndex = 0;

				//get default selected switch index
				$sel.find( '> span' ).each( function( index )  {

					if ( defaultValue == $( this ).data( 'value' ) ) {
						deffaultSwitchIndex = index;
					}


				});


				if ( typeof $sel.data( 'switchids' ) != typeof undefined && $sel.data( 'switchids' ) != '' ) {
					var _switchIDsArr = $sel.data( 'switchids' ).split( ',' );
					_switchIDsArr.forEach( function( element, index ) {

						if ( deffaultSwitchIndex != index ) {
							$( '#' + element ).hide();
						} else {
							$( '#' + element ).show();
						}


					});



				}

			});

		};

		hideAllSingleSelItems( $( singleSel ) );


		$( document ).on( 'click', singleSelItem, function( e ) {
			e.preventDefault();

			var $selector     = $( this ).parent(),
				$option       = $( this ),
				targetID      = '#' + $selector.data( "targetid" ),
				switchID      = '#' + $option.data( "switchid" ),
				curVal        = $option.data( 'value' );


			//Radio Selector
			$selector.find( '> span' ).removeClass( 'active' );
			$( targetID ).val( curVal );
			$option.addClass( 'active' );


			//Switch some options
			if ( typeof $option.data( "switchid" ) != typeof undefined ) {
				 hideAllSingleSelItems( $selector );
				 $( switchID ).show();
			}



			//Dynamic listening for the latest value
			$( targetID ).focus().blur();

		} );

		
    };

    APP.components.documentReady.push( APP.FORM.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *********************************************************************************************
 ////////////////////////////////////////
 * Associated Functions
 ////////////////////////////////////////
 *********************************************************************************************
 */

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
					
					//Custom Input Number
					if ( $( this ).hasClass( 'uix-controls__number' ) ) {
						$( this ).prepend( '<span class="uix-controls__bar"></span>' );
					}
					
			

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			
			
			
		});
 
    };
 
}( jQuery ));




/*
 * Disabled Fields Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.disabledFieldsInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : 'input.disabled'
        }, options );
 
        this.each( function() {
		
			$( settings.controls ).prop( 'disabled', true );
			
		});
 
    };
 
}( jQuery ));




/*
 * Input File
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.fileInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__file-container'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				var $fileInput  = $( this ).find( 'input[type="file"]' ),
					$fileBtn    = $( this ).find( '.uix-controls__file-trigger' ),
					$filePath   = $( this ).next( '.uix-controls__file-return' );

				$fileBtn.on( 'click', function() {
					$fileInput.focusin();

				});	

				$fileInput.on( 'change', function() {
					$filePath.text( $( this ).val() );
				});	

			});

			
		});
 
    };
 
}( jQuery ));



/*
 * Upload field
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.fileDropInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__file-field-container'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				var $dropZone  = $( this ).find( 'input[type="file"]' );

				$( document ).on( 'dragover', function(e) {
					var timeout = window.dropZoneTimeout;
					if (!timeout) {
						$dropZone.addClass( 'in' );
					} else {
						clearTimeout(timeout);
					}
					var found = false,
					node = e.target;
					do {
						if (node === $dropZone[0]) {
							found = true;
							break;
						}
						node = node.parentNode;
					} while ( node != null );
					if (found) {
						$dropZone.addClass( 'hover' );
					} else {
						$dropZone.removeClass( 'hover' );
					}
					window.dropZoneTimeout = setTimeout(function() {
						window.dropZoneTimeout = null;
						$dropZone.removeClass( 'in hover' );
					}, 100 );
				});

				$dropZone.on( 'change', function( e ) {
					var input = $( this )[0];
					if ( input.files && input.files[0] ) {
						var reader = new FileReader();
						reader.onload = function( e ) {
							var imgData = e.target.result;
							var imgName = input.files[0].name;
							input.setAttribute( 'data-title', imgName );
							//console.log(e.target.result);
						}
						reader.readAsDataURL( input.files[0] );


					}

				});


			});

			
		});
 
    };
 
}( jQuery ));




/*
 * Hover Effect
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.fieldsHoverEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.js-uix-float-label'
        }, options );
 
        this.each( function() {
		
			$( settings.controls ).each( function(){

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

			
		});
 
    };
 
}( jQuery ));




/*
 * Multiple Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.multiSelInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__multi-sel'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				$( this ).find( '> span' ).each( function()  {

					var targetID = '#' + $( this ).parent().attr( "data-targetid" );

					if ( $( targetID ).val().indexOf( $( this ).data( 'value' ) ) >= 0 ) {
						$( this ).addClass( 'active' );
					} else {
						$( this ).removeClass( 'active' );
					}	



				});
			});
			
		});
 
    };
 
}( jQuery ));



/*
 * Multiple Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.multiSelInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__multi-sel'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				$( this ).find( '> span' ).each( function()  {

					var targetID = '#' + $( this ).parent().attr( "data-targetid" );

					if ( $( targetID ).val().indexOf( $( this ).data( 'value' ) ) >= 0 ) {
						$( this ).addClass( 'active' );
					} else {
						$( this ).removeClass( 'active' );
					}	



				});
			});
			
		});
 
    };
 
}( jQuery ));


/*
 * Single Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.singleSelInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '.uix-controls__single-sel'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				$( this ).find( '> span' ).each( function()  {

					var targetID  = '#' + $( this ).parent().attr( "data-targetid" ),
						switchIDs = '';

					//add switch IDs
					$( this ).parent().find( '> span' ).each( function()  {
						if ( typeof $( this ).data( "switchid" ) != typeof undefined ) {
							switchIDs += $( this ).data( "switchid" ) + ',';
						}

					});

					$( this ).parent().attr( "data-switchids", switchIDs.replace(/,\s*$/, '' ) );


					//Set actived style from their values
					if ( $( targetID ).val() == $( this ).data( 'value' ) ) {
						$( this ).addClass( 'active' );
					} else {
						$( this ).removeClass( 'active' );
					}	


				});
			});

			
		});
 
    };
 
}( jQuery ));


/*
 * Date Picker
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    $.fn.datePickerlInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			controls    : '[data-picker]'
        }, options );
 
        this.each( function() {
		
		
			if ( $.isFunction( $.fn.datetimepicker ) ) {

				$( settings.controls ).each( function() {

					var $this            = $( this ),
						dateFormat       = $this.data( 'picker-format' ),
						timeEnable       = $this.data( 'picker-timepicker' ),
						lang             = $this.data( 'picker-lang' ),
						myminDate        = $this.data( 'picker-min-date' ),
						mymaxDate        = $this.data( 'picker-max-date' ),
						rtlEnable        = false;


					// If there is no data-xxx, save current source to it
					if ( typeof dateFormat === typeof undefined ) dateFormat = 'M d, Y';  //Y-m-d H:i:s
					if ( typeof timeEnable === typeof undefined ) timeEnable = false;
					if ( typeof lang === typeof undefined ) lang = 'en';
					if ( typeof myminDate === typeof undefined ) myminDate = false; //yesterday is minimum date(for today use 0 or -1970/01/01)
					if ( typeof mymaxDate === typeof undefined ) mymaxDate = false; //tomorrow is maximum date calendar, such as '+2050/01/01'
					if ( typeof rtlEnable === typeof undefined ) rtlEnable = false;

				    $.datetimepicker.setLocale( lang );

					//RTL 
					if ( $( 'body' ).hasClass( 'rtl' ) ) {
						rtlEnable = true;
					}
					
					//hide or display time selector
					if ( timeEnable ) {
					
						$( document ).on( 'mouseenter', 'td.xdsoft_date[data-date]', function() {
							if ( $( this ).hasClass( 'xdsoft_disabled' ) ) {
								$( this ).closest( '.xdsoft_datepicker' ).next( '.xdsoft_timepicker.active' ).hide();
							} else {
								$( this ).closest( '.xdsoft_datepicker' ).next( '.xdsoft_timepicker.active' ).show();
							}
							
						} );
						
					}

					$this.datetimepicker({
						rtl         : rtlEnable,
						timepicker  : timeEnable,
						format      : dateFormat,
						formatTime  : 'H:i',
						formatDate  : 'Y/m/d',
						minDate     : myminDate,
						maxDate     : mymaxDate
						
					});
				
					
					

				} );



				//Dynamic listening for the latest value
				$( document ).on( 'mouseleave', '[data-handler]', function() {
					$( '[data-picker]' ).each( function() {
						$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'active' );
					});

				});	



			}// function datetimepicker is exist


			
		});
 
    };
 
}( jQuery ));



