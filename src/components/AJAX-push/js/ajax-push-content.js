/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.AJAX_PUSH_CONTENT               = APP.AJAX_PUSH_CONTENT || {};
	APP.AJAX_PUSH_CONTENT.version       = '0.0.3';
    APP.AJAX_PUSH_CONTENT.documentReady = function( $ ) {

        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var loaderRemoveDelay   = 500,
			AJAXPageLinks       = '[data-ajax-push-content]',
			ajaxConfig          = {
									"container" :"#my-ajax-demo-push-container",
									"target"    :"#my-ajax-demo-target-container",
									"loading"   :"<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading...</span></div>",
									"method"    :"POST"
								};

		//Fire click event
		var pushState = history.pushState;
		history.pushState = function() {
			pushState.apply( history, arguments );
			fireClickEvents('pushState', arguments );
		};
		
		function fireClickEvents() {
			//do something...
		}

		//Detect URL change
		window.addEventListener( 'popstate', function( e ) {
			pushAction( $( ajaxConfig.container ), ajaxConfig.target, ajaxConfig.loading, document.location.href, ajaxConfig.method );
		});

		
		$( document ).on( 'click', AJAXPageLinks, function( event ) {
			
			event.preventDefault();
			
			
			var $this            = $( this ),
			    curURL           = $this.attr( 'href' ); 

			//The currently URL of link
			if ( typeof curURL === typeof undefined ) {
				curURL = $this.closest( 'a' ).attr( 'href' );
			}


			//Prevent multiple request on click
			if ( $( AJAXPageLinks ).data( 'request-running' ) ) {
				return;
			}
			$( AJAXPageLinks ).data( 'request-running', true );


			//Click on this link element using an AJAX request
			pushAction( $( ajaxConfig.container ), ajaxConfig.target, ajaxConfig.loading, curURL, ajaxConfig.method );

			

			return false;
			
			
			
		});
		
		
		
		

		/*
		 * Move Animation
		 *
		 * @param  {Object} container    - The target container to which the content will be added.
		 * @param  {String} target       - The instance ID or class name returned from the callback data
		 * @param  {String} loading      - Content of loading area.
		 * @param  {String} url          - The target URL via AJAX.
		 * @param  {String} method       - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
		 * @return {Void}                - The constructor.
		 */
		function pushAction( container, target, loading, url, method ) {

			if ( container.length == 0 ) return false;

			if ( typeof method === typeof undefined || method == '' ) {
			    method = 'POST';
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
					ajaxSucceeds( container, url, $( response ).find( target ).html(), $( response ).filter( 'title' ).text() );

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
		 * @param  {String} container    - The target container to which the content will be added.
		 * @param  {String} url          - Current URL after click
		 * @param  {String} content      - The data returned from the server
		 * @param  {String} title        - The title of a requested page.
		 * @return {Void}                - The constructor.
		 */
		function ajaxSucceeds( container, url, content, title ) {
			
		
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
	
						
						// Modify the URL without reloading the page
						if( history.pushState ) {
							history.pushState( null, null, url );
						} else {
							location.hash = url;
						}
						
						//Change the page title
						document.title = title;
						
						
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


