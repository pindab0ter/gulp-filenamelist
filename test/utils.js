'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var utils = {
    source: [path.join('source', '*')],
    destination: path.join(__dirname, 'destination'),
    defaultFileName: 'filenamelist.csv',
    customFileName: 'custom.txt',
    defaultPath: path.join(utils.destination, utils.defaultFileName),
    defaultContents: new Buffer('a.txt,b.txt'),
    separatorContents: new Buffer('a.txt,\n\tb.txt'),
    prependContents: new Buffer('var a = [a.txt,b.txt'),
    appendContents: new Buffer('a.txt,b.txt];'),
    quoteSingleContents: new Buffer("'a.txt','b.txt'"),
    quoteDoubleContents: new Buffer('"a.txt","b.txt"'),
    defaultFile: new File({
        path: utils.defaultPath,
        contents: utils.defaultContents
    }),
    filenameFile: new File({
        path: path.join(utils.destination, utils.customFileName)
    })
};

module.exports = utils;
