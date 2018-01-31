
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
		 ------------------
		 Video Embed
		 ------------------
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
			if ( dataAuto ) {
				$this.find( '.video-js' ).attr({
					'autoplay'    : 'true',
					'muted'       : 'true',
					'playsinline' : 'true'
				});
			}
			
			


			var myPlayer = videojs( curVideoID, {
					                  width     : dataW,
					                  height    : dataH,
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
		 ------------------
		 Video Popup Interaction
		 ------------------
		 */  
		//Check out: http://docs.videojs.com/tutorial-player-workflows.html
		$( '.web-video-btn' ).off( 'click' ).on( 'click', function() {
			
			var newMaxW  = windowWidth - 80,
				newMaxH  = windowHeight - 80,
				vid      = $( this ).data( 'video-id' ),
				myPlayer = videojs( vid, {
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
			$( '.modal-box .close-btn' ).on( 'click', function() {
				
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
