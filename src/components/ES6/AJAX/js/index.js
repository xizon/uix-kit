/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
 *************************************
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


export const AJAX_PAGE_LOADER = ( ( module, $, window, document ) => {
	if ( window.AJAX_PAGE_LOADER === null ) return false;
	
	
	
    module.AJAX_PAGE_LOADER               = module.AJAX_PAGE_LOADER || {};
    module.AJAX_PAGE_LOADER.version       = '0.1.7';
    module.AJAX_PAGE_LOADER.documentReady = function( $ ) {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
        
        //all images from pages
        let sources = []; 

        //Added timer to prevent page loading errors for a long time
        let timeClockInit;   
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		const quietPeriod         = 500, //Do not change it
			  animationTime       = 1000,//According to page transition animation changes
			  loaderRemoveDelay   = 500,
			  AJAXPageLinks       = '[data-ajax-page]',
			  $navs               = $( AJAXPageLinks ).parent().parent().find( 'li' ),
			  total               = $navs.length,
			  $sectionsContainer  = $( '.uix-ajax-load__fullpage-container' ),
			  ajaxContainer       = '.ajax-container',
			  curAjaxPageID       = $( ajaxContainer ).data( 'ajax-page-id' );
        
        let lastAnimation = 0;
		
        
        // The progress of each page load, using global variables to accurately determine
        let loadedProgress = 0;
		
        //loading animation
        const loadingAnim = function( per ) {
			$( '#app-loading' ).text( $( '#app-loading' ).data( 'txt' ).replace(/\{progress\}/g, per ) );
        }; 
        
        
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		
		
		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
	
		//Activate the first item
		if ( $( '.js-uix-ajax-load__container' ).length == 0 ) {
			moveTo( $( ajaxContainer ), false, 'down', 0, false );
		} else {
			//Activate navigation from AJAX request
			if ( typeof curAjaxPageID != typeof undefined ) $navs.eq( curAjaxPageID ).addClass( 'is-active' );
		}

		
		
		
		//Detect URL change
		window.addEventListener( 'popstate', function( e ) {
			moveTo( $( ajaxContainer ), false, 'down', 0, false );
		});

		
		

		/* 
		 ====================================================
		 *  AJAX Interaction
		 ====================================================
		 */
		/*
		 * Initialize the clickable ajax links
		 *
		 * @return {Void}
		 */
		function ajaxInit() {
			if ( windowWidth <= 768 ) {
				$( AJAXPageLinks ).data( 'mobile-running', true );
			} else {
				$( AJAXPageLinks ).data( 'mobile-running', false );
			}
			
			
		}
			
		ajaxInit();
		$window.on( 'resize', function() {
			windowWidth = window.innerWidth;
			ajaxInit();
		} );	

		

		
		/*
		 * Call AJAX on click event for "single pages links"
		 *
		 */
		$( document ).off( 'click.AJAX_PAGE_LOADER' ).on( 'click.AJAX_PAGE_LOADER', AJAXPageLinks, function( e ) {
			
			//Prevents third-party plug-ins from triggering
			if ( $( this ).data( 'mobile-running' ) ) {
				return;
			}
			
			e.preventDefault();
			
            
            // The progress of each page load
            loadedProgress = 0; 

			//
			const $this = $( this );
            const curIndex = $this.attr( 'data-index' );
            let curURL = $this.attr( 'href' ); 

			
			//The currently URL of link
			if ( typeof curURL === typeof undefined ) {
				curURL = $this.closest( 'a' ).attr( 'href' );
			}
			
			
			//Prevent multiple request on click
			if ( $( AJAXPageLinks ).data( 'request-running' ) ) {
				return;
			}
			$( AJAXPageLinks ).data( 'request-running', true );

			
						
			// Modify the URL without reloading the page
			if( history.pushState ) {
				history.pushState( null, null, curURL );

			} else {
				location.hash = curURL;
			}
			
			
			//Click on this link element using an AJAX request
			const dir = ( $navs.filter( '.is-active' ).find( '> a' ).attr( 'data-index' ) > curIndex ) ? 'up' : 'down';
			moveTo( $( ajaxContainer ), curURL, dir, curIndex, false );
			
			
			
			return false;
			
			
		});

		//Detect URL change & Fire click event
		window.addEventListener( 'popstate', function( e ) {
		
			let eleTarget = null,
				goURL     = location.href;
			
			$( AJAXPageLinks ).each( function() {
				
				//don't use $( this ).attr( 'href' )
				
				if ( this.href === location.href ) {
					eleTarget = this;
					goURL = this.href;
				}
			});

		
			const pageIndex = $( eleTarget ).data( 'index' );
			
			//Push new content to target container
			if ( typeof pageIndex != typeof undefined ) {
				moveTo( $( ajaxContainer ), goURL, 'down', pageIndex, false );
			}
			
			// Output history button
			//console.log(  $( eleTarget ).data( 'index' ) );
			
			
		});
		
		
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}
		 */
		function scrollMoveInit( event, dir ) {
	
			const timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $( ajaxContainer ), false, 'down', false, true );
				
			} else {
				//scroll up
				moveTo( $( ajaxContainer ), false, 'up', false, true );
				
			}
			

			
			lastAnimation = timeNow;
		}
		
		
		/*
		 * Move Animation
		 *
		 * @param  {Element} container    - The instance returned from the request succeeds 
		 * @param  {String} url          - The target URL via AJAX.
		 * @param  {String} dir          - Rolling direction indicator.
		 * @param  {Number} customIndex  - User-specified index value, located on the corresponding AJAX hyperlink.
		 * @param  {Boolean} wheel       - Whether to enable mouse wheel control.
		 * @return {Void}
		 */
		function moveTo( container, url, dir, customIndex, wheel ) {
			const index     = parseFloat( $navs.filter( '.is-active' ).find( '> a' ).attr( 'data-index' ) );
			const isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
            
            let	nextIndex = null;
			
		
			//If there is a custom index, it is enabled first
			if ( isNumeric.test( customIndex ) ) {
				nextIndex = customIndex;
				
			} else {
				if ( dir == 'down' || dir === false ) {
					nextIndex = index + 1;
				} else {
					nextIndex = index - 1;
				}	
			}

			
			if ( nextIndex <= parseFloat( total - 1 ) && nextIndex >= 0 ) {
				
				if ( nextIndex > parseFloat( total - 1 ) ) nextIndex = parseFloat( total - 1 );
				if ( nextIndex < 0 ) nextIndex = 0;
				

		
				//Prevents third-party plug-ins from triggering
				if ( $navs.eq( nextIndex ).find( '> a' ).data( 'mobile-running' ) ) {
					return;
				}
			
				
				//Activate navigation from AJAX request
				$navs.removeClass( 'is-active' );
				$navs.eq( nextIndex ).addClass( 'is-active' );

				
				//Use automatic indexing when no URLs come in.
				if ( !url || typeof url === typeof undefined ) {
					url = $navs.eq( nextIndex ).find( '> a' ).attr( 'href' );
				}
				

						
				// Modify the URL without reloading the page when mouse wheel
				if ( wheel ) {
					const turl = $navs.eq( nextIndex ).find( '> a' ).attr( 'href' );
					
					if( history.pushState ) {
						history.pushState( null, null, url );

					} else {
						location.hash = turl;
					}
		
				}

 
				//Click on this link element using an AJAX request
				$.ajax({
					timeout  : 15000,
					url      : url,
					method   : ( typeof container.data( 'ajax-method' ) === typeof undefined ) ? 'POST' : container.data( 'ajax-method' ),
					dataType : 'html',
					data     : {
						action  : 'load_singlepages_ajax_content'
					},
					beforeSend: function() {

                        //Display loader
                        showLoader();

					}
                })
                .done( function (response) { 
                    
                    //A function to be called if the request succeeds
                    //Display loading image when AJAX call is in progress
                    
                    //Remove existing images
                    sources = [];

                    //Push all images from page
                    $( response ).find( 'img' ).each(function() {
                        sources.push(
                            {
                                "url": this.src,
                                "id": 'img-' + UixGUID.create(),
                                "type": 'img'
                            }
                        );
                    }); 
                    
                    
                    //Push all videos from page
                    $( response ).find( '.uix-video__slider > video' ).each(function() {

                        let _src = $( this ).find( 'source:first' ).attr( 'src' );
                        if ( typeof _src === typeof undefined ) _src = $( this ).attr( 'src' );     

                        sources.push(
                            {
                                "url": _src,
                                "id": 'video-' + UixGUID.create(),
                                "type": 'video'
                            }
                        );
                    });    


                    //Execute after all images have loaded
                    let per;
                    let perInit = 1;
                    if ( sources.length == 0 ) {
                        per = 100;

                        //loading animation
                        loadingAnim( per );
                        
                        //Remove loader
                        const oldContent = container.html();
                        hideLoader(container, $( response ).filter( 'title' ).text(), dir, oldContent, response);

                        
                    }
                    
                    
                    const loadImages = function() {
                        let promises = [];

                        for (let i = 0; i < sources.length; i++) {

                            if ( sources[i].type == 'img' ) {

                                ///////////
                                // IMAGE //
                                ///////////   

                                promises.push( 

                                    new Promise(function(resolve, reject) {

                                        const img = document.createElement("img");
                                        img.crossOrigin = "anonymous";
                                        img.src = sources[i].url;

                                        img.onload = function(image) {
                                          //Compatible with safari and firefox
                                          if ( typeof image.path === typeof undefined ) {
                                              return resolve(image.target.currentSrc);
                                          } else {
                                              return resolve(image.path[0].currentSrc);
                                          }
                                        };  

                                    }).then( textureLoaded )
                                );



                            } else {



                                ///////////
                                // VIDEO //
                                ///////////    

                                promises.push( 
                                    new Promise( function(resolve, reject) {

                                        $( '#' + sources[i].id ).one( 'loadedmetadata', resolve );

                                        return resolve( sources[i].url);


                                    }).then( textureLoaded )
                                );



                            }                   

                        }



                        return Promise.all(promises);
                    };


                    const textureLoaded = function( url ) {
                      
                        //loading
                        per = parseInt( 100 * ( perInit / sources.length ) );

                        console.log( 'progress: ' + per + '%' );

                        if ( isNaN( per ) ) per = 100;  
                        
                        // The progress of each page load
                        loadedProgress = per;
                        

                        //loading animation
                        loadingAnim( per ); 

                        let texture = null;

                        perInit++;
                        return per;   
                        
                    };
  
                    

                    const func = function() {
                        ajaxSucceeds( dir, container, $( response ).find( '.js-uix-ajax-load__container' ).html(), $( response ).filter( 'title' ).text() ); 
                    };


                    //images loaded
                    //Must be placed behind the loadImages()
                    loadImages().then( function( images ) {
                        clearInterval( timeClockInit );
                        func();
                    });



                    //Calculating page load time
                    const timeLimit = 10,
                          timeStart = new Date().getTime();

                    //Prevent duplicate runs when returning to this page
                    if ( timeClockInit ) {
                        clearInterval( timeClockInit );
                    } 


                    timeClockInit = setInterval( function() {

                        //Converting milliseconds to minutes and seconds
                        let _time = (new Date().getTime() - timeStart) / 1000;

                        if ( _time >= timeLimit ) {
                            console.log( 'Page load timeout!' );
                            
                            //Remove loader
                            if ( response.indexOf( '<body' ) >= 0 ) {
                                window.location.href = location.href;
                            } else {
                                const oldContent = container.html();
                                hideLoader(container, $( response ).filter( 'title' ).text(), dir, oldContent, response);

                            }
                        
                            
                            // clear loader event
                            clearInterval( timeClockInit );
                            func();
                        }    
                    }, 500 );

                  
                    
                })
                .fail( function (jqXHR, textStatus, errorThrown) { 
					window.location.href = url;
                });
           	
				
				
			}
			
	
			
		}
		
		
		
		/*
		 * A function to be called if the request succeeds
		 *
		 * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {Element} container - The instance returned from the request succeeds
		 * @param  {String} content   - The data returned from the server
		 * @param  {String} title        - The title of a requested page.
		 * @return {Void}
		 */
		function ajaxSucceeds( dir, container, content, title ) {
            
            //If the page resource is not loaded, then the following code is not executed
            if ( loadedProgress < 100 ) return false;
			
   
			//Remove loader
            const oldContent = container.html();
            hideLoader(container, title, dir, oldContent, content);

			
			
		}
		
		
		/*
		 * Remove loader
		 *
         * @param  {Element} container - The instance returned from the request succeeds
         * @param  {String} title     - The title of a requested page.
		 * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {String} oldContent   - The old data returned from the server
         * @param  {String} content   - The data returned from the server
		 * @return {Void}
		 */
		function hideLoader( container, title, dir, oldContent, content ) {
			
			TweenMax.to( '.uix-ajax-load__loader', 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( this.target, {
						css         : {
							'display' : 'none'
						}
					});
					

					//The data returned from the server
					container.html( content ).promise().done( function() {
						
						//Transition effect between two elements.
						eleTransitionEff( dir, oldContent, content );

						
						//Change the page title
						if ( title ) {
							document.title = title;
						}
						

						//Prevent multiple request on click
						$( AJAXPageLinks ).data( 'request-running', false );	
						
					});
					

	
					
				},
				delay       : loaderRemoveDelay/1000
			});   
            
           
			
		}
		

		
		/*
		 * Display loader
		 *
		 * @return {Void}
		 */
		function showLoader() {
			
            //loading animation
            loadingAnim( 0 );

            //loader effect from AJAX request
            TweenMax.set( '.uix-ajax-load__loader', {
                css         : {
                    'display' : 'block'
                },
                onComplete  : function() {
                    TweenMax.to( this.target, 0.5, {
                        alpha : 1
                    });
                }
            });
		}
        
        
        
        
		/*
		 * Transition effect between two elements.
		 *
		 * @param  {String} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @param  {String} oldContent     - A string of HTML to set as the content of matched old element.
		 * @param  {String} newContent     - A string of HTML to set as the content of matched new element.
		 * @return {Void}
		 */
		function eleTransitionEff( dir, oldContent, newContent ) {
			
			const $originalItem   = $sectionsContainer.find( '> section' ),
				$cloneItem      = $originalItem.clone();

			
			//Reset the original element
			$originalItem.css( {
				'z-index': 1
			} );
			

			//Clone the last element to the first position
			$cloneItem
				.prependTo( $sectionsContainer )
				.css( {
				    'z-index': 2,
				    'transform': 'translateY('+( ( dir == 'down' || dir === false ) ? windowHeight : -windowHeight )+'px)'
				} )
			    //Add the latest content to the new container
			    .find( ajaxContainer )
			    .html( newContent );

			
			$originalItem.first().find( ajaxContainer ).html( oldContent ).promise().done( function() {
						

				TweenMax.to( $originalItem.first(), animationTime/1000, {
					y          : ( dir == 'down' || dir === false ) ? -windowHeight/2 : windowHeight/2,
					ease       : Power2.easeOut
				});		

				

				TweenMax.to( $cloneItem, animationTime/1000, {
					y          : 0,
					ease       : Power2.easeOut,
					onComplete : function() {

						//Remove duplicate elements
						$originalItem
							.first()
							.remove();


						// Apply some asynchronism scripts
						$( document ).UixApplyAsyncScripts();
						
						
					}
				});
	
			});
			
			
		}
		

		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		let startY = 0;
		const onTouchStart = function ( e ) {
			const touches = e.touches;
			if ( touches && touches.length ) {
				startY = touches[0].pageY;
				
			}
		};

		
		const onDeviceWheel = function ( e ) {
			
			//Gets a value that indicates the amount that the mouse wheel has changed.
			let dir, delta, mobileDeltaY = null;
			
			const touches = e.touches;
			if ( touches && touches.length ) {
				mobileDeltaY = startY - touches[0].pageY;
			} else {
				delta = Math.max(-1, Math.min(1, (-e.deltaY)));
			}
			
		
			if ( mobileDeltaY != null ) {
				
				if ( mobileDeltaY >= 50 ) {
					//--- swipe up
				    dir = 'up';
				}
				if ( mobileDeltaY <= -50 ) {
					//--- swipe down
					dir = 'down';
				
				}	
			} else {
				if( delta < 0 ) { 
					//scroll down
					dir = 'down';

				} else {
					//scroll up
					dir = 'up';
				}	
			}

			
			scrollMoveInit( e, dir );
			
		};
		

		window.addEventListener( 'wheel', onDeviceWheel, browser.supportsPassive ? { passive: true } : false );
		window.addEventListener( 'touchstart', onTouchStart, browser.supportsPassive ? { passive: true } : false );
		window.addEventListener( 'touchmove', onDeviceWheel, browser.supportsPassive ? { passive: true } : false );
		
		
    };

    module.components.documentReady.push( module.AJAX_PAGE_LOADER.documentReady );

	return class AJAX_PAGE_LOADER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


