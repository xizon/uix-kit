
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
		 ------------------
		 Video Popup Interaction
		 ------------------
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
