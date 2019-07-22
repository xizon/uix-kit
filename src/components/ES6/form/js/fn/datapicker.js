
/*
 * Render Date Picker
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderDatePicker = function( options ) {
 
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
						$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'is-active' );
					});

				});	



			}// function datetimepicker is exist


			
		});
 
    };
 
}( jQuery ));
