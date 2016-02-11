'use strict';

var path = require('path'),
    File = require('gulp-util').File;

var variables = {};

variables.source = [path.join(__dirname, 'source', '*')];
variables.destination = path.join(__dirname, 'destination');
variables.defaultFileName = 'filenamelist.csv';
variables.customFileName = 'custom.txt';
variables.defaultContents = new Buffer('a.txt,b.txt');
variables.separatorContents = new Buffer('a.txt,\n\tb.txt');
variables.prependContents = new Buffer('var a = [a.txt,b.txt');
variables.appendContents = new Buffer('a.txt,b.txt];');
variables.quoteSingleContents = new Buffer("'a.txt','b.txt'");
variables.quoteDoubleContents = new Buffer('"a.txt","b.txt"');
variables.defaultPath = path.join(variables.destination, variables.defaultFileName);
variables.defaultFile = new File({
    path: variables.defaultPath,
    contents: variables.defaultContents
});
variables.filenameFile = new File({
    path: path.join(variables.destination, variables.customFileName)
});

module.exports = variables;
