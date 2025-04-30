/* 
 *************************************
 * <!-- 3D Specular -->
 *************************************
 */

/**
 * module.THREE_SPECULAR
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/plugins/THREE
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';

import { OrbitControls } from '@uixkit/plugins/THREE/esm/controls/OrbitControls';

import fragment from "./shader/fragment-custom.glsl";
import vertex from "./shader/vertex-custom.glsl";

import fragment2 from "./shader/fragment-custom2.glsl";
import vertex2 from "./shader/vertex-custom2.glsl";

export const THREE_SPECULAR = ( ( module, $, window, document ) => {
	if ( window.THREE_SPECULAR === null ) return false;
	
	
    module.THREE_SPECULAR               = module.THREE_SPECULAR || {};
    module.THREE_SPECULAR.version       = '0.0.1';
    module.THREE_SPECULAR.documentReady = function( $ ) {

        //Prevent this module from loading in other pages
        if ( $( '#3D-specular-three-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
        
    
        let sceneSubjects = []; // Import objects and animations dynamically
        const MainStage = function() {
    
    
            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
    
            const rendererCanvasID          = '3D-specular-three-canvas';
    
    
            // Generate one plane geometries mesh to scene
            //-------------------------------------	
            let mirrorObject,
                mirrorObject2,
                mirrorObject3,
                camera,
                controls,
                scene,
                light,
                renderer,
                theta        = 0;
    
    
            let shaderMaterial, 
                shaderMaterial2,
                shaderMaterial3,
                offsetWidth  = $( '#' + rendererCanvasID ).parent().width(),
                offsetHeight = $( '#' + rendererCanvasID ).parent().height();
    
    
            function init() {
                //camera
                camera = new THREE.PerspectiveCamera( 75, windowWidth / windowHeight, 1, 10000 );
                camera.position.set(0, 0, 1000);
    
    
    
                //Scene
                scene = new THREE.Scene();
    
                //HemisphereLight
                scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );
    
                //SpotLight
                light = new THREE.SpotLight( 0xffffff, 1.5 );
                light.position.set( 0, 0, 300 );
                light.penumbra = 0.3;  // The degree of blurriness at the edge of the light spot
                light.decay = 0.1; // !!!Important
                light.castShadow = true; // !!!Important
                scene.add( light );
    
                /*
                const spotLightHelper = new THREE.SpotLightHelper( light );
                scene.add( spotLightHelper );   
                */
       
    
                //WebGL Renderer	
                renderer = new THREE.WebGLRenderer( { 
                                        canvas   : document.getElementById( rendererCanvasID ), //canvas
                                        alpha    : true, 
                                        antialias: true 
                                    } );
                renderer.setSize( offsetWidth , offsetHeight );
                
                // map quality and shadow
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
                
                //controls
                controls = new OrbitControls( camera, renderer.domElement);
                controls.autoRotate = false;
                controls.autoRotateSpeed = 0.5;
                controls.rotateSpeed = 0.5;
                controls.zoomSpeed = 1.2;
                controls.panSpeed = 0.8;
                controls.enableZoom = true;
                controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                controls.dampingFactor = 0.25;
                controls.screenSpacePanning = false;
                controls.minDistance = 100;
                controls.maxDistance = 500;
                controls.maxPolarAngle = Math.PI / 2;
    
                controls.target.set( 30, 167, 81 );
                controls.update();			
    
    
                // Immediately use the texture for material creation
                // Create a texture loader so we can load our image file
                const loader = new THREE.TextureLoader();
                loader.crossOrigin = 'anonymous';
    
    
                const dispImage    = $( '#' + rendererCanvasID ).data( 'bg-texture' ), //Load background image
                      disp         = loader.load( dispImage );
    
                disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
                disp.encoding = THREE.sRGBEncoding;
                disp.colorSpace = THREE.SRGBColorSpace; // !!!Important
    
    
                const roughnessMap = loader.load($( '#' + rendererCanvasID ).data( 'filter-texture2' ));
                roughnessMap.repeat.set(1, 1);
                roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
    
                const normalMap = loader.load($( '#' + rendererCanvasID ).data( 'filter-texture1' ));
                normalMap.repeat.set(1, 1);
                normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    
    
                // Environment maps
                const envMapsData = $( '#' + rendererCanvasID ).data( 'environment-maps-texture' );
                const envLoader = new THREE.CubeTextureLoader();
                // const envTexture = envLoader.load([
                //     'px.png', // Positive X
                //     'nx.png', // Negative X
                //     'py.png', // Positive Y
                //     'ny.png', // Negative Y
                //     'pz.png', // Positive Z
                //     'nz.png'  // Negative Z
                // ]);
                const envTexture = envLoader.load(envMapsData);
                envTexture.encoding = THREE.sRGBEncoding; // Ensure correct color space
    
                
    
                const bgMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(offsetWidth * 1.7 , offsetHeight * 2),
                    new THREE.MeshStandardMaterial({
                        map: disp,
                        roughness: 0.5,
                        metalness: 0.0,
                      })
                );
                bgMesh.position.set(0, 0, -200);
                bgMesh.receiveShadow = true; // !!!Important
                scene.add(bgMesh);
         
                // Custom Shader Material for Mirror-like Reflections
                shaderMaterial = new THREE.RawShaderMaterial({
                    uniforms: {
                        envMap: { value: envTexture },
                        roughnessMap: { value: roughnessMap },
                        normalMap: { value: normalMap },
                        time: { value: 0 },
                        repeat: { value: 1 },
                        innerScatter: { value: 0 },
                        outerScatter: { value: 0 },
                        normalScale: { value: 1 },
                        reflectivity: { value: 1 },
                        roughness: { value: 0 },
                        darkness: { value: 0 },
                        smoothness: { value: 0 },
                    },
                    // wireframe: true,
                    vertexShader: vertex,
                    fragmentShader: fragment,
                    glslVersion: THREE.GLSL3,
                });
                  
    
    
                shaderMaterial2 = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0.0 },
                        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                        waterColor: { value: new THREE.Color(0x001e0f) },
                        sunColor: { value: new THREE.Color(0xffffff) },
                        sunDirection: { value: new THREE.Vector3(1, 1, 1).normalize() },
                        distortionScale: { value: 3.7 },
                        envMap: { value: null }, // Environment Maps (Cubemaps, for Reflections)
                    },
                    vertexShader: vertex2,
                    fragmentShader: fragment2,
                    transparent: true,
                    side: THREE.DoubleSide
                });
    
    
                shaderMaterial3 = new THREE.RawShaderMaterial({
                    uniforms: {
                        envMap: { value: envTexture },
                        roughnessMap: { value: null },
                        normalMap: { value: null },
                        time: { value: 0 },
                        repeat: { value: 1 },
                        innerScatter: { value: 0 },
                        outerScatter: { value: 0 },
                        normalScale: { value: 1 },
                        reflectivity: { value: 1 },
                        roughness: { value: 0 },
                        darkness: { value: 0 },
                        smoothness: { value: 0 },
                    },
                    // wireframe: true,
                    vertexShader: vertex,
                    fragmentShader: fragment,
                    glslVersion: THREE.GLSL3,
                });
                  
                  
    
                const radius = 130;
                const detail = 0;
                mirrorObject = new THREE.Mesh(
                    new THREE.IcosahedronGeometry(radius, detail),
                    shaderMaterial
                );
                mirrorObject.position.y = 100;
                mirrorObject.position.x = -200;
                scene.add(mirrorObject);
                mirrorObject.castShadow = true;     // Objects can cast shadows  // !!!Important
                mirrorObject.receiveShadow = true;  // Objects can receive shadows  // !!!Important
    
        
                //
                mirrorObject2 = new THREE.Mesh(
                    new THREE.IcosahedronGeometry(radius, detail),
                    shaderMaterial2
                );
                mirrorObject2.position.y = 100;
                mirrorObject2.position.x = 100;
                scene.add(mirrorObject2);
                mirrorObject2.castShadow = true;     // Objects can cast shadows  // !!!Important
                mirrorObject2.receiveShadow = true;  // Objects can receive shadows  // !!!Important
    
                //
                mirrorObject3 = new THREE.Mesh(
                    new THREE.IcosahedronGeometry(radius, detail),
                    shaderMaterial3
                );
                mirrorObject3.position.y = 100;
                mirrorObject3.position.x = 400;
                scene.add(mirrorObject3);
                mirrorObject3.castShadow = true;     // Objects can cast shadows  // !!!Important
                mirrorObject3.receiveShadow = true;  // Objects can receive shadows  // !!!Important
    
    
                // Fires when the window changes
                window.addEventListener( 'resize', onWindowResize, false );
    
            }
    
    
            function render() {
                requestAnimationFrame( render );
    
                theta += 0.1;
    
    
                //To set a background color.
                //renderer.setClearColor( 0x000000 );	
    
    
                //update camera and controls
                controls.update();
    
                // update material
                const t = window.performance.now() * 0.00005;
                shaderMaterial.uniforms.time.value = t;
                mirrorObject.rotation.x = 1.89 * t;
                mirrorObject.rotation.y = 2.8 * t;
                mirrorObject.rotation.z = 1.91 * t;
    
    
                //
                shaderMaterial2.uniforms.time.value = t;
                mirrorObject2.rotation.x = -1.89 * t;
                mirrorObject2.rotation.y = -2.8 * t;
                mirrorObject2.rotation.z = 1.91 * t;
    
    
                //
                shaderMaterial3.uniforms.time.value = t;
                mirrorObject3.rotation.x = 0.89 * t;
                mirrorObject3.rotation.y = -0.8 * t;
                mirrorObject3.rotation.z = -0.91 * t;
    
                                
                //push objects
                /*
                @Usage: 
    
                    function CustomObj( scene ) {
    
                        const elements = new THREE...;
                        scene.add( elements );
    
                        this.update = function( time ) {
                            elements.rotation.y = time*0.003;
                        }
                    }       
    
                    sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
                */
                for( let i = 0; i < sceneSubjects.length; i++ ) {
                    sceneSubjects[i].update( clock.getElapsedTime()*1 );  
                }
    
                //render the scene to display our scene through the camera's eye.
                renderer.render( scene, camera );
    
    
    
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
    
        MainStage.init();
        MainStage.render();
        
        
    
        
    };
    module.components.documentReady.push( module.THREE_SPECULAR.documentReady );
	

	return class THREE_SPECULAR {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );






