'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var source = [path.join('source', '*')],
    destination = path.join(__dirname, 'destination'),
    defaultFileName = path.join(destination, 'filenamelist.txt'),
    defaultFileContents = new Buffer('a.txt,b.txt'),
    defaultFile = new File({
        path: defaultFileName,
        contents: defaultFileContents
    });

module.exports = {
    source: source,
    destination: destination,
    defaultFile: defaultFile
};
