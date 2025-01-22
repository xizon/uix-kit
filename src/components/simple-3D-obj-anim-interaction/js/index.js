/* 
 *************************************
 * <!-- 3D Object Anim When Click -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';

import { OrbitControls } from '@uixkit/plugins/THREE/esm/controls/OrbitControls';


export const THREE_OBJ_ANIM_INTERACTION = ( ( module, $, window, document ) => {
	if ( window.THREE_OBJ_ANIM_INTERACTION === null ) return false;
	
	
	
    module.THREE_OBJ_ANIM_INTERACTION               = module.THREE_OBJ_ANIM_INTERACTION || {};
    module.THREE_OBJ_ANIM_INTERACTION.version       = '0.0.6';
    module.THREE_OBJ_ANIM_INTERACTION.documentReady = function( $ ) {

        //Prevent this module from loading in other pages
        if ( $( '#3D-object-buttonevent-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
        
        
        let sceneSubjects = []; // Import objects and animations dynamically
        const MainStage = function() {
    
            
            let	windowWidth        = window.innerWidth,
                windowHeight       = window.innerHeight;
            
            const rendererCanvasID = '3D-object-buttonevent-canvas';
    
    
            let renderer, 
                scene, 
                controls, 
                camera, 
                targetObj, 
                parent, 
                material;
    
    
            const radius = 3,
                  height = 6,
                  segments = 200; //segments must be even
    
    
            function init() {
    
                // Create a camera, which defines where we're looking at.		
                renderer = new THREE.WebGLRenderer( { 
                                        canvas   : document.getElementById( rendererCanvasID ), //canvas
                                        alpha    : true, 
                                        antialias: true 
                                    } );
                renderer.setSize( windowWidth, windowHeight );
    
    
                //Scene
                scene = new THREE.Scene();
    
    
                //camera
                camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 1, 100);
                camera.position.set(3, -1, 2);
        
                //controls
                controls = new OrbitControls(camera, renderer.domElement);
                controls.addEventListener('change', function() {
                    renderer.render(scene, camera);
                }, false);
                controls.enableZoom = false;
                controls.enablePan = false;
    
    
                // Immediately use the texture for material creation
                material = new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: .8
                });
    
    
                //put the target object inside a parent object so the manipulation is easier
                parent = new THREE.Object3D();
    
    
                addObject();
    
                parent.position.set(-radius, height / 2, 0);
                parent.rotation.y = Math.PI;
                scene.add(parent);
    
    
                renderer.render(scene, camera);
            }
    
    
    
    
    
            function addObject() {
    
    
                const geometry = new THREE.BufferGeometry();
                // create a simple square shape. We duplicate the top left and bottom right
                // vertices because each vertex needs to appear once per triangle.
                const vertices = new Float32Array( [
                    -1.0, -1.0,  1.0,  // bottom left
                     1.0, -1.0,  1.0,  // bottom right
                     1.0,  1.0,  1.0,  // top right
                
                     1.0,  1.0,  1.0,  // top right?
                    -1.0,  1.0,  1.0,  // top left?
                    -1.0, -1.0,  1.0   // bottom left?
                ] );
                
                // itemSize = 3 because there are 3 values (components) per vertex
                geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
                targetObj = new THREE.Mesh(geometry, material);
    
                parent.add( targetObj );
            }
    
    
    
            function render() {
    
                requestAnimationFrame( render );
    
    
                //upodate object
                targetObj.geometry.attributes.position.needsUpdate = true;
    
    
                //update camera and controls
                controls.update();
    
    
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
    
    
    
            $( '#3D-object-button1' ).on( 'click', function( e ) {
                e.preventDefault();
    
                const theta = 55,
                      x     = camera.position.x,
                      z     = camera.position.z,
                      moveX = x * Math.cos( theta ) - z * Math.sin( theta ),
                      moveZ = z * Math.cos( theta ) + x * Math.sin( theta );	
    
                TweenMax.to( camera.position, 1.5, {
                    x: moveX,
                    z: moveZ,
                    ease: Power0.easeNone,
                    onUpdate: function(){
    
    
                    }
    
                });
    
            });
    
            $( '#3D-object-button2' ).on( 'click', function( e ) {
                e.preventDefault();
    
                const points = targetObj.geometry.attributes.position.array;
                const targetPoints = [
                    -2.0, -1.0,  1.0,  // bottom left
                     1.0, -3.0,  1.0,  // bottom right
                     1.0,  2.0,  -2.0,  // top right
                
                     -1.0,  -1.0,  1.0,  // top right?
                    -1.0,  1.0,  1.0,  // top left?
                    -1.0, -1.0,  1.0   // bottom left?
                ];
    
    
                 targetPoints.ease = Power2.easeOut;
                 TweenMax.to(points, 2, targetPoints);
                 
                 targetPoints.onUpdate = function() {
                    targetObj.geometry.attributes.position.needsUpdate = true;
                 }
    
    
            });
    
            $( '#3D-object-button3' ).on( 'click', function( e ) {
                e.preventDefault();
    
                const scaleTo = Math.floor(Math.random() * Math.floor( 3 ) );
    
                TweenMax.to( targetObj.scale, 1.5, {
                    x: scaleTo,
                    y: scaleTo,
                    z: scaleTo,
                    ease: Power0.easeNone,
                    onUpdate: function(){
    
                    }
    
                });
    
            });
    
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

    module.components.documentReady.push( module.THREE_OBJ_ANIM_INTERACTION.documentReady );
	

	return class THREE_OBJ_ANIM_INTERACTION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


