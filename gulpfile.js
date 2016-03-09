//Gulp module
var gulp = require('gulp');
//Stylus module
var stylus = require('gulp-stylus');
//Adds all browsers compatibility
var nib = require('nib');
//Min the CSS
var minifyCSS = require('gulp-minify-css');
//Min the JS
var uglify = require('gulp-uglify');
//WebServer para aprobechar LiveReload
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var exec = require('gulp-exec');




//Variable de configuraciones
var config = {
	styles: {
		main: './src/styles/main.styl',
		watch: './src/styles/**/*.styl',
		output: './build/css'
	},
	html: {
		watch: './build/*.html'
	},
	scripts: {
		//Para hacer dist.
		main: './build/js/build.js',
		output: './dist/js',
		//Para hacer watch de los Js y JSX.
		watchcomponents: './src/scripts/components/*.jsx',
		watch: './src/scripts/*.jsx'
	}
}

//WebServer setted with livereaload.
gulp.task('server', function(){
	gulp.src('./build')
	.pipe(webserver({
		host: '0.0.0.0',
		port: '8080',
		livereload: true
	}));
});

//build:css setted with Stylus, minCSS and nib(compatibility)
gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});
//Dist command
gulp.task('dist:js', function() {
	return browserify(config.scripts.main)
	.bundle()
	.pipe(source('build.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest(config.scripts.output));
})

//Only for exec NPM command.
gulp.task('build:js', function() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event 
    pipeStdout: false, // default = false, true means stdout is written to file.contents 
    customTemplatingThing: "test" // content passed to gutil.template() 
  };
  var reportOptions = {
  	err: true, // default = true, false means don't write err 
  	stderr: true, // default = true, false means don't write stderr 
  	stdout: true // default = true, false means don't write stdout 
  }
  gulp.src('./')
    .pipe(exec('npm run build', options))
    .pipe(exec.reporter(reportOptions));
});

//Build command to build css and js
gulp.task('build', ['build:css', 'build:js']);

//Watching for changes.
gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watchcomponents, ['build:js']);
	gulp.watch(config.scripts.watch, ['build:js']);
	gulp.watch(config.html.watch, ['build']);
})

//Auto task exec with onli 'gulp' command.
gulp.task('default', ['server', 'watch', 'build']);