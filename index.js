var charm  = require('charm')();
var babar  = require('babar');
var split  = require('split');
var queue  = require('./lib/queue');

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
var data = queue.create(count);

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
    data.add(value);
    plot();
  }
}

function plot() {
  var chart = babar(data.get(), {
    color: 'green',
    width: width,
    height: height,
    yFractions: data.max() > 10 ? 0 : 1
  });
  if (!first) charm.up(height + 2);
  first = false;
  // console.log('data', data.get().length, 'width', args.n * 3);
  console.log('\n' + chart + '\n');
}
