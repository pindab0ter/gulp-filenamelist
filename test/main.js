'use strict';

var assert = require('assert'),
    context = require('mocha').describe,
    it = require('mocha').it,
    gulp = require('gulp'),
    filenamelist = require('../'),
    source = ['source/*'],
    destination = 'destination/';

context('without any options specified', function() {

    it('should show the default behaviour', function(done) {
        var stream = gulp.src(source)
            .pipe(filenamelist())
            .pipe(gulp.dest(destination));

        stream.on('end', function() {
            // TODO: Verify contents
            done();
        });

    });

});
