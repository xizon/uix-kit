
/*! 
 *************************************
 * Form Progress
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		

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
		$( document ).on( 'click', '.custom-form-progress-target .go-step:not(.disable)', function( e ) {
			e.preventDefault();
			var $currentForm = $( this ).parents( '.form-step' );
			$.formProgressNext({ 
				'selector'   : $( '.custom-form-progress-target .form-step' ),
				'formTarget' : $formTarget,
				'indicator'  : '.custom-form-progress .indicator',
				'index'      : $currentForm.index() + 1
			});
			
		});

		// Reset form on reset button click
		$( document ).on( 'click', '.custom-form-progress-target .go-reset', function( e ) {
			e.preventDefault();
			formReset();
		});
		

		/*
		 * Resets the form back to the default state.
		 *
		 * @return {void}                   - The constructor.
		 */
		function formReset() {
			
			$.formProgressNext({ 
				'selector'         : $( '.custom-form-progress-target .form-step' ),
				'formTarget'       : $( '.custom-form-progress-target' ),
				'indicator'        : '.custom-form-progress .indicator',
				'index'            : 0 // 0 -> step 2,1 -> step 2, 2 -> step 3, 3 -> step 4, 4 -> step 5 
			});
		
			
		}
		
		


	};
		
      
    theme.formProgress = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * Associated Functions
 *************************************
 */
/*
 * Shows the next form.
 *
 * @param  {object} currentForm    - Node - The current form.
 * @return {void}                  - The constructor.
 */
$.extend({ 
	formProgressNext:function ( options ) { 

		var settings = $.extend( {
			'selector'         : $( '.custom-form-progress-target .form-step' ),
			'formTarget'       : $( '.custom-form-progress-target' ),
			'indicator'        : '.custom-form-progress .indicator',
			'index'            : 0
			
		}
		, options );

		var transitionEnd    = 'webkitTransitionEnd transitionend',
			currentForm      = settings.selector,
			$formTarget      = settings.formTarget,	
			$indicator       = $( settings.indicator ),
			allStep          = $indicator.length,
			stepPerValue     = 100/( allStep - 1 ),
			value            = 0,
			tarIndex, curIndex;

		
		//Returns current index
		if ( settings.index > allStep - 1 ) {
			curIndex = allStep - 1;
		} else {
			curIndex = settings.index;
		}
		
		
		tarIndex = curIndex - 1;
		
		
		// Returns current index
		if ( tarIndex > ( allStep - 2 ) ) {
			value = stepPerValue * (allStep - 2);
			curIndex = allStep - 2;
		} else {
			curIndex = tarIndex;
			
		}
		
		
		// Increment value (based on 4 steps 0 - 100)
		value = stepPerValue * curIndex;

		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		

		var currentFormStep  = parseInt(currentForm.eq( tarIndex ).attr( 'data-step' ) ) || false,
			$nextForm        = $formTarget.find( '.form-step[data-step="' + (currentFormStep + 1) + '"]'),
			currentFormIndex = $nextForm.attr( 'data-step' ) - 1;
		
		
		if ( isNaN( currentFormIndex ) ) currentFormIndex = 0;

		// Activate other unused modules
		if ( currentFormIndex > 0 ) {
			for ( var i = 0; i < curIndex; i++ ) {
				currentForm.eq( i ).addClass( 'leaving' );
				$indicator.eq( i ).addClass( 'active' );
			}
			$indicator.eq( curIndex ).addClass( 'active' );
	
		}

		
		
		// Hide current form fields
		currentForm.eq( tarIndex ).addClass( 'leaving' );
		setTimeout(function() {
			$indicator.eq( currentFormIndex ).addClass( 'active' );
		}, animeSpeed );


		// Show next form fields
		$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
			$nextForm.removeClass( 'coming waiting' );
		});

		// Increment value (based on 4 steps 0 - 100)
		value += stepPerValue;

		//console.log( currentFormIndex );
		
	
		
		//Initialize pointer and form location data
		if ( currentFormIndex == 0 ) {
			
			//Avoid initialization to always cover other same events
			$( 'body' ).addClass( 'form-progress-initok' );
			
			
			//so something
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
												'position'   : 'absolute'
											} )
											.not( ':eq(0)' )
											.addClass( 'waiting' );
			
	
		}


		//Set wrapper height
		var currentContentH  = $formTarget.find( '.form-step:eq('+currentFormIndex+') > .content' ).height() + 100;
		$formTarget.css( 'height', currentContentH + 'px' );

		var curText = $( '.custom-form-progress .indicator:eq('+currentFormIndex+') > span' ).html();
		$( '#app-form-progress-text' ).text( curText );

		//The current indicator class
		$indicator.removeClass( 'current' );
		$indicator.eq( currentFormIndex ).addClass( 'current' );

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
		$( '.custom-form-progress .line span' ).css( 'width', value + '%' );


		//Scroll Top
		$( 'html, body' ).stop().animate({
			scrollTop: 0
		}, { easing: 'easeOutQuart', duration: 500 } );	
		
		return false;

	} 
}); 

	

