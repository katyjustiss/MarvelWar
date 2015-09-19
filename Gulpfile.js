var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    proxy = require('proxy-middleware'),
    url = require('url'),
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
    .src(['www/*.jade', 'www/views/*.jade', '!www/views/partials/_*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public'));
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

gulp.task('browser-sync', function (done) {
  // browserSync.init(null, {
  //     proxy: "localhost:5000",
  //     files: ["public/**/*.*"],
  //     open: false
  // });
  var proxyOptions = url.parse('http://localhost:5000');
  browserSync.init(null, {
    open: true,
    port: 3000,
    server: {
        baseDir: "public",
        middleware: [proxy(proxyOptions)]
    }
  });
});

//WATCH
gulp.task('watch', ['build'], function () {
  gulp.watch(['www/**/*.jade', 'www/**/**/*.jade'], ['jade:dev']).on('change', browserSync.reload)
  gulp.watch(['www/**/*.scss', 'www/**/**/*.scss'], ['sass:dev'])
  gulp.watch(['www/**/*.js', 'www/**/**/*.js'], ['js-watch'])
});


gulp.task('serve', ['build', 'browser-sync', 'watch'])

// gulp.task('nodemon', function (cb) {
//   var started = false;
//   return $.nodemon({
//     script: 'index.js',
//     ignore:['public/js', 'www/js']
//   }).on('start', function () {
//     if (!started) {
//       cb();
//       started = true;
//     }
//   });
// });

