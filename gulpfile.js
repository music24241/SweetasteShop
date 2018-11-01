var gulp=require('gulp');
var jade=require('gulp-jade');
var compass=require('gulp-compass');
var plumber=require('gulp-plumber');

const paths={
	src:'./src',
	dist:'./dist',
	cssdir:'./dist/css',
	sassdir:'./src/sass',
}
gulp.task('templates',function(){
	const YOUR_LOCALS={};
		gulp.src(`${paths.src}/partial/*.jade`)
      .pipe(plumber())
      .pipe(jade({
				locals: YOUR_LOCALS,
        pretty: true,
      }))
			.pipe(gulp.dest(`${paths.dist}/partial`));
    gulp.src(`${paths.src}/*.jade`)
      .pipe(plumber())
      .pipe(jade({
        locals: YOUR_LOCALS,
        pretty: true,
      }))
      .pipe(gulp.dest(paths.dist));
})

gulp.task('sass',function(){
	gulp.src([`${paths.sassdir}/**/*.sass`,`${paths.sassdir}/**/*.scss`])
		.pipe(plumber())
		.pipe(compass({
			css: paths.cssdir,
			sass: paths.sassdir,
			outputStyle: 'nested',
			sourcemap: true,
			comments: false,
		}))
		.pipe(gulp.dest(paths.cssdir))
})
gulp.task('watch',function(){
	gulp.watch('./src/sass/**/*.sass',['sass'])
	gulp.watch('./src/sass/**/*.scss',['sass'])
	gulp.watch('./src/partial/*.jade',['templates'])
	gulp.watch('./src/*.jade',['templates'])
})

gulp.task('default',['sass','templates','watch'])