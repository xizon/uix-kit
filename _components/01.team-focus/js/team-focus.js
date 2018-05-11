/* 
 *************************************
 * <!-- Team Focus -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		
		
		$( '.custom-team-focus' ).each( function() {
			var $this           = $( this ),
				thisID          = 'custom-team-focus-' + Math.random()*1000000000000000000,
				hoverWidth      = $this.data( 'hover-width' ),
				targetWidth     = $this.data( 'target-width' ), // Div over width as a percentage 
				closeBtn        = $this.data( 'close-btn' ),
				el              = '#' + thisID + '> .item',
				total           = 0;
			
			
			
			$this.attr( 'id', thisID );
			
		
			if( typeof hoverWidth === typeof undefined ) {
				hoverWidth = 20;
			}	
			
			if( typeof targetWidth === typeof undefined ) {
				targetWidth = 80;
			}	
			
			if( typeof closeBtn === typeof undefined ) {
				closeBtn = '.close';
			}
		
			total = $( el ).length;
		

			TweenMax.set( el, {
				width: 100/total + '%'
			});
			
			
			

			//Create item hover overlay effects
			$( el ).on( 'mouseenter', function() {

				var $cur      = $( this ),
					$neighbor = $cur.siblings().not( '.active' ); //Get the siblings of each element in the set of matched elements

				TweenMax.to( $cur, 0.3, {
					width: hoverWidth + '%'
				});

				TweenMax.to( $neighbor, 0.3, {
					width: ( 100 - hoverWidth )/( total - 1 ) + '%'
				});

			} );

			
			//Display the target item
			$( document ).on( 'click', el, function( e ) {
				e.preventDefault();

				var $cur        = $( this ),
					$neighbor   = $cur.siblings(), //Get the siblings of each element in the set of matched elements
					$cloneItem  = $cur.clone();

				if ( !$cur.hasClass( 'active' ) ) {
					$( el + '.active' ).remove();


					TweenMax.set( $cloneItem, {
						alpha      : 0,
						onComplete : function() {

							this.target
								.prependTo( '#' + thisID )
								.addClass( 'active' );

						}
					});

					TweenMax.to( el, 0.3, {
						alpha      : 1
					});


					TweenMax.to( $cur, 0.3, {
						alpha : 0
					});
					
					TweenMax.to( $neighbor, 0.3, {
						alpha : 0.3
					});
				}



			});

			
			//Close the actived item
			$( document ).on( 'click', el + '.active, ' + closeBtn, function( e ) {
				e.preventDefault();


				
				TweenMax.to( el, 0.3, {
					width : 100/total + '%',
					ease  : Back.easeOut
				});

				TweenMax.to( el + '.active', 0.3, {
					alpha : 0,
					onComplete : function() {

						$( el + '.active' ).remove();
						TweenMax.to( el, 0.3, {
							alpha : 1
						});
					}
				});



			});	
			
			
			
		});	


		
    };

    App.teamFocus = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );




