/**
 * ---------------------------
 * MAIN SCRIPTS
 * ---------------------------
 *
 * 
 * ## Project Name        :  Uix Kit Demo
 * ## Project Description :  Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap
 * ## Based on            :  Uix Kit (https://github.com/xizon/uix-kit)
 * ## Version             :  1.1.5
 * ## Last Update         :  February 25, 2018
 * ## Powered by          :  UIUX Lab
 * ## Created by          :  UIUX Lab (https://uiux.cc)
 * ## Contact Us          :  uiuxlab@gmail.com
 * ## Compatible With     :  Bootstrap 3.x, Chinese, English
 * ## Compatible Browsers :  IE9, IE10, IE11, Firefox, Safari, Opera, Chrome, Edge
 * ## Released under the MIT license.
 */

/* 

	TABLE OF CONTENTS
	---------------------------
	
	
	1. Header
	2. Loader
	3. Back to Top
	4. Overlay
	5. Navigation
	6. Videos
	7. Multiple columns full height for Bootstrap 3.x
	8. Mega Menu
	9. Dropdown Categories
	10. Pagination

*/

var templateUrl = wp_theme_custom_root_path.templateUrl,
	homeUrl     = wp_theme_custom_root_path.homeUrl;

//Determine whether it is a special browser
var is_safari   = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE        = !!window.ActiveXObject || "ActiveXObject" in window;     /*Test to 6 ~ 11 (not edge) */


var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="'+templateUrl+'/assets/images/blank.gif" alt="" style="display:none">' );
	}
	$( 'body' ).waitForImages( pageLoaded );
    $( document ).ready( documentReady );
	
	
	
    function documentReady( context ) {
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }

    function pageLoaded( context ){
        
        context = typeof context == "object" ? $ : context;
        components.pageLoaded.forEach( function( component ) {
           component( context );
        });
    }

    theme.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    theme.components         = components;
    theme.documentReady      = documentReady;
	theme.pageLoaded         = pageLoaded;

    return theme;
}( jQuery, window, document ) ); 



/*! 
 *************************************
 * 1. Header 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();


		
		//-------- Sticky header area
		var waypoints = $( '.header-area' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

			},
			offset: -120
		});
		
		
		
		//-------- Header initialize
		headerInit();
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				headerInit();
		

			}
		});
		function headerInit() {
			$( '.header-inner.auto-height' ).css( 'height', $( '.header-area' ).outerHeight() + 'px' ); 
		}
		
		
    };

    theme.header = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


		

/*! 
 *************************************
 * 2. Loader
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		// Remove loader
		$( '.loader' ).fadeOut();
		
    };

    theme.loader = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



		
/*! 
 *************************************
 * 3. Back to Top
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		// Add button to body for back to top
		$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		
		// Sticky button of back to top 
		var waypoints = $( '#toTop' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'active', direction === 'down' );

			},
			offset: -120
		});
		
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			$( 'html, body' ).stop().animate({
				scrollTop: 0
			}, { easing: 'easeOutQuart', duration: 500 } );	
		
		});
		
	   
		
		
    };

    theme.backtoTop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * 4. Overlay
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
    var documentReady = function( $ ) {
		
		$( '.overlay-bg' ).each(function() {
			
			var dataBgColor = $( this ).data( 'overlay-bg' ),
				dataBgOpacity = $( this ).data( 'overlay-opacity' );
			
			
			if( typeof dataBgColor != typeof undefined ) {
				
				if( typeof dataBgOpacity === typeof undefined ) { // If there is no data-xxx, save current source to it
					$( this ).attr( 'data-overlay-opacity', 1 );
					
				}
				
				$( this ).animate( { opacity: $( this ).data( 'overlay-opacity' ) }, 0 );
				
				$( this ).css( {
					'background-color': $( this ).data( 'overlay-bg' )
				} );
	
			}
			
			
			
		});		
	};
	
		
    theme.overlay = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 5. Navigation
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
		
			
			// Menu Hover
			var mTop = 15;
			$( '.menu-container:not(.mobile) ul.menu-main > li.multi-column > ul li ul' ).addClass( 'multi' );
			$( '.menu-container:not(.mobile) ul.menu-main > li:not(.multi-column) ul, .menu-container:not(.mobile) li.multi-column > ul.sub-menu > li > ul, .menu-container:not(.mobile) ul.menu-main li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );
			
			$( '.menu-container:not(.mobile) ul.menu-main li' ).on( 'mouseenter', function(){
				$( this ).find( ' > ul.sub-menu:not(.multi), .mega-arrow' ).show().animate( { marginTop: 0, opacity: 1 }, { duration: 150 } );
				
			}).on( 'mouseleave' , function(){
				$( this ).find( '.mega-arrow' ).hide().animate( { opacity: 0 }, { duration: 150 } );
				$( this ).find( ' > ul.sub-menu:not(.multi)' ).animate( { marginTop: mTop + 'px', opacity: 0 }, { duration: 150,
						complete: function() {
							$( this ).hide();
						} 
				} );		
			});
	
	
		
			//Add Sub-menu Arrow
			$( '.menu-container:not(.mobile) ul.menu-main li' ).each( function() {
				if ( $( this ).find( 'ul' ).length > 0 ) {
					$( this ).prepend( '<span class="nav-arrow"></span>' );
				}
				
			} );	
		


			// Sticky primary navigation
			var waypoints2 = $( '.menu-container:not(.mobile)' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

				},
				offset: -120
			});


			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				if ( typeof attr !== typeof undefined && attr !== false ) {
					if  ( $( this ).attr( 'href' ).indexOf( '/#' ) >= 0   || $( this ).attr( 'href' ) == '#' ) {
						$( this ).attr( 'data-normal', 1 ); 
					 }	
				}
					
			});
		

			
		
	};
	
		
    theme.navigation = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * 6. Videos
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		/*! 
		 ---------------------------
		 Video Embed
		 ---------------------------
		 */  
		$( '.web-video-embed' ).each( function()  {
			var $this         = $( this ),
			    curVideoID    = $this.find( '.video-js' ).attr( 'id' ),
				videoWrapperW = $this.closest( '[data-embed-video-wrapper]' ).width(),
				videoWrapperH = $this.closest( '[data-embed-video-wrapper]' ).height(),
				dataAuto      = $this.data( 'embed-video-autoplay' ),
				dataLoop      = $this.data( 'embed-video-loop' ),
				dataControls  = $this.data( 'embed-video-controls' ),
				dataW         = $this.data( 'embed-video-width' ),
				dataH         = $this.data( 'embed-video-height' );

			
			
			if ( videoWrapperH == 0 ) videoWrapperH = videoWrapperW/1.77777777777778;

			
			if( typeof dataAuto === typeof undefined ) {
				dataAuto = true;
			}
			if( typeof dataLoop === typeof undefined ) {
				dataLoop = true;
			}
			if( typeof dataControls === typeof undefined ) {
				dataControls = false;
			}	
			
			
			if( typeof dataW === typeof undefined || dataW == 'auto' ) {
				dataW = videoWrapperW;
			}	
			
			if( typeof dataH === typeof undefined || dataH == 'auto' ) {
				dataH = videoWrapperH;
			}
			
		
			
			//HTML5 video autoplay on mobile revisited
			if ( dataAuto && windowWidth <= 768 ) {
				$this.find( '.video-js' ).attr({
					'autoplay'    : 'true',
					'muted'       : 'true',
					'playsinline' : 'true'
				});
			}
			
			


			var myPlayer = videojs( curVideoID, {
					                  width     : dataW,
					                  height    : dataH,
				                      loop      : dataLoop,
									  controlBar: {
										  muteToggle : false,
										  autoplay   : dataAuto,
										  loop       : dataLoop,
										  controls   : true,
										  controlBar : {
											  muteToggle: false
										  }
									  }
					
					
									});
			

			myPlayer.ready(function() {
				
				/* ---------  Video initialize */
				myPlayer.on( 'loadedmetadata', function() {

					//Get Video Dimensions
					var curW    = this.videoWidth(),
						curH    = this.videoHeight(),
						newW    = curW,
						newH    = curH;

					newW = videoWrapperW;

					//Scaled/Proportional Content 
					newH = curH*(newW/curW);


					myPlayer
						.width( newW )
						.height( newH );
					
					//Show this video wrapper
					$this.css( 'visibility', 'visible' );

					//Hide loading effect
					$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();

				});		
			

			
				
				
				/* ---------  Set, tell the player it's in fullscreen  */
				if ( dataAuto ) {
					myPlayer.play();
				}
				

				/* ---------  Disable control bar play button click */
				if ( !dataControls ) {
					myPlayer.controls( false );
				}
				

			});
			
		});
		
		
		
		/*! 
		 ---------------------------
		 Video Popup Interaction
		 ---------------------------
		 */  
		var modalDialogTrigger = '[data-video-win]';
		
		//Add video container
		$( modalDialogTrigger ).each( function()  {
			
	
			var $this             = $( this ),
				videoSrcIfm       = '',
				videoSrcMp4       = $this.data( 'video-mp4' ),
				videoSrcWebm      = $this.data( 'video-webm' ),
				videoSrcOgv       = $this.data( 'video-ogv' ),
				videoPoster       = $this.data( 'video-poster' ),
				videoContainerMid = $this.data( 'modal-id' ),
				videoContainerVid = $this.data( 'video-id' );
				
			
			if( typeof videoSrcMp4 === typeof undefined ) {
				videoSrcMp4 = '';
			}	
			
			if( typeof videoSrcWebm === typeof undefined ) {
				videoSrcWebm = '';
			}	
			
			if( typeof videoSrcOgv === typeof undefined ) {
				videoSrcOgv = '';
			}		
			
			if ( $this.find( '[data-video-iframe]' ).length > 0 ) {
				videoSrcIfm = $this.find( '[data-video-iframe]' ).html();
			}
				
		
				
			//Add modal dialog
			if ( $( '#' + videoContainerMid ).length == 0 ) {
				
				var v      = '',
					vmp4   = '',
					vwebm  = '',
					vogv   = '';
				
				if ( videoSrcMp4 != '' ) {
					vmp4 = '<source src="'+videoSrcMp4+'" type="video/mp4">';
				}
				if ( videoSrcWebm != '' ) {
					vwebm = '<source src="'+videoSrcWebm+'" type="video/webm">';
				}
				if ( videoSrcOgv != '' ) {
					vogv = '<source src="'+videoSrcOgv+'" type="video/ogv">';
				}
				
				v += '<div class="modal-box fullscreen video" id="'+videoContainerMid+'">';
				v += '<a href="javascript:void(0)" class="close-btn"></a>';
				v += '<div class="content">';
				v += '<div class="web-video-container">';
				
				if ( $this.find( '[data-video-iframe]' ).length > 0 && videoSrcIfm != '' ) {
					//If iframe
					v += '<div id="'+videoContainerVid+'" class="embed-responsive embed-responsive-16by9">';
					v += videoSrcIfm;
					v += '</div>';			

				} else {
					//If local video
					v += '<video id="'+videoContainerVid+'" class="video-js vjs-default-skin" controls poster="'+videoPoster+'">';
					v += vmp4 + vwebm + vogv;
					v += '</video>';
				}

				v += '</div>';
				v += '</div>';
				v += '</div>';

				
				//Wait until previous .append() is complete
				$( v ).appendTo( 'body' );
	
			}
			
			
		});
		
		
		//Check out: http://docs.videojs.com/tutorial-player-workflows.html
		$( document ).on( 'click', modalDialogTrigger, function() {

			var vid      = $( this ).data( 'video-id' ),
				$ifm     = false,
				newMaxW  = windowWidth - 80,
				newMaxH  = windowHeight - 80;


			//----- Embed iframe
			if ( $( '#' + vid ).find( 'iframe' ).length > 0 ) {
				$ifm = $( '#' + vid ).find( 'iframe' );
			}


			if ( $ifm && typeof $ifm === 'object' ) {

				if ( $ifm.length > 0 ) {

					var curW    = $ifm.width(),
						curH    = $ifm.height(),
						newW    = curW,
						newH    = curH;



					if ( curH > newMaxH ) {
						newH = newMaxH;

						//Scaled/Proportional Content 
						newW = curW*(newH/curH);

					}	

					if ( newW > newMaxW ) {
						newW = newMaxW;

						//Scaled/Proportional Content 
						newH = curH*(newW/curW);
					}	

					$ifm.css({
						'left'   : ( newMaxW - newW )/2 + 'px',
						'top'    : ( newMaxH - newH )/2 + 'px',
						'height' : newH + 'px',
						'width'  : newW + 'px'
					});	

					if ( windowWidth <= 768 ) {
						$ifm.css({
							'top'    : 0
						}).parent( '.embed-responsive' ).css({
							'top'    : ( newMaxH - newH )/2 + 'px'
						});		

					}




				}

				return false;
			}



			//----- Embed local video
			var myPlayer = videojs( vid, {
									  width     : 1,
									  height    : 1,
									  controlBar: {
										  muteToggle : false,
										  autoplay   : true,
										  loop       : true,
										  controls   : true,
										  controlBar : {
											  muteToggle: false
										  }
									  }


									});


			myPlayer.ready(function() {


				/* ---------  Video Modal initialize */
				myPlayer.on( 'loadedmetadata', function() {

					//Get Video Dimensions
					var curW    = this.videoWidth(),
						curH    = this.videoHeight(),
						newW    = curW,
						newH    = curH;

					//Resise modal
					if ( curH > newMaxH ) {
						newH = newMaxH;

						//Scaled/Proportional Content 
						newW = curW*(newH/curH);


					}


					if ( newW > newMaxW ) {
						newW = newMaxW;

						//Scaled/Proportional Content 
						newH = curH*(newW/curW);
					}	


					myPlayer
						.width( newW )
						.height( newH );


					$( '#' + vid ).css({
						'left' : ( newMaxW - newW )/2 + 'px',
						'top'  : ( newMaxH - newH )/2 + 'px'
					});




				});

				/* ---------  Set, tell the player it's in fullscreen  */
				//myPlayer.exitFullscreen();
				//myPlayer.requestFullscreen();
				myPlayer.play();

				/* ---------  Disable control bar play button click */
				//myPlayer.controls( false );

				/* ---------  Display video playback progress  */
				myPlayer.on( 'timeupdate', function() {

					var duration = this.duration(),
					progressAmount = '0%';
					if (duration > 0) {
						progressAmount = ((this.currentTime() / duration) * 100) + "%";
					}

					console.log( progressAmount );
				});

				/* ---------  Callback for when a video has ended */
				myPlayer.on( 'ended', function() {
					console.log( 'video is done!' );
				});



			});




			/* ---------  Close the modal  */
			$( document ).on( 'click', '.modal-box .close-btn', function() {

				myPlayer.ready(function() {
					myPlayer.pause();
				});				

			});


		});


		
		
		
    };

    theme.videos = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * 7. Multiple columns full height for Bootstrap 3.x
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		rowColInit( windowWidth ); 
		
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				rowColInit( windowWidth ); 
		

			}
		});
		

		function rowColInit( w ) {

			$( '.row.full-height' ).each( function()  {
				var h = ( w > 768 ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( '> div' ).css( 'height', h );
			});


		}

		
		

    };

    theme.rowFullheight = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );





/*! 
 *************************************
 * 8. `Mega Menu`
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit( windowWidth );
		}, 500 );
		
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				megaMenuInit( windowWidth );
		

			}
		});
		
		
	
		// For the absolute coordinates of any jquery element 
		function getAbsoluteCoordinates( $element ) {
			var windowWidth     = $( window ).width(),
			    leftPos         = null;

			
			if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
				leftPos = ( $element.offset().left == 0 ) ? $element.parent().offset().left : $element.offset().left;
			} else {
				
				//($(window).width() - ($whatever.offset().left + $whatever.outerWidth()));
				leftPos = ( $element.offset().left == 0 ) ? ( windowWidth - ( $element.parent().offset().left + $element.parent().outerWidth() ) ) : ( windowWidth - ( $element.offset().left + $element.outerWidth() ) );
			}
				

			return leftPos;
		}	

		
		// Initialize mega menu
		function megaMenuInit( w ) {
			var maxWidth     = 1170, //The maximum width of the mega menu wrapper
			    perDefaultW  = 220; //Default width of each column

			
			// Remove the html tag for mega menu item
			$( 'li.multi-column  > ul .multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( w > 768 ){

				$( 'li.multi-column' ).each( function() {
					var root_li          = $( this ),
						col_total        = root_li.find( '> ul .multi-column-title' ).length,
						col_div          = root_li.find( '> ul .multi-column-title' ).closest( 'li' ),
						mega_div         = root_li.find( ' > ul.sub-menu' ),
						mega_div_w       = mega_div.width(),
						mega_single_w    = null,
						root_li_left     = null;
					
					
					// Add mega arrow
					if ( root_li.find( '.mega-arrow' ).length < 1 ) root_li.prepend( '<span class="mega-arrow"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( col_total > 0 ) {

						root_li_left     = getAbsoluteCoordinates( mega_div );
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > w ) maxWidth = w;
						
						
						if ( mega_div_w > maxWidth ) {

							mega_div_w       = maxWidth;
							mega_single_w    = maxWidth/col_total - 2.888;
							
							mega_div.find( '> li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								mega_div.css( {
									'margin-left' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							} else {
								mega_div.css( {
									'margin-right' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							mega_div.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );				
							
							var chkWidth = parseFloat( root_li_left  + mega_div_w );


							if ( chkWidth > w ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									mega_div.css( {
										'margin-left' : - ( chkWidth - w ) + 'px'
									} );
								} else {
									mega_div.css( {
										'margin-right' : - ( chkWidth - w ) + 'px'
									} );
								}	

							}	
							
								
							
						}
						
					
		
					}


				} );	

			}
		}
		

		
		
		
    };

    theme.megamenu = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 9. Dropdown Categories
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });

	};
	
		
    theme.dropdownCat = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * 10. Pagination
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.pagination-container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
	};
	
		
    theme.Pagination = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Accordion
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
		$( '.custom-accordion' ).each(function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' ),
				$li             = $this.find( 'dl' ),
				$titlebox       = $this.find( 'dt' );
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.filter( '.active' ).find( 'dd' ).slideDown( 300 );
			}
			

			$titlebox.on( aEvent, function() {
				
				var $cur = $( this ).closest( 'dl' );
				
				if ( !$cur.hasClass( 'active' ) ) {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );

					$cur.addClass( 'active' );
					$cur.find( 'dd' ).slideDown( 300 );	
				} else {
					$li.removeClass( 'active' );
					$li.find( 'dd' ).slideUp( 300 );
				}
				
			}); 
			
		});
		
	};
	
		
    theme.accordion = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Counter
 *************************************
 */	
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	
		$( '[data-counter-number]' ).each(function() {

			var $this = $( this );
			
			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					
					$this.countTo({
						dilimiter      : true,
						doubleDigits   : true
					});
					
					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  

			    },
			    offset: '100%' //0~100%, bottom-in-view
			});


		});

		
		
    };

    theme.counter = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*--------------------------------
 * Counter function 
 --------------------------------*/
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from            : $( this ).data( 'counter-start' ),
				to              : $( this ).data( 'counter-number' ),
				speed           : $( this ).data( 'counter-duration' ),
				refreshInterval : $( this ).data( 'counter-refresh-interval' ),
				dilimiter       : $( this ).data( 'counter-dilimiter' ),
				doubleDigits    : $( this ).data( 'counter-double-digits' )
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self      = this,
				$self     = $( this ),
				loopCount = 0,
				value     = settings.from,
				data      = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render( value ) {
				var formattedValue = Number( value ).toFixed();
				
				if ( settings.dilimiter && formattedValue > 0 ) {
					formattedValue = formattedValue.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
				}
				
				if (settings.doubleDigits) {
					if ( formattedValue < 10 ) {
						formattedValue = '0' + formattedValue;
					}
				}	
				
				
				$self.html( formattedValue );
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from           : 0,            // the number the element should start at
		number         : 0,            // the number the element should end at
		duration       : 500,         // how long it should take to count between the target numbers
		refreshInterval: 1,           // how often the element should be updated
		dilimiter      : true,        // the number of decimal places to show
		onUpdate       : null,        // callback method for every time the element is updated
		onComplete     : null,       // callback method for when the element finishes updating,
		doubleDigits   : false       // two digits are used by default
	};
	
	
}(jQuery));

/*! 
 *************************************
 * Form
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*--- Input File ----*/
		$( '.controls-file-container' ).each( function()  {
			var fileInput  = $( this ).find( 'input[type="file"]' ),
				fileBtn    = $( this ).find( '.controls-file-trigger' ),
				filePath   = $( this ).next( '.controls-file-return' );
			
			fileBtn.on( 'click', function() {
				fileInput.focusin();
			});	
			
			fileInput.on( 'change', function() {
				filePath.text( $( this ).val() );
			});	
			
		});

		/*--- Hover Effect ----*/
		$( '.float-label' ).each( function(){
			
			var $this = $( this );
			
			// on focus add cladd active to label
			$this.focus( function() {
				$this.next().addClass( 'active' );
			});
			//on blur check field and remove class if needed
			$this.blur( function() {
				if( $this.val() === '' || $this.val() === 'blank') {
					$this.next().removeClass();
				}
			});
			
			// if exist cookie value
			if( $this.val() != '' && $this.val() != 'blank') { 
			    $this.next().addClass( 'active' );
			}
			
		});
		
		$( '.wp-search-submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		/*--- Input Validation ----*/
		//Using the jQuery Validation Plugin to check your form
		
		
	};
	
		
    theme.form = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Form Progress
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		

		var $progressBar   = $( '.custom-form-progress progress' ),
			$formTarget    = $( '.custom-form-progress-target' ),
			$indicator     = $( '.custom-form-progress .indicator' ),
			formAreaH      = $formTarget.height(),
			allStep        = $indicator.length,
			stepPerValue   = 100/( allStep - 1 ),
			value          = 0,
			transitionEnd  = 'webkitTransitionEnd transitionend';
		
		
		
		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		
		//Gets the party started.
		formReset();

		// Show next form on continue click
		$( '.custom-form-progress-target .go-step' ).on( 'click', function( e ) {
			e.preventDefault();
			var $currentForm = $( this ).parents( '.form-step' );
			showNextForm( $currentForm );
		});

		// Reset form on reset button click
		$( '.custom-form-progress-target .go-reset' ).on( 'click', function( e ) {
			e.preventDefault();
			formReset();
		});
		
		
		/*
		 * Set progress bar to the next value
		 *
		 * @param  {number} val             - The target value.
		 * @return {void}                   - The constructor.
		 */
		function formProgressReset( val ) {
			$( '.custom-form-progress .line span' ).css( 'width', val + '%' );
			
		}
		
		
		/*
		 * Resets the form back to the default state.
		 *
		 * @return {void}                   - The constructor.
		 */
		function formReset() {
			value = 0;
			// Set progress bar value
			formProgressReset( value );
			
			
			//Initialize pointer and form location data
			$indicator.removeClass( 'active' );
			$indicator.each( function( index )  {
				$( this ).css( 'left', index*stepPerValue + '%' );
				$formTarget.find( '.form-step:eq('+index+')' ).attr( 'data-step', index+1 );
			});
			
			setTimeout(function() {
				$formTarget.addClass( 'show' );
			}, animeSpeed );
			
			
			$formTarget.find( '.form-step' )
			                                .removeClass( 'left leaving' )
											.css( {
												'position'   : 'absolute',
				                                'height'     : formAreaH + 'px'
											} )
											.not( ':eq(0)' )
											.addClass( 'waiting' );
			
			$indicator.first().addClass( 'active' );
	

			return false;
		}



	
		/*
		 * Shows the next form.
		 *
		 * @param  {object} currentForm    - Node - The current form.
		 * @return {void}                  - The constructor.
		 */
		
		function showNextForm( currentForm ) {
			var currentFormStep  = parseInt(currentForm.attr( 'data-step' ) ) || false,
				$nextForm        = $formTarget.find( '.form-step[data-step="' + (currentFormStep + 1) + '"]'),
				currentFormIndex = $nextForm.attr( 'data-step' ) - 1;

			// Hide current form fields
			currentForm.addClass( 'leaving' );
			setTimeout(function() {
				$indicator.eq( currentFormIndex ).addClass( 'active' );
			}, animeSpeed );


			// Show next form fields
			$nextForm.addClass( 'coming' ).one( transitionEnd, function() {
				$nextForm.removeClass( 'coming waiting' );
			});

			// Increment value (based on 4 steps 0 - 100)
			value += stepPerValue;

			// Reset if we've reached the end
			if (value >= 100) {
				$formTarget.find( '.form-step' )
				                               .addClass( 'leaving' )
					                           .last()
					                           .removeClass( 'coming waiting leaving' );
			} else {
				$( '.custom-form-progress' ).find( 'indicator.active' ).next( '.indicator' ).addClass( 'active' );
			}

			// Set progress bar value
			formProgressReset( value );


			return false;
		}
		
		
		
	};
		
      
    theme.formProgress = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Gallery
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
	
		$( '.custom-gallery' ).each( function() {
			var type = $( this ).data( 'show-type' );
			
			// Masonry
			if ( type.indexOf( 'masonry' ) >= 0  ) {
				$( this ).addClass( 'masonry-container' );
				$( this ).find( '.custom-gallery-item' ).addClass( 'masonry-item' );
			}
			
			// Filterable
			if ( type.indexOf( 'filter' ) >= 0  ) {
				$( this ).addClass( 'filter-container' );
				$( this ).find( '.custom-gallery-item' ).addClass( 'filter-item' );	
			}	
		
		});
	
	    /*--  Function of Masonry  --*/
		var masonryObj = $( '.masonry-container .custom-gallery-tiles' );
		imagesLoaded( masonryObj ).on( 'always', function() {
			  masonryObj.masonry({
				itemSelector: '.masonry-item'
			  });  
		});
		
		
	    /*--  Function of Filterable  --*/
		if ( $( "[data-show-type]" ).length > 0 ) {
			if ( $( "[data-show-type]" ).data( 'show-type' ).indexOf( 'filter' ) >= 0 ) {
				
				$( '.custom-gallery' ).each( function() {
					var filterCat      = $( this ).data( 'filter-id' ),
						$grid          = $( this ).find( '.custom-gallery-tiles' ),
						$filterOptions = $( filterCat );
						
					imagesLoaded( $grid ).on( 'always', function() {
						
						 $grid.shuffle({
							itemSelector : '.filter-item',
							speed        : 550, // Transition/animation speed (milliseconds).
							easing       : 'ease-out', // CSS easing function to use.
							sizer        : null // Sizer element. Use an element to determine the size of columns and gutters.
						  });
						  
						
						$filterOptions.find( 'li > a' ).on( 'click', function() {
							  var $this       = $( this ),
								  activeClass = 'current-cat',
								  isActive    = $this.hasClass( activeClass ),
								  group       = isActive ? 'all' : $this.data( 'group' );
						
							  // Hide current label, show current label in title
							  if ( !isActive ) {
								$filterOptions.find( '.' + activeClass ).removeClass( activeClass );
							  }
						
							  $this.toggleClass( activeClass );
						
							  // Filter elements
							  $grid.shuffle( 'shuffle', group );
							  
							  return false;	
						});
					
			
					});
	
					
				} );
		
				
			} else {
				$( '[data-group="all"]' ).parent( 'li' ).hide();
			}
	
		}
		
		
		
	};
	
		
    theme.gallery = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Posts List With Ajax
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
	
		$( '[data-ajax-list-json]' ).each( function() {
			var $this            = $( this ),
				wrapperID        = 'refresh-all-waypoint-' + Math.random()*1000000000000000000,
			    curPage          = $this.data( 'ajax-list-page-now' ),
				perShow          = $this.data( 'ajax-list-page-per' ),
				totalPage        = $this.data( 'ajax-list-page-total' ),
				method           = $this.data( 'ajax-list-method' ),
				trigger          = $this.data( 'ajax-list-trigger' ),
				infinitescroll   = $this.data( 'ajax-list-infinitescroll' ),
				jsonFile         = $this.data( 'ajax-list-json' ),
				template7ID      = $this.data( 'ajax-list-temp-id' ),
				pushContainer    = $this.data( 'ajax-list-push-container-class' ),
				triggerActive    = $this.data( 'ajax-list-trigger-active-class' );
	

			$this.attr( 'id', wrapperID );
			
			if( typeof curPage === typeof undefined ) {
				curPage = 1;
			}
			
			curPage = curPage + 1;
			
			
			if( typeof perShow === typeof undefined ) {
				perShow = 8;
			}
			
			if( typeof totalPage === typeof undefined ) {
				totalPage = 3;
			}
			
			if( typeof totalPage != typeof undefined && totalPage == '-1' ) {
				totalPage = 9999;
			}
			
			
			if( typeof trigger === typeof undefined ) {
				trigger = '.load-more';
			}
			
			if( typeof infinitescroll === typeof undefined ) {
				infinitescroll = false;
			}	
			
			if( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}		
			
			if( typeof template7ID === typeof undefined ) {
				template7ID = '';
			}	
			if( typeof triggerActive === typeof undefined ) {
				triggerActive = 'active';
			}		
			
			if( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			
			
			
			triggerActive = triggerActive.replace( '.', '' );
			
			
			
			if( typeof pushContainer === typeof undefined ) {
				$( '#' + template7ID ).after( '<div class="portfolio-items-ajax-container"></div>' );
				pushContainer = '.portfolio-items-ajax-container';
			}		
			
			
			
			//Get all attributes of an element and push the new attributes like "data-*"
			var curAttrs        = $this.attr(),
				defaultPostData = '',
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-ajax-list-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-ajax-list-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		
			
			//Parse the JSON data
			if ( jsonFile != '' && template7ID != '' ) {
				
				
				if ( infinitescroll ) {
					/*! 
					 ---------------------------
					 Infinite scroll
					 ---------------------------
					 */ 	
					var $button = $( trigger ),
						btnTop  = $button.offset().top;
					
					$( window ).on( 'scroll touchmove', function() {
						var scrolled = $( window ).scrollTop();
						
				
						
						if ( scrolled >= parseFloat( $button.offset().top - $( window ).height()/2 - $button.outerHeight( true )*2 ) && !$button.hasClass( triggerActive ) ) {

								// Active this button
								$button.addClass( triggerActive );					    
							

								if ( curPage < totalPage+1 ) {

									//Perform dynamic loading
									if ( customPostData != '' ) {
										defaultPostData = JSON.parse( '{ "total": '+totalPage+', "per": '+perShow+', "page": '+curPage+', '+customPostData+' }' );
									} else {
										defaultPostData = JSON.parse( '{ "total": '+totalPage+', "per": '+perShow+', "page": '+curPage+' }' );
									}

									
									ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method );

								}

								//Avoid touching the same button multiple times
					
								
								//Calculate the page has been loaded
								curPage++;	
						}
						
					});	
					
				} else {
					/*! 
					 ---------------------------
					 Ajax with JSON data
					 ---------------------------
					 */ 
					$( document ).on( 'click', trigger, function( e ) {

						e.preventDefault();

						var $button = $( this );

						//Hidden button
						if ( curPage == totalPage ) {
							$button.addClass( 'hide' );
						}


						if ( curPage < totalPage+1 ) {
							
							// Active this button
							$button.addClass( triggerActive );		

							
							//Perform dynamic loading
							if ( customPostData != '' ) {
								defaultPostData = JSON.parse( '{ "total": '+totalPage+', "per": '+perShow+', "page": '+curPage+', '+customPostData+' }' );
							} else {
								defaultPostData = JSON.parse( '{ "total": '+totalPage+', "per": '+perShow+', "page": '+curPage+' }' );
							}
							
							ajaxLoadInit( $this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method );
						}




						//Calculate the page has been loaded
						curPage++;

						return false;


					});
					
					
				}
				
			}
			
		});
			
			
		/*
		 * Ajax with JSON data
		 *
		 * @param  {object} ajaxWrapper     - The outermost container of list.
		 * @param  {object} defaultPostData - Data to be sent to the server which is custom JSON fields.
		 * @param  {object} trigger         - Trigger ajax loaded button object.
		 * @param  {number} curPage         - The current page to load.
		 * @param  {number} perShow         - The amount to load each time.
		 * @param  {number} totalPage       - The total page to load.
		 * @param  {string} template7ID     - HTML template ID
		 * @param  {string} jsonFile        - JSON file path to docking data
		 * @param  {string} triggerActive   - The class name of trigger button actived.
		 * @param  {string} pushContainer   - This container is used to display the loaded dynamic data.
		 * @param  {string} method          - The type of request to make, which can be either "POST" or "GET".
		 * @return {void}                   - The constructor.
		 */
		function ajaxLoadInit( ajaxWrapper, defaultPostData, trigger, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method ) {

			var $divRoot         = ajaxWrapper,
				template         = document.getElementById( template7ID ).innerHTML,
				compiledTemplate = Template7.compile( template ),
				$button          = $( trigger );

			
			$.ajax({
				url      : jsonFile, //Be careful about the format of the JSON file
				method   : method,
				data     : defaultPostData,
				dataType : 'json',
				success  : function (data) { 
					
					//If the data is empty
					if ( data == null ) $button.addClass( 'hide' );
				
					
					//Check JSON string
					if ( data && data.hasOwnProperty( 'items' ) && Object.prototype.toString.call( data.items )=='[object Array]' ) {
						
						
						//Data overflow may occur when the total number of pages is not posted
						try {

							var pageLoaded    = theme.components.pageLoaded,
								documentReady = theme.components.documentReady,
								thisData      = data,
								html          = compiledTemplate( thisData ),
								curHtml       = $divRoot.find( pushContainer ).html(),
								result        = curHtml + html,
								htmlEl        = $( result );


							$divRoot.find( pushContainer ).before( htmlEl );
						
							
							//--------- jQuery Masonry and Ajax Append Items
							$( '.custom-gallery' ).each( function() {
								var type = $( this ).data( 'show-type' );

								if ( type.indexOf( 'masonry' ) >= 0  ) {
									$( this ).addClass( 'masonry-container' );
									$( this ).find( '.custom-gallery-item' ).addClass( 'masonry-item' );
								}
								
							});
							
							var masonryItemContainer = $( '.masonry-container' );
							imagesLoaded( masonryItemContainer ).on( 'always', function() {
								 masonryItemContainer.masonry({
								    itemSelector: '.masonry-item'
								 });  
								
								$( masonryItemContainer ).masonry( 'reloadItems' );
								$( masonryItemContainer ).masonry( 'layout' );	
								
							});	
				
							
							
							//--------- Init Videos
							documentReady[4]($);


							//--------- Remove this button
							$button.removeClass( triggerActive );	

							//--------- Hidden button
							if ( curPage == totalPage ) {
								$button.addClass( 'hide' );
							}		

						} catch ( err ) {
							console.log( err.message );
							$button.addClass( 'hide' );

						}

						
					}

				 },
				 error  : function() {
					 $button.addClass( 'hide' );
					 
				 }
			});

		}

	
	   
		
		
		
	};
	
		
    theme.listAjax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/* Get all attributes of an element using jQuery */
(function(old) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);
/*! 
 *************************************
 * Custom Core Scripts & Stylesheets
 *************************************
 */



/*! 
 *************************************
 * Fullwidth List of Split
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.list-split-imagery-container' ).each(function() {
				var imgH = $( this ).find( '.imagery-background img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', 'auto' );
				}

			});	
		}
		

		
		
	};
		
    theme.fullwidthListSplit = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * Mobile Menu
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
			
			
		
			//Show Toolbar when viewing site for WordPress
			var waypoints = $( '.admin-bar .menu-toggle' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-postion', direction === 'down' );

				},
				offset: -46
			});
		
		
			
			// Mobile Menu
			if ( $( '.brand img' ).length > 0 ) {
				$( '.mobile-brand' ).html( '<img src="'+$( '.brand img' ).attr( 'src' )+'" alt="">' );
			} else {
				$( '.mobile-brand' ).html( '<img src=" ' + templateUrl + '/assets/images/blank.gif" alt="">' );
			}
			
			
		    var $toggle     = $( '.menu-toggle' ),
				$toggleBody = $( 'body' );
		
			
		
		    //Add mobile menu to your website
	        $( 'nav.menu-container' ).clone().addClass( 'mobile' ).appendTo( 'body' );
		    //Wait until previous .appendTo() is complete
			$.when( $( '.menu-container.mobile' ).length > 0 ).then( function(){
				
		
				$( '.menu-toggle' ).on( 'touchstart click', function( e ) {
					e.stopPropagation(); 
					e.preventDefault();

					$( this ).toggleClass( 'open' );
					if ( $( this ).hasClass( 'open' ) ) {

						//Add mobile brand
						var logoURL = $( '.mobile-brand img' ).attr( 'src' );
						if ( typeof logoURL !== typeof undefined && logoURL != '' ) {
							if ( logoURL.indexOf( 'blank.gif' ) >= 0 ) $( '.mobile-inner' ).css( 'margin-top', '-70px' );
						}	

						//Toggle effect
						$toggleBody.addClass( 'menu-open' );
					} else {
						$toggleBody.removeClass( 'menu-open' );
					}

				});



				// Menu click event
				$( '.menu-container.mobile ul li' ).on( 'click', function( e ) {

					  var arrowText = $( this ).find( '.mobile-nav-arrow' ).text().replace( /(.).*\1/g, "$1" );
					  $( this ).find( '> .sub-menu:not(.sub-sub)' ).toggle();

					  if ( arrowText != '-' ) {
						  $( this ).find( '.mobile-nav-arrow' ).text( '-' );
					  } else {
						  $( this ).find( '.mobile-nav-arrow' ).text( '+' );
					  }


				} );
				
				
				sidrmenuInit( windowWidth ); 

				// Close the menu on window change
				$window.on( 'resize', function() {
					// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
					if ( $window.width() != windowWidth ) {

						// Update the window width for next time
						windowWidth = $window.width();

						// Do stuff here
						$toggleBody.removeClass( 'menu-open' );
						$( '.menu-toggle' ).removeClass( 'open' );
						sidrmenuInit( windowWidth );


					}
				});

				
			});
		
		

			
			function sidrmenuInit( w ) {
				
				if ( w <= 768 ) {
					$( '.menu-container.mobile .menu-main > li' ).each( function() {
						if ( $( this ).find( 'ul' ).length > 0 ) {
							if ( $( this ).find( '.mobile-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="mobile-nav-arrow">+</em>' );
							$( this ).find( 'ul ul' ).addClass( 'sub-sub' );
							$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0);' );
						}
					} );		
				}
	

			}
			
		
		
	};
	
		
    theme.mobileMenu = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Modal Dialog
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		function getTransitionDuration( elementOrSelector ){
			var $el, durString, isMS, numberStr, numberNum;
			$el = $( elementOrSelector );
			if( $el.length === 0 ){
				return false;
			}
			$el = $($el[0]); // Force just the first item.  need more?  use .each
			
			var dur = $el.css('transition-duration');
			if( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}
			
			durString = dur.toLowerCase();
			isMS = durString.indexOf( 'ms' ) >= 0;
			numberNum = durString.replace( 'ms', '' ).replace( 's', '' );
			return isMS ? numberNum : numberNum * 1000;
		}
		
	
	    $( 'body' ).prepend( '<div class="modal-mask"></div>' );
		$( document ).on( 'click', '[data-modal-id]', function() {
			var dataID = $( this ).data( 'modal-id' ),
			    dataH  = $( this ).data( 'modal-height' ),
				dataW  = $( this ).data( 'modal-width' ),
				$obj   = $( '.modal-box#'+dataID );
			
			// Initializate modal
			$( this ).attr( 'href', 'javascript:void(0)' );
			$obj.find( '.content' ).addClass( 'no-fullscreen' );
			
			
			if ( $( this ).data( 'video-win' ) ) {
				$obj.find( '.content' ).css( 'overflow-y', 'hidden' );
			}
			
			
			if ( $obj.length > 0 ) {
				if( typeof dataH != typeof undefined && dataH != '' ) {
					$obj.css( {'height': dataH } );
				}
				
				if( typeof dataW != typeof undefined && dataW != '' ) {
					$obj.css( {'width': dataW } );
				}
				
				$( '.modal-mask' ).fadeIn( 'fast' );
				$obj.addClass( 'active' );	
			}
			
			if ( $obj.hasClass( 'fullscreen' ) ) {
				setTimeout( function() {
					$( 'html' ).css( 'overflow-y', 'hidden' );
					if ( !$obj.hasClass( 'video' ) ) {
						$obj.find( '.content' ).css( 'overflow-y', 'scroll' );
					}
					
				}, getTransitionDuration( '.modal-box#'+dataID ) );
				
			}
		
		});
		
		$( document ).on( 'click', '.modal-box .close-btn', function() {
			$( this ).parent().removeClass( 'active' );
		});
		
		$( document ).on( 'click', '.modal-box .close-btn, .modal-mask', function() {
			$( '.modal-box' ).removeClass( 'active' );
			$( '.modal-mask' ).fadeOut( 'fast' );
			$( '.modal-box' ).find( '.content' ).removeClass( 'no-fullscreen' );
			$( 'html' ).css( 'overflow-y', 'auto' );
			setTimeout( function() {
	
			}, getTransitionDuration( '.modal-box:first' ) );
			
		});
		
	};
		
      
    theme.modalbox = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Multiple Items Carousel
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		$( '.custom-multi-items-carousel' ).each( function()  {

			var $carouselWrapper   = $( this ),
				$carousel          = $carouselWrapper.find( '.items' ),
				$carouselItem      = $carouselWrapper.find( '.items > .item' ),
				carouselItemTotal  = $carouselItem.length,
				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
				carouselItemWidth  = $carousel.width()/showcarouselItem,
				carouselItemHeight = $carousel.height()/showcarouselItem,
				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );

			if( typeof carouselDir === typeof undefined ) {
				carouselDir = 'horizontal';
			}
			
			if( typeof carouselLoop === typeof undefined ) {
				carouselLoop = false;
			}
			if( typeof showcarouselItem === typeof undefined ) {
				showcarouselItem = 3;
			}
			if( typeof carouselSpeed === typeof undefined ) {
				carouselSpeed = 250;
			}
			if( typeof carouselNext === typeof undefined ) {
				carouselNext = '.next';
			}
			if( typeof carouselPrev === typeof undefined ) {
				carouselPrev = '.prev';
			}


			/*! 
			 ---------------------------
			 Initialize carousel
			 ---------------------------
			 */  
			var newWidth, newHeight;
			if ( carouselDir == 'horizontal' ) { 
				newWidth = ( $carouselWrapper.width() / showcarouselItem );
				$carousel.css( 'width', carouselItemTotal * carouselItemWidth );
			} else {
				newHeight = ( $carouselWrapper.height() / showcarouselItem );
				$carousel.css( 'height', carouselItemTotal * carouselItemHeight );
			}


			// Re-order all items
			carouselReOrder();



			//default button status
			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
				$( carouselPrev ).addClass( 'disable' );
			}	

			/*! 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function carouselReOrder() {
				
				//Active the center item
				carouselActiveCenterItem( $carouselItem, 'default' );
				
				$carouselItem.each( function( index ) {
				

						if ( carouselDir == 'horizontal' ) {
							$( this )
								.width( newWidth + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						} else {
							$( this )
								.height( newHeight + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						}

					});	
			}
			
			/*! 
			 ---------------------------
			 Active the center item
			 ---------------------------
			 */ 
			
			function carouselActiveCenterItem( el, dir ) {
				var curItemIndex    = (showcarouselItem/2).toFixed(0),
					centerItemIndex = Math.floor(showcarouselItem / 2)-1;		
				el.removeClass( 'active active-prev active-next' );
				
				
				
				if ( dir == 'left' ) {
					el.eq( curItemIndex ).addClass( 'active' );
					
				} else if ( dir == 'right' ) {
					el.eq( centerItemIndex ).addClass( 'active' );	
					
				} else if ( dir == 'default' ) {
					el.eq( curItemIndex - 1 ).addClass( 'active' );		
				}
				
				//Add nearest classes for 3 elements
				el.each( function() {
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).prev().addClass( 'active-prev' );
						$( this ).next().addClass( 'active-next' );
						
						return false;
					}
				});	
				
				
				
			}	
			

			
			
			/*! 
			 ---------------------------
			 Move left
			 ---------------------------
			 */ 
			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
				
				
				var $btn        = $( this ),
					btnLock     = $btn.data( 'click' ),
					$curWrapper = $( e.data[0] ),
					$curItems   = $curWrapper.children().find( '> .item' ),
					isEnd       = false;
				
				
				
				//Move to the end
				if ( (carouselItemTotal - showcarouselItem + 1) == $curItems.first().data( 'id' ) ) {
					isEnd = true;
				}
				if ( (carouselItemTotal - showcarouselItem) == $curItems.first().data( 'id' ) && !carouselLoop ) {
					$btn.addClass( 'disable' );
				}
				
				
				//Loop items
				if ( carouselLoop ) {
					isEnd = false;
				}
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					if ( !isEnd ) {
						
						//Avoid button repeated trigger
						$btn.data( 'click', 1 );
						
						if ( carouselDir == 'horizontal' ) {
							
							$curItems
								.first()
								.animate({
									'marginLeft': -carouselItemWidth
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-left"
									$curItems.css( 'margin-left', 0 );

									//Clone the first element to the last position
									$curItems
										.first()
										.clone()
										.appendTo( $carousel );


									$( this ).remove();



									//Active the center item
									carouselActiveCenterItem( $curItems, 'left' );
									
									
									//Reset prevents code from duplicate run
									$( carouselPrev ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );	
							
						} else {
							
							$curItems
								.first()
								.animate({
									'marginTop': -carouselItemHeight
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-top"
									$curItems.css( 'margin-top', 0 );

									//Clone the first element to the last position
									$curItems
										.first()
										.clone()
										.appendTo( $carousel );


									$( this ).remove();



									//Active the center item
									carouselActiveCenterItem( $curItems, 'left' );


									//Reset prevents code from duplicate run
									$( carouselPrev ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );		
						}

	
					}


					
	
				}


			});

			
			/*! 
			 ---------------------------
			 Move right
			 ---------------------------
			 */ 
			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();

				
				var $btn        = $( this ),
					btnLock     = $btn.data( 'click' ),
					$curWrapper = $( e.data[0] ),
					$curItems   = $curWrapper.children().find( '> .item' ),
					isEnd       = false;

				
				
				//Move to the end
				if ( 1 == $curItems.first().data( 'id' ) ) {
					isEnd = true;
				}
				if ( 2 == $curItems.first().data( 'id' ) && !carouselLoop ) {
					$btn.addClass( 'disable' );
				}
				
				
				//Loop items
				if ( carouselLoop ) {
					isEnd = false;
				}
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					if ( !isEnd ) {
						
						//Avoid button repeated trigger
						$btn.data( 'click', 1 );

				
						//Clone the first element to the last position
						if ( carouselDir == 'horizontal' ) {
							$curItems
								.last()
								.clone()
								.prependTo( $carousel )
								.css( 'margin-left', -carouselItemWidth + 'px' )
								.animate({
									'marginLeft': 0
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-left"
									$curItems.css( 'margin-left', 0 );


									$curItems
										.last()
										.remove();


									//Active the center item
									carouselActiveCenterItem( $curItems, 'right' );
									

									//Reset prevents code from duplicate run
									$( carouselNext ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );			
							
						} else {
							$curItems
								.last()
								.clone()
								.prependTo( $carousel )
								.css( 'margin-top', -carouselItemHeight + 'px' )
								.animate({
									'marginTop': 0
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-top"
									$curItems.css( 'margin-top', 0 );


									$curItems
										.last()
										.remove();



									//Active the center item
									carouselActiveCenterItem( $curItems, 'right' );


									//Reset prevents code from duplicate run
									$( carouselNext ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );		
						}
						
						
	
					}


					
	
				}
				
				

			});
			
			
			


		});		
		
		
    };

    theme.multiItemsCarousel = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );







/*! 
 *************************************
 * Navigation Highlighting
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
        // Get section or article by href
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }
        // Get link by section or article id
        function getRelatedNavigation( el ) {
            return $( '.menu-main li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );
        } 
        
	    //-------- Navigation highlighting using waypoints
		if ( $( 'body' ).hasClass( 'onepage' ) ) {


			// Smooth scroll to content
			$( '.menu-main li > a' ).on('click', function(e) {
				e.preventDefault();

				$( 'html,body' ).animate({
					scrollTop: getRelatedContent( this ).offset().top - 20
				});
			});	

			//-------- Default cwaypoint settings
			var topSectionSpacing = $( '.header-area' ).outerHeight( true );
			var waypoints1 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {


					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'down' );
					$( this.element ).toggleClass( 'active', direction === 'down' );

				},
				offset: topSectionSpacing
			});	

			var waypoints2 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {

					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'up' );
					$( this.element ).toggleClass( 'active', direction === 'up' );

				},
				offset: function() {  
					return -$( this.element ).height() - topSectionSpacing; 
				}
			});	

			setTimeout( function() {
				$( '.menu-main li:first' ).addClass( 'active' );
			}, 1000 );	
		}

		
		
		
		
    };

    theme.navHighlight = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








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
		parallaxInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				parallaxInit( windowWidth );
		

			}
		});
		
		
		function parallaxInit( w ) {
			
			/* Pure parallax scrolling effect without other embedded HTML elements */
			$( '.pure-bg-parallax' ).each(function() {
				var $this       = $( this ),
					dataImg     = $this.data( 'parallax-bg' ),
					dataSpeed   = $this.data( 'parallax' );
				
				if( typeof dataSpeed === typeof undefined ) {
					dataSpeed = 0;
				}
				
				$this.css( 'background', 'url('+dataImg+')' );
				
				$this.bgParallax( "50%", dataSpeed );
		
			});
			
			
			/* Parallax scrolling effect with embedded HTML elements */
			$( '.parallax' ).each(function() {
				var $this       = $( this ),
				    dataAtt     = $this.data( 'parallax' ),
					dataH       = $this.data( 'height' ),
					dataW       = $this.data( 'width' ),
					dataImg     = $this.data( 'image-src' ),
					dataSkew    = $this.data( 'skew' ),
					dataSpeed   = $this.data( 'speed' ),
					dataElSpeed = $this.find( '.parallax-element' ).data( 'el-speed' );
				
				
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
				if ( w <= 768 ) {
					
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



/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.bgParallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);



/*! 
 *************************************
 * Periodical Scroll
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	
		$( '[data-periodical-scroll-container]' ).each(function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' );


			if( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			var $wrap  = $this.find( ul ),
				time   = timing,
				moveEv = null;
			
			//Initialize the container height
			$wrap.css({
				'height'   : $wrap.find( 'li:first' ).height() + 'px',
				'overflow' : 'hidden'
			});
			
 
			//Animation
			$wrap.on( 'mouseenter', function() {

				clearInterval( moveEv );

			} ).on( 'mouseleave' , function() {
				moveEv=setInterval(function(){
					var $item     = $wrap.find( 'li:first' ),
						curHeight = $item.height(); 

					$item.animate({marginTop: -curHeight + 'px' }, speed, function(){
						$item.css('marginTop',0).appendTo( $wrap );
					});

				}, time );
			} ).trigger('mouseleave');
			
			
		});
	
		
		
    };

    theme.periodicalScroll = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Pricing
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		//-------- Pricing initialize
		pricingInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				pricingInit( windowWidth );
		

			}
		});
		
		
		
		function pricingInit( w ) {
			//Initialize the height
			$( '.custom-price' ).each( function(){


					//returns new id
					var $this            = $( this ),
						priceBGH         = Array(),
						priceBGH_excerpt = Array(),
						$initHeight      = $this.find( '.init-height' );

					$initHeight.each( function( index ) {
						//Screen protection of height
						$( this ).find( '.border,.excerpt' ).css( 'height', 'auto' );

						var tempheight = $( this ).height();
						var tempheight_excerpt = $( this ).find( '.excerpt' ).height();
						priceBGH.push( tempheight );
						priceBGH_excerpt.push( tempheight_excerpt );


					} );

					var priceBGH_Max = Math.max.apply( Math, priceBGH );


					if ( priceBGH_Max > 0 ) {
						if ( w > 768 ){

							// Initialize the height of all columns
							$initHeight.find( '.border' ).css( 'height', priceBGH_Max + 'px' );

							// Actived columns
							$initHeight.find( '.border.active' ).each( function() {

								var ty = Math.abs( parseInt( $( this ).css('transform').split(',')[5]));
								if ( !isNaN(ty) ) {
									$( this ).css( 'height', priceBGH_Max + ty*2 + 'px' );
								}

							});	



						} else {
							$initHeight.find( '.border' ).css( 'height', 'auto' );


						}


						// Actived columns
						$initHeight.find( '.border.active' ).each( function() {

							var textColor = $( this ).closest( '.border-hover' ).data( 'tcolor' ),
								btnColor  = $( this ).closest( '.border-hover' ).data( 'bcolor' );

							$( this ).css( 'background-color', btnColor );
							$( this ).find( '.button' ).removeClass( 'button-bg-primary' ).addClass( 'button-bg-secondary' );


						});	



					}


			});
		}
		
		


		
    };

    theme.pricing = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );







/*! 
 *************************************
 * Progress Bar
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		$( '[data-progressbar-percent]' ).each(function() {

			var $this        = $( this ),
				percent      = $this.data( 'progressbar-percent' ),
				unit         = $this.data( 'progressbar-unit' );
			
			if( typeof percent === typeof undefined ) {
				percent = 0;
			}
			
			if( typeof unit === typeof undefined ) {
				unit = '%';
			}	
			
			
			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					
					
					//Radial Progress Bar
					if ( $this.hasClass( 'custom-radial-progressbar' ) ) {
						$this.find( '.track' ).html( '<span>'+percent+'<em class="unit">'+unit+'</em></span>' );
						$this.addClass( 'progress-' + percent );	
					} 


					//Rectangle Progress Bar
					if ( $this.hasClass( 'custom-rectangle-progressbar' ) ) {
						$this.find( '.bar > span' ).html( ''+percent+'<em class="unit">'+unit+'</em>' );
						$this.addClass( 'progress-' + percent );	
					} 
		
					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  
					

			    },
			    offset: '100%' //0~100%, bottom-in-view
			});


		});
		
		
	

		
		
    };

    theme.progressBar = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * Retina Graphics for Website
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		//Determine if you have retinal display
		var hasRetina  = false,
			rootRetina = (typeof exports === 'undefined' ? window : exports),
			mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
	
		if ( rootRetina.devicePixelRatio > 1 || rootRetina.matchMedia && rootRetina.matchMedia( mediaQuery ).matches ) {
			hasRetina = true;
		} 

		if ( hasRetina ) {
			//do something
			$( '[data-retina]' ).each( function() {
				$( this ).attr( {
					'src'     : $( this ).data( 'retina' ),
				} );
			});
		
		} 
		
		
	
		
	};
	
		
    theme.retina = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


/*! 
 *************************************
 * Scroll Reveal
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {

		//Reversing Scroll Animations in CSS with Waypoints
		if ( Modernizr.cssanimations ) {
			
			var $scrollRevealElements = $( '.scroll-reveal' ),
				waypoints             = $scrollRevealElements.waypoint({
				handler: function( direction ) {

					//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
					$( this.element ).addClass( 'animated fadeInUp' );

				},
				offset: '100%' //0~100%, bottom-in-view
			});

	
		}

		
		
	};
	
		
    theme.scrollReveal = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

/*! 
 *************************************
 * Show More Less
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-more-text-link' ).on( 'click', function( e ) {
			e.preventDefault();
			$( this ).parent().prev( '.custom-more-text' ).toggleClass( 'show' );
			$( this ).find( '> span' ).first().toggle();
			$( this ).find( '> span' ).eq(1).toggle();
			

		});
		
	};
		
      
    theme.showMoreLess = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Slideshow ( with custom flexslider )
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		

		var $window            = $( window ),
			windowWidth        = $window.width(),
			windowHeight       = $window.height(),
			specialSliderType  = [ 
				'.custom-primary-flexslider', 
				'.custom-parallax-flexslider', 
				'.custom-mousewheel-flexslider', 
				'.custom-controls', 
				'.custom-itemgrid', 
				'.custom-counter-show' 
			];
		
		
	
		/*
		 * Initialize embedded local video.
		 *
		 * @param  {object} wrapper          - The outermost video container, which can contain multiple videos
		 * @param  {boolean} play            - Forced to trigger pause or play events.
		 * @return {void}                    - The constructor.
		 */
		function videoEmbedInit( wrapper, play ) {
			wrapper.find( '.web-video-embed' ).each( function()  {
				var $this         = $( this ),
					curVideoID    = $this.find( '.video-js' ).attr( 'id' ),
					dataAuto      = $this.data( 'embed-video-autoplay' ),
					dataLoop      = $this.data( 'embed-video-loop' );

			
				if( typeof dataAuto === typeof undefined ) {
					dataAuto = true;
				}
				if( typeof dataLoop === typeof undefined ) {
					dataLoop = true;
				}
				
				//HTML5 video autoplay on mobile revisited
				if ( dataAuto && windowWidth <= 768 ) {
					$this.find( '.video-js' ).attr({
						'autoplay'    : 'true',
						'muted'       : 'true',
						'playsinline' : 'true'
					});
				}

				var myPlayer = videojs( curVideoID );


				myPlayer.ready(function() {

					//Pause the video when it is not current slider
					if ( !play ) {
						myPlayer.pause();
						myPlayer.currentTime(0);
					} else {
						if ( dataAuto && dataLoop ) {

							myPlayer.currentTime(0);
							myPlayer.play();

							//Should the video go to the beginning when it ends

							myPlayer.on( 'ended', function () { 
								myPlayer.currentTime(0);
								myPlayer.play();
							});		


						}	
					}
					

				});

			});	
		}	
		

		
		/*
		 * Make slider image draggable 
		 *
		 * @param  {object} $obj             - The current FlexSlider setup using custom selector.
		 * @return {void}                   - The constructor.
		 */
        function slidesExDraggable( $obj ) {
			
			//Make the cursor a move icon when a user hovers over an item
			$obj.find( '.custom-theme-slides > div.item' ).css( 'cursor', 'move' );
			

			//Mouse event
			$obj.on( 'mousedown', function( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				if ( $obj.data( 'flexslider' ).animating ) {
					return;
				}

				$( this ).addClass( 'dragging' );
				$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
				$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
				$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
				$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );
			} );

			$obj.on( 'mouseup', function( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				if ( $obj.data('flexslider').animating ) {
					return;
				}

				$( this ).removeClass( 'dragging' );
				var origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
					origin_mouse_y = $( this ).data( 'origin_mouse_y' );
				
				
				if ( 'horizontal' === $obj.data( 'flexslider' ).vars.direction ) {
					
					if ( origin_mouse_x > e.pageX ) {
						//left
						$obj.flexslider( 'next' );
					} else {
						//right
						$obj.flexslider( 'prev' );
					}
					
				} else {
					
					if ( origin_mouse_y > e.pageY ) {
						//up
						$obj.flexslider( 'next' );
					} else {
						//down
						$obj.flexslider( 'prev' );
					}
					
				}
			} );
			
			
        }

		
		/*
		 *  Scroll The Slider With Mousewheel
		 *
		 * @param  {object} $obj            - The current FlexSlider setup using custom selector.
		 * @return {void}                   - The constructor.
		 */
        function slidesExMousewheel( $obj ) {

			var timer    = null,
				wheeling = false;

			$obj.on( 'wheel', function( e ) {
				var deltaY = e.originalEvent.deltaY;

				if ( timer ) {
					clearTimeout( timer );
				}

				if ( !wheeling ) {
					if ( deltaY < 0 ) {
						//up
						$obj.flexslider( 'prev' );
					} else {
						//down
						$obj.flexslider( 'next' );
						
					}
				}

				wheeling = true;

				timer = setTimeout(function() {
					wheeling = false;
				}, 60 );

			});
			
        }	
		
	
		/*
		 * Return an event from callback function to each slider.
		 *
		 * @param  {object} slider          - The current slider.
		 * @return {void}                   - The constructor.
		 */
        function initslides( slider ) {

			var prefix    = 'custom-theme',
			    curSlide  = slider.find( '.'+prefix+'-flex-active-slide' ),
				curHeight = curSlide.height();
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( slider.find( '.item' ), false );
			videoEmbedInit( curSlide, true );

			//Auto-restart player if paused after action
			if ( slider.vars.slideshow ) {
				if ( !slider.playing ) {
					slider.play();
				}	
			}
			
			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				
				if ( typeof attr === typeof undefined ) {
					$( this ).attr( 'href', '#' );
				}
			});
			
			/*
			slider.slides.find( "a[rel^='theme-slider-prettyPhoto']" ).lightbox();
			*/
			
        }
	
		
		/*
		 * Return an event from callback function to each slider to make parallax effect.
		 *
		 * @param  {object} slider          - The current slider.
		 * @return {void}                   - The constructor.
		 */
        function initslidesSort( slider ) {

			var prefix    = 'custom-theme',
			    curSlide  = slider.find( '.'+prefix+'-flex-active-slide' ),
				curHeight = curSlide.height();
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
			//Make parallax effect
            var dir = 'left';

            $.each( slider.slides, function( i, item ) {
                var el = $( item );
                el.removeClass( 'right left' );
                if (i >= slider.animatingTo && dir !== 'right') {
                    dir = 'right';
                } else {
                    el.addClass( dir );
                }
            })
			
			
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( slider.find( '.item' ), false );
			videoEmbedInit( curSlide, true );

			//Auto-restart player if paused after action
			if ( slider.vars.slideshow ) {
				if ( !slider.playing ) {
					slider.play();
				}	
			}
			
			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				
				if ( typeof attr === typeof undefined ) {
					$( this ).attr( 'href', '#' );
				}
			});
			
		
			
        }		
		
	
		
		/*
		 * Return an event from callback function to each slider with dynamic min/max ranges.
		 *
		 * @param  {object} slider          - The current slider.
		 * @return {void}                   - The constructor.
		 */
        function initslidesItemgrid( slider ) {

			var prefix      = 'custom-theme',
				activeClass = prefix+'-flex-active-slide',
				prevClass   = activeClass + '-prev',
				nextClass   = activeClass + '-next',
				item        = '.custom-theme-slides > div.item';
			
			slider.removeClass( prefix+'-flexslider-loading' );
			
			// Fires local videos asynchronously with slider switch.
			videoEmbedInit( slider.find( '.item' ), false );
			videoEmbedInit( slider.find( '.'+prefix+'-flex-active-slide' ), true );
			
			
			$sliderItemgird.find( item ).removeClass( activeClass );
			$sliderItemgird.find( item ).removeClass( prevClass );
			$sliderItemgird.find( item ).removeClass( nextClass );
			
			//Focus slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide+1)+')' ).addClass( activeClass );
			
			//Previous slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide)+')' ).addClass( prevClass );
			
			//Next slider
			$sliderItemgird.find( item + ':eq('+parseFloat(slider.currentSlide+2)+')' ).addClass( nextClass );
			
			
	
			//Auto-restart player if paused after action
			if ( slider.vars.slideshow ) {
				if ( !slider.playing ) {
					slider.play();
				}	
			}
			
			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				
				if ( typeof attr === typeof undefined ) {
					$( this ).attr( 'href', '#' );
				}
			});
			
			
        }
		
		
		/*! 
		 ---------------------------
         Initialize primary slideshow
		 ---------------------------
		 */  
		var $sliderPrimaryEff = $( '.custom-primary-flexslider' );
		
		$sliderPrimaryEff.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );
			
			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );	

			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslides, //Fires when the slider loads the first slide
				after             : initslides //Fires after each slider animation completes.
			});
			

			
		});
		
		
		/*! 
		 ---------------------------
         Initialize parallax slideshow
		 ---------------------------
		 */  
		var $sliderParallaxEff = $( '.custom-parallax-flexslider' );
		
		$sliderParallaxEff.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );

			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				before            : initslidesSort, //Fires asynchronously with each slider animation.
				start             : initslidesSort //Fires when the slider loads the first slide
			});


			
		});
		
		
		
		/*! 
		 ---------------------------
         Initialize the slideshow with mousewheel
		 ---------------------------
		 */  
		var $sliderMousewheelEff = $( '.custom-mousewheel-flexslider' );
		
		$sliderMousewheelEff.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );

			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslidesMousewheel //Fires when the slider loads the first slide
			});


			
		});
		
		
	
		/*! 
		 ---------------------------
         Initialize slideshow (custom controls)
		 ---------------------------
		 */ 
		var $sliderMyControls = $( '.custom-theme-flexslider.custom-controls' );
		
		$sliderMyControls.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );
			
			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslides, //Fires when the slider loads the first slide
				after             : initslides, //Fires after each slider animation completes.
				controlsContainer : $( '.custom-controls-container' ),
				customDirectionNav: $( '.custom-navigation a' )
			});
		

			
		});
		
		
		

		/*! 
		 ---------------------------
         Initialize slideshow (display counter)
		 ---------------------------
		 */
		var $sliderCounterShow = $( '.custom-theme-flexslider.custom-counter-show' );
		
		$sliderCounterShow.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );
			
			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start: function( slider ) {
					var slide   = slider.currentSlide,
						count   = slider.count,
						current = slider.slides.eq( slider.currentSlide );	
					
					// Fires local videos asynchronously with slider switch.
					videoEmbedInit( slider.find( '.item' ), false );
					videoEmbedInit( current, true );


					$( 'p.count em.count' ).text( count );
					
					return $( 'p.count em.current' ).text( slide + 1 );
				},
				before: function( slider ) {
					var current = slider.slides.eq( slider.currentSlide ),
						prev    = slider.slides.eq( slider.currentSlide - 1 ),
						next    = slider.slides.eq( slider.animatingTo ),
						first   = slider.slides.eq( 0 );
					
					
					current.find( 'img' ).removeClass( 'active' );
					prev.find( 'img' ).removeClass( 'active' );
					next.find( 'img' ).addClass( 'active' );
					
					return first.find( 'img' ).removeClass( 'active' );
				},
				after: function( slider ) {
					var slide   = slider.currentSlide,
						current = slider.slides.eq( slider.currentSlide );	
					
					// Fires local videos asynchronously with slider switch.
					videoEmbedInit( slider.find( '.item' ), false );
					videoEmbedInit( current, true );
					
					
					$( 'p.count em.current' ).text( slide + 1 );
					
					return current.find( 'img' ).addClass( 'active' );
				},
				end: function( slider ) {
					var first = slider.slides.eq( 0 );
					
					return first.find( 'img' ).addClass( 'active' );
				}
			});
		

			
		});	
		
	
	
		
		/*! 
		 ---------------------------
         Initialize slideshow (with dynamic min/max ranges)
		 ---------------------------
		 */
		//store the slider in a local variable
		var $sliderItemgird = $( '.custom-theme-flexslider.custom-itemgrid' );
		
		// tiny helper function to add breakpoints
		function getGridSizeS() {
			return 3;
		}
		

		$sliderItemgird.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );
			
			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslidesItemgrid, //Fires when the slider loads the first slide
				after             : initslidesItemgrid, //Fires after each slider animation completes.
			    itemWidth         : 1,
				move              : 1, // Number of carousel items that should move on animation.
			    minItems          : getGridSizeS(), // use function to pull in initial value
			    maxItems          : getGridSizeS() // use function to pull in initial value
			});
			


			
		});
		
		
		
		/*! 
		 ---------------------------
         Initialize slideshow ( default )
		 ---------------------------
		 */
		var $sliderDefault, specialSliderClasses = '';
		for ( var i = 0; i < specialSliderType.length; i++ ) {
			specialSliderClasses += ':not('+specialSliderType[i]+')';
		}
		$sliderDefault = $( '.custom-theme-flexslider' + specialSliderClasses );
		
		$sliderDefault.each( function()  {
			var $this        = $( this ),
				dataSpeed    = $this.data( 'speed' ),
				dataDrag     = $this.data( 'draggable' ),
				dataWheel    = $this.data( 'wheel' ),
				dataTiming   = $this.data( 'timing' ),
				dataLoop     = $this.data( 'loop' ),
				dataPrev     = $this.data( 'prev' ),
				dataNext     = $this.data( 'next' ),
				dataAnim     = $this.data( 'animation' ),
				dataPaging   = $this.data( 'paging' ),
				dataArrows   = $this.data( 'arrows' ),
				dataAuto     = $this.data( 'auto' );
			
			// If there is no data-xxx, save current source to it
			if( typeof dataSpeed === typeof undefined ) dataSpeed = 600;
			if( typeof dataTiming === typeof undefined ) dataTiming = 10000;
			if( typeof dataLoop === typeof undefined ) dataLoop = true;
			if( typeof dataPrev === typeof undefined ) dataPrev = "<i class='fa fa-chevron-left'></i>";
			if( typeof dataNext === typeof undefined ) dataNext = "<i class='fa fa-chevron-right'></i>";
			if( typeof dataAnim === typeof undefined ) dataAnim = 'slide';
			if( typeof dataPaging === typeof undefined ) dataPaging = true;
			if( typeof dataArrows === typeof undefined ) dataArrows = true;
			if( typeof dataAuto === typeof undefined ) dataAuto = true;
			if( typeof dataDrag === typeof undefined ) dataDrag = false;
			if( typeof dataWheel === typeof undefined ) dataWheel = false;
			
			
			//Make slider image draggable 
			if ( dataDrag ) slidesExDraggable( $this );

			//Scroll The Slider With Mousewheel
			if ( dataWheel ) slidesExMousewheel( $this );
			
			$this.flexslider({
				namespace	      : 'custom-theme-flex-',
				animation         : dataAnim,
				selector          : '.custom-theme-slides > div.item',
				controlNav        : dataPaging,
				smoothHeight      : true,
				prevText          : dataPrev,
				nextText          : dataNext,
				animationSpeed    : dataSpeed,
				slideshowSpeed    : dataTiming,
				slideshow         : dataAuto,
				animationLoop     : dataLoop,
				directionNav      : dataArrows,
				start             : initslides, //Fires when the slider loads the first slide
				after             : initslides //Fires after each slider animation completes.
			});
			

			
		});
		

	
		
		
		/*! 
		 ---------------------------
         Check grid size on resize event
		 ---------------------------
		 */
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				$sliderPrimaryEff.each( function() {
					
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});
				
				
				$sliderParallaxEff.each( function() {
					
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});

				$sliderMousewheelEff.each( function() {
					
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});		
				
				
				$sliderDefault.each( function() {
					
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}			
					
				});
				
				$sliderMyControls.each( function() {
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}
				});
				
				$sliderCounterShow.each( function() {
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}
				});
				
				$sliderItemgird.each( function() {
					if ( $( this ).length > 0 ) {
						$( this ).data( 'flexslider' ).setup();
					}
				});
				
			}
		});
		

		
	};
	
		
    theme.flexSlider = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Source Code
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		//Add view source code to body
		$( 'body' ).prepend( '<a href="#source-code" id="view-source"><i class="fa fa-code" aria-hidden="true"></i></a><div id="source-code"><a href="javascript:void(0);" id="close"></a></div>' );
				
		
		//View source button event
		$( '#view-source' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'hidden' );
			$( '#source-code' ).show();
		});
		
		$( '#source-code > #close' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'auto' );
			var uri = window.location.toString();
			if ( uri.indexOf( '#' ) > 0 ) {
				var clean_uri = uri.substring(0, uri.indexOf( '#' ) );
				window.history.replaceState({}, document.title, clean_uri );
			}
			$( '#source-code' ).hide();
			
		});
		
		
		//Remove tag from HTML-String
		var removeElements = function( text, selector ) {
			var wrapped = $( "<div>" + text + "</div>" );
			wrapped.find( selector ).remove();
			return wrapped.html();
		};


		//Source code init
		var sourceCodeBodyClass      = $( 'body' ).attr( 'class' ),
			sourceCodeBodyClassCode  = ( typeof sourceCodeBodyClass != typeof undefined ) ? 'body class="'+sourceCodeBodyClass+'"' : 'body';
		
		$.get( window.location.toString(), function( data ) {
			var pageBodyCode   = data.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0],
				pageHeaderCode = data.split("</head>")[0];
			
			pageBodyCode   = removeElements( pageBodyCode, '#view-source, #source-code' );
			pageBodyCode   = pageBodyCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });
			pageHeaderCode = pageHeaderCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; })


			$("<pre />", {
				"html":   pageHeaderCode + '&lt;/head&gt;\n&lt;'+sourceCodeBodyClassCode+'&gt;\n' + pageBodyCode + '\n&lt;/body&gt;\n&lt;/html&gt;',
				"class": 'prettyprint lang-html'
			}).appendTo( '#source-code' );	
			
		});
		
		
		


		
	};
		
      
    theme.sourceCode = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Prettify
 *************************************
 */
!function(){/*

 Copyright (C) 2013 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
(function(){function aa(g){function r(){try{L.doScroll("left")}catch(ba){k.setTimeout(r,50);return}x("poll")}function x(r){if("readystatechange"!=r.type||"complete"==z.readyState)("load"==r.type?k:z)[B](n+r.type,x,!1),!l&&(l=!0)&&g.call(k,r.type||r)}var X=z.addEventListener,l=!1,E=!0,v=X?"addEventListener":"attachEvent",B=X?"removeEventListener":"detachEvent",n=X?"":"on";if("complete"==z.readyState)g.call(k,"lazy");else{if(z.createEventObject&&L.doScroll){try{E=!k.frameElement}catch(ba){}E&&r()}z[v](n+
"DOMContentLoaded",x,!1);z[v](n+"readystatechange",x,!1);k[v](n+"load",x,!1)}}function T(){U&&aa(function(){var g=M.length;ca(g?function(){for(var r=0;r<g;++r)(function(g){k.setTimeout(function(){k.exports[M[g]].apply(k,arguments)},0)})(r)}:void 0)})}for(var k=window,z=document,L=z.documentElement,N=z.head||z.getElementsByTagName("head")[0]||L,B="",F=z.getElementsByTagName("script"),l=F.length;0<=--l;){var O=F[l],Y=O.src.match(/^[^?#]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);if(Y){B=Y[1]||"";O.parentNode.removeChild(O);
break}}var U=!0,H=[],P=[],M=[];B.replace(/[?&]([^&=]+)=([^&]+)/g,function(g,r,x){x=decodeURIComponent(x);r=decodeURIComponent(r);"autorun"==r?U=!/^[0fn]/i.test(x):"lang"==r?H.push(x):"skin"==r?P.push(x):"callback"==r&&M.push(x)});l=0;for(B=H.length;l<B;++l)(function(){var g=z.createElement("script");g.onload=g.onerror=g.onreadystatechange=function(){!g||g.readyState&&!/loaded|complete/.test(g.readyState)||(g.onerror=g.onload=g.onreadystatechange=null,--S,S||k.setTimeout(T,0),g.parentNode&&g.parentNode.removeChild(g),
g=null)};g.type="text/javascript";g.src="https://cdn.rawgit.com/google/code-prettify/master/loader/lang-"+encodeURIComponent(H[l])+".js";N.insertBefore(g,N.firstChild)})(H[l]);for(var S=H.length,F=[],l=0,B=P.length;l<B;++l)F.push("https://cdn.rawgit.com/google/code-prettify/master/loader/skins/"+encodeURIComponent(P[l])+".css");F.push("https://cdn.rawgit.com/google/code-prettify/master/loader/prettify.css");(function(g){function r(l){if(l!==x){var k=z.createElement("link");k.rel="stylesheet";k.type=
"text/css";l+1<x&&(k.error=k.onerror=function(){r(l+1)});k.href=g[l];N.appendChild(k)}}var x=g.length;r(0)})(F);var ca=function(){"undefined"!==typeof window&&(window.PR_SHOULD_USE_CONTINUATION=!0);var g;(function(){function r(a){function d(e){var a=e.charCodeAt(0);if(92!==a)return a;var c=e.charAt(1);return(a=k[c])?a:"0"<=c&&"7">=c?parseInt(e.substring(1),8):"u"===c||"x"===c?parseInt(e.substring(2),16):e.charCodeAt(1)}function f(e){if(32>e)return(16>e?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);
return"\\"===e||"-"===e||"]"===e||"^"===e?"\\"+e:e}function c(e){var c=e.substring(1,e.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));e=[];var a="^"===c[0],b=["["];a&&b.push("^");for(var a=a?1:0,h=c.length;a<h;++a){var m=c[a];if(/\\[bdsw]/i.test(m))b.push(m);else{var m=d(m),p;a+2<h&&"-"===c[a+1]?(p=d(c[a+2]),a+=2):p=m;e.push([m,p]);65>p||122<m||(65>p||90<m||e.push([Math.max(65,m)|32,Math.min(p,90)|32]),97>p||122<m||
e.push([Math.max(97,m)&-33,Math.min(p,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});c=[];h=[];for(a=0;a<e.length;++a)m=e[a],m[0]<=h[1]+1?h[1]=Math.max(h[1],m[1]):c.push(h=m);for(a=0;a<c.length;++a)m=c[a],b.push(f(m[0])),m[1]>m[0]&&(m[1]+1>m[0]&&b.push("-"),b.push(f(m[1])));b.push("]");return b.join("")}function g(e){for(var a=e.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)",
"g")),b=a.length,d=[],h=0,m=0;h<b;++h){var p=a[h];"("===p?++m:"\\"===p.charAt(0)&&(p=+p.substring(1))&&(p<=m?d[p]=-1:a[h]=f(p))}for(h=1;h<d.length;++h)-1===d[h]&&(d[h]=++r);for(m=h=0;h<b;++h)p=a[h],"("===p?(++m,d[m]||(a[h]="(?:")):"\\"===p.charAt(0)&&(p=+p.substring(1))&&p<=m&&(a[h]="\\"+d[p]);for(h=0;h<b;++h)"^"===a[h]&&"^"!==a[h+1]&&(a[h]="");if(e.ignoreCase&&A)for(h=0;h<b;++h)p=a[h],e=p.charAt(0),2<=p.length&&"["===e?a[h]=c(p):"\\"!==e&&(a[h]=p.replace(/[a-zA-Z]/g,function(a){a=a.charCodeAt(0);
return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var r=0,A=!1,q=!1,I=0,b=a.length;I<b;++I){var t=a[I];if(t.ignoreCase)q=!0;else if(/[a-z]/i.test(t.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){A=!0;q=!1;break}}for(var k={b:8,t:9,n:10,v:11,f:12,r:13},u=[],I=0,b=a.length;I<b;++I){t=a[I];if(t.global||t.multiline)throw Error(""+t);u.push("(?:"+g(t)+")")}return new RegExp(u.join("|"),q?"gi":"g")}function l(a,d){function f(a){var b=a.nodeType;if(1==b){if(!c.test(a.className)){for(b=
a.firstChild;b;b=b.nextSibling)f(b);b=a.nodeName.toLowerCase();if("br"===b||"li"===b)g[q]="\n",A[q<<1]=r++,A[q++<<1|1]=a}}else if(3==b||4==b)b=a.nodeValue,b.length&&(b=d?b.replace(/\r\n?/g,"\n"):b.replace(/[ \t\r\n]+/g," "),g[q]=b,A[q<<1]=r,r+=b.length,A[q++<<1|1]=a)}var c=/(?:^|\s)nocode(?:\s|$)/,g=[],r=0,A=[],q=0;f(a);return{a:g.join("").replace(/\n$/,""),c:A}}function k(a,d,f,c,g){f&&(a={h:a,l:1,j:null,m:null,a:f,c:null,i:d,g:null},c(a),g.push.apply(g,a.g))}function z(a){for(var d=void 0,f=a.firstChild;f;f=
f.nextSibling)var c=f.nodeType,d=1===c?d?a:f:3===c?S.test(f.nodeValue)?a:d:d;return d===a?void 0:d}function E(a,d){function f(a){for(var q=a.i,r=a.h,b=[q,"pln"],t=0,A=a.a.match(g)||[],u={},e=0,l=A.length;e<l;++e){var D=A[e],w=u[D],h=void 0,m;if("string"===typeof w)m=!1;else{var p=c[D.charAt(0)];if(p)h=D.match(p[1]),w=p[0];else{for(m=0;m<n;++m)if(p=d[m],h=D.match(p[1])){w=p[0];break}h||(w="pln")}!(m=5<=w.length&&"lang-"===w.substring(0,5))||h&&"string"===typeof h[1]||(m=!1,w="src");m||(u[D]=w)}p=t;
t+=D.length;if(m){m=h[1];var C=D.indexOf(m),G=C+m.length;h[2]&&(G=D.length-h[2].length,C=G-m.length);w=w.substring(5);k(r,q+p,D.substring(0,C),f,b);k(r,q+p+C,m,F(w,m),b);k(r,q+p+G,D.substring(G),f,b)}else b.push(q+p,w)}a.g=b}var c={},g;(function(){for(var f=a.concat(d),q=[],k={},b=0,t=f.length;b<t;++b){var n=f[b],u=n[3];if(u)for(var e=u.length;0<=--e;)c[u.charAt(e)]=n;n=n[1];u=""+n;k.hasOwnProperty(u)||(q.push(n),k[u]=null)}q.push(/[\0-\uffff]/);g=r(q)})();var n=d.length;return f}function v(a){var d=
[],f=[];a.tripleQuotedStrings?d.push(["str",/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):a.multiLineStrings?d.push(["str",/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):d.push(["str",/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]);a.verbatimStrings&&
f.push(["str",/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var c=a.hashComments;c&&(a.cStyleComments?(1<c?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),f.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):d.push(["com",/^#[^\r\n]*/,null,"#"]));a.cStyleComments&&(f.push(["com",/^\/\/[^\r\n]*/,null]),f.push(["com",/^\/\*[\s\S]*?(?:\*\/|$)/,
null]));if(c=a.regexLiterals){var g=(c=1<c?"":"\n\r")?".":"[\\S\\s]";f.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+("/(?=[^/*"+c+"])(?:[^/\\x5B\\x5C"+c+"]|\\x5C"+g+"|\\x5B(?:[^\\x5C\\x5D"+c+"]|\\x5C"+g+")*(?:\\x5D|$))+/")+")")])}(c=a.types)&&f.push(["typ",c]);c=(""+a.keywords).replace(/^ | $/g,"");c.length&&f.push(["kwd",
new RegExp("^(?:"+c.replace(/[\s,]+/g,"|")+")\\b"),null]);d.push(["pln",/^\s+/,null," \r\n\t\u00a0"]);c="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(c+="(?!s*/)");f.push(["lit",/^@[a-z_$][a-z_$@0-9]*/i,null],["typ",/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],["pln",/^[a-z_$][a-z_$@0-9]*/i,null],["lit",/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,null,"0123456789"],["pln",/^\\[\s\S]?/,null],["pun",new RegExp(c),null]);return E(d,f)}function B(a,d,f){function c(a){var b=
a.nodeType;if(1==b&&!r.test(a.className))if("br"===a.nodeName.toLowerCase())g(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)c(a);else if((3==b||4==b)&&f){var e=a.nodeValue,d=e.match(n);d&&(b=e.substring(0,d.index),a.nodeValue=b,(e=e.substring(d.index+d[0].length))&&a.parentNode.insertBefore(q.createTextNode(e),a.nextSibling),g(a),b||a.parentNode.removeChild(a))}}function g(a){function c(a,b){var e=b?a.cloneNode(!1):a,p=a.parentNode;if(p){var p=c(p,1),d=a.nextSibling;
p.appendChild(e);for(var f=d;f;f=d)d=f.nextSibling,p.appendChild(f)}return e}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;a=c(a.nextSibling,0);for(var e;(e=a.parentNode)&&1===e.nodeType;)a=e;b.push(a)}for(var r=/(?:^|\s)nocode(?:\s|$)/,n=/\r\n?|\n/,q=a.ownerDocument,k=q.createElement("li");a.firstChild;)k.appendChild(a.firstChild);for(var b=[k],t=0;t<b.length;++t)c(b[t]);d===(d|0)&&b[0].setAttribute("value",d);var l=q.createElement("ol");l.className="linenums";d=Math.max(0,d-1|0)||0;for(var t=
0,u=b.length;t<u;++t)k=b[t],k.className="L"+(t+d)%10,k.firstChild||k.appendChild(q.createTextNode("\u00a0")),l.appendChild(k);a.appendChild(l)}function n(a,d){for(var f=d.length;0<=--f;){var c=d[f];V.hasOwnProperty(c)?Q.console&&console.warn("cannot override language handler %s",c):V[c]=a}}function F(a,d){a&&V.hasOwnProperty(a)||(a=/^\s*</.test(d)?"default-markup":"default-code");return V[a]}function H(a){var d=a.j;try{var f=l(a.h,a.l),c=f.a;a.a=c;a.c=f.c;a.i=0;F(d,c)(a);var g=/\bMSIE\s(\d+)/.exec(navigator.userAgent),
g=g&&8>=+g[1],d=/\n/g,r=a.a,k=r.length,f=0,q=a.c,n=q.length,c=0,b=a.g,t=b.length,v=0;b[t]=k;var u,e;for(e=u=0;e<t;)b[e]!==b[e+2]?(b[u++]=b[e++],b[u++]=b[e++]):e+=2;t=u;for(e=u=0;e<t;){for(var x=b[e],z=b[e+1],w=e+2;w+2<=t&&b[w+1]===z;)w+=2;b[u++]=x;b[u++]=z;e=w}b.length=u;var h=a.h;a="";h&&(a=h.style.display,h.style.display="none");try{for(;c<n;){var m=q[c+2]||k,p=b[v+2]||k,w=Math.min(m,p),C=q[c+1],G;if(1!==C.nodeType&&(G=r.substring(f,w))){g&&(G=G.replace(d,"\r"));C.nodeValue=G;var Z=C.ownerDocument,
W=Z.createElement("span");W.className=b[v+1];var B=C.parentNode;B.replaceChild(W,C);W.appendChild(C);f<m&&(q[c+1]=C=Z.createTextNode(r.substring(w,m)),B.insertBefore(C,W.nextSibling))}f=w;f>=m&&(c+=2);f>=p&&(v+=2)}}finally{h&&(h.style.display=a)}}catch(y){Q.console&&console.log(y&&y.stack||y)}}var Q="undefined"!==typeof window?window:{},J=["break,continue,do,else,for,if,return,while"],K=[[J,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],R=[K,"alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],L=[K,"abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
M=[K,"abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],K=[K,"abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN"],
N=[J,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],O=[J,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],J=[J,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],P=/^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
S=/\S/,T=v({keywords:[R,M,L,K,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",N,O,J],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),V={};n(T,["default-code"]);n(E([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),"default-markup htm html mxml xhtml xml xsl".split(" "));n(E([["pln",/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
["pun",/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);n(E([],[["atv",/^[\s\S]+/]]),["uq.val"]);n(v({keywords:R,hashComments:!0,cStyleComments:!0,types:P}),"c cc cpp cxx cyc m".split(" "));n(v({keywords:"null,true,false"}),["json"]);n(v({keywords:M,hashComments:!0,cStyleComments:!0,
verbatimStrings:!0,types:P}),["cs"]);n(v({keywords:L,cStyleComments:!0}),["java"]);n(v({keywords:J,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);n(v({keywords:N,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);n(v({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),
["perl","pl","pm"]);n(v({keywords:O,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);n(v({keywords:K,cStyleComments:!0,regexLiterals:!0}),["javascript","js","ts","typescript"]);n(v({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);n(E([],[["str",/^[\s\S]+/]]),
["regex"]);var U=Q.PR={createSimpleLexer:E,registerLangHandler:n,sourceDecorator:v,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:function(a,d,f){f=f||!1;d=d||null;var c=document.createElement("div");c.innerHTML="<pre>"+a+"</pre>";c=c.firstChild;f&&B(c,f,!0);H({j:d,m:f,h:c,l:1,a:null,i:null,c:null,g:null});
return c.innerHTML},prettyPrint:g=function(a,d){function f(){for(var c=Q.PR_SHOULD_USE_CONTINUATION?b.now()+250:Infinity;t<r.length&&b.now()<c;t++){for(var d=r[t],k=h,n=d;n=n.previousSibling;){var q=n.nodeType,l=(7===q||8===q)&&n.nodeValue;if(l?!/^\??prettify\b/.test(l):3!==q||/\S/.test(n.nodeValue))break;if(l){k={};l.replace(/\b(\w+)=([\w:.%+-]+)/g,function(a,b,c){k[b]=c});break}}n=d.className;if((k!==h||u.test(n))&&!e.test(n)){q=!1;for(l=d.parentNode;l;l=l.parentNode)if(w.test(l.tagName)&&l.className&&
u.test(l.className)){q=!0;break}if(!q){d.className+=" prettyprinted";q=k.lang;if(!q){var q=n.match(v),A;!q&&(A=z(d))&&D.test(A.tagName)&&(q=A.className.match(v));q&&(q=q[1])}if(x.test(d.tagName))l=1;else var l=d.currentStyle,y=g.defaultView,l=(l=l?l.whiteSpace:y&&y.getComputedStyle?y.getComputedStyle(d,null).getPropertyValue("white-space"):0)&&"pre"===l.substring(0,3);y=k.linenums;(y="true"===y||+y)||(y=(y=n.match(/\blinenums\b(?::(\d+))?/))?y[1]&&y[1].length?+y[1]:!0:!1);y&&B(d,y,l);H({j:q,h:d,m:y,
l:l,a:null,i:null,c:null,g:null})}}}t<r.length?Q.setTimeout(f,250):"function"===typeof a&&a()}for(var c=d||document.body,g=c.ownerDocument||document,c=[c.getElementsByTagName("pre"),c.getElementsByTagName("code"),c.getElementsByTagName("xmp")],r=[],k=0;k<c.length;++k)for(var n=0,l=c[k].length;n<l;++n)r.push(c[k][n]);var c=null,b=Date;b.now||(b={now:function(){return+new Date}});var t=0,v=/\blang(?:uage)?-([\w.]+)(?!\S)/,u=/\bprettyprint\b/,e=/\bprettyprinted\b/,x=/pre|xmp/i,D=/^code$/i,w=/^(?:pre|code|xmp)$/i,
h={};f()}},R=Q.define;"function"===typeof R&&R.amd&&R("google-code-prettify",[],function(){return U})})();return g}();S||k.setTimeout(T,0)})();}();


/*! 
 *************************************
 * Sticky Elements 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			topSpacing   = $( '.header-area' ).outerHeight( true ) + 10;
		
		
		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + $window.height() ),
				targetTop   = parseFloat( $( document ).height() - 200 );

			//Detecting when user scrolls to bottom of div
			if ( dynamicTop >= targetTop ) {
				
				
				$( '.stick-widget.sticky' )
					  .css( {
						  'top'  : parseFloat( topSpacing - (dynamicTop - targetTop) ) + 'px'
					  } );
				
			}


		});	

		$( '.stick-widget' ).each( function()  {
			
			var $this      = $( this ),
				oWIdth     = $this.width();
			
			
			var	waypoints = $this.waypoint({

			  handler: function( direction ) {
				  
				  $this
					  .toggleClass( 'sticky', direction === 'down' )
					  .css( {
						  'width': oWIdth + 'px',
						  'top'  : topSpacing + 'px'
					  } );
				  
				

			  },

			  offset: topSpacing

			});	
		});


		
    };

    theme.stickyElements = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * Testimonials Carousel
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		var $obj = $( '.custom-testimonials .flexslider' );
		$obj.flexslider({
			animation         : 'slide',
			slideshow         : true,
			smoothHeight      : true,
			controlNav        : true,
			manualControls    : '.slides-custom-control li',
			directionNav      : false,
			animationSpeed    : 600,
			slideshowSpeed    : 7000,
			selector          : ".slides > li",
			drag              : true,
			start: function(slider){
				$obj.on( 'mousedown', function( e ) {
					if ( $obj.data( 'flexslider' ).animating ) {
						return;
					}
						
					$( this ).addClass('dragging');
					$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
					$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
					$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );
				} );
			
				$obj.on( 'mouseup', function( e ) {
					if ( $obj.data('flexslider').animating ) {
						return;
					}
						
					$( this ).removeClass('dragging');
					var origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
					    origin_mouse_y = $( this ).data( 'origin_mouse_y' );
					
					if ( 'horizontal' === $obj.data('flexslider').vars.direction ) {
						if ( e.pageX > origin_mouse_x ) {
							$obj.flexslider('prev');
						}
						if ( e.pageX < origin_mouse_x ) {
							$obj.flexslider('next');
						}
					} else {
						if ( e.pageY > origin_mouse_y ) {
							$obj.flexslider('prev');
						}
						if ( e.pageY < origin_mouse_y ) {
							$obj.flexslider('next');
						}
					}
				} );
			}
		});
		
		
    };

    theme.testimonials = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








/*! 
 *************************************
 * Tabs
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
				rotationRadius    = $this.data( 'rotation-radius' ),
				rotationWapperDeg = $this.data( 'rotation-wrapper-angle' ),
				
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
				
				var increase   = Math.PI * 2 / liNum,
					radius     = rotationRadius,
					angle      = 0;
				
				//Initialize button position
				$this.find( 'ul' ).css({
							'transform'         : 'rotate('+ parseFloat( rotationWapperDeg ) +'deg)'
						})
						.find( '> li' )
						.css({
								'transform'         : 'rotate('+ -parseFloat( rotationWapperDeg )+'deg)'
							});
				
				
				$li.each( function( index ) {
					$( this ).css( {
						'left'              : Math.cos( - Math.PI / 2 + index * increase) * radius + 'px',
						'top'               : Math.sin( - Math.PI / 2 + index * increase) * radius + 'px'
					} );
					

					
					$( this ).on( 'click', function( e ) {
						
						var n        = $(this).index(),
							endAngle = n % liNum * increase; 


						( function turn() {
							if (Math.abs(endAngle - angle) > 1 / 8) {
								var sign = endAngle > angle ? 1 : -1;
								angle = angle + sign / 8;
								setTimeout(turn, 20);
							} else {
								angle = endAngle;
							}


							$li.each( function( index ) {
								$( this ).css( {
									'left'        : Math.cos( - Math.PI / 2 + index * increase - angle) * radius + 'px',
									'top'         : Math.sin( - Math.PI / 2 + index * increase - angle) * radius + 'px'
								} );

							});	


						})();	
						
					});
					
				});	
				

				
			}
			
			
			// Tab Sliding Effext
			$this.find( 'ul li:first' ).prepend( '<div class="marker"></div>' );
			
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				//sliding marker
				var translateX = $( this ).index() * 100,
					liHeight   = $this.find( 'ul li:first' ).outerHeight(),
					translateY = $( this ).index() * liHeight;
				
				if ( $( window ).width() <= 768 ) {
					$this.find( '.marker' ).css({
						'transform'          : 'translateY( '+translateY+'px )'	
					});	
				} else {
					$this.find( '.marker' ).css({
						'transform'          : 'translateX( '+translateX+'% )'	
					});	
				}

		
				
				return false;
				
				
			});
			
			// Init
			$this.find( 'ul > li.active' ).trigger( 'click' );
				
			
		});
		

		
	};
		
      
    theme.customTabs = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );




/*! 
 *************************************
 * Text effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
	//////////////// cipher
	var cipher = function() {
	  function e(a, d, b) {
		var c, f, g, h;
          
        if ( b == a.length ) {
            k.animationComplete = !0;
        } else {
            g = d.innerHTML;
            h = Math.floor(21 * Math.random() + 5);
            
            if ( 32 === a[b] ) {
               c = 32; 
            } else {
               c = a[b] - h; 
            }
            
            f = setInterval(function() {
                
              d.innerHTML = g + String.fromCharCode(c);

                if ( c == a[b] ) {
                    clearInterval( f );
                    c = 32;
                    b++;

                    setTimeout( function() {
                        e(a, d, b);
                    }, 10 );

                } else {
                    c++;
                }

            }, 5 );
            
        }
          
          
	  }
	  var k = {};
        
	  return k = {
          animationComplete : !1, 
          text              : function(a) {
                                    this.animationComplete = !1;
                                    a = document.getElementById(a);
                                    for ( var d = a.innerHTML, b = [], c = 0; c < d.length; c++ ) {
                                      b.push( d.charCodeAt( c ) );
                                    }
                                    a.innerHTML = "";
                                    e(b, a, 0);
	                          }
      };
        
	}();


    var pageLoaded = function() {

		setTimeout(function() {
			if ( $( '#brand-text' ).text().length > 0 ) {
				cipher.text( 'brand-text' );
			}
			
		}, 1500 );	
		
    };

    theme.textEffect = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * Timeline
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height(),
			$timeline        = $( '.list-timeline-container-outer.horizontal > .list-timeline-container' ),
			$item            = $timeline.find( '.list-timeline-item' );
				

		
		//--------  Timeline Event
		if ( windowWidth > 768 ) {
			$( '.list-timeline-container-outer-wrapper.horizontal' ).each( function()  {


				var $this = $( this );

				$this.css( 'height', $this.height() - 17 + 'px' ); //Scrollbar width is 17px by default


				$this.find( '.timeline-prev' ).on( 'click', function( e ) {
					e.preventDefault();
					timelinePrev( $this, false );
					return false;
				});

				$this.find( '.timeline-next' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineNext( $this, false );
					return false;
				});

				$this.find( '.list-timeline-item' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineNext( $this, $( this ) );
					return false;
				});



			});	
		}

		
		
		function timelinePrev( obj, iscur ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;
			}
			
			
			
			
			//loop the items
			if ( tLoop ) {
				if ( tarIndex < 0 ) tarIndex = itemTotal-1;
			} else {
				if ( tarIndex < 0 ) tarIndex = 0;
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
			
			
		}


		function timelineNext( obj, iscur ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;
			}
			
			
			
			
			//loop the items
			if ( tLoop ) {
				if ( tarIndex == itemTotal ) tarIndex = 0;
			} else {
				if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
			}
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );
			

			//scroll right
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			
		}




    };

    theme.timeline = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/*! 
 *************************************
 * AJAX
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*
		 * Apply the original scripts
		 *
		 * @return {void}  - The constructor.
		 */
		function applyOriginalScripts() {
			var pageLoaded    = theme.components.pageLoaded,
				documentReady = theme.components.documentReady;
			
			pageLoaded[1](); //Multiple columns full height for Bootstrap 3.x
			pageLoaded[2](); //Parallax
			pageLoaded[3](); //Sticky Elements 
			pageLoaded[4](); //Text effect
			pageLoaded[5](); //Timeline
			
			
			documentReady[0]($); //Header
			documentReady[1]($); //Back to Top
			
			
		}

	};
	
		
    theme.ajax = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


