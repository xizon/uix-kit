
/* 
 *************************************
 * <!-- Videos -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.VIDEOS               = APP.VIDEOS || {};
	APP.VIDEOS.version       = '0.0.8';
    APP.VIDEOS.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;
		
		
		
		
		/* 
		 ---------------------------
		 Video Embed
		 ---------------------------
		 */  
		$( '.uix-video' ).each( function()  {
			var $this          = $( this ),
			    curVideoID     = $this.find( 'video' ).attr( 'id' ),
				coverPlayBtnID = 'videocover-' + curVideoID,
				videoWrapperW  = $this.closest( '[data-embed-video-wrapper]' ).width(),
				dataAuto       = $this.data( 'embed-video-autoplay' ),
				dataLoop       = $this.data( 'embed-video-loop' ),
				dataControls   = $this.data( 'embed-video-controls' ),
				dataW          = $this.data( 'embed-video-width' ),
				dataH          = $this.data( 'embed-video-height' );

			
			//Push a new ID to video
			//Solve the problem that ajax asynchronous loading does not play
			$this.find( '.video-js' ).attr( 'id', curVideoID );
	
			
			if ( typeof dataAuto === typeof undefined ) {
				dataAuto = true;
			}
			if ( typeof dataLoop === typeof undefined ) {
				dataLoop = true;
			}
			if ( typeof dataControls === typeof undefined ) {
				dataControls = false;
			}	
			
			
			if ( typeof dataW === typeof undefined || dataW == 'auto' ) {
				dataW = videoWrapperW;
			}	
			
			if ( typeof dataH === typeof undefined || dataH == 'auto' ) {
				dataH = videoWrapperW/1.77777777777778;
			}
			
			//Display cover and play buttons when some mobile device browsers cannot automatically play video
			if ( $( '#' + coverPlayBtnID ).length == 0 ) {
				
				$( '<div id="'+coverPlayBtnID+'" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url('+$this.find( 'video' ).attr( 'poster' )+')"></span><span class="uix-video__cover__playbtn"></span></div>' ).insertBefore( $this );
				
				
	
				var btnEv = ( Modernizr.touchevents ) ? 'touchstart' : 'click';
				$( '#' + coverPlayBtnID + ' .uix-video__cover__playbtn' ).on( btnEv, function( e ) {
					e.preventDefault();
					
					myPlayer.play();
					
					$( '#' + coverPlayBtnID ).hide();

				});
				
				//Prevent some devices from automatically playing video and trigger with buttons
				if ( !dataAuto || browser.isAndroid ) {
					$( '#' + coverPlayBtnID + ' .uix-video__cover__playbtn' ).show();
				}

			}
			
			
			
			 

			/* ---------  HTML5 video autoplay on mobile revisited  */
			if ( windowWidth <= 768 ) {
				$this.find( '.video-js' ).attr({
					'playsinline' : 'true'
				});
			}
			
			var myPlayer = videojs( curVideoID, {
					                  width     : dataW,
					                  height    : dataH,
				                      loop      : dataLoop,
				                      autoplay   : dataAuto
					
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
					
				
					if ( !isNaN( newW ) && !isNaN( newH ) )  {
						myPlayer.height( newH );		
						myPlayer.width( newW );		
					}

					
					//Show this video wrapper
					$this.css( 'visibility', 'visible' );
					


					//Hide loading effect
					$this.find( '.vjs-loading-spinner, .vjs-big-play-button' ).hide();

				});		
			


			
				
				/* ---------  Set, tell the player it's in fullscreen  */
				if ( dataAuto ) {

					myPlayer.muted( true ); //Fix an error of Video auto play is not working in browser
					myPlayer.play();

				}

				/* ---------  Disable control bar play button click */
				if ( !dataControls ) {
					myPlayer.controls( false );
				}
				
				
				/* ---------  Determine if the video is auto played from mobile devices  */
				var autoPlayOK = false;

				myPlayer.on( 'timeupdate', function() {

					var duration = this.duration();
					if ( duration > 0 ) {
						autoPlayOK = true;
						if ( this.currentTime() > 0 ) {
							autoPlayOK = true;
							this.off( 'timeupdate' );

							//Hide cover and play buttons when the video automatically played
							$( '#' + coverPlayBtnID ).hide();
						} 

					}

				});
				



			});
			
		});
		
		
	
		/* 
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
				videoContainerVid = videoContainerMid + '--videopush';
				
			
			if ( typeof videoSrcMp4 === typeof undefined ) {
				videoSrcMp4 = '';
			}	
			
			if ( typeof videoSrcWebm === typeof undefined ) {
				videoSrcWebm = '';
			}	
			
			if ( typeof videoSrcOgv === typeof undefined ) {
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
				
				v += '<div class="uix-modal-box is-fullscreen is-video" id="'+videoContainerMid+'">';
				v += '<a href="javascript:void(0)" class="uix-modal-box__close"></a>';
				v += '<div class="uix-modal-box__content">';
				v += '<div class="uix-modal-box__video-waiting"></div><div class="uix-modal-box__video-container" data-video-player-init="0">';
				
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

			var vid          = $( this ).data( 'modal-id' ) + '--videopush',
				$ifm         = false,
				newMaxW      = windowWidth - 80,
				newMaxH      = windowHeight - 80,
				$vContainer  = $( '#' + vid ).closest( '.uix-modal-box__video-container' ),
				$vLoader     = $vContainer.prev( '.uix-modal-box__video-waiting' ),
				myPlayerInit = $vContainer.data( 'video-player-init' );

			

			//----- Hidden/Display the wrapper of video
			var displayVC = function() {
				
				TweenMax.set( $vContainer, {
					alpha: 1
				});
				$vLoader.removeClass( 'active' );
			};
			
			var hiddenVC = function() {
				
				TweenMax.set( $vContainer, {
					alpha: 0
				});

				$vLoader.addClass( 'active' );
			};

			
			

			
			//----- Embed iframe
			if ( $( '#' + vid ).find( 'iframe' ).length > 0 ) {
				$ifm = $( '#' + vid ).find( 'iframe' );
			} else {
				hiddenVC();
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


			//----- HTML5 video autoplay on mobile revisited
			if ( windowWidth <= 768 ) {
				$( '#' + vid ).attr({
					'playsinline' : 'true'
				});
			}
			
			


			//----- Embed local video
			var myPlayer     = videojs( vid, {
									  width     : 1,
									  height    : 1,
									  autoplay  : true,
									  loop      : true
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


					myPlayer.height( newH );		
					myPlayer.width( newW );


					//In order to allow CSS to support video centering
					$vContainer.find( ' > div.video-js' ).css({
						'width' : newW + 'px'
					});			
					
					
					//Vertically center the video area
					var mt = parseFloat( windowHeight - newH )/2 - 50;
					$vContainer.css({
						'transform' : 'translateY('+ mt +'px)'
					});			
					
					//Display the wrapper of video
					displayVC();
					
					//If a player instance has already been created for this variable.
					$vContainer.data( 'video-player-init', 1 );

					
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

					//console.log( progressAmount );
				});

				/* ---------  Callback for when a video has ended */
				myPlayer.on( 'ended', function() {
					//console.log( 'video is done!' );
				});


			});

			
			/* ---------  Display the wrapper of video  */
			if ( myPlayerInit === 1 ) {
				displayVC();
			}
			
			
			/* ---------  Close the modal  */
			$( document ).on( 'click', '.uix-modal-box .uix-modal-box__close, .uix-modal-mask:not(.js-uix-disabled)', function() {

				myPlayer.ready(function() {
					myPlayer.pause();
					
				});				

			});


		});
		
    };

    APP.components.documentReady.push( APP.VIDEOS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );

