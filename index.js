#!/usr/bin/env node

var fixedQueue = require('fixedqueue').FixedQueue;
var charm  = require('charm')();
var babar  = require('babar');
var split  = require('split');

var cli = require('optimist')
  .usage('Plot values from stdin.\nUsage: $0 -w [width] -h [height]')
  .describe('w', 'Width of the chart (in terminal columns)')
  .describe('h', 'Height of the chart (in terminal rows)')
  .default({ w: 100, h: 10 });

if (cli.argv.help) {
  return cli.showHelp();
}

var count = Math.floor(cli.argv.w / 3);
var width = count * 3;
var height = cli.argv.h;

var first = true;
var queue = fixedQueue(count);
for (var i = 0; i < count; ++i) queue.push(0);

function readValue(chunk) {
  var value = parseFloat(chunk);
  if (!isNaN(value)) {
    queue.enqueue(value);
  }
}

function plot() {
  var data = queue.map(function(value, index) {
    return [index + 1, value];
  });
  var max = queue.reduce(function(acc, val) {
    return (val > acc) ? val : acc;
  }, 0);
  var chart = babar(data, {
    color: 'green',
    width: width,
    height: height,
    yFractions: max > 10 ? 0 : 1
  });
  if (!first) charm.up(height + 2);
  first = false;
  console.log('\n' + chart + '\n');
}

charm.pipe(process.stdout);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.pipe(split()).on('data', function(buffer) {
  readValue(buffer.toString());
  plot();
});

process.stdin.on('end', function() {
  process.stdout.write('\n');
});
