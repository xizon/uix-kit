/* 
 *************************************
 * <!-- Simulate HTML Layout with threejs -->
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


export const THREE_SIMULATE_HTML_LAYOUT = ( ( module, $, window, document ) => {
	if ( window.THREE_SIMULATE_HTML_LAYOUT === null ) return false;
	
	
	
    module.THREE_SIMULATE_HTML_LAYOUT               = module.THREE_SIMULATE_HTML_LAYOUT || {};
    module.THREE_SIMULATE_HTML_LAYOUT.version       = '0.0.1';
    module.THREE_SIMULATE_HTML_LAYOUT.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#app-3D-page-container' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
      

		//=====================================================================================
		//=====================================================================================
		//==============================THREE.js===============================================
		//=====================================================================================
		//=====================================================================================
		//=====================================================================================


		const $window                 = $( window );
		let	windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight;



		//scroll spy
		let scrollY = 0;
		let touchStartY = 0;
		const _event = {
			y: 0,
			deltaY: 0
		};
		const scrollTrigger = document.getElementById( 'app-3D-page-container' );
		const maxHeight = (scrollTrigger.clientHeight || scrollTrigger.offsetHeight) - window.innerHeight;




		// THREE PARAMS
		//-------------------------------------	
		let camera = null,
			scene = null,
			renderer;

		let clock = new THREE.Clock(), time = 0;
		const dataBGSources = [];



		// Loader manager
		const loadingManager = new THREE.LoadingManager();

		loadingManager.onLoad = function() {
			//console.log( '▶▶▶▶▶ Loading complete! ◀◀◀◀◀◀' );
		};

		loadingManager.onProgress = function ( item, loaded, total ) {
			//console.log( '▶▶▶▶▶ LoadingManager ◀◀◀◀◀◀ ( item: '+item+', loaded: '+loaded+', total: '+total+')' );
		};

		loadingManager.onError = function(url) {
			console.log( '▶▶▶▶▶ There was an error loading ◀◀◀◀◀◀  ' + url );
		};

		const loaderImage = new THREE.TextureLoader(loadingManager);

		loaderImage.crossOrigin = 'anonymous';    


		function SubStageInit( $rendererInnerCanvas, wrapperHeight, wrapperWidth, offsetLeft ) {

			console.log( 'wrapperHeight: ' + wrapperHeight );

			//=================
			//camera
			camera = new THREE.OrthographicCamera( - wrapperWidth / wrapperHeight / 2, wrapperWidth / wrapperHeight / 2, 1 / 2, -1 / 2, -0.1, 0.1);
			camera.position.set( 0, 0, 0 );
			camera.lookAt(new THREE.Vector3(0, 0, 0));


			//=================
			//Scene
			scene = new THREE.Scene();



			//=================
			//WebGL Renderer		
			renderer = new THREE.WebGLRenderer( { 
									alpha    : true, 
									antialias: true 
								} );
			renderer.setSize( wrapperWidth, wrapperHeight );
			renderer.shadowMap = true;
			renderer.shadowMapSoft = true;

			$rendererInnerCanvas[0].appendChild( renderer.domElement );




			//=================
			// Immediately use the texture for material creation
			let i = 0;

			//update image data
			document.querySelectorAll('.app-coverWebgl ~ img').forEach(function( thisImg ) {

				dataBGSources.forEach(function (item, i) {
					if ( item.url.indexOf( thisImg.src ) >= 0 || thisImg.src == item.url ) {
						item.visibleWidth = thisImg.width;
						item.visibleHeight = thisImg.height;
						item.top = thisImg.getBoundingClientRect().top;
						item.left = thisImg.getBoundingClientRect().left;

					}				
				});		
			});


			console.log( dataBGSources );
			document.querySelectorAll('.app-coverWebgl').forEach(function( thisImg ) {

				const _curURL = thisImg.getAttribute('data-url');
				let ratio;

				//
				(function(index) {
					window['tex' + i] = loaderImage.load( _curURL );
					window['tex' + i].anisotropy = renderer.capabilities.getMaxAnisotropy();
				})(i);		


				//
				dataBGSources.forEach(function (item, i) {

					if ( item.url.indexOf( _curURL ) >= 0 || _curURL == item.url ) {
						ratio = wrapperWidth/wrapperHeight;

						const _offsetLeft = offsetLeft/wrapperWidth * ratio;


						window['geometry' + i] = new THREE.BoxBufferGeometry(item.visibleWidth / wrapperHeight, item.visibleHeight / wrapperHeight, 40 / wrapperHeight);
						window['tex' + i].wrapS = window['tex' + i].wrapT = THREE.RepeatWrapping;
						window['materiel' + i] = new THREE.MeshBasicMaterial({
							map: window['tex' + i]
						});
						window['materiel' + i].map.minFilter = THREE.LinearFilter;
						window['mesh' + i] = new THREE.Mesh(window['geometry' + i], window['materiel' + i]);
						window['mesh' + i].material.transparent = true;
						window['mesh' + i].position.y = -(item.top + item.visibleHeight / 2) / wrapperHeight + 0.5; // car origine repere est au centre du view
						window['mesh' + i].position.x = (item.left * ratio + item.visibleWidth * ratio / 2) / wrapperWidth - 0.5 * ratio - _offsetLeft; // car origine repere est au centre du view

						//
						scene.add(window['mesh' + i]);

						//console.log( window['mesh' + i] );



					}				
				});	



				i++;
			});				




			//=================
			// Fires when the window changes
			window.addEventListener( 'resize', function(){
			   onWindowResize(wrapperWidth,wrapperHeight);
		   }, false );

			//=================
			// Fires scroll animation
			scrollTrigger.addEventListener('scroll', onScroll, {
				passive: false
			});
			/*
			mobile example
			scrollTrigger.addEventListener('touchstart', onTouchStart, { passive: false });
			scrollTrigger.addEventListener('touchmove', onTouchMove, { passive: false });*/	

		}

		function SubStageRender() {

			requestAnimationFrame( SubStageRender );

			//To set a background color.
			//renderer.setClearColor( 0x000000 );	

			var delta = clock.getDelta();


			//objects animation
			dataBGSources.forEach(function (item, i) {
				window['mesh' + i].rotation.y = 0.01 * scrollY;		
				window['mesh' + i].rotation.x = 0.004 * scrollY;		
			});	


			//render the scene to display our scene through the camera's eye.
			renderer.render( scene, camera );


		}


		function onWindowResize(w,h) {
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize( w, h );
		}

		//Destroy the 3D rendering process
		function destroy3DScene() {

			console.log( 'Destroy the 3D rendering process!' );

			//Clear the animations and scenes
			//------
			cancelAnimationFrame( SubStageRender );
			scene.remove();


			//Clear the renderer cache, no need to use in this demo
			//------
			renderer.dispose();
			renderer.forceContextLoss();
			renderer.content = null;
			renderer.domElement = null;


			//Clear the cache of the current obj object
			//------
			const cleanMaterial = function( material ) {
				//console.log('dispose material!')
				material.dispose();

				// dispose textures
				for (const key of Object.keys(material)) {
					const value = material[key];
					if (value && typeof value === 'object' && 'minFilter' in value) {
						//console.log('dispose texture!')
						value.dispose();
					}
				}
			};	


			scene.traverse(object => {
				if (!object.isMesh) return;

				//console.log('dispose geometry!');
				object.geometry.dispose();

				if (object.material.isMaterial) {
					cleanMaterial(object.material);
				} else {
					// an array of materials
					for (const material of object.material) cleanMaterial(material);
				}
			});

		}

		//=====================================================================================
		//=====================================================================================
		//===================================SCROLL ANIMATION==================================
		//=====================================================================================
		//=====================================================================================
		//=====================================================================================
		function onScroll(e) {

			scrollY = scrollTrigger.scrollTop;
			console.log(scrollTrigger.scrollTop);
		};


		/*
		mobile example
		function onTouchStart (e) {
			var t = (e.targetTouches) ? e.targetTouches[0] : e;
			touchStartY = t.pageY;
		};

		function onTouchMove (e) {
			var evt = _event;
			var t = (e.targetTouches) ? e.targetTouches[0] : e;
			evt.deltaY = (t.pageY - touchStartY) * 5;
			touchStartY = t.pageY;

				scroll(e)
		};*/





		//=====================================================================================
		//=====================================================================================
		//===================================IMAGES LOADER====================================
		//=====================================================================================
		//=====================================================================================
		//=====================================================================================


		const sources = [];

		//Push all images from page
		$( 'section' ).find( 'img' ).each(function() {
			sources.push(
				{
					"url": this.src,
					"type": 'img'
				}
			);

			//
			dataBGSources.push( {w: 0, h: 0,visibleWidth: 0, visibleHeight: 0, top: 0, left: 0, url: this.src } );
		}); 



		//===========

		const loadImages = function() {
			const promises = [];

			for (let i = 0; i < sources.length; i++) {

				if ( sources[i].type == 'img' ) {

					///////////
					// IMAGE //
					///////////   

					promises.push( 

						new Promise(function(resolve, reject) {

							const img = new Image();
							img.crossOrigin = "anonymous";
							img.src = sources[i].url;

							img.onload = function(image) {

							  //Compatible with safari and firefox
							  if ( typeof image.path === typeof undefined ) {
									return resolve( {
										w: 0,
										h: 0,
										url: image.target.currentSrc
									} );
							  } else {

									return resolve( {
										w: image.path[0].naturalWidth,
										h: image.path[0].naturalHeight,
										url: image.path[0].currentSrc
									} );
							  }	

							};  

						}).then( textureLoaded )
					);



				}

			}



			return Promise.all(promises);
		};


		let k = 0;
		const textureLoaded = function( data ) {

			//console.log( data );

			const _curURL = data.url;
			const _curW = data.w;
			const _curH = data.h;


			//update image data
			dataBGSources.forEach(function (item, i) {

				if ( _curURL.indexOf( item.url ) >= 0 || _curURL == item.url ) {
					item.w = _curW;
					item.h = _curH;
				}				
			});	


			k++;
			return k; 
		};


		//============
		//images loaded
		//Must be placed behind the loadImages()
		loadImages().then( function( images ) {
			console.log( '------images loaded!------' );




			//in order to calculate a correct height for all images
			setTimeout( function() {
				//Run 3D rendering process
				const $innerCanvas = $( '#app-3D-page-container' ).find( '.app-innerCanvas' );
				const canvasPosOffsetX = 15;
				const canvasPosOffsetY = -$( '#app-3D-page-container' )[0].getBoundingClientRect().top;

				$innerCanvas.css({
					'position': 'absolute',
					'z-index': '-1',
					'left': 0,
					'top': canvasPosOffsetY

				});
				if ( $innerCanvas.length > 0 ) {
					SubStageInit( $innerCanvas, $( '#app-3D-page-container' ).find( '.app-work-detail__wrapper' ).outerHeight( true ), $( '#app-3D-page-container' ).find( '.app-work-detail__wrapper' ).outerWidth( true ), $( '#app-3D-page-container' ).find( '.app-work-detail__wrapper' ).offset().left - canvasPosOffsetX );
					SubStageRender();

				}

				$( '#app-3D-page-container' ).css( 'overflow-y', 'auto' );

			}, 500 );




		});


		

		
    };

    module.components.documentReady.push( module.THREE_SIMULATE_HTML_LAYOUT.documentReady );
	

	return class THREE_SIMULATE_HTML_LAYOUT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


