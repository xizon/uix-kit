/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */

 /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 After threejs 151+, the spot light effect will be different, please refer to the documentation.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

/**
 * module.THREE_PARTICLE
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/plugins/THREE
 */


import {
    UixBrowser,
    UixModuleInstance,
} from '@uixkit/core/_global/js';


export const THREE_PARTICLE = ((module, $, window, document) => {
    if (window.THREE_PARTICLE === null) return false;

    // Make THREE available globally
    window.THREE = THREE;

    module.THREE_PARTICLE = module.THREE_PARTICLE || {};
    module.THREE_PARTICLE.version = '1.1.4';
    module.THREE_PARTICLE.documentReady = function ($) {


        // Prevent this module from loading in other pages
        if ($('#3D-particle-effect-canvas').length == 0 || !Modernizr.webgl) return false;


        let sceneSubjects = []; // Import objects and animations dynamically
        const MainStage = function () {

            let windowWidth = window.innerWidth,
                windowHeight = window.innerHeight;

            const rendererCanvasID = '3D-particle-effect-canvas';

            let renderer,
                texture,
                scene,
                camera,
                particles,
                imagedata,
                clock = new THREE.Clock(),
                mouseX = 0,
                mouseY = 0,
                isMouseDown = true,
                lastMousePos = { x: 0, y: 0 },
                windowHalfX = windowWidth / 2,
                windowHalfY = windowHeight / 2,
                animStartStatus = false,
                animCompleted = false;

            // Mouse interaction variables
            let mouse = new THREE.Vector2();
            let mouse3D = new THREE.Vector3(0, 0, 0);
            let isMouseOver = false;

            // Background and plane colors
            const backgroundBg = new THREE.Color('#CE3A3E');
            const backgroundPlane = new THREE.Color('#DE510E');
            const backgroundPlaneDecay = new THREE.Color('#FFF7BA');

            // Lighting objects
            let sceneForLightPlane, sceneForSpotLight, sceneForAmbientLight;

            // Camera parameters
            let fieldOfView, aspectRatio, nearPlane, farPlane;
            let dist, vFOV, visibleHeight, visibleWidth;
            let xLimit, yLimit;
            const maxTargetZ = 200;

            // Particle rotation object
            let particleRotation;

            const centerVector = new THREE.Vector3(0, 0, 0);
            let previousTime = 0;

            function init() {

                // ==================================
                // Camera Setup
                // ==================================
                fieldOfView = 60;
                aspectRatio = windowWidth / windowHeight;
                nearPlane = 1;
                farPlane = 10000;
                camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
                camera.position.set(0, 65, -500);
                camera.lookAt(centerVector);

                // Convert field of view to radians for calculations
                const ang = (fieldOfView / 2) * Math.PI / 180;

                // Calculate visible limits at maxTargetZ
                yLimit = (camera.position.z + maxTargetZ) * Math.tan(ang);
                xLimit = yLimit * camera.aspect;

                // Fit plane calculations
                dist = 1000;
                vFOV = THREE.MathUtils.degToRad(camera.fov);
                visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
                visibleWidth = visibleHeight * camera.aspect;

                // ==================================
                // Scene Setup
                // ==================================
                scene = new THREE.Scene();
                // Fog is used to blend the light plane with the background
                scene.fog = new THREE.Fog(backgroundBg, 0.0025, 650);

                // ==================================
                // Lighting Setup
                // ==================================

                // Light Plane Mesh
                sceneForLightPlane = new THREE.Mesh(new THREE.CircleGeometry(1000, 32), new THREE.MeshPhongMaterial({
                    color: backgroundPlaneDecay,
                    emissive: backgroundPlane,
                    emissiveIntensity: 1,
                    side: THREE.DoubleSide,
                }));
                sceneForLightPlane.receiveShadow = true;
                sceneForLightPlane.position.set(0, -101, 5);
                sceneForLightPlane.rotation.x = getRadian(-95);
                scene.add(sceneForLightPlane);

                // Spot Light Configuration
                const spotLightColor = 0xffffff,
                    spotLightIntensity = 8,
                    spotLightDistance = 1200,
                    spotLightAngle = getRadian(45),
                    spotLightPenumbra = 0.6,
                    spotLightDecay = 0.002;

                sceneForSpotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity, spotLightDistance, spotLightAngle, spotLightPenumbra, spotLightDecay);
                sceneForSpotLight.position.set(5, 320, 5);

                sceneForSpotLight.castShadow = true;
                sceneForSpotLight.shadow.mapSize.width = 1024;
                sceneForSpotLight.shadow.mapSize.height = 1024;
                sceneForSpotLight.shadow.camera.near = 0.5;
                sceneForSpotLight.shadow.camera.far = 31;
                sceneForSpotLight.shadow.bias = -0.001;
                sceneForSpotLight.shadow.normalBias = 0.1;
                scene.add(sceneForSpotLight);

                // Ambient Light
                sceneForAmbientLight = new THREE.AmbientLight(0xffffff, 0.08);
                scene.add(sceneForAmbientLight);

                // ==================================
                // Renderer Setup
                // ==================================
                renderer = new THREE.WebGLRenderer({
                    canvas: document.getElementById(rendererCanvasID),
                    alpha: true,
                    antialias: true
                });
                renderer.setSize(windowWidth, windowHeight);

                // Encoding and shadow mapping
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;

                // ==================================
                // Texture and Particle Loading
                // ==================================
                const loader = new THREE.TextureLoader();

                loader.load(
                    $('#' + rendererCanvasID).data('img-src'),
                    function (texture) {
                        // Extract pixel data from image
                        imagedata = getImageData(texture.image);

                        const geometry = new THREE.BufferGeometry();
                        const vertices = [];
                        const verticesDest = [];

                        // Iterate through pixel data to create particles
                        for (let y = 0, y2 = imagedata.height; y < y2; y += 2) {
                            for (let x = 0, x2 = imagedata.width; x < x2; x += 2) {
                                // Only create particles for non-transparent pixels
                                if (imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128) {

                                    const vertex = new THREE.Vector3();

                                    // Initial random positions
                                    vertex.x = Math.random() * 1000 - 500;
                                    vertex.y = Math.random() * 1000 - 500;
                                    vertex.z = -Math.random() * 500 + 1500;

                                    // Target positions based on image dimensions
                                    vertex.destination = {
                                        x: x - imagedata.width / 2,
                                        y: -y + imagedata.height / 2,
                                        z: 0
                                    };

                                    vertices.push(vertex.x, vertex.y, vertex.z);
                                    verticesDest.push(vertex.destination.x, vertex.destination.y, vertex.destination.z);
                                }
                            }
                        }

                        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                        geometry.setAttribute('position_destination', new THREE.Float32BufferAttribute(verticesDest, 3));
                        geometry.computeBoundingSphere();

                        const material = new THREE.PointsMaterial({
                            size: 3,
                            color: 0xffffff,
                            sizeAttenuation: false,
                            vertexColors: false,
                            fog: false // Particles are excluded from scene fog
                        });

                        particles = new THREE.Points(geometry, material);
                        scene.add(particles);
                        particles.scale.setScalar(0.7);
                        particles.position.y = 50;
                        particles.position.z = 70;
                        particles.rotation.y = getRadian(180);
                    },
                    undefined,
                    function (err) {
                        console.error('An error happened during texture loading.');
                    }
                );

                // Background floating particles
                particleRotation = new THREE.Object3D();
                scene.add(particleRotation);

                const geometryPR = new THREE.TetrahedronGeometry(2, 0),
                    materialPR = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        emissive: 0xffffff,
                        shininess: 80,
                        flatShading: true,
                    });

                for (let i = 0; i < 750; i++) {
                    const mesh = new THREE.Mesh(geometryPR, materialPR);
                    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                    mesh.position.multiplyScalar(90 + (Math.random() * 700));
                    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
                    particleRotation.add(mesh);
                    mesh.castShadow = true;
                }

                // Event Listeners
                document.addEventListener('mousemove', onDocumentMouseMove, false);
                document.addEventListener('touchstart', onDocumentTouchStart, UixBrowser.supportsPassive ? { passive: true } : false);
                document.addEventListener('touchmove', onDocumentTouchMove, UixBrowser.supportsPassive ? { passive: true } : false);
                document.addEventListener('mousedown', onDocumentMouseDown, false);
                document.addEventListener('mouseup', onDocumentMouseUp, false);

                renderer.domElement.addEventListener('mouseleave', function () {
                    isMouseOver = false;
                });

                window.addEventListener('resize', onWindowResize, false);
            }

            function animStart() {
                if (typeof particles === 'undefined') return;

                animStartStatus = true;

                const points = particles.geometry.attributes.position.array;
                const targetPoints = particles.geometry.attributes.position_destination.array;

                // Tween particles from random positions to target destination
                targetPoints.ease = Power2.easeOut;
                TweenMax.to(points, 4, targetPoints);

                targetPoints.onUpdate = function () {
                    particles.geometry.attributes.position.needsUpdate = true;
                }
                targetPoints.onComplete = function () {
                    animCompleted = true;
                }
            }

            /**
             * Update mouse coordinates in 3D world space
             * Ensure mouse3D is always relative to the scene center
             */
            function updateMouse(event) {
                const rect = renderer.domElement.getBoundingClientRect();

                // Normalized Device Coordinates (NDC)
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

                // Project mouse to 3D space
                const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                vector.unproject(camera);

                // Calculate ray direction from camera
                const dir = vector.sub(camera.position).normalize();

                // Find intersection with the particle plane (z=0)
                // Formula: distance = (targetZ - cameraZ) / directionZ
                const distance = -camera.position.z / dir.z;

                // Update mouse3D to actual world position
                mouse3D.copy(camera.position).add(dir.multiplyScalar(distance));
            }

            function render() {
                requestAnimationFrame(render);

                const delta = clock.getDelta();

                // Set scene clear color
                renderer.setClearColor(backgroundBg);

                // Trigger entry animation
                if (!animStartStatus) {
                    animStart();
                }

                // Camera easing logic
                if (!isMouseDown) {
                    camera.position.x += (0 - camera.position.x) * 0.06;
                    camera.position.y += (0 - camera.position.y) * 0.06;
                }

                if (animCompleted) {
                    camera.position.x += (mouseX - camera.position.x) * 0.09;
                    camera.position.y += (- mouseY - camera.position.y) * 0.09;
                }

                if (camera.position.y < -60) camera.position.y = -60;
                camera.lookAt(centerVector);

                // Update background particle rotation
                particleRotation.rotation.y -= 0.0040;

                // Core Logic: Particle Interactions
                if (particles) {
                    
                    const positions = particles.geometry.attributes.position.array;
                    const destinations = particles.geometry.attributes.position_destination.array;
                    const count = positions.length / 3;

                    // Mirrored mouse correction: Due to particles.rotation.y = 180
                    // X-axis must be inverted to match local coordinate space
                    const mx = -mouse3D.x;
                    const my = mouse3D.y;

                    /*
                    【Effect - Circular surround】

                    for (let i = 0; i < count; i++) {
                        const idx = i * 3;
    
                        // Original target position
                        const destX = destinations[idx];
                        const destY = destinations[idx + 1];
                        const destZ = destinations[idx + 2];
    
                        // Current particle position
                        let px = positions[idx];
                        let py = positions[idx + 1];
                        let pz = positions[idx + 2];
    
                        if (isMouseOver) {
    
                            // Due to the use of "particles.rotation.y = getRadian( 180 );", the mouse and particles will interact in opposite directions
                            // Solve this problem
                            const fixedMouse3D = mouse3D.clone();
                            fixedMouse3D.x = -fixedMouse3D.x; // Invert the x-axis values.
    
                            // Calculates the distance from the particles to the mouse
                            const dx = px - fixedMouse3D.x;
                            const dy = py - fixedMouse3D.y;
                            const dz = pz - fixedMouse3D.z;
                            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
                            // When the distance is less than the threshold, a repulsive force is applied
                            const threshold = 80;
                            if (dist < threshold) {
                                // Calculate the direction of repulsion
                                const force = (threshold - dist) / threshold * 20;
                                const nx = dx / dist;
                                const ny = dy / dist;
                                const nz = dz / dist;
    
                                // The target location is a point on the sphere
                                positions[idx] += nx * force;
                                positions[idx + 1] += ny * force;
                                positions[idx + 2] += nz * force;
                            } else {
                                // restore position
                                positions[idx] += (destX - px) * 0.05;
                                positions[idx + 1] += (destY - py) * 0.05;
                                positions[idx + 2] += (destZ - pz) * 0.05;
                            }
                        } else {
                            // When the mouse is not there, it recovers slowly
                            positions[idx] += (destX - px) * 0.05;
                            positions[idx + 1] += (destY - py) * 0.05;
                            positions[idx + 2] += (destZ - pz) * 0.05;
                        }
                    }
                    */

                    for (let i = 0; i < count; i++) {
                        const idx = i * 3;

                        // Original pixel destination
                        const dx_orig = destinations[idx];
                        const dy_orig = destinations[idx + 1];
                        const dz_orig = destinations[idx + 2];

                        // Current particle position
                        let px = positions[idx];
                        let py = positions[idx + 1];

                        if (isMouseOver) {
                            // Accuracy Fix: Calculate distance from ORIGINAL position to mouse
                            // This ensures interaction only triggers on actual color pixels
                            const dx = dx_orig - mx;
                            const dy = dy_orig - my;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            const threshold = 50; // Interaction radius

                            if (dist < threshold) {
                                // Repulsive force calculation
                                const force = (threshold - dist) / threshold * 20;

                                // Calculate escape vector
                                const angle = Math.atan2(py - my, px - mx);
                                positions[idx] += Math.cos(angle) * force;
                                positions[idx + 1] += Math.sin(angle) * force;
                                positions[idx + 2] += 10 * (force / 20); // Add depth effect
                            } else {
                                // Smooth return to original position
                                positions[idx] += (dx_orig - px) * 0.08;
                                positions[idx + 1] += (dy_orig - py) * 0.08;
                                positions[idx + 2] += (dz_orig - positions[idx + 2]) * 0.08;
                            }
                        } else {
                            // General recovery when mouse is inactive
                            positions[idx] += (dx_orig - px) * 0.05;
                            positions[idx + 1] += (dy_orig - py) * 0.05;
                            positions[idx + 2] += (dz_orig - positions[idx + 2]) * 0.05;
                        }
                    }
                    particles.geometry.attributes.position.needsUpdate = true;
                }

                // Update custom scene subjects
                for (let i = 0; i < sceneSubjects.length; i++) {
                    sceneSubjects[i].update(clock.getElapsedTime() * 1);
                }

                renderer.render(scene, camera);
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function onDocumentMouseMove(event) {
                isMouseOver = true;
                updateMouse(event);

                //
                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
    
                if( isMouseDown ) {
                    camera.position.x += (event.clientX-lastMousePos.x)/100;
                    camera.position.y -= (event.clientY-lastMousePos.y)/100;
                    camera.lookAt( centerVector );
                    lastMousePos = {x: event.clientX, y: event.clientY};
                }
    
                // Calculate the position of the mouse in the 3D space
                const rect = renderer.domElement.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                const vector = new THREE.Vector3(x, y, 0.5);
                vector.unproject(camera);
                mouse3D = getMouseWorldPosition(event, camera, renderer); 
            }

            function onDocumentTouchStart(event) {
                if (event.touches.length == 1) {
                    event.preventDefault();
                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;
                }
            }

            function onDocumentTouchMove(event) {
                if (event.touches.length == 1) {
                    event.preventDefault();
                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;
                }
            }

            function onDocumentMouseUp() {
                isMouseDown = false;
            }

            function onDocumentMouseDown(event) {
                isMouseDown = true;
                lastMousePos = { x: event.clientX, y: event.clientY };
            }

            /**
             * Extract image data for particle generation
             */
            function getImageData(image) {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                return ctx.getImageData(0, 0, image.width, image.height);
            }

            /**
             * Helper: Degrees to Radians
             */
            function getRadian(deg) {
                return deg * Math.PI / 180;
            }

            return {
                init: init,
                render: render,
                getRendererCanvasID: function () { return rendererCanvasID; },
                getScene: function () { return scene; },
                getCamera: function () { return camera; }
            };

        }();

        MainStage.init();
        MainStage.render();

    };

    module.components.documentReady.push(module.THREE_PARTICLE.documentReady);

    return class THREE_PARTICLE {
        constructor() {
            this.module = module;
        }
    };

})(UixModuleInstance, jQuery, window, document);