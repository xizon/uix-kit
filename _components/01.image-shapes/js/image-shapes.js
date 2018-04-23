
/* 
 *************************************
 * <!-- Image Shapes -->
 *************************************
 */	
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		
		
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
			
			$( '.shape-img' ).each( function()  {
				var $this          = $( this ),
					ranID          = 'shape-img-' + Math.random()*1000000000000000000,
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


				//If the src is already set, then the event is firing in the cached case, 
				//before you even get the event handler bound. To fix this, you can loop 
				//through checking and triggering the event based off .complete
				$this.find( 'img' ).one( 'load', function() {
					curImgH   = $( this ).height();
					curImgW   = $( this ).width();
					imgRatio  = curImgW / curImgH;
				}).each(function() {
					if( this.complete ) $( this ).load();
				});	



				//Add a custom shape SVG to the page
				if ( curImgH > 0 ) {


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

				}


			});
			
		}
		
		

		
	

		
    };

    theme.imageShapes = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

