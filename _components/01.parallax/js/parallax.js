
/*! 
 *************************************
 * Parallax
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
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				parallaxInit();
		

			}
		});
		
		
		function parallaxInit() {
			$( '.parallax' ).each(function() {
				var $this       = $( this ),
				    dataAtt     = $this.data( 'parallax' ),
					dataH       = $this.data( 'height' ),
					dataW       = $this.data( 'width' ),
					dataImg     = $this.data( 'image-src' ),
					dataSkew    = $this.data( 'skew' ),
					dataSpeed   = $this.data( 'speed' ),
					dataElSpeed = $this.find( '.parallax-element' ).data( 'el-speed' ),
					windowWidth = $window.width();
				
				
				if( typeof dataAtt === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataAtt = 'fixed';
				}
				
				if( typeof dataW != typeof undefined ) {
					$this.css( {
						'width': dataW 
					} );
	
				}
				
				if( typeof dataH != typeof undefined ) {
					
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
				
				if( typeof dataElSpeed === typeof undefined ) { // If there is no data-xxx, save current source to it
					dataElSpeed = 0;
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
				
				
				//If the ".pos-vertical-align" has more content
				if ( windowWidth <= 768 ) {
					
					if ( $this.find( '.pos-vertical-align' ).height() >= $this.find( '.parallax-img' ).height() ) {
						$this.find( '.pos-vertical-align' ).addClass( 'relative' );
						$this.find( '.parallax-img' ).hide();	
					}
					

				}

				
				
				if( typeof dataImg != typeof undefined ) {
					$this.css( {
						'background': 'url(' + dataImg + ') 50% 0 no-repeat ' + dataAtt
					} );
				}
				
				if( typeof dataSkew != typeof undefined ) {
					$this.css( {
						'transform'         : 'skew(0deg, '+dataSkew+'deg)'
					} );
				}	
				
	
				$this.bgParallax( "50%", dataSpeed );
				
				$window.on( 'scroll touchmove', function() {
					var scrolled = $window.scrollTop();
					$this.find( '.parallax-element' ).css( 'margin-top', ( scrolled * dataElSpeed ) + 'px' );
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


