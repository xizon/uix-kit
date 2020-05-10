
/* 
 *************************************
 * <!-- Timeline -->
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


export const TIMELINE = ( ( module, $, window, document ) => {
	if ( window.TIMELINE === null ) return false;
	
	

    module.TIMELINE               = module.TIMELINE || {};
    module.TIMELINE.version       = '0.1.8';
    module.TIMELINE.pageLoaded    = function() {

        const $window          = $( window );
        let	windowWidth        = window.innerWidth,
            windowHeight       = window.innerHeight;
				

		/*! 
		 ---------------------------
         Horizontal Timeline
		 ---------------------------
		 */
		$( '.uix-timeline__container-wrapper.js-uix-timeline' ).each( function()  {

            const $this          = $( this );

            const $container     = $this.find( '.uix-timeline__container' ),
                  $timeline      = $container.find( '> .uix-timeline' );


            const dir = $this.hasClass( 'is-vertical' ) ? 'vertical' : 'horizontal';

            let	  dateShowEle    = $timeline.data( 'show-ele' );

            if ( typeof dateShowEle === typeof undefined ) {
                dateShowEle = '#timeline-number-show';
            }	



            $this.find( '.uix-timeline__btn--prev' ).off( 'click' ).on( 'click', function( e ) {
                e.preventDefault();
                timelineUpdate( $this, null, dateShowEle, true, dir );
                return false;
            });

            $this.find( '.uix-timeline__btn--next' ).off( 'click' ).on( 'click', function( e ) {
                e.preventDefault();
                timelineUpdate( $this, null, dateShowEle, false, dir );
                return false;
            });

            $this.find( '.uix-timeline__item .uix-timeline__item__img' ).off( 'click' ).on( 'click', function( e ) {
                e.preventDefault();
                timelineUpdate( $this, $( this ).parent(), dateShowEle, false, dir );
                return false;
            });


            //Activate the default selection
            timelineUpdate( $this, $this.find( '.uix-timeline__item.is-active' ), dateShowEle, false, dir );
            if ( $this.find( '.uix-timeline__item.is-active' ).index() == 0 ) {
                $this.find( '.uix-timeline__btn--prev' ).addClass( 'is-disabled' );
            }



            // for reversed timeline
            if ( dir == 'horizontal' && $this.hasClass( 'is-reversed' ) && windowWidth > 768 ) {

                // Set equal heights
                const setEqualHeights = function( el ) {
                    let counter = 0;

                    for ( let i = 0; i < el.length; i++) {

                        const singleHeight = $( el[i] ).outerHeight( true );

                        if (counter < singleHeight) {
                            counter = singleHeight;
                        }
                    }

                    for ( let k = 0; k < el.length; k++) {
                        $( el[k] ).css( 'height', counter + 'px' );
                    }

                    return counter;

                };


                // Reset container height
                const infoNewHeight = setEqualHeights( $timeline.find( '.uix-timeline__item__info' ) );
                $container.css( {
                    'padding' : parseFloat( infoNewHeight + 64 ) + 'px 0'
                } );

            }




        });	

		

		/*
		 * Method that updates items of timeline
		 *
		 * @param  {Element} obj                 - Wrapper of timeline.
		 * @param  {?Element} iscur              - The current item.
		 * @param  {String} showEle              - Element ID or class name that push the current text.
		 * @param  {Boolean} prev                - Whether to slide forward.
         * @param  {String} dir                  - Timeline direction.
		 * @return {Void}
		 */
		function timelineUpdate( obj, iscur, showEle, prev, dir ) {
			const itemTotal  = obj.find( '.uix-timeline__item' ).length,
				  tNav       = obj.find( '.uix-timeline__item' ),
				  tLoop      = false;
			
			
			let curIndex = obj.find( '.uix-timeline__item.is-active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur != null && typeof iscur === 'object' ) {
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
			obj.find( '.uix-timeline__btn--prev, .uix-timeline__btn--next' ).removeClass( 'is-disabled' );
			
			if ( prev ) {
				
				//Previous
				if ( tLoop ) {
					if ( tarIndex < 0 ) tarIndex = itemTotal-1;
				} else {
					if ( tarIndex < 0 ) tarIndex = 0;
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'is-disabled' );
					
					 
				}
			} else {
				
				//Next
				if ( tLoop ) {
					if ( tarIndex == itemTotal ) tarIndex = 0;
				} else {
					if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
					if ( tarIndex > itemTotal-2 ) obj.find( '.uix-timeline__btn--next' ).addClass( 'is-disabled' );
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'is-disabled' );
				}
			}

			
			
			tNav.removeClass( 'is-active' );
			obj.find( '.uix-timeline__item:eq('+tarIndex+')' ).addClass( 'is-active' );

			//scroll left
            if ( dir == 'horizontal' ) {
                let moveWidth = 0;
                for ( let i = 0; i < tarIndex; i++ ) {
                    moveWidth += obj.find( '.uix-timeline__item:eq('+i+')' ).width();
                }

                obj.find( '.uix-timeline__container > .uix-timeline' ).css({
                    'margin-left' : -parseFloat( moveWidth ) + 'px'
                });    
            }

            
			//scroll top
            if ( dir == 'vertical' ) {
                let moveHeight = 0;
                for ( let i = 0; i < tarIndex; i++ ) {
                    moveHeight += obj.find( '.uix-timeline__item:eq('+i+')' ).outerHeight( true );
                    
                }

                obj.find( '.uix-timeline__container > .uix-timeline' ).css({
                    'margin-top' : -parseFloat( moveHeight ) + 'px'
                });        
                
            }
            
           
			//Push the current text to element 
			$( showEle ).text( obj.find( '.uix-timeline__item:eq('+tarIndex+')' ).find( '.uix-timeline__item__date' ).text() );
			
			
		}
    
		
    };

    module.components.pageLoaded.push( module.TIMELINE.pageLoaded );

	return class TIMELINE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




