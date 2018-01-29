
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

		//--------- Video Modal initialize
		//Check out: http://docs.videojs.com/tutorial-player-workflows.html
		$( 'video.video-js' ).each( function()  {
			$( this ).css({
				  'width'      : windowWidth - 80 + 'px',
				  'height'     : windowHeight - 150 + 'px'
			});
		});

		$( '.web-video-btn' ).on( 'click', function() {
			var vid = $( this ).data( 'video-id' ),
				myPlayer = videojs( vid, {
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
				
				  /* Set, tell the player it's in fullscreen  */
				  //myPlayer.exitFullscreen();
				  //myPlayer.requestFullscreen();
				  myPlayer.play();
				
				  /* Disable control bar play button click */
				  //myPlayer.controls( false );
				
				
				
				/* Display video playback progress  */
				myPlayer.on( 'timeupdate', function() {
					
					var duration       =  this.duration(),
						progressAmount = '0%';
					if ( duration > 0 ) {
						progressAmount = ((this.currentTime() / duration)*100) + "%";
					}
					
					console.log( progressAmount );
				});
				

				
				
				  /* Callback for when a video has ended */
				  myPlayer.on( 'ended', function() {
						console.log( 'video is done!' );
				  });
				
				
				  
				

			});
			


			
			
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
