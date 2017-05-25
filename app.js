#!/usr/bin/env node

/*

Copyright 2017 Veit Jahns

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");

/**
 * Padding a string with a character to an intended length.
 * @param {string} input - string to be padded
 * @param {number} targetLength - length of the padded string
 * @param {string} padChar - character used for padding
 * @returns {string} padded input string
 */
function padStart(input, targetLength, padChar) {
	return (padChar.repeat(
		targetLength) + input).substr(-1 * targetLength);
}

if (process.argv.length < 4) {
	console.log("Usage: " + __filename + " name /path/to/folder");
	process.exit(-1);
}

var n = process.argv[2];
var p = process.argv[3];

console.log("Number serially files in " + p);

fs.readdir(p, function(err, files) {
	files.forEach(function(element, index) {
		var extension = path.extname(element);
		var number = padStart(index.toString(), 2, "0");
		var oldPath = p + "/" + element;
		var newPath = p + util.format("%s_%s%s", number, n, extension);
		console.log(oldPath + " --> " + newPath);
		fs.renameSync(oldPath, newPath);
	});
});
