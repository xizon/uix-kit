/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-renderer' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			viewRenderer              = '3D-renderer';
		
		
		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			clock = new THREE.Clock();

		init();
		render();

		function init() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.rotateSpeed = 0.5;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.enableZoom = true;
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.25;
			controls.screenSpacePanning = false;
			controls.minDistance = 1000;
			controls.maxDistance = 1500;
			controls.maxPolarAngle = Math.PI / 2;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			light = new THREE.HemisphereLight( 0xffbf67, 0x15c6ff );
			scene.add( light );

			//WebGL Renderer
			renderer = new THREE.WebGLRenderer( { 
									alpha    : true, 
									antialias: true 
								} );
			renderer.setClearColor( 0xffffff, 0 );
			renderer.setSize( windowWidth - 50, windowHeight - 50 );
			renderer.domElement.style.zIndex = 5;
			document.getElementById( viewRenderer ).appendChild( renderer.domElement );

			
			//Add HTML elements to scene
			var target  = $( '#html3D-view' ).clone(),
				pages   = target.find( '.html3D-view-content' );

			pages.each( function() {
				var el = new THREE.CSS3DObject( $.parseHTML( $( this )[0].outerHTML )[0] );

				el.position.x = $( this ).data( 'position-x' ) || 0;
				el.position.y = $( this ).data( 'position-y' ) || 0;
				el.position.z = $( this ).data( 'position-z' ) || 0;
				el.rotation.x = $( this ).data( 'rotation-x' ) || 0;
				el.rotation.y = $( this ).data( 'rotation-y' ) || 3.14159265358979;
				el.rotation.z = $( this ).data( 'rotation-z' ) || 0;

				scene.add( el );
			});
			

			
			
			//CSS3D Renderer
			renderer = new THREE.CSS3DRenderer();
			renderer.setSize( windowWidth, windowHeight );
			renderer.domElement.style.position = 'absolute';
			renderer.domElement.style.top = 0;
			document.getElementById( viewRenderer ).appendChild( renderer.domElement );

			// Fires when the window changes
			window.addEventListener( 'resize', onWindowResize, false );
			
			
		}

		function render() {
			requestAnimationFrame( render );

            var delta = clock.getDelta();
			
			controls.update();
			
			renderer.render( scene, camera );
			
		}
		
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}



		
    };

    App.threeDimensionalPages = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );








