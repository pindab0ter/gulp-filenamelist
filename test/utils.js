'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var utils = {};

utils.source = [path.join('source', '*')];
utils.destination = path.join(__dirname, 'destination');
utils.defaultFileName = 'filenamelist.csv';
utils.customFileName = 'custom.txt';
utils.defaultContents = new Buffer('a.txt,b.txt');
utils.separatorContents = new Buffer('a.txt,\n\tb.txt');
utils.prependContents = new Buffer('var a = [a.txt,b.txt');
utils.appendContents = new Buffer('a.txt,b.txt];');
utils.quoteSingleContents = new Buffer("'a.txt','b.txt'");
utils.quoteDoubleContents = new Buffer('"a.txt","b.txt"');
utils.defaultPath = path.join(utils.destination, utils.defaultFileName);
utils.defaultFile = new File({
    path: utils.defaultPath,
    contents: utils.defaultContents
});
utils.filenameFile = new File({
    path: path.join(utils.destination, utils.customFileName)
});

module.exports = utils;
