'use strict';

var filenamelist = require('../'),
    assert = require('assert'),
    gulp = require('gulp'),
    fs = require('fs'),
    utils = require('./utils.js');

function unlinkFileIfExists(filePath) {
    fs.stat(filePath, function(err, stats) {
        if (!err && stats.isFile()) {
            fs.unlinkSync(filePath);
        }
    })
}

afterEach(function() {
    [
        utils.defaultFile.path,
        utils.filenameFile.path
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
            assert.deepEqual(utils.filenameFile.path, file.path);
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

    it('should surround the names with single quotes', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist({
                quotesSingle: true
            }))
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.quoteSingleContents, file.contents);
            done();
        });
    });

    it('should surround the names with double quotes', function(done) {
        var stream = gulp.src(utils.source)
            .pipe(filenamelist({
                quotesDouble: true
            }))
            .pipe(gulp.dest(utils.destination));

        stream.on('data', function(file) {
            assert.deepEqual(utils.quoteDoubleContents, file.contents);
            done();
        });
    });

    it('should not accept both single and double quotes', function(done) {
        assert.throws(function() {
                gulp.src(utils.source)
                    .pipe(filenamelist({
                        quotesSingle: true,
                        quotesDouble: true
                    }))
                    .pipe(gulp.dest(utils.destination))
                    .on('close', done);
            }, function(err) {
                if (err.message !== 'Cannot have both single and double quotes.') {
                    assert.fail();
                }
                done();
            },
            'Expected error: "Cannot have both single and double quotes."'
        );
    })
});
