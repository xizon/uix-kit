var gulp          = require('gulp'),
	sass          = require('gulp-sass'),
	concat        = require('gulp-concat'),
	rename        = require('gulp-rename'),
	uglify        = require('gulp-uglify'),
	minifyCss     = require('gulp-minify-css'),
	jshint        = require('gulp-jshint'),
	rtlcss        = require('gulp-rtlcss'),
	cssbeautify   = require('gulp-cssbeautify'),
	headerComment = require('gulp-header-comment');


var globs = {
	jsTar    : 'assets/js',
	cssTar   : 'assets/css',
	cssRTLTar: 'assets/css/rtl',
    js       : '_src/js-components/*.js',
    scss     : '_src/css-components/*.scss'
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
 * Javascript & CSS tasks (Include RTL)
 *************************************
 */
//Compile SCSS
gulp.task('sass', function(){
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
     gulp.src( globs.js )
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
    gulp.start('sass');
	gulp.start('scripts');
    gulp.start('watch');
});

gulp.task('watch', function(){
	gulp.watch( globs.scss, ['sass' ] ); 
	gulp.watch( globs.js, [ 'scripts' ] ); 
})




