
/*
 * Shows the next form.
 *
 * @param  {Element} selector        - Each target forms selector.
 * @param  {Element} formTarget      - Wrapper of target forms selector.
 * @param  {String} indicator       - Indicator of timeline.
 * @param  {Number} index           - Default index for initialization.
 * 									  0 => step one, 
 * 									  1 => step two
 * 									  2 => step three
 * 									  3 => step four
 * 									  4 => step five
 * 									  ...
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixFormProgressToNext = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			selector         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			formTarget       : $( '.uix-form-progress__target' ),
			indicator        : '.uix-form-progress .uix-form-progress__indicator',
			index            : 0
        }, options );
 
        this.each( function() {
			
			const $this          = $( this );
			const  transitionEnd    = 'webkitTransitionEnd transitionend',
				   $sections        = settings.selector,
				   $formTarget      = settings.formTarget,	
				   $indicator       = $( settings.indicator ),
				   allStep          = $indicator.length,
				   stepPerValue     = 100/( allStep - 1 );
            
            
			let value = 0, tarIndex, curIndex;
			
			
			if ( $indicator.length == 0 ) return false;


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
			let dur = $formTarget.data( 'anime-speed' );
			if ( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}

			const durString  = dur.toString().toLowerCase(),
				  isMS       = durString.indexOf( 'ms' ) >= 0,
				  numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
				  animeSpeed = isMS ? numberNum : numberNum * 1000;



			const currentFormStep  = parseInt($sections.eq( tarIndex ).attr( 'data-step' ) ) || false,
				  $nextForm        = $formTarget.find( '.uix-form-progress__target__step[data-step="' + (currentFormStep + 1) + '"]');
            
            let currentFormIndex = $nextForm.attr( 'data-step' ) - 1;


			if ( isNaN( currentFormIndex ) ) currentFormIndex = 0;

			// Activate other unused modules
			if ( currentFormIndex > 0 ) {
				for ( let i = 0; i < curIndex; i++ ) {
					$sections.eq( i ).addClass( 'leaving' );
					$indicator.eq( i ).addClass( 'is-active' );
				}
				$indicator.eq( curIndex ).addClass( 'is-active' );
				
			}



			// Hide current form fields
			$sections.eq( tarIndex ).addClass( 'leaving' );
			setTimeout(function() {
				$indicator.eq( currentFormIndex ).addClass( 'is-active' );
			}, animeSpeed );


			// Show next form fields
			$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
				$nextForm.removeClass( 'coming waiting' );
			});
			
			// Active next form fields
			$sections.removeClass( 'is-active' );
			$sections.eq( currentFormIndex ).addClass( 'is-active' );

			// Increment value (based on 4 steps 0 - 100)
			value += stepPerValue;

			//console.log( currentFormIndex );



			//Initialize pointer and form location data
			if ( currentFormIndex == 0 ) {

				//Avoid initialization to always cover other same events
				$( 'body' ).addClass( 'form-progress-initok' );


				//so something
				$indicator.removeClass( 'is-active' );
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
			const currentContentH  = $formTarget.find( '.uix-form-progress__target__step:eq('+currentFormIndex+') > .uix-form-progress__content' ).height() + 100;
			$formTarget.css( 'height', currentContentH + 'px' );

			const curText = $( '.uix-form-progress .uix-form-progress__indicator:eq('+currentFormIndex+') > span' ).html();
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
				$( '.uix-form-progress' ).find( '.uix-form-progress__indicator.is-active' ).next( '.uix-form-progress__indicator' ).addClass( 'is-active' );
			}

			// Set progress bar value
			$( '.uix-form-progress .uix-form-progress__line span' ).css( 'width', value + '%' );


			return false;
			
			
		});
 
    };
 
}( jQuery ));
