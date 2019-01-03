
/* 
 *************************************
 * <!-- Form Progress -->
 *************************************
 */
/*
    Note:
	
	If you want to initialize the indicator to a location when the page is first run,
	you need to call the following function:
	
	$( document ).formProgressNext({ 
		'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
		'formTarget'       : $( '.uix-form-progress__target' ),
		'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
		'index'            : 0 // 0 -> step 1, 1 -> step 2, 2 -> step 3, 3 -> step 4, 4 -> step 5 
	});
	
*/


APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.FORM_PROGRESS               = APP.FORM_PROGRESS || {};
	APP.FORM_PROGRESS.version       = '0.0.1';
    APP.FORM_PROGRESS.pageLoaded    = function() {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-form-progress-eff' ) ) return false;
		

		var $progressBar   = $( '.uix-form-progress progress' ),
			$formTarget    = $( '.uix-form-progress__target' ),
			$indicator     = $( '.uix-form-progress .uix-form-progress__indicator' ),
			formAreaH      = $formTarget.height(),
			allStep        = $indicator.length,
			stepPerValue   = 100/( allStep - 1 ),
			value          = 0,
			transitionEnd  = 'webkitTransitionEnd transitionend';
		

		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if ( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		
		//Gets the party started.
		formReset();
		
		//Display the target
		setTimeout( function() {
			$formTarget.addClass( 'active' );
		}, parseFloat( dur ) * 1000 );
		

		// Show next form on continue click
		$( document ).on( 'click', '.uix-form-progress__target .go-step:not(.disable)', function( e ) {
			e.preventDefault();
			var $sections = $( this ).parents( '.uix-form-progress__target__step' );
			$( document ).formProgressNext({ 
				'selector'   : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget' : $formTarget,
				'indicator'  : '.uix-form-progress .uix-form-progress__indicator',
				'index'      : $sections.index() + 1
			});
			
		});
		
		

		// Reset form on reset button click
		$( document ).on( 'click', '.uix-form-progress__target .go-reset', function( e ) {
			e.preventDefault();
			formReset();
		});
		

		/*
		 * Resets the form back to the default state.
		 *
		 * @return {Void}                   - The constructor.
		 */
		function formReset() {
			
			$( document ).formProgressNext({ 
				'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget'       : $( '.uix-form-progress__target' ),
				'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
				'index'            : 0 // 0 -> step 1, 1 -> step 2, 2 -> step 3, 3 -> step 4, 4 -> step 5 
			});
		
			
		}
			    
		
    };

    APP.components.pageLoaded.push( APP.FORM_PROGRESS.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );






/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Shows the next form.
 *
 * @param  {Object} selector        - Each target forms selector.
 * @param  {Object} formTarget      - Wrapper of target forms selector.
 * @param  {String} indicator       - Indicator of timeline.
 * @param  {Number} index           - Default index for initialization.
 * @return {Void}                   - The constructor.
 */
( function ( $ ) {
    $.fn.formProgressNext = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selector         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			formTarget       : $( '.uix-form-progress__target' ),
			indicator        : '.uix-form-progress .uix-form-progress__indicator',
			index            : 0
        }, options );
 
        this.each( function() {
			
			var $this            = $( this ),
				transitionEnd    = 'webkitTransitionEnd transitionend',
				$sections        = settings.selector,
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
			if ( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}

			var durString  = dur.toLowerCase(),
				isMS       = durString.indexOf( 'ms' ) >= 0,
				numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
				animeSpeed = isMS ? numberNum : numberNum * 1000;



			var currentFormStep  = parseInt($sections.eq( tarIndex ).attr( 'data-step' ) ) || false,
				$nextForm        = $formTarget.find( '.uix-form-progress__target__step[data-step="' + (currentFormStep + 1) + '"]'),
				currentFormIndex = $nextForm.attr( 'data-step' ) - 1;


			if ( isNaN( currentFormIndex ) ) currentFormIndex = 0;

			// Activate other unused modules
			if ( currentFormIndex > 0 ) {
				for ( var i = 0; i < curIndex; i++ ) {
					$sections.eq( i ).addClass( 'leaving' );
					$indicator.eq( i ).addClass( 'active' );
				}
				$indicator.eq( curIndex ).addClass( 'active' );
				
			}



			// Hide current form fields
			$sections.eq( tarIndex ).addClass( 'leaving' );
			setTimeout(function() {
				$indicator.eq( currentFormIndex ).addClass( 'active' );
			}, animeSpeed );


			// Show next form fields
			$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
				$nextForm.removeClass( 'coming waiting' );
			});
			
			// Active next form fields
			$sections.removeClass( 'active' );
			$sections.eq( currentFormIndex ).addClass( 'active' );

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
					$formTarget.find( '.uix-form-progress__target__step:eq('+index+')' ).attr( 'data-step', index+1 );
				});

				setTimeout(function() {
					$formTarget.addClass( 'js-uix-show' );
				}, animeSpeed );


				$formTarget.find( '.uix-form-progress__target__step' )
												.removeClass( 'left leaving' )
												.css( {
													'position'   : 'absolute'
												} )
												.not( ':eq(0)' )
												.addClass( 'waiting' );


			}


			//Set wrapper height
			var currentContentH  = $formTarget.find( '.uix-form-progress__target__step:eq('+currentFormIndex+') > .uix-form-progress__content' ).height() + 100;
			$formTarget.css( 'height', currentContentH + 'px' );

			var curText = $( '.uix-form-progress .uix-form-progress__indicator:eq('+currentFormIndex+') > span' ).html();
			$( '#app-form-progress-text' ).text( curText );

			//The current indicator class
			$indicator.removeClass( 'current' );
			$indicator.eq( currentFormIndex ).addClass( 'current' );

			// Reset if we've reached the end
			if (value >= 100) {
				$formTarget.find( '.uix-form-progress__target__step' )
											   .addClass( 'leaving' )
											   .last()
											   .removeClass( 'coming waiting leaving' );
			} else {
				$( '.uix-form-progress' ).find( '.uix-form-progress__indicator.active' ).next( '.uix-form-progress__indicator' ).addClass( 'active' );
			}

			// Set progress bar value
			$( '.uix-form-progress .uix-form-progress__line span' ).css( 'width', value + '%' );


			//Scroll Top
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y        : 0,
					autoKill : false
				},
				ease: Power2.easeOut
			});	
			
			

			return false;
			
			
		});
 
    };
 
}( jQuery ));

