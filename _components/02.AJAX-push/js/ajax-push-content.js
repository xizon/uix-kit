/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		
        var $window                  = $( window ),
		    windowWidth              = $window.width(),
		    windowHeight             = $window.height();

		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var loaderRemoveDelay   = 500,
			AJAXPageLinks       = '[data-ajax-push-content]';
		

		/*
		 * Call AJAX on click event for "single pages links"
		 *
		 */
		$( document ).on( 'click', AJAXPageLinks, function( e ) {
			
			e.preventDefault();
			
			
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

			
				//Click on this link element using an AJAX request
				pushAction( $( config.container ), config.target, config.loading, curURL );


				
			}
			

			return false;
			
			
		});
		
		

		/*
		 * Move Animation
		 *
		 * @param  {string} container    - The target container to which the content will be added.
		 * @param  {string} target       - The instance ID or class name returned from the callback data
		 * @param  {string} loading      - Content of loading area.
		 * @param  {string} url          - The target URL via AJAX.
		 * @return {void}                - The constructor.
		 */
		function pushAction( container, target, loading, url ) {
		

			//Click on this link element using an AJAX request
			$.ajax({
				timeout  : 15000,
				url      : url,
				method   : 'POST',
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
	
						// Modify the URL without reloading the page
						if( history.pushState ) {
							history.pushState( null, null, url );
						}
						else {
							location.hash = url;
						}
						
					

						//Prevent multiple request on click
						$( AJAXPageLinks ).data( 'request-running', false );	
						
						
						
					});
					

	
					
				},
				delay       : loaderRemoveDelay/1000
			});
			
			
		}
		
		
		
	
		
    };

    App.ajaxPushContent = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


