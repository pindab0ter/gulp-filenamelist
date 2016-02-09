'use strict';

var filenamelist = require('../'),
    assert = require('assert'),
    context = require('mocha').describe,
    it = require('mocha').it,
    after = require('mocha').after,
    gulp = require('gulp'),
    fs = require('fs'),
    utils = require('./utils.js');

function unlinkFileIfExists(filePath) {
    fs.stat(filePath, function(err, stats) {
        if (!err || !stats.isFile()) {
            fs.unlinkSync(filePath);
        }
    })
}

after(function() {
    [
        utils.defaultFile.path,
        utils.separatorFile.path,
        utils.fileNameFile.path
    ].forEach(function(filePath) {
        unlinkFileIfExists(filePath);
    })
});

context('without any options specified', function() {
    it('should show the default behaviour', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist())
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.defaultFile.path, file.path);
            assert.deepEqual(utils.defaultContents, file.contents);
            done();
        });
    });
});

context('with options specified', function() {
    it('should use the supplied file name', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist({
                outputFileName: utils.customFileName
            }))
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.fileNameFile.path, file.path);
            done();
        });
    });

    it('should use the supplied separator', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist({
                separator: ',\n\t'
            }))
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.separatorContents, file.contents);
            done();
        });
    });

    it('should add the prepend string', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist({
                prepend: 'var a = ['
            }))
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.prependContents, file.contents);
            done();
        });
    });
});
