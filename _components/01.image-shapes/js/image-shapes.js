
/* 
 *************************************
 * <!-- Image Shapes -->
 *************************************
 */	
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.IMAGE_SHAPES               = APP.IMAGE_SHAPES || {};
	APP.IMAGE_SHAPES.version       = '0.0.1';
    APP.IMAGE_SHAPES.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        
		//  Initialize
		shapesInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth  = $window.width();

				// Do stuff here
				shapesInit( windowWidth );
		

			}
		});
		
	
		/*
		 * Initialize Shapes
		 *
		 * @param  {number} w         - Returns width of browser viewport
		 * @param  {number} h         - Returns height of browser viewport
		 * @return {void}             - The constructor.
		 */
		function shapesInit( w ) {
			
			$( '.uix-shape-img' ).each( function()  {
				var $this          = $( this ),
					ranID          = 'uix-shape-img-' + UIX_GUID.newGuid(),
					svgPath        = $this.data( 'path' ),
					svgW           = parseFloat( $this.data( 'svg-const-width' ) ),
					svgH           = parseFloat( $this.data( 'svg-const-height' ) ),
					imgW           = parseFloat( $this.data( 'img-width' ) ),
					svgRatio       = svgW / svgH,
					imgRatio       = null,
					bothWidthRatio = null,
					newSvgHeight   = null,		
					newImgHeight   = null,		
					svgOut         = '',
					curImgW        = imgW,
					curImgH        = null,
					curImgURL      = $this.find( 'img' ).attr( 'src' );

				if ( imgW > w ) {
					imgW = w;
				}


				//Check if the picture is loaded on the page
				var img = new Image();
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


					$this.addClass( 'active' ).html( svgOut );		
				};
				
				
				img.src = curImgURL;

			 
	

			});
			
		}	
		
    };

    APP.components.documentReady.push( APP.IMAGE_SHAPES.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



