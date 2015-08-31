var argv         = require('minimist')(process.argv.slice(2)),
    gulp         = require('gulp'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css'),
    jscs         = require('gulp-jscs'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util'),
    react        = require('gulp-react');

gulp.task('styles', function () {
  return gulp.src('assets/styles/main.less')
  .pipe(less())
  .pipe(autoprefixer({
    browsers: ['> 97%', 'last 2 versions', 'Firefox 3.5', 'Opera 12.1', 'Safari 4.0'],
    cascade: false
  }))
  .pipe(gulpif(argv.production, minifyCss()))
  .pipe(gulp.dest('assets/dist'));
});

gulp.task('components:move', function () {
  gulp.src('bower_components/react/react-with-addons.min.js')
  .pipe(gulp.dest('assets/dist'));
});

gulp.task('jsx:compile', function (callback) {
    gulp.src('assets/js/templates.jsx')
    .pipe(react())
    .pipe(gulp.dest('assets/js/compiled'));
    callback();
});

gulp.task('js:build', ['jsx:compile'], function () {
  var stream = gulp.src('assets/js/**/*.js')
               .pipe(concat('main.js'))
               .pipe(gulpif(argv.production, uglify().on('error', gutil.log)))
               .pipe(gulp.dest('assets/dist'));
  return stream;
})

gulp.task('lint', function () {
  return gulp.src('scripts/js/**/*.js')
  .pipe(jscs())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['styles', 'js:build', 'components:move']);
gulp.task('default', ['build']);
gulp.task('watch', ['build'], function () {
  gulp.watch('assets/styles/**/*.less', ['styles']);
  gulp.watch('assets/js/**/*.js', ['js:build']);
  gulp.watch('assets/js/**/*.jsx', ['jsx:compile']);
});
