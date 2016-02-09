'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var source = [path.join('source', '*')],
    destination = path.join(__dirname, 'destination'),
    defaultFileName = 'filenamelist.csv',
    defaultFileContents = new Buffer('a.txt,b.txt'),
    customFileName = 'custom.txt',
    separatorContents = new Buffer('a.txt,\n\tb.txt');

    var defaultFile = new File({
        path: path.join(destination, defaultFileName),
        contents: defaultFileContents
    });

    var fileNameFile = new File({
        path: path.join(destination, customFileName)
    });

    var separatorFile = new File({
        path: path.join(destination, defaultFileName),
        contents: separatorContents
    });

module.exports = {
    source: source,
    destination: destination,
    customFileName: customFileName,
    defaultFile: defaultFile,
    fileNameFile: fileNameFile,
    separatorFile: separatorFile
};
