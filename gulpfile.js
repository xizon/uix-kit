var gulp          = require('gulp'),
	sass          = require('gulp-sass'),
	concat        = require('gulp-concat'),
	rename        = require('gulp-rename'),
	uglify        = require('gulp-uglify'),
	minifyCss     = require('gulp-minify-css'),
	jshint        = require('gulp-jshint'),
	rtlcss        = require('gulp-rtlcss'),
	cssbeautify   = require('gulp-cssbeautify'),
	headerComment = require('gulp-header-comment'),
	version       = require('gulp-version-number'),
	fileinclude   = require('gulp-file-include'),
	clean         = require('gulp-clean');


var globs = {
	jsTar        : 'examples/assets/js',
	cssTar       : 'examples/assets/css',
	cssRTLTar    : 'examples/assets/css/rtl',
	cleanFilesTar: [ 'examples/include-*.html', '_components/**/scss/*.css', '_components/**/scss-rtl/*.css' ],
	htmlFiles    : '_components/**/*.{html, htm}',
    js           : '_components/**/js/*.js',
    scss         : '_components/**/scss/*.scss',
	scssRTL      : '_components/**/scss-rtl/*.scss'
};


var customComment = `
		## Project Name        :  Uix Kit
		## Description         :  Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap
		## Version             :  0.0.7
		## Last Update         :  <%= moment().format( "MMMM D, YYYY" ) %>
		## Created             :  by UIUX Lab (https://uiux.cc)
		## Contact Us          :  uiuxlab@gmail.com
		## Compatible With     :  Bootstrap 3.x, Chinese, English
		## Compatible Browsers :  IE9, IE10, IE11, Firefox, Safari, Opera, Chrome, Edge
		## Released under the MIT license.
	`;



/*! 
 *************************************
 * Automatically add version number to request for preventing browser cache
 *************************************
 */
//Delete include files
gulp.task('clean-scripts', [ 'html' ], function () {
  return gulp.src( globs.cleanFilesTar, {read: true})
	.pipe(clean());
});




gulp.task('html', function() {
	
	var ver = new Date().getTime();
	var versionConfig = {
		'value'    : '%MDS%',
		'replaces' : [  
			[/assets\/css\/rtl\/uix-kit-rtl(.*)\"/ig, 'assets\/css\/rtl\/uix-kit-rtl.css?ver=' + ver + '\"' ],
			[/assets\/css\/uix-kit.min(.*)\"/ig, 'assets\/css\/uix-kit.min.css?ver=' + ver + '\"' ],
			[/assets\/css\/uix-kit.IE(.*)\"/ig, 'assets\/css\/uix-kit.IE.css?ver=' + ver + '\"' ],
			[/assets\/js\/uix-kit.min(.*)\"/ig, 'assets\/js\/uix-kit.min.js?ver=' + ver + '\"' ]
		],
	};

	
  console.log( 'cache:' + ver );
	
  return gulp.src( globs.htmlFiles )

		//File include
		.pipe(fileinclude({
		  prefix: '@@',
		  basepath: '@file'
		}))

		//Add version
		.pipe(version( versionConfig ))

		//Remove a folder structure when copying files in gulp
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest( 'examples' ));
	
	

	
	
});	




/*! 
 *************************************
 * Javascript & CSS tasks
 *************************************
 */
//Compile SCSS (RTL)
gulp.task('styles', function(){
  return gulp.src( globs.scssRTL )
	.pipe(concat('uix-kit-rtl.scss'))
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))

	.pipe(cssbeautify({
		indent: '    ',
		openbrace: 'end-of-line',
		autosemicolon: true
	}))


	.pipe(headerComment(`
		---------------------------
		MAIN TEMPLATE STYLES (RTL)
		---------------------------

		Adding support for language written in a Right To Left (RTL) direction is easy -
		it's just a matter of overwriting all the horizontal positioning attributes
		of your CSS stylesheet in a separate stylesheet file named rtl.css.

		` + customComment + `

	`))
	.pipe(gulp.dest( globs.cssRTLTar ));

});	

//Compile SCSS
gulp.task('sass', function(){
	
  gulp.start( 'clean-scripts' );
  return gulp.src( globs.scss )
    .pipe(concat('uix-kit.scss'))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  
	.pipe(cssbeautify({
		indent: '    ',
		openbrace: 'end-of-line',
		autosemicolon: true
	}))
  

	.pipe(headerComment(`
		---------------------------
		MAIN TEMPLATE STYLES
		---------------------------

		` + customComment + `

	`))
    .pipe(gulp.dest( globs.cssTar ))
  
    .pipe(minifyCss())
	.pipe(rename({
		suffix: '.min'
	}))
	
	.pipe(headerComment( customComment))
	.pipe(gulp.dest( globs.cssTar ));
	
	
});


//Merge JS
gulp.task('jshint', function () {
	return gulp.src( globs.js )
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	
	 gulp.start( 'clean-scripts' );
     return gulp.src( globs.js )
        .pipe(concat('uix-kit.js'))
	 
		.pipe(headerComment(`
			---------------------------
			MAIN SCRIPTS
			---------------------------

			` + customComment + `

		`))
	    .pipe(gulp.dest( globs.jsTar ))
	 
	    //Compress
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
	
	    .pipe(headerComment( customComment))
	    .pipe(gulp.dest( globs.jsTar ));

	
	
});




/*! 
 *************************************
 * Auto spy the project files
 *************************************
 */
gulp.watch('files-to-watch', ['tasks_to_run']); 
gulp.task('default', ['jshint'], function() {
    gulp.start( [ 'sass', 'scripts', 'styles', 'watch' ] );
});

gulp.task('watch', function(){
	gulp.watch( globs.scssRTL, [ 'styles' ] ); 
	gulp.watch( globs.scss, [ 'sass' ] ); 
	gulp.watch( globs.js, [ 'scripts' ] ); 
	gulp.watch( globs.htmlFiles, [ 'clean-scripts' ] ); 
	
	
})
