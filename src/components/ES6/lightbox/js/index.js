
/* 
 *************************************
 * <!-- Custom Lightbox -->
 *************************************
 */

/**
 * module.LIGHTBOX
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */



import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';
import UixApplyAsyncScripts from '@uixkit/core/_global/js/fn/UixApplyAsyncScripts';


import '../scss/_style.scss';


export const LIGHTBOX = ( ( module, $, window, document ) => {
	if ( window.LIGHTBOX === null ) return false;
	
	
	
    module.LIGHTBOX               = module.LIGHTBOX || {};
    module.LIGHTBOX.version       = '0.2.0';
    module.LIGHTBOX.pageLoaded    = function() {

		if ( $( '.uix-lightbox__container' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-lightbox__loading is-loaded uix-t-c"><i class="fa fa-spinner fa-spin"></i> Loading...</div><a class="uix-lightbox__original__close" href="javascript:void(0);"></a><div class="uix-lightbox__container"><div class="uix-lightbox__inner"><div class="uix-lightbox__html"></div><p class="title"></p></div></div><div class="uix-lightbox__container-mask"></div><div class="uix-lightbox__close"><button type="button"></button></div>' );
		}
		
    
        
        // To display the template tag content.
        $( 'template' ).each( function()  {
            
            const _content = $( this ).html( function( index,html ) {
                                        return html.replace(/[\r\n]/g, '' );
                                    }).context.innerHTML,
                _id = $( this ).attr( 'id' );
            
            //If it is dialog, clone the contents of the <template> into the body
            if ( 
                typeof _id !== typeof undefined && 
                ! $( 'body' ).hasClass( _id ) && 
                $( '<div>' + _content + '</div>' ).find( '[role="dialog"]' ).length > 0 
            ) {
                
                //reset id
                $( this ).removeAttr( 'id' );
                $( 'body' ).addClass( _id );
                
                //append content to body
                $( _content.replace(/role=[\'\"]dialog[\'\"]/, 'role="dialog" id="'+_id+'"' ) ).appendTo( 'body' );
                
            }

        });
        
  
		
		const innerEl         = '.uix-lightbox__inner',
			  wrapperEl       = '.uix-lightbox__container',
			  loaderEl        = '.uix-lightbox__loading',
			  maskEl          = '.uix-lightbox__container-mask',
			  closeEl         = '.uix-lightbox__close',
			  largeImgCloseEl = '.uix-lightbox__original__close',
			  triggerEl       = '.uix-lightbox__trigger',
			  docURL          = window.location.href,
			  $content        = $( innerEl ).find( '.uix-lightbox__html' ),
			  customWidth     = 1000; //Match the width in the css file;
		

		//Detect URL change & Fire click event
		window.addEventListener( 'popstate', function( e ) {
		
			let eleTarget = null;
			
			$( '[data-lb-ajax]' ).each( function() {
				
				let prevURL = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent( 'uix-lightbox-ajaxURL' ).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

				if ( $( this ).attr( 'href' ) === prevURL ) {
					eleTarget = this;
				}
				
			});
			
			
			const backURL = $( eleTarget ).data( 'lb-ajax-doc-url' );
			if ( typeof backURL != typeof undefined ) {
				lightboxClose( backURL );
			}
			
			
		});
		
		
		
		
		$( document ).off( 'click.LIGHTBOX_TRIGGER' ).on( 'click.LIGHTBOX_TRIGGER', triggerEl, function() { 

			const $this         = $( this );
            
			let	dataPhoto     = $this.data( 'lb-src' ),
				dataHtmlID    = $this.data( 'lb-html' ),
				dataFixed     = $this.data( 'lb-fixed' ),
				dataMaskClose = $this.data( 'lb-mask-close' ),
				dataAjax      = $this.data( 'lb-ajax' ),
				htmlContent   = '',
				imgSrcStr     = '',
				imgSrcStrToW  = '';
			
		
			if ( typeof dataFixed === typeof undefined ) {
				dataFixed = true;
			}
			if ( typeof dataMaskClose === typeof undefined ) {
				dataMaskClose = false;
			}	
			
			if ( typeof dataAjax === typeof undefined ) {
				dataAjax = false;
			}	
			
			if ( dataAjax ) {
				$( wrapperEl ).addClass( 'js-uix-ajax' );
				
				//Record current page URL for history
				if ( typeof $this.data( 'lb-ajax-doc-url' ) === typeof undefined ) $this.data( 'lb-ajax-doc-url', docURL );
				
				
			}		
			
			//Display loading
			$( loaderEl ).removeClass( 'is-loaded' );	
	
			//Reset the wrapper position
			$( wrapperEl ).css( 'margin-top', 0 );	
			

			if ( !dataFixed ) {
				$( wrapperEl ).addClass( 'js-uix-no-fixed' );
				$( closeEl ).addClass( 'is-active' );
				
				//Initialize the wrapper position
				$( wrapperEl ).css( 'margin-top', $( window ).scrollTop() + 'px' );	
				
			}
			
			
			//Reset current container type
			$( innerEl ).removeClass( 'js-uix-custom js-uix-pure-image' );
			
		
			// Locks the page
			if ( !$( wrapperEl ).hasClass( 'js-uix-no-fixed' ) ) {
				$.scrollLock( true );
			}
			
			
			// Show the lightbox
			const showLightbox = function() {
				$( closeEl ).addClass( 'is-active' );
				$( wrapperEl ).show();
				$( maskEl ).show();
				$( innerEl ).show();	
			};
			
			
			// hide the content container
			const hideLightboxContent = function() {
				TweenMax.set( $content, {
					css         : {
						'display' : 'none'
					}
				});		
			};
			
			
			// show the content container
			const showLightboxContent = function() {
				TweenMax.set( $content, {
					css         : {
						'display' : 'block'
					},
					onComplete  : function() {
						TweenMax.to( this.target, 0.5, {
							alpha : 1
						});
					}
				});	
			};
			
			
			hideLightboxContent();
			
			
            ////////////////////////
            //////// PHOTOS ///////
            ////////////////////////  
			if ( typeof dataPhoto != typeof undefined && dataPhoto != '' ) {
				
				//show the lightbox
				showLightbox();
				
				
				if ( dataPhoto.indexOf( '[' ) >= 0 &&  dataPhoto.indexOf( ']' ) >= 0 ) {
					imgSrcStr = JSON.parse( dataPhoto.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g,'"') );
				} else {
					imgSrcStr = dataPhoto;
					
				}
				
				//Judging whether multiple image sets
				if ( Object.prototype.toString.call( imgSrcStr ) =='[object Array]' ) {
					
					let largePhotos = '',
						thumbs      = '';
					
					imgSrcStrToW = imgSrcStr[0].large;
					
					//push the large photos
					largePhotos += '<div class="uix-lightbox__photo-container uix-lightbox__photo-sets-container"><a href="javascript:" class="uix-lightbox__photo-sets__prev"></a><a href="javascript:" class="uix-lightbox__photo-sets__next"></a><ul>';
					for ( let i = 0; i < imgSrcStr.length; i++ ) {
						
						const tempID = 'lightbox-' + UixGUID.create();
						
						largePhotos += '<li>';
						largePhotos += '	<a class="uix-lightbox__original__link" data-target-id="'+tempID+'-sets-'+i+'" href="javascript:void(0);">';
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
					for ( let k = 0; k < imgSrcStr.length; k++ ) {
						
						const active = ( k == 0 ) ? 'class="is-active"' : '';
						
						thumbs += '<li '+active+'><img src="'+ imgSrcStr[k].thumb +'" alt=""></li>';
					}
					thumbs += '</ul></div>';
					
					htmlContent = largePhotos + thumbs;
					

					
				} else {

					const tempID = 'lightbox-' + UixGUID.create();
					
					//Only one image
					imgSrcStrToW = imgSrcStr;
					htmlContent += '<div class="uix-lightbox__photo-container">';
					htmlContent += '	<a class="uix-lightbox__original__link" data-target-id="'+tempID+'" href="javascript:void(0);">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	</a>';
					htmlContent += '	<div class="uix-lightbox__original__target" id="'+tempID+'">';
					htmlContent += '	   <img src="'+ imgSrcStr +'" alt="">';
					htmlContent += '	</div>';
					htmlContent += '</div>'; 
					
				}
						
				$content.html( htmlContent ).promise().done( function(){

					//Set current container type
					$( innerEl ).addClass( 'js-uix-pure-image' );

					//Set container width
					const img = new Image();
					img.src = imgSrcStrToW;
					img.onload = function() {
						
						//remove loading
						$( loaderEl ).addClass( 'is-loaded' );

						// show the content container
						showLightboxContent();	

						
						let sw     = window.innerWidth - 30,
							ow     = this.width,
							oh     = this.height,
							ratioH = oh/ow,
							ratioW = ow/oh,
							w      = ( ow > customWidth ) ? customWidth : ow,
							h;
				
						if ( w > sw ) w = sw;
						
						h = w * ratioH;
						
					
						//Prevent height overflow
						if ( h > window.innerHeight ) h = window.innerHeight * 0.95;
						
					
						$( innerEl ).css( {
							'width': w + 'px'
						} );
						

						//Don't write variables outside
						const $lbSetsContainer = $( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' );
						$lbSetsContainer.css( {
							'height': h + 'px'
						} );
						
						
						//Set a new height & width of inside images
						$content.find( '.uix-lightbox__photo-sets-container ul > li img' ).css( {
							'height': h + 'px'
						} );

						
						if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
							$content.find( '.uix-lightbox__photo-sets-container' ).css( {
								'width': 'calc('+ h*ratioW +'px + 6rem)',
								'margin-left': '-3rem'
							} );
	
						} else {
							$content.find( '.uix-lightbox__photo-sets-container' ).css( {
								'width': 'calc('+ h*ratioW +'px + 6rem)',
								'margin-right': '-3rem'
							} );
	
						}
						
						
						
						//If the image is larger than the current window, it will display at the top.
						//Don't write variables outside
						const $lbTarImg = $( '.uix-lightbox__photo-container > .uix-lightbox__original__target' );
						if ( oh > window.innerHeight ) {
							$lbTarImg.addClass( 'uix-lightbox__original__target--imgfull' );
						} else {
							$lbTarImg.removeClass( 'uix-lightbox__original__target--imgfull' );
						}
						
					
						
						
					};
					
					
					$( innerEl ).find( '> .uix-lightbox__html' ).removeClass( 'js-uix-no-img' );

				});		

				
			}	
			
			
			 
            ////////////////////////
            //////// HTML /////////
            ////////////////////////  
			if ( typeof dataHtmlID != typeof undefined && dataHtmlID != '' ) {
				dataHtmlID = dataHtmlID.replace( '#', '' );

                
				const $htmlAjaxContainer = $( '#' + dataHtmlID ).find( '.uix-lightbox__content > div' );
		
				//show the lightbox
				showLightbox();
				
				// Content pushing completed
				const htmlContentLoaded = function() {
					//remove loading
					$( loaderEl ).addClass( 'is-loaded' );
					
					//Set current container type
					$( innerEl ).addClass( 'js-uix-custom' );
					
					//Set container width
					if ( $( innerEl ).find( '> .uix-lightbox__html .uix-lightbox__content' ).length > 0 ) {
						
						if ( window.innerWidth <= 768 ) {
							$( innerEl ).css( 'width', window.innerWidth - 10 + 'px' );
						} else {
							$( innerEl ).css( 'width', $( innerEl ).find( '> .uix-lightbox__html .uix-lightbox__content' ).width() + 'px' );
						}
						
						
						
						$( innerEl ).find( '> .uix-lightbox__html' ).addClass( 'js-uix-no-img' );

						
					}
						
					
				};
				
				
				
				if ( $( wrapperEl ).hasClass( 'js-uix-ajax' ) ) {

					//Add content to the dynamic AJAX container
					const ajaxURL               = $this.attr( 'href' ),
						  ajaxConfig            = dataAjax;


					// Modify the URL without reloading the page
					if( history.pushState ) {
						history.pushState( null, null, ajaxURL );

					} else {
						location.hash = ajaxURL;
					}

					document.cookie = 'uix-lightbox-ajaxURL=' + ajaxURL;

                    
                    // Add a request or response interceptor
                    const axiosInterceptor = axios.interceptors.request.use(function(config) {
                        // Do something before request is sent


                        //
                        return config;
                    },
                    function(error) {
                        return Promise.reject(error);
                    });

                    // To send data in the application/x-www-form-urlencoded format instead
                    const formData = new FormData();
                    const defaultPostData = {
                        action  : 'load_singlepages_ajax_content'
                    };
                    for(var k in defaultPostData) {
                        formData.append(k, defaultPostData[k]);
                    }

                    // Create a request event
                    axios({
                        timeout: 15000,
                        method: ajaxConfig.method,
                        url: ajaxURL,
                        data: formData,
                        responseType: 'text',
                    })
                    .then(function (response) {

                        const htmlCode = response.data;

                        $htmlAjaxContainer.html( $( htmlCode ).find( dataAjax.target ).html() ).promise().done( function(){


                            $content.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){

                                // Apply some asynchronism scripts
                                $( document ).UixApplyAsyncScripts({
                                    lightBox : false,
                                    ajaxPostList : false
                                });


                                // show the content container
                                showLightboxContent();	

                                // Content pushing completed
                                htmlContentLoaded();
                            });	


                        });



                    })  
                    .catch(function (error) {

                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            const status = error.response.status;
                            console.log(status);


                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);

                            //
                            window.location.href = ajaxURL;

                        } else {
                            // If there was a problem, we need to
                            // dispatch the error condition
                            console.log(error.message);
                        }
                    });


                    // Remove an interceptor later
                    axios.interceptors.request.eject(axiosInterceptor);


					
				} else {
					
					// show the content container
					showLightboxContent();	
                
					$content.html( $( '#' + dataHtmlID ).html() ).promise().done( function(){
						
						// Content pushing completed
						htmlContentLoaded();
					});	
				}//endif $( wrapperEl ).hasClass( 'js-uix-ajax' )

				
				

				
				

			}	
			
			
			return false;
			

		}); /* end click event for triggerEl */
		
		

        ////////////////////////
        // Close the lightbox //
        ////////////////////////   	
		$( document ).off( 'click.LIGHTBOX_CLOSE' ).on( 'click.LIGHTBOX_CLOSE', closeEl + ',' + maskEl, function() {
			lightboxClose( docURL );
		});	
		

		
		$( document ).off( 'click.LIGHTBOX_THUMB' ).on( 'click.LIGHTBOX_THUMB', '.uix-lightbox__thumb-container li', function() {
			lightboxThumbSwitch( $( this ).index(), $( this ) );
			
		});		
		
		
		
		$( document ).off( 'click.LIGHTBOX_PHOTO_SETS' ).on( 'click.LIGHTBOX_PHOTO_SETS', '.uix-lightbox__photo-sets-container > a', function() {
			const $largePhoto = $( this ).closest( '.uix-lightbox__html' ).find( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ),
				$thumb      = $( this ).closest( '.uix-lightbox__html' ).find( '.uix-lightbox__thumb-container li' ),
				total       = $thumb.length,
				curIndex    = $thumb.filter( '.is-active' ).index();
            
            let prevIndex   = curIndex - 1,
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
		
        ////////////////////////////////
        // Close/Open enlarge image //
        ///////////////////////////////	
		if ( window.innerWidth > 768 ) {

			$( document ).off( 'click.LIGHTBOX_ORGINAL_LINK' ).on( 'click.LIGHTBOX_ORGINAL_LINK', '.uix-lightbox__original__link', function( e ) {

				$( '.uix-lightbox__original__target#' + $( this ).data( 'target-id' ) ).addClass( 'is-active' );


				if ( $( this ).closest( '.uix-lightbox__container.js-uix-no-fixed' ).length > 0 ) {
					$( '.uix-lightbox__container.js-uix-no-fixed, .uix-lightbox__original__target--imgfull' ).addClass( 'no-fixed-imgEnlarged' );
				}


				//---
				$( 'html' ).css( 'overflow-y', 'hidden' );
				$( largeImgCloseEl ).addClass( 'is-active' );

			});	

			$( document ).off( 'click.LIGHTBOX_LARGE_IMG_CLOSE' ).on( 'click.LIGHTBOX_LARGE_IMG_CLOSE', largeImgCloseEl, function( e ) {

				$( '.uix-lightbox__original__target' ).removeClass( 'is-active' );
				$( '.uix-lightbox__container.js-uix-no-fixed, .uix-lightbox__original__target--imgfull' ).removeClass( 'no-fixed-imgEnlarged' );


				//---
				$( this ).removeClass( 'is-active' );
				$( 'html' ).css( 'overflow-y', 'auto' );

			});	
		}


		
		
		
		/*
		 * Click thumbnail to show large photo
		 *
		 * @param  {Number} index           - The target index of large photo.
		 * @param  {Element} obj             - Target large image <li>.
		 * @return {Void}
		 */
		function lightboxThumbSwitch( index, obj ) {
			const $largePhoto = obj.closest( '.uix-lightbox__html' ).find( '.uix-lightbox__photo-container.uix-lightbox__photo-sets-container' ),
				  $thumb      = obj.closest( '.uix-lightbox__html' ).find( '.uix-lightbox__thumb-container li' );

			// show the content container
			const showLightboxContent = function() {
				TweenMax.set( obj.closest( '.uix-lightbox__html' ), {
					css         : {
						'display' : 'block'
					},
					onComplete  : function() {
						TweenMax.to( this.target, 0.5, {
							alpha : 1
						});
					}
				});	
			};
			
			$thumb.removeClass( 'is-active' );
			obj.addClass( 'is-active' );
			
		
            //all items
            TweenMax.set( $largePhoto.find( 'li' ),  {
                css         : {
                    'display' : 'none',
                    'opacity' : 0
                },
                onComplete  : function() {
                    $( this.target ).removeClass( 'is-active' );
                }
            });
            
            
            //current item
            TweenMax.set( $largePhoto.find( 'li' ).eq( index ), {
                css         : {
                    'display' : 'block',
                    'opacity' : 0
                },
                onComplete  : function() {
                    
                    const _cur = this.target;
                    
                    $( _cur ).addClass( 'is-active' );
                    //
                    //Reset the container height
                    const imgClick = new Image();
                    imgClick.src = $largePhoto.find( 'li' ).eq( index ).find( 'img' ).attr( 'src' );
                    imgClick.onload = function() {

                        //remove loading
                        $( loaderEl ).addClass( 'is-loaded' );

                        // show the content container
                        showLightboxContent();	



                        let sw     = window.innerWidth - 30,
                            ow     = this.width,
                            oh     = this.height,
                            ratioH = oh/ow,
                            w      = ( ow > customWidth ) ? customWidth : ow,
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
                        const $lbTarImg = $largePhoto.find( 'li' ).eq( index ).find( '.uix-lightbox__original__target' );
                        if ( oh > window.innerHeight ) {
                            $lbTarImg.addClass( 'uix-lightbox__original__target--imgfull' );
                        } else {
                            $lbTarImg.removeClass( 'uix-lightbox__original__target--imgfull' );
                        }

                        TweenMax.to( _cur, 0.5, {
                            alpha : 1
                        });

                    };//imgClick.onload       
                    
                    

                }
            });	
          
		}
		
		
		/*
		 * Close the lightbox
		 *
		 * @param  {String} url             - The current page URL for history.
		 * @return {Void}
		 */
		function lightboxClose( url ) {
			
			//Detect URL change when AJAX calls are done
			if ( $( wrapperEl ).hasClass( 'js-uix-ajax' ) ) {
				history.pushState( null, null, url );
			}

			//Remove all dynamic classes
			$( wrapperEl ).removeClass( 'js-uix-no-fixed js-uix-ajax' );
			$( closeEl ).removeClass( 'is-active' );
			
			//Add a scroll bar.
			$( 'html' ).css( 'overflow-y', 'auto' );
			
			//Reset current container type
			$( innerEl ).removeClass( 'js-uix-custom js-uix-pure-image' );
			
			
			//close windows
			$( wrapperEl ).hide();
			$( maskEl ).hide();
			
			
			// Unlocks the page
			$.scrollLock( false );
	
			
		}
	
		
		
		    
		
    };

    module.components.pageLoaded.push( module.LIGHTBOX.pageLoaded );
	

	return class LIGHTBOX {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

