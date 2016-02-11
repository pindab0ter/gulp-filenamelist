'use strict';

var through = require('through2'),
    path = require('path'),
    File = require('gulp-util').File,
    PluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-filenamelist';

module.exports = function(options) {
    var list = [];

    options = options || {};
    options.outputFileName = options.outputFileName || 'filenamelist.csv';
    options.separator = options.separator || ',';
    options.prepend = options.prepend || '';
    options.append = options.append || '';
    options.quotesSingle = options.quotesSingle || false;
    options.quotesDouble = options.quotesDouble || false;

    if (options.quotesSingle && options.quotesDouble) {
        throw new PluginError(
            PLUGIN_NAME,
            'Cannot have both single and double quotes.'
        );
    }

    //noinspection JSUnusedLocalSymbols
    function addToList(file, encoding, callback) {
        file = new File(file);

        list.push(file.basename);

        callback();
    }

    function writeFile(callback) {
        if (options.quotesSingle) {
            list = list.map(function(item) {
                return "'" + item + "'";
            })
        }
        if (options.quotesDouble) {
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
