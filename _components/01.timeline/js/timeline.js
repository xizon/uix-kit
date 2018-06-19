
/* 
 *************************************
 * <!-- Timeline -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.TIMELINE               = APP.TIMELINE || {};
	APP.TIMELINE.version       = '0.1.5';
    APP.TIMELINE.pageLoaded    = function() {

		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height();
				
				

		/*! 
		 ---------------------------
         Horizontal Timeline
		 ---------------------------
		 */
		if ( windowWidth > 768 ) {
			$( '.list-timeline-container-outer-wrapper.horizontal' ).each( function()  {

				var $this          = $( this ),
					$timeline      = $this.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ),
					dateShowEle    = $timeline.data( 'show-ele' );

				if ( typeof dateShowEle === typeof undefined ) {
					dateShowEle = '#timeline-number-show';
				}	
		
				
				$this.css( 'height', $this.height() - 17 + 'px' ); //Scrollbar width is 17px by default


				$this.find( '.timeline-prev' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, true );
					return false;
				});

				$this.find( '.timeline-next' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, false );
					return false;
				});

				$this.find( '.list-timeline-item' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, $( this ), dateShowEle, false );
					return false;
				});

				
				//Activate the default selection
				timelineUpdate( $this, $this.find( '.list-timeline-item.active' ), dateShowEle, false );
				if ( $this.find( '.list-timeline-item.active' ).index() == 0 ) {
					$this.find( '.timeline-prev' ).addClass( 'disable' );
				}
				

				

			});	
		}

		/*
		 * Method that updates items of timeline
		 *
		 * @param  {object} obj                  - Wrapper of timeline.
		 * @param  {object} iscur                - The current item.
		 * @param  {string} showEle              - Element ID or class name that push the current text.
		 * @param  {boolean} prev                - Whether to slide forward.
		 * @return {void}                        - The constructor.
		 */
		function timelineUpdate( obj, iscur, showEle, prev ) {
			var	itemTotal  = obj.find( '.list-timeline-item' ).length,
				tNav       = obj.find( '.list-timeline-item' ),
				tLoop      = false;
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				
				if ( prev ) {
					tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;
				} else {
					tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;
				}
				
			}
			
			
		
			
			//loop the items
			obj.find( '.timeline-prev, .timeline-next' ).removeClass( 'disable' );
			
			if ( prev ) {
				
				//Previous
				if ( tLoop ) {
					if ( tarIndex < 0 ) tarIndex = itemTotal-1;
				} else {
					if ( tarIndex < 0 ) tarIndex = 0;
					if ( tarIndex == 0 ) obj.find( '.timeline-prev' ).addClass( 'disable' );
					
				}
			} else {
				
				//Next
				if ( tLoop ) {
					if ( tarIndex == itemTotal ) tarIndex = 0;
				} else {
					if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
					if ( tarIndex > itemTotal-2 ) obj.find( '.timeline-next' ).addClass( 'disable' );
					
				}
			}

			
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );

			//scroll left
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			//Push the current text to element 
			$( showEle ).text( obj.find( '.list-timeline-item:eq('+i+')' ).find( '.date' ).text() );
			
			
		}
    
		
    };

    APP.components.pageLoaded.push( APP.TIMELINE.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );



