/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-renderer' ).length == 0 ) return false;
		
		
		
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			viewRenderer              = '3D-renderer';
		
		
		// HTML Render
		//-------------------------------------	
		function htmlRenderer() {
			this.camera;
			this.scene;
			this.renderer;
		}
		htmlRenderer.prototype.init = function( camera ) {
			this.scene  = new THREE.Scene();
			this.camera = camera;
			
			var target  = $( '#html3D-view' ).clone(),
				pages   = target.find( '.html3D-view-content' ),
				self    = this;

			pages.each( function() {
				var el = new THREE.CSS3DObject( $.parseHTML( $( this )[0].outerHTML )[0] );

				el.position.x = $( this ).data( 'position-x' ) || 0;
				el.position.y = $( this ).data( 'position-y' ) || 0;
				el.position.z = $( this ).data( 'position-z' ) || 0;
				el.rotation.x = $( this ).data( 'rotation-x' ) || 0;
				el.rotation.y = $( this ).data( 'rotation-y' ) || 3.14159265358979;
				el.rotation.z = $( this ).data( 'rotation-z' ) || 0;

				self.scene.add( el );
			});
			

			//CSS3D Renderer
			this.renderer = new THREE.CSS3DRenderer();
			this.renderer.setSize( windowWidth, windowHeight );
			this.renderer.domElement.style.position = 'absolute';
			this.renderer.domElement.style.top = 0;
			document.getElementById( viewRenderer ).appendChild( this.renderer.domElement );

			window.addEventListener( 'resize', function() {
				self.renderer.setSize( windowWidth, windowHeight );
				camera.aspect = windowWidth / windowHeight;
				camera.updateProjectionMatrix();
			}, false );
		}

		htmlRenderer.prototype.render = function() {
		    this.renderer.render( this.scene, this.camera );
		}

		
		
		
		// Generate one plane geometries mesh to scene
		//-------------------------------------	
		var camera,
			controls,
			scene,
			light,
			renderer,
			html3d = new htmlRenderer();

		threePagesInit();
		threePagesAnimate();

		function threePagesInit() {
			//camera
			camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 10000 );
			camera.position.set(0, 0, -1000);

			//controls
			controls = new THREE.OrbitControls( camera );
			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;

			//Scene
			scene = new THREE.Scene();

			//HemisphereLight
			light = new THREE.HemisphereLight( 0xffbf67, 0x15c6ff );
			scene.add( light );

			//WebGL Renderer
			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setClearColor( 0xffffff, 1 )
			renderer.setSize( windowWidth - 50, windowHeight - 50 );
			renderer.domElement.style.zIndex = 5;
			document.getElementById( viewRenderer ).appendChild( renderer.domElement );

			html3d.init( camera );
		}

		function threePagesAnimate() {
			requestAnimationFrame( threePagesAnimate );
			html3d.render();
			renderer.render( scene, camera );
			controls.update();
		}


		
    };

    App.threeDimensionalPages = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );








