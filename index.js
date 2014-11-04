var fixedQueue = require('fixedqueue').FixedQueue;
var babar = require('babar');
var charm = require('charm')();

charm.pipe(process.stdout);
var queue = fixedQueue(10);
var remover = new AnsiRemover();

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(buffer) {
  process.stdout.move
  var str = buffer.toString();
  var value = parseFloat(str);
  if (!isNaN(value)) {
    queue.enqueue(value);
    plot();
  }
});

function plot() {
  var series = queue.map(function(value, index) {
    return [index, value];
  });
  console.log();
  console.log(babar(series, {
    color: 'green',
    width: 120,
    height: 10,
    color: 'green',
    yFractions: 1
  }));
  charm.up(11);
}
