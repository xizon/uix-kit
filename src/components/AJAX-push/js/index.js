/* 
 *************************************
 * <!-- Ajax Push Content  -->
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


export const AJAX_PUSH_CONTENT = ( ( module, $, window, document ) => {
	if ( window.AJAX_PUSH_CONTENT === null ) return false;
	
	
    module.AJAX_PUSH_CONTENT               = module.AJAX_PUSH_CONTENT || {};
    module.AJAX_PUSH_CONTENT.version       = '0.1.9';
    module.AJAX_PUSH_CONTENT.documentReady = function( $ ) {


        // trigger of AJAX request
        const AJAXPageLinks = '[data-ajax-push-content]';
        
        //all images from pages
        let sources = []; 
        
        //Added timer to prevent page loading errors for a long time
        let timeClockInit; 

		
		/* Need to set it as a global variable for history */
		let ajaxConfig   = {
					"container" :"#my-ajax-demo-push-container",
					"target"    :"#my-ajax-demo-target-container",
					"loading"   :"<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading <em id=\"app-loading\" data-txt=\"{progress}%\"></em>...</span></div>",
					"method"    :"POST"
				},
			thisPageTitle = document.title;
		
        
        // The progress of each page load, using global variables to accurately determine
        let loadedProgress = 0;
        
        //loading animation
        const loadingAnim = function( per ) {
			$( '#app-loading' ).text( $( '#app-loading' ).data( 'txt' ).replace(/\{progress\}/g, per ) );
        }; 
        
        
		
		//Click event
		$( document ).off( 'click.AJAX_PUSH_CONTENT' ).on( 'click.AJAX_PUSH_CONTENT', AJAXPageLinks, function( event ) {
			
			event.preventDefault();
			
            // The progress of each page load
            loadedProgress = 0; 

			//
			const $this               = $( this );
            
			let curURL              = $this.attr( 'href' ),
				config              = $this.data( 'ajax-push-content' );
			

			if ( typeof config == typeof undefined ) {
				config = ajaxConfig;
			}

			
			//The currently URL of link
			if ( typeof curURL === typeof undefined ) {
				curURL = $this.closest( 'a' ).attr( 'href' );
			}


			//Prevent multiple request on click
			if ( $this.data( 'request-running' ) ) {
				return;
			}
			$this.data( 'request-running', true );


	
						
			// Modify the URL without reloading the page
			if( history.pushState ) {
				history.pushState( null, null, curURL );

			} else {
				location.hash = curURL;
			}

			
			//Click on this link element using an AJAX request
			pushAction( $( config.container ), config.target, config.loading, curURL, config.method, $this );


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

            //Empty content that does not exist
            if ( eleTarget == null ) {
                $( AJAXPageLinks ).each( function() {
                    const curConfig = $( this ).data( 'ajax-push-content' );
                    if ( typeof curConfig != typeof undefined ) {
                        $( curConfig.container ).html( '' );
                    }  
                });
            }  

			
			
			
			//Push new content to target container
			const backConfig = $( eleTarget ).data( 'ajax-push-content' );
			
			if ( typeof backConfig != typeof undefined ) {
				pushAction( $( backConfig.container ), backConfig.target, backConfig.loading, goURL, backConfig.method, $( eleTarget ) );	
			}
			
			// Output history button
			//console.log(  $( eleTarget ).data( 'ajax-push-content' ) );
			
			
		});
		
		
		

		/*
		 * Move Animation
		 *
		 * @param  {Element} container       - The target container to which the content will be added.
		 * @param  {String|Boolean} target  - The instance ID or class name returned from the callback data. If it is "false", the push content is empty.
		 * @param  {String} loading         - Content of loading area.
		 * @param  {String} url             - The target URL via AJAX. 
		 * @param  {String} method          - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
		 * @param  {?Element|Boolean} btn     - Current trigger button. Avoid button events if "false".
		 * @return {Void}
		 */
		function pushAction( container, target, loading, url, method, btn ) {
			
			
			if ( container.length == 0 ) return false;

			
			if ( typeof method === typeof undefined || method == '' ) {
			    method = 'POST';
			}
            
            

 
            // Add a request or response interceptor
            const axiosInterceptor = axios.interceptors.request.use(function(config) {
                // Do something before request is sent

                //Display loader
                showLoader( container, loading );

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
            for(let k in defaultPostData) {
                formData.append(k, defaultPostData[k]);
            }

            // Create a request event
            axios({
                timeout: 15000,
                method: method,
                url: url,
                data: formData,
                responseType: 'text',
            })
            .then(function (response) {
                
                const htmlCode = response.data;
                
                //A function to be called if the request succeeds
                const pushContent = ( !target ) ? '' : $( htmlCode ).find( target ).html();
                
                
                //Display loading image when AJAX call is in progress
                
                
                //Remove existing images
                sources = [];

                //Push all images from page
                $( htmlCode ).find( 'img' ).each(function() {
                    sources.push(
                        {
                            "url": this.src,
                            "id": 'img-' + UixGUID.create(),
                            "type": 'img'
                        }
                    );
                }); 
                
                
               //Push all videos from page
                $( htmlCode ).find( '.uix-video__slider > video' ).each(function() {

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
                    hideLoader(container, $( htmlCode ).filter( 'title' ).text(), btn, htmlCode);     
                    
                    
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
                    ajaxSucceeds( container, pushContent, $( htmlCode ).filter( 'title' ).text(), btn );
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
                        if ( htmlCode.indexOf( '<body' ) >= 0 ) {
                            window.location.href = location.href;
                        } else {
                            hideLoader(container, $( htmlCode ).filter( 'title' ).text(), btn, htmlCode);

                        }   
                    

                        // clear loader event
                        clearInterval( timeClockInit );
                        func();
                    }    
                }, 500 );
                
                
            })  
            .catch(function (error) {
                
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    const status = error.response.status;
                    console.log(status);
                    
                    if ( status == 404 || status == 405 ) window.location.href = url;
                    
                    
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    
                    //
                    window.location.href = url;
                    
                } else {
                    // If there was a problem, we need to
                    // dispatch the error condition
                    console.log(error.message);
                }
            });
            
            // Remove an interceptor later
            axios.interceptors.request.eject(axiosInterceptor);


			
			
		}
		
		
		
		/*
		 * A function to be called if the request succeeds
		 *
		 * @param  {String} container    - The target container to which the content will be added.
		 * @param  {String} content      - The data returned from the server
		 * @param  {String} title        - The title of a requested page.
		 * @param  {?Element} btn          - Current trigger button.
		 * @return {Void}
		 */
		function ajaxSucceeds( container, content, title, btn ) {
			
            //If the page resource is not loaded, then the following code is not executed
            if ( loadedProgress < 100 ) return false;
            
            
			//Remove loader
            hideLoader(container, title, btn, content);

			
		}

        
        
        
		
		/*
		 * Remove loader
		 *
         * @param  {Element} container - The instance returned from the request succeeds
         * @param  {String} title      - The title of a requested page.
		 * @param  {?Element} btn      - Current trigger button.
         * @param  {String} content    - The data returned from the server
		 * @return {Void}
		 */
		function hideLoader( container, title, btn, content ) {
			
            
			TweenMax.to( container.find( '.ajax-content-loader' ), 0.5, {
				alpha       : 0,
				onComplete  : function() {
					TweenMax.set( this.target, {
						css         : {
							'display' : 'none'
						}
					});
					
					//The data returned from the server
					container.html( content ).promise().done( function() {
						
						
						// Apply some asynchronism scripts
						$( document ).UixApplyAsyncScripts();

						
						
						//Change the page title
						if ( title ) {
							document.title = title;
						}
						
						
						
						//Prevent multiple request on click
						if ( btn ) {
							btn.data( 'request-running', false );	
						}
						
						
						
					});
					

				},
				
				
				//Determine the direction of a jQuery scroll event
				//Fix an issue for mousewheel event is too fast.
				delay       : 0.5
			});
            
           
		}
		

		
		/*
		 * Display loader
		 *
		 * @param  {Element} container       - The target container to which the content will be added.
		 * @param  {String} loading         - Content of loading area.
		 * @return {Void}
		 */
		function showLoader( container, loading ) {
			

            TweenMax.to( container.find( '.ajax-content-loader' ), 0.3, {
                css: {
                    opacity    : 1
                },
                ease   : Power2.easeOut
            });		


            container.html( '<div class="ajax-content-loader">'+loading+'</div>' ).promise().done( function() {

                //loading animation
                loadingAnim( 0 );

                //loader effect from AJAX request
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
        
        
			
		
    };

    module.components.documentReady.push( module.AJAX_PUSH_CONTENT.documentReady );
	

	return class AJAX_PUSH_CONTENT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

