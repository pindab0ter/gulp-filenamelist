'use strict';

// TODO: Refactor exports

var path = require('path'),
    File = require('gulp-util').File;

var source = [path.join('source', '*')],
    destination = path.join(__dirname, 'destination'),
    defaultFileName = 'filenamelist.csv',
    customFileName = 'custom.txt',
    defaultPath = path.join(destination, defaultFileName),
    defaultContents = new Buffer('a.txt,b.txt'),
    separatorContents = new Buffer('a.txt,\n\tb.txt'),
    prependContents = new Buffer('var a = [a.txt,b.txt'),
    appendContents = new Buffer('a.txt,b.txt];');

    var defaultFile = new File({
        path: defaultPath,
        contents: defaultContents
    });

    var fileNameFile = new File({
        path: path.join(destination, customFileName)
    });

    var separatorFile = new File({
        path: defaultPath,
        contents: separatorContents
    });

    var appendFile = new File({
        path: defaultPath,
        contents: appendContents
    });

    var prependFile = new File({
        path: defaultPath,
        contents: prependContents
    });

module.exports = {
    source: source,
    destination: destination,
    customFileName: customFileName,
    defaultContents: defaultContents,
    separatorContents: separatorContents,
    prependContents: prependContents,
    appendContents: appendContents,
    defaultFile: defaultFile,
    fileNameFile: fileNameFile,
    separatorFile: separatorFile,
    appendFile: appendFile,
    prependFile: prependFile
};
