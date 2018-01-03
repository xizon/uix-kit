
/*! 
 *************************************
 * 14. Tabs
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-tabs' ).each(function( id ) {
			var $this             = $( this ),
			    $li               = $this.find( 'ul > li' ),
				liNum             = $li.length,
				$contentbox       = $this.find( '.content' ),
				ulWidth           = $this.data( 'width' ),
				fullwidth         = $this.data( 'fullwidth' ),
				rotation          = $this.data( 'rotation' ),
				rotationPathLen   = $this.data( 'rotation-path-len' ),
				rotationWrapper   = $this.data( 'rotation-wrapper' ),
				rotationReverse   = $this.data( 'rotation-reverse' ),
				rotationMove      = $this.data( 'rotation-move' ),
				rotationAlternate = $this.data( 'rotation-alternate' ),
				
				tabBoxID          = id,
				isNumeric         = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			if( typeof fullwidth != typeof undefined && fullwidth == 1 ) {
				$li.css( 'width', ( 100 / liNum ) + '%' );
			}
			
			if( typeof rotationReverse === typeof undefined ) {
				rotationReverse = false;
			}			
			if( typeof rotationAlternate === typeof undefined ) {
				rotationAlternate = false;
			}		
			
			if( typeof rotation === typeof undefined ) {
				rotation = false;
			}	
			
			if( typeof rotationPathLen === typeof undefined ) {
				rotationPathLen = 360;
			}		
			
			if( typeof rotationWrapper === typeof undefined ) {
				rotationWrapper = 0;
			}		
			
			if( typeof rotationReverse === typeof undefined ) {
				rotationReverse = false;
			}	
			if( typeof rotationMove === typeof undefined ) {
				rotationMove = 0;
			}		
			
			
			$li.each( function( index ) {
				index = index + 1;
				$( this ).attr( 'href', 'javascript:' );
				$( this ).attr( 'data-tab', tabBoxID + '-tabs-show' + index );
			});
			$( $contentbox ).each( function( index ) {
				index = index + 1;
				$( this ).attr( 'id', tabBoxID + '-tabs-show' + index );
			});
			
			
			// Tab Rotation Effect
			if ( rotation ) {
			
				
				//reversing the order of child elements
				if ( rotationReverse ) $this.find( 'ul' ).html( $this.find( 'ul > li' ).get().reverse() );
				
				initLiPos( $this.find( 'ul' ), rotationPathLen, rotationWrapper, false );

			}
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				// Alternate elements
				if ( rotationAlternate ) {
					var beforeCur   = $( this ).nextAll(),
						afterCur    = $( this ).prevAll();

					
					if ( beforeCur.length > 0 ) {
						beforeCur.remove();
						$this.find( 'ul' ).prepend( beforeCur );	
						
					}

					if ( afterCur.length > 0 ) {
						//afterCur.remove();
						//$this.find( 'ul' ).append( afterCur );	
					}			
				}


				
				// Tab Rotation Effect
				if ( rotation ) {
					
					initLiPos( $this.find( 'ul' ), rotationPathLen, rotationWrapper, index * rotationMove );

				}
				
				return false;
				
				
			});
			
			// Alternate elements
			$this.find( 'ul > li.active' ).trigger( 'click' );
			
			
			// Initialize li position
			function initLiPos( liWrapper, pathLen, degWrapper, clickDeg ) {
				
				var liArr      = liWrapper.find( 'li' ),
					angleStart = -360;
				
			
				if ( !isNumeric.test( clickDeg ) ) {
					clickDeg = 0;	
				}
				
				if ( rotationAlternate ) {
					clickDeg = 0;
				}
				
				

					
				liWrapper.css({ 
							'-webkit-transform' : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)',
							'-ms-transform'     : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)',
							'transform'         : 'rotate('+ parseFloat( degWrapper - clickDeg ) +'deg)'
						});

		

				//Re-arrange elements
				for( var i = 0; i < liArr.length; i++ ) {

					var deg = i * parseFloat( pathLen / liArr.length );
					
					// Rotate animation
					$( { deg: angleStart } ).animate( { deg: deg }, {
						step: function( now ) {



							if ( !isNumeric.test( clickDeg ) ) {
								clickDeg = 0;	
							}

							$( liArr[i] )
							   .css({ 
										'-webkit-transform' : 'rotate('+parseFloat( now )+'deg)',
										'-ms-transform'     : 'rotate('+parseFloat( now )+'deg)',
										'transform'         : 'rotate('+parseFloat( now )+'deg)'
									})
							   .find( 'a' )
							   .css({ 
										'-webkit-transform' : 'rotate('+ -parseFloat( now - clickDeg + degWrapper )+'deg)',
										'-ms-transform'     : 'rotate('+ -parseFloat( now - clickDeg + degWrapper )+'deg)',
										'transform'         : 'rotate('+ -parseFloat( now - clickDeg + degWrapper )+'deg)'
									});



						}, duration: 0 });

				}

			
				
			
			}
			
			

			
			
				
			
		});
		

		
	}
		
      
    theme.customTabs = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

