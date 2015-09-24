var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'main-bower-files']
    });

///////////BABEL//////////////////
gulp.task('js:dev', function () {
  gulp
    .src(['www/js/*.js', 'www/js/**/*.js'])
    // .pipe($.sourcemaps.init())
    .pipe($.babel())
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'));
});

//////////////BOWER///////////////
gulp.task('bower', function () {
  gulp
    .src($.mainBowerFiles('**/*.js'))
    .pipe($.concat('build.js'))
    .pipe(gulp.dest('./public/lib'));
  gulp
    .src('bower_components/**/*.css')
    .pipe($.concat('build.css'))
    .pipe($.cssmin())
    .pipe(gulp.dest('./public/lib'));
});

/////////////CLEAN//////////////////
gulp.task('clean', function (cb) {
  $.del(['public/js/*.js', 'public/styles/*.css', 'public/lib/*.js', 'public/lib/*.css', 'public/*.html'])
  .then(function () {cb()})
  .catch(function (err) {console.log(err);});
})


///////////////JADE////////////////
gulp.task('jade:dev', function () {
  return gulp
    .src(['www/*.jade', 'www/**/*.jade', 'www/**/**/*.jade','!www/views/partials/_*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

///////////////SASS///////////////////
gulp.task('sass:dev', function () {
  return gulp
    .src('www/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('./public/styles'))
    .pipe(browserSync.reload({stream: true}))
});

//gulp.task('build', ['clean', 'jade:dev', 'sass:dev', 'js:dev', 'bower'])
gulp.task('build', ['jade:dev', 'js:dev', 'sass:dev']);

gulp.task('js-watch', ['js:dev'], browserSync.reload);

gulp.task('browser-sync', function () {
  browserSync.init({
      server: {
        baseDir: "public/"
      }
  });
});

gulp.task('start', ['jade:dev', 'js:dev', 'sass:dev', 'browser-sync']);

//WATCH
gulp.task('watch', ['build'], function () {
  gulp.watch(['www/**/*.jade', 'www/**/**/*.jade'], ['jade:dev']).on('change', browserSync.reload)
  gulp.watch(['www/**/*.scss', 'www/**/**/*.scss'], ['sass:dev'])
  gulp.watch(['www/**/*.js', 'www/**/**/*.js'], ['js-watch'])
});


gulp.task('serve', ['watch', 'browser-sync'])
