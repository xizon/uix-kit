
/* 
 *************************************
 * <!-- Posts List With Ajax -->
 *************************************
 */

/**
 * APP.POST_LIST_AJAX 
 * @global
 * @requires examples/assets/js/min/template7.min.js
 * @requires examples/assets/js/wp-jquery/masonry.min.js
 * @requires examples/assets/js/wp-jquery/imagesloaded.min.js
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.POST_LIST_AJAX               = APP.POST_LIST_AJAX || {};
	APP.POST_LIST_AJAX.version       = '0.0.8';
    APP.POST_LIST_AJAX.documentReady = function( $ ) {

		$( '[data-ajax-list-json]' ).each( function() {
			var $this            = $( this ),
				wrapperID        = 'refresh-all-waypoint-' + UIX_GUID.newGuid(),
			    curPage          = $this.data( 'ajax-list-page-now' ),
				perShow          = $this.data( 'ajax-list-page-per' ),
				totalPage        = $this.data( 'ajax-list-page-total' ),
				method           = $this.data( 'ajax-list-method' ),
				trigger          = $this.data( 'ajax-list-trigger' ),
				infinitescroll   = $this.data( 'ajax-list-infinitescroll' ),
				jsonFile         = $this.data( 'ajax-list-json' ),
				addition         = $this.data( 'ajax-list-addition' ),
				template7ID      = $this.data( 'ajax-list-temp-id' ),
				pushContainer    = $this.data( 'ajax-list-push-container-class' ),
				triggerActive    = $this.data( 'ajax-list-trigger-active-class' ),
				pageParmStr      = $this.data( 'ajax-list-page-parm-str' ),
				noneInfo         = $this.data( 'ajax-list-none-info' );
	
			
			

			$this.attr( 'id', wrapperID );
			
			

			if( typeof pageParmStr === typeof undefined ) {
				pageParmStr = {
					'totalPage'     : 'total',
					'currentPage'   : 'page',
					'displayPerPage': 'per'
				};
			}
			
			if( typeof curPage === typeof undefined ) {
				curPage = 1;
			}
			
			
			if( typeof perShow === typeof undefined ) {
				perShow = 8;
			}
			
			if( typeof totalPage === typeof undefined ) {
				totalPage = 3;
			}
			
			if( typeof totalPage != typeof undefined && totalPage == '-1' ) {
				totalPage = 9999;
			}
			
			
			if( typeof trigger === typeof undefined ) {
				trigger = '.uix-load-more';
			}
			
			if( typeof infinitescroll === typeof undefined ) {
				infinitescroll = false;
			}	
			
			if( typeof addition === typeof undefined ) {
				addition = true;
			}			
			
			
			if( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}		
			
			if( typeof template7ID === typeof undefined ) {
				template7ID = '';
			}	
			if( typeof triggerActive === typeof undefined ) {
				triggerActive = 'active';
			}		
			
			if( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			if( typeof noneInfo === typeof undefined ) {
				noneInfo = '{"none":"","error":""}';
			}
			
			
			
			triggerActive = triggerActive.replace( '.', '' );
			
			
			
			if( typeof pushContainer === typeof undefined ) {
				pushContainer = '.uix-ajax-items__container';
				
				if ( $this.find( pushContainer ).length == 0 ) {
					$( '#' + template7ID ).after( '<div class="uix-ajax-items__container"></div>' );
				}
				
			}		
			
			
			
			//Get all attributes of an element and push the new attributes like "data-*"
			var curAttrs        = $this.attr(),
				defaultPostData = '',
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-ajax-list-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-ajax-list-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		
			
			//Parse the JSON data
			if ( jsonFile != '' && template7ID != '' ) {
				
				
				if ( infinitescroll ) {
					/* 
					 ---------------------------
					 Infinite scroll
					 ---------------------------
					 */ 	
					var $button = $( trigger ),
						btnTop  = $button.offset().top;
					
					//Add default page number to the button
					$button.attr( 'data-cur-page', 1 );

					
					//Hide the next button 
					if ( totalPage == 1 ) {
						$button.addClass( 'is-hide' );	
					}
					
				
						
					$( window ).on( 'scroll touchmove', function() {
						
					
						
						var scrolled = $( window ).scrollTop();
						
						if ( scrolled >= parseFloat( $button.offset().top - $( window ).height()/2 - $button.outerHeight( true )*2 ) && !$button.hasClass( triggerActive ) ) {

								// Active this button
								$button.addClass( triggerActive );					    
							
								var curPage = $button.attr( 'data-cur-page' );
							
								//Add next page number to the button
								curPage = parseFloat( curPage ) + 1;
								$button.attr( 'data-cur-page', curPage );
							
							    //Avoid touching the same button multiple times
							    if ( curPage == totalPage + 1 ) return false;
							
								//Perform dynamic loading
								if ( customPostData != '' ) {
									defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
								} else {
									defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
								}


								ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );


							
						}
						
					});	
					
				} else {
					/* 
					 ---------------------------
					 Ajax with JSON data
					 ---------------------------
					 */
					
					var triggerStr = '';
					
					if ( trigger.indexOf( '[' ) >= 0 &&  trigger.indexOf( ']' ) >= 0 ) {
						triggerStr = JSON.parse( trigger.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g,'"') );
					} else {
						triggerStr = trigger;

					}

					//Whether there are two flip buttons "Previous" and "Next"
					if ( Object.prototype.toString.call( triggerStr ) =='[object Array]' ) {

						var prevTrigger = triggerStr[0].prev,
							nextTrigger = triggerStr[1].next;
						
						//Add default page number to the button
						$( nextTrigger ).parent().attr( 'data-cur-page', 1 );


						
						//--------------- Next Button ------------------
						//Hide the next button 
						if ( totalPage == 1 ) {
							$( nextTrigger ).addClass( 'is-hide' );	
						}

						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( nextTrigger ).on( 'click', function( e ) {

							e.preventDefault();

							var $button = $( this ),
								curPage = $button.parent().attr( 'data-cur-page' );
							
							//Add next page number to the button
							curPage = parseFloat( curPage ) + 1;
							$button.parent().attr( 'data-cur-page', curPage );
							
							//Init button status
							$( prevTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( triggerActive );
							$( prevTrigger ).removeClass( 'is-hide' );
							


							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );
							
							return false;


						});		
						
							
						
						//----------------- Previous Button ----------------
						//Hide the prev button 
						$( prevTrigger ).addClass( 'is-hide' );
						
						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( prevTrigger ).on( 'click', function( e ) {

							e.preventDefault();

							var $button = $( this ),
								curPage = $button.parent().attr( 'data-cur-page' );
				
							//Add next page number to the button
							curPage = parseFloat( curPage ) - 1;
							$button.parent().attr( 'data-cur-page', curPage );
							
							//Init button status
							$( prevTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( triggerActive );
							$( nextTrigger ).removeClass( 'is-hide' );
							


							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );

							
							return false;


						});						


					} else {
						
						
						//----------------- More Button ----------------
						//Add default page number to the button
						$( trigger ).attr( 'data-cur-page', 1 );

						//Hide the next button 
						if ( totalPage == 1 ) {
							$( trigger ).addClass( 'is-hide' );	

						}

						//Avoid using $( document ) to cause an asynchronous load without counting from 1
						$( trigger ).on( 'click.POST_LIST_AJAX', function( e ) {
							

							e.preventDefault();

							
							var $button = $( this ),
								curPage = $button.attr( 'data-cur-page' );

							//Add next page number to the button
							curPage = parseFloat( curPage ) + 1;
							$button.attr( 'data-cur-page', curPage );
							
						
							
							// Active this button
							$button.addClass( triggerActive );		


							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "'+pageParmStr.totalPage+'": '+totalPage+', "'+pageParmStr.displayPerPage+'": '+perShow+', "'+pageParmStr.currentPage+'": '+curPage+' }' );
							}

							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo );

							
							return false;


						});	
						
					}	
					
				
					
				}//end if
				
			}
			
		});
			
			
		/*
		 * Ajax with JSON data
		 *
		 * @param  {Object} ajaxWrapper     - The outermost container of list.
		 * @param  {Object} defaultPostData - Data to be sent to the server which is custom JSON fields.
		 * @param  {Object} trigger         - Trigger ajax loaded button object.
		 * @param  {Number} curPage         - The current page to load.
		 * @param  {Number} perShow         - The amount to load each time.
		 * @param  {Number} totalPage       - The total page to load.
		 * @param  {String} template7ID     - HTML template ID
		 * @param  {String} jsonFile        - JSON file path to docking data
		 * @param  {String} triggerActive   - The class name of trigger button actived.
		 * @param  {String} pushContainer   - This container is used to display the loaded dynamic data.
		 * @param  {String} method          - The type of request to make, which can be either "POST" or "GET".
		 * @param  {Boolean} addition       - Do or not append to the original content.
		 * @param  {String} noneInfo        - Returns information of ajax asynchronous callback when the content is empty.
		 * @return {Void}
		 */
		
		function ajaxLoadInit( ajaxWrapper, defaultPostData, trigger, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, addition, noneInfo ) {

			var $divRoot         = ajaxWrapper,
				template         = document.getElementById( template7ID ).innerHTML,
				compiledTemplate = Template7.compile( template ),
				$button          = $( trigger );

			
			
			
			//hide the button and callback the information
			var returnEmptyInfo = function() {
				$button.addClass( 'is-hide' );
				$divRoot.after( noneInfo.none );		
			};
			
			var returnDataError = function() {
				$button.addClass( 'is-hide' );
				$divRoot.after( noneInfo.error );	
			};
			
							
			
			$.ajax({
				url      : jsonFile, //Be careful about the format of the JSON file
				method   : method,
				data     : defaultPostData,
				dataType : 'json',
				success  : function (data) { 
					
					
					//If the data is empty
					if ( data && ( data == null || Object.prototype.toString.call( data.items )=='[object String]' ) ) {
						returnEmptyInfo();
					}
					
					
					//Check if a key exists inside a json object
					if ( data && data.hasOwnProperty( 'items' ) && Object.prototype.toString.call( data.items )=='[object Array]' ) {
						
						
						//Data overflow may occur when the total number of pages is not posted
						try {

							var thisData      = data,
								html          = compiledTemplate( thisData ),
								curHtml       = $divRoot.find( pushContainer ).html(),
								result        = null,
								htmlEl        = null;


							
							
							//--------- Do or not append to the original content
							if ( addition ) {
								result = curHtml + html;
								htmlEl = $( result );
								$divRoot.find( pushContainer ).before( htmlEl );
							} else {
								result = html;
								htmlEl = $( result );
								$divRoot.find( pushContainer ).html( htmlEl );
							}
							
							
							
							
							//--------- jQuery Masonry and Ajax Append Items
							$( '.uix-gallery' ).each( function() {
								var type = $( this ).data( 'show-type' );

								if ( type.indexOf( 'masonry' ) >= 0  ) {
									$( this ).addClass( 'masonry-container' );
									$( this ).find( '.uix-gallery__item' ).addClass( 'masonry-item' );
								}
								
							});
							
							var masonryItemContainer = $( '.masonry-container' );
							imagesLoaded( masonryItemContainer ).on( 'always', function() {
								 masonryItemContainer.masonry({
								    itemSelector: '.masonry-item'
								 });  
								
								$( masonryItemContainer ).masonry( 'reloadItems' );
								$( masonryItemContainer ).masonry( 'layout' );	
								
							});	
				
							
							//--------- Apply the original scripts
							$( document ).applyOriginalSomeScripts({
								scrollReveal : true,
								ajaxPostList : false
							});


							//--------- Remove this button
							$button.removeClass( triggerActive );	
	
							//--------- Hidden button when the page total number is set and does not equal -1 or 9999
							if ( 
								curPage == totalPage && 
								totalPage != 9999 && 
								totalPage != -1 &&
								totalPage != 1
							) {
								returnEmptyInfo();
								
							}		
							
							if ( curPage == 1 ) {
								returnEmptyInfo();
								
							}			
							

						} catch ( err ) {
							console.log( err.message );
							returnDataError();
							
						}
						

						
					} else {
						//if not array
						returnEmptyInfo();
					}

				 },
				 error : function( XMLHttpRequest, textStatus, errorThrown ) {
					 returnEmptyInfo();
					 
				 }
			});

		}

	
	   	
		
    };

    APP.components.documentReady.push( APP.POST_LIST_AJAX.documentReady );
    return APP;

}( APP, jQuery, window, document ) );





