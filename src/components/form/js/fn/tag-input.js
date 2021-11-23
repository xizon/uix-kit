
/*
 * Render Tag Input
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderTagInput = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__tags-wrapper'
        }, options );
 
        this.each( function() {
		
	
			$( settings.controls ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {


					// Initialize status
					//------------------------------------------
					const taginputTip = $this.data( 'placeholder' );
					const $tagInputUserArea = $( `<div><ul class="uix-controls__tags__list"></ul><div class="uix-controls__tags"><input type="text" autoComplete="off" placeholder="${taginputTip}" value=""></div></div>` );
		
					//init tag input
					$this.append( $tagInputUserArea );
	
					//
					let lastId = -1;
					const defaultTagsVal = [];
					const maxTags = typeof $this.data( 'max-tags' ) != typeof undefined ? $this.data( 'max-tags' ) : 10;
					const dVal = $this.find( '> input' ).attr('type','hidden').val();
		
		
					//get default value
					if ( dVal ) {
						dVal.trim().replace(/^\,|\,$/g, '').split(',').forEach( (item, index) => {
							defaultTagsVal.push({
								content: item,
								id: index
							});
						});
					}
		
					//
					// What the user has entered
					const defaultItems = dVal !== '' && dVal !== null ? defaultTagsVal : [];
		
					//init data
					$this.data({
						'data': defaultItems,
						'user-input': '',
						'already-in-items': false,
						'max': maxTags
					});
		
					
					const updateTagResult = function( el, data ) {
						let tagList = '';
						const resArr = [];
		
						data.forEach((listitem, index) => {
							resArr.push(listitem.content);
							tagList += `<li data-item="${listitem.id}">${listitem.content}</li>`
						});
		
						//update value
						el.find( '> input' ).val( resArr.join(',') );
						
						//create list
						el.find( '.uix-controls__tags__list' ).html( tagList );
					};
					updateTagResult($this, defaultItems);
					
		
					// Mouse events
					//------------------------------------------
					$( document ).off( 'click.FORM_TAG_INPUT_DELETE' ).on( 'click.FORM_TAG_INPUT_DELETE', settings.controls + ' .uix-controls__tags__list > li', function( e ) {
						const $obj = $( this ).closest( settings.controls );
						let currentItems = $obj.data( 'data' );
						const idToRemove = Number(e.target.dataset["item"]);
						const newArray = currentItems.filter((listitem) => { return listitem.id !== idToRemove });
						currentItems = newArray;
		
		
						//update data
						$obj.data({
							'data': currentItems
						});
		
						//
						updateTagResult($obj, currentItems);
		
					});	 
		
					$( document ).on( 'change input', settings.controls + ' .uix-controls__tags input', function( e ) {
						const $obj = $( this ).closest( settings.controls );
						let currentItems = $obj.data( 'data' );
						let _userInput = e.currentTarget.value;
						let _alreadyInItems = false;
		
						if (currentItems && currentItems.length > 0) {
							const alreadyIn = currentItems.some(function (obj) {
								return obj.content.toLowerCase() == _userInput.toLowerCase();
							});
							if (alreadyIn) {
								_alreadyInItems = true;
							} else {
								_alreadyInItems = false;
							}
				
						}
		
						//update data
						$obj.data({
							'user-input': e.currentTarget.value,
							'already-in-items': _alreadyInItems
						});
		
					});	 
		
					$( document ).on( 'keypress', settings.controls + ' .uix-controls__tags input', function( e ) {
						const $obj = $( this ).closest( settings.controls );
						let currentItems = $obj.data( 'data' );
						const userInput = $obj.data( 'user-input' );
						const alreadyInItems = $obj.data( 'already-in-items' );
		
						if( e.which == 13 ) {
							e.preventDefault();
		
							if (alreadyInItems) return false;
								
							//
							const newArray = currentItems;
							const currentcontent = userInput.trim();
							if (!currentcontent) {
								return;
							}
				
							//Limit the total number of tags added
							if ( $obj.data( 'max' )-1 < newArray.length ) {
								return;
							}
				
							newArray.push({
								content: currentcontent,
								id: ++lastId
							});
		
							currentItems = newArray;
		
							//update data
							$obj.data({
								'data': currentItems,
								'user-input': ''
							});
		
							//
							$( this ).val( '' );
							updateTagResult($obj, currentItems);
		
						}
					});	 
		
					$( document ).on( 'focus', settings.controls + ' .uix-controls__tags input', function( e ) {
						const $obj = $( this ).closest( settings.controls );
						$obj.addClass( 'is-active' );
					});	 
		
					$( document ).on( 'blur', settings.controls + ' .uix-controls__tags input', function( e ) {
						const $obj = $( this ).closest( settings.controls );
						$obj.removeClass( 'is-active' );
					});	 	
		


					//------------------------------------------

					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );

				}//endif actived			
		

			});
	

			
		});
 
    };
 
}( jQuery ));
