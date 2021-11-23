import { UixGUID } from '@uixkit/core/_global/js';

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
							$.when( $appendWrapper.length > 0 ).then( function() {
		
								//Initialize Form
								customSpecialFormsInit();
							});
							
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
