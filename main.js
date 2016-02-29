'use strict';

var through = require('through2'),
    utils = require('./utils'),
    File = require('gulp-util').File;

module.exports = function(options) {
    var list = [];

    options = utils.verifyOptions(options);

    // Called for each incoming file
    //noinspection JSUnusedLocalSymbols
    function addToList(file, encoding, callback) {
        // Transform to Vinyl to access .basename
        file = new File(file);

        list.push(options.includeRelativePath?file.relative:file.basename);
        callback();
    }

    // Called after all files have been passed
    function writeFile(callback) {
        var contents, file;

        // Add quotes
        if (options.quotesSingle) {
            list = utils.surroundWithQuotes(list, "'");
        } else if (options.quotesDouble) {
            list = utils.surroundWithQuotes(list, '"');
        }

        // Join list with separator
        contents = list.join(options.separator);

        // Add prepend and append
        contents = options.prepend + contents + options.append;

        // Create a Vinyl file
        file = utils.createFile(contents, options);

        // Pass the Vinyl file on
        this.push(file);
        callback();
    }

    return through.obj(addToList, writeFile);
};
