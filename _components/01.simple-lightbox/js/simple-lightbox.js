
/* 
 *************************************
 * <!-- Custom Lightbox -->
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
				dataMaskClose = $this.data( 'lb-mask-close' ),
				htmlContent   = '',
				imgSrcStr     = '',
				imgSrcStrToW  = '';
			
		
			if( typeof dataFixed === typeof undefined ) {
				dataFixed = true;
			}
			if( typeof dataMaskClose === typeof undefined ) {
				dataMaskClose = false;
			}	
			
			//Reset the wrapper position
			$lbWrapper.css( 'margin-top', 0 );	
			

			if ( !dataFixed ) {
				$lbWrapper.addClass( 'no-fixed' );
				$( lbCloseEl ).addClass( 'no-fixed' );
				$( lbCloseFixedEl ).addClass( 'active' );
				
				//Initialize the wrapper position
				$lbWrapper.css( 'margin-top', $( window ).scrollTop() + 'px' );	
				
			}
			
			
			//Reset current container type
			$lbCon.removeClass( 'custom pure-image' );
			
			

			//-------- If it is photo
			if( typeof dataPhoto != typeof undefined && dataPhoto != '' ) {
				
				
				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				
				if ( dataPhoto.indexOf( '[' ) >= 0 &&  dataPhoto.indexOf( ']' ) >= 0 ) {
					imgSrcStr = JSON.parse( dataPhoto.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g,'"') );
				} else {
					imgSrcStr = dataPhoto;
					
				}
				
				
				//Judging whether multiple image sets
				if ( Object.prototype.toString.call( imgSrcStr ) =='[object Array]' ) {
					
					var largePhotos = '',
						thumbs      = '';
					
					imgSrcStrToW = imgSrcStr[0].large;
					
					//push the large photos
					largePhotos += '<div class="lb-large-photos-container"><ul>';
					for ( var i = 0; i < imgSrcStr.length; i++ ) {
						largePhotos += '<li><img src="'+ imgSrcStr[i].large +'" alt=""></li>';
					}
					largePhotos += '</ul></div>';
					
					//push the thumbs
					thumbs += '<div class="lb-thumbs-container"><ul>';
					for ( var k = 0; k < imgSrcStr.length; k++ ) {
						thumbs += '<li><img src="'+ imgSrcStr[k].thumb +'" alt=""></li>';
					}
					thumbs += '</ul></div>';
					
					htmlContent = largePhotos + thumbs;
					

					
				} else {
					
					imgSrcStrToW = imgSrcStr;
					htmlContent = '<img src="'+ imgSrcStr +'" alt="">';
					
				}
						
				$lbContent.html( htmlContent ).promise().done( function(){

					//Set current container type
					$lbCon.addClass( 'pure-image' );

					//Set container width
					var img = new Image();
					img.src = imgSrcStrToW;
					img.onload = function() {
						
						var sw = $( window ).width() - 30,
							w  = ( this.width > 1000 ) ? 1000 : this.width,
							h;
				
						if ( w > sw ) w = sw;
						
						h = w * ( this.height/this.width );
						
					
						$lbCon.css( {
							'width': w + 'px'
						} );
						
						
						$( '.lb-large-photos-container' ).css( {
							'height': h + 'px'
						} );	
						
						
					};
					
					
					$lbCon.find( '> .html' ).removeClass( 'no-img' );

				});		

				
			}	
			
			
			//-------- If it is not photo
			if( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				$lbContent.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
					
					//Set current container type
					$lbCon.addClass( 'custom' );
					
					//Set container width
					if ( $lbCon.find( '> .html .lb-box' ).length > 0 ) {
						$lbCon.css( 'width', $lbCon.find( '> .html .lb-box' ).width() + 'px' );
						$lbCon.find( '> .html' ).addClass( 'no-img' );
						
					}

				});
				
				

			}	
			

		});

		
		//Close the window
		$( document ).on( 'click', lbCloseEl, function() {
			customLBCloseEvent();
		});

		
		$( document ).on( 'click', lbCloseFixedEl, function() {
			customLBCloseEvent();
		});	
		

		//Click thumbnail to switch large photo
		$( document ).on( 'click', '.lb-thumbs-container li', function() {
			
			var $largePhoto = $( this ).closest( '.html' ).find( '.lb-large-photos-container' ),
				$thumb      = $( '.lb-thumbs-container li' ),
				curImgH     = 0;

			
			$thumb.removeClass( 'active' );
			$( this ).addClass( 'active' );
			
			$largePhoto.find( 'li' ).fadeOut( 300 ).removeClass( 'active' );
			$largePhoto.find( 'li' ).eq( $( this ).index() ).addClass( 'active' ).fadeIn( 300, function() {
				
				//Reset the container height
				curImgH = $largePhoto.find( 'li' ).eq( $( this ).index() ).find( 'img' ).height();
				
				$largePhoto.css( {
					'height': curImgH + 'px'
				} );
			});

				
			
		});		
		
		
		
		function customLBCloseEvent() {
			//Remove all dynamic classes
			$lbWrapper.removeClass( 'no-fixed' );
			$( lbCloseEl ).removeClass( 'no-fixed' );
			$( lbCloseFixedEl ).removeClass( 'active' );
			
			//Reset current container type
			$lbCon.removeClass( 'custom pure-image' );
			
			
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


