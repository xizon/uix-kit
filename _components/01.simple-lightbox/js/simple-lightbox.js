
/*! 
 *************************************
 * Custom Lightbox
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
	
		if ( $( '.custom-lightbox-overlay' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="custom-lightbox-overlay"><div class="lb-container"><div class="html"></div><span class="lb-close"></span><p class="title"></p></div></div>' );
		}
		

		var	$lbContaner = $( '.lb-container' ),
			$lbMask     = $( '.custom-lightbox-overlay' ),
			lbCloseEl   = '.custom-lightbox-overlay .lb-close',
			$lbContent  = $lbContaner.find( '.html' );
		
		$( document ).on( 'click', '.custom-lightbox', function() { 

			var $this       = $( this ),
				dataPhoto   = $this.data( 'lb-src' ),
				dataHtmlID  = $this.data( 'lb-html' );
			
		

			if( typeof dataPhoto != typeof undefined && dataPhoto != '' ) {
				$( lbCloseEl ).show();
				$lbMask.show();
				$lbContaner.show();
				$lbContent.html( '<img src="'+ dataPhoto +'" alt="">' ).promise().done( function(){
					//Set container width
					var img = new Image();
					img.onload = function() {
						$lbContaner.css( 'width', this.width + 'px' );
					}
					img.src = dataPhoto;
					$lbContaner.find( '> .html' ).removeClass( 'no-img' );
					
				});
				
			}	
			
			if( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

				$( lbCloseEl ).show();
				$lbMask.show();
				$lbContaner.show();
				$lbContent.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
					//Set container width
					if ( $lbContaner.find( '> .html .lb-box' ).length > 0 ) {
						$lbContaner.css( 'width', $lbContaner.find( '> .html .lb-box' ).width() + 'px' );
						$lbContaner.find( '> .html' ).addClass( 'no-img' );
						
					}

				});
				
				

			}	
			

		});

		$( document ).on( 'click', lbCloseEl, function() {
		      $lbMask.hide();
		});

		
		
    };

    theme.customLightbox = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


