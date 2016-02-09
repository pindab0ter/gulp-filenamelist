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
    options.quote = options.quote || false;

    //noinspection JSUnusedLocalSymbols
    function addToList(file, encoding, callback) {
        // TODO: Show `PluginError` if file is a stream
        file = new File(file);

        list.push(file.basename);

        callback();
    }

    function writeFile(callback) {
        if (options.quote) {
            list = list.map(function(item) {
                return '"' + item + '"';
            })
        }

        var contents = list.join(options.separator);

        contents = options.prepend + contents + options.append;

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
