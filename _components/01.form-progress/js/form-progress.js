
/*! 
 *************************************
 * Form Progress
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		

		var $progressBar   = $( '.custom-form-progress progress' ),
			$formTarget    = $( '.custom-form-progress-target' ),
			$indicator     = $( '.custom-form-progress .indicator' ),
			formAreaH      = $formTarget.height(),
			allStep        = $indicator.length,
			stepPerValue   = 100/( allStep - 1 ),
			value          = 0,
			transitionEnd  = 'webkitTransitionEnd transitionend';
		
		
		
		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		
		//Gets the party started.
		formReset();

		// Show next form on continue click
		$( '.custom-form-progress-target .go-step' ).on( 'click', function( e ) {
			e.preventDefault();
			var $currentForm = $( this ).parents( '.form-step' );
			showNextForm( $currentForm );
		});

		// Reset form on reset button click
		$( '.custom-form-progress-target .go-reset' ).on( 'click', function( e ) {
			e.preventDefault();
			formReset();
		});
		
		
		/*
		 * Set progress bar to the next value
		 *
		 * @param  {number} val             - The target value.
		 * @return {void}                   - The constructor.
		 */
		function formProgressReset( val ) {
			$( '.custom-form-progress .line span' ).css( 'width', val + '%' );
			
		}
		
		
		/*
		 * Resets the form back to the default state.
		 *
		 * @return {void}                   - The constructor.
		 */
		function formReset() {
			value = 0;
			// Set progress bar value
			formProgressReset( value );
			
			
			//Initialize pointer and form location data
			$indicator.removeClass( 'active' );
			$indicator.each( function( index )  {
				$( this ).css( 'left', index*stepPerValue + '%' );
				$formTarget.find( '.form-step:eq('+index+')' ).attr( 'data-step', index+1 );
			});
			
			setTimeout(function() {
				$formTarget.addClass( 'show' );
			}, animeSpeed );
			
			
			$formTarget.find( '.form-step' )
			                                .removeClass( 'left leaving' )
											.css( {
												'position'   : 'absolute',
				                                'height'     : formAreaH + 'px'
											} )
											.not( ':eq(0)' )
											.addClass( 'waiting' );
			
			$indicator.first().addClass( 'active' );
	

			return false;
		}



	
		/*
		 * Shows the next form.
		 *
		 * @param  {object} currentForm    - Node - The current form.
		 * @return {void}                  - The constructor.
		 */
		
		function showNextForm( currentForm ) {
			var currentFormStep  = parseInt(currentForm.attr( 'data-step' ) ) || false,
				$nextForm        = $formTarget.find( '.form-step[data-step="' + (currentFormStep + 1) + '"]'),
				currentFormIndex = $nextForm.attr( 'data-step' ) - 1;

			// Hide current form fields
			currentForm.addClass( 'leaving' );
			setTimeout(function() {
				$indicator.eq( currentFormIndex ).addClass( 'active' );
			}, animeSpeed );


			// Show next form fields
			$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
				$nextForm.removeClass( 'coming waiting' );
			});

			// Increment value (based on 4 steps 0 - 100)
			value += stepPerValue;

			// Reset if we've reached the end
			if (value >= 100) {
				$formTarget.find( '.form-step' )
				                               .addClass( 'leaving' )
					                           .last()
					                           .removeClass( 'coming waiting leaving' );
			} else {
				$( '.custom-form-progress' ).find( 'indicator.active' ).next( '.indicator' ).addClass( 'active' );
			}

			// Set progress bar value
			formProgressReset( value );


			return false;
		}
		
		
		
	};
		
      
    theme.formProgress = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

