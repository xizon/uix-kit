/* 
 *************************************
 * <!-- 3D Object Anim When Click -->
 *************************************
 */

/**
 * module.THREE_OBJ_ANIM_INTERACTION
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
    UixCssProperty,
    UixApplyAsyncScripts,
    UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


export const THREE_OBJ_ANIM_INTERACTION = ( ( module, $, window, document ) => {
	
	
    module.THREE_OBJ_ANIM_INTERACTION               = module.THREE_OBJ_ANIM_INTERACTION || {};
    module.THREE_OBJ_ANIM_INTERACTION.version       = '0.0.2';
    module.THREE_OBJ_ANIM_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-object-buttonevent-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		
		var MainStage = function() {


			var $window                   = $( window ),
				windowWidth               = window.innerWidth,
				windowHeight              = window.innerHeight,
				rendererCanvasID          = '3D-object-buttonevent-canvas';


			var renderer, 
				scene, 
				controls, 
				camera, 
				targetObj, 
				parent, 
				material,
				segLength;


			var radius = 3,
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
				camera.position.set(1, 1, 22);

				//controls
				controls = new THREE.OrbitControls(camera, renderer.domElement);
				controls.addEventListener('change', function() {
					renderer.render(scene, camera);
				}, false);
				controls.enableZoom = false;
				controls.enablePan = false;



				// Immediately use the texture for material creation
				material = new THREE.MeshPhongMaterial({
					color: 0xEB6D35,
					specular: 0xEB6D35,
					shininess: 15,
					flatShading: THREE.FlatShading,
					side: THREE.DoubleSide,
					transparent: true,
					opacity: .8
				});


				//HemisphereLight
				var light1 = new THREE.DirectionalLight(0xffffff);
				light1.position.set(-5, 10, 10);
				var light2 = new THREE.PointLight(0xffffff, .7, 0);
				light2.position.set(5, 5, -5);

				scene.add(light1, light2);

				//put the target object inside a parent object so the manipulation is easier
				parent = new THREE.Object3D();


				addObject();

				parent.position.set(-radius, height / 2, 0);
				parent.rotation.y = Math.PI;
				scene.add(parent);


				renderer.render(scene, camera);
			}





			function addObject() {
				var geo = new THREE.Geometry();
				segLength = Math.PI * 2 * radius / segments;
				geo.vertices.push(new THREE.Vector3(0, height / 2, 0));
				geo.vertices.push(new THREE.Vector3(0, -height / 2, 0));
				for (var i = 0; i < Math.floor(segments / 2); i++) {
					geo.vertices.push(new THREE.Vector3(0, height / 2, segLength * i));
					geo.vertices.push(new THREE.Vector3(0, -height / 2, segLength * i));
					geo.vertices.push(new THREE.Vector3(0, height / 2, -segLength * i));
					geo.vertices.push(new THREE.Vector3(0, -height / 2, -segLength * i));
				}
				geo.faces.push(new THREE.Face3(0, 1, 2));
				geo.faces.push(new THREE.Face3(1, 2, 3));
				geo.faces.push(new THREE.Face3(0, 1, 4));
				geo.faces.push(new THREE.Face3(1, 4, 5));
				for (var i = 1; i < Math.floor(segments / 2); i++) {
					geo.faces.push(new THREE.Face3(2 + (i - 1) * 4, 3 + (i - 1) * 4, 6 + (i - 1) * 4));
					geo.faces.push(new THREE.Face3(3 + (i - 1) * 4, 6 + (i - 1) * 4, 7 + (i - 1) * 4));
					geo.faces.push(new THREE.Face3(4 + (i - 1) * 4, 5 + (i - 1) * 4, 8 + (i - 1) * 4));
					geo.faces.push(new THREE.Face3(5 + (i - 1) * 4, 8 + (i - 1) * 4, 9 + (i - 1) * 4));
				}
				targetObj = new THREE.Mesh(geo, material);

				parent.add( targetObj );
			}



			function render() {

				requestAnimationFrame( render );


				//upodate object
				targetObj.geometry.verticesNeedUpdate = true;


				//update camera and controls
				controls.update();


				renderer.render( scene, camera );

			}



			$( '#3D-object-button1' ).on( 'click', function( e ) {
				e.preventDefault();

				var theta = 55,
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

				//1. tween the first segment of each side
				var w     = targetObj.geometry.vertices;

				w[2].x = w[3].x = w[4].x = w[5].x = -Math.sin( 0 ) * segLength;
				w[2].z = w[3].z = Math.cos( 0 ) * segLength;
				w[4].z = w[5].z = -Math.cos( 0 ) * segLength;

				//2. rest of the vertex can now refer to the fourth previous vertex, their reference in the algorithm
				for (var i = 6; i < w.length; i++) {

					//which segment from the origin the vertex belongs to
					var vIndex   = i,
						segIndex = Math.floor((vIndex + 2) / 4),
						negate   = (vIndex / 4 === Math.floor(vIndex / 4) || (vIndex - 1) / 4 === Math.floor((vIndex - 1) / 4)) ? -1 : 1;


					var tx = w[vIndex - 4].x - Math.sin( vIndex * (negate * (2 * segIndex - 1))) * segLength * negate;
					var tz = w[vIndex - 4].z + Math.cos( vIndex * (negate * (2 * segIndex - 1))) * segLength * negate;


					TweenMax.to( w[vIndex], 1.5, {
						x: tx,
						z: tz,
						ease: Power0.easeNone,
						onUpdate: function(){


						}
					});

				}



			});

			$( '#3D-object-button3' ).on( 'click', function( e ) {
				e.preventDefault();

				var scaleTo = Math.floor(Math.random() * Math.floor( 3 ) );

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
				init      : init,
				render    : render,
				getScene  : function () { return scene; },
				getCamera : function () { return camera; } 
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


