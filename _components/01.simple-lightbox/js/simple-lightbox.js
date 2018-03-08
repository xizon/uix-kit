
/*! 
 *************************************
 * Custom Lightbox
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
	
		if ( $( '.custom-lightbox-overlay' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="custom-lightbox-overlay"><div class="lb-container"><div class="html"></div><span class="lb-close"></span><p class="title"></p></div></div><div class="custom-lightbox-overlay-mask"></div><div class="custom-lightbox-close-fixed"></div>' );
		}
		

		var	$lbCon          = $( '.lb-container' ),
			$lbWrapper      = $( '.custom-lightbox-overlay' ),
			$lbMask         = $( '.custom-lightbox-overlay-mask' ),
			lbCloseEl       = '.custom-lightbox-overlay .lb-close',
			lbCloseFixedEl  = '.custom-lightbox-close-fixed',
			$lbContent      = $lbCon.find( '.html' );
		
		$( document ).on( 'click', '.custom-lightbox', function() { 

			var $this         = $( this ),
				dataPhoto     = $this.data( 'lb-src' ),
				dataHtmlID    = $this.data( 'lb-html' ),
				dataFixed     = $this.data( 'lb-fixed' ),
				dataMaskClose = $this.data( 'lb-mask-close' );
			
		
			if( typeof dataFixed === typeof undefined ) {
				dataFixed = true;
			}
			if( typeof dataMaskClose === typeof undefined ) {
				dataMaskClose = false;
			}		
			
			if ( !dataFixed ) {
				$lbWrapper.addClass( 'no-fixed' );
				$( lbCloseEl ).addClass( 'no-fixed' );
				$( lbCloseFixedEl ).addClass( 'active' );
			}
			
			
			

			if( typeof dataPhoto != typeof undefined && dataPhoto != '' ) {
				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				$lbContent.html( '<img src="'+ dataPhoto +'" alt="">' ).promise().done( function(){
					//Set container width
					var img = new Image();
					img.onload = function() {
						$lbCon.css( 'width', this.width + 'px' );
					}
					img.src = dataPhoto;
					$lbCon.find( '> .html' ).removeClass( 'no-img' );
					
				});
				
			}	
			
			if( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				$lbContent.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
					//Set container width
					if ( $lbCon.find( '> .html .lb-box' ).length > 0 ) {
						$lbCon.css( 'width', $lbCon.find( '> .html .lb-box' ).width() + 'px' );
						$lbCon.find( '> .html' ).addClass( 'no-img' );
						
					}

				});
				
				

			}	
			

		});

		$( document ).on( 'click', lbCloseEl, function() {
			customLBCloseEvent();
		});

		$( document ).on( 'click', lbCloseFixedEl, function() {
			customLBCloseEvent();
		});	
		
		function customLBCloseEvent() {
			//Remove all dynamic classes
			$lbWrapper.removeClass( 'no-fixed' );
			$( lbCloseEl ).removeClass( 'no-fixed' );
			$( lbCloseFixedEl ).removeClass( 'active' );
			
			//close windows
			$lbWrapper.hide();
			$lbMask.hide();
		}
		
		
		
    };

    theme.customLightbox = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );


