'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    header = require('gulp-header'),
    del = require('del');

var argv = require('yargs').argv;

var extended = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

var succint = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n';

gulp.task('build', ['clean:dist', 'bump', 'npm:update'] ,function () {
    var pkg = require('./package.json');

    var bundler = browserify({
        entries: ['./index.js'],
        standalone: 'ML'
    });

    return bundler
        .bundle()
        .pipe(source('ml.js'))
        .pipe(buffer())
        .pipe(header(extended, { pkg: pkg }))
        .pipe(size({title: 'full'}))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('ml.min.js'))
        .pipe(uglify())
        .pipe(header(succint, { pkg: pkg }))
        .pipe(size({title: 'minified'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean:dist', function (cb) {
    del(['dist'], cb);
});

gulp.task('bump', function() {
    var type;
    if (argv.major) {
        type = 'major';
    } else if (argv.minor) {
        type = 'minor';
    } else {
        type = 'patch'
    }
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
});

gulp.task('npm:update', function (done) {
    require('child_process').spawn('npm', ['update', '--production'], { stdio: 'inherit' })
        .on('close', done);
});

var v, m;

gulp.task('git:commit', ['build'], function () {
    var pkg = require('./package.json');
    v = 'v' + pkg.version;
    m = 'Release ' + v;
    return gulp.src('./')
        .pipe(git.add())
        .pipe(git.commit(m))
        .pipe(gulp.dest('./'));
});

gulp.task('git:tag', ['git:commit'], function (done) {
    git.tag(v, m, done);
});

gulp.task('git:push', ['git:tag'], function (done) {
    git.push('origin', 'master', { args: '--tags' }, done);
});

gulp.task('npm:publish', ['git:push'], function (done) {
    require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
        .on('close', done);
});

gulp.task('release', ['npm:publish']);