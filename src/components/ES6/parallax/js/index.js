
/* 
 *************************************
 * <!-- Parallax -->
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
import UixParallax from '@uixkit/core/_global/js/fn/UixParallax';

import '../scss/_style.scss';


export const PARALLAX = ( ( module, $, window, document ) => {
	if ( window.PARALLAX === null ) return false;
	
	
	
	
	module.PARALLAX               = module.PARALLAX || {};
    module.PARALLAX.version       = '0.0.6';
	module.PARALLAX.documentReady = function( $ ) {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;

      
		//  Initialize
		parallaxInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;
				windowHeight = window.innerHeight;

				// Do stuff here
				parallaxInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Initialize parallx settings
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function parallaxInit( w, h ) {
			
			/* Pure parallax scrolling effect without other embedded HTML elements */
			$( '.uix-parallax--el' ).each( function() {
				const $this       = $( this );
                
				let	dataSpeed   = $this.data( 'speed' ),
                    dataEasing  = $this.data( 'transition' );
				
				if ( typeof dataSpeed === typeof undefined ) {
					dataSpeed = 0;
				}
				if ( typeof dataEasing === typeof undefined ) {
					dataEasing = 'none 0s ease 0s';
				} 
				
				
				$this.UixParallax( { 'speed': dataSpeed, 'bg': false, transition : dataEasing } );	
				
		
			});
			
			
			/* Parallax scrolling effect with embedded HTML elements */
			$( '.uix-parallax' ).each( function() {
				const $this            = $( this );
                
				const $curImg          = $this.find( '.uix-parallax__img' ),
					  dataImg          = $curImg.attr( 'src' );
                      
				let	dataSkew         = $this.data( 'skew' ),
					dataSpeed        = $this.data( 'speed' ),
                    dataEasing       = $this.data( 'transition' ),
					dataOverlay      = $this.data( 'overlay-bg' ),
					dataFullyVisible = $this.data( 'fully-visible' ),
                    dataXPos         = $this.data( 'xpos' ),
					curImgH          = null,
					curImgW          = null,
					curSize          = 'cover';
				
			
				if( 
					typeof dataOverlay === typeof undefined ||
					dataOverlay == 'none' ||
					dataOverlay == 0 ||
					dataOverlay == false
				  ) {
					dataOverlay = 'rgba(0, 0, 0, 0)';
				}
				
				if ( typeof dataSpeed === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataSpeed = 0;
				}	
				if ( typeof dataEasing === typeof undefined ) {
					dataEasing = 'none 0s ease 0s';
				} 
                
				if ( typeof dataXPos === typeof undefined ) {
					dataXPos = '50%';
				} 	
				if ( typeof dataFullyVisible === typeof undefined ) {
					dataFullyVisible = false;
				}	
				
				//Trigger a callback when the selected images are loaded
				//Check if the picture is loaded on the page
				const img    = new Image();
				img.onload = function() {
					
					curImgH = $curImg.height();
					curImgW = $curImg.width();
					
					//Custom height for parallax container
					if ( 
						$this.hasClass( 'uix-height--10' ) || 
						$this.hasClass( 'uix-height--20' ) || 
						$this.hasClass( 'uix-height--30' ) || 
						$this.hasClass( 'uix-height--40' ) || 
						$this.hasClass( 'uix-height--50' ) || 
						$this.hasClass( 'uix-height--60' ) || 
						$this.hasClass( 'uix-height--70' ) || 
						$this.hasClass( 'uix-height--80' ) || 
						$this.hasClass( 'uix-height--90' ) || 
						$this.hasClass( 'uix-height--100' )
					 ) {		

						const newH = $this.height();
						$this.css( {
							'height': newH + 'px'
						} );	
						$curImg.css( 'max-height', newH + 'px' );	
					 } else {
						$this.css( {
							'height': $this.height() + 'px'
						} );	
					 }


					//If the ".uix-v-align--absolute" has more content
					if ( w <= 768 ) {

						if ( $this.find( '.uix-v-align--absolute' ).height() >= curImgH ) {
							$this.find( '.uix-v-align--absolute' ).addClass( 'uix-v-align--relative' );
							$curImg.hide();	
						}

					}


					//Resize the background image to cover the entire container and
					//Resize the background image to make sure the image is fully visible
					if ( curImgW > w ) {
						curSize = 'contain';
					} else {
						curSize = 'cover';
					}

					
					//Determine image height and parallax container height
					//If the height is the same, higher or lower than the height of the container height, 
					//be sure to use the cover attribute
					//*** Must be placed before the "dataFullyVisible" condition
					if ( curImgH <= $this.height() ) {
						curSize = 'cover';
					}	
					
					
					//Whether to display all pictures, including the edges
					if ( dataFullyVisible ) {

						if ( curImgW < w ) {
							curSize = 'cover';
						} else {
							curSize = 'contain';
						}
					}


					//console.log( 'Height: ' +curImgH + '===' + $this.height() + ' | Width: ' + curImgW + '===' + w + ' | ' + curSize );

					//Add background image to parallax container
					if ( typeof dataImg != typeof undefined ) {

						if ( Modernizr.cssanimations ) {
							// supported

							$this.css( {
								'background' : 'linear-gradient('+dataOverlay+', '+dataOverlay+'), url(' + dataImg + ') '+dataXPos+' 0/'+curSize+' no-repeat fixed'
							} );
						} else {
							// not-supported

							$this.css( {
								'background' : 'url(' + dataImg + ') '+dataXPos+' 0/'+curSize+' no-repeat fixed'
							} );
						}

					}



					//Apply tilt effect
					if ( typeof dataSkew != typeof undefined && dataSkew != 0 ) {
						
						//Firefox browser will affect parallax effect due to transform
						$this.css( {
							'transform'  : 'skew(0deg, '+dataSkew+'deg)'
						} );
					}


					//Use parallax to background
					$this.UixParallax( { 'speed': dataSpeed, transition : dataEasing, 'bg': { enable: true, xPos: dataXPos } } );


					
					
				};
				
				
				img.src = dataImg;
				
			
		
			});
			
		
	
		}	


	};

	module.components.documentReady.push( module.PARALLAX.documentReady );

	return class PARALLAX {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );







