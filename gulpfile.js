var spawn = require('child_process').spawn;
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var del = require('del');

gulp.task('clean', function() {
    return del([
        'out'
    ]);
});

gulp.task('dev-hotLoadServer', function() {
    spawn('node', ['./hotLoadServer.js'], { stdio: 'inherit', env: { NODE_ENV: 'development' } });
});

gulp.task('dev-app-server', function() {
    spawn('node', ['./out/app/server.js'], { stdio: 'inherit', env: { NODE_ENV: 'development' } });
});

gulp.task('dev', ['dev-hotLoadServer', 'dev-app-server']);
