
/*! 
 *************************************
 * Posts List With Ajax
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
	
		$( '[data-ajax-list-json]' ).each( function() {
			var $this            = $( this ),
				wrapperID        = 'refresh-all-waypoint-' + Math.random()*1000000000000000000,
			    curPage          = $this.data( 'ajax-list-page-now' ),
				perShow          = $this.data( 'ajax-list-page-per' ),
				totalPage        = $this.data( 'ajax-list-page-total' ),
				trigger          = $this.data( 'ajax-list-trigger' ),
				infinitescroll   = $this.data( 'ajax-list-infinitescroll' ),
				jsonFile         = $this.data( 'ajax-list-json' ),
				template7ID      = $this.data( 'ajax-list-temp-id' ),
				pushContainer    = $this.data( 'ajax-list-push-container-class' ),
				triggerActive    = $this.data( 'ajax-list-trigger-active-class' );
			
			
			$this.attr( 'id', wrapperID );
			
			if( typeof curPage === typeof undefined ) {
				curPage = 1;
			}
			
			curPage = curPage + 1;
			
			
			if( typeof perShow === typeof undefined ) {
				perShow = 8;
			}
			
			if( typeof totalPage === typeof undefined ) {
				totalPage = 3;
			}
			
			
			if( typeof trigger === typeof undefined ) {
				trigger = '.load-more';
			}
			
			if( typeof infinitescroll === typeof undefined ) {
				infinitescroll = false;
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
			
			triggerActive = triggerActive.replace( '.', '' );
			
			
			
			if( typeof pushContainer === typeof undefined ) {
				$( '#' + template7ID ).after( '<div class="portfolio-items-ajax-container"></div>' );
				pushContainer = '.portfolio-items-ajax-container';
			}		
			
			if ( jsonFile != '' && template7ID != '' ) {
				
				
				if ( infinitescroll ) {
					/*! 
					 ------------------
					 Infinite scroll
					 ------------------
					 */ 	
					var $button = $( trigger ),
						btnTop  = $button.offset().top;
					
					$( window ).on( 'scroll touchmove', function() {
						var scrolled = $( window ).scrollTop();
						
				
						
						if ( scrolled >= parseFloat( $button.offset().top - $( window ).height()/2 - $button.outerHeight( true )*2 ) && !$button.hasClass( triggerActive ) ) {

								// Active this button
								$button.addClass( triggerActive );					    
							
								//Hidden button
								if ( curPage == totalPage ) {
									$button.hide();
								}

								
								if ( curPage < totalPage+1 ) {

									//Perform dynamic loading
									ajaxLoadInit( $this, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer );

								}

								//Avoid touching the same button multiple times
					
								
								//Calculate the page has been loaded
								curPage++;	
						}
						
					});	
					
				} else {
					/*! 
					 ------------------
					 Ajax with JSON data
					 ------------------
					 */ 
					$( document ).on( 'click', trigger, function( e ) {

						e.preventDefault();

						var $button = $( this );

						//Hidden button
						if ( curPage == totalPage ) {
							$button.hide();
						}


						if ( curPage < totalPage+1 ) {
							//Perform dynamic loading
							ajaxLoadInit( $this, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer );
						}




						//Calculate the page has been loaded
						curPage++;

						return false;


					});
					
					
				}
				
			}
			
		});
			
			
		/*
		 * Ajax with JSON data
		 *
		 * @param  {object} ajaxWrapper     - The outermost container of list.
		 * @param  {object} trigger         - Trigger ajax loaded button object.
		 * @param  {number} curPage         - The current page to load.
		 * @param  {number} perShow         - The amount to load each time.
		 * @param  {number} totalPage       - The total page to load.
		 * @param  {string} template7ID     - HTML template ID
		 * @param  {string} jsonFile        - JSON file path to docking data
		 * @param  {string} triggerActive   - The class name of trigger button actived.
		 * @param  {string} pushContainer   - This container is used to display the loaded dynamic data.
		 * @return {void}                    - The constructor.
		 */
		function ajaxLoadInit( ajaxWrapper, trigger, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer ) {

			var $divRoot         = ajaxWrapper,
				template         = document.getElementById( template7ID ).innerHTML,
				compiledTemplate = Template7.compile( template );


			$.ajax({
				url      : jsonFile, //Be careful about the format of the JSON file
				method   : 'GET',
				data     : { total: totalPage, per: perShow, page: curPage },
				dataType : 'json',
				success: function (data) { 

					var thisData = data,
						html     = compiledTemplate( thisData ),
						curHtml  = $divRoot.find( pushContainer ).html();

					$divRoot.find( pushContainer ).html( curHtml + html );
					
					//Function of Masonry
					var masonryObj = $( '.masonry-container .custom-gallery-tiles' );
					imagesLoaded( masonryObj ).on( 'always', function() {
						  masonryObj.masonry({
							itemSelector: '.masonry-item'
						  });  
					});
					
					
					// Remove this button
					$( trigger ).removeClass( triggerActive );					    

					
				 }
			});

		}

	
	   
		
		
		
	};
	
		
    theme.listAjax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

