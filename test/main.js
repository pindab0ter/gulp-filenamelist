'use strict';

var filenamelist = require('../'),
    assert = require('assert'),
    context = require('mocha').describe,
    it = require('mocha').it,
    after = require('mocha').after,
    gulp = require('gulp'),
    fs = require('fs'),
    utils = require('./utils.js');

var source = utils.source,
    destination = utils.destination,
    defaultFile = utils.defaultFile,
    customFile = utils.customFile,
    customFileName = utils.customFileName;

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
        utils.customFile.path
    ].forEach(function(filePath) {
        unlinkFileIfExists(filePath);
    })
});

context('without any options specified', function() {
    it('should show the default behaviour', function(done) {
        var stream = gulp.src(source)
            .pipe(filenamelist())
            .pipe(gulp.dest(destination));

        stream.on('data', function(file) {
            assert.deepEqual(defaultFile.path, file.path);
            assert.deepEqual(defaultFile.contents, file.contents);
            done();
        });
    });
});

context('with options specified', function() {
    it('should use the supplied file name', function(done) {
        var stream = gulp.src(source)
            .pipe(filenamelist({
                fileName: customFileName
            }))
            .pipe(gulp.dest(destination));

        stream.on('data', function(file) {
            assert.deepEqual(customFile.path, file.path);
            done();
        });
    });

    it('should use the supplied separator', function(done) {
        var stream = gulp.src(source)
            .pipe(filenamelist({
                separator: ',\n\t'
            }))
            .pipe(gulp.dest(destination));

        stream.on('data', function(file) {
            assert.deepEqual(customFile.contents, file.contents);
            done();
        });
    })
});
