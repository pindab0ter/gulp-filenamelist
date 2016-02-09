'use strict';

var through = require('through2'),
    path = require('path'),
    File = require('gulp-util').File;

module.exports = function(options) {
    var list = [];

    options = options || {};
    options.fileName = options.fileName || 'filenamelist.txt';
    options.separator = options.separator || ',';

    //noinspection JSUnusedLocalSymbols
    function addToList(file, encoding, callback) {
        // TODO: Show `PluginError` if file is a stream

        file = new File(file);

        list.push(file.basename);

        callback();
    }

    function writeFile(callback) {
        var contents = list.join(options.separator);

        var file = new File({
            cwd: __dirname,
            base: __dirname,
            path: path.join(__dirname, options.fileName),
            contents: new Buffer(contents)
        });

        this.push(file);
        callback();
    }

    return through.obj(addToList, writeFile);
};
