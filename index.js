'use strict';

var through = require('through2'),
    path = require('path'),
    File = require('gulp-util').File;

module.exports = function(options) {
    var list = [];

    options = options || {};
    options.outputFileName = options.outputFileName || 'filenamelist.csv';
    options.separator = options.separator || ',';
    options.prepend = options.prepend || '';
    options.append = options.append || '';

    //noinspection JSUnusedLocalSymbols
    function addToList(file, encoding, callback) {
        // TODO: Show `PluginError` if file is a stream

        file = new File(file);

        list.push(file.basename);

        callback();
    }

    function writeFile(callback) {
        var contents = list.join(options.separator);

        console.log(__dirname, options.outputFileName);

        var file = new File({
            cwd: __dirname,
            base: __dirname,
            path: path.join(__dirname, options.outputFileName),
            contents: new Buffer(contents)
        });

        this.push(file);
        callback();
    }

    return through.obj(addToList, writeFile);
};
