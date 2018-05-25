/* 
 *************************************
 * <!-- Team Focus -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		
		var teamFocusContent = '.custom-team-focus',
			teamFocusMask    = '.custom-team-focus-mask';
			
			
		$( teamFocusContent ).each( function() {
			var $this           = $( this ),
				thisID          = 'custom-team-focus-' + Math.random()*1000000000000000000,
				hoverWidth      = $this.data( 'hover-width' ),
				targetWidth     = $this.data( 'target-width' ), // Div over width as a percentage 
				targetInfo      = $this.data( 'target-info' ), // Corresponding character details display
				closeBtn        = $this.data( 'close-btn' ),
				el              = '#' + thisID + '> div',
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
			
			if( typeof targetInfo === typeof undefined ) {
				targetInfo = '.custom-team-focus-info';
			}		
		
			total = $( el ).length;
		

			TweenMax.set( el, {
				width: 100/total + '%'
			});
			
			
			//Add an index to each item
			$( el ).each( function( index )  {
				$( this ).attr( 'data-index', index );
			});
			

			//Create item hover overlay effects
			$( el ).on( 'mouseenter', function() {

				var $cur      = $( this ),
					$neighbor = $cur.siblings().not( '.focus' ); //Get the siblings of each element in the set of matched elements

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
				
				//The mask prevent click and hover
				$( teamFocusMask ).show();
				
				$( el ).removeClass( 'active' );
				$cur.addClass( 'active' );
				
				
				
				var $info   = $( targetInfo ),
					cName   = $cur.data( 'name' ),
					cPo     = $cur.data( 'po' ),
					cIntro  = $cur.data( 'intro' );
					
				TweenMax.to( $info, 0.5, {
					css: {
						opacity : 1,
						display : 'block'
					}
				});
				
				$info.find( 'h4 strong' ).html( cName );
				$info.find( 'h4 em' ).html( cPo );
				$info.find( '.intro' ).html( cIntro );
				

				if ( !$cur.hasClass( 'focus' ) ) {
					$( el + '.focus' ).remove();


					TweenMax.set( $cloneItem, {
						alpha      : 0,
						onComplete : function() {

							this.target
								.prependTo( '#' + thisID )
								.addClass( 'focus' );

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

			
			//Close the focus item
			$( document ).on( 'click', el + '.focus, ' + closeBtn + ', ' + targetInfo + ', ' + teamFocusMask, function( e ) {
				e.preventDefault();
				
				//Remove the mask
				$( teamFocusMask ).hide();
				
				TweenMax.to( el, 0.3, {
					width : 100/total + '%',
					ease  : Back.easeOut
				});

				TweenMax.to( el + '.focus', 0.3, {
					alpha : 0,
					onComplete : function() {

						$( el + '.focus' ).remove();
						TweenMax.to( el, 0.3, {
							alpha : 1
						});
					}
				});

				
				var $info = $( targetInfo );
				TweenMax.to( $info, 0.5, {
					css: {
						opacity : 0,
						display : 'none'
					}
				});	
				
				$info.find( 'h4 strong' ).html( '' );
				$info.find( 'h4 em' ).html( '' );
				$info.find( '.intro' ).html( '' );		


			});	
			
			
			
		});	


		
    };

    App.teamFocus = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );




