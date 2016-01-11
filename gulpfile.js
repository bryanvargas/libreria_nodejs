var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];//coincide con los archivos que terminen en .js
									  //dentro de la carpeta js y dentro de todas sus sub-carpetas

gulp.task('style', function() {
		return gulp.src(jsFiles) //buscamos los archivos con las extensiones especificadas
		.pipe(jshint()) //funcion para ejecutar varias tareas
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
	    }))	
		.pipe(jscs())
});

gulp.task('inject', function(){
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');
	
	var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
	
	var injectOptions = {
		ignorePath : '/public'
	}
	
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib', 
		ignorePath: '../../public'
	}
	
	return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});

gulp.task('server', ['style', 'inject'], function(){
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: jsFiles
	}
	
	return nodemon(options)
		.on('restart', function(ev){
			console.log('Resetiando servidor....');
	})
});