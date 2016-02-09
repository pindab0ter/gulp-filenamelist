'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var source = [path.join('source', '*')],
    destination = path.join(__dirname, 'destination'),
    defaultFileName = 'filenamelist.txt',
    defaultFileContents = new Buffer('a.txt,b.txt'),
    customFileName = 'custom.txt';

    var defaultFile = new File({
        path: path.join(destination, defaultFileName),
        contents: defaultFileContents
    });

    var customFile = new File({
        path: path.join(destination, customFileName)
    });

module.exports = {
    source: source,
    destination: destination,
    defaultFile: defaultFile,
    customFile: customFile,
    customFileName: customFileName
};
