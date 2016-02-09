# Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-filenamelist`

# Usage

## Default behaviour

By default this plugin creates a file called `filenamelist.txt`, containing a
comma separated list of the supplied files including their extension.

```js
var filenamelist = require('gulp-filenamelist');

gulp.task('scripts', function() {
  return gulp.src('./icons/*.svg')
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

## Sass file example

To create a list that we can import in Sass, we could use these options:

```js
var filenamelist = require('gulp-filenamelist');

var opts = {
    fileName: 'iconnames.scss',
    stripExt: true,
    firstLine: '$icons: (\n\t',
    lastLine: ');',
    separator: ',\n\t'
}

gulp.task('scripts', function() {
  return gulp.src('./icons/*.svg')
    .pipe(filenamelist(opts))
    .pipe(gulp.dest('./dist/'));
});
```

Assuming these files are passed in:

```
files
├── mail.svg
└── phone.svg
```

A file called `iconnames.scss` will be generated, containing:

```
$icons: (
    mail,
    phone
);
```

# LICENSE

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