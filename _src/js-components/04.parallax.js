
/*! 
 *************************************
 * 4. Parallax
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
        
        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        

		//  Initialize
		parallaxInit();
		$window.on('resize', function() {
			parallaxInit();
		} );
		
		function parallaxInit() {
			$( '.parallax' ).each(function() {
				var $this       = $( this ),
				    dataAtt     = $this.data( 'parallax' ),
					dataH       = $this.data( 'height' ),
					dataW       = $this.data( 'width' ),
					dataImg     = $this.data( 'image-src' ),
					dataSkew    = $this.data( 'skew' ),
					dataSpeed   = $this.data( 'speed' );
				
				
				if( typeof dataAtt === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataAtt = 'fixed';
				}
				
				if( typeof dataW != typeof undefined ) {
					$this.css( {
						'width': dataW 
					} );
	
				}
				
				if( typeof dataH != typeof undefined ) {
					$this.addClass( 'cover' );
					$this.css( {
						'height': dataH
					} );
					$this.find( '.parallax-img' ).css( {
						'max-height': dataH
					} );	
				}
				
				if( typeof dataSpeed === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataSpeed = 0;
				}	
				
				
				if ( 
					$this.hasClass( 'height-10' ) || 
					$this.hasClass( 'height-20' ) || 
					$this.hasClass( 'height-30' ) || 
					$this.hasClass( 'height-40' ) || 
					$this.hasClass( 'height-50' ) || 
					$this.hasClass( 'height-60' ) || 
					$this.hasClass( 'height-70' ) || 
					$this.hasClass( 'height-80' ) || 
					$this.hasClass( 'height-90' ) || 
					$this.hasClass( 'height-100' )
				 ) {		
					
					var newH = $this.height();
					$this.css( {
						'height': newH + 'px'
					} );	
					$this.find( '.parallax-img' ).css( {
						'max-height': newH + 'px'
					} );	
				 }
				
				
				if( typeof dataImg != typeof undefined ) {
					$this.css( {
						'background': 'url(' + dataImg + ') 50% 0 no-repeat ' + dataAtt
					} );
				}
				
				if( typeof dataSkew != typeof undefined ) {
					$this.css( {
						'-ms-transform'     : 'skew(0deg, '+dataSkew+'deg)', /* IE 9 */
						'-webkit-transform' : 'skew(0deg, '+dataSkew+'deg)', /* Chrome, Safari, Opera */
						'transform'         : 'skew(0deg, '+dataSkew+'deg)'
					} );
				}	
				
	
				$this.bgParallax( "50%", dataSpeed );
				
				$window.on( 'scroll', function() {
					var scrolled = $window.scrollTop();
					$this.find( '.parallax-element' ).css( 'margin-top', ( scrolled * dataSpeed ) + 'px' );
				});	
		
			});
		
	
		}
		
	

    };

	

    theme.parallax = {
        pageLoaded : pageLoaded
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );

