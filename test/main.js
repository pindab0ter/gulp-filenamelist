'use strict';

var filenamelist = require('../'),
    assert = require('assert'),
    context = require('mocha').describe,
    it = require('mocha').it,
    after = require('mocha').after,
    gulp = require('gulp'),
    fs = require('fs'),
    utils = require('./utils.js'),
    source = utils.source,
    destination = utils.destination,
    defaultFile = utils.defaultFile;

after(function() {
    fs.unlinkSync(utils.defaultFile.path);
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
