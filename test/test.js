'use strict';

var filenamelist = require('../'),
    assert = require('assert'),
    gulp = require('gulp'),
    fs = require('fs'),
    vars = require('./variables.js'),
    utils = require('../utils.js');

function unlinkFileIfExists(filePath) {
    fs.stat(filePath, function(err, stats) {
        if (!err && stats.isFile()) {
            fs.unlinkSync(filePath);
        }
    })
}

afterEach(function() {
    [
        vars.defaultFile.path,
        vars.filenameFile.path
    ].forEach(function(filePath) {
        unlinkFileIfExists(filePath);
    })
});

context('without any options specified', function() {
    it('should show the default behaviour', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist())
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.defaultFile.path, file.path);
            assert.deepEqual(vars.defaultContents, file.contents);
            done();
        });
    });
});

context('with options specified', function() {
    it('should use the supplied file name', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist({
                outputFileName: vars.customFileName
            }))
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.filenameFile.path, file.path);
            done();
        });
    });

    it('should use the supplied separator', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist({
                separator: ',\n\t'
            }))
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.separatorContents, file.contents);
            done();
        });
    });

    it('should add the prepend string', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist({
                prepend: 'var a = ['
            }))
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.prependContents, file.contents);
            done();
        });
    });

    it('should surround the names with single quotes', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist({
                quotesSingle: true
            }))
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.quoteSingleContents, file.contents);
            done();
        });
    });

    it('should surround the names with double quotes', function(done) {
        var stream = gulp.src(vars.source)
            .pipe(filenamelist({
                quotesDouble: true
            }))
            .pipe(gulp.dest(vars.destination));

        stream.on('data', function(file) {
            assert.deepEqual(vars.quoteDoubleContents, file.contents);
            done();
        });
    });

    it('should not accept both single and double quotes', function(done) {
        try {
            gulp.src(vars.source)
                .pipe(filenamelist({
                    quotesSingle: true,
                    quotesDouble: true
                }))
                .pipe(gulp.dest(vars.destination));
            done(new Error('Did not catch any errors.'));
        } catch (err) {
            if (err.message !== 'Cannot have both single and double quotes.') {
                done(new Error('Expected a PluginError, got this instead:\n' + err));
            }
            done();
        }
    })
});
