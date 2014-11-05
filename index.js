var fixedQueue = require('fixedqueue').FixedQueue;
var charm = require('charm')();
var babar = require('babar');
var split = require('split');

var optimist = require('optimist')
  .usage('Plot values from stdin.\nUsage: $0 -n [count] -w [width] -h [height]')
  .default({ n: 10, w: 100, h: 10 });

if (optimist.argv.help) {
  return optimist.showHelp();
}

var first = true;
var queue = fixedQueue(optimist.argv.n);
for (var i=0; i<optimist.argv.n; ++i) queue.push(0);

charm.pipe(process.stdout);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.pipe(split()).on('data', function(buffer) {
  readValue(buffer.toString());
});

process.stdin.on('end', function() {
  process.stdout.write('\n');
});

function readValue(chunk) {
  var value = parseFloat(chunk);
  if (!isNaN(value)) {
    queue.enqueue(value);
    plot();
  }
}

function plot() {
  if (!first) charm.up(optimist.argv.h + 2);
  first = false;
  var series = queue.map(function(value, index) {
    return [index, value];
  });
  console.log();
  console.log(babar(series, {
    color: 'green',
    width: optimist.argv.w,
    height: optimist.argv.h,
    yFractions: 1
  }));
  console.log();
}
