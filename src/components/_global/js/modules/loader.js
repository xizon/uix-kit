/* 
 *************************************
 * <!-- Loader -->
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
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


export const LOADER = ( ( module, $, window, document ) => {
	if ( window.LOADER === null ) return false;
	
	module.LOADER               = module.LOADER || {};
    module.LOADER.version       = '0.0.5';
	module.LOADER.documentReady = function( $ ) {


		// Disable devices scaling
		//-------------------------------------	
		document.addEventListener( 'touchstart', function (event) {
			if(event.touches.length>1){
				event.preventDefault();
			}
		});
		
		let lastTouchEnd = 0;
		document.addEventListener( 'touchend', function (event) {
			let now = (new Date()).getTime();
			if( now-lastTouchEnd <= 300 ){
				event.preventDefault();
			}
			lastTouchEnd=now;
		},false);
		
		
        
		// Loader Process
		//-------------------------------------	

        // Detect if video.load is successful or not 
        let videos = [];
        let videosTotal = 0;
        let videosLoaded = 0;
        $( '.uix-video__slider > video' ).each( function()  {
            videos.push( $( this ) );
        });
        
        videosTotal = videos.length;
        console.log( 'videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded );


        
        // Loading progress event
        let loadedPercent = 0;
        let imgTotal = 0;
        const loadingAnim = function( per ) {
			$( '.uix-loader-progress > span' ).text( $( '.uix-loader-progress' ).data( 'txt' ).replace(/\{progress\}/g, per) );
            TweenMax.to( '.uix-loader-progress__line', 0.3, {
                width: per/100.0 * window.innerWidth
            });   
        };
        
		$( 'body' ).waitForImages().progress( function( loaded, count, success ) {
			
            imgTotal = count;
            
			let per = parseInt( loaded/(count - (1-videosTotal) ) * 100 );
			
            //
			if ( $( 'img' ).length <= 1 ) {
				per = 100;
			}
			
            //
			if ( isNaN( per ) ) per = 100;
            
            //
            loadedPercent = per;


            //animation classes for loader
            for (let i = 1; i < 10; i++ ) {
                if ( per < i*10 ) $( 'body' ).addClass( 'loaded' + i );
            } 


            
            
            
            //loading animation
            loadingAnim( per );

			
		}).done( function() {
            
            
            //Event after loading is complete
            // Main scene
            console.log( 'loadedPercent: ' + loadedPercent + ', imageTotal: ' + imgTotal );
            mainObjLoader( loadedPercent, imgTotal );

            
            
		});    
        
        /*
         * Main Object Loader
         *
         * @param  {Number} loadedPercent  - The percentage value after the page loads the image.
         * @param  {Number} imgTotal       - The total number of imags.
         * @return {Void}
         */ 
        function mainObjLoader( loadedPercent, imgTotal ) {
            
            let remainedPercentComplete = 0;
            
            const loadedFun = function() {
                
                //loading animation
                loadingAnim( 100 );
                
                
                //animation classes for loader
                $( 'body' ).addClass( 'loaded10' );
                
                // Remove loader
                TweenMax.to( '.uix-loader, .uix-loader-progress, .uix-loader-progress__line', 0.5, {
                    css: {
                        opacity : 0,
                        display : 'none'
                    }
                });
                
                
                
                //page animation when elements loaded
                //...
               
                
            };
            
            
            
            //
            if ( loadedPercent < 100 ) {
                
                videos.forEach( function( element ) {

                    let _src = element.find( 'source:first' ).attr( 'src' );
                    if ( typeof _src === typeof undefined ) _src = element.attr( 'src' );

                    const video    = document.getElementById( element.attr( 'id' ) ),
                          videoURL = _src;

                    video.addEventListener( 'loadedmetadata', function( e ) {

                        //Video has started loading successfully
                        videosLoaded++;
                        
                        //get remained percent
                        remainedPercentComplete = (1 - videosLoaded / videosTotal) * (100 - loadedPercent);
                        
                        //current percent
                        let currentPercent = loadedPercent + ( (100 - loadedPercent) - remainedPercentComplete );
                        
                        //loading animation
                        loadingAnim( currentPercent );
                        
                        // All videos loaded
                        if ( currentPercent == 100 ) {
                            loadedFun();
                        }   
                        
                        //debug
                        console.log( 'remainedPercentComplete: ' + remainedPercentComplete + ', currentPercent: ' + currentPercent );
                        console.log( 'videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded );

                    }, false);	

                    video.src = videoURL;

                });
    
            } else {
                // All videos loaded
                if ( remainedPercentComplete == 0 ) {
                    loadedFun();
                }  
            }
            
            
        }
                
        


	};

	module.components.documentReady.push( module.LOADER.documentReady );

	return class LOADER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

