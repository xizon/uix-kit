/* 
 *************************************
 * <!-- 3D Object Anim When Click -->
 *************************************
 */

/**
 * APP._3D_OBJ_ANIM_INTERACTION
 * @global
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/_plugins-THREE
 */


APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP._3D_OBJ_ANIM_INTERACTION               = APP._3D_OBJ_ANIM_INTERACTION || {};
	APP._3D_OBJ_ANIM_INTERACTION.version       = '0.0.1';
    APP._3D_OBJ_ANIM_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( '#3D-object-buttonevent-canvas' ).length == 0 || ! Modernizr.webgl ) return false;
		
		var $window                   = $( window ),
			windowWidth               = window.innerWidth,
			windowHeight              = window.innerHeight,
			rendererCanvasID          = '3D-object-buttonevent-canvas';
		

		var renderer, 
			scene, 
			controls, 
			camera, 
			axis, 
			targetObj, 
			parent, 
			material,
			segLength,
			$btn = $( '#3D-object-button' );
		
		
		var radius = 3,
			height = 6,
			segments = 200, //segments must be even
			animationDuration = 1.3;

		var tween = {
			angle: 0,
			circle1: -Math.PI / 2,
			circle2: Math.PI / 2
		};
		var timeline = new TimelineLite();

		init();

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
			camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1, 100);
			camera.position.set(11, 8, 12);


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

			setAnimation();

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

		
		
		function setAnimation() {


			timeline.to(tween, animationDuration, {
				angle: Math.PI / segments,
				circle1: 0,
				circle2: 0,
				ease: Power0.easeNone,
				onUpdate: update,
				onComplete: function() {
					timeline.pause()
				}
			});

			timeline.progress(1);
			setTimeout(function() {
				timeline.reverse()
			}, 800);

			
			$btn.on( 'click', function( e ) {
				e.preventDefault();
				
				timeline.progress() > .5 ? timeline.reverse() : timeline.play();
			});
			
		}
		

		function update() {

			//1. tween the first segment of each side
			var w = targetObj.geometry.vertices;
			w[2].x = w[3].x = w[4].x = w[5].x = -Math.sin(tween.angle) * segLength;
			w[2].z = w[3].z = Math.cos(tween.angle) * segLength;
			w[4].z = w[5].z = -Math.cos(tween.angle) * segLength;

			//2. rest of the vertex can now refer to the fourth previous vertex, their reference in the algorithm
			var updateWrapper = function(vIndex) {
				//which segment from the origin the vertex belongs to
				var segIndex = Math.floor((vIndex + 2) / 4);
				var negate = (vIndex / 4 === Math.floor(vIndex / 4) || (vIndex - 1) / 4 === Math.floor((vIndex - 1) / 4)) ? -1 : 1;

				w[vIndex].x = w[vIndex - 4].x - Math.sin(tween.angle * (negate * (2 * segIndex - 1))) * segLength * negate;
				w[vIndex].z = w[vIndex - 4].z + Math.cos(tween.angle * (negate * (2 * segIndex - 1))) * segLength * negate;
			};
			for (var i = 6; i < w.length; i++) updateWrapper(i);

			targetObj.geometry.verticesNeedUpdate = true;
			renderer.render(scene, camera);

			
			$btn.text( timeline.progress() > .5 ? 'Click me to reverse animation' : 'Click me to start animation' );
			
		}
	
		
		
    };

    APP.components.documentReady.push( APP._3D_OBJ_ANIM_INTERACTION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



