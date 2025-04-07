# three.js & three.min.js Generator

Compatible with 174+ versions

## How to use (no import required)

```html
<script defer src="assets/js/min/three.min.js?ver=r175"></script>
```

```js
import { OrbitControls } from './jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

...
```


## Build

Run the command below, You can find the files in the `dist/` directory.
```sh
$ cd ./threejs-dist-builder
$ npm run build
```

