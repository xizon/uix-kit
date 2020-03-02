/* 
 *************************************
 * <!-- 3D Filmic Effects -->
 *************************************
 */

/**
 * module.THREE_FILMIC_EFF
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
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



export const THREE_FILMIC_EFF = ( ( module, $, window, document ) => {
	if ( window.THREE_FILMIC_EFF === null ) return false;
	
	
	
    module.THREE_FILMIC_EFF               = module.THREE_FILMIC_EFF || {};
    module.THREE_FILMIC_EFF.version       = '0.0.2';
    module.THREE_FILMIC_EFF.documentReady = function( $ ) {

		
		//Prevent this module from loading in other pages
		if ( $( '#3D-filmic-effects-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
        var sceneSubjects = []; // Import objects and animations dynamically
		var MainStage = function() {

			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight,
				rendererCanvasID          = '3D-filmic-effects-canvas';




			// Generate one plane geometries mesh to scene
			//-------------------------------------	
			var camera,
				scene,
				lights = [],
				renderer,
                clock = new THREE.Clock();


            var intersectionPlane;
            
            var composer, bloomPass, filmPass;
            
	
			function init() {
		
				
				//=================
				//camera
				camera = new THREE.PerspectiveCamera( 60, windowWidth / windowHeight, 1, 10000 );
				camera.position.set( 0, 0, 100 );
				camera.lookAt(new THREE.Vector3(0, 0, 0));

				
				//=================
				//Scene
				scene = new THREE.Scene();

				
				//=================
				//Lights
				lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
				lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
				lights[ 2 ] = new THREE.DirectionalLight( 0xffffff );

				lights[ 0 ].position.set( 0, 200, 0 );
				lights[ 1 ].position.set( 100, 200, 100 );
				lights[ 2 ].position.set( 120, 200, 0 );
				lights[ 2 ].intensity = 0.6;

				scene.add( lights[ 0 ] );
				scene.add( lights[ 1 ] );
				scene.add( lights[ 2 ] );
				


				//=================
				//WebGL Renderer		
				renderer = new THREE.WebGLRenderer( { 
										canvas   : document.getElementById( rendererCanvasID ), //canvas
										alpha    : true, 
										antialias: true 
									} );
				renderer.setSize( windowWidth, windowHeight );
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;

                //=================
                //add bloom effect
                bloomPass = new THREE.BloomPass(
                    1,    // strength
                    25,   // kernel size
                    4,    // sigma ?
                    256,  // blur render target resolution
                );


                //add film effect
                filmPass = new THREE.FilmPass(
                    0.35,   // noise intensity
                    0.025,  // scanline intensity
                    648,    // scanline count
                    false,  // grayscale
                );



                //-----
                var renderPass = new THREE.RenderPass(scene, camera);
                var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
                effectCopy.renderToScreen = true;


                composer = new THREE.EffectComposer( renderer );
                composer.addPass(renderPass);
                composer.addPass(bloomPass);    
                composer.addPass(filmPass);
                composer.addPass(effectCopy);


				//=================
                var geo = new THREE.PlaneGeometry(100000, 100000);
                var mat = new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                });
                intersectionPlane = new THREE.Mesh(geo, mat);
                intersectionPlane.visible = false;
                scene.add(intersectionPlane);

                var hoverMaterial = new THREE.MeshNormalMaterial();
                var neutralMaterial = new THREE.MeshLambertMaterial({
                    color: 0xffcccc
                });
                var selectedMaterial = new THREE.MeshBasicMaterial({
                    color: 0x55ff88
                });

                var geo = new THREE.IcosahedronGeometry(30, 1);
                var mesh = new THREE.Mesh(geo, neutralMaterial);

                mesh.position.x = 0
                mesh.position.y = 0;
                mesh.position.z = 0;

                scene.add(mesh);
      
				//=================
				// Fires when the window changes
				window.addEventListener( 'resize', onWindowResize, false );

				

			}

			function render() {
	
				requestAnimationFrame( render );

				//To set a background color.
				renderer.setClearColor( 0x000000 );	

                
                //push objects
                /*
                @Usage: 

                    function CustomObj( scene ) {

                        var elements = new THREE...;
                        scene.add( elements );

                        this.update = function( time ) {
                            elements.rotation.y = time*0.003;
                        }
                    }       

                    sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
                */
                for( var i = 0; i < sceneSubjects.length; i++ ) {
                    sceneSubjects[i].update( clock.getElapsedTime()*1 );  
                }
        	

                //render the scene with filter
				composer.render();


			}


			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}




			// 
			//-------------------------------------	
			return {
				init                : init,
				render              : render,
				getRendererCanvasID : function () { return rendererCanvasID; },
				getScene            : function () { return scene; },
				getCamera           : function () { return camera; } 
			};


		}();
		
	
		// 
		MainStage.init();
		MainStage.render();

        
        
        
        // Add stars to scene
        //-------------------------------------	
        var starScene = MainStage.getScene();
        var starCamera = MainStage.getCamera();
        
        
        function Stars(scene, terrainSize) {

            var starsGeometry = new THREE.IcosahedronGeometry(terrainSize, 4);

            // geometry deformation
            for (var i=0; i<starsGeometry.vertices.length; i+=1) {
                var scalar = 1+ Math.random() + Math.random();
                starsGeometry.vertices[i].multiplyScalar(scalar)
            }

            var textureLoader = new THREE.TextureLoader();
            textureLoader.setCrossOrigin("anonymous");
            var texture = textureLoader.load( 'data:image/png;base64,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' );

            var starMaterial = new THREE.PointsMaterial({ map: texture, color: "#fff", size: 20, blending: THREE.AdditiveBlending, transparent: false });
            var stars = new THREE.Points(starsGeometry, starMaterial);
            scene.add(stars);

            this.update = function(time) {
                stars.rotation.y = time*0.13;
            }
        }    
        
        sceneSubjects.push( new Stars(starScene, 150) );
		

		
    };

    module.components.documentReady.push( module.THREE_FILMIC_EFF.documentReady );
	

	return class THREE_FILMIC_EFF {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


