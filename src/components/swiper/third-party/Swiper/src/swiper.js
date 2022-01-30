// Swiper Class
import Swiper from './components/core/core-class';

//IMPORT_COMPONENTS
import Zoom from './components/zoom/zoom.js';
import Virtual from './components/virtual/virtual.js';
import Thumbs from './components/thumbs/thumbs.js';
import Scrollbar from './components/scrollbar/scrollbar.js';
import Parallax from './components/parallax/parallax.js';
import Pagination from './components/pagination/pagination.js';
import Navigation from './components/navigation/navigation.js';
import Mousewheel from './components/mousewheel/mousewheel.js';
import Lazy from './components/lazy/lazy.js';
import Keyboard from './components/keyboard/keyboard.js';
import History from './components/history/history.js';
import HashNavigation from './components/hash-navigation/hash-navigation.js';
import EffectFlip from './components/effect-flip/effect-flip.js';
import EffectFade from './components/effect-fade/effect-fade.js';
import EffectCube from './components/effect-cube/effect-cube.js';
import EffectCoverflow from './components/effect-coverflow/effect-coverflow.js';
import Controller from './components/controller/controller.js';
import Autoplay from './components/autoplay/autoplay.js';
import A11y from './components/a11y/a11y.js';


const components = [
	Virtual, 
	Keyboard, 
	Mousewheel, 
	Navigation, 
	Pagination, 
	Scrollbar, 
	Parallax, 
	Zoom, 
	Lazy, 
	Controller, 
	A11y, 
	History, 
	HashNavigation, 
	Autoplay, 
	EffectFade, 
	EffectCube, 
	EffectFlip, 
	EffectCoverflow, 
	Thumbs
];
Swiper.use(components);



//EXPORT
export default Swiper;


