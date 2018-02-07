# Documentation



## Installation And Test

**Step 1.** Use NPM `npm install uix-kit`. For nodejs you have to install some dependencies.

**Step 2.** Before doing all dev stuff make sure you have node installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
`$ npm install --dev`
```


**Step 3.** Run the following code to enter development mode.

```sh
`$ gulp default`
```

**Step 4.** When you done, please open the browser and enter `http://localhost:8080/examples/` to check out.


> ### Entry Components:
> 
> HTML/JS/CSS Components: `_components/*`  
> `00.global` and `01.index` are required components.


* * *


## How does it work?

#### 1)\. HTML Structure

```html

<!DOCTYPE html>
<html dir="ltr" lang="en-US">
	<head>
		<meta charset="utf-8" />
		<title>Uix Kit</title>	
        
		<!-- Mobile Settings
		============================================= -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <!-- Mobile Settings end -->
        
		<!-- Core library
		============================================= -->
		<script src="assets/js/wp-jquery/jquery.min.js?ver=2.1.3"></script>
		<script src="assets/js/wp-jquery/jquery.migrate.min.js?ver=1.4.1"></script>
		<script src="assets/js/min/prefixfree.min.js?ver=1.0.7"></script>
		<!-- Core library  end -->
		
		
		<!-- Compatibility
		============================================= -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <script src="assets/js/min/modernizr.min.js?ver=3.5.0"></script>
        
        <!--[if lt IE 9]>
            <script src="assets/js/min/respond.min.js?ver=1.4.2"></script>
        <![endif]-->
        
        <!-- Compatibility  end -->



		<!-- Web Fonts
		============================================= -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700,800" rel="stylesheet"> -->
        <!-- Web Fonts  end -->
        
		<!-- Core & Theme CSS
		============================================= -->
        
        <!-- Basic  -->
        <link rel="stylesheet" href="assets/css/bootstrap.min.css?ver=3.3.7" media="all"/>
		<link rel="stylesheet" href="assets/css/video.min.css?ver=5.19" media="all"/>
        <link rel="stylesheet" href="assets/css/flexslider.min.css?ver=2.6.2" media="all" />
		<link rel="stylesheet" href="assets/css/animate.min.css?ver=3.5.2" media="all" />
		
        <!-- Icons  -->
        <link rel="stylesheet" href="assets/fonts/fontawesome/font-awesome.min.css?ver=4.5" media="all" />  
        
        <!-- Theme  -->
        <link rel="stylesheet" href="assets/css/uix-kit.min.css?ver=1.0.0" media="all"/>
        
     
         <!--[if lt IE 10]>
           <link rel="stylesheet" href="assets/css/uix-kit.IE.css?ver=1.0.0" media="all" />
        <![endif]-->
        
        
        <!-- Core & Theme CSS  end -->
        
            
		<!-- SEO
		============================================= -->
        <meta name="description" content="Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap">
        <meta name="generator" content="Uix Kit" /> 
        <link rel="canonical" href="https://uiux.cc" /> 
        <meta name="author" content="UIUX Lab"> 
        <!-- SEO  end -->
  
        
		<!-- Favicons
		============================================= -->
        <link rel="icon" href="assets/images/favicon/favicon-32x32.png" type="image/x-icon">
        <link rel="shortcut icon" href="assets/images/favicon/favicon-32x32.png" sizes="32x32">
        <link rel="apple-touch-icon" href="assets/images/favicon/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/images/favicon/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/images/favicon/apple-touch-icon-114x114.png">
        <!-- Favicons  end -->
     
  
  </head>     
  <body>
  
  
          
    ...

  

    <!-- Basic Script -->
    <script src="assets/js/min/jquery.mousewheel.min.js?ver=3.1.12"></script>
    <script src="assets/js/min/jquery.easing.min.js?ver=1.3"></script> 
    <script src="assets/js/min/jquery.bgParallax.min.js?ver=1.1.3"></script> 
    <script src="assets/js/min/jquery.waitforimages.min.js?ver=1.0"></script>
    <script src="assets/js/min/videojs-ie8.min.js?ver=1.1"></script> 
    <script src="assets/js/min/video.min.js?ver=5.19"></script> 
	<script src="assets/js/min/jquery.waypoints.min.js?ver=4.0.1"></script> 
	<script src="assets/js/min/template7.min.js?ver=1.2.5"></script>
    
    <!-- Mobile  -->
    <script src="assets/js/min/jquery.sidr.min.js?ver=2.2.1"></script>
    
    <!-- Slideshow  -->
    <script src="assets/js/min/jquery.flexslider.min.js?ver=2.6.2"></script>
    
    <!-- Masonry -->
    <script src="assets/js/wp-jquery/masonry.min.js?ver=3.3.2"></script>
    <script src="assets/js/wp-jquery/imagesloaded.min.js?ver=4.1.0"></script>

    <!-- Filterable  -->
    <script src="assets/js/min/jquery.shuffle.min.js?ver=3.1.1"></script> 
    
	
	<!-- Your Plugins & Theme Scripts
	============================================= -->
	
    <!-- Theme Script -->
	<script>
        var wp_theme_root_path = {
			"templateUrl" :"", //If the file is in the root directory, you can leave it empty; if in another directory, you can write: "/blog"
			"homeUrl"     :""  //Eg. https://uiux.cc
		};
    </script>  
    <script src="assets/js/uix-kit.min.js?ver=1.0.0"></script>



	<!-- Your Plugins & Theme Scripts  end -->
    
 

  </body>
</html>



```

#### 2)\. Custom Core Files

You can customize these files to meet the different needs of the site you want :-)

The `examples/assets-demo/` folder can be deleted.

#### File Structures:

```sh

uix-kit/
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DOCUMENTATION.md
├── gulpfile.js
├── main.js
├── LICENSE
├── readme.txt
├── package-lock.json
├── package.json
├── _config.yml
├── _grid/
├── _screenshots/
├── _components/
│   ├── 00.global/
│   ├── 01.*/
│   └── 02.*/
├── examples/
│   ├── assets/
│   │       ├── css/
│   │       ├── fonts/
│   │       ├── images/
│   │       └── js/
│   └── assets-demo/
│           ├── images/
│           ├── json/
│           └── videos/
	
```


#### Core CSS:

*   `examples/assets/css/uix-kit.css`
*   `examples/assets/css/uix-kit.min.css`
*   `examples/assets/css/uix-kit.IE.css`

#### Core CSS(RTL):

*   `examples/assets/css/rtl/uix-kit-rtl.css`

#### Core Javascript:

*   `examples/assets/js/uix-kit.js`
*   `examples/assets/js/uix-kit.min.js`

#### Core Images:

*   `examples/assets/images/*`

#### Core Fonts:

*   `examples/assets/fonts/*`



#### 3)\. PSD Grid Templates

You can download the corresponding .PSD grid files based on Bootstrap 3.x from the `_grid` folder.

*   `_grid/bootstrap3_1170_grid_web.psd` (Default Container: 1170px)
*   `_grid/bootstrap3_1278_grid_web.psd` (XL Container: 1278px)
*   `_grid/bootstrap3_1410_grid_web.psd` (XXL Container: 1410px)
