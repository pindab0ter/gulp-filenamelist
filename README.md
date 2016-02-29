[![Build Status](https://travis-ci.org/pindab0ter/gulp-filenamelist.svg?branch=master)](https://travis-ci.org/pindab0ter/gulp-filenamelist) [![Test Coverage](https://codeclimate.com/github/pindab0ter/gulp-filenamelist/badges/coverage.svg)](https://codeclimate.com/github/pindab0ter/gulp-filenamelist/coverage) [![Code Climate](https://codeclimate.com/github/pindab0ter/gulp-filenamelist/badges/gpa.svg)](https://codeclimate.com/github/pindab0ter/gulp-filenamelist) [![Dependency Status](https://david-dm.org/pindab0ter/gulp-filenamelist.svg)](https://david-dm.org/pindab0ter/gulp-filenamelist)

# Installation

Install package with NPM and add it to your dependencies:

`npm install --save gulp-filenamelist`

# Usage

## Default behaviour

By default this plugin creates a file called `filenamelist.txt`, containing a
comma separated list of the supplied files including their extension.

```js
var gulp = require('gulp'),
    filenamelist = require('gulp-filenamelist');

gulp.task('iconlist', function() {
  return gulp.src('./files/*.txt')
    .pipe(filenamelist())
    .pipe(gulp.dest('./dist/'));
});
```

Assuming these files are passed in:

```
files
├── a.txt
└── b.txt
```

A file called `filenamelist.txt` would be output containing:

```
a.txt,b.txt
```

## Common usage scenario:  [gulp-ext](https://www.npmjs.com/package/gulp-ext)

Use [gulp-ext](https://www.npmjs.com/package/gulp-ext) to remove filename
extensions before adding them to the list. This is an example where gulp-ext
has been used in the Gulp pipeline.

## Sass file example

To create a file that that could be used as a list of variables that could then
be imported in a Sass file:

```js
var gulp = require('gulp')
    ext = require('gulp-ext'),
    filenamelist = require('gulp-filenamelist');

var options = {
    outputFileName: '_iconlist.scss',
    prepend: '$icons: (\n\t',
    separator: ',\n\t',
    append: '\n);',
    quoteSingle: true
}

gulp.task('iconlist', function() {
  return gulp.src('./icons/**/*.svg')
    .pipe(ext.crop())
    .pipe(filenamelist(options))
    .pipe(gulp.dest('./dist/'));
});
```

Assuming these files are passed in:

```
icons
├── mail.svg
└── phone.svg
```

A file called `_iconlist.scss` will be generated, containing:

```
$icons: (
    'mail',
    'phone'
);
```

# Options

Options are supplied by passing an options object as shown in the 'Sass file'
example above.

## outputFileName

Use the specified filename for the output file.

Type: `string`  
Default: `filenamelist.csv`

## includeRelativePath

Include relative path from the project root with the filename.

Type: `boolean`  
Default: `false`

## separator

Type: `string`  
default: `','`

Add this string to the end of each filename except the last.

## quotesSingle

Type: `boolean`  
default: `false`

Surround each filename with single quotes: `'`

## quotesDouble

Type: `boolean`  
default: `false`

Surround each filename with double quotes: `"`

## prepend

Add this string before the list of names.

Type: `string`  
default: `''`

## append

Type: `string`  
default: `''`

Add this string at the end of the list of names.

# License

(MIT License)

Copyright (c) 2016 Hans van Luttikhuizen <hansvanluttikhuizen@me.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
