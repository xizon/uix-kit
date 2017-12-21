var gulp      = require('gulp'),
	sass      = require('gulp-sass'),
	concat    = require('gulp-concat'),
	rename    = require('gulp-rename'),
	uglify    = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	jshint    = require('gulp-jshint');


var globs = {
	jsTar    : 'assets/js',
	cssTar   : 'assets/css',
    js       : '_src/js-components/*.js',
    scssMain : '_src/scss/uix-kit.scss',
	scssCom  : '_src/scss/**/*.scss'
};

/*! 
 *************************************
 * Javascript & CSS tasks
 *************************************
 */
//Compile SCSS
gulp.task('sass', function(){
  return gulp.src( globs.scssMain )
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest( globs.cssTar ))
  
	//Compress
    .pipe(minifyCss())
	.pipe(rename({
		suffix: '.min'
	}))
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
	    .pipe(gulp.dest( globs.jsTar ))
	 
	    //Compress
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
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
	gulp.watch( globs.scssMain, ['sass' ]); 
	gulp.watch( globs.scssCom, ['sass' ]); 
	gulp.watch( globs.js, [ 'scripts' ]); 
})




