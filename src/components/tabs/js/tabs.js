
/* 
 *************************************
 * <!-- Tabs -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TABS               = APP.TABS || {};
	APP.TABS.version       = '0.1.3';
    APP.TABS.documentReady = function( $ ) {

		$( '.uix-tabs' ).each( function( id ) {
			var $this             = $( this ),
			    $li               = $this.find( '.uix-tabs__nav ul > li' ),
				liWidth           = $li.first().outerWidth(),
				liHeight          = $li.first().outerHeight(),
				liNum             = $li.length,
				$contentbox       = $this.find( '.uix-tabs__content' ),
				ulWidth           = $this.data( 'width' ),
				fullwidth         = $this.data( 'fullwidth' ),
				rotation          = $this.data( 'rotation' ),
				rotationRadius    = $this.data( 'rotation-radius' ),
				rotationWapperDeg = $this.data( 'rotation-wrapper-angle' ),
				rotationDisplay   = $this.data( 'rotation-display' ),
				tabBoxID          = id,
				isNumeric         = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			if( typeof fullwidth != typeof undefined && fullwidth == 1 ) {
				$li.css( 'width', ( 100 / liNum ) + '%' );
			}
			
					
			
			if( typeof rotation === typeof undefined ) {
				rotation = false;
			}	
			
			
			if( typeof rotationWapperDeg === typeof undefined ) {
				rotationWapperDeg = 0;
			}	
			
			if( typeof rotationDisplay === typeof undefined ) {
				rotationDisplay = 5;
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
		
				$this.find( '.uix-tabs__nav' ).css( {
					'width'      : rotationRadius * 2 + 'px'
				} );

		
				$this.find( '.uix-tabs__nav ul' ).css( {
					'width'     : rotationRadius * 2 + 'px',
					'height'    : rotationRadius * 2 + 'px',
					'transform' : 'rotate('+parseFloat(rotationWapperDeg)+'deg)'
				} );

				

				//Layout components in a circle layout
				var angle           = 0,
					step            = 2 * Math.PI / rotationDisplay,
					transitionDelay = 0,
					pad             = $this.find( '.uix-tabs__nav ul' ).width();


				$this.find( '.uix-tabs__nav ul > li' ).each( function() { //Can'nt use arrow function here!!!
					// 'this' works differently with arrow fucntions
					var el          = $( this ),
						x           = rotationRadius * Math.cos(angle) - liWidth / 2,
						y           = rotationRadius * Math.sin(angle) - liHeight / 2;


					el.css({
						'transform'        : 'translate('+parseFloat( x )+'px,'+parseFloat( pad/2 + y )+'px)',
						'transition-delay' : transitionDelay + "s"
					})
					.find( '> a' )
					.css({
						'transform'        : 'rotate('+parseFloat(-rotationWapperDeg)+'deg)'
					});


					angle += step;
					transitionDelay += 0.15;
					
					
					
					//Click on the rotation effect
					//----------------------- begin ----------------------
					el.on( 'click', function( e ) {
						
						var increase   = Math.PI * 2 / rotationDisplay,
							n          = $( this ).index(),
							endAngle   = n % rotationDisplay * increase; 


						( function turn() {
							if (Math.abs(endAngle - angle) > 1 / 8) {
								var sign = endAngle > angle ? 1 : -1;
								angle = angle + sign / 8;
								setTimeout(turn, 20);
							} else {
								angle = endAngle;
							}
							
							
						
							$this.find( '.uix-tabs__nav ul > li' ).each( function( index ) {
								var x2           = Math.cos( - Math.PI / 2 + index * increase - angle) * rotationRadius - liWidth / 2,
									y2           = Math.sin( - Math.PI / 2 + index * increase - angle) * rotationRadius + liHeight;

							
								$( this ).css({
									'transform'        : 'translate('+parseFloat( x2 )+'px,'+parseFloat( y2 )+'px)',
									'transition'       : 'none',
									'transition-delay' : 0
								})
								.find( '> a' )
								.css({
									'transform'        : 'rotate('+parseFloat(-rotationWapperDeg)+'deg)'
								});

							});

														 
						})();	
						
					});
					//----------------------- end ----------------------
					
					
				});	


				
			}
			
			
			// Tab Sliding Effext
			if ( $this.find( '.uix-tabs__nav ul > li:first .uix-tabs__marker' ).length == 0 ) {
				$this.find( '.uix-tabs__nav ul > li:first' ).prepend( '<div class="uix-tabs__marker"></div>' );
			}
			
			
			// Tab Fade Effect
			$this.on( 'click', '.uix-tabs__nav ul > li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( '.uix-tabs__nav ul > li' ).removeClass( 'active' );
				$this.find( '.uix-tabs__content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				//sliding marker
				var translateX = $( this ).index() * 100,
					liHeight   = $this.find( '.uix-tabs__nav ul > li:first' ).outerHeight(),
					translateY = $( this ).index() * liHeight;
				
				if ( $( window ).width() <= 768 ) {
					$this.find( '.uix-tabs__marker' ).css({
						'transform'          : 'translateY( '+translateY+'px )'	
					});	
				} else {
					$this.find( '.uix-tabs__marker' ).css({
						'transform'          : 'translateX( '+translateX+'% )'	
					});	
				}

		
				
				return false;
				
				
			});
			
			// Init
			$this.find( '.uix-tabs__nav ul > li.active' ).trigger( 'click' );
			
			//Active current tab
			var url    = window.location.href,
				locArr,
			    loc, 
				curTab;
			
			if ( url.indexOf( '#' ) >= 0 ) {
				
				locArr = url.split( '#' );
			    loc    = locArr[1];
				curTab = $( '.uix-tabs' ).find( 'ul > li:eq('+loc+')' );
				curTab.trigger( 'click' );	
			}
				
			
				
			
		});
		
		
    };

    APP.components.documentReady.push( APP.TABS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




