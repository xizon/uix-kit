/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.AJAX_PUSH_CONTENT               = APP.AJAX_PUSH_CONTENT || {};
	APP.AJAX_PUSH_CONTENT.version       = '0.0.2';
    APP.AJAX_PUSH_CONTENT.documentReady = function( $ ) {

        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var loaderRemoveDelay   = 500,
			AJAXPageLinks       = '[data-ajax-push-content]',
			historyEnable       = false;


		
		/*
		 * Call AJAX on click event for "single pages links"
		 *
		 */
		
		if ( historyEnable ) {
			//Detect URL change in JavaScript
			var History = window.History;

			if ( History.enabled ) {

				// Load the page
				if ( $( '#my-ajax-demo-push-container' ).length > 0 ) {
					pushAction( $( '#my-ajax-demo-push-container' ), '#my-ajax-demo-target-container', "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading...</span></div>", window.location.href, 'POST', false );


					// Apply the original scripts
					$( document ).applyOriginalSomeScripts();		

				}	

			} else {
				return false;
			}


			// Content update and back/forward button handler
			History.Adapter.bind(window, 'statechange', function() {
				var State = History.getState();	
				// Do ajax
				if ( $( '#my-ajax-demo-push-container' ).length > 0 ) {
					pushAction( $( '#my-ajax-demo-push-container' ), '#my-ajax-demo-target-container', "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading...</span></div>", State.data.path, 'POST', false );

				}	


				// Log the history object to your browser's console
				History.log(State);
			});
	
		}




		
		$( document ).on( 'click', AJAXPageLinks, function( event ) {
			
			event.preventDefault();
			
			
			var $this            = $( this ),
				config           = $this.data( 'ajax-push-content' ),
			    curURL           = $this.attr( 'href' ); 

			if( typeof config === typeof undefined ) {
				config = false;
			}
				
			if ( config ) {
			
				//The currently URL of link
				if ( typeof curURL === typeof undefined ) {
					curURL = $this.closest( 'a' ).attr( 'href' );
				}


				//Prevent multiple request on click
				if ( $( AJAXPageLinks ).data( 'request-running' ) ) {
					return;
				}
				$( AJAXPageLinks ).data( 'request-running', true );

			
				if ( historyEnable ) {
					//Click on this link element using an AJAX request
					// When we do this, History.Adapter will also execute its contents. 	
					History.pushState({path: curURL}, document.title, curURL ); 	
				} else {
					
					//Click on this link element using an AJAX request
					pushAction( $( config.container ), config.target, config.loading, curURL, config.method, event );
	
				}

				
			}
			

			return false;
			
			
			
		});
		
		
		
		

		/*
		 * Move Animation
		 *
		 * @param  {object} container    - The target container to which the content will be added.
		 * @param  {string} target       - The instance ID or class name returned from the callback data
		 * @param  {string} loading      - Content of loading area.
		 * @param  {string} url          - The target URL via AJAX.
		 * @param  {string} method       - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
		 * @param  {object} event        - An object containing data that will be passed to the event handler.
		 * @return {void}                - The constructor.
		 */
		function pushAction( container, target, loading, url, method, event ) {
		

			if ( typeof method === typeof undefined || method == '' ) {
			    method = 'POST';
			}
			
			//Click on this link element using an PJAX request
			//This is a lower level function used by $.fn.pjax itself. 
			//It allows you to get a little more control over the pjax event handling.
			if ( event ) {
				
				
//				$.pjax.click( event, container,  {
//					showHTMLdelay : 0, 
//					startEvent    : function() {
//
//
//
//					}, 
//					endEvent      : function() {
//
//
//					}
//				} );

			}

		
			$.ajax({
				timeout  : 15000,
				url      : url,
				method   : method,
				dataType : 'html',
				data     : {
					action  : 'load_singlepages_ajax_content'
				},	
				success  : function( response ) {
					

					//A function to be called if the request succeeds
					ajaxSucceeds( container, url, $( response ).find( target ).html() );

				},
				error: function(){
					window.location.href = url;
				},
				beforeSend: function() {

					TweenMax.to( container.find( '.ajax-content-loader' ), 0.3, {
						css: {
							opacity    : 1
						},
						ease   : Power2.easeOut
					});		


					container.html( '<div class="ajax-content-loader">'+loading+'</div>' ).promise().done( function(){

						
						
						TweenMax.set( container.find( '.ajax-content-loader' ), {
							css         : {
								'display' : 'block'
							},
							onComplete  : function() {
								TweenMax.to( this.target, 0.5, {
									alpha : 1
								});
							}
						});	
					});

					


				}
			}).fail( function( jqXHR, textStatus ) {
				if( textStatus === 'timeout' ) {
					window.location.href = url;
				}
			});		

	
			
		}
		
		
		
		/*
		 * A function to be called if the request succeeds
		 *
		 * @param  {string} container    - The target container to which the content will be added.
		 * @param  {string} url          - Current URL after click
		 * @param  {string} content      - The data returned from the server
		 * @return {void}                - The constructor.
		 */
		function ajaxSucceeds( container, url, content ) {
			
		
			//Remove loader
			TweenMax.to( container.find( '.ajax-content-loader' ), 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( this.target, {
						css         : {
							'display' : 'none'
						}
					});
					

					//The data returned from the server
					container.html( content ).promise().done( function(){
						
						
						// Apply the original scripts
						$( document ).applyOriginalSomeScripts();
	
						
						if ( ! historyEnable ) {
							
							// Modify the URL without reloading the page
							if( history.pushState ) {
								history.pushState( null, null, url );
							}
							else {
								location.hash = url;
							}
	
						}

					

						//Prevent multiple request on click
						$( AJAXPageLinks ).data( 'request-running', false );	
						
						
						
					});
					

	
					
				},
				delay       : loaderRemoveDelay/1000
			});
			
			
		}
		
		
		
    };

    APP.components.documentReady.push( APP.AJAX_PUSH_CONTENT.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


