
/* 
 *************************************
 * <!-- Image Shapes -->
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


import '../scss/_style.scss';


export const IMAGE_SHAPES = ( ( module, $, window, document ) => {
	if ( window.IMAGE_SHAPES === null ) return false;
	
	
	
    module.IMAGE_SHAPES               = module.IMAGE_SHAPES || {};
    module.IMAGE_SHAPES.version       = '0.0.1';
    module.IMAGE_SHAPES.documentReady = function( $ ) {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
        
		//  Initialize
		shapesInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;

				// Do stuff here
				shapesInit( windowWidth );
		

			}
		});
		
	
		/*
		 * Initialize Shapes
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function shapesInit( w ) {
			
			$( '.uix-shape-img' ).each( function()  {
				const $this          = $( this );
                
				const ranID          = 'uix-shape-img-' + UixGUID.create(),
					  svgPath        = $this.data( 'path' ),
					  svgW           = parseFloat( $this.data( 'svg-const-width' ) ),
					  svgH           = parseFloat( $this.data( 'svg-const-height' ) ),
					  svgRatio       = svgW / svgH,
                      curImgURL      = $this.find( 'img' ).attr( 'src' );
                
                let imgW           = parseFloat( $this.data( 'img-width' ) );
				let	imgRatio       = null,
					bothWidthRatio = null,
					newSvgHeight   = null,		
					newImgHeight   = null,		
					svgOut         = '',
					curImgW        = imgW,
					curImgH        = null;

				if ( imgW > w ) {
					imgW = w;
				}


				//Check if the picture is loaded on the page
				const img = new Image();
				img.onload = function() {
					curImgH   = $this.find( 'img' ).height();
					curImgW   = $this.find( 'img' ).width();
					imgRatio  = curImgW / curImgH;	

					//Add a custom shape SVG to the page
					bothWidthRatio = imgW / svgW;
					newSvgHeight   = imgW / svgRatio;
					newImgHeight   = svgW / imgRatio;

					svgOut += '<svg fill-rule="evenodd" clip-rule="evenodd" width="'+imgW+'px" height="'+newSvgHeight+'px" viewBox="0 0 '+imgW+' '+newSvgHeight+'" >';
					svgOut += '	<pattern id="'+ranID+'" patternUnits="userSpaceOnUse" width="'+svgW+'" height="'+svgH+'">';
					svgOut += '		  <image xlink:href="'+curImgURL+'" width="'+svgW+'px" height="'+newImgHeight+'px" x="0" y="0" />';
					svgOut += '	</pattern> ';   
					svgOut += '	<path fill="url(#'+ranID+')" transform="scale('+bothWidthRatio+')" d="'+svgPath+'"/>';
					svgOut += '</svg>';	


					$this.addClass( 'is-active' ).html( svgOut );		
				};
				
				
				img.src = curImgURL;

			 
	

			});
			
		}	
		
    };

    module.components.documentReady.push( module.IMAGE_SHAPES.documentReady );
	

	return class IMAGE_SHAPES {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

