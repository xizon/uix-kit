
/* 
 *************************************
 * <!-- Custom Lightbox -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.LIGHTBOX               = APP.LIGHTBOX || {};
	APP.LIGHTBOX.version       = '0.1.0';
    APP.LIGHTBOX.pageLoaded    = function() {

		if ( $( '.uix-lightbox__container' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-lightbox__loading is-loaded uix-t-c"><i class="fa fa-spinner fa-spin"></i> Loading...</div><a class="uix-lightbox__original__close" href="#"></a><div class="uix-lightbox__container"><div class="uix-lightbox__inner"><div class="uix-lightbox__html"></div><span class="uix-lightbox__close"></span><p class="title"></p></div></div><div class="uix-lightbox__container-mask"></div><div class="uix-lightbox__close-fixed"></div>' );
		}
		

		var	$lbCon           = $( '.uix-lightbox__inner' ),
			$lbWrapper       = $( '.uix-lightbox__container' ),
			$lbMask          = $( '.uix-lightbox__container-mask' ),
			lbCloseEl        = '.uix-lightbox__container .uix-lightbox__close',
			lbCloseFixedEl   = '.uix-lightbox__close-fixed',
			$lbLoader        = $( '.uix-lightbox__loading' ),
			$lbLargeImgClose = $( '.uix-lightbox__original__close' ),
			$lbContent       = $lbCon.find( '.uix-lightbox__html' ),
			tempID           = 'lightbox-' + UIX_GUID.newGuid();
		
		$( document ).on( 'click touchstart', '.uix-lightbox__trigger', function() { 

			var $this         = $( this ),
				dataPhoto     = $this.data( 'lb-src' ),
				dataHtmlID    = $this.data( 'lb-html' ),
				dataFixed     = $this.data( 'lb-fixed' ),
				dataMaskClose = $this.data( 'lb-mask-close' ),
				dataMethod    = $this.data( 'lb-ajax-method' ),
				dataAjaxCon   = $this.data( 'lb-ajax-content' ),
				htmlContent   = '',
				imgSrcStr     = '',
				imgSrcStrToW  = '';
			

			
		
			if( typeof dataFixed === typeof undefined ) {
				dataFixed = true;
			}
			if( typeof dataMaskClose === typeof undefined ) {
				dataMaskClose = false;
			}	
			
			if( typeof dataMethod === typeof undefined ) {
				dataMethod = 'POST';
			}		
			
			//Display loading
			$lbLoader.removeClass( 'is-loaded' );	
	
			//Reset the wrapper position
			$lbWrapper.css( 'margin-top', 0 );	
			

			if ( !dataFixed ) {
				$lbWrapper.addClass( 'js-uix-no-fixed' );
				$( lbCloseEl ).addClass( 'js-uix-no-fixed' );
				$( lbCloseFixedEl ).addClass( 'active' );
				
				//Initialize the wrapper position
				$lbWrapper.css( 'margin-top', $( window ).scrollTop() + 'px' );	
				
			}
			
			
			//Reset current container type
			$lbCon.removeClass( 'js-uix-custom js-uix-pure-image' );
			
		
			// Locks the page
			if ( !$lbWrapper.hasClass( 'js-uix-no-fixed' ) ) {
				$.scrollLock( true );
			}
			
			

			//-------- If it is photo
			//-----------------------------
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
					largePhotos += '<div class="uix-lightbox__photo-container uix-lightbox__photo-sets-container"><a href="javascript:" class="uix-lightbox__photo-sets__prev"></a><a href="javascript:" class="uix-lightbox__photo-sets__next"></a><ul>';
					for ( var i = 0; i < imgSrcStr.length; i++ ) {
						
						
						largePhotos += '<li>';
						largePhotos += '	<a class="uix-lightbox__original__link" href="#'+tempID+'-sets-'+i+'">';
						largePhotos += '	   <img src="'+ imgSrcStr[i].large +'" alt="">';
						largePhotos += '	</a>';
						largePhotos += '	<div class="uix-lightbox__original__target" id="'+tempID+'-sets-'+i+'">';
						largePhotos += '	   <img src="'+ imgSrcStr[i].large +'" alt="">';
						largePhotos += '	</div>';
						largePhotos += '</li>'; 

					}
					largePhotos += '</ul></div>';
					
					//push the thumbs
					thumbs += '<div class="uix-lightbox__thumb-container"><ul>';
					for ( var k = 0; k < imgSrcStr.length; k++ ) {
						
						var active = ( k == 0 ) ? 'class="active"' : '';
						
						thumbs += '<li '+active+'><img src="'+ imgSrcStr[k].thumb +'" alt=""></li>';
					}
					thumbs += '</ul></div>';
					
					htmlContent = largePhotos + thumbs;
					

					
				} else {

					//Only one image
					imgSrcStrToW = imgSrcStr;
					htmlContent += '<div class="uix-lightbox__photo-container">';
					htmlContent += '	<a class="uix-lightbox__original__link" href="#'+tempID+'">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	</a>';
					htmlContent += '	<div class="uix-lightbox__original__target" id="'+tempID+'">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	</div>';
					htmlContent += '</div>'; 
					
				}
						
				$lbContent.html( htmlContent ).promise().done( function(){

					//Set current container type
					$lbCon.addClass( 'js-uix-pure-image' );

					//Set container width
					var img = new Image();
					img.src = imgSrcStrToW;
					img.onload = function() {
						
						//remove loading
						$lbLoader.addClass( 'is-loaded' );
						
						var sw     = window.innerWidth - 30,
							ow     = this.width,
							oh     = this.height,
							ratioH = oh/ow,
							ratioW = ow/oh,
							w      = ( ow > 1000 ) ? 1000 : ow,
							h;
				
						if ( w > sw ) w = sw;
						
						h = w * ratioH;
						
					
						//Prevent height overflow
						if ( h > window.innerHeight ) h = window.innerHeight * 0.95;
						
					
						$lbCon.css( {
							'width': w + 'px'
						} );
						

						//Don't write variables outside
						var $lbSetsContainer = $( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' );
						$lbSetsContainer.css( {
							'height': h + 'px'
						} );
						
						
						//Set a new height & width of inside images
						$lbContent.find( '.uix-lightbox__photo-sets-container ul > li img' ).css( {
							'height': h + 'px'
						} );

						
						if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
							$lbContent.find( '.uix-lightbox__photo-sets-container' ).css( {
								'width': 'calc('+ h*ratioW +'px + 6rem)',
								'margin-left': '-3rem'
							} );
	
						} else {
							$lbContent.find( '.uix-lightbox__photo-sets-container' ).css( {
								'width': 'calc('+ h*ratioW +'px + 6rem)',
								'margin-right': '-3rem'
							} );
	
						}
						
						
						//If the image is larger than the current window, it will display at the top.
						//Don't write variables outside
						var $lbTarImg = $( '.uix-lightbox__photo-container > .uix-lightbox__original__target' );
						if ( oh > window.innerHeight ) {
							$lbTarImg.addClass( 'uix-lightbox__original__target--imgfull' );
						} else {
							$lbTarImg.removeClass( 'uix-lightbox__original__target--imgfull' );
						}
						
					
						
						
					};
					
					
					$lbCon.find( '> .uix-lightbox__html' ).removeClass( 'js-uix-no-img' );

				});		

				
			}	
			
			
			//-------- If it is not photo
			//-----------------------------
			if( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

				$( lbCloseEl ).show();
				$lbWrapper.show();
				$lbMask.show();
				$lbCon.show();
				$lbContent.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
					
					//Set current container type
					$lbCon.addClass( 'js-uix-custom' );
					
					//Set container width
					if ( $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content' ).length > 0 ) {
						
						if ( window.innerWidth <= 768 ) {
							$lbCon.css( 'width', window.innerWidth - 10 + 'px' );
						} else {
							$lbCon.css( 'width', $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content' ).width() + 'px' );
						}
						
						
						$lbCon.find( '> .uix-lightbox__html' ).addClass( 'js-uix-no-img' );
						
						
						//Ajax-loaded content
						if( typeof dataAjaxCon != typeof undefined && dataAjaxCon != '' ) {
							
							var $ajaxContentContainer = $lbCon.find( '> .uix-lightbox__html .uix-lightbox__content > div' );
							
							$ajaxContentContainer.html( $ajaxContentContainer.data( 'loading-text' ) );
							
							$.ajax({
								url      : dataAjaxCon,
								method   : dataMethod,
								dataType : 'html',
								success  : function( response ) { 
									$ajaxContentContainer.html( $( response ).find( '.uix-entry__content' ).html() );

								 },
								 error : function( XMLHttpRequest, textStatus, errorThrown ) {

								 }
							});

						}
						
						
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
		
		function lightboxThumbSwitch( index, obj ) {
			var $largePhoto = obj.closest( '.uix-lightbox__html' ).find( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ),
				$thumb      = obj.closest( '.uix-lightbox__html' ).find( '.uix-lightbox__thumb-container li' ),
				curImgH     = 0;

			
			$thumb.removeClass( 'active' );
			obj.addClass( 'active' );
			
			$largePhoto.find( 'li' ).fadeOut( 300 ).removeClass( 'active' );
			$largePhoto.find( 'li' ).eq( index ).addClass( 'active' ).fadeIn( 300, function() {
				
				//Reset the container height
				var imgClick = new Image();
				imgClick.src = $largePhoto.find( 'li' ).eq( index ).find( 'img' ).attr( 'src' );
				imgClick.onload = function() {
					
					//remove loading
					$lbLoader.addClass( 'is-loaded' );


					
					var sw     = window.innerWidth - 30,
						ow     = this.width,
						oh     = this.height,
						ratioH = oh/ow,
						w      = ( ow > 1000 ) ? 1000 : ow,
						h;
					

					if ( w > sw ) w = sw;

					h = w * ratioH;


					//Prevent height overflow
					if ( h > window.innerHeight ) h = window.innerHeight * 0.95;

					
					$largePhoto.css( {
						'height': h + 'px'
					} )
					.find( 'img' ).css( {
						'height': h + 'px'
					} );	
					

					//If the image is larger than the current window, it will display at the top.
					//Don't write variables outside
					var $lbTarImg = $largePhoto.find( 'li' ).eq( index ).find( '.uix-lightbox__original__target' );
					if ( oh > window.innerHeight ) {
						$lbTarImg.addClass( 'uix-lightbox__original__target--imgfull' );
					} else {
						$lbTarImg.removeClass( 'uix-lightbox__original__target--imgfull' );
					}

					

				};

				

			});	
		}
		
		
		
		$( document ).on( 'click', '.uix-lightbox__thumb-container li', function() {
			lightboxThumbSwitch( $( this ).index(), $( this ) );
			
		});		
		
		$( document ).on( 'click', '.uix-lightbox__photo-sets-container > a', function() {
			var $largePhoto = $( this ).closest( '.uix-lightbox__html' ).find( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ),
				$thumb      = $( this ).closest( '.uix-lightbox__html' ).find( '.uix-lightbox__thumb-container li' ),
				total       = $thumb.length,
				curIndex    = $thumb.filter( '.active' ).index(),
				prevIndex   = curIndex - 1,
				nextIndex   = curIndex + 1;
			
			
			if ( prevIndex < 0 ) prevIndex = total - 1;
			if ( nextIndex > total - 1 ) nextIndex = 0;
			
			
			if ( $( this ).hasClass( 'uix-lightbox__photo-sets__prev' ) ) {
				lightboxThumbSwitch( prevIndex, $thumb.eq( prevIndex ) );
			}
			
			if ( $( this ).hasClass( 'uix-lightbox__photo-sets__next' ) ) {
				lightboxThumbSwitch( nextIndex, $thumb.eq( nextIndex ) );
			}
			
			
		});		
		
		
		
		
		function customLBCloseEvent() {
			//Remove all dynamic classes
			$lbWrapper.removeClass( 'js-uix-no-fixed' );
			$( lbCloseEl ).removeClass( 'js-uix-no-fixed' );
			$( lbCloseFixedEl ).removeClass( 'active' );
			
			$( 'html' ).css( 'overflow-y', 'auto' );
			
			//Reset current container type
			$lbCon.removeClass( 'js-uix-custom js-uix-pure-image' );
			
			
			//close windows
			$lbWrapper.hide();
			$lbMask.hide();
			
			
			//Changing The Site URL
			var href = window.location.href.substr( 0, window.location.href.indexOf( '#' ) );
			history.pushState( '', document.title, href );
			
			// Unlocks the page
			$.scrollLock( false );
	
			
		}
		
		
		
		
		
		
		//Close/Open enlarge image
		$( document ).on( 'click', '.uix-lightbox__original__link', function( e ) {
			$( 'html' ).css( 'overflow-y', 'hidden' );
			$lbLargeImgClose.addClass( 'active' );

		});	
		
		$( document ).on( 'click', '.uix-lightbox__original__close', function( e ) {
            $lbLargeImgClose.removeClass( 'active' );
			$( 'html' ).css( 'overflow-y', 'auto' );
		});

		
		
		
		    
		
    };

    APP.components.pageLoaded.push( APP.LIGHTBOX.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );


